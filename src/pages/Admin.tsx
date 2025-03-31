
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  saveAvailableDays, 
  getAvailableDays, 
  DayAvailability, 
  TimeRange, 
  DEFAULT_TIME_RANGE 
} from "@/lib/bookingUtils";
import { Clock } from "lucide-react";

const Admin = () => {
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  const [availableDays, setAvailableDays] = useState<DayAvailability[]>([]);
  const [editingDay, setEditingDay] = useState<DayAvailability | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>(DEFAULT_TIME_RANGE);
  const navigate = useNavigate();

  // Load saved available days on component mount
  useEffect(() => {
    const savedDays = getAvailableDays();
    
    // Convert string dates to Date objects for the calendar
    const dates = savedDays
      .filter(day => day.available)
      .map(day => new Date(day.date));
    
    setAvailableDays(savedDays);
    setSelectedDays(dates);
  }, []);

  // Handle day selection - modified to accept an array of dates
  const handleSelect = (days: Date[] | undefined) => {
    if (days) {
      // Create a new array of available days
      const newAvailableDays: DayAvailability[] = [];
      
      // Normalize all dates to midnight to avoid time zone issues
      const normalizedSelectedDays = days.map(day => {
        const normalized = new Date(day);
        normalized.setHours(0, 0, 0, 0);
        return normalized;
      });
      
      setSelectedDays(normalizedSelectedDays);
      
      // Convert available days to a map for easier lookup
      const existingDaysMap = new Map<string, DayAvailability>();
      availableDays.forEach(day => {
        existingDaysMap.set(day.date, day);
      });
      
      // Add selected days to the new available days list
      normalizedSelectedDays.forEach(day => {
        const dateStr = format(day, "yyyy-MM-dd");
        const existingDay = existingDaysMap.get(dateStr);
        
        newAvailableDays.push({
          date: dateStr,
          available: true,
          customTimeRange: existingDay?.customTimeRange
        });
        
        // Remove from the map so we can collect unselected days later
        existingDaysMap.delete(dateStr);
      });
      
      // Add unselected days to the new available days list
      existingDaysMap.forEach(day => {
        newAvailableDays.push({
          ...day,
          available: false
        });
      });
      
      setAvailableDays(newAvailableDays);
    }
  };

  // Save available days
  const handleSave = () => {
    saveAvailableDays(availableDays);
    toast.success("Availability settings saved successfully!");
  };

  // Open day settings
  const handleEditDay = (day: DayAvailability) => {
    setEditingDay(day);
    setTimeRange(day.customTimeRange || DEFAULT_TIME_RANGE);
  };

  // Save day settings
  const handleSaveDaySettings = () => {
    if (!editingDay) return;

    const updatedDays = availableDays.map(day => {
      if (day.date === editingDay.date) {
        return {
          ...day,
          customTimeRange: timeRange
        };
      }
      return day;
    });

    setAvailableDays(updatedDays);
    setEditingDay(null);
    toast.success("Time range updated successfully!");
  };

  // Format date for display in the UI
  const formatDate = (date: Date | string) => {
    // If it's a string, convert to Date
    const displayDate = typeof date === 'string' ? new Date(date) : new Date(date);
    return format(displayDate, "EEEE, MMMM d, yyyy");
  };

  // Check if two dates are the same day (regardless of time)
  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() && 
           date1.getMonth() === date2.getMonth() && 
           date1.getFullYear() === date2.getFullYear();
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
              Manage your available days and time ranges for bookings.
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
                    onSelect={handleSelect}
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
                          .map((day, i) => {
                            const dateStr = format(day, "yyyy-MM-dd");
                            const dayConfig = availableDays.find(d => d.date === dateStr) || {
                              date: dateStr,
                              available: true
                            };
                            
                            return (
                              <li key={i} className="flex items-center justify-between p-2 rounded-md bg-noushy-50">
                                <span>{formatDate(day)}</span>
                                <div className="flex items-center gap-2">
                                  <Sheet>
                                    <SheetTrigger asChild>
                                      <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="text-noushy-500 hover:text-noushy-700"
                                        onClick={() => handleEditDay(dayConfig)}
                                      >
                                        <Clock className="h-4 w-4 mr-1" />
                                        Time
                                      </Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                      <SheetHeader>
                                        <SheetTitle>Customize Time Range</SheetTitle>
                                        <SheetDescription>
                                          Set custom time availability for {formatDate(dayConfig.date)}
                                        </SheetDescription>
                                      </SheetHeader>
                                      <div className="py-6 space-y-6">
                                        <div className="space-y-4">
                                          <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                              <Label htmlFor="custom-time-toggle">Use Custom Time Range:</Label>
                                              <Switch 
                                                id="custom-time-toggle" 
                                                checked={!!timeRange}
                                                onCheckedChange={(checked) => {
                                                  if (checked) {
                                                    setTimeRange(DEFAULT_TIME_RANGE);
                                                  } else {
                                                    setTimeRange({start: "", end: ""});
                                                  }
                                                }}
                                              />
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                              Default time range is 8:00 AM - 7:00 PM
                                            </p>
                                          </div>
                                          
                                          {timeRange && (
                                            <div className="grid grid-cols-2 gap-4">
                                              <div className="space-y-2">
                                                <Label htmlFor="start-time">Start Time</Label>
                                                <Input 
                                                  id="start-time" 
                                                  type="time" 
                                                  value={timeRange.start} 
                                                  onChange={(e) => setTimeRange(prev => ({
                                                    ...prev,
                                                    start: e.target.value
                                                  }))}
                                                />
                                              </div>
                                              <div className="space-y-2">
                                                <Label htmlFor="end-time">End Time</Label>
                                                <Input 
                                                  id="end-time" 
                                                  type="time" 
                                                  value={timeRange.end} 
                                                  onChange={(e) => setTimeRange(prev => ({
                                                    ...prev,
                                                    end: e.target.value
                                                  }))}
                                                />
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                        
                                        <div className="flex justify-end space-x-2">
                                          <Button variant="outline" onClick={() => setEditingDay(null)}>
                                            Cancel
                                          </Button>
                                          <Button onClick={handleSaveDaySettings}>
                                            Save Settings
                                          </Button>
                                        </div>
                                      </div>
                                    </SheetContent>
                                  </Sheet>
                                  
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-noushy-500 hover:text-noushy-700"
                                    onClick={() => {
                                      const newSelectedDays = selectedDays.filter(d => !isSameDay(d, day));
                                      setSelectedDays(newSelectedDays);
                                      
                                      const newAvailableDays = availableDays.map(d => {
                                        if (d.date === format(day, "yyyy-MM-dd")) {
                                          return { ...d, available: false };
                                        }
                                        return d;
                                      });
                                      
                                      setAvailableDays(newAvailableDays);
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </li>
                            );
                          })}
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
