
import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    toast.success("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 bg-noushy-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-noushy-900 mb-6">Contact Us</h1>
            <p className="text-xl text-noushy-700 mb-8">
              Have questions or ready to book an appointment? Get in touch with our team today.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Form & Info Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-noushy-900 mb-6">Get in Touch</h2>
                <p className="text-noushy-700 mb-8">
                  We're here to answer your questions and provide the support you need. Reach out to us using any of the following methods or fill out the contact form.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <MapPin className="h-6 w-6 text-noushy-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-noushy-900 mb-1">Our Location</h3>
                    <p className="text-noushy-700">
                      123 Healing Street<br />
                      Wellness District, WL 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Mail className="h-6 w-6 text-noushy-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-noushy-900 mb-1">Email Us</h3>
                    <a href="mailto:info@noushy.com" className="text-noushy-700 hover:text-noushy-500 transition-colors">
                      info@noushy.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Phone className="h-6 w-6 text-noushy-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-noushy-900 mb-1">Call Us</h3>
                    <a href="tel:+11234567890" className="text-noushy-700 hover:text-noushy-500 transition-colors">
                      +1 (123) 456-7890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Clock className="h-6 w-6 text-noushy-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-noushy-900 mb-1">Working Hours</h3>
                    <p className="text-noushy-700">
                      Monday - Friday: 8:00 AM - 7:00 PM<br />
                      Saturday: 9:00 AM - 5:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-noushy-50 rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-noushy-900 mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-noushy-900 font-medium">
                        Your Name
                      </label>
                      <Input 
                        id="name" 
                        placeholder="John Doe" 
                        required 
                        className="border-noushy-200 focus:border-noushy-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-noushy-900 font-medium">
                        Your Email
                      </label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        required 
                        className="border-noushy-200 focus:border-noushy-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-noushy-900 font-medium">
                      Subject
                    </label>
                    <Input 
                      id="subject" 
                      placeholder="How can we help you?" 
                      required 
                      className="border-noushy-200 focus:border-noushy-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-noushy-900 font-medium">
                      Message
                    </label>
                    <Textarea 
                      id="message" 
                      placeholder="Your message here..." 
                      required 
                      className="min-h-[150px] border-noushy-200 focus:border-noushy-500"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-noushy-500 hover:bg-noushy-600 text-white">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="bg-noushy-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-md">
              <div className="bg-gray-300 h-[400px] flex items-center justify-center">
                <div className="text-center p-6">
                  <MapPin className="h-10 w-10 text-noushy-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-noushy-900 mb-2">Map Placeholder</h3>
                  <p className="text-noushy-700">
                    In a real application, an interactive map would be displayed here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
