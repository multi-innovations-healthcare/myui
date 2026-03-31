import { useMemo } from "react";
import dayjs from "@/lib/dayjs";
import type { ScheduleEvent } from "./types";
import { cn } from "@/lib/utils";

interface DayColumnProps {
  date: Date;
  events: ScheduleEvent[];
  startHour: number;
  endHour: number;
  slotHeight: number; // For 30 mins
  onEventClick?: (event: ScheduleEvent) => void;
  className?: string;
}

interface PositionedEvent extends ScheduleEvent {
  top: number;
  height: number;
  width: number;
  left: number;
  zIndex: number;
}

export const DayColumn: React.FC<DayColumnProps> = ({
  date,
  events,
  startHour,
  endHour,
  slotHeight,
  onEventClick,
  className
}) => {
  const mDate = dayjs(date);
  
  // 1. Filter events for this specific day
  const dayEvents = useMemo(() => {
    return events.filter(e => dayjs(e.start).isSame(mDate, 'day'));
  }, [events, mDate]);

  // 2. Core Overlap Algorithm (Simplified stacking)
  const positionedEvents = useMemo(() => {
    // Sort by start time, then duration
    const sorted = [...dayEvents].sort((a, b) => {
      const startDiff = dayjs(a.start).valueOf() - dayjs(b.start).valueOf();
      if (startDiff !== 0) return startDiff;
      return dayjs(b.end).valueOf() - dayjs(a.end).valueOf();
    });

    const results: PositionedEvent[] = [];
    const columns: ScheduleEvent[][] = [];

    sorted.forEach((event) => {
      // Find the first column it can fit into
      let colIndex = columns.findIndex(col => {
        // Find if it overlaps with anyone in this column
        return !col.some(e => {
          return dayjs(event.start).isBefore(e.end) && dayjs(event.end).isAfter(e.start);
        });
      });

      if (colIndex === -1) {
        colIndex = columns.length;
        columns.push([event]);
      } else {
        columns[colIndex].push(event);
      }

      const totalMinutesFromStart = dayjs(event.start).diff(mDate.startOf('day').add(startHour, 'hour'), 'minute');
      const durationMinutes = dayjs(event.end).diff(event.start, 'minute');

      results.push({
        ...event,
        top: (totalMinutesFromStart / 30) * slotHeight,
        height: (durationMinutes / 30) * slotHeight,
        left: colIndex, // Temporal
        width: 1, // Temporal
        zIndex: 10 + colIndex
      });
    });

    // Finalize width/left based on max overlaps (Simplify: just use column count for now)
    // Real Google Calendar algorithm is more complex (recursive clusters), 
    // but this column-based approach works well for v1
    const maxCols = Math.max(columns.length, 1);
    return results.map(e => ({
      ...e,
      width: 100 / maxCols,
      left: (e.left * 100) / maxCols
    }));
  }, [dayEvents, mDate, startHour, slotHeight]);

  // Render slots labels
  const slots = Array.from({ length: (endHour - startHour + 1) * 2 }, (_, i) => i);

  return (
    <div className={cn("relative border-l border-gray-100 dark:border-zinc-800 h-full", className)}>
      {/* Grid Lines */}
      {slots.map(i => (
        <div 
          key={i} 
          className={cn(
            "w-full border-b border-gray-50/50 dark:border-zinc-900/40",
            i % 2 === 1 ? "border-dashed" : "border-solid"
          )}
          style={{ height: slotHeight }}
        />
      ))}

      {/* Events Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {positionedEvents.map(event => (
          <button
            key={event.id}
            onClick={() => onEventClick?.(event)}
            className={cn(
               "absolute p-1 group pointer-events-auto transition-all duration-300",
               "animate-in fade-in slide-in-from-top-2"
            )}
            style={{
              top: `${event.top}px`,
              height: `${event.height}px`,
              left: `${event.left}%`,
              width: `${event.width}%`,
              zIndex: event.zIndex
            }}
          >
            <div className={cn(
              "h-full w-full rounded-xl p-2 text-left overflow-hidden",
              "bg-indigo-50/80 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 backdrop-blur-md",
              "group-hover:ring-2 group-hover:ring-indigo-500/20 group-hover:bg-indigo-100/90 dark:group-hover:bg-indigo-500/20 transition-all",
              event.color ? `border-l-4 ${event.color}` : "border-l-4 border-l-indigo-500"
            )}>
              <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-tighter truncate leading-none mb-1">
                {dayjs(event.start).format('HH:mm')} - {dayjs(event.end).format('HH:mm')}
              </div>
              <div className="font-bold text-xs text-gray-900 dark:text-zinc-50 truncate leading-tight">
                {event.title}
              </div>
              {event.height > 60 && (
                <div className="text-[10px] text-gray-500 dark:text-zinc-400 line-clamp-2 mt-1 leading-snug">
                   {event.description}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
