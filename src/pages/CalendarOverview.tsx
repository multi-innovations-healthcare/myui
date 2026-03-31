import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { 
  Calendar as LucideCalendar, ShieldCheck
} from 'lucide-react';
import { Calendar } from '../components/Calendar';
import { 
  DocHeader, 
  DocExample, 
  DocApiTable, 
  DocAccessibility, 
  DocToc 
} from '../components/Documentation';

const tocItems = [
  { id: 'modes', label: '1. Selection Modes' },
  { id: 'events', label: '2. Event Markers' },
  { id: 'localization', label: '3. Localization (TH)' },
  { id: 'custom', label: '4. Custom Render' },
  { id: 'api', label: '5. API Reference' },
  { id: 'a11y', label: '6. Accessibility' },
];

export default function CalendarOverview() {
  const [activeId, setActiveId] = useState<string>(tocItems[0]?.id || 'modes');
  
  // States for examples
  const [single, setSingle] = useState<Date | null>(new Date());
  const [multi, setMulti] = useState<Date[]>([]);
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: [0.1, 0.5, 0.9] }
    );

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const dummyEvents = [
    { date: new Date(), type: 'dot' as const, color: 'primary' },
    { date: new Date(), type: 'dot' as const, color: 'success' },
    { date: dayjs().add(2, 'day').toDate(), type: 'bar' as const, color: 'danger' },
    { date: dayjs().add(2, 'day').toDate(), type: 'bar' as const, color: 'warning' },
    { date: dayjs().add(5, 'day').toDate(), type: 'badge' as const, badgeContent: '3' },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-20 relative px-4 sm:px-6 lg:px-8">
      <div className="lg:pr-72 xl:pr-80 animate-in fade-in zoom-in-95 duration-500">
        <DocHeader
          title="Calendar"
          description="A powerful, animated calendar grid supporting complex selection constraints, event markers, custom rendering, and deep i18n localization."
          icon={<LucideCalendar />}
          importCode="import { Calendar } from 'myui';"
        />

        {/* 1. Selection Modes */}
        <section id="modes" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Selection Modes"
            description="Supports single, multi-date, and range selections seamlessly. Try clicking the header to zoom out to Month/Year views."
            code={`<Calendar mode="single" value={date} onChange={setDate} />\n<Calendar mode="multiple" multipleValue={dates} onMultipleChange={setDates} />\n<Calendar mode="range" rangeValue={range} onRangeChange={setRange} />`}
          >
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col gap-4 items-center">
                 <p className="text-sm font-bold text-gray-400 tracking-widest uppercase">Single</p>
                 <Calendar mode="single" value={single} onChange={setSingle} size="sm" />
              </div>
              <div className="flex flex-col gap-4 items-center">
                 <p className="text-sm font-bold text-gray-400 tracking-widest uppercase">Multiple</p>
                 <Calendar mode="multiple" multipleValue={multi} onMultipleChange={setMulti} size="sm" />
              </div>
              <div className="flex flex-col gap-4 items-center">
                 <p className="text-sm font-bold text-gray-400 tracking-widest uppercase">Range</p>
                 <Calendar mode="range" rangeValue={range} onRangeChange={setRange} size="sm" />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 2. Event Markers */}
        <section id="events" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Event Data Visualization"
            description="Inject life into the calendar via the 'events' array prop. Supports dots, top-bars, and notification badges."
            code={`const events = [\n  { date: new Date(), type: 'dot', color: 'primary' },\n  { date: tomorrow, type: 'bar', color: 'danger' },\n  { date: nextWeek, type: 'badge', badgeContent: '3' }\n];\n\n<Calendar events={events} />`}
          >
            <div className="w-full flex justify-center p-8 bg-gray-50 dark:bg-zinc-950/50 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-inner">
              <Calendar events={dummyEvents} size="lg" />
            </div>
          </DocExample>
        </section>

        {/* 3. Localization */}
        <section id="localization" className="space-y-6 scroll-mt-28 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DocExample
              title="3. Deep Localization"
              description="Natively switch language to Thai ('th') and modify the first day of the week seamlessly."
              code={`<Calendar locale="th" firstDayOfWeek={1} />`}
            >
              <div className="flex justify-center flex-1">
                 <Calendar locale="th" firstDayOfWeek={1} size="sm" />
              </div>
            </DocExample>
            
            <DocExample
              title="Disabled Dates"
              description="Pass an array of dates or a function to block specific days."
              code={`<Calendar disabledDate={(d) => d.getDay() === 0 || d.getDay() === 6} />`}
            >
              <div className="flex justify-center flex-1">
                 <Calendar disabledDate={(d) => d.getDay() === 0 || d.getDay() === 6} size="sm" />
              </div>
            </DocExample>
          </div>
        </section>

        {/* 4. Custom Render */}
        <section id="custom" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="4. Custom Cellular Rendering"
            description="Overwrite the entire day cell using the renderDay prop."
            code={`<Calendar renderDay={(date, isSelected) => (\n  <div>{date.getDate()} <p>฿10</p></div>\n)} />`}
          >
            <div className="w-full flex justify-center">
              <Calendar
                size="md"
                renderDay={(date, isSel, isTod) => (
                   <div className="flex flex-col items-center justify-center w-full h-full">
                      <span className="font-bold">{date.getDate()}</span>
                      <span className={`text-[9px] ${isSel ? 'text-white/80' : isTod ? 'text-indigo-400' : 'text-emerald-500'} font-bold`}>
                        ฿{((date.getDate() * 7) % 50) + 10}
                      </span>
                   </div>
                )}
              />
            </div>
          </DocExample>
        </section>

        {/* 5. API Reference */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">5. API Reference</h2>
          </div>
          
          <DocApiTable props={[
            { name: 'mode', type: '"single" | "multiple" | "range"', default: '"single"', description: 'The selection policy of the calendar.' },
            { name: 'events', type: 'CalendarEvent[]', default: '[]', description: 'Array of event markers to decorate dates.' },
            { name: 'locale', type: 'string', default: '"en"', description: 'Day.js locale string (e.g., "th").' },
            { name: 'firstDayOfWeek', type: '0-6', default: '0', description: 'Starting day. 0 = Sun, 1 = Mon.' },
            { name: 'viewMode', type: '"day" | "month" | "year"', default: '"day"', description: 'The current zoom level of the grid.' },
            { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Dimension variants for form grids vs dashboards.' },
            { name: 'disabledDate', type: '(date: Date) => boolean', default: '—', description: 'Function to determine if a date is blocked.' },
            { name: 'renderDay', type: 'Function', default: '—', description: 'Completely overrides the individual day cell layout.' },
          ]} />
        </section>

        {/* 6. Accessibility */}
        <section id="a11y" className="scroll-mt-28">
           <DocAccessibility
            icon={<ShieldCheck size={48} />}
            shortcuts={[
              { tag: 'ARROWS', title: 'Grid Nav', body: 'Navigate day-by-day.' },
              { tag: 'PG-UP/DN', title: 'Month Jump', body: 'Switch months via Page Up/Down.' },
              { tag: 'HOME/END', title: 'Week Jump', body: 'Go to beginning or end of the week.' },
              { tag: 'ENTER/SPACE', title: 'Commit', body: 'Select the highlighted date.' },
            ]}
          />
        </section>
      </div>

      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
