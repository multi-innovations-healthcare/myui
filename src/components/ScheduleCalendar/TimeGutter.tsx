import React from "react";
import dayjs from "@/lib/dayjs";
import { cn } from "@/lib/utils";

interface TimeGutterProps {
  startHour: number;
  endHour: number;
  slotHeight: number; // For 30 mins
  className?: string;
  locale?: string;
}

export const TimeGutter: React.FC<TimeGutterProps> = ({
  startHour,
  endHour,
  slotHeight,
  className,
  locale = 'th'
}) => {
  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);

  return (
    <div className={cn("flex flex-col select-none", className)}>
      {hours.map((hour) => (
        <div 
          key={hour} 
          className="relative flex items-start justify-end pr-3 text-[10px] font-bold text-gray-400 dark:text-zinc-500 tabular-nums uppercase tracking-tighter"
          style={{ height: slotHeight * 2 }}
        >
          <span className="transform -translate-y-1/2 bg-white dark:bg-zinc-950 px-1 py-0.5 rounded">
            {dayjs().hour(hour).minute(0).locale(locale).format('HH:00')}
          </span>
          
          {/* Subtle line for the hour */}
          <div className="absolute right-0 top-0 w-2 h-[1px] bg-gray-100 dark:border-zinc-800" />
        </div>
      ))}
    </div>
  );
};
