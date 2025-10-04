import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link, useNavigate } from "react-router-dom";
import { DollarSign, Package, TrendingUp, LogOut, ExternalLink, FileText, ArrowUpDown } from "lucide-react";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("atumUser") || "{}");
  
  const [profileData, setProfileData] = useState({
    name: userData.name || "",
    email: userData.email || "",
    city: userData.city || "",
    phone: userData.phone || "",
    upiId: userData.upiId || ""
  });

  const handleLogout = () => {
    localStorage.removeItem("atumUser");
    navigate("/");
  };

  const handleProfileSave = () => {
    localStorage.setItem("atumUser", JSON.stringify(profileData));
    alert("Profile updated successfully!");
  };

  const templates = [
    {
      id: "gym-template",
      name: "Gym & Fitness Studio Template",
      price: "₹2,000",
      commission: "₹400",
      category: "Fitness",
      demoUrl: "https://demo.example.com/gym"
    },
    {
      id: "restaurant-template",
      name: "Restaurant & Café Template",
      price: "₹2,500",
      commission: "₹500",
      category: "Food & Beverage",
      demoUrl: "https://demo.example.com/restaurant"
    },
    {
      id: "salon-template",
      name: "Salon & Spa Template",
      price: "₹1,800",
      commission: "₹360",
      category: "Beauty & Wellness",
      demoUrl: "https://demo.example.com/salon"
    },
    {
      id: "retail-template",
      name: "Retail & E-commerce Template",
      price: "₹3,000",
      commission: "₹600",
      category: "Retail",
      demoUrl: "https://demo.example.com/retail"
    }
  ];

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [animateStats, setAnimateStats] = useState(false);

  const salesData = [
    {
      id: "SALE001",
      template: "Restaurant Menu Builder",
      vendor: "Golden Spoon Restaurant",
      date: "2024-01-15",
      status: "Paid",
      commission: "₹400"
    },
    {
      id: "SALE002",
      template: "Salon Booking System",
      vendor: "Glamour Beauty Salon",
      date: "2024-01-18",
      status: "Pending",
      commission: "₹600"
    },
    {
      id: "SALE003",
      template: "Gym Member Portal",
      vendor: "FitZone Gym",
      date: "2024-01-20",
      status: "Paid",
      commission: "₹500"
    }
  ];

  const payoutHistory = [
    { date: "2024-01-16", amount: "₹400" },
    { date: "2024-01-21", amount: "₹500" },
    { date: "2024-01-10", amount: "₹800" }
  ];

  const [upiError, setUpiError] = useState("");

  useEffect(() => {
    setAnimateStats(true);
  }, []);

  const validateUPI = (upi: string) => {
    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    if (upi && !upiRegex.test(upi)) {
      setUpiError("Invalid UPI ID format");
    } else {
      setUpiError("");
    }
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedSales = [...salesData].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            Atum
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {userData.name || "Affiliate"}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-muted/50">
            <TabsTrigger value="overview" className="transition-all data-[state=active]:shadow-glow">
              Overview
            </TabsTrigger>
            <TabsTrigger value="catalogue" className="transition-all data-[state=active]:shadow-glow">
              Templates Catalogue
            </TabsTrigger>
            <TabsTrigger value="sales" className="transition-all data-[state=active]:shadow-glow">
              Sales Tracker
            </TabsTrigger>
            <TabsTrigger value="profile" className="transition-all data-[state=active]:shadow-glow">
              Profile & Payments
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 animate-fade-in">
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-2 animate-slide-in">
                Welcome back, {profileData.name || "Affiliate"}!
              </h1>
              <p className="text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Here's your performance overview
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card 
                className={`gradient-card shadow-card p-6 border-border hover:shadow-glow transition-all ${
                  animateStats ? 'animate-counter-up' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
                    <p className="text-3xl font-bold text-primary">₹1,300</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </Card>

              <Card 
                className={`gradient-card shadow-card p-6 border-border hover:shadow-glow transition-all ${
                  animateStats ? 'animate-counter-up' : ''
                }`}
                style={{ animationDelay: "0.1s" }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Sales</p>
                    <p className="text-3xl font-bold text-primary">3</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </Card>

              <Card 
                className={`gradient-card shadow-card p-6 border-border hover:shadow-glow transition-all ${
                  animateStats ? 'animate-counter-up' : ''
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Pending Payouts</p>
                    <p className="text-3xl font-bold text-primary">₹600</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </Card>
            </div>

            <Card className="gradient-card shadow-card p-6 border-border animate-scale-in" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-xl font-semibold mb-4">Sales Trend</h3>
              <div className="h-64 flex items-end justify-around gap-2">
                {[40, 65, 45, 80, 55, 70, 90].map((height, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-primary/20 hover:bg-primary/30 transition-all rounded-t animate-scale-in cursor-pointer"
                      style={{ 
                        height: `${height}%`,
                        animationDelay: `${0.4 + index * 0.05}s`
                      }}
                    />
                    <span className="text-xs text-muted-foreground">Day {index + 1}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="gradient-card shadow-card p-6 border-border animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <h3 className="text-xl font-semibold mb-4">Quick Summary</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>• You've made <span className="font-semibold text-primary">3 sales</span> this month</p>
                <p>• Total commission earned: <span className="font-semibold text-primary">₹1,300</span></p>
                <p>• Pending commission: <span className="font-semibold text-primary">₹600</span></p>
                <p>• Available templates: <span className="font-semibold text-primary">{templates.length}</span></p>
              </div>
            </Card>
          </TabsContent>

          {/* Templates Catalogue Tab */}
          <TabsContent value="catalogue" className="space-y-6 animate-fade-in">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2 animate-slide-in">Templates Catalogue</h2>
              <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Browse and share templates with potential clients
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {templates.map((template, index) => (
                <Card 
                  key={template.id} 
                  className="gradient-card shadow-card p-6 border-border hover:shadow-glow hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-scale-in group"
                  style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                >
                  <div className="mb-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {template.category}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {template.name}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Price:</span>
                      <span className="font-semibold">{template.price}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-primary/5 rounded group-hover:bg-primary/10 transition-colors">
                      <span className="text-sm text-muted-foreground">Your Commission (20%):</span>
                      <span className="font-bold text-primary text-lg">{template.commission}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => window.open(template.demoUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View Demo
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 shadow-glow"
                      onClick={() => navigate(`/template/${template.id}`)}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sales Tracker Tab */}
          <TabsContent value="sales" className="space-y-6 animate-fade-in">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2 animate-slide-in">Sales Tracker</h2>
              <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Track all your sales and commissions
              </p>
            </div>

            <Card className="gradient-card shadow-card border-border animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleSort('id')}
                        className="flex items-center gap-1"
                      >
                        Sale ID
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleSort('template')}
                        className="flex items-center gap-1"
                      >
                        Template Sold
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead>Vendor/Business</TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleSort('date')}
                        className="flex items-center gap-1"
                      >
                        Date
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleSort('status')}
                        className="flex items-center gap-1"
                      >
                        Status
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">Commission</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedSales.map((sale, index) => (
                    <TableRow 
                      key={sale.id} 
                      className="animate-fade-in hover:bg-muted/50 transition-colors"
                      style={{ animationDelay: `${0.05 * index}s` }}
                    >
                      <TableCell className="font-medium">{sale.id}</TableCell>
                      <TableCell>{sale.template}</TableCell>
                      <TableCell>{sale.vendor}</TableCell>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={sale.status === 'Paid' ? 'default' : 'secondary'}
                          className={
                            sale.status === 'Paid' 
                              ? 'bg-green-500/20 text-green-700 hover:bg-green-500/30' 
                              : 'bg-orange-500/20 text-orange-700 hover:bg-orange-500/30'
                          }
                        >
                          {sale.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-primary">
                        {sale.commission}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            {salesData.length === 0 && (
              <div className="text-center py-12 text-muted-foreground animate-fade-in">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No sales yet. Start sharing templates to earn commissions!</p>
              </div>
            )}
          </TabsContent>

          {/* Profile & Payments Tab */}
          <TabsContent value="profile" className="space-y-6 animate-fade-in">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2 animate-slide-in">Profile & Payments</h2>
              <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Manage your personal information and payment details
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="gradient-card shadow-card p-6 border-border animate-scale-in" style={{ animationDelay: "0.1s" }}>
                <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profileData.city}
                      onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="upi">UPI ID</Label>
                    <Input
                      id="upi"
                      value={profileData.upiId}
                      onChange={(e) => {
                        setProfileData({...profileData, upiId: e.target.value});
                        validateUPI(e.target.value);
                      }}
                      placeholder="yourname@upi"
                      className={`mt-1 ${upiError ? 'border-destructive' : ''}`}
                    />
                    {upiError && (
                      <p className="text-xs text-destructive mt-1">{upiError}</p>
                    )}
                  </div>
                  <Button 
                    onClick={handleProfileSave} 
                    className="w-full shadow-glow"
                    disabled={!!upiError}
                  >
                    Save Changes
                  </Button>
                </div>
              </Card>

              <Card className="gradient-card shadow-card p-6 border-border animate-scale-in" style={{ animationDelay: "0.2s" }}>
                <h3 className="text-xl font-semibold mb-4">Recent Payouts</h3>
                {payoutHistory.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {payoutHistory.map((payout, index) => (
                      <AccordionItem key={index} value={`payout-${index}`} className="border-border">
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex justify-between items-center w-full pr-4">
                            <div className="text-left">
                              <p className="font-medium text-lg">{payout.amount}</p>
                              <p className="text-sm text-muted-foreground">{payout.date}</p>
                            </div>
                            <Badge className="bg-green-500/20 text-green-700 hover:bg-green-500/30">
                              Paid
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pt-2 pb-2 space-y-2 text-sm text-muted-foreground">
                            <div className="flex justify-between">
                              <span>Transaction ID:</span>
                              <span className="font-mono">TXN{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Payment Method:</span>
                              <span>UPI</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Status:</span>
                              <span className="text-green-600">Successfully Transferred</span>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No payout history yet
                  </p>
                )}
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
