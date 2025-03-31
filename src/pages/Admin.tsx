
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { saveAvailableDays, getAvailableDays } from "@/lib/bookingUtils";

const Admin = () => {
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  const navigate = useNavigate();

  // Load saved available days on component mount
  useEffect(() => {
    const savedDays = getAvailableDays();
    setSelectedDays(savedDays);
  }, []);

  // Handle day selection
  const handleSelect = (day: Date | undefined) => {
    if (!day) return;

    setSelectedDays(prev => {
      // Check if day is already selected
      const isSelected = prev.some(d => 
        d.getDate() === day.getDate() && 
        d.getMonth() === day.getMonth() && 
        d.getFullYear() === day.getFullYear()
      );

      // If selected, remove it; otherwise, add it
      if (isSelected) {
        return prev.filter(d => 
          d.getDate() !== day.getDate() || 
          d.getMonth() !== day.getMonth() || 
          d.getFullYear() !== day.getFullYear()
        );
      } else {
        return [...prev, day];
      }
    });
  };

  // Save available days
  const handleSave = () => {
    saveAvailableDays(selectedDays);
    toast.success("Availability settings saved successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-noushy-900 mb-4">Admin Dashboard</h1>
            <p className="text-lg text-noushy-700">
              Manage your available days for bookings.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Set Available Days</CardTitle>
                <CardDescription>
                  Select the days when you are available for appointments.
                  Click on a date to toggle availability.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center p-4 bg-white rounded-lg">
                  <Calendar
                    mode="multiple"
                    selected={selectedDays}
                    onSelect={(day) => handleSelect(day)}
                    className="rounded-md border"
                    numberOfMonths={2}
                    disabled={{ before: new Date() }}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => navigate("/")}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  Save Availability
                </Button>
              </CardFooter>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Selected Days</CardTitle>
                  <CardDescription>
                    You have selected {selectedDays.length} day(s) as available.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="max-h-[300px] overflow-y-auto">
                    {selectedDays.length > 0 ? (
                      <ul className="space-y-2">
                        {selectedDays
                          .sort((a, b) => a.getTime() - b.getTime())
                          .map((day, i) => (
                            <li key={i} className="flex items-center justify-between p-2 rounded-md bg-noushy-50">
                              <span>{format(day, "EEEE, MMMM d, yyyy")}</span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-noushy-500 hover:text-noushy-700"
                                onClick={() => handleSelect(day)}
                              >
                                Remove
                              </Button>
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <div className="text-center py-4 text-noushy-500">
                        No days selected
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" onClick={() => navigate("/booking")}>
                    View Booking Page
                  </Button>
                  <Button className="w-full" variant="outline" onClick={() => setSelectedDays([])}>
                    Clear All Selections
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
