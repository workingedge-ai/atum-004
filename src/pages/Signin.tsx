import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Signin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) throw error;

      if (data.user) {
        // Fetch user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', data.user.id)
          .single();

        if (profileError) {
          console.error("Profile fetch error:", profileError);
        } else if (profile) {
          // Store in localStorage for quick access
          localStorage.setItem("atumUser", JSON.stringify({
            name: profile.name,
            email: profile.email,
            city: profile.city,
            phone: profile.phone,
            upiId: profile.upi_id
          }));
        }

        toast({
          title: "Welcome back!",
          description: "You have successfully signed in",
        });

        navigate("/dashboard");
      }

    } catch (error: any) {
      console.error("Signin error:", error);
      toast({
        title: "Error",
        description: error.message || "Invalid email or password",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Password reset link sent to " + resetEmail,
      });

      setShowForgotPassword(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reset link",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-secondary hover:text-primary transition-colors mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <Card className="gradient-card shadow-glow p-8 border-border">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-secondary mb-2">
              {showForgotPassword ? "Reset Password" : "Welcome Back"}
            </h1>
            <p className="text-muted-foreground">
              {showForgotPassword 
                ? "Enter your email to receive a reset link" 
                : "Sign in to your Atum account"}
            </p>
          </div>

          {!showForgotPassword ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-input border-border"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-input border-border"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full shadow-glow"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="resetEmail">Email Address</Label>
                <Input
                  id="resetEmail"
                  name="resetEmail"
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="bg-input border-border"
                  placeholder="your.email@example.com"
                />
              </div>

              <Button
                type="submit"
                className="w-full shadow-glow"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setShowForgotPassword(false)}
              >
                Back to Sign In
              </Button>
            </form>
          )}

          {!showForgotPassword && (
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Signin;
