import * as React from "react";
import dayjs from "@/lib/dayjs";
import type { Dayjs } from "@/lib/dayjs";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import {
  CalendarDays,
  X,
} from "lucide-react";
import { Calendar, type CalendarEvent, type CalendarSize } from "../Calendar";
import { TimePicker } from "./TimePicker";

// Configuration is now handled in @/lib/dayjs

export interface DatePickerProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  format?: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  disabledDate?: (date: Date) => boolean;
  events?: CalendarEvent[];
  locale?: 'en' | 'th' | string;
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  size?: CalendarSize;
  disabled?: boolean;
  allowClear?: boolean;
  className?: string;
  showTime?: boolean;
  use12Hours?: boolean;
  timezone?: string;
  calendar?: 'buddhist' | 'gregorian';
  showToday?: boolean;
  picker?: 'date' | 'week' | 'month' | 'year';
  id?: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export interface DatePreset {
  label: string;
  value: Date | [Date, Date] | (() => Date | [Date, Date]);
}

export interface DateRangePickerProps {
  value?: [Date | null, Date | null];
  defaultValue?: [Date | null, Date | null];
  onChange?: (range: [Date | null, Date | null]) => void;
  format?: string;
  placeholderStart?: string;
  placeholderEnd?: string;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  disabledDate?: (date: Date) => boolean;
  events?: CalendarEvent[];
  locale?: 'en' | 'th' | string;
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  size?: CalendarSize;
  disabled?: boolean;
  className?: string;
  showToday?: boolean;
  picker?: 'date' | 'week' | 'month' | 'year';
  presets?: DatePreset[];
  id?: string | { start?: string; end?: string };
  onFocus?: (e: React.FocusEvent<HTMLDivElement>, info: { range: 'start' | 'end' }) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>, info: { range: 'start' | 'end' }) => void;
}

