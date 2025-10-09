import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, CheckCircle, DollarSign, Package, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import atumLogo from "@/assets/atum-logo-new.png";

const Index = () => {
  
  const [mousePosition, setMousePosition] = useState({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  const templates = [{
    id: 1,
    name: "Restaurant Menu Builder",
    price: "₹2,999",
    commission: "₹750",
    description: "Digital menu with QR code ordering",
    image: "/src/assets/template-restaurant.jpg"
  }, {
    id: 2,
    name: "Salon Booking System",
    price: "₹3,499",
    commission: "₹875",
    description: "Complete appointment management",
    image: "/src/assets/template-salon.jpg"
  }, {
    id: 3,
    name: "Retail Inventory Pro",
    price: "₹4,999",
    commission: "₹1,250",
    description: "Stock management & billing",
    image: "/src/assets/template-retail.jpg"
  }, {
    id: 4,
    name: "Gym Member Portal",
    price: "₹2,499",
    commission: "₹625",
    description: "Membership tracking & payments",
    image: "/src/assets/template-gym.jpg"
  }];
  
  const faqs = [
    {
      question: "How do I earn money with Atum?",
      answer: "Pick templates from our catalogue, show them to local businesses, close sales, and earn generous commissions. You get paid directly to your UPI within 24 hours of a successful sale."
    },
    {
      question: "How much commission can I earn?",
      answer: "Commissions range from ₹625 to ₹1,250+ per sale depending on the template. Popular templates like Retail Inventory Pro offer up to ₹1,250 commission per sale."
    },
    {
      question: "Do I need any investment to start?",
      answer: "No investment needed! Atum is completely free to join. Simply sign up, browse our template catalogue, and start selling to local businesses."
    },
    {
      question: "How do I receive my payments?",
      answer: "All payments are made directly to your UPI ID (GPay/PhonePe/Paytm/BHIM) that you provide during signup. Payments are processed within 24 hours of sale confirmation."
    },
    {
      question: "What kind of businesses can I sell to?",
      answer: "You can sell to any local business - restaurants, salons, retail shops, gyms, cafes, and more. Our templates are designed to help small and medium businesses digitize their operations."
    },
    {
      question: "Do I need technical knowledge to sell?",
      answer: "Not at all! Our templates are ready-made and easy to demonstrate. We provide you with all the materials and support you need to confidently present solutions to businesses."
    }
  ];
  const testimonials = [{
    name: "Priya Sharma",
    role: "College Student",
    text: "Made ₹15,000 in my first month! Perfect side income while studying."
  }, {
    name: "Rahul Verma",
    role: "Freelancer",
    text: "Easy to sell, great commission. Already signed up 8 local businesses."
  }, {
    name: "Anita Desai",
    role: "Professional",
    text: "The templates are top-notch. Businesses love them and I earn well."
  }];
  return <div className="min-h-screen relative">
      {/* Global Mouse glow effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(202 100% 31% / 0.15), transparent 40%)`,
        }}
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-hero min-h-[90vh] flex items-center justify-center px-4 py-20 md:py-0 relative overflow-hidden" id="home">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight">
            Earn by Selling
            <span className="block text-secondary"> Digital Tools</span>
            to Local Businesses
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-secondary max-w-2xl mx-auto px-4">
            No investment needed. Pick ready-made templates, show them to vendors, close sales, and earn generous commissions.
          </p>
          <Link to="/signup">
            <Button size="lg" className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 shadow-glow hover:scale-105 transition-transform my-[30px]">
              Get Started <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 md:py-20 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-secondary">How Atum Works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center space-y-3 md:space-y-4">
              <div className="mx-auto w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Package className="h-7 w-7 md:h-8 md:w-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold">1. Pick Templates</h3>
              <p className="text-sm md:text-base text-muted-foreground">Choose from our catalogue of ready-made business tools</p>
            </div>
            <div className="text-center space-y-3 md:space-y-4">
              <div className="mx-auto w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="h-7 w-7 md:h-8 md:w-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold">2. Show Vendors</h3>
              <p className="text-sm md:text-base text-muted-foreground">Present solutions to local businesses in your area</p>
            </div>
            <div className="text-center space-y-3 md:space-y-4">
              <div className="mx-auto w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <CheckCircle className="h-7 w-7 md:h-8 md:w-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold">3. Close Sales</h3>
              <p className="text-sm md:text-base text-muted-foreground">Help businesses get set up with the perfect tool</p>
            </div>
            <div className="text-center space-y-3 md:space-y-4">
              <div className="mx-auto w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <DollarSign className="h-7 w-7 md:h-8 md:w-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold">4. Earn Commission</h3>
              <p className="text-sm md:text-base text-muted-foreground">Get paid directly to your UPI within 24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Template Cards */}
      <section className="py-16 md:py-20 px-4" id="templates">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Popular Templates</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {templates.map(template => <Link key={template.id} to="/signup">
                <Card className="gradient-card shadow-card hover:shadow-glow transition-all hover:scale-105 cursor-pointer box-border h-full flex flex-col overflow-hidden">
                  <div className="w-full h-48 overflow-hidden">
                    <img 
                      src={template.image} 
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-1">{template.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Price:</span>
                        <span className="font-semibold text-lg">{template.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Your Commission:</span>
                        <span className="font-bold text-xl text-primary">{template.commission}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>)}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 px-4 bg-card" id="faq">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="gradient-card shadow-card border border-border rounded-lg px-4 md:px-6">
                <AccordionTrigger className="text-base md:text-lg font-semibold text-foreground hover:text-primary text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 px-4 bg-card" id="testimonials">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-secondary">Success Stories</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => <Card key={index} className="gradient-card shadow-card p-5 md:p-6 border-border">
                <p className="text-sm md:text-base text-foreground mb-3 md:mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-sm md:text-base">{testimonial.name}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 md:py-12 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <img src={atumLogo} alt="Atum Logo" className="h-8 md:h-10 w-auto" />
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link to="/contact" className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
              <Link to="/contact" className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
              <Link to="/terms" className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
              <Link to="/privacy" className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            </div>
          </div>
          <div className="text-center mt-6 md:mt-8 text-muted-foreground text-xs md:text-sm">
            © 2025 Atum. All rights reserved.
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;