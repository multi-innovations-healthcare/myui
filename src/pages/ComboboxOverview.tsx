import { useState, useEffect, useCallback } from 'react';
import { Search, ShieldCheck, Zap } from 'lucide-react';
import { Combobox } from '../components/Combobox';
import {
  DocHeader,
  DocExample,
  DocApiTable,
  DocAccessibility,
  DocBestPractices,
  DocToc,
} from '../components/Documentation';

const tocItems = [
  { id: 'basic', label: '1. Basic & Search' },
  { id: 'keyboard', label: '2. Keyboard Navigation' },
  { id: 'create', label: '3. Create Option' },
  { id: 'async', label: '4. Async Search' },
  { id: 'multi', label: '5. Multi-Select' },
  { id: 'api', label: '6. API Reference' },
  { id: 'best-practices', label: "7. Do's & Don'ts" },
  { id: 'a11y', label: '8. Accessibility' },
];

const frameworkOptions = [
  { label: 'React', value: 'react', icon: <Zap className="w-3.5 h-3.5 text-blue-500" /> },
  { label: 'Vue', value: 'vue', icon: <Zap className="w-3.5 h-3.5 text-emerald-500" /> },
  { label: 'Angular', value: 'angular', icon: <Zap className="w-3.5 h-3.5 text-red-500" /> },
  { label: 'Svelte', value: 'svelte', icon: <Zap className="w-3.5 h-3.5 text-orange-500" /> },
  { label: 'Next.js', value: 'nextjs', icon: <Zap className="w-3.5 h-3.5 text-black dark:text-white" /> },
  { label: 'Nuxt', value: 'nuxt', icon: <Zap className="w-3.5 h-3.5 text-green-500" /> },
  { label: 'Remix', value: 'remix', icon: <Zap className="w-3.5 h-3.5 text-purple-500" /> },
  { label: 'Astro', value: 'astro', icon: <Zap className="w-3.5 h-3.5 text-pink-500" /> },
];

const countryOptions = [
  { label: 'Thailand', value: 'th' },
  { label: 'Japan', value: 'jp' },
  { label: 'South Korea', value: 'kr' },
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Australia', value: 'au' },
  { label: 'Canada', value: 'ca' },
  { label: 'Singapore', value: 'sg' },
];

