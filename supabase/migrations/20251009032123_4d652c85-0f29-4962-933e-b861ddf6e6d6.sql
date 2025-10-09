-- Create templates table
CREATE TABLE public.templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_type TEXT NOT NULL,
  brand_name TEXT NOT NULL,
  google_review_url TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  brand_logo_url TEXT,
  owner_affiliate_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'active',
  payment_id TEXT,
  amount_paid DECIMAL(10,2) NOT NULL DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

-- Create policies for templates
CREATE POLICY "Users can view their own templates" 
ON public.templates 
FOR SELECT 
USING (auth.uid() = owner_affiliate_id);

CREATE POLICY "Users can create their own templates" 
ON public.templates 
FOR INSERT 
WITH CHECK (auth.uid() = owner_affiliate_id);

-- Create function to generate unique slug
CREATE OR REPLACE FUNCTION public.generate_unique_slug(brand_name_input TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INT := 0;
BEGIN
  -- Convert brand name to slug format
  base_slug := lower(regexp_replace(brand_name_input, '[^a-zA-Z0-9\s-]', '', 'g'));
  base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
  base_slug := regexp_replace(base_slug, '-+', '-', 'g');
  base_slug := trim(both '-' from base_slug);
  
  final_slug := base_slug;
  
  -- Check if slug exists and add counter if needed
  WHILE EXISTS (SELECT 1 FROM public.templates WHERE slug = final_slug) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$$;

-- Add commission tracking to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS total_templates_created INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_commission DECIMAL(10,2) DEFAULT 0;

-- Create sales_data table for tracking
CREATE TABLE public.sales_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_id UUID NOT NULL REFERENCES public.profiles(user_id),
  template_id UUID NOT NULL REFERENCES public.templates(id),
  sale_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  commission_amount DECIMAL(10,2) NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending'
);

-- Enable RLS on sales_data
ALTER TABLE public.sales_data ENABLE ROW LEVEL SECURITY;

-- Create policies for sales_data
CREATE POLICY "Users can view their own sales" 
ON public.sales_data 
FOR SELECT 
USING (auth.uid() = affiliate_id);

-- Create trigger to update profile stats when template is created
CREATE OR REPLACE FUNCTION public.update_affiliate_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update total templates created
  UPDATE public.profiles
  SET total_templates_created = total_templates_created + 1
  WHERE user_id = NEW.owner_affiliate_id;
  
  -- Insert sales record
  INSERT INTO public.sales_data (affiliate_id, template_id, commission_amount)
  VALUES (NEW.owner_affiliate_id, NEW.id, NEW.amount_paid * 0.1); -- 10% commission
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_template_created
  AFTER INSERT ON public.templates
  FOR EACH ROW EXECUTE FUNCTION public.update_affiliate_stats();