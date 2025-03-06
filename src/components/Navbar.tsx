
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-4 sm:px-6 md:px-8",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-medium text-noushy-900 transition-opacity hover:opacity-80"
        >
          Noushy
          <span className="text-noushy-500">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-noushy-900 hover:text-noushy-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/booking"
            className="text-noushy-900 hover:text-noushy-600 transition-colors"
          >
            Book Appointment
          </Link>
          <Link
            to="/services"
            className="text-noushy-900 hover:text-noushy-600 transition-colors"
          >
            Services
          </Link>
          <Link
            to="/about"
            className="text-noushy-900 hover:text-noushy-600 transition-colors"
          >
            About
          </Link>
          <Button className="bg-noushy-500 hover:bg-noushy-600 text-white transition-colors shadow-sm">
            Contact Us
          </Button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-noushy-900 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm animate-fade-in">
          <nav className="flex flex-col space-y-4 p-6">
            <Link
              to="/"
              className="text-noushy-900 hover:text-noushy-600 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/booking"
              className="text-noushy-900 hover:text-noushy-600 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Appointment
            </Link>
            <Link
              to="/services"
              className="text-noushy-900 hover:text-noushy-600 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/about"
              className="text-noushy-900 hover:text-noushy-600 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Button 
              className="bg-noushy-500 hover:bg-noushy-600 text-white transition-colors w-full mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
