import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import atumLogo from "@/assets/atum-logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 md:top-4 left-0 md:left-1/2 md:-translate-x-1/2 w-full md:w-auto z-50 transition-all duration-300 px-4 md:px-0 pt-4 md:pt-0">
      <nav
        className={`
          backdrop-blur-md bg-card/80 border border-border/50 rounded-full shadow-glow
          transition-all duration-300 px-4 md:px-6 py-3
          w-full md:w-auto ${isScrolled ? "md:w-[600px]" : "md:w-[800px]"}
        `}
      >
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex-shrink-0">
            <img src={atumLogo} alt="Atum Logo" className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("home")}
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("templates")}
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Templates
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Testimonials
            </button>
            <Link
              to="/contact"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>

            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-border">
              <Link to="/signin">
                <Button variant="ghost" size="sm" className="text-sm">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="text-sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <nav className="flex flex-col gap-4 mt-8">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-left text-foreground hover:text-primary transition-colors py-2"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("templates")}
                  className="text-left text-foreground hover:text-primary transition-colors py-2"
                >
                  Templates
                </button>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="text-left text-foreground hover:text-primary transition-colors py-2"
                >
                  Testimonials
                </button>
                <Link
                  to="/contact"
                  className="text-foreground hover:text-primary transition-colors py-2"
                >
                  Contact
                </Link>
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border">
                  <Link to="/signin">
                    <Button variant="ghost" className="w-full">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Header;
