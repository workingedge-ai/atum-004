import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the user from the auth token
    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser()

    if (authError || !user) {
      console.error('Auth error:', authError)
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const { brand_name, google_review_url, template_type, brand_logo_url, payment_id, amount_paid } = await req.json()

    console.log('Creating template for user:', user.id)

    // Validate required fields
    if (!brand_name || !google_review_url || !template_type || !payment_id || !amount_paid) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Generate unique slug
    const { data: slugData, error: slugError } = await supabaseClient
      .rpc('generate_unique_slug', { brand_name_input: brand_name })

    if (slugError) {
      console.error('Slug generation error:', slugError)
      return new Response(
        JSON.stringify({ error: 'Failed to generate slug' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const slug = slugData as string

    // Create the template record
    const { data: template, error: templateError } = await supabaseClient
      .from('templates')
      .insert({
        template_type,
        brand_name,
        google_review_url,
        slug,
        brand_logo_url: brand_logo_url || null,
        owner_affiliate_id: user.id,
        payment_id,
        amount_paid: parseFloat(amount_paid),
        status: 'active'
      })
      .select()
      .single()

    if (templateError) {
      console.error('Template creation error:', templateError)
      return new Response(
        JSON.stringify({ error: templateError.message }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const publicUrl = `https://reviews.atum.in/${slug}`

    console.log('Template created successfully:', template.id)

    return new Response(
      JSON.stringify({ 
        success: true,
        template_id: template.id,
        slug,
        url: publicUrl 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})