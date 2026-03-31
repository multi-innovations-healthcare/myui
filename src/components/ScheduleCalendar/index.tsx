import { useState, useEffect, useRef, useMemo } from "react";
import dayjs from "@/lib/dayjs";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ScheduleCalendarProps, ScheduleViewMode } from "./types";
import { TimeGutter } from "./TimeGutter";
import { DayColumn } from "./DayColumn";

export const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({
  events,
  view: initialView = 'week',
  date: initialDate = new Date(),
  onChangeDate,
  onEventClick,
  startHour = 0,
  endHour = 23,
  className,
  locale = 'th'
}) => {
  const [view, setView] = useState<ScheduleViewMode>(initialView);
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const SLOT_HEIGHT = 40; // Pixel height for 30 minutes

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Sync with prop date
  useEffect(() => {
    setCurrentDate(initialDate);
  }, [initialDate]);

  const handlePrev = () => {
    const nextDate = dayjs(currentDate).subtract(1, view === 'week' ? 'week' : 'day').toDate();
    setCurrentDate(nextDate);
    onChangeDate?.(nextDate);
  };

  const handleNext = () => {
    const nextDate = dayjs(currentDate).add(1, view === 'week' ? 'week' : 'day').toDate();
    setCurrentDate(nextDate);
    onChangeDate?.(nextDate);
  };

  const handleToday = () => {
    const nextDate = new Date();
    setCurrentDate(nextDate);
    onChangeDate?.(nextDate);
  };

  const weekDays = useMemo(() => {
    const startOfWeek = dayjs(currentDate).startOf('week');
    return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day').toDate());
  }, [currentDate]);

  const displayDateDigits = (date: Date) => {
    return dayjs(date).format('D');
  };

  const displayMonthYear = () => {
    return dayjs(currentDate).locale(locale).format('MMMM YYYY');
  };

  // Calculate current time indicator position
  const currentTimeTop = useMemo(() => {
    const mNow = dayjs(currentTime);
    const mStartDay = mNow.startOf('day').add(startHour, 'hour');
    const minutesFromStart = mNow.diff(mStartDay, 'minute');
    
    if (minutesFromStart < 0 || minutesFromStart > (endHour - startHour + 1) * 60) {
      return -1; // Out of view
    }
    
    return (minutesFromStart / 30) * SLOT_HEIGHT;
  }, [currentTime, startHour, endHour, SLOT_HEIGHT]);

  return (
    <div className={cn(
      "flex flex-col h-full bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl",
      className
    )}>
      {/* ─── Header ─── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
             <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <CalendarIcon size={20} />
             </div>
             <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-zinc-50 leading-tight">
                   {displayMonthYear()}
                </h2>
                <p className="text-[10px] text-gray-500 dark:text-zinc-500 font-medium uppercase tracking-widest leading-none mt-0.5">
                   Schedule Engine
                </p>
             </div>
          </div>

          <div className="flex items-center bg-gray-50 dark:bg-zinc-900 p-1 rounded-xl border border-gray-100 dark:border-zinc-800">
             <button onClick={handlePrev} className="p-1.5 hover:bg-white dark:hover:bg-zinc-800 rounded-lg text-gray-400 hover:text-indigo-600 transition-all">
                <ChevronLeft size={16} />
             </button>
             <button onClick={handleToday} className="px-3 py-1 text-[11px] font-bold text-gray-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase tracking-widest">
                Today
             </button>
             <button onClick={handleNext} className="p-1.5 hover:bg-white dark:hover:bg-zinc-800 rounded-lg text-gray-400 hover:text-indigo-600 transition-all">
                <ChevronRight size={16} />
             </button>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-900 p-1 rounded-xl border border-gray-100 dark:border-zinc-800">
           {(['day', 'week'] as ScheduleViewMode[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "px-4 py-1.5 text-[11px] font-bold rounded-lg transition-all uppercase tracking-widest whitespace-nowrap",
                  view === v 
                    ? "bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-black/5" 
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200"
                )}
              >
                {v}
              </button>
           ))}
        </div>
      </div>

      {/* ─── Grid View ─── */}
      <div className="flex flex-col flex-1 overflow-hidden relative">
        {/* Day Column Headers (Sticky) */}
        <div className="flex border-b border-gray-100 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm z-30">
          <div className="w-16 shrink-0 border-r border-gray-100 dark:border-zinc-800/60 flex items-center justify-center">
             <Clock size={14} className="text-gray-300 dark:text-zinc-600" />
          </div>
          <div className="flex-1 flex min-w-0">
             {(view === 'week' ? weekDays : [currentDate]).map((d, index) => {
                const isToday = dayjs(d).isSame(dayjs(), 'day');
                return (
                  <div key={index} className="flex-1 min-w-0 py-3 border-l first:border-l-0 border-gray-100 dark:border-zinc-800/40 text-center">
                    <div className={cn(
                      "text-[10px] uppercase font-bold tracking-widest mb-1",
                      isToday ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 dark:text-zinc-500"
                    )}>
                      {dayjs(d).locale(locale).format('ddd')}
                    </div>
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center mx-auto text-sm font-bold transition-all",
                      isToday 
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" 
                        : "text-gray-900 dark:text-zinc-100"
                    )}>
                      {displayDateDigits(d)}
                    </div>
                  </div>
                );
             })}
          </div>
        </div>

        {/* Scrollable Container */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto overflow-x-hidden relative custom-scrollbar"
        >
          <div className="flex min-h-max min-w-0">
             {/* Time labels */}
             <TimeGutter 
                startHour={startHour} 
                endHour={endHour} 
                slotHeight={SLOT_HEIGHT} 
                className="w-16 bg-gray-50/50 dark:bg-zinc-950/50 border-r border-gray-100 dark:border-zinc-800/60 z-10"
                locale={locale}
             />
             
             {/* Columns */}
             <div className="flex-1 flex min-w-0 relative">
                {(view === 'week' ? weekDays : [currentDate]).map((d, index) => (
                  <DayColumn
                    key={index}
                    date={d}
                    events={events}
                    startHour={startHour}
                    endHour={endHour}
                    slotHeight={SLOT_HEIGHT}
                    onEventClick={onEventClick}
                    className="flex-1 min-w-[200px]"
                  />
                ))}

                {/* Vertical Current Time Indicator (Red line) */}
                {currentTimeTop !== -1 && (
                  <div 
                    className="absolute left-0 right-0 z-20 pointer-events-none flex items-center transition-all duration-500"
                    style={{ top: `${currentTimeTop}px` }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] -ml-0.75" />
                    <div className="flex-1 h-[1.5px] bg-red-500/60" />
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
