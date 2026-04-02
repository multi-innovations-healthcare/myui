import { useState, useEffect } from 'react';
import { 
  Layers, User, Settings, Zap, 
  X, ShieldCheck, 
} from 'lucide-react';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { 
  DocHeader, 
  DocExample, 
  DocApiTable, 
  DocAccessibility, 
  DocBestPractices, 
  DocToc 
} from '../components/Documentation';

const tocItems = [
  { id: 'basic', label: '1. Basic & Multiple' },
  { id: 'search', label: '2. Search & Groups' },
  { id: 'states', label: '3. UI States' },
  { id: 'slots', label: '4. Prefixes & Suffixes' },
  { id: 'custom', label: '5. Custom Rendering' },
  { id: 'tags', label: '6. Tag Management' },
  { id: 'api', label: '7. API Reference' },
  { id: 'best-practices', label: "8. Do's & Don'ts" },
  { id: 'a11y', label: '9. Accessibility' },
];

const frameworkOptions = [
  { label: 'React', value: 'react', icon: <Zap className="w-3.5 h-3.5 text-blue-500" /> },
  { label: 'Vue', value: 'vue', icon: <Zap className="w-3.5 h-3.5 text-emerald-500" /> },
  { label: 'Svelte', value: 'svelte', icon: <Zap className="w-3.5 h-3.5 text-orange-500" /> },
  { label: 'Next.js', value: 'nextjs', icon: <Zap className="w-3.5 h-3.5 text-black dark:text-white" /> },
];

const groupedOptions = [
  { label: 'React', value: 'react', group: 'Frontend' },
  { label: 'Vue', value: 'vue', group: 'Frontend' },
  { label: 'Node.js', value: 'node', group: 'Backend' },
  { label: 'Python', value: 'python', group: 'Backend' },
  { label: 'Tailwind CSS', value: 'tailwind', group: 'Design' },
  { label: 'Figma', value: 'figma', group: 'Design' },
];