/* ─── DatePicker ─── */
const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      format = "DD/MM/YYYY",
      placeholder = "Select date",
      minDate,
      maxDate,
      disabledDates,
      disabledDate,
      events,
      locale = 'en',
      firstDayOfWeek = 0,
      size = 'sm',
      disabled = false,
      allowClear = true,
      className,
      showTime = false,
      use12Hours = false,
      timezone = 'Asia/Bangkok',
      calendar = 'gregorian',
      showToday = true,
      picker = 'date',
      id,
      onFocus,
      onBlur,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    
    // Uncontrolled state fallback
    const [internalValue, setInternalValue] = React.useState<Date | null>(defaultValue ?? null);
    const selected = value !== undefined ? value : internalValue;

    // Safety wrapper for dayjs.tz to handle invalid timezone strings gracefully
    const safeTz = (date: Parameters<typeof dayjs>[0] | undefined, tz: string): Dayjs => {
      try {
        if (!tz) return dayjs(date);
        return dayjs(date).tz(tz);
      } catch {
        console.warn(`Invalid timezone provided to DatePicker: "${tz}". Falling back to system timezone.`);
        return dayjs(date);
      }
    };

    const defaultFormat = React.useMemo(() => {
      if (picker === 'week') return "YYYY-wo";
      if (picker === 'month') return calendar === 'buddhist' ? "MMMM BBBB" : "MMMM YYYY";
      if (picker === 'year') return calendar === 'buddhist' ? "BBBB" : "YYYY";
      
      return showTime 
        ? (use12Hours ? (calendar === 'buddhist' ? "DD/MM/BBBB hh:mm A" : "DD/MM/YYYY hh:mm A") : (calendar === 'buddhist' ? "DD/MM/BBBB HH:mm" : "DD/MM/YYYY HH:mm")) 
        : (calendar === 'buddhist' ? "DD/MM/BBBB" : "DD/MM/YYYY");
    }, [picker, showTime, use12Hours, calendar]);
    
    const finalFormat = format !== "DD/MM/YYYY" ? format : defaultFormat;

    const [inputVal, setInputVal] = React.useState(
      selected ? safeTz(selected, timezone).locale(locale).format(finalFormat) : ""
    );

    // Sync input when value changes externally
    React.useEffect(() => {
      if (selected) {
        setInputVal(safeTz(selected, timezone).locale(locale).format(finalFormat));
      } else {
        setInputVal("");
      }
    }, [value, internalValue, finalFormat, locale, timezone, selected]);

    const handleSelect = (d: Date | null) => {
      if (!d) {
        if (value === undefined) setInternalValue(null);
        onChange?.(null);
        return;
      }

      // Preserve existing time if showTime is enabled
      const newDate = safeTz(d, timezone);
      const finalDate = selected 
        ? newDate.hour(safeTz(selected, timezone).hour()).minute(safeTz(selected, timezone).minute()).second(0)
        : newDate;

      const dateObj = finalDate.toDate();
      if (value === undefined) setInternalValue(dateObj);
      setInputVal(finalDate.locale(locale).format(finalFormat));
      onChange?.(dateObj);
      
      if (!showTime) {
        setOpen(false);
      }
    };

    const handleTimeChange = (t: Date) => {
      const dateWithTime = safeTz(t, timezone);
      const dateObj = dateWithTime.toDate();
      if (value === undefined) setInternalValue(dateObj);
      setInputVal(dateWithTime.locale(locale).format(finalFormat));
      onChange?.(dateObj);
    };

    const handleInputBlur = () => {
      if (!inputVal.trim()) {
        if (value === undefined) setInternalValue(null);
        onChange?.(null);
        return;
      }
      
      let parsed: Dayjs;
      try {
        parsed = dayjs.tz(inputVal, finalFormat, timezone).locale(locale);
      } catch {
        parsed = dayjs(inputVal, finalFormat).locale(locale);
      }
      if (parsed.isValid()) {
        if (value === undefined) setInternalValue(parsed.toDate());
        onChange?.(parsed.toDate());
      } else {
        // Revert to last valid
        setInputVal(selected ? safeTz(selected, timezone).locale(locale).format(finalFormat) : "");
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (value === undefined) setInternalValue(null);
      setInputVal("");
      onChange?.(null);
    };

    const sizeClasses = {
      sm: "min-h-[36px] px-3 text-xs",
      md: "min-h-[44px] px-4 text-sm",
      lg: "min-h-[52px] px-5 text-base",
    }[size];

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <div
            ref={ref}
            className={cn(
              "flex items-center w-full rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all duration-200 hover:border-gray-300 dark:hover:border-zinc-700",
              "focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500",
              open && "ring-2 ring-indigo-500/20 border-indigo-500",
              disabled && "cursor-not-allowed opacity-50",
              sizeClasses,
              className
            )}
          >
            <CalendarDays className="h-4 w-4 text-gray-400 dark:text-zinc-500 shrink-0 mr-3" />
            <input
              id={id}
              className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-zinc-50 placeholder:text-gray-400 dark:placeholder:text-zinc-500"
              placeholder={placeholder}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onBlur={(e) => {
                handleInputBlur();
                onBlur?.(e);
              }}
              onFocus={onFocus}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleInputBlur();
              }}
              disabled={disabled}
            />
            {allowClear && selected && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors shrink-0"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="p-0 w-auto bg-transparent border-none shadow-none"
          sideOffset={6}
          align="start"
        >
          <div className="flex flex-col md:flex-row bg-white dark:bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-zinc-800">
            <Calendar
              mode="single"
              value={selected}
              onChange={handleSelect}
              minDate={minDate}
              maxDate={maxDate}
              disabledDates={disabledDates}
              disabledDate={disabledDate}
              events={events}
              locale={locale}
              firstDayOfWeek={firstDayOfWeek}
              size={size}
              calendar={calendar}
              timezone={timezone}
              showToday={showToday}
              picker={picker}
              className="border-none shadow-none"
            />
            {showTime && (
              <TimePicker
                value={selected}
                onChange={handleTimeChange}
                use12Hours={use12Hours}
                timezone={timezone}
                size={size}
              />
            )}
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);
DatePicker.displayName = "DatePicker";

