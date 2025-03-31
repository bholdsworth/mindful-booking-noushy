
import { addDays, format, isWeekend, setHours, setMinutes, isBefore, isAfter, isSameDay, addMonths } from "date-fns";

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

// Store admin-selected available days
const STORAGE_KEY = 'noushy-available-days';

// Save available days to localStorage
export const saveAvailableDays = (days: Date[]) => {
  const daysToSave = days.map(day => format(day, 'yyyy-MM-dd'));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(daysToSave));
};

// Get available days from localStorage
export const getAvailableDays = (): Date[] => {
  const savedDays = localStorage.getItem(STORAGE_KEY);
  if (!savedDays) return [];
  
  try {
    const dateStrings = JSON.parse(savedDays) as string[];
    return dateStrings.map(ds => new Date(ds));
  } catch (e) {
    console.error('Error parsing available days:', e);
    return [];
  }
};

// Check if a day is available
export const isDayAvailable = (day: Date): boolean => {
  const availableDays = getAvailableDays();
  return availableDays.some(availableDay => isSameDay(availableDay, day));
};

// Generate available dates (up to 1 month ahead, filtered by admin selection)
export const getAvailableDates = () => {
  const dates: Date[] = [];
  const today = new Date();
  const oneMonthAhead = addMonths(today, 1);
  const availableDays = getAvailableDays();
  
  // If no admin-selected days, fall back to weekdays within the next month
  if (availableDays.length === 0) {
    for (let i = 0; i < 30; i++) {
      const date = addDays(today, i);
      if (!isWeekend(date) && isBefore(date, oneMonthAhead)) {
        dates.push(date);
      }
    }
  } else {
    // Filter future available days within one month
    availableDays.forEach(day => {
      if ((isAfter(day, today) || isSameDay(day, today)) && isBefore(day, oneMonthAhead)) {
        dates.push(day);
      }
    });
  }
  
  return dates;
};

// Check if a date is more than a month ahead
export const isDateMoreThanMonthAhead = (date: Date): boolean => {
  const today = new Date();
  const oneMonthAhead = addMonths(today, 1);
  return isAfter(date, oneMonthAhead);
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
// Added validateMedicareCode parameter with default value of true
export const validateBookingData = (data: BookingFormData, validateMedicareCode: boolean = true): string[] => {
  const errors: string[] = [];
  
  if (!data.firstName) errors.push("First name is required");
  if (!data.lastName) errors.push("Last name is required");
  if (!data.email) errors.push("Email is required");
  else if (!/\S+@\S+\.\S+/.test(data.email)) errors.push("Email is invalid");
  if (!data.phone) errors.push("Phone number is required");
  if (!data.date) errors.push("Date is required");
  if (!data.timeSlot) errors.push("Time slot is required");
  if (!data.serviceType) errors.push("Service type is required");
  
  // Only validate Medicare code if validateMedicareCode is true
  if (validateMedicareCode && !data.medicareCode) errors.push("Medicare code is required");
  
  return errors;
};
