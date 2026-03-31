import React, { useRef, useEffect, useMemo } from 'react';
import dayjs from '@/lib/dayjs';
import { cn } from '@/lib/utils';

// --- Types ---
export interface TimePickerProps {
  value?: Date | null;
  onChange?: (date: Date) => void;
  use12Hours?: boolean;
  timezone?: string; // e.g., "GMT+7"
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface WheelProps {
  options: (string | number)[];
  value: string | number;
  onChange: (val: string | number) => void;
  label?: string;
  itemHeight?: number;
}

// --- TimeWheel Component ---
const TimeWheel: React.FC<WheelProps> = ({ options, value, onChange, label, itemHeight = 36 }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isProgrammaticScroll = useRef(false);

  // Sync scroll position with value
  useEffect(() => {
    if (scrollRef.current && !isProgrammaticScroll.current) {
      const index = options.indexOf(value);
      if (index !== -1) {
        scrollRef.current.scrollTo({
          top: index * itemHeight,
          behavior: 'smooth',
        });
      }
    }
    // Reset programmatic scroll flag after sync
    isProgrammaticScroll.current = false;
  }, [value, options, itemHeight]);

  const handleScroll = () => {
    if (!scrollRef.current || isProgrammaticScroll.current) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      if (!scrollRef.current) return;
      
      const scrollTop = scrollRef.current.scrollTop;
      const index = Math.round(scrollTop / itemHeight);
      const newValue = options[index];

      if (newValue !== undefined && newValue !== value) {
        isProgrammaticScroll.current = true; // Mark this as a manual-triggered change
        onChange(newValue);
      }
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const currentIndex = options.indexOf(value);
    let nextIndex = -1;
    if (e.key === 'ArrowUp' && currentIndex > 0) {
      nextIndex = currentIndex - 1;
    } else if (e.key === 'ArrowDown' && currentIndex < options.length - 1) {
      nextIndex = currentIndex + 1;
    }

    if (nextIndex !== -1) {
      e.preventDefault();
      isProgrammaticScroll.current = false; // Let useEffect handle the smooth scroll
      onChange(options[nextIndex]);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1 group">
      {label && (
        <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-1 select-none">
          {label}
        </span>
      )}
      <div 
        className="relative h-[180px] w-14 overflow-hidden pointer-events-none"
        style={{ height: itemHeight * 5 }}
      >
        {/* Highlight area */}
        <div 
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-gray-100 dark:bg-zinc-800/50 rounded-lg pointer-events-none border border-gray-200/50 dark:border-zinc-700/50" 
          style={{ height: itemHeight }}
        />
        
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          className="h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scrollbar-none pointer-events-auto outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20 rounded-lg p-0"
          style={{ paddingBlock: itemHeight * 2 }}
        >
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => onChange(opt)}
              className={cn(
                "snap-center flex items-center justify-center cursor-pointer transition-all duration-200 select-none",
                value === opt 
                  ? "text-gray-900 dark:text-zinc-50 font-bold scale-110" 
                  : "text-gray-400 dark:text-zinc-600 hover:text-gray-600 dark:hover:text-zinc-400 font-medium"
              )}
              style={{ height: itemHeight }}
            >
              <span className="text-sm tabular-nums">{opt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main TimePicker Component ---
export const TimePicker: React.FC<TimePickerProps> = ({ 
  value, 
  onChange, 
  use12Hours = false, 
  timezone,
  className,
  size = 'md'
}) => {
  const now = useMemo(() => {
    const d = value ? dayjs(value) : dayjs();
    return timezone ? d.tz(timezone) : d;
  }, [value, timezone]);
  
  const hourOptions = useMemo(() => {
    if (use12Hours) return Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, '0'));
    return Array.from({ length: 24 }, (_, index) => String(index).padStart(2, '0'));
  }, [use12Hours]);

  const minuteOptions = useMemo(() => {
    return Array.from({ length: 60 }, (_, index) => String(index).padStart(2, '0'));
  }, []);

  const currentHour = useMemo(() => {
    let h = now.hour();
    if (use12Hours) {
      h = h % 12;
      if (h === 0) h = 12;
    }
    return String(h).padStart(2, '0');
  }, [now, use12Hours]);

  const currentMinute = String(now.minute()).padStart(2, '0');
  const ampm = now.hour() >= 12 ? 'PM' : 'AM';

  const handleHourChange = (val: string | number) => {
    let h = Number(val);
    if (use12Hours) {
      const isPM = now.hour() >= 12;
      if (isPM && h < 12) h += 12;
      if (!isPM && h === 12) h = 0;
    }
    const newDate = now.hour(h);
    onChange?.(newDate.toDate());
  };

  const handleMinuteChange = (val: string | number) => {
    const newDate = now.minute(Number(val));
    onChange?.(newDate.toDate());
  };

  const handleAMPMChange = (val: string | number) => {
    let h = now.hour();
    if (val === 'AM' && h >= 12) h -= 12;
    if (val === 'PM' && h < 12) h += 12;
    const newDate = now.hour(h);
    onChange?.(newDate.toDate());
  };

  const itemHeight = {
    sm: 32,
    md: 36,
    lg: 40
  }[size];

  return (
    <div className={cn(
      "flex flex-col gap-4 p-5 bg-white dark:bg-zinc-950 border-l border-gray-100 dark:border-zinc-800/80 animate-in fade-in slide-in-from-right-4 duration-300",
      className
    )}>
      <div className="flex items-end gap-3">
        <TimeWheel 
          label="Hour" 
          options={hourOptions} 
          value={currentHour} 
          onChange={handleHourChange} 
          itemHeight={itemHeight}
        />
        <div 
          className="pb-[54px] font-bold text-gray-300 dark:text-zinc-700 animate-pulse"
          style={{ height: itemHeight * 5 }}
        >
          :
        </div>
        <TimeWheel 
          label="Min" 
          options={minuteOptions} 
          value={currentMinute} 
          onChange={handleMinuteChange} 
          itemHeight={itemHeight}
        />
        {use12Hours && (
          <TimeWheel 
            label="M" 
            options={['AM', 'PM']} 
            value={ampm} 
            onChange={handleAMPMChange} 
            itemHeight={itemHeight}
          />
        )}
      </div>

      {timezone && (
        <div className="flex items-center justify-center -mt-2">
           <div className="px-2 py-0.5 rounded-full bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/50">
             <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 tracking-tight uppercase">
               {timezone}
             </span>
           </div>
        </div>
      )}
    </div>
  );
};
