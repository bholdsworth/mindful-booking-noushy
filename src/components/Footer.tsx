
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-noushy-50 border-t border-noushy-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-block text-2xl font-medium text-noushy-900 mb-4">
              Noushy<span className="text-noushy-500">.</span>
            </Link>
            <p className="text-noushy-700 mb-6 max-w-xs">
              Professional physiotherapy care tailored to your individual needs.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-noushy-500 hover:text-noushy-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-noushy-500 hover:text-noushy-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-noushy-500 hover:text-noushy-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div className="col-span-1">
            <h3 className="text-noushy-900 font-medium mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-noushy-700 hover:text-noushy-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-noushy-700 hover:text-noushy-500 transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-noushy-700 hover:text-noushy-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-noushy-700 hover:text-noushy-500 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="col-span-1">
            <h3 className="text-noushy-900 font-medium mb-4">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-noushy-700 hover:text-noushy-500 transition-colors">
                  Sports Rehabilitation
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-noushy-700 hover:text-noushy-500 transition-colors">
                  Manual Therapy
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-noushy-700 hover:text-noushy-500 transition-colors">
                  Pain Management
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-noushy-700 hover:text-noushy-500 transition-colors">
                  Post-Surgery Recovery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-span-1">
            <h3 className="text-noushy-900 font-medium mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-noushy-500 mr-3 mt-0.5" />
                <span className="text-noushy-700">
                  123 Healing Street<br />Wellness District, WL 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-noushy-500 mr-3" />
                <a href="tel:+11234567890" className="text-noushy-700 hover:text-noushy-500 transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-noushy-500 mr-3" />
                <a href="mailto:info@noushy.com" className="text-noushy-700 hover:text-noushy-500 transition-colors">
                  info@noushy.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-noushy-100 text-center text-noushy-600">
          <p>© {currentYear} Noushy Physiotherapy Centre. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
