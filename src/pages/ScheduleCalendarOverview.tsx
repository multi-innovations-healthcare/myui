import { useState, useEffect } from "react";
import { Clock, Layout, MousePointer2, Layers, BookOpen } from "lucide-react";
import { ScheduleCalendar } from "../components/ScheduleCalendar";
import type { ScheduleEvent } from "../components/ScheduleCalendar/types";
import dayjs from "@/lib/dayjs";
import {
  DocHeader,
  DocExample,
  DocApiTable,
  DocToc,
} from "../components/Documentation";

const tocItems = [
  { id: "intro", label: "Overview" },
  { id: "basic", label: "1. Basic Usage" },
  { id: "week", label: "2. Week View" },
  { id: "overlap", label: "3. Smart Overlap" },
  { id: "api", label: "4. API Reference" },
];

export default function ScheduleCalendarOverview() {
  const [activeId, setActiveId] = useState(tocItems[0]?.id);

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

  // Mock Events
  const events: ScheduleEvent[] = [
    {
      id: "1",
      title: "Design Sync",
      description: "Weekly design review with the product team.",
      start: dayjs().hour(10).minute(0).toDate(),
      end: dayjs().hour(11).minute(30).toDate(),
      color: "border-l-indigo-500",
    },
    {
      id: "2",
      title: "Backend Standup",
      description: "Discuss API infrastructure updates.",
      start: dayjs().hour(10).minute(30).toDate(),
      end: dayjs().hour(11).minute(0).toDate(),
      color: "border-l-rose-500",
    },
    {
      id: "3",
      title: "Lunch Break",
      description: "Relax and recharge.",
      start: dayjs().hour(12).minute(0).toDate(),
      end: dayjs().hour(13).minute(0).toDate(),
      color: "border-l-emerald-500",
    },
    {
      id: "4",
      title: "Product Demo",
      description: "Showcase new features to stakeholders.",
      start: dayjs().hour(14).minute(0).toDate(),
      end: dayjs().hour(15).minute(30).toDate(),
      color: "border-l-amber-500",
    },
    {
      id: "5",
      title: "Code Review",
      description: "Review pull requests for the mobile app.",
      start: dayjs().hour(14).minute(30).toDate(),
      end: dayjs().hour(16).minute(0).toDate(),
      color: "border-l-blue-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-20 relative px-4 sm:px-6 lg:px-8">
      <div className="lg:pr-72 xl:pr-80">
        <DocHeader
          title="Schedule Calendar"
          description="A high-performance schedule engine for managing appointments, deep work sessions, and resource scheduling with automatic overlap handling."
          icon={<Layout className="text-white" />}
          importCode="import { ScheduleCalendar } from 'myui';"
        />

        {/* Introduction */}
        <section id="intro" className="mb-16 space-y-4">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <Clock />, title: "Time-Based", desc: "Precise vertical positioning based on hours and minutes." },
                { icon: <Layers />, title: "Smart Overlap", desc: "Automatically groups and stacks colliding events." },
                { icon: <MousePointer2 />, title: "Interactive", desc: "Built-in drag-to-create and event selection UI." }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-3xl bg-gray-50/50 dark:bg-zinc-900/30 border border-gray-100 dark:border-zinc-800">
                    <div className="w-10 h-10 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm border border-gray-100 dark:border-zinc-700/50 mb-4">
                       {feature.icon}
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-zinc-50 mb-1">{feature.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-zinc-500 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* 1. Basic Usage */}
        <section id="basic" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Day View"
            description="Perfect for individual daily planning. Includes a real-time current time indicator."
            code={`<ScheduleCalendar \n  view="day" \n  events={events} \n/>`}
          >
            <div className="w-full h-[600px]">
               <ScheduleCalendar 
                  view="day" 
                  events={events} 
                  startHour={8}
                  endHour={18}
               />
            </div>
          </DocExample>
        </section>

        {/* 2. Week View */}
        <section id="week" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Week View"
            description="Visualize your entire week at a glance with synchronized scrolling."
            code={`<ScheduleCalendar \n  view="week" \n  events={events} \n/>`}
          >
            <div className="w-full h-[600px]">
               <ScheduleCalendar 
                  view="week" 
                  events={events}
                  startHour={8}
                  endHour={18} 
               />
            </div>
          </DocExample>
        </section>

        {/* 3. API Reference */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight flex items-center gap-2">
              <BookOpen className="text-indigo-500" size={24} />
              API Reference
            </h2>
          </div>

          <DocApiTable
            props={[
              {
                name: "events",
                type: "ScheduleEvent[]",
                default: "[]",
                description: "Array of items to render on the timeline.",
              },
              {
                name: "view",
                type: "'day' | 'week'",
                default: "'week'",
                description: "Layout mode for the calendar.",
              },
              {
                name: "slotDuration",
                type: "number",
                default: "30",
                description: "Granularity of the grid in minutes.",
              },
              {
                name: "startHour / endHour",
                type: "number",
                default: "0 / 23",
                description: "Visible hour range for the grid.",
              },
            ]}
          />
        </section>
      </div>

      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
