import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="gradient-hero pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
            Terms & Conditions
          </h1>
          <p className="text-xl text-secondary">
            Last updated: January 2025
          </p>
        </div>
      </section>

      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="space-y-8 text-foreground">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-secondary">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using Atum's platform, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-secondary">2. Affiliate Program</h2>
            <p className="text-muted-foreground mb-4">
              As an Atum affiliate, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Present our digital tools honestly and accurately to potential customers</li>
              <li>Not make false or misleading claims about our products or services</li>
              <li>Comply with all applicable laws and regulations in your sales activities</li>
              <li>Maintain professional conduct when representing Atum</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-secondary">3. Commissions & Payments</h2>
            <p className="text-muted-foreground mb-4">
              Commission rates are displayed for each template and are subject to change. Payments will be processed to your registered UPI ID within 24 hours of sale confirmation. Atum reserves the right to withhold payment in cases of suspected fraud or violation of these terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-secondary">4. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All templates, logos, and content provided by Atum remain the intellectual property of Atum. Affiliates are granted a limited license to demonstrate and sell these products but do not own the underlying technology or content.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-secondary">5. Account Termination</h2>
            <p className="text-muted-foreground">
              Atum reserves the right to suspend or terminate affiliate accounts that violate these terms, engage in fraudulent activity, or damage the Atum brand reputation.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-secondary">6. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              Atum shall not be liable for any indirect, incidental, or consequential damages arising from the use of our platform or sale of our products.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-secondary">7. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the updated terms.
            </p>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold text-primary">Atum</div>
            <div className="flex gap-6">
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            </div>
          </div>
          <div className="text-center mt-8 text-muted-foreground text-sm">
            © 2025 Atum. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Terms;
