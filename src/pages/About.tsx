
import React from "react";
import { motion } from "framer-motion";
import { Check, Users, Award, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold text-noushy-900 mb-6">About Noushy Physiotherapy</h1>
            <p className="text-xl text-noushy-700 mb-8">
              Our mission is to provide exceptional care and help our patients achieve optimal physical health through personalized treatments.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-noushy-900 mb-6">Our Story</h2>
              <p className="text-noushy-700 mb-6">
                Founded in 2010, Noushy Physiotherapy Centre began with a simple vision: to provide personalized, evidence-based physiotherapy care that helps people regain their mobility, reduce pain, and enhance their quality of life.
              </p>
              <p className="text-noushy-700 mb-6">
                What started as a small clinic has grown into a respected physiotherapy center with a team of dedicated professionals committed to improving the health and wellbeing of our community.
              </p>
              <p className="text-noushy-700">
                Over the years, we've helped thousands of patients overcome physical challenges and achieve their health goals through our comprehensive approach to physiotherapy.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Our clinic" 
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-16 md:py-24 bg-noushy-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-noushy-900 mb-4">Our Values</h2>
            <p className="text-noushy-700 text-lg">
              These core principles guide everything we do at Noushy Physiotherapy Centre.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white rounded-xl p-8 shadow-sm transition-all hover:shadow-md hover:translate-y-[-4px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-noushy-100 rounded-full flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-noushy-600" />
              </div>
              <h3 className="text-xl font-semibold text-noushy-900 mb-4">Patient-Centered Care</h3>
              <p className="text-noushy-700">We put our patients' needs first, creating personalized treatment plans tailored to individual health goals.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl p-8 shadow-sm transition-all hover:shadow-md hover:translate-y-[-4px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-noushy-100 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="h-6 w-6 text-noushy-600" />
              </div>
              <h3 className="text-xl font-semibold text-noushy-900 mb-4">Evidence-Based Practice</h3>
              <p className="text-noushy-700">We combine clinical expertise with the latest research to provide the most effective treatments available.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl p-8 shadow-sm transition-all hover:shadow-md hover:translate-y-[-4px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-12 h-12 bg-noushy-100 rounded-full flex items-center justify-center mb-6">
                <Award className="h-6 w-6 text-noushy-600" />
              </div>
              <h3 className="text-xl font-semibold text-noushy-900 mb-4">Excellence & Integrity</h3>
              <p className="text-noushy-700">We strive for the highest standards of care and maintain honest, transparent relationships with our patients.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-noushy-900 mb-4">Our Team</h2>
            <p className="text-noushy-700 text-lg">
              Meet our team of experienced physiotherapists dedicated to helping you achieve optimal health.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-noushy-50 rounded-xl overflow-hidden shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Dr. Sarah Johnson" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-noushy-900 mb-1">Dr. Sarah Johnson</h3>
                <p className="text-noushy-600 mb-4">Lead Physiotherapist</p>
                <p className="text-noushy-700">Specializing in sports rehabilitation and post-surgical recovery with 15+ years of experience.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-noushy-50 rounded-xl overflow-hidden shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1622902046580-2b47f47f5471?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Dr. Michael Chen" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-noushy-900 mb-1">Dr. Michael Chen</h3>
                <p className="text-noushy-600 mb-4">Senior Physiotherapist</p>
                <p className="text-noushy-700">Expert in manual therapy and chronic pain management with a patient-centered approach.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-noushy-50 rounded-xl overflow-hidden shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Dr. Emily Rodriguez" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-noushy-900 mb-1">Dr. Emily Rodriguez</h3>
                <p className="text-noushy-600 mb-4">Physiotherapist</p>
                <p className="text-noushy-700">Specialized in neurological rehabilitation and geriatric care with a compassionate approach.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
