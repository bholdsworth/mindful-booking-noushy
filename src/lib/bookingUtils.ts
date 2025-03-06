
import { addDays, format, isWeekend, setHours, setMinutes, isBefore, isAfter } from "date-fns";

export type TimeSlot = {
  id: string;
  time: Date;
  formattedTime: string;
  available: boolean;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: Date | undefined;
  timeSlot: TimeSlot | null;
  serviceType: string;
  medicareCode: string;
  notes: string;
};

export const initialBookingData: BookingFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  date: undefined,
  timeSlot: null,
  serviceType: "",
  medicareCode: "",
  notes: "",
};

export const serviceTypes = [
  "General Physiotherapy",
  "Sports Rehabilitation",
  "Manual Therapy",
  "Pain Management",
  "Post-Surgery Recovery",
  "Injury Assessment"
];

export const medicareCodes = [
  { code: "105", description: "Massage Therapy - 60 minutes" },
  { code: "110", description: "Initial Consultation - 45 minutes" },
  { code: "115", description: "Follow-up Treatment - 30 minutes" },
  { code: "120", description: "Extended Treatment - 90 minutes" },
  { code: "125", description: "Rehabilitation Session - 60 minutes" },
  { code: "130", description: "Assessment & Planning - 45 minutes" },
  { code: "135", description: "Group Therapy Session - 60 minutes" },
  { code: "140", description: "Home Visit Treatment - 60 minutes" }
];

// Generate available dates (next 30 days, excluding weekends)
export const getAvailableDates = () => {
  const dates: Date[] = [];
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const date = addDays(today, i);
    if (!isWeekend(date)) {
      dates.push(date);
    }
  }
  
  return dates;
};

// Generate time slots for a specific date
export const getTimeSlots = (date: Date): TimeSlot[] => {
  const morningStart = setHours(setMinutes(new Date(date), 30), 7); // 7:30 AM
  const morningEnd = setHours(setMinutes(new Date(date), 0), 12);   // 12:00 PM
  const afternoonStart = setHours(setMinutes(new Date(date), 0), 14); // 2:00 PM
  const afternoonEnd = setHours(setMinutes(new Date(date), 0), 18);   // 6:00 PM
  
  const slots: TimeSlot[] = [];
  const slotDuration = 30; // 30 minutes per slot
  
  // Morning slots
  let currentSlot = new Date(morningStart);
  while (isBefore(currentSlot, morningEnd)) {
    slots.push({
      id: format(currentSlot, "yyyy-MM-dd-HH-mm"),
      time: new Date(currentSlot),
      formattedTime: format(currentSlot, "h:mm a"),
      available: Math.random() > 0.3, // Randomly set availability (70% available)
    });
    
    currentSlot = new Date(currentSlot);
    currentSlot.setMinutes(currentSlot.getMinutes() + slotDuration);
  }
  
  // Afternoon slots
  currentSlot = new Date(afternoonStart);
  while (isBefore(currentSlot, afternoonEnd)) {
    slots.push({
      id: format(currentSlot, "yyyy-MM-dd-HH-mm"),
      time: new Date(currentSlot),
      formattedTime: format(currentSlot, "h:mm a"),
      available: Math.random() > 0.3, // Randomly set availability (70% available)
    });
    
    currentSlot = new Date(currentSlot);
    currentSlot.setMinutes(currentSlot.getMinutes() + slotDuration);
  }
  
  // Disable past time slots for today
  if (format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")) {
    const now = new Date();
    return slots.map(slot => ({
      ...slot,
      available: slot.available && isAfter(slot.time, now)
    }));
  }
  
  return slots;
};

// Validate booking data
export const validateBookingData = (data: BookingFormData): string[] => {
  const errors: string[] = [];
  
  if (!data.firstName) errors.push("First name is required");
  if (!data.lastName) errors.push("Last name is required");
  if (!data.email) errors.push("Email is required");
  else if (!/\S+@\S+\.\S+/.test(data.email)) errors.push("Email is invalid");
  if (!data.phone) errors.push("Phone number is required");
  if (!data.date) errors.push("Date is required");
  if (!data.timeSlot) errors.push("Time slot is required");
  if (!data.serviceType) errors.push("Service type is required");
  if (!data.medicareCode) errors.push("Medicare code is required");
  
  return errors;
};
