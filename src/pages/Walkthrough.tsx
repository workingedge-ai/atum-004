import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Walkthrough = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const handleContinue = () => {
    if (agreed) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-8 md:py-12">
      <div className="w-full max-w-3xl">
        <Card className="gradient-card shadow-glow p-6 md:p-8 lg:p-12 border-border">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary mb-3 md:mb-4">Welcome to Atum Affiliate Program</h1>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
              Anyone can join — school students, college students, or working professionals. There is no age barrier. 
              Atum allows you to earn by selling ready-made digital templates to local businesses.
            </p>
          </div>

          <div className="space-y-5 md:space-y-6 mb-6 md:mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Code of Conduct</h3>
              <ul className="text-sm md:text-base text-muted-foreground space-y-2 md:space-y-3">
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="text-primary mt-1 text-sm md:text-base">•</span>
                  <span>Affiliates must not misrepresent the product or make false claims about its features.</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="text-primary mt-1 text-sm md:text-base">•</span>
                  <span>Payments are only valid if made through the provided Razorpay link. No offline or alternate payment methods will be accepted.</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="text-primary mt-1 text-sm md:text-base">•</span>
                  <span>Custom templates will be delivered only after confirmed payment is received.</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="text-primary mt-1 text-sm md:text-base">•</span>
                  <span>Misuse such as unauthorized sharing of demos or template files can lead to immediate account suspension.</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="text-primary mt-1 text-sm md:text-base">•</span>
                  <span>Payouts are made directly to the UPI ID provided during signup. Ensure your UPI details are correct.</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Payout Flow</h3>
              <div className="space-y-2 text-sm md:text-base text-muted-foreground">
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-primary">1.</span> Affiliate closes a sale with a vendor
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-primary">2.</span> Vendor pays via the Razorpay link
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-primary">3.</span> Admin delivers the product to the vendor
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-primary">4.</span> Affiliate receives 20% commission within 24 hours to their UPI ID
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 border border-border rounded-lg p-4 md:p-6 mb-4 md:mb-6">
            <div className="flex items-start gap-2 md:gap-3">
              <Checkbox 
                id="agree" 
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
                className="mt-1"
              />
              <label 
                htmlFor="agree" 
                className="text-xs md:text-sm cursor-pointer leading-relaxed"
              >
                I have read and understood the Code of Conduct and agree to follow all guidelines while representing the Atum platform.
              </label>
            </div>
          </div>

          <Button
            onClick={handleContinue}
            disabled={!agreed}
            className="w-full shadow-glow text-sm md:text-base"
            size="lg"
          >
            I Accept & Continue
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Walkthrough;
