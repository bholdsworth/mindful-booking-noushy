
import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Check, FileText } from "lucide-react";
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
  serviceTypes,
  medicareCodes,
  isDateMoreThanMonthAhead,
  isDayAvailable
} from "@/lib/bookingUtils";
import { motion, AnimatePresence } from "framer-motion";

const BookingForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<BookingFormData>(initialBookingData);
  const [timeSlots, setTimeSlots] = useState<TimeSlotType[]>([]);
  const [currentTab, setCurrentTab] = useState("details");
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  
  const handleChange = (field: keyof BookingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      if (isDateMoreThanMonthAhead(date)) {
        toast({
          title: "Date not available",
          description: "Bookings can only be made up to one month in advance.",
          variant: "destructive",
        });
        return;
      }
      
      if (!isDayAvailable(date)) {
        toast({
          title: "Date not available",
          description: "The selected date is not available for booking.",
          variant: "destructive",
        });
        return;
      }
      
      handleChange("date", date);
      const slots = getTimeSlots(date);
      setTimeSlots(slots);
      handleChange("timeSlot", null);
    }
  };
  
  const handleTimeSlotSelect = (slot: TimeSlotType) => {
    handleChange("timeSlot", slot);
  };
  
  const handleTabChange = (value: string) => {
    if (value === "review") {
      const validationErrors = validateBookingData(formData, false);
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
  
  const handleSubmit = () => {
    const validationErrors = validateBookingData(formData, false);
    setErrors(validationErrors);
    
    if (validationErrors.length > 0) {
      toast({
        title: "Please complete all required fields",
        description: "Some information is missing or incorrect",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.medicareCode && medicareCodes.length > 0) {
      handleChange("medicareCode", medicareCodes[0].code);
    }
    
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
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="details" className="data-[state=active]:bg-noushy-500 data-[state=active]:text-white">
              <span className="flex items-center">
                <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-semibold">
                  1
                </span>
                Details & Appointment
              </span>
            </TabsTrigger>
            <TabsTrigger value="review" className="data-[state=active]:bg-noushy-500 data-[state=active]:text-white">
              <span className="flex items-center">
                <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-semibold">
                  2
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
                  
                  <div className="space-y-2">
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
                </div>
                
                <div className="mt-8 space-y-8">
                  <h2 className="text-2xl font-semibold text-noushy-900">Select Date & Time</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 col-span-1">
                      <Label htmlFor="date">Appointment Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="date"
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.date && "text-muted-foreground",
                              errors.includes("Date is required") ? "border-red-500" : ""
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
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              return date < today || 
                                     isDateMoreThanMonthAhead(date) ||
                                     !isDayAvailable(date);
                            }}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <p className="text-xs text-noushy-600 mt-1">
                        Note: Bookings can only be made on available days set by the administrator 
                        and up to one month in advance.
                      </p>
                    </div>
                    
                    {formData.date && (
                      <div className="col-span-1 flex items-start">
                        <div className="bg-noushy-50 p-4 rounded-lg w-full">
                          <div className="flex items-center mb-4">
                            <CalendarIcon className="h-5 w-5 text-noushy-600 mr-2" />
                            <span className="font-medium text-noushy-700">
                              {format(formData.date, "EEEE, MMMM d, yyyy")}
                            </span>
                          </div>
                          
                          {formData.timeSlot && (
                            <div className="flex items-center justify-center px-3 py-2 rounded-lg bg-noushy-100 mb-2">
                              <Clock className="mr-2 h-4 w-4 text-noushy-700" />
                              <span className="text-sm font-medium text-noushy-700">Selected: {formData.timeSlot.formattedTime}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {formData.date && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-noushy-800">Available Time Slots</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-noushy-50 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-noushy-700 mb-2">Morning</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
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
                              {timeSlots.filter(slot => {
                                const hour = slot.time.getHours();
                                return hour >= 7 && hour < 12;
                              }).length === 0 && (
                                <p className="col-span-full text-center text-sm text-gray-500 py-4">No morning slots available</p>
                              )}
                          </div>
                        </div>
                        
                        <div className="bg-noushy-50 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-noushy-700 mb-2">Afternoon</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
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
                              {timeSlots.filter(slot => {
                                const hour = slot.time.getHours();
                                return hour >= 14 && hour < 18;
                              }).length === 0 && (
                                <p className="col-span-full text-center text-sm text-gray-500 py-4">No afternoon slots available</p>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
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
                    onClick={() => handleTabChange("review")}
                    disabled={!formData.timeSlot}
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
                    onClick={() => handleTabChange("details")}
                  >
                    Back to Details
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
