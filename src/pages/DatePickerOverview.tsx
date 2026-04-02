import { useState, useEffect } from "react";
import { CalendarDays, ShieldCheck, ArrowRight, TrendingDown } from "lucide-react";
import dayjs from "@/lib/dayjs";
import { DatePicker, DateRangePicker, type DatePreset } from "../components/DatePicker";
import {
  DocHeader,
  DocExample,
  DocApiTable,
  DocAccessibility,
  DocBestPractices,
  DocToc,
} from "../components/Documentation";

const tocItems = [
  { id: "basic", label: "1. Basic Usage" },
  { id: "sizes", label: "2. Three Sizes" },
  { id: "pickers", label: "3. Picker Variants" },
  { id: "presets", label: "4. Preset Ranges" },
  { id: "format", label: "5. Date Format" },
  { id: "time", label: "6. Time Selection" },
  { id: "thai", label: "7. Thai Localization" },
  { id: "dual", label: "8. Dual Date Picker (Linked)" },
  { id: "appointment", label: "9. Appointment Use Case" },
  { id: "api", label: "10. API Reference" },
  { id: "best-practices", label: "11. Do's & Don'ts" },
  { id: "a11y", label: "12. Accessibility" },
];

export default function DatePickerOverview() {
  const [activeId, setActiveId] = useState(tocItems[0]?.id || "basic");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: [0.1, 0.5, 0.9] },
    );
    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);


  const analyticsPresets: DatePreset[] = [
    { label: 'Last 7 Days', value: [dayjs().subtract(7, 'd').toDate(), new Date()] as [Date, Date] },
    { label: 'Last 14 Days', value: [dayjs().subtract(14, 'd').toDate(), new Date()] as [Date, Date] },
    { label: 'Last 30 Days', value: [dayjs().subtract(30, 'd').toDate(), new Date()] as [Date, Date] },
    { label: 'Last 90 Days', value: [dayjs().subtract(90, 'd').toDate(), new Date()] as [Date, Date] },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-20 relative px-4 sm:px-6 lg:px-8">
      <div className="lg:pr-72 xl:pr-80 animate-in fade-in zoom-in-95 duration-500">
        <DocHeader
          title="DatePicker"
          description="A premium date selection component with calendar popup, range picking, format configuration, and date constraints."
          icon={<CalendarDays />}
          importCode="import { DatePicker, DateRangePicker } from '@multi_innovations_healthcare/myui';"
        />

        {/* 1. Basic */}
        <section id="basic" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Basic Usage"
            description="Click to open a calendar popup or type a date directly in the input."
            code={`<DatePicker placeholder="Select date" />\n<DateRangePicker />`}
          >
            <div className="w-full max-w-sm space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">DatePicker</span>
                <DatePicker placeholder="Pick a date..." />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">DateRangePicker</span>
                <DateRangePicker />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 2. Sizes */}
        <section id="sizes" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Three Sizes"
            description="Adapt the picker to different UI contexts with 'sm', 'md', and 'lg' sizes."
            code={`<DatePicker size="sm" />\n<DatePicker size="md" />\n<DatePicker size="lg" />`}
          >
            <div className="w-full max-w-sm space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Small (36px)</span>
                <DatePicker size="sm" defaultValue={new Date()} />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Medium (44px)</span>
                <DatePicker size="md" defaultValue={new Date()} />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Large (52px)</span>
                <DatePicker size="lg" defaultValue={new Date()} />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 3. Pickers */}
        <section id="pickers" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="3. Picker Variants"
            description="Specialized pickers for weeks, months, and years. Each variant uses an optimized view for the selected period."
            code={`<DatePicker picker="week" />\n<DatePicker picker="month" />\n<DatePicker picker="year" />`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Week Picker</span>
                <DatePicker picker="week" placeholder="Select Week" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Month Picker</span>
                <DatePicker picker="month" placeholder="Select Month" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Year Picker</span>
                <DatePicker picker="year" placeholder="Select Year" />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 4. Presets */}
        <section id="presets" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="4. Preset Ranges"
            description="Add a sidebar of quick-select ranges to help users select common timeframes instantly."
            code={`const presets = [\n  { label: 'Last 7 Days', value: [dayjs().subtract(7, 'd').toDate(), new Date()] },\n  { label: 'Last 30 Days', value: [dayjs().subtract(30, 'd').toDate(), new Date()] },\n  { label: 'Next Month', value: [dayjs().add(1, 'month').startOf('month').toDate(), dayjs().add(1, 'month').endOf('month').toDate()] }\n];\n\n<DateRangePicker presets={presets} />`}
          >
            <div className="w-full max-w-md space-y-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Data Analytic Style</span>
              <DateRangePicker 
                presets={analyticsPresets}
                placeholderStart="Start Date"
                placeholderEnd="End Date"
              />
            </div>
          </DocExample>
        </section>

        {/* 2. Format */}
        <section id="format" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Date Format"
            description="Configure the display format using dayjs format strings."
            code={`<DatePicker format="DD/MM/YYYY" />
<DatePicker format="YYYY-MM-DD" />
<DatePicker format="MMM D, YYYY" />`}
          >
            <div className="w-full max-w-sm space-y-6">
              {[
                { fmt: "DD/MM/YYYY", label: "DD/MM/YYYY (Thai Standard)" },
                { fmt: "YYYY-MM-DD", label: "YYYY-MM-DD (ISO)" },
                { fmt: "MMM D, YYYY", label: "MMM D, YYYY (US)" },
              ].map(({ fmt, label }) => (
                <div key={fmt} className="space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {label}
                  </span>
                  <DatePicker format={fmt} defaultValue={new Date()} />
                </div>
              ))}
            </div>
          </DocExample>
        </section>

        {/* 3. Time Selection */}
        <section id="time" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="3. Time Selection"
            description="Enable precise time selection with the 'showTime' prop. Supports 12-hour/24-hour formats and timezone labels."
            code={`<DatePicker showTime />\n<DatePicker showTime use12Hours timezone="Asia/Bangkok" />`}
          >
            <div className="w-full max-w-sm space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  24-Hour Format (Default)
                </span>
                <DatePicker showTime />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  12-Hour Format + Timezone
                </span>
                <DatePicker 
                  showTime 
                  use12Hours 
                  timezone="Asia/Bangkok" 
                  defaultValue={new Date()} 
                />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 4. Thai Localization */}
        <section id="thai" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="4. Thai Localization & Buddhist Era"
            description="Built-in support for Thai locale and Buddhist Era (พ.ศ.). The input and calendar display the Buddhist year while keeping data in ISO standard."
            code={`<DatePicker locale="th" calendar="buddhist" />\n<DatePicker locale="th" calendar="buddhist" showTime />`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              {/* International Version */}
              <div className="space-y-4 p-6 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/30 border border-gray-100 dark:border-zinc-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    International (Default)
                  </span>
                </div>
                <DatePicker 
                  placeholder="Select Date (Gregorian)" 
                  defaultValue={new Date()} 
                />
                <p className="text-[11px] text-gray-400 dark:text-zinc-500 leading-relaxed">
                   Standard gregorian calendar with English locale. Best for global applications.
                </p>
              </div>

              {/* Thai Version */}
              <div className="space-y-4 p-6 rounded-2xl bg-indigo-50/30 dark:bg-indigo-500/5 border border-indigo-100/50 dark:border-indigo-500/10 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                    Thai Localization
                  </span>
                </div>
                <DatePicker 
                  locale="th" 
                  calendar="buddhist" 
                  placeholder="เลือกวันที่ (พ.ศ.)" 
                  defaultValue={new Date()} 
                />
                <p className="text-[11px] text-indigo-500/70 dark:text-indigo-400/50 leading-relaxed italic">
                   Localized Thai months, shorthand day names (จ, อ, พ...), and Buddhist Era years.
                </p>
              </div>
            </div>
          </DocExample>
        </section>

        {/* 5. Dual Date Picker */}
        <section id="dual" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="5. Dual Date Picker (Linked)"
            description="Using two separate DatePicker components for Start and End dates with a cohesive layout. This is often more intuitive for complex booking systems. The End date is restricted by the Start date."
            code={`const [startDate, setStartDate] = useState<Date | null>(new Date());\nconst [endDate, setEndDate] = useState<Date | null>(null);\n\n<div className="flex gap-4 items-center">\n  <DatePicker \n    value={startDate} \n    onChange={setStartDate} \n    maxDate={endDate || undefined} \n  />\n  <DatePicker \n    value={endDate} \n    onChange={setEndDate} \n    minDate={startDate || undefined} \n  />\n</div>`}
          >
            <div className="w-full max-w-4xl p-1 bg-white dark:bg-zinc-950 rounded-[28px] border border-gray-100 dark:border-zinc-800 shadow-xl overflow-hidden group">
              <div className="flex flex-col md:flex-row gap-0 items-stretch">
                {/* Start Date */}
                <div className="flex-1 p-6 space-y-4 hover:bg-gray-50/50 dark:hover:bg-zinc-900/10 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
                      <TrendingDown className="w-3.5 h-3.5 text-indigo-500 rotate-[-90deg]" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Start Date</span>
                  </div>
                  <DatePicker 
                    placeholder="Arrival Date" 
                    showToday
                    className="border-none bg-gray-50/50 dark:bg-zinc-900/30 ring-0 focus-within:ring-2 focus-within:ring-indigo-500/10"
                  />
                </div>

                {/* Divider / Arrow */}
                <div className="relative flex items-center justify-center py-2 md:py-0 md:px-0">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="w-full h-[1px] md:w-[1px] md:h-full bg-gray-100 dark:bg-zinc-800" />
                  </div>
                  <div className="relative z-10 p-2.5 bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <ArrowRight className="w-4 h-4 text-indigo-500" />
                  </div>
                </div>

                {/* End Date */}
                <div className="flex-1 p-6 space-y-4 hover:bg-gray-50/50 dark:hover:bg-zinc-900/10 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                      <TrendingDown className="w-3.5 h-3.5 text-emerald-500 rotate-90" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">End Date</span>
                  </div>
                  <DatePicker 
                    placeholder="Departure Date"
                    showToday
                    className="border-none bg-gray-50/50 dark:bg-zinc-900/30 ring-0 focus-within:ring-2 focus-within:ring-indigo-500/10"
                  />
                </div>
              </div>
            </div>
          </DocExample>
        </section>

        {/* 6. Appointment Use Case */}
        <section id="appointment" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="6. Appointment Booking"
            description="A real-world example combining date constraints and time selection for a doctor's clinic booking system."
            code={`<DatePicker\n  showTime\n  minDate={today}\n  disabledDate={(d) => d.getDay() === 0 || d.getDay() === 6}\n  placeholder="Schedule your visit"\n/>`}
          >
            <div className="w-full max-w-md p-6 bg-indigo-50/50 dark:bg-indigo-950/10 rounded-[2rem] border border-indigo-100 dark:border-indigo-900/30">
               <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                      <CalendarDays size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">Clinic Appointment</h4>
                      <p className="text-xs text-gray-500">Select an available time slot</p>
                    </div>
                  </div>
                  <DatePicker 
                    showTime 
                    minDate={new Date()} 
                    disabledDate={(d) => d.getDay() === 0 || d.getDay() === 6}
                    placeholder="Select date and time..."
                    className="shadow-sm"
                  />
                  <p className="text-[10px] text-indigo-600/70 dark:text-indigo-400/70 font-medium px-1">
                    * Clinic closed on weekends. Available 09:00 - 17:00.
                  </p>
               </div>
            </div>
          </DocExample>
        </section>
        {/* Removed redundant sections merge into API and specific pickers */}

        {/* 6. API */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">
              10. API Reference
            </h2>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-zinc-50">
            DatePicker
          </h3>
          <DocApiTable
            props={[
              {
                name: "value",
                type: "Date | null",
                default: "undefined",
                description: "Controlled selected date.",
              },
              {
                name: "onChange",
                type: "(date: Date | null) => void",
                default: "undefined",
                description: "Called when date changes.",
              },
              {
                name: "format",
                type: "string",
                default: '"DD/MM/YYYY"',
                description: "Date display format (dayjs format).",
              },
              {
                name: "minDate",
                type: "Date",
                default: "undefined",
                description: "Earliest selectable date.",
              },
              {
                name: "maxDate",
                type: "Date",
                default: "undefined",
                description: "Latest selectable date.",
              },
              {
                name: "disabledDate",
                type: "(date: Date) => boolean",
                default: "undefined",
                description: "Function to disable specific dates.",
              },
              {
                name: "allowClear",
                type: "boolean",
                default: "true",
                description: "Show clear button when a date is selected.",
              },
              {
                name: "placeholder",
                type: "string",
                default: '"Select date"',
                description: "Placeholder text for the input.",
              },
              {
                name: "events",
                type: "CalendarEvent[]",
                default: "undefined",
                description: "Array of events to render on the calendar.",
              },
              {
                name: "locale",
                type: "string",
                default: '"en"',
                description: "Day.js locale string (e.g., 'th' for Thai).",
              },
              {
                name: "size",
                type: '"sm" | "md" | "lg"',
                default: '"sm"',
                description: "Size preset for the calendar dropdown.",
              },
              {
                name: "picker",
                type: '"date" | "week" | "month" | "year"',
                default: '"date"',
                description: "Select between different time periods selection logic.",
              },
              {
                name: "id",
                type: "string",
                default: "undefined",
                description: "ID for the input element.",
              },
              {
                name: "onFocus",
                type: "Function",
                default: "undefined",
                description: "Focus event handler.",
              },
              {
                name: "onBlur",
                type: "Function",
                default: "undefined",
                description: "Blur event handler.",
              },
            ]}
          />

          <h3 className="text-lg font-bold text-gray-900 dark:text-zinc-50 mt-8">
            DateRangePicker
          </h3>
          <DocApiTable
            props={[
              {
                name: "value",
                type: "[Date | null, Date | null]",
                default: "undefined",
                description: "Controlled date range.",
              },
              {
                name: "onChange",
                type: "(range) => void",
                default: "undefined",
                description: "Called when range changes.",
              },
              {
                name: "picker",
                type: '"date" | "week" | "month" | "year"',
                default: '"date"',
                description: "Control selection granularity.",
              },
              {
                name: "presets",
                type: "DatePreset[]",
                default: "[]",
                description: "Quick selection buttons list.",
              },
              {
                name: "id",
                type: "string | {start, end}",
                default: "undefined",
                description: "Input IDs.",
              },
            ]}
          />
        </section>

        {/* 7. Best Practices */}
        <section id="best-practices" className="scroll-mt-28 mb-16">
          <DocBestPractices
            dos={[
              "Use clear date format labels so users know the expected format.",
              "Set sensible min/max constraints — avoid allowing dates in the distant past/future.",
              "Use DateRangePicker for booking, leave requests, and report filtering.",
              'Show a "Today" shortcut for quick access to the current date.',
            ]}
            donts={[
              "Don't use DatePicker for selecting time — use a dedicated TimePicker.",
              "Don't set min > max — validate constraints before rendering.",
              "Don't disable too many dates — consider a different UI approach if most dates are blocked.",
              "Don't hide the manual input — power users prefer typing dates directly.",
            ]}
          />
        </section>

        {/* 8. Accessibility */}
        <section id="a11y" className="scroll-mt-28">
          <DocAccessibility
            icon={<ShieldCheck size={48} />}
            shortcuts={[
              {
                tag: "ARROW",
                title: "Navigate",
                body: "Move through calendar days with arrow keys.",
              },
              {
                tag: "ENTER",
                title: "Select",
                body: "Confirm the focused date in the calendar.",
              },
              {
                tag: "ESC",
                title: "Dismiss",
                body: "Close the calendar popup.",
              },
              {
                tag: "INPUT",
                title: "Direct Entry",
                body: "Type a date directly in the configured format.",
              },
            ]}
          />
        </section>
      </div>

      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
