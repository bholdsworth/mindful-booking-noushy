
import React from "react";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { TimeSlot as TimeSlotType } from "@/lib/bookingUtils";

interface TimeSlotProps {
  slot: TimeSlotType;
  isSelected: boolean;
  onClick: (slot: TimeSlotType) => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ slot, isSelected, onClick }) => {
  // Calculate end time including buffer
  const totalMinutes = slot.duration + slot.bufferTime;
  const endTime = new Date(slot.time);
  endTime.setMinutes(endTime.getMinutes() + totalMinutes);
  
  const formattedEndTime = endTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  
  return (
    <button
      className={cn(
        "relative h-20 rounded-xl transition-all duration-200 ease-in-out flex flex-col items-center justify-center p-2 shadow-sm border border-noushy-100",
        slot.available 
          ? "hover:border-noushy-300 hover:bg-noushy-50 cursor-pointer" 
          : "bg-gray-50 cursor-not-allowed opacity-50",
        isSelected && slot.available && "border-noushy-500 bg-noushy-50 ring-1 ring-noushy-500"
      )}
      onClick={() => slot.available && onClick(slot)}
      disabled={!slot.available}
    >
      <div className={cn("flex items-center justify-center mb-1", 
        isSelected ? "text-noushy-700" : "text-noushy-900")}>
        <Clock className="h-3 w-3 mr-1.5" />
        <span className="text-sm font-medium">{slot.formattedTime}</span>
      </div>
      
      <div className="text-xs text-noushy-600">
        {slot.duration} min + {slot.bufferTime} min buffer
      </div>
      
      {!slot.available && (
        <span className="absolute inset-0 flex items-center justify-center bg-white/80 text-xs font-medium text-gray-500 rounded-xl">
          Unavailable
        </span>
      )}
    </button>
  );
};

export default TimeSlot;
