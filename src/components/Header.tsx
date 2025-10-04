import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300">
      <nav
        className={`
          backdrop-blur-md bg-card/80 border border-border/50 rounded-full shadow-glow
          transition-all duration-300 px-6 py-3
          ${isScrolled ? "w-[600px]" : "w-[800px]"}
        `}
      >
        <div className="flex items-center justify-between gap-8">
          <Link to="/" className="flex-shrink-0">
            <img src={atumLogo} alt="Atum Logo" className="h-8 w-auto" />
          </Link>

          <div className="flex items-center gap-6">
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
