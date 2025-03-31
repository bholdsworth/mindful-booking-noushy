
import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Calendar, Clock, UserCheck, ArrowLeft, CalendarPlus } from "lucide-react";
import { BookingFormData, generateCalendarLinks, CalendarType } from "@/lib/bookingUtils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface BookingConfirmationProps {
  booking: BookingFormData;
  onBack: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ booking, onBack }) => {
  const { firstName, lastName, date, timeSlot, serviceType } = booking;
  const { toast } = useToast();
  
  const handleCopyCalendarLink = (calendarType: CalendarType) => {
    if (!date || !timeSlot) return;
    
    const links = generateCalendarLinks({
      title: `Physiotherapy: ${serviceType}`,
      description: `Appointment for ${firstName} ${lastName}`,
      startTime: timeSlot.time,
      endTime: new Date(timeSlot.time.getTime() + timeSlot.duration * 60000),
      location: "Noushy Physiotherapy Clinic"
    });
    
    const link = links[calendarType];
    
    // Copy to clipboard
    navigator.clipboard.writeText(link)
      .then(() => {
        toast({
          title: "Link copied",
          description: `${calendarType} calendar link has been copied to clipboard.`
        });
      })
      .catch(() => {
        // If clipboard fails, open it in a new tab
        window.open(link, "_blank");
      });
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-2xl mx-auto py-16">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-noushy-100 text-noushy-600 mb-4">
          <UserCheck className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-semibold text-noushy-900 mb-2">Booking Confirmed</h1>
        <p className="text-noushy-600 max-w-md mx-auto">
          Thank you, {firstName}. Your appointment has been successfully booked.
        </p>
      </motion.div>

      <motion.div
        className="bg-white rounded-2xl shadow-sm border border-noushy-100 p-8 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex items-center mb-6 pb-6 border-b border-noushy-100"
          variants={itemVariants}
        >
          <div
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full mr-4",
              "bg-noushy-50 text-noushy-600"
            )}
          >
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <div className="text-sm text-noushy-500 mb-1">Date</div>
            <div className="text-noushy-900 font-medium">
              {date ? format(date, "EEEE, MMMM d, yyyy") : ""}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center mb-6 pb-6 border-b border-noushy-100"
          variants={itemVariants}
        >
          <div
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full mr-4",
              "bg-noushy-50 text-noushy-600"
            )}
          >
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <div className="text-sm text-noushy-500 mb-1">Time</div>
            <div className="text-noushy-900 font-medium">
              {timeSlot?.formattedTime || ""}
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="flex items-center"
          variants={itemVariants}
        >
          <div
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full mr-4",
              "bg-noushy-50 text-noushy-600"
            )}
          >
            <UserCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="text-sm text-noushy-500 mb-1">Service</div>
            <div className="text-noushy-900 font-medium">{serviceType}</div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex flex-col space-y-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-noushy-50 rounded-xl p-5 border border-noushy-100">
          <div className="flex items-center mb-3">
            <CalendarPlus className="h-5 w-5 text-noushy-600 mr-2" />
            <h3 className="font-medium text-noushy-900">Add to your calendar</h3>
          </div>
          <p className="text-sm text-noushy-600 mb-4">
            Don't forget your appointment! Add it to your preferred calendar.
          </p>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-full sm:w-auto bg-noushy-500 hover:bg-noushy-600">
                <CalendarPlus className="h-4 w-4 mr-2" />
                Add to Calendar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem onClick={() => handleCopyCalendarLink("google")}>
                Google Calendar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCopyCalendarLink("outlook")}>
                Outlook Calendar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCopyCalendarLink("apple")}>
                Apple Calendar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCopyCalendarLink("ics")}>
                Download .ics file
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          variant="outline"
          className="flex items-center justify-center w-full sm:w-auto"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Booking
        </Button>
        <Link to="/">
          <Button className="bg-noushy-500 hover:bg-noushy-600 w-full sm:w-auto">
            Return to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default BookingConfirmation;
