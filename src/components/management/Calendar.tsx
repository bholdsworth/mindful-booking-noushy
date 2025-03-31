
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Filter, 
  Calendar as CalendarIcon,
  User,
  Clock,
  Edit
} from "lucide-react";
import { format, addDays, addMonths, addWeeks, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock appointment data
const appointments = [
  {
    id: 1,
    patient: "Sarah Johnson",
    patientId: 1,
    date: new Date(2023, 6, 15, 9, 0),
    endTime: new Date(2023, 6, 15, 10, 0),
    type: "Initial Assessment",
    practitioner: "Dr. Jessica Lee",
    status: "Confirmed",
    color: "#4f46e5", // Indigo
  },
  {
    id: 2,
    patient: "Michael Brown",
    patientId: 2,
    date: new Date(2023, 6, 15, 11, 0),
    endTime: new Date(2023, 6, 15, 12, 0),
    type: "Follow-up",
    practitioner: "Dr. Jessica Lee",
    status: "Confirmed",
    color: "#4f46e5", // Indigo
  },
  {
    id: 3,
    patient: "Emily Davis",
    patientId: 3,
    date: new Date(2023, 6, 16, 14, 0),
    endTime: new Date(2023, 6, 16, 15, 0),
    type: "Manual Therapy",
    practitioner: "Dr. Marcus Chen",
    status: "Confirmed",
    color: "#0ea5e9", // Sky blue
  },
  {
    id: 4,
    patient: "James Wilson",
    patientId: 4,
    date: new Date(2023, 6, 17, 10, 30),
    endTime: new Date(2023, 6, 17, 11, 30),
    type: "Follow-up",
    practitioner: "Dr. Jessica Lee",
    status: "Confirmed",
    color: "#4f46e5", // Indigo
  },
  {
    id: 5,
    patient: "Sophia Martinez",
    patientId: 5,
    date: new Date(2023, 6, 17, 13, 30),
    endTime: new Date(2023, 6, 17, 14, 30),
    type: "Exercise Therapy",
    practitioner: "Dr. Marcus Chen",
    status: "Confirmed",
    color: "#0ea5e9", // Sky blue
  }
];

// Practitioner data
const practitioners = [
  { id: 1, name: "Dr. Jessica Lee", color: "#4f46e5" },
  { id: 2, name: "Dr. Marcus Chen", color: "#0ea5e9" },
  { id: 3, name: "Dr. Sarah Miller", color: "#16a34a" }
];

const CalendarView = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("week");
  const [selectedPractitioners, setSelectedPractitioners] = useState<string[]>(practitioners.map(p => p.name));

  // Filter appointments by selected practitioners
  const filteredAppointments = appointments.filter(appointment => 
    selectedPractitioners.includes(appointment.practitioner)
  );

  const handleTogglePractitioner = (practitioner: string) => {
    if (selectedPractitioners.includes(practitioner)) {
      setSelectedPractitioners(selectedPractitioners.filter(p => p !== practitioner));
    } else {
      setSelectedPractitioners([...selectedPractitioners, practitioner]);
    }
  };

  const handlePrevious = () => {
    if (view === "day") {
      setDate(prev => addDays(prev, -1));
    } else if (view === "week") {
      setDate(prev => addWeeks(prev, -1));
    } else {
      setDate(prev => addMonths(prev, -1));
    }
  };

  const handleNext = () => {
    if (view === "day") {
      setDate(prev => addDays(prev, 1));
    } else if (view === "week") {
      setDate(prev => addWeeks(prev, 1));
    } else {
      setDate(prev => addMonths(prev, 1));
    }
  };

  const handleToday = () => {
    setDate(new Date());
  };

  // Generate hours for day view
  const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8:00 AM to 6:00 PM

  // Generate days for week view
  const weekDays = eachDayOfInterval({
    start: startOfWeek(date, { weekStartsOn: 1 }),
    end: endOfWeek(date, { weekStartsOn: 1 }),
  });

  // Generate days for month view
  const monthDays = eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });

  // Get appointments for a specific day
  const getAppointmentsForDay = (day: Date) => {
    return filteredAppointments.filter(appointment => 
      isSameDay(appointment.date, day)
    ).sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  // Get appointments for a specific hour
  const getAppointmentsForHour = (day: Date, hour: number) => {
    return filteredAppointments.filter(appointment => 
      isSameDay(appointment.date, day) && 
      appointment.date.getHours() === hour
    );
  };

  // Format for header display
  const getHeaderText = () => {
    if (view === "day") {
      return format(date, "EEEE, MMMM d, yyyy");
    } else if (view === "week") {
      const start = weekDays[0];
      const end = weekDays[weekDays.length - 1];
      return `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`;
    } else {
      return format(date, "MMMM yyyy");
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Calendar</h1>
          <p className="text-slate-500">Manage appointments and scheduling</p>
        </div>
        <Button onClick={() => console.log("Create appointment")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Appointment
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {/* Calendar Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Practitioners</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2">
                {practitioners.map((practitioner) => (
                  <div 
                    key={practitioner.id} 
                    className="flex items-center"
                  >
                    <Button
                      variant="outline"
                      className={`w-full justify-start ${selectedPractitioners.includes(practitioner.name) ? 'border-slate-300' : 'border-slate-200 opacity-60'}`}
                      onClick={() => handleTogglePractitioner(practitioner.name)}
                    >
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: practitioner.color }}
                      />
                      {practitioner.name}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Filter</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Appointment Type</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="initial">Initial Assessment</SelectItem>
                      <SelectItem value="followup">Follow-up</SelectItem>
                      <SelectItem value="therapy">Therapy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Main Content */}
        <div className="md:col-span-3">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">{getHeaderText()}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleToday}>
                    Today
                  </Button>
                  <div className="flex items-center">
                    <Button variant="outline" size="icon" onClick={handlePrevious}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleNext}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* Move TabsList inside the Tabs component below */}
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="p-0">
              <Tabs value={view} className="w-full">
                <TabsList className="mb-2 mt-2 ml-2">
                  <TabsTrigger value="day" onClick={() => setView("day")}>Day</TabsTrigger>
                  <TabsTrigger value="week" onClick={() => setView("week")}>Week</TabsTrigger>
                  <TabsTrigger value="month" onClick={() => setView("month")}>Month</TabsTrigger>
                </TabsList>
                
                {/* Day View */}
                <TabsContent value="day" className="w-full m-0">
                  <div className="overflow-auto">
                    <div className="min-w-[600px]">
                      {hours.map((hour) => (
                        <div key={hour} className="flex">
                          <div className="w-20 py-4 px-3 text-right text-sm text-slate-500">
                            {hour === 12 ? '12:00 PM' : hour < 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`}
                          </div>
                          <div className="flex-1 border-t border-slate-200 py-2 relative min-h-[60px]">
                            {getAppointmentsForHour(date, hour).map((appointment) => (
                              <div 
                                key={appointment.id}
                                className="absolute mx-2 rounded-md p-2 text-white text-sm"
                                style={{ 
                                  backgroundColor: appointment.color,
                                  top: `${(appointment.date.getMinutes() / 60) * 100}%`,
                                  height: '50px',
                                  left: '0',
                                  right: '0'
                                }}
                              >
                                <div className="font-medium">{appointment.patient}</div>
                                <div className="text-xs opacity-90">{appointment.type}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Week View */}
                <TabsContent value="week" className="w-full m-0">
                  <div className="overflow-auto">
                    <div className="min-w-[800px]">
                      {/* Days header */}
                      <div className="grid grid-cols-7 border-b">
                        {weekDays.map((day) => (
                          <div key={day.toString()} className="text-center py-3">
                            <div className="text-sm font-medium">{format(day, "EEE")}</div>
                            <div 
                              className={`text-lg ${isSameDay(day, new Date()) ? 'bg-noushy-100 text-noushy-900 rounded-full w-8 h-8 flex items-center justify-center mx-auto' : ''}`}
                            >
                              {format(day, "d")}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Time slots */}
                      {hours.map((hour) => (
                        <div key={hour} className="grid grid-cols-7 border-b border-slate-100">
                          {weekDays.map((day, index) => (
                            <div 
                              key={index} 
                              className={`border-l ${index === 0 ? 'border-l-0' : ''} min-h-[80px] relative`}
                            >
                              {index === 0 && (
                                <div className="absolute -left-16 top-2 text-xs text-slate-500">
                                  {hour === 12 ? '12:00 PM' : hour < 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`}
                                </div>
                              )}
                              
                              {getAppointmentsForHour(day, hour).map((appointment) => (
                                <div
                                  key={appointment.id}
                                  className="absolute mx-1 my-1 p-2 rounded-md text-white text-xs"
                                  style={{
                                    backgroundColor: appointment.color,
                                    top: `${(appointment.date.getMinutes() / 60) * 100}%`,
                                    height: '70px',
                                    left: '0',
                                    right: '0',
                                    zIndex: 10
                                  }}
                                >
                                  <div className="font-medium truncate">{appointment.patient}</div>
                                  <div className="opacity-90 truncate">{appointment.type}</div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Month View */}
                <TabsContent value="month" className="w-full m-0">
                  <div className="grid grid-cols-7 gap-px bg-slate-200">
                    {/* Day names */}
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div key={day} className="bg-white p-3 text-center text-sm font-medium">
                        {day}
                      </div>
                    ))}
                    
                    {/* Empty cells for days before the start of the month */}
                    {Array.from({ length: (monthDays[0].getDay() || 7) - 1 }).map((_, i) => (
                      <div key={`empty-start-${i}`} className="bg-slate-50 p-3 h-32" />
                    ))}
                    
                    {/* Month days */}
                    {monthDays.map((day) => (
                      <div 
                        key={day.toString()} 
                        className={`bg-white p-2 h-32 overflow-y-auto ${
                          isSameDay(day, new Date()) ? 'bg-noushy-50' : ''
                        }`}
                      >
                        <div className="text-right text-sm mb-2">
                          <span 
                            className={`inline-block w-6 h-6 text-center ${
                              isSameDay(day, new Date()) 
                                ? 'bg-noushy-600 text-white rounded-full' 
                                : ''
                            }`}
                          >
                            {format(day, "d")}
                          </span>
                        </div>
                        <div className="space-y-1">
                          {getAppointmentsForDay(day).map((appointment) => (
                            <div
                              key={appointment.id}
                              className="text-xs p-1 rounded truncate"
                              style={{ 
                                backgroundColor: `${appointment.color}20`,
                                borderLeft: `3px solid ${appointment.color}`,
                              }}
                            >
                              <span className="font-medium">
                                {format(appointment.date, "h:mm a")}
                              </span>{" "}
                              {appointment.patient}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    {/* Empty cells for days after the end of the month */}
                    {Array.from({ length: 7 - ((monthDays.length + (monthDays[0].getDay() || 7) - 1) % 7 || 7) }).map((_, i) => (
                      <div key={`empty-end-${i}`} className="bg-slate-50 p-3 h-32" />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default CalendarView;
