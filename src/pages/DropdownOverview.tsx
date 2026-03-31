import { useState, useEffect } from 'react';
import { ChevronDown, ShieldCheck, Filter, MoreHorizontal } from 'lucide-react';
import { Dropdown } from '../components/Dropdown';
import { 
  DocHeader, 
  DocExample, 
  DocApiTable, 
  DocAccessibility, 
  DocBestPractices, 
  DocToc 
} from '../components/Documentation';

const tocItems = [
  { id: 'basic', label: '1. Basic Usage' },
  { id: 'variants', label: '2. Custom Variants' },
  { id: 'api', label: '3. API Reference' },
  { id: 'best-practices', label: "4. Do's & Don'ts" },
  { id: 'a11y', label: '5. Accessibility' },
];

export default function DropdownOverview() {
  const [activeId, setActiveId] = useState<string>(tocItems[0]?.id || 'basic');
  const [selected, setSelected] = useState('react');

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

  const options = [
    { value: 'react', label: 'React.js' },
    { value: 'next', label: 'Next.js' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'svelte', label: 'Svelte' },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-20 relative px-4 sm:px-6 lg:px-8">
      <div className="lg:pr-72 xl:pr-80 animate-in fade-in zoom-in-95 duration-500">
        <DocHeader
          title="Dropdown"
          description="A beautiful, accessible overlay menu component with floating animations and intelligent collision detection."
          icon={<ChevronDown />}
          importCode="import { Dropdown } from 'myui';"
        />

        {/* 1. Basic Usage */}
        <section id="basic" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Basic Selection"
            description="The most common use case for choosing an item from a list."
            code={`<Dropdown \n  items={options} \n  value={selected} \n  onChange={setSelected} \n/>`}
          >
            <div className="w-full max-w-sm space-y-4">
               <div className="space-y-2">
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Framework Picker</span>
                 <Dropdown 
                   items={options} 
                   value={selected} 
                   onChange={setSelected} 
                   placeholder="Select a framework..."
                 />
               </div>
               <div className="px-4 py-3 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/30 rounded-2xl flex items-center justify-between">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Selected Value</span>
                  <code className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300">{selected}</code>
               </div>
            </div>
          </DocExample>
        </section>

        {/* 2. Variants */}
        <section id="variants" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Contextual Variants"
            description="Adapt the dropdown trigger and menu for different specialized actions."
            code={`// Examples of Filter and Action Menus`}
          >
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
               <div className="space-y-3 p-6 bg-gray-50 dark:bg-zinc-950/50 rounded-3xl border border-gray-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Filter size={14} className="text-purple-500" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Filter Menu</span>
                  </div>
                  <Dropdown 
                    items={[
                      { value: 'all', label: 'All Statuses' },
                      { value: 'active', label: 'Active Only' },
                      { value: 'archived', label: 'Archived' },
                    ]}
                    placeholder="Filter by..."
                  />
                  <p className="text-[10px] text-gray-400 italic">Commonly used in table headers or dashboards.</p>
               </div>
               <div className="space-y-3 p-6 bg-gray-50 dark:bg-zinc-950/50 rounded-3xl border border-gray-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2 mb-2">
                    <MoreHorizontal size={14} className="text-emerald-500" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Action Menu</span>
                  </div>
                  <Dropdown 
                    items={[
                      { value: 'edit', label: 'Edit Project' },
                      { value: 'share', label: 'Share Access' },
                      { value: 'delete', label: 'Delete Forever' },
                    ]}
                    placeholder="More actions"
                  />
                  <p className="text-[10px] text-gray-400 italic">Ideal for overflow patterns in card headers.</p>
               </div>
            </div>
          </DocExample>
        </section>

        {/* 3. API Reference */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">3. API Reference</h2>
          </div>
          
          <DocApiTable props={[
            { name: 'items', type: '{ value: string; label: string; disabled?: boolean }[]', default: '[]', description: 'List of options to display in the menu.', required: true },
            { name: 'value', type: 'string', default: 'undefined', description: 'The currently selected option value.' },
            { name: 'onChange', type: '(value: string) => void', default: 'undefined', description: 'Callback triggered when an option is selected.' },
            { name: 'placeholder', type: 'string', default: '"Select..."', description: 'Text shown when no value is selected.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction with the dropdown.' },
            { name: 'className', type: 'string', default: 'undefined', description: 'Additional CSS classes for the trigger.' },
          ]} />
        </section>

        {/* 4. Best Practices */}
        <section id="best-practices" className="scroll-mt-28 mb-16">
          <DocBestPractices
            dos={[
              "Use for choosing a single item from a list of 5-15 items.",
              "Provide a clear placeholder that describes the expected choice.",
              "Enable keyboard navigation for power users.",
              "Group related actions within the menu logically."
            ]}
            donts={[
              "Don't use for more than 20 items (consider a searchable select).",
              "Don't use for binary choices (use a Switch or Checkbox).",
              "Don't stack multiple dropdowns in a tight vertical space.",
              "Don't leave the menu open when the trigger loses focus."
            ]}
          />
        </section>

        {/* 5. Accessibility */}
        <section id="a11y" className="scroll-mt-28">
           <DocAccessibility
            icon={<ShieldCheck size={48} />}
            shortcuts={[
              { tag: 'SPACE/ENTER', title: 'Open/Select', body: 'Toggles the menu or selects current focused item.' },
              { tag: 'ARROWS', title: 'Navigate', body: 'Move focus between items within the open menu.' },
              { tag: 'ESC', title: 'Dismiss', body: 'Instantly closes the menu and returns focus to trigger.' },
              { tag: 'HOME/END', title: 'Jump', body: 'Quickly navigate to the first or last menu item.' },
            ]}
          />
        </section>
      </div>

      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