export default function ComboboxOverview() {
  const [activeId, setActiveId] = useState(tocItems[0]?.id || 'basic');
  const [asyncOptions, setAsyncOptions] = useState(countryOptions);
  const [asyncLoading, setAsyncLoading] = useState(false);
  const [createdOptions, setCreatedOptions] = useState(frameworkOptions);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: [0.1, 0.5, 0.9] }
    );
    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleAsyncSearch = useCallback((query: string) => {
    setAsyncLoading(true);
    // simulate API call
    setTimeout(() => {
      const results = countryOptions.filter((o) =>
        o.label.toLowerCase().includes(query.toLowerCase())
      );
      setAsyncOptions(results);
      setAsyncLoading(false);
    }, 800);
  }, []);

  const handleCreate = useCallback((val: string) => {
    const newOpt = { label: val, value: val.toLowerCase().replace(/\s+/g, '-'), icon: <Zap className="w-3.5 h-3.5 text-gray-500" /> };
    setCreatedOptions((prev) => [...prev, newOpt]);
  }, []);

  return (
    <div className="max-w-7xl mx-auto pb-20 relative px-4 sm:px-6 lg:px-8">
      <div className="lg:pr-72 xl:pr-80 animate-in fade-in zoom-in-95 duration-500">
        <DocHeader
          title="Combobox"
          description="An autocomplete input with dropdown selection, keyboard navigation, async search, and multi-select capabilities."
          icon={<Search />}
          importCode="import { Combobox } from '@multi_innovations_healthcare/myui';"
        />

        {/* 1. Basic & Search */}
        <section id="basic" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Basic & Search"
            description="Type to filter options in real-time. Automatic empty state when no results match."
            code={`<Combobox
  options={options}
  placeholder="Search frameworks..."
  onChange={(val) => console.log(val)}
/>`}
          >
            <div className="w-full max-w-sm space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Type to Search</span>
                <Combobox options={frameworkOptions} placeholder="Search frameworks..." />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">With Default Value</span>
                <Combobox options={frameworkOptions} defaultValue="react" placeholder="Select framework" />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 2. Keyboard */}
        <section id="keyboard" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Keyboard Navigation"
            description="Navigate with ↑↓ arrows, select with Enter, and dismiss with Escape. Active item is highlighted."
            code={`// Keyboard navigation is built-in:
// ↑↓ - Navigate through options
// Enter - Select highlighted option
// Escape - Close dropdown
<Combobox options={options} />`}
          >
            <div className="w-full max-w-sm space-y-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Try ↑↓ Enter Esc</span>
              <Combobox options={countryOptions} placeholder="Navigate with keyboard..." />
            </div>
          </DocExample>
        </section>

        {/* 3. Create */}
        <section id="create" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="3. Create New Option"
            description='When no match is found, users can create a new option. Shows a "Create" button in the dropdown.'
            code={`<Combobox
  allowCreate
  onCreate={(value) => addOption(value)}
  options={options}
/>`}
          >
            <div className="w-full max-w-sm space-y-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Type a non-existing name</span>
              <Combobox
                options={createdOptions}
                allowCreate
                onCreate={handleCreate}
                placeholder="Search or create..."
                emptyText="ไม่พบข้อมูล"
              />
            </div>
          </DocExample>
        </section>

        {/* 4. Async */}
        <section id="async" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="4. Async Search"
            description="Debounced search with loading spinner. Results fetched asynchronously."
            code={`<Combobox
  options={asyncResults}
  onSearch={handleSearch}
  loading={isLoading}
  debounceMs={300}
/>`}
          >
            <div className="w-full max-w-sm space-y-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Async with 800ms delay</span>
              <Combobox
                options={asyncOptions}
                onSearch={handleAsyncSearch}
                loading={asyncLoading}
                placeholder="Search countries..."
                emptyText="ไม่พบข้อมูล"
              />
            </div>
          </DocExample>
        </section>

        {/* 5. Multi */}
        <section id="multi" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="5. Multi-Select"
            description="Select multiple values displayed as removable tag chips."
            code={`<Combobox
  mode="multiple"
  options={options}
  placeholder="Select multiple..."
/>`}
          >
            <div className="w-full max-w-sm space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Multiple Selection</span>
                <Combobox mode="multiple" options={frameworkOptions} placeholder="Select frameworks..." />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pre-selected</span>
                <Combobox mode="multiple" options={frameworkOptions} defaultValue={['react', 'vue']} placeholder="Frameworks" />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 6. API */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">6. API Reference</h2>
          </div>
          <DocApiTable props={[
            { name: 'options', type: 'ComboboxOption[]', default: '[]', description: 'Array of selectable options.', required: true },
            { name: 'value', type: 'string | string[]', default: 'undefined', description: 'Controlled selected value(s).' },
            { name: 'onChange', type: '(val) => void', default: 'undefined', description: 'Called when selection changes.' },
            { name: 'onSearch', type: '(query: string) => void', default: 'undefined', description: 'Async search callback, debounced.' },
            { name: 'onCreate', type: '(value: string) => void', default: 'undefined', description: 'Callback when user creates a new option.' },
            { name: 'mode', type: '"single" | "multiple"', default: '"single"', description: 'Single or multi-select mode.' },
            { name: 'allowCreate', type: 'boolean', default: 'false', description: 'Allow creating new options from search input.' },
            { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading spinner in the dropdown.' },
            { name: 'emptyText', type: 'string', default: '"No results found"', description: 'Text shown when no options match.' },
            { name: 'debounceMs', type: 'number', default: '300', description: 'Debounce delay (ms) for onSearch callback.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the combobox.' },
          ]} />
        </section>

        {/* 7. Best Practices */}
        <section id="best-practices" className="scroll-mt-28 mb-16">
          <DocBestPractices
            dos={[
              'Use Combobox when options exceed 10 items — helps users find items quickly.',
              'Provide meaningful empty states with actionable text.',
              'Use debounced async search for server-side filtering.',
              'Support keyboard navigation for accessibility.',
            ]}
            donts={[
              "Don't use Combobox for 3-5 static options — use Select or Radio instead.",
              "Don't make the debounce too short for slow APIs.",
              "Don't hide the search input — it's the core value of this component.",
              "Don't forget to handle edge cases like clearing and empty states.",
            ]}
          />
        </section>

        {/* 8. Accessibility */}
        <section id="a11y" className="scroll-mt-28">
          <DocAccessibility
            icon={<ShieldCheck size={48} />}
            shortcuts={[
              { tag: '↑↓', title: 'Navigate', body: 'Move through the filtered option list.' },
              { tag: 'ENTER', title: 'Select', body: 'Confirm the highlighted option or create new.' },
              { tag: 'ESC', title: 'Dismiss', body: 'Close dropdown and clear search.' },
              { tag: 'ARIA', title: 'Combobox', body: 'Full ARIA combobox pattern with listbox role.' },
            ]}
          />
        </section>
      </div>

      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
