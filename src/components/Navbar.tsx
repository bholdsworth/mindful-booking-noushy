
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-noushy-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-noushy-900">Noushy</span>
            <span className="text-noushy-500">Physiotherapy</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-noushy-700 hover:text-noushy-900 font-medium">Home</Link>
            <Link to="/about" className="text-noushy-700 hover:text-noushy-900 font-medium">About</Link>
            <Link to="/booking" className="text-noushy-700 hover:text-noushy-900 font-medium">Book</Link>
            <Link to="/contact" className="text-noushy-700 hover:text-noushy-900 font-medium">Contact</Link>
            <Link to="/admin" className="text-noushy-700 hover:text-noushy-900 font-medium">Admin</Link>
          </nav>
          
          {/* Right Section with Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/booking">
              <Button className="bg-noushy-500 hover:bg-noushy-600 text-white">
                <Calendar className="mr-2 h-4 w-4" />
                Book Now
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              className="p-2" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute w-full bg-white border-b border-noushy-100 shadow-lg transition-all duration-300 ease-in-out",
        mobileMenuOpen ? "max-h-60 py-4" : "max-h-0 py-0 overflow-hidden"
      )}>
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <Link 
            to="/" 
            className="text-noushy-700 hover:text-noushy-900 font-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-noushy-700 hover:text-noushy-900 font-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/booking" 
            className="text-noushy-700 hover:text-noushy-900 font-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book
          </Link>
          <Link 
            to="/contact" 
            className="text-noushy-700 hover:text-noushy-900 font-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <Link 
            to="/admin" 
            className="text-noushy-700 hover:text-noushy-900 font-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Admin
          </Link>
          <Link to="/booking" onClick={() => setMobileMenuOpen(false)}>
            <Button className="bg-noushy-500 hover:bg-noushy-600 text-white w-full">
              <Calendar className="mr-2 h-4 w-4" />
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
