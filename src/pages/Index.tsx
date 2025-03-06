
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-noushy-50 to-white -z-10" />
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 md:pr-12 mb-12 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-noushy-900 leading-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                Your Path to <span className="text-noushy-500">Recovery</span> Starts Here
              </motion.h1>
              <motion.p 
                className="text-xl text-noushy-700 mb-8 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                At Noushy Physiotherapy Centre, we're dedicated to helping you achieve optimal physical health through personalized care and evidence-based treatments.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <Link to="/booking">
                  <Button className="bg-noushy-500 hover:bg-noushy-600 text-white py-6 px-8 shadow-sm">
                    Book an Appointment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" className="py-6 px-8">
                  Our Services
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-noushy-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-noushy-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="relative glass rounded-2xl overflow-hidden border border-noushy-100">
                  <img 
                    src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80" 
                    alt="Female rugby player receiving physiotherapy" 
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-noushy-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Why Choose Noushy Physiotherapy
            </motion.h2>
            <motion.p 
              className="text-noushy-700 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              We combine expertise, personalized care, and state-of-the-art techniques to help you achieve your health goals.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-noushy-50 rounded-xl p-8 border border-noushy-100 shadow-sm transition-all hover:shadow-md hover:translate-y-[-4px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-noushy-100 rounded-full flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-noushy-600" />
              </div>
              <h3 className="text-xl font-semibold text-noushy-900 mb-4">Expert Therapists</h3>
              <p className="text-noushy-700">Our team consists of highly qualified physiotherapists with years of experience in various specialties.</p>
            </motion.div>
            
            <motion.div 
              className="bg-noushy-50 rounded-xl p-8 border border-noushy-100 shadow-sm transition-all hover:shadow-md hover:translate-y-[-4px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-12 h-12 bg-noushy-100 rounded-full flex items-center justify-center mb-6">
                <Calendar className="h-6 w-6 text-noushy-600" />
              </div>
              <h3 className="text-xl font-semibold text-noushy-900 mb-4">Convenient Booking</h3>
              <p className="text-noushy-700">Our online booking system makes it easy to schedule appointments at your convenience.</p>
            </motion.div>
            
            <motion.div 
              className="bg-noushy-50 rounded-xl p-8 border border-noushy-100 shadow-sm transition-all hover:shadow-md hover:translate-y-[-4px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-12 h-12 bg-noushy-100 rounded-full flex items-center justify-center mb-6">
                <Clock className="h-6 w-6 text-noushy-600" />
              </div>
              <h3 className="text-xl font-semibold text-noushy-900 mb-4">Flexible Hours</h3>
              <p className="text-noushy-700">We offer early morning and evening appointments to accommodate your busy schedule.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-noushy-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-noushy-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-noushy-900 mb-4">Ready to Start Your Recovery Journey?</h2>
                <p className="text-noushy-700 mb-8">Book your appointment today and take the first step towards improved health and wellbeing.</p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <Check className="h-5 w-5 text-noushy-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-noushy-900">Personalized treatment plans</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <Check className="h-5 w-5 text-noushy-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-noushy-900">Convenient online booking</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <Check className="h-5 w-5 text-noushy-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-noushy-900">Flexible appointment hours</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Link to="/booking">
                    <Button className="bg-noushy-500 hover:bg-noushy-600 text-white py-6 px-8 shadow-sm">
                      Book an Appointment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Physiotherapy equipment" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
