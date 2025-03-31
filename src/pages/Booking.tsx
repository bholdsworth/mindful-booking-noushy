
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import { motion } from "framer-motion";
import { CalendarIcon, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Booking = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-6 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-noushy-900 mb-4">Book Your Appointment</h1>
            <p className="text-lg text-noushy-700">
              Schedule a session with our expert physiotherapists and start your journey to recovery.
            </p>
          </motion.div>
          
          {/* Booking Notice */}
          <motion.div
            className="max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Alert className="bg-noushy-50 border-noushy-200">
              <CalendarIcon className="h-4 w-4 text-noushy-500" />
              <AlertDescription className="text-noushy-700">
                Please note that appointments can only be booked up to one month in advance.
              </AlertDescription>
            </Alert>
          </motion.div>
          
          {/* Booking Form */}
          <BookingForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Booking;
