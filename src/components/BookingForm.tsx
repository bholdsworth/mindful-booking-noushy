
import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import TimeSlot from "./TimeSlot";
import BookingConfirmation from "./BookingConfirmation";
import {
  BookingFormData,
  TimeSlot as TimeSlotType,
  initialBookingData,
  getAvailableDates,
  getTimeSlots,
  validateBookingData,
  serviceTypes
} from "@/lib/bookingUtils";
import { motion, AnimatePresence } from "framer-motion";

const BookingForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<BookingFormData>(initialBookingData);
  const [timeSlots, setTimeSlots] = useState<TimeSlotType[]>([]);
  const [currentTab, setCurrentTab] = useState("details");
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  
  // Update form data
  const handleChange = (field: keyof BookingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      handleChange("date", date);
      const slots = getTimeSlots(date);
      setTimeSlots(slots);
      handleChange("timeSlot", null);
    }
  };
  
  // Handle time slot selection
  const handleTimeSlotSelect = (slot: TimeSlotType) => {
    handleChange("timeSlot", slot);
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    // Only check for date if going from details to time
    if (value === "time" && currentTab === "details" && !formData.date) {
      // If trying to go to time tab without selecting a date, show error
      toast({
        title: "Please select a date first",
        description: "You need to select a date before choosing a time slot",
        variant: "destructive",
      });
      return;
    }
    
    if (value === "review") {
      // Validate form data before going to review
      const validationErrors = validateBookingData(formData);
      setErrors(validationErrors);
      
      if (validationErrors.length > 0) {
        toast({
          title: "Please complete all required fields",
          description: "Some information is missing or incorrect",
          variant: "destructive",
        });
        return;
      }
    }
    
    setCurrentTab(value);
  };
  
  // Handle form submission
  const handleSubmit = () => {
    const validationErrors = validateBookingData(formData);
    setErrors(validationErrors);
    
    if (validationErrors.length > 0) {
      toast({
        title: "Please complete all required fields",
        description: "Some information is missing or incorrect",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, you would submit the data to your backend here
    // For now, we'll just show a success message
    toast({
      title: "Booking successful!",
      description: "Your appointment has been booked successfully.",
    });
    
    setConfirmed(true);
  };
  
  const handleBack = () => {
    setConfirmed(false);
  };
  
  if (confirmed) {
    return <BookingConfirmation booking={formData} onBack={handleBack} />;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="details" className="data-[state=active]:bg-noushy-500 data-[state=active]:text-white">
              <span className="flex items-center">
                <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-semibold">
                  1
                </span>
                Details
              </span>
            </TabsTrigger>
            <TabsTrigger value="time" className="data-[state=active]:bg-noushy-500 data-[state=active]:text-white">
              <span className="flex items-center">
                <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-semibold">
                  2
                </span>
                Date & Time
              </span>
            </TabsTrigger>
            <TabsTrigger value="review" className="data-[state=active]:bg-noushy-500 data-[state=active]:text-white">
              <span className="flex items-center">
                <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-semibold">
                  3
                </span>
                Review
              </span>
            </TabsTrigger>
          </TabsList>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="details" className="mt-8">
              <div className="bg-white rounded-2xl border border-noushy-100 shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-semibold mb-6 text-noushy-900">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      placeholder="Enter your first name"
                      className={errors.includes("First name is required") ? "border-red-500" : ""}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      placeholder="Enter your last name"
                      className={errors.includes("Last name is required") ? "border-red-500" : ""}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="Enter your email"
                      className={errors.some(e => e.includes("Email")) ? "border-red-500" : ""}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                      className={errors.includes("Phone number is required") ? "border-red-500" : ""}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="serviceType">Service Type</Label>
                    <Select
                      value={formData.serviceType}
                      onValueChange={(value) => handleChange("serviceType", value)}
                    >
                      <SelectTrigger id="serviceType" className={errors.includes("Service type is required") ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                      placeholder="Any specific concerns or information you'd like to share"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <Button 
                    className="bg-noushy-500 hover:bg-noushy-600 text-white transition-colors"
                    onClick={() => handleTabChange("time")}
                  >
                    Continue to Date & Time
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="time" className="mt-8">
              <div className="bg-white rounded-2xl border border-noushy-100 shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-semibold mb-6 text-noushy-900">Select Date & Time</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-noushy-800">Select a Date</h3>
                    <div className="flex justify-center">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 pointer-events-auto">
                          <Calendar
                            mode="single"
                            selected={formData.date}
                            onSelect={handleDateSelect}
                            disabled={(date) => {
                              // Disable weekends and past dates
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              return date < today || date.getDay() === 0 || date.getDay() === 6;
                            }}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-noushy-800">Select a Time</h3>
                      {formData.timeSlot && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-noushy-100 text-noushy-800">
                          <Clock className="h-3 w-3 mr-1" />
                          {formData.timeSlot.formattedTime}
                        </span>
                      )}
                    </div>
                    
                    {formData.date ? (
                      <div className="space-y-4">
                        <div className="bg-noushy-50 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-noushy-700 mb-2">Morning</h4>
                          <div className="time-slot-grid">
                            {timeSlots
                              .filter(slot => {
                                const hour = slot.time.getHours();
                                return hour >= 7 && hour < 12;
                              })
                              .map(slot => (
                                <TimeSlot
                                  key={slot.id}
                                  slot={slot}
                                  isSelected={formData.timeSlot?.id === slot.id}
                                  onClick={handleTimeSlotSelect}
                                />
                              ))}
                          </div>
                        </div>
                        
                        <div className="bg-noushy-50 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-noushy-700 mb-2">Afternoon</h4>
                          <div className="time-slot-grid">
                            {timeSlots
                              .filter(slot => {
                                const hour = slot.time.getHours();
                                return hour >= 14 && hour < 18;
                              })
                              .map(slot => (
                                <TimeSlot
                                  key={slot.id}
                                  slot={slot}
                                  isSelected={formData.timeSlot?.id === slot.id}
                                  onClick={handleTimeSlotSelect}
                                />
                              ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-48 border-2 border-dashed border-noushy-200 rounded-lg bg-noushy-50">
                        <div className="text-center">
                          <CalendarIcon className="mx-auto h-8 w-8 text-noushy-400" />
                          <p className="mt-2 text-sm text-noushy-600">
                            Please select a date first
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row sm:justify-between items-center space-y-4 sm:space-y-0">
                  <Button
                    variant="outline"
                    onClick={() => handleTabChange("details")}
                  >
                    Back to Details
                  </Button>
                  
                  <Button
                    className="bg-noushy-500 hover:bg-noushy-600 text-white transition-colors"
                    onClick={() => handleTabChange("review")}
                    disabled={!formData.date || !formData.timeSlot}
                  >
                    Continue to Review
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="review" className="mt-8">
              <div className="bg-white rounded-2xl border border-noushy-100 shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-semibold mb-6 text-noushy-900">Review Your Booking</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-noushy-800">Personal Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-noushy-600">Name:</span>
                        <span className="text-noushy-900 font-medium">{formData.firstName} {formData.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-noushy-600">Email:</span>
                        <span className="text-noushy-900 font-medium">{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-noushy-600">Phone:</span>
                        <span className="text-noushy-900 font-medium">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-noushy-600">Service:</span>
                        <span className="text-noushy-900 font-medium">{formData.serviceType}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-noushy-800">Appointment Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-noushy-600">Date:</span>
                        <span className="text-noushy-900 font-medium">
                          {formData.date ? format(formData.date, "EEEE, MMMM d, yyyy") : ""}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-noushy-600">Time:</span>
                        <span className="text-noushy-900 font-medium">{formData.timeSlot?.formattedTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {formData.notes && (
                  <div className="mt-6 border-t border-noushy-100 pt-6">
                    <h3 className="text-lg font-medium text-noushy-800 mb-2">Additional Notes</h3>
                    <p className="text-noushy-700 bg-noushy-50 p-4 rounded-lg">{formData.notes}</p>
                  </div>
                )}
                
                <div className="mt-8 flex flex-col sm:flex-row sm:justify-between items-center space-y-4 sm:space-y-0">
                  <Button
                    variant="outline"
                    onClick={() => handleTabChange("time")}
                  >
                    Back to Date & Time
                  </Button>
                  
                  <Button
                    className="bg-noushy-500 hover:bg-noushy-600 text-white transition-colors"
                    onClick={handleSubmit}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Confirm Booking
                  </Button>
                </div>
              </div>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
};

export default BookingForm;

