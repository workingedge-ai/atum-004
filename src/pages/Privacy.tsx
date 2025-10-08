import { Link } from "react-router-dom";
import Header from "@/components/Header";
import atumLogo from "@/assets/atum-logo-new.png";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="gradient-hero pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-secondary">
            Last updated: January 2025
          </p>
        </div>
      </section>

      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="space-y-8 text-foreground">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-secondary">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Name, email address, phone number, and city</li>
              <li>UPI ID for payment processing</li>
              <li>Sales activity and commission earnings</li>
              <li>Communication preferences and support inquiries</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-secondary">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Process commission payments to your UPI ID</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Send you updates about your account and platform features</li>
              <li>Improve our services and develop new features</li>
              <li>Comply with legal obligations and prevent fraud</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-secondary">3. Information Sharing</h2>
            <p className="text-muted-foreground">
              We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in operating our platform, processing payments, or providing customer support, but only to the extent necessary for these purposes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-secondary">4. Payment Information</h2>
            <p className="text-muted-foreground">
              Your UPI ID is stored securely and used solely for commission payments. We do not store or have access to your complete banking credentials. All payment transactions are processed through secure, encrypted channels.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-secondary">5. Data Security</h2>
            <p className="text-muted-foreground">
              We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-secondary">6. Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Access and update your personal information</li>
              <li>Request deletion of your account and data</li>
              <li>Opt out of marketing communications</li>
              <li>Request a copy of your data</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-secondary">7. Cookies & Tracking</h2>
            <p className="text-muted-foreground">
              We use cookies and similar tracking technologies to improve your experience on our platform, analyze usage patterns, and deliver personalized content. You can control cookie settings through your browser.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-secondary">8. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-secondary">9. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about this Privacy Policy or how we handle your data, please contact us at support@atum.com or through our contact page.
            </p>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <img src={atumLogo} alt="Atum Logo" className="h-8 md:h-10 w-auto" />
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

export default Privacy;
