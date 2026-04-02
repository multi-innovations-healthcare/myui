import { useState, useEffect } from 'react';
import { 
  Hash, Calculator, Coins, Settings2, 
  ShieldCheck, Zap,
} from 'lucide-react';
import { NumberInput } from '../components/NumberInput';
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
  { id: 'precision', label: '2. Precision & Step' },
  { id: 'constraints', label: '3. Constraints' },
  { id: 'features', label: '4. Core Features' },
  { id: 'api', label: '5. API Reference' },
  { id: 'best-practices', label: "6. Do's & Don'ts" },
  { id: 'a11y', label: '7. Accessibility' },
];

export default function NumberInputOverview() {
  const [activeId, setActiveId] = useState<string>(tocItems[0]?.id || 'basic');
  const [val1, setVal1] = useState(1250);
  const [val2, setVal2] = useState(45.5);
  const [val3, setVal3] = useState(5);

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
          title="NumberInput"
          description="A precise numerical input component with smart arithmetic handling and customizable step controls."
          icon={<Hash />}
          importCode="import { NumberInput } from '@multi_innovations_healthcare/myui';"
        />

        {/* 1. Basic Usage */}
        <section id="basic" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Basic Usage"
            description="Standard input with automatic thousand separators and formatting."
            code={`<NumberInput \n  value={value} \n  onChange={setValue} \n  placeholder="Enter amount" \n/>`}
          >
            <div className="w-full max-w-sm space-y-4">
               <div className="space-y-2">
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Financial Entry</span>
                 <NumberInput 
                   value={val1} 
                   onChange={setVal1} 
                   placeholder="Enter amount"
                 />
               </div>
               <div className="px-4 py-2 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-900/30 rounded-xl">
                 <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                   <Zap size={10} /> Live State: {val1}
                 </span>
               </div>
            </div>
          </DocExample>
        </section>

        {/* 2. Precision & Step */}
        <section id="precision" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Precision & Step"
            description="Control decimal places and increment values surgically."
            code={`<NumberInput \n  precision={2} \n  step={0.5} \n/>`}
          >
            <div className="w-full max-w-sm space-y-6">
               <div className="space-y-2">
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Half-Point Step (0.5)</span>
                 <NumberInput 
                   value={val2} 
                   onChange={setVal2} 
                   precision={2}
                   step={0.5}
                 />
               </div>
               <p className="text-[11px] text-gray-500 italic px-2">Increments by 0.5 with fixed 2-decimal point precision.</p>
            </div>
          </DocExample>
        </section>

        {/* 3. Constraints */}
        <section id="constraints" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="3. Constraints"
            description="Enforce minimum and maximum values with automatic clamping."
            code={`<NumberInput \n  min={0} \n  max={10} \n/>`}
          >
            <div className="w-full max-w-sm space-y-6">
               <div className="space-y-2">
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bounded Range (0-10)</span>
                 <NumberInput 
                   value={val3} 
                   onChange={setVal3} 
                   min={0}
                   max={10}
                 />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="p-3 bg-red-50/50 dark:bg-red-950/20 rounded-xl border border-red-100/50 dark:border-red-900/30 text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-widest text-center">
                   MIN: 0
                 </div>
                 <div className="p-3 bg-red-50/50 dark:bg-red-950/20 rounded-xl border border-red-100/50 dark:border-red-900/30 text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-widest text-center">
                   MAX: 10
                 </div>
               </div>
            </div>
          </DocExample>
        </section>

        {/* 4. Core Features */}
        <section id="features" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="4. Internal Engineering"
            description="Advanced logic that ensures numerical stability and usability."
            code={`// Features:\n// - Smart Precision Arithmetic\n// - Auto-Formatting\n// - Keyboard Step Logic`}
          >
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm transition-all hover:scale-105">
                <Calculator size={24} className="text-emerald-500 mb-4" />
                <h4 className="font-bold text-gray-900 dark:text-white tracking-tight">Smart Math</h4>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">Avoids floating point errors (like 0.1+0.2) using robust internal state management.</p>
              </div>
              <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm transition-all hover:scale-105">
                <Coins size={24} className="text-amber-500 mb-4" />
                <h4 className="font-bold text-gray-900 dark:text-white tracking-tight">Auto Format</h4>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">Adds thousands separators and localized currency formats automatically for readability.</p>
              </div>
              <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm transition-all hover:scale-105">
                <Settings2 size={24} className="text-blue-500 mb-4" />
                <h4 className="font-bold text-gray-900 dark:text-white tracking-tight">Flex Options</h4>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">Customize everything from step interval to custom prefix/suffix icons.</p>
              </div>
            </div>
          </DocExample>
        </section>

        {/* 5. API Reference */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">5. API Reference</h2>
          </div>
          
          <DocApiTable props={[
            { name: 'value', type: 'number', default: '0', description: 'The controlled numerical value.', required: true },
            { name: 'onChange', type: '(value: number) => void', default: 'undefined', description: 'Callback triggered when value changes.', required: true },
            { name: 'min', type: 'number', default: '-Infinity', description: 'Minimum allowed value.' },
            { name: 'max', type: 'number', default: 'Infinity', description: 'Maximum allowed value.' },
            { name: 'step', type: 'number', default: '1', description: 'Interval to increment/decrement by.' },
            { name: 'precision', type: 'number', default: '0', description: 'Fixed number of decimal places.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction and shades UI.' },
            { name: 'placeholder', type: 'string', default: 'undefined', description: 'Text shown when input is empty.' },
          ]} />
        </section>

        {/* 6. Best Practices */}
        <section id="best-practices" className="scroll-mt-28 mb-16">
          <DocBestPractices
            dos={[
              "Provide a placeholder to guide the expected unit (e.g., 'Target Price').",
              "Set realistic min/max constraints to prevent data errors.",
              "Use appropriate precision for currency (2) or percentages (1).",
              "Utilize step controls for values often adjusted incrementally."
            ]}
            donts={[
              "Don't use for long IDs or credit card numbers (use standard Text Input).",
              "Don't leave the field empty if a zero-value is logically required.",
              "Don't use very small steps for large ranges (e.g., 0.01 for 0-1,000,000).",
              "Don't rely solely on Arrows; ensure manual numeric entry works."
            ]}
          />
        </section>

        {/* 7. Accessibility */}
        <section id="a11y" className="scroll-mt-28">
           <DocAccessibility
            icon={<ShieldCheck size={48} />}
            shortcuts={[
              { tag: 'UP/DOWN', title: 'Increment', body: 'Step value up or down using the vertical arrow keys.' },
              { tag: 'SHIFT', title: 'Large Step', body: 'Hold Shift while using arrows for 10x larger steps.' },
              { tag: 'HOME/END', title: 'Bounds', body: 'Jump to min or max values using Home and End keys.' },
              { tag: 'TYPE', title: 'Entry', body: 'Standard numeric input via number row or numpad.' },
            ]}
          />
        </section>
      </div>

      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
