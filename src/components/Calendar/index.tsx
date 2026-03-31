import React, { useState } from 'react';
import dayjs from '@/lib/dayjs';
import type { Dayjs } from '@/lib/dayjs';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Configuration is now handled in @/lib/dayjs

/**
 * Advanced Calendar Component Options & Variants
 */
export type CalendarSelectionMode = 'single' | 'multiple' | 'range';
export type CalendarViewMode = 'day' | 'month' | 'year';
export type CalendarPickerType = 'date' | 'week' | 'month' | 'year';
export type CalendarSize = 'sm' | 'md' | 'lg';

export interface CalendarEvent {
  date: Date | string | number;
  label?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | string;
  type?: 'dot' | 'bar' | 'badge';
  badgeContent?: React.ReactNode;
}

export interface CalendarProps {
  // Modes
  mode?: CalendarSelectionMode;
  viewMode?: CalendarViewMode;
  onViewModeChange?: (mode: CalendarViewMode) => void;
  size?: CalendarSize;
  picker?: CalendarPickerType;

  // Single Value
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;

  // Multiple Values
  multipleValue?: Date[];
  defaultMultipleValue?: Date[];
  onMultipleChange?: (dates: Date[]) => void;

  // Range Values
  rangeValue?: [Date | null, Date | null];
  defaultRangeValue?: [Date | null, Date | null];
  onRangeChange?: (range: [Date | null, Date | null]) => void;

  // Data & Customization
  events?: CalendarEvent[];
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  disabledDate?: (date: Date) => boolean;
  locale?: 'en' | 'th' | string;
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, 1 = Monday
  calendar?: 'buddhist' | 'gregorian';
  timezone?: string;
  
  // Custom Renders
  renderDay?: (date: Date, isSelected: boolean, isToday: boolean, events: CalendarEvent[]) => React.ReactNode;
  
  showToday?: boolean;
  todayLabel?: string;
  numberOfMonths?: number;
  
  className?: string;
  style?: React.CSSProperties;
}

const colorMap: Record<string, string> = {
  primary: 'bg-indigo-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-rose-500',
  info: 'bg-blue-500',
};

