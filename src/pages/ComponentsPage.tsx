import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers, MousePointer2, ChevronDown,
  Type, ListFilter, CheckSquare,
  ToggleRight, CircleDot, Calendar as LucideCalendar,
  Bell, Hash, Square, PanelTop, Search, CalendarDays,
  LayoutList, Map, Navigation2, Table, Box, Tag, UserCircle
} from 'lucide-react';
import { DocHeader } from '../components/Documentation/DocPrimitives';

const components = [
  { id: 'button', name: 'Button', description: 'Interactive trigger for actions and navigation.', icon: <MousePointer2 />, color: 'from-blue-500 to-indigo-600' },
  { id: 'dropdown', name: 'Dropdown', description: 'Floating menu for selecting options from a list.', icon: <ChevronDown />, color: 'from-purple-500 to-pink-600' },
  { id: 'input', name: 'Input', description: 'High-fidelity text entry for user data.', icon: <Type />, color: 'from-indigo-500 to-blue-600' },
  { id: 'select', name: 'Select', description: 'Advanced search and choice picking system.', icon: <ListFilter />, color: 'from-sky-500 to-cyan-600' },
  { id: 'checkbox', name: 'Checkbox', description: 'Binary choice with support for indeterminate states.', icon: <CheckSquare />, color: 'from-emerald-500 to-teal-600' },
  { id: 'switch', name: 'Switch', description: 'Smooth toggle for system preferences.', icon: <ToggleRight />, color: 'from-amber-500 to-orange-600' },
  { id: 'radio', name: 'Radio', description: 'Single choice selection from multiple options.', icon: <CircleDot />, color: 'from-rose-500 to-red-600' },
  { id: 'calendar', name: 'Calendar', description: 'Lightweight and fast date picking grid.', icon: <LucideCalendar />, color: 'from-violet-500 to-purple-600' },
  { id: 'toast', name: 'Toast', description: 'Non-intrusive system feedback notifications.', icon: <Bell />, color: 'from-fuchsia-500 to-purple-600' },
  { id: 'number-input', name: 'Number Input', description: 'Precise numerical entry with step controls.', icon: <Hash />, color: 'from-teal-500 to-emerald-600' },
  { id: 'modal', name: 'Modal', description: 'Overlay dialogs for focused user interaction.', icon: <Square />, color: 'from-indigo-600 to-purple-700' },
  { id: 'popover', name: 'Popover', description: 'Floating content layer for tooltips and dropdowns.', icon: <PanelTop />, color: 'from-cyan-500 to-blue-600' },
  { id: 'combobox', name: 'Combobox', description: 'Autocomplete input with search and selection.', icon: <Search />, color: 'from-orange-500 to-amber-600' },
  { id: 'date-picker', name: 'Date Picker', description: 'Calendar-powered date and range selection.', icon: <CalendarDays />, color: 'from-pink-500 to-rose-600' },
  { id: 'tabs', name: 'Tabs', description: 'Organize content into switchable view panels.', icon: <LayoutList />, color: 'from-violet-500 to-indigo-600' },
  { id: 'breadcrumb', name: 'Breadcrumb', description: 'Hierarchical navigation trail for deep pages.', icon: <Map />, color: 'from-blue-500 to-cyan-600' },
  { id: 'navbar', name: 'Navbar', description: 'Responsive top navigation bar with mobile menu.', icon: <Navigation2 />, color: 'from-slate-600 to-gray-700' },
  { id: 'table', name: 'Table', description: 'High-performance data table with sorting and paging.', icon: <Table />, color: 'from-indigo-500 to-blue-600' },
  { id: 'card', name: 'Card', description: 'Flexible content container with header/footer/image slots.', icon: <Box />, color: 'from-cyan-500 to-blue-600' },
  { id: 'badge', name: 'Badge', description: 'Small status descriptors for tags and counts.', icon: <Tag />, color: 'from-emerald-500 to-teal-600' },
  { id: 'avatar', name: 'Avatar', description: 'User profile representation with image/initials.', icon: <UserCircle />, color: 'from-violet-500 to-purple-600' },
  { id: 'skeleton', name: 'Skeleton', description: 'Placeholder loading state for content.', icon: <Box />, color: 'from-gray-400 to-gray-500' },
  { id: 'progress', name: 'Progress', description: 'Indicator showing the completion status of a task.', icon: <LayoutList />, color: 'from-emerald-500 to-teal-600' },
  { id: 'alert', name: 'Alert', description: 'Prominent message for contextual feedback.', icon: <Bell />, color: 'from-rose-500 to-red-600' },
  { id: 'tooltip', name: 'Tooltip', description: 'Popup displaying information on hover or focus.', icon: <PanelTop />, color: 'from-indigo-500 to-blue-600' },
  { id: 'drawer', name: 'Drawer', description: 'Panel sliding in from the edge of the screen.', icon: <LayoutList />, color: 'from-sky-500 to-cyan-600' },
  { id: 'alert-dialog', name: 'Alert Dialog', description: 'Modal dialog that interrupts the user with important content.', icon: <Square />, color: 'from-amber-500 to-orange-600' },
];

export default function ComponentsPage() {
  return (
    <div className="max-w-7xl mx-auto pb-20 px-4 sm:px-6 lg:px-8">
      <div className="animate-in fade-in zoom-in-95 duration-500">
        <DocHeader
          title="Component Library"
          description="A comprehensive collection of professionally designed, accessible, and high-performance UI components."
          icon={<Layers />}
          importCode="import { Button, Checkbox, Input, Select, Modal, Toast, Table, Card } from 'myui';"
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {components.map((comp) => (
            <Link
              key={comp.id}
              to={`/components/${comp.id}`}
              className="group relative bg-card/40 backdrop-blur-xl rounded-[2.5rem] border border-white/10 dark:border-white/5 p-8 hover:shadow-2xl hover:shadow-indigo-500/20 hover:border-indigo-500/40 transition-all duration-500 hover:-translate-y-2 overflow-hidden ring-1 ring-white/5"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${comp.color} opacity-[0.03] group-hover:opacity-[0.12] transition-opacity rounded-bl-[5rem]`} />

              <div className={`w-14 h-14 bg-gradient-to-br ${comp.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ring-1 ring-white/20 shadow-[inset_0_2px_10px_rgba(255,255,255,0.2)]`}>
                {React.cloneElement(comp.icon as React.ReactElement)}
              </div>

              <h3 className="text-xl font-black text-foreground tracking-tight mb-2">
                {comp.name}
              </h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                {comp.description}
              </p>

              <div className="mt-8 flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                Explore Documentation
                <span className="text-lg">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
