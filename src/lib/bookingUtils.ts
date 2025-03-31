
import { addDays, format, isWeekend, setHours, setMinutes, isBefore, isAfter, isSameDay, addMonths } from "date-fns";

export type TimeSlot = {
  id: string;
  time: Date;
  formattedTime: string;
  available: boolean;
  duration: number; // Duration in minutes
  bufferTime: number; // Buffer time in minutes
};

export type TimeRange = {
  start: string; // Format: "HH:mm", e.g. "08:00"
  end: string; // Format: "HH:mm", e.g. "19:00"
};

export type DayAvailability = {
  date: string; // Format: "yyyy-MM-dd"
  available: boolean;
  customTimeRange?: TimeRange;
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

export type CalendarType = 'google' | 'outlook' | 'apple' | 'ics';

export type CalendarEventProps = {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  location: string;
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

// Default time range for all days
export const DEFAULT_TIME_RANGE: TimeRange = {
  start: "08:00", // 8 AM
  end: "19:00",   // 7 PM
};

const AVAILABILITY_STORAGE_KEY = 'noushy-available-days';

export const saveAvailableDays = (daysAvailability: DayAvailability[]) => {
  localStorage.setItem(AVAILABILITY_STORAGE_KEY, JSON.stringify(daysAvailability));
};

export const getAvailableDays = (): DayAvailability[] => {
  const savedDays = localStorage.getItem(AVAILABILITY_STORAGE_KEY);
  if (!savedDays) return [];
  
  try {
    return JSON.parse(savedDays) as DayAvailability[];
  } catch (e) {
    console.error('Error parsing available days:', e);
    return [];
  }
};

export const isDayAvailable = (day: Date): boolean => {
  const dateStr = format(day, 'yyyy-MM-dd');
  const availableDays = getAvailableDays();
  const dayConfig = availableDays.find(d => d.date === dateStr);
  
  return dayConfig ? dayConfig.available : false;
};

export const getDayTimeRange = (day: Date): TimeRange => {
  const dateStr = format(day, 'yyyy-MM-dd');
  const availableDays = getAvailableDays();
  const dayConfig = availableDays.find(d => d.date === dateStr);
  
  return dayConfig?.customTimeRange || DEFAULT_TIME_RANGE;
};

export const getAvailableDates = () => {
  const dates: Date[] = [];
  const today = new Date();
  const oneMonthAhead = addMonths(today, 1);
  const availableDays = getAvailableDays();
  
  // If no available days have been set by admin, return an empty array
  if (availableDays.length === 0) {
    return dates;
  } 
  
  // Filter available days to only include those within the next month
  availableDays.forEach(dayConfig => {
    if (dayConfig.available) {
      const day = new Date(dayConfig.date);
      if ((isAfter(day, today) || isSameDay(day, today)) && isBefore(day, oneMonthAhead)) {
        dates.push(day);
      }
    }
  });
  
  return dates;
};

export const isDateMoreThanMonthAhead = (date: Date): boolean => {
  const today = new Date();
  const oneMonthAhead = addMonths(today, 1);
  return isAfter(date, oneMonthAhead);
};

export const parseTimeString = (timeStr: string): { hours: number, minutes: number } => {
  const [hoursStr, minutesStr] = timeStr.split(':');
  return { 
    hours: parseInt(hoursStr, 10), 
    minutes: parseInt(minutesStr, 10) 
  };
};

export const getTimeSlots = (date: Date): TimeSlot[] => {
  const timeRange = getDayTimeRange(date);
  const { hours: startHours, minutes: startMinutes } = parseTimeString(timeRange.start);
  const { hours: endHours, minutes: endMinutes } = parseTimeString(timeRange.end);
  
  const dayStart = setHours(setMinutes(new Date(date), startMinutes), startHours);
  const dayEnd = setHours(setMinutes(new Date(date), endMinutes), endHours);
  
  const slots: TimeSlot[] = [];
  const slotDuration = 30; // 30 minutes per slot
  const bufferTime = 15; // 15 minutes buffer between appointments
  
  let currentSlot = new Date(dayStart);
  
  while (isBefore(currentSlot, dayEnd)) {
    slots.push({
      id: format(currentSlot, "yyyy-MM-dd-HH-mm"),
      time: new Date(currentSlot),
      formattedTime: format(currentSlot, "h:mm a"),
      available: Math.random() > 0.3, // Randomly set availability (70% available)
      duration: slotDuration,
      bufferTime: bufferTime
    });
    
    currentSlot = new Date(currentSlot);
    currentSlot.setMinutes(currentSlot.getMinutes() + slotDuration + bufferTime);
  }
  
  if (format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")) {
    const now = new Date();
    return slots.map(slot => ({
      ...slot,
      available: slot.available && isAfter(slot.time, now)
    }));
  }
  
  return slots;
};

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
  
  if (validateMedicareCode && !data.medicareCode) errors.push("Medicare code is required");
  
  return errors;
};

// Calendar integration functions
export const generateCalendarLinks = ({
  title,
  description,
  startTime,
  endTime,
  location
}: CalendarEventProps): Record<CalendarType, string> => {
  // Format dates for calendar URLs
  const startIso = startTime.toISOString().replace(/-|:|\.\d+/g, '');
  const endIso = endTime.toISOString().replace(/-|:|\.\d+/g, '');
  
  // Format dates for .ics file
  const formatDateForIcs = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '').substring(0, 15) + 'Z';
  };
  
  const startIcs = formatDateForIcs(startTime);
  const endIcs = formatDateForIcs(endTime);
  
  // Encode parameters for URLs
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);
  const encodedLocation = encodeURIComponent(location);
  
  // Create Google Calendar link
  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${startIso}/${endIso}&details=${encodedDesc}&location=${encodedLocation}&sf=true&output=xml`;
  
  // Create Outlook Web link
  const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodedTitle}&startdt=${startTime.toISOString()}&enddt=${endTime.toISOString()}&body=${encodedDesc}&location=${encodedLocation}`;
  
  // Create Apple Calendar link (.ics file approach)
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART:${startIcs}`,
    `DTEND:${endIcs}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\n');
  
  const icsBlob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const icsUrl = URL.createObjectURL(icsBlob);
  
  return {
    google: googleUrl,
    outlook: outlookUrl,
    apple: icsUrl,  // Same as ICS for Apple
    ics: icsUrl
  };
};