export const Calendar: React.FC<CalendarProps> = ({
  mode = 'single',
  viewMode: controlledViewMode,
  onViewModeChange,
  size = 'md',
  
  // Single
  value,
  defaultValue,
  onChange,
  
  // Multiple
  multipleValue,
  defaultMultipleValue,
  onMultipleChange,
  
  // Range
  rangeValue,
  defaultRangeValue,
  onRangeChange,

  events = [],
  minDate,
  maxDate,
  disabledDates = [],
  disabledDate,
  locale = 'en',
  firstDayOfWeek = 0,
  calendar = 'gregorian',
  timezone = 'Asia/Bangkok',
  showToday = true,
  todayLabel,
  numberOfMonths = 1,
  picker = 'date',
  
  renderDay,
  className,
  style,
}) => {
  // --- View State ---
  const [internalViewMode, setInternalViewMode] = useState<CalendarViewMode>(
    picker === 'year' ? 'year' : picker === 'month' ? 'month' : 'day'
  );
  const viewMode = controlledViewMode ?? internalViewMode;
  const setViewMode = (m: CalendarViewMode) => {
    setInternalViewMode(m);
    onViewModeChange?.(m);
  };

  const [currentDate, setCurrentDate] = useState<Dayjs>(() => {
    try {
      const d = timezone ? dayjs.tz(undefined, timezone) : dayjs();
      return d.locale(locale);
    } catch {
      console.warn(`Invalid timezone provided to Calendar: "${timezone}". Falling back to system timezone.`);
      return dayjs().locale(locale);
    }
  });
  const [direction, setDirection] = useState(0); // For slide animations

  const [prevLocale, setPrevLocale] = useState(locale);
  if (locale !== prevLocale) {
    setPrevLocale(locale);
    setCurrentDate(prev => prev.locale(locale));
  }

  const [prevTimezone, setPrevTimezone] = useState(timezone);
  if (timezone !== prevTimezone) {
    setPrevTimezone(timezone);
    setCurrentDate(prev => {
      try {
        return dayjs.tz(prev, timezone).locale(locale);
      } catch {
        return prev;
      }
    });
  }

  // --- Selection State (Controlled vs Uncontrolled) ---
  const [internalSingle, setInternalSingle] = useState<Date | null>(defaultValue ?? null);
  const single = value !== undefined ? value : internalSingle;

  const [internalMultiple, setInternalMultiple] = useState<Date[]>(defaultMultipleValue ?? []);
  const multiple = multipleValue !== undefined ? multipleValue : internalMultiple;

  const [internalRange, setInternalRange] = useState<[Date | null, Date | null]>(defaultRangeValue ?? [null, null]);
  const range = rangeValue !== undefined ? rangeValue : internalRange;
  const [hoverDate, setHoverDate] = useState<Dayjs | null>(null);

  // --- Helpers ---
  const isSameDay = (d1: Dayjs | Date | null, d2: Dayjs | Date | null) => {
    if (!d1 || !d2) return false;
    return dayjs(d1).isSame(d2, 'day');
  };

  const isDisabled = (date: Dayjs) => {
    if (minDate && date.isBefore(minDate, 'day')) return true;
    if (maxDate && date.isAfter(maxDate, 'day')) return true;
    if (disabledDates.some((d) => isSameDay(date, d))) return true;
    if (disabledDate && disabledDate(date.toDate())) return true;
    return false;
  };

  const handleSelect = (date: Dayjs) => {
    if (isDisabled(date)) return;

    let finalStart = date;
    let finalEnd = date;

    if (picker === 'week') {
      finalStart = date.startOf('week');
      finalEnd = date.endOf('week');
    } else if (picker === 'month') {
      finalStart = date.startOf('month');
      finalEnd = date.endOf('month');
    } else if (picker === 'year') {
      finalStart = date.startOf('year');
      finalEnd = date.endOf('year');
    }

    if (mode === 'single') {
      setInternalSingle(finalStart.toDate());
      onChange?.(finalStart.toDate());
      if (picker === 'date') setViewMode('day');
    } else if (mode === 'multiple') {
      const exists = multiple.some(d => isSameDay(d, finalStart.toDate()));
      let next: Date[];
      if (exists) {
        next = multiple.filter(d => !isSameDay(d, finalStart.toDate()));
      } else {
        next = [...multiple, finalStart.toDate()].sort((a, b) => a.getTime() - b.getTime());
      }
      setInternalMultiple(next);
      onMultipleChange?.(next);
    } else if (mode === 'range') {
      const [start, end] = range;
      if (picker !== 'date') {
        if (!start || (start && end)) {
          setInternalRange([finalStart.toDate(), null]);
          onRangeChange?.([finalStart.toDate(), null]);
        } else {
          if (finalStart.isBefore(start, 'day')) {
             setInternalRange([finalStart.toDate(), null]);
             onRangeChange?.([finalStart.toDate(), null]);
          } else {
             setInternalRange([start, finalEnd.toDate()]);
             onRangeChange?.([start, finalEnd.toDate()]);
          }
        }
      } else {
        if (!start || (start && end)) {
          setInternalRange([date.toDate(), null]);
          onRangeChange?.([date.toDate(), null]);
        } else if (start && !end) {
          if (date.isBefore(start, 'day')) {
            setInternalRange([date.toDate(), null]);
            onRangeChange?.([date.toDate(), null]);
          } else {
            setInternalRange([start, date.toDate()]);
            onRangeChange?.([start, date.toDate()]);
          }
        }
      }
    }
  };

  // Check selection
  const checkIsSelected = (date: Dayjs) => {
    if (mode === 'single') return isSameDay(single, date);
    if (mode === 'multiple') return multiple.some(d => isSameDay(d, date));
    if (mode === 'range') {
      const [start, end] = range;
      return isSameDay(start, date) || isSameDay(end, date);
    }
    return false;
  };

  const checkIsInRange = (date: Dayjs) => {
    if (mode !== 'range') return false;
    const [start, end] = range;
    if (start && end) {
      return date.isAfter(start, 'day') && date.isBefore(end, 'day');
    }
    if (start && !end && hoverDate) {
      if (hoverDate.isAfter(start, 'day')) {
        return date.isAfter(start, 'day') && date.isBefore(hoverDate, 'day');
      }
    }
    return false;
  };

  // Navigation
  const navigateMonth = (step: number) => {
    setDirection(step);
    setCurrentDate(currentDate.add(step, 'month'));
  };

  const navigateYear = (step: number) => {
    setDirection(step);
    setCurrentDate(currentDate.add(step, 'year'));
  };
  const handleTodayClick = () => {
    const today = timezone ? dayjs.tz(undefined, timezone) : dayjs();
    const lToday = today.locale(locale);
    setCurrentDate(lToday);
    setViewMode('day');
    handleSelect(lToday);
  };

  // Grid Data
  const getDaysGrid = React.useCallback((baseDate: Dayjs) => {
    const startOfMonth = baseDate.startOf('month');
    const startDay = startOfMonth.day();
    const offset = startDay >= firstDayOfWeek ? startDay - firstDayOfWeek : 7 - (firstDayOfWeek - startDay);
    const startDate = startOfMonth.subtract(offset, 'day');
    const days: Dayjs[] = [];
    for (let i = 0; i < 42; i++) {
        days.push(startDate.add(i, 'day'));
    }
    return days;
  }, [firstDayOfWeek]);

  // Headers
  const getWeekDays = () => {
    const raw = dayjs().locale(locale).localeData().weekdaysMin().map(d => d.replace('.', ''));
    return [...raw.slice(firstDayOfWeek), ...raw.slice(0, firstDayOfWeek)];
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, day: Dayjs) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(day);
    }
  };

  // Sizes
  const sizeStyles = {
    sm: {
        container: 'p-3 rounded-xl',
        monthWidth: 'w-[280px]',
        header: 'text-sm mb-2',
        dayHeader: 'text-[0.7rem] h-6',
        dayCell: 'w-7 h-7 text-xs',
        eventDot: 'w-[3px] h-[3px]',
    },
    md: {
        container: 'p-5 rounded-2xl',
        monthWidth: 'w-[340px]',
        header: 'text-[15px] mb-4',
        dayHeader: 'text-[0.8rem] h-8',
        dayCell: 'w-10 h-10 text-[0.875rem]',
        eventDot: 'w-1 h-1',
    },
    lg: {
        container: 'p-6 rounded-3xl pb-8',
        monthWidth: 'w-[420px]',
        header: 'text-lg mb-6',
        dayHeader: 'text-[0.9rem] h-10',
        dayCell: 'w-12 h-12 text-base',
        eventDot: 'w-1.5 h-1.5',
    }
  }[size];

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 30 : -30, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -30 : 30, opacity: 0 }),
  };

  const renderHeader = () => (
    <div className={cn("flex justify-between items-center border-b border-gray-100 dark:border-zinc-800/80 pb-3", sizeStyles.header)}>
      <div className="flex gap-1">
         <button 
           type="button"
           onClick={() => viewMode === 'year' ? navigateYear(-12) : navigateYear(-1)} 
           className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg text-gray-500 transition-colors cursor-pointer"
         >
           <ChevronsLeft className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
         </button>
         <button 
           type="button"
           onClick={() => viewMode === 'day' ? navigateMonth(-1) : null} 
           className={cn("p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg text-gray-500 transition-colors cursor-pointer", viewMode !== 'day' && 'opacity-0 pointer-events-none')}
         >
           <ChevronLeft className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
         </button>
      </div>
      
      <div className="flex-1 flex justify-around">
        {Array.from({ length: numberOfMonths }).map((_, i) => {
          const mDate = currentDate.add(i, 'month');
          return (
            <button 
              key={i}
              type="button"
              onClick={() => {
                if (picker === 'year') return;
                if (picker === 'month' && viewMode === 'month') return;
                setViewMode(viewMode === 'day' ? 'month' : viewMode === 'month' ? 'year' : 'day');
              }}
              className="font-bold text-gray-900 dark:text-zinc-50 tracking-tight hover:bg-gray-100 dark:hover:bg-zinc-800 px-3 py-1.5 rounded-lg transition-colors capitalize"
            >
              {viewMode === 'day' ? (calendar === 'buddhist' ? mDate.format('MMMM BBBB') : mDate.format('MMMM YYYY')) : 
               viewMode === 'month' ? (calendar === 'buddhist' ? mDate.format('BBBB') : mDate.format('YYYY')) : 
               calendar === 'buddhist' ? `${mDate.year() + 543 - 5} - ${mDate.year() + 543 + 6}` : `${mDate.year() - 5} - ${mDate.year() + 6}`
              }
            </button>
          );
        })}
      </div>

      <div className="flex gap-1">
         <button 
           type="button"
           onClick={() => viewMode === 'day' ? navigateMonth(1) : null} 
           className={cn("p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg text-gray-500 transition-colors cursor-pointer", viewMode !== 'day' && 'opacity-0 pointer-events-none')}
         >
           <ChevronRight className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
         </button>
         <button 
           type="button"
           onClick={() => viewMode === 'year' ? navigateYear(12) : navigateYear(1)} 
           className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg text-gray-500 transition-colors cursor-pointer"
         >
           <ChevronsRight className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
         </button>
      </div>
    </div>
  );

  const getDayEvents = (day: Dayjs) => {
    return events.filter(e => isSameDay(day, dayjs(e.date)));
  };

  const renderDayView = () => (
    <div className={cn("flex flex-col md:flex-row gap-8", numberOfMonths > 1 && "md:divide-x md:divide-gray-100 md:dark:divide-zinc-800/50")}>
      {Array.from({ length: numberOfMonths }).map((_, i) => {
        const mDate = currentDate.add(i, 'month');
        const grid = getDaysGrid(mDate);
        return (
          <div key={i} className={cn("overflow-hidden flex-1", i > 0 && "md:pl-8")}>
            <div className="grid grid-cols-7 mb-1 text-center font-bold text-gray-400 dark:text-zinc-500">
              {getWeekDays().map(day => (
                <div key={day} className={cn("flex items-center justify-center", sizeStyles.dayHeader)}>
                  {day}
                </div>
              ))}
            </div>
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              <motion.div
                key={mDate.format('YYYY-MM')}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                className="grid grid-cols-7 gap-y-1 gap-x-1 justify-items-center relative"
                role="grid"
              >
                {grid.map((day) => {
                  const isCurrentMonth = day.month() === mDate.month();
                  const isSel = checkIsSelected(day);
                  const inRange = checkIsInRange(day);
                  const isRangeStart = mode === 'range' && isSameDay(range[0], day);
                  const isRangeEnd = mode === 'range' && isSameDay(range[1], day);
                  const isTod = day.isSame(dayjs(), 'day');
                  const isDis = isDisabled(day);
                  const dayEvents = getDayEvents(day);

                  const isWeekHovered = picker === 'week' && hoverDate && day.isSame(hoverDate, 'week');
                  const isWeekSelected = picker === 'week' && (
                    (mode === 'single' && single && day.isSame(single, 'week')) ||
                    (mode === 'range' && (
                      (range[0] && day.isSame(range[0], 'week')) ||
                      (range[1] && day.isSame(range[1], 'week')) ||
                      (range[0] && range[1] && day.isAfter(range[0], 'day') && day.isBefore(range[1], 'day'))
                    ))
                  );

                  return (
                    <div 
                      key={day.format('YYYY-MM-DD')} 
                      className={cn(
                        "relative flex items-center justify-center w-full transition-colors",
                        isWeekHovered && !isDis && "bg-indigo-50/50 dark:bg-indigo-500/5",
                        isWeekSelected && "bg-indigo-50/80 dark:bg-indigo-500/10"
                      )}
                      onMouseEnter={() => (mode === 'range' || picker === 'week') && setHoverDate(day)}
                      onMouseLeave={() => (mode === 'range' || picker === 'week') && setHoverDate(null)}
                    >
                      {(inRange || (isRangeStart && range[1]) || (isRangeEnd && range[0])) && (
                        <div className={cn(
                          "absolute inset-0 bg-indigo-50 dark:bg-indigo-500/10 pointer-events-none",
                          isRangeStart && range[1] && "rounded-l-full left-1/2-ml-0",
                          isRangeEnd && range[0] && "rounded-r-full right-1/2-mr-0"
                        )} />
                      )}

                      <button
                        type="button"
                        role="gridcell"
                        aria-selected={isSel}
                        aria-disabled={isDis}
                        disabled={isDis}
                        onClick={() => handleSelect(day)}
                        onKeyDown={(e) => handleKeyDown(e, day)}
                        className={cn(
                          "relative z-10 rounded-full flex flex-col items-center justify-center font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
                          sizeStyles.dayCell,
                          !isCurrentMonth ? "text-gray-300 dark:text-zinc-600 hover:text-gray-500" : "text-gray-700 dark:text-zinc-300",
                          isTod && !isSel && "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-zinc-50 font-bold",
                          !isSel && !isDis && isCurrentMonth && "hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400",
                          isDis && "opacity-30 cursor-not-allowed",
                          isSel && "bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-md shadow-indigo-500/30 scale-105"
                        )}
                      >
                        {renderDay ? renderDay(day.toDate(), isSel, isTod, dayEvents) : (
                          <>
                            {dayEvents.some(e => e.type === 'bar') && (
                              <div className="absolute top-[2px] w-4 h-[3px] rounded-full overflow-hidden flex shadow-sm">
                                {dayEvents.filter(e => e.type === 'bar').slice(0, 3).map((e, idx) => (
                                  <div key={idx} className={cn("flex-1", colorMap[e.color || 'primary'] || e.color)} />
                                ))}
                              </div>
                            )}
                            <span>{day.date()}</span>
                            {dayEvents.some(e => (!e.type || e.type === 'dot') && !e.badgeContent) && (
                              <div className="absolute bottom-[4px] flex gap-[2px]">
                                {dayEvents.filter(e => !e.type || e.type === 'dot').slice(0, 3).map((e, idx) => (
                                  <div key={idx} className={cn("rounded-full", sizeStyles.eventDot, isSel ? "bg-white" : (colorMap[e.color || 'primary'] || e.color))} />
                                ))}
                              </div>
                            )}
                            {dayEvents.some(e => e.type === 'badge' || e.badgeContent) && (
                              <div className="absolute -top-[4px] -right-[4px]">
                                <div className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white shadow-sm ring-1 ring-white">
                                  {dayEvents.find(e => e.badgeContent)?.badgeContent || dayEvents.length}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );

  const renderMonthView = () => {
    const months = dayjs.monthsShort();
    return (
      <div className="grid grid-cols-3 gap-3 p-2">
         {months.map((m, i) => {
            const mDate = currentDate.month(i);
            const isSel = mode === 'single' && single && dayjs(single).isSame(mDate, 'month');
            return (
              <button
                key={m}
                onClick={() => {
                  if (picker === 'month') {
                    handleSelect(mDate);
                  } else {
                    setCurrentDate(mDate);
                    setViewMode('day');
                  }
                }}
                className={cn(
                  "py-4 rounded-xl text-sm font-bold transition-all",
                  isSel ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20" : "hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300"
                )}
              >
                 {m}
              </button>
            )
         })}
      </div>
    );
  };

  const renderYearView = () => {
    const currentYear = currentDate.year();
    const years = Array.from({length: 12}, (_, i) => currentYear - 5 + i);
    return (
      <div className="grid grid-cols-3 gap-3 p-2">
         {years.map((y) => {
            const yDate = currentDate.year(y);
            const isSel = mode === 'single' && single && dayjs(single).isSame(yDate, 'year');
            const displayYear = calendar === 'buddhist' ? y + 543 : y;
            return (
              <button
                key={y}
                onClick={() => {
                  if (picker === 'year') {
                    handleSelect(yDate);
                  } else {
                    setCurrentDate(yDate);
                    setViewMode('month');
                  }
                }}
                className={cn(
                  "py-4 rounded-xl text-sm font-bold transition-all",
                  isSel ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20" : "hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300"
                )}
              >
                 {displayYear}
              </button>
            )
         })}
      </div>
    );
  };

  return (
    <div 
      className={cn("bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden transition-all", sizeStyles.container, className)}
      style={style}
    >
      {renderHeader()}
      <div className="pt-2">
         {viewMode === 'day' && renderDayView()}
         {viewMode === 'month' && renderMonthView()}
         {viewMode === 'year' && renderYearView()}
      </div>
      
      {showToday && (
        <div className="p-3 border-t border-gray-100 dark:border-zinc-800/80 flex justify-center">
          <button
            type="button"
            onClick={handleTodayClick}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 py-1.5 px-4 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all"
          >
            {todayLabel || (locale === 'th' ? 'วันนี้' : 'Today')}
          </button>
        </div>
      )}
    </div>
  );
};
