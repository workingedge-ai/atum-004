import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle, Copy } from "lucide-react";

interface CreateTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateType: string;
  onSuccess: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CreateTemplateModal = ({ isOpen, onClose, templateType, onSuccess }: CreateTemplateModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [formData, setFormData] = useState({
    brandName: "",
    googleReviewUrl: "",
    brandLogoUrl: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const initiatePayment = async () => {
    return new Promise((resolve, reject) => {
      const options = {
        key: "rzp_test_dummy", // Replace with your Razorpay key
        amount: 99900, // Amount in paise (999 INR)
        currency: "INR",
        name: "Atum",
        description: `${templateType} Template Purchase`,
        handler: function (response: any) {
          resolve({
            payment_id: response.razorpay_payment_id,
            amount: 999
          });
        },
        prefill: {
          name: formData.brandName,
        },
        theme: {
          color: "#8B5CF6"
        },
        modal: {
          ondismiss: function() {
            reject(new Error("Payment cancelled"));
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.brandName || !formData.googleReviewUrl) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Initiate payment
      toast({
        title: "Processing Payment",
        description: "Please complete the payment to continue...",
      });

      const paymentResult: any = await initiatePayment();

      toast({
        title: "Payment Successful",
        description: "Creating your template page...",
      });

      // Step 2: Get auth session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        toast({
          title: "Error",
          description: "Please sign in to create a template",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      // Step 3: Call edge function to create template
      const { data, error } = await supabase.functions.invoke('create-template', {
        body: {
          brand_name: formData.brandName,
          google_review_url: formData.googleReviewUrl,
          template_type: templateType,
          brand_logo_url: formData.brandLogoUrl || null,
          payment_id: paymentResult.payment_id,
          amount_paid: paymentResult.amount
        }
      });

      if (error) {
        throw error;
      }

      // Success!
      setGeneratedUrl(data.url);
      setShowSuccess(true);
      onSuccess();

      toast({
        title: "Success!",
        description: "Your review page has been created successfully",
      });

    } catch (error: any) {
      console.error("Template creation error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create template. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(generatedUrl);
    toast({
      title: "Copied!",
      description: "URL copied to clipboard",
    });
  };

  const handleClose = () => {
    setFormData({ brandName: "", googleReviewUrl: "", brandLogoUrl: "" });
    setShowSuccess(false);
    setGeneratedUrl("");
    onClose();
  };

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <DialogTitle className="text-center">Page Created Successfully!</DialogTitle>
            <DialogDescription className="text-center">
              Your review page is now live. Share this URL with your customers:
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center space-x-2 mt-4">
            <Input
              value={generatedUrl}
              readOnly
              className="bg-muted"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleCopyUrl}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <Button onClick={handleClose} className="w-full mt-4">
            Done
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create {templateType} Template</DialogTitle>
          <DialogDescription>
            Fill in the details to create your custom review page
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="brandName">Brand Name *</Label>
            <Input
              id="brandName"
              name="brandName"
              value={formData.brandName}
              onChange={handleInputChange}
              placeholder="e.g., Star Cafe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="googleReviewUrl">Google Review URL *</Label>
            <Input
              id="googleReviewUrl"
              name="googleReviewUrl"
              type="url"
              value={formData.googleReviewUrl}
              onChange={handleInputChange}
              placeholder="https://g.page/..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="brandLogoUrl">Brand Logo URL (Optional)</Label>
            <Input
              id="brandLogoUrl"
              name="brandLogoUrl"
              type="url"
              value={formData.brandLogoUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div className="bg-muted p-3 rounded-md">
            <p className="text-sm text-muted-foreground">
              Price: <span className="font-semibold text-foreground">₹999</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Payment will be processed securely via Razorpay
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Pay & Create"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTemplateModal;