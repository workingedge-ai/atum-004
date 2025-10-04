import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Check } from "lucide-react";

// Sample template data - in real app, this would come from API/database
const templates = [
  {
    id: "gym-template",
    name: "Gym & Fitness Studio Template",
    price: 2000,
    commission: 400,
    demoUrl: "https://example.com/demo/gym",
    description: "A complete digital solution for gyms and fitness studios, featuring membership management, class scheduling, and payment integration. This template is fully customizable and ready to deploy.",
    targetMarket: [
      "Local gyms and fitness centers",
      "Yoga studios",
      "Martial arts schools",
      "Personal training businesses",
      "CrossFit boxes",
    ],
    features: [
      "Membership management system",
      "Class scheduling & booking",
      "Payment integration (Razorpay)",
      "Mobile-responsive design",
      "Custom branding options",
      "Admin dashboard",
      "Member portal",
      "Attendance tracking",
    ],
    howToSell: [
      "Identify local gyms or fitness studios in your area",
      "Show them the demo and highlight how it can automate their operations",
      "Emphasize the one-time cost vs monthly subscription savings",
      "Offer to customize it with their branding",
      "Share the Razorpay payment link for easy checkout",
    ],
  },
  {
    id: "restaurant-template",
    name: "Restaurant & Café Template",
    price: 2500,
    commission: 500,
    demoUrl: "https://example.com/demo/restaurant",
    description: "A beautiful template designed for restaurants, cafés, and food businesses. Includes online menu, table reservations, and online ordering capabilities.",
    targetMarket: [
      "Restaurants and cafés",
      "Cloud kitchens",
      "Food trucks",
      "Bakeries",
      "Catering services",
    ],
    features: [
      "Digital menu with categories",
      "Table reservation system",
      "Online ordering integration",
      "Gallery showcase",
      "Contact & location map",
      "Mobile-friendly design",
      "SEO optimized",
      "Social media integration",
    ],
    howToSell: [
      "Visit local restaurants and cafés",
      "Show how customers can view menu and book tables online",
      "Highlight the modern look that attracts more customers",
      "Mention how it increases online visibility",
      "Provide the Razorpay link for quick purchase",
    ],
  },
  {
    id: "salon-template",
    name: "Salon & Spa Template",
    price: 1800,
    commission: 360,
    demoUrl: "https://example.com/demo/salon",
    description: "Professional template for salons, spas, and beauty parlors. Features appointment booking, service showcase, and gallery.",
    targetMarket: [
      "Hair salons",
      "Beauty parlors",
      "Spa centers",
      "Nail studios",
      "Barbershops",
    ],
    features: [
      "Appointment booking system",
      "Service catalog with pricing",
      "Image gallery",
      "Staff profiles",
      "Customer reviews section",
      "Contact form",
      "Mobile responsive",
      "Google Maps integration",
    ],
    howToSell: [
      "Target salons and spas in your locality",
      "Demonstrate the booking system that reduces phone calls",
      "Show the professional look that enhances their brand",
      "Explain how it helps attract new customers",
      "Share the payment link for easy transaction",
    ],
  },
  {
    id: "retail-template",
    name: "Retail & E-commerce Template",
    price: 3000,
    commission: 600,
    demoUrl: "https://example.com/demo/retail",
    description: "Complete e-commerce solution for retail businesses. Includes product catalog, shopping cart, and payment gateway integration.",
    targetMarket: [
      "Local retail stores",
      "Boutiques",
      "Electronics shops",
      "Book stores",
      "Gift shops",
    ],
    features: [
      "Product catalog with categories",
      "Shopping cart functionality",
      "Payment gateway integration",
      "Order management",
      "Customer accounts",
      "Search & filters",
      "Wishlist feature",
      "Inventory tracking",
    ],
    howToSell: [
      "Approach local retailers who want to go online",
      "Show how they can sell 24/7 without physical store hours",
      "Highlight the easy product management",
      "Mention the secure payment integration",
      "Provide Razorpay link for purchase",
    ],
  },
];

const TemplateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const template = templates.find((t) => t.id === id);

  if (!template) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Template Not Found</CardTitle>
            <CardDescription>The template you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/dashboard")} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Catalogue
          </Button>

          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{template.name}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  ₹{template.price.toLocaleString()}
                </Badge>
                <Badge className="text-lg px-3 py-1 bg-primary/20 text-primary border-primary">
                  You earn ₹{template.commission.toLocaleString()} per sale
                </Badge>
              </div>
            </div>
            <Button
              size="lg"
              onClick={() => window.open(template.demoUrl, "_blank")}
              className="shadow-glow"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              View Demo
            </Button>
          </div>
        </div>

        {/* Description Section */}
        <Card className="mb-6 gradient-card shadow-card animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary" />
              Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{template.description}</p>
          </CardContent>
        </Card>

        {/* Target Market Section */}
        <Card className="mb-6 gradient-card shadow-card animate-scale-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary" />
              Target Market
            </CardTitle>
            <CardDescription>Perfect for these businesses</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {template.targetMarket.map((market, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{market}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Key Features Section */}
        <Card className="mb-6 gradient-card shadow-card animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary" />
              Key Features
            </CardTitle>
            <CardDescription>What's included in this template</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {template.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* How to Sell Section */}
        <Card className="mb-6 gradient-card shadow-card animate-scale-in" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary" />
              How to Sell This Template
            </CardTitle>
            <CardDescription>Tips for successful sales</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {template.howToSell.map((tip, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{tip}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Delivery Info Section */}
        <Card className="mb-6 gradient-card shadow-card animate-scale-in" style={{ animationDelay: "0.4s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary" />
              Delivery Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">Quick Turnaround:</span> Custom templates
              are delivered within 24 hours after confirmed payment through Razorpay. Your client will
              receive a fully functional, customized template ready to deploy.
            </p>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="min-w-[200px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Catalogue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetail;
