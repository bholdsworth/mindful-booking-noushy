
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import { motion } from "framer-motion";

const Booking = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-noushy-900 mb-4">Book Your Appointment</h1>
            <p className="text-lg text-noushy-700">
              Schedule a session with our expert physiotherapists and start your journey to recovery.
            </p>
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