/* ─── DateRangePicker ─── */
const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      format = "DD/MM/YYYY",
      placeholderStart = "Start date",
      placeholderEnd = "End date",
      minDate,
      maxDate,
      disabledDates,
      disabledDate,
      events,
      locale = 'en',
      firstDayOfWeek = 0,
      size = 'sm',
      disabled = false,
      className,
      showToday = true,
      picker = 'date',
      presets = [],
      id,
      onFocus,
      onBlur,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    
    // Uncontrolled state fallback
    const [internalRange, setInternalRange] = React.useState<[Date | null, Date | null]>(defaultValue ?? [null, null]);
    const range = value !== undefined ? value : internalRange;

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
      onBlur?.(e, { range: range[0] && !range[1] ? 'end' : 'start' });
    };

    const handleSelect = (newRange: [Date | null, Date | null]) => {
      if (value === undefined) setInternalRange(newRange);
      onChange?.(newRange);
      // Close popover only when both are selected
      if (newRange[0] && newRange[1]) {
        setOpen(false);
      }
    };

    const finalFormat = React.useMemo(() => {
      if (picker === 'week') return "YYYY-wo";
      if (picker === 'month') return "MMMM YYYY";
      if (picker === 'year') return "YYYY";
      return format;
    }, [picker, format]);

    const displayText = () => {
      const startStr = range[0] ? dayjs(range[0]).locale(locale).format(finalFormat) : placeholderStart;
      const endStr = range[1] ? dayjs(range[1]).locale(locale).format(finalFormat) : placeholderEnd;
      return { startStr, endStr, hasValue: !!(range[0] || range[1]) };
    };

    const { startStr, endStr, hasValue } = displayText();

    const sizeClasses = {
      sm: "min-h-[36px] px-3 text-xs",
      md: "min-h-[44px] px-4 text-sm",
      lg: "min-h-[52px] px-5 text-base",
    }[size];

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <div
            ref={ref}
            className={cn(
              "flex items-center w-full rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all duration-200 hover:border-gray-300 dark:hover:border-zinc-700 select-none",
              "focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500",
              open && "ring-2 ring-indigo-500/20 border-indigo-500",
              disabled && "cursor-not-allowed opacity-50",
              sizeClasses,
              className
            )}
            onFocus={(e) => {
              // Basic range heuristic (Antd actually tracks focusable inputs)
              onFocus?.(e, { range: range[0] && !range[1] ? 'end' : 'start' });
            }}
            onBlur={handleBlur}
          >
            <CalendarDays className="h-4 w-4 text-gray-400 dark:text-zinc-500 shrink-0" />
            <span
              id={typeof id === 'object' ? id.start : id}
              className={cn(
                "flex-1",
                hasValue
                  ? "text-gray-900 dark:text-zinc-50 font-medium"
                  : "text-gray-400 dark:text-zinc-500"
              )}
            >
              {startStr}
            </span>
            <span className="text-gray-300 dark:text-zinc-600 px-2">→</span>
            <span
              id={typeof id === 'object' ? id.end : undefined}
              className={cn(
                "flex-1",
                range[1]
                  ? "text-gray-900 dark:text-zinc-50 font-medium"
                  : "text-gray-400 dark:text-zinc-500"
              )}
            >
              {endStr}
            </span>
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="p-0 w-auto bg-transparent border-none shadow-none flex"
          sideOffset={6}
          align="start"
        >
          <div className="flex bg-white dark:bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-zinc-800">
            {presets.length > 0 && (
              <div className="w-48 border-r border-gray-100 dark:border-zinc-800 p-2 flex flex-col gap-1 bg-gray-50/30 dark:bg-zinc-900/10">
                <div className="px-3 py-2 text-[10px] uppercase tracking-widest font-bold text-gray-400">Presets</div>
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      const val = typeof p.value === 'function' ? p.value() : p.value;
                      if (Array.isArray(val)) {
                         handleSelect(val);
                      } else {
                         handleSelect([val, val]);
                      }
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-gray-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}
            <Calendar
              mode="range"
              rangeValue={range}
              onRangeChange={handleSelect}
              minDate={minDate}
              maxDate={maxDate}
              disabledDates={disabledDates}
              disabledDate={disabledDate}
              events={events}
              locale={locale}
              firstDayOfWeek={firstDayOfWeek}
              size={size}
              showToday={showToday}
              numberOfMonths={2}
              picker={picker}
              className="border-none shadow-none"
            />
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);
DateRangePicker.displayName = "DateRangePicker";

export { DatePicker, DateRangePicker };
