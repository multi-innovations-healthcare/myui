import { useState, useEffect } from 'react';
import {
  Type, Search, User, Mail, Lock,
  AlertCircle, CheckCircle2, AlertTriangle,
  Hash, ShieldCheck,
  AlignLeft
} from 'lucide-react';
import { Input, TextArea } from '../components/Input';
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
  { id: 'basic', label: '1. Basic Usage' },
  { id: 'sizes', label: '2. Sizes' },
  { id: 'variants', label: '3. Variants' },
  { id: 'prefix-suffix', label: '4. Prefix & Suffix' },
  { id: 'password', label: '5. Password Box' },
  { id: 'status', label: '6. Status' },
  { id: 'clear-icon', label: '7. With Clear Icon' },
  { id: 'char-count', label: '8. Character Count' },
  { id: 'textarea', label: '9. Textarea (Auto Resize)' },
  { id: 'api', label: '10. API Reference' },
  { id: 'best-practices', label: "11. Do's & Don'ts" },
  { id: 'a11y', label: '12. Accessibility' },
];

export default function InputOverview() {
  const [activeId, setActiveId] = useState<string>(tocItems[0]?.id || 'basic');
  const [passwordValue, setPasswordValue] = useState('mypassword123');
  const [clearValue, setClearValue] = useState('Clear me!');

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
          title="Input"
          description="A versatile text field system for high-fidelity data entry with support for icons, validation, and auto-resizing textareas."
          icon={<Type />}
          importCode="import { Input, TextArea } from '@multi_innovations_healthcare/myui';"
        />

        {/* 1. Basic Usage */}
        <section id="basic" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Basic Usage"
            description="Fundamental input types for text, email, and numbers."
            code={`<Input placeholder="Basic text input" />\n<Input type="email" placeholder="Email" />`}
          >
            <div className="w-full max-w-md space-y-4">
              <Input placeholder="Standard text identification" />
              <Input type="email" placeholder="Email address (user@domain.com)" />
              <Input type="number" placeholder="Numeric value keyboard" />
            </div>
          </DocExample>
        </section>

        {/* 2. Sizes */}
        <section id="sizes" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Sizes"
            description="Scalable dimensions to match your interface density."
            code={`<Input size="sm" />\n<Input size="default" />\n<Input size="lg" />`}
          >
            <div className="w-full max-w-md space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Small</span>
                <Input size="sm" placeholder="Compact Input (sm)" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Default</span>
                <Input placeholder="Standard Input (md)" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Large</span>
                <Input size="lg" placeholder="Extended Input (lg)" />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 3. Variants */}
        <section id="variants" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="3. Visual Variants"
            description="Toggle between outlined, filled, and ghost styles for different backgrounds."
            code={`<Input variant="outline" />\n<Input variant="filled" />\n<Input variant="ghost" />`}
          >
            <div className="w-full max-w-md grid grid-cols-1 gap-4">
              <Input variant="outline" placeholder="Outline (Interactive focus)" />
              <Input variant="filled" placeholder="Filled (High contrast)" />
              <Input variant="ghost" placeholder="Ghost (Subtle context)" />
            </div>
          </DocExample>
        </section>

        {/* 4. Prefix & Suffix */}
        <section id="prefix-suffix" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="4. Prefix & Suffix"
            description="Enhance cognitive load by providing iconographic and textual hints."
            code={`<Input prefix={<Search />} />\n<Input suffix=".com" />`}
          >
            <div className="w-full max-w-xl space-y-4">
              <Input prefix={<Search size={16} className="text-gray-400" />} placeholder="Search system entities..." />
              <Input prefix={<User size={16} className="text-gray-400" />} placeholder="Secure Username" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input prefix={<Mail size={16} className="text-gray-400" />} suffix={<span className="text-[10px] font-bold text-gray-400">@DOMAIN</span>} placeholder="Direct Mail" />
                <Input prefix={<Hash size={16} className="text-gray-400" />} placeholder="System ID 0-9" />
              </div>
              <Input
                suffix={<Button size="sm" type="primary" className="h-8 rounded-lg -mr-2 shadow-lg shadow-purple-500/20 uppercase text-[10px] font-bold">Verify</Button>}
                placeholder="Confirmation code..."
              />
            </div>
          </DocExample>
        </section>

        {/* 5. Password Box */}
        <section id="password" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="5. Password Field"
            description="Integrated security with a native toggle for visibility."
            code={`<Input type="password" ... />`}
          >
            <div className="w-full max-w-md space-y-4 p-6 bg-purple-50/30 dark:bg-purple-950/20 rounded-3xl border border-purple-100/50 dark:border-purple-900/30">
              <Input
                type="password"
                prefix={<Lock size={16} className="text-purple-500" />}
                placeholder="Secure Entry Point"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
              />
              <div className="flex items-center gap-2 px-2">
                <div className="h-1 flex-1 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[80%] rounded-full shadow-lg shadow-emerald-500/20" />
                </div>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">STRENGTH: HIGH</span>
              </div>
            </div>
          </DocExample>
        </section>

        {/* 6. Status */}
        <section id="status" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="6. Validation Status"
            description="Communicate success, warning, and error states visually."
            code={`<Input status="error" />\n<Input status="warning" />`}
          >
            <div className="w-full max-w-md space-y-4">
              <Input status="error" prefix={<AlertCircle size={16} className="text-red-500" />} placeholder="Destructive Error State" />
              <Input status="warning" prefix={<AlertTriangle size={16} className="text-amber-500" />} placeholder="System Warning Context" />
              <Input status="success" prefix={<CheckCircle2 size={16} className="text-emerald-500" />} placeholder="Transaction Validated" />
            </div>
          </DocExample>
        </section>

        {/* 7. With Clear Icon */}
        <section id="clear-icon" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="7. Interactive Clearing"
            description="Allow users to instantly reset high-entropy data fields."
            code={`<Input allowClear value={val} ... />`}
          >
            <div className="w-full max-w-sm">
              <Input
                allowClear
                value={clearValue}
                onChange={(e) => setClearValue(e.target.value)}
                placeholder="Type to activate clear trigger"
              />
            </div>
          </DocExample>
        </section>

        {/* 8. Character Count */}
        <section id="char-count" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="8. Overflow Constraints"
            description="Implicitly enforce data limits with real-time length monitoring."
            code={`<Input showCount maxLength={20} ... />`}
          >
            <div className="w-full max-w-sm">
              <Input
                showCount
                maxLength={20}
                prefix={<AlignLeft size={16} className="text-gray-400" />}
                placeholder="Limited to 20 code units"
              />
            </div>
          </DocExample>
        </section>

        {/* 9. Textarea */}
        <section id="textarea" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="9. Dynamic Textarea"
            description="Auto-resizing multiline entry that adapts to content volume."
            code={`<TextArea autoSize rows={4} ... />`}
          >
            <div className="w-full max-w-xl space-y-6">
              <TextArea
                autoSize
                placeholder="Adaptive multi-line viewport... try typing multiple paragraphs to see vertical expansion."
              />
              <div className="p-4 bg-gray-50 dark:bg-zinc-950/50 rounded-2xl border border-gray-100 dark:border-zinc-800">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Description Entry</span>
                <TextArea
                  showCount
                  maxLength={200}
                  rows={3}
                  placeholder="Summarize your technical requirements here (limit 200 units)."
                />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 10. API Reference */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">10. API Reference</h2>
          </div>

          <DocApiTable props={[
            { name: 'value', type: 'string', default: '""', description: 'The controlled input value.', required: true },
            { name: 'onChange', type: '(e: ChangeEvent) => void', default: 'undefined', description: 'Callback when value changes.', required: true },
            { name: 'type', type: 'string', default: '"text"', description: 'Logic type (password, email, number, etc.)' },
            { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Scale of the input component.' },
            { name: 'variant', type: '"outline" | "filled" | "ghost"', default: '"outline"', description: 'Surface visual treatment.' },
            { name: 'status', type: '"error" | "warning" | "success"', default: 'undefined', description: 'Validation feedback color.' },
            { name: 'allowClear', type: 'boolean', default: 'false', description: 'Enable the clear button trigger.' },
            { name: 'prefix', type: 'ReactNode', default: 'undefined', description: 'Content injected at the start.' },
            { name: 'suffix', type: 'ReactNode', default: 'undefined', description: 'Content injected at the end.' },
            { name: 'showCount', type: 'boolean', default: 'false', description: 'Displays current/max character count.' },
          ]} />
        </section>

        {/* 11. Best Practices */}
        <section id="best-practices" className="scroll-mt-28 mb-16">
          <DocBestPractices
            dos={[
              "Use field-specific icons to clarify input expectations.",
              "Use 'filled' variant on white backgrounds for better contrast.",
              "Enable 'allowClear' for search or filter inputs.",
              "Use TextArea for any input expected to exceed 40 characters."
            ]}
            donts={[
              "Don't use placeholder as a substitute for labels.",
              "Don't over-rely on statuses; provide text explanations for errors.",
              "Don't hide critical actions behind the suffix element.",
              "Don't use ghost variants for primary data entry forms."
            ]}
          />
        </section>

        {/* 12. Accessibility */}
        <section id="a11y" className="scroll-mt-28">
          <DocAccessibility
            icon={<ShieldCheck size={48} />}
            shortcuts={[
              { tag: 'TAB', title: 'Focus', body: 'Standard sequential focus handling.' },
              { tag: 'ESC', title: 'Clear', body: 'Clears input value if allowClear is active.' },
              { tag: 'ARIA', title: 'States', body: 'Full support for aria-invalid and aria-required.' },
              { tag: 'LABELS', title: 'HTML', body: 'Input IDs are automatically linked to associated labels.' },
            ]}
          />
        </section>
      </div>

      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