export default function SelectOverview() {
  const [activeId, setActiveId] = useState<string>(tocItems[0]?.id || 'basic');

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

  return (
    <div className="max-w-7xl mx-auto pb-20 relative px-4 sm:px-6 lg:px-8">
      <div className="lg:pr-72 xl:pr-80 animate-in fade-in zoom-in-95 duration-500">
        <DocHeader
          title="Select"
          description="A high-performance selection component supporting search, multi-select, and complex data grouping."
          icon={<Layers />}
          importCode="import { Select } from '@multi_innovations_healthcare/myui';"
        />

        {/* 1. Basic & Multiple */}
        <section id="basic" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Basic & Multiple"
            description="Simple selection and tag-based multiple modes."
            code={`<Select options={options} placeholder="Single Select" />
<Select mode="multiple" options={options} placeholder="Multi Select" />`}
          >
            <div className="w-full max-w-sm space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Single Selection</span>
                <Select options={frameworkOptions} placeholder="Choose a framework" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Multiple Selection</span>
                <Select mode="multiple" options={frameworkOptions} placeholder="Select frameworks" />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 2. Search & Groups */}
        <section id="search" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Search & Groups"
            description="Efficiently navigate large datasets with built-in filtering and categorization."
            code={`<Select showSearch options={options} />
<Select options={groupedOptions} />`}
          >
            <div className="w-full max-w-sm space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Type to Search</span>
                <Select showSearch options={groupedOptions} placeholder="Search technology..." />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Grouped Categories</span>
                <Select options={groupedOptions} placeholder="Select from categories" />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 3. UI States */}
        <section id="states" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="3. UI States"
            description="Manage scales, validation status, and visual variants."
            code={`<Select size="sm" status="error" ... />
<Select variant="filled" ... />`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sizes</span>
                <Select size="sm" options={frameworkOptions} placeholder="Small (sm)" />
                <Select options={frameworkOptions} placeholder="Default (md)" />
                <Select size="lg" options={frameworkOptions} placeholder="Large (lg)" />
              </div>
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status & Variants</span>
                <Select status="error" options={frameworkOptions} placeholder="Error Status" />
                <Select status="warning" options={frameworkOptions} placeholder="Warning Status" />
                <Select variant="filled" options={frameworkOptions} placeholder="Filled Variant" />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 4. Prefixes & Suffixes */}
        <section id="slots" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="4. Prefixes & Suffixes"
            description="Inject iconography to provide immediate visual context."
            code={`<Select prefix={<User />} ... />
<Select suffix={<Settings />} ... />`}
          >
            <div className="w-full max-w-md space-y-6">
              <Select prefix={<User size={16} />} options={[{label: 'Admin', value: 'admin'}]} placeholder="Select Role" />
              <Select suffix={<Settings size={16} />} options={frameworkOptions} placeholder="Framework Settings" />
              <Select allowClear defaultValue="react" options={frameworkOptions} />
            </div>
          </DocExample>
        </section>

        {/* 5. Custom Rendering */}
        <section id="custom" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="5. Custom Rendering"
            description="Total control over the dropdown shell and individual option items."
            code={`<Select 
  optionRender={(opt) => <div>{opt.label}</div>}
  dropdownRender={(menu) => <div>Header {menu} Footer</div>}
/>`}
          >
            <div className="w-full max-w-sm space-y-6">
              <Select 
                options={frameworkOptions}
                optionRender={(opt) => (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="font-medium">{opt.label}</span>
                  </div>
                )}
                placeholder="Custom options" 
              />
              <Select 
                options={frameworkOptions}
                dropdownRender={(menu) => (
                  <div className="p-1">
                    <div className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-zinc-800 mb-1">
                      Developer Tools
                    </div>
                    {menu}
                    <div className="p-2 border-t border-gray-100 dark:border-zinc-800 mt-1">
                      <Button block size="sm" type="primary" className="h-8 rounded-lg text-[11px]">ADD NEW ITEM</Button>
                    </div>
                  </div>
                )}
                placeholder="Custom dropdown shell" 
              />
            </div>
          </DocExample>
        </section>

        {/* 6. Tag Management */}
        <section id="tags" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="6. Tag Management"
            description="Control how multiple selections are summarized and rendered."
            code={`<Select mode="multiple" maxTagCount={2} ... />`}
          >
            <div className="w-full max-w-md space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Max Tag Count (Limit 2)</span>
                <Select mode="multiple" maxTagCount={2} defaultValue={['react', 'vue', 'svelte']} options={frameworkOptions} />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Custom Tag Styles</span>
                <Select 
                  mode="multiple" 
                  defaultValue={['react']} 
                  options={frameworkOptions}
                  tagRender={(props) => (
                    <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-2 shadow-lg shadow-purple-500/20">
                      {props.label}
                      <button onClick={props.onClose} className="hover:bg-white/20 rounded-full p-0.5"><X size={10} /></button>
                    </div>
                  )}
                />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 7. API Reference */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">7. API Reference</h2>
          </div>
          
          <DocApiTable props={[
            { name: 'options', type: 'Option[]', default: '[]', description: 'Array of data items to select from.', required: true },
            { name: 'mode', type: '"default" | "multiple"', default: '"default"', description: 'Selection behavior mode.' },
            { name: 'showSearch', type: 'boolean', default: 'false', description: 'Enables real-time filtering of options.' },
            { name: 'placeholder', type: 'string', default: 'undefined', description: 'Text shown when no value is selected.' },
            { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Size of the select trigger.' },
            { name: 'status', type: '"error" | "warning"', default: 'undefined', description: 'Visual validation state.' },
            { name: 'dropdownRender', type: '(menu: ReactNode) => ReactNode', default: 'undefined', description: 'Custom wrap for the dropdown menu.' },
            { name: 'tagRender', type: '(props: TagProps) => ReactNode', default: 'undefined', description: 'Custom rendering for selection tags.' },
          ]} />
        </section>

        {/* 8. Best Practices */}
        <section id="best-practices" className="scroll-mt-28 mb-16">
          <DocBestPractices
            dos={[
              "Use Select for 5+ options where Radio Group becomes cluttered.",
              "Enable search for lists with more than 10 items.",
              "Use clear placeholders that describe the expected input.",
              "Provide a Clear button for optional fields."
            ]}
            donts={[
              "Don't use Select for Binary (Yes/No) choices (use Switch).",
              "Don't nest complex interactive elements inside option items.",
              "Don't use multiple selection for mutually exclusive data.",
              "Don't leave the trigger width too narrow for long labels."
            ]}
          />
        </section>

        {/* 9. Accessibility */}
        <section id="a11y" className="scroll-mt-28">
           <DocAccessibility
            icon={<ShieldCheck size={48} />}
            shortcuts={[
              { tag: 'ARROW', title: 'Navigation', body: 'Move through options using keyboard arrows.' },
              { tag: 'ENTER', title: 'Confirm', body: 'Select the highlighted option item.' },
              { tag: 'ESC', title: 'Dismiss', body: 'Instantly close the dropdown menu.' },
              { tag: 'ARIA', title: 'Combobox', body: 'Full ARIA 1.2 compliant combobox pattern.' },
            ]}
          />
        </section>
      </div>

      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
