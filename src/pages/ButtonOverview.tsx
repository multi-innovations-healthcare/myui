import React, { useState, useEffect } from 'react';
import {
  MousePointer2, Search, Trash2, ArrowRight, Zap, ShieldCheck,
} from 'lucide-react';
import { Button } from '../components/Button';
import {
  DocHeader,
  DocExample,
  DocApiTable,
  DocAccessibility,
  DocBestPractices,
  DocToc
} from '../components/Documentation';
import { useToast } from '../components/Toast';

const tocItems = [
  { id: 'variants', label: '1. Type & Variants' },
  { id: 'shapes', label: '2. Shapes' },
  { id: 'sizes', label: '3. Sizes & Block' },
  { id: 'loading', label: '4. Loading States' },
  { id: 'icons', label: '5. Icons & Placement' },
  { id: 'advanced', label: '6. Advanced Options' },
  { id: 'api', label: '7. API Reference' },
  { id: 'legacy', label: '8. Legacy Props / Migration' },
  { id: 'best-practices', label: "9. Do's & Don'ts" },
  { id: 'a11y', label: '10. Accessibility' },
];

export default function ButtonOverview() {
  const [activeId, setActiveId] = useState<string>(tocItems[0]?.id || 'variants');
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visibleEntry) setActiveId(visibleEntry.target.id);
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: [0.1, 0.5, 0.9] }
    );

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleDelayedSave = () => {
    setIsSaving(true);
    toast({ variant: 'info', title: 'Saving...' });

    setTimeout(() => {
      setIsSaving(false);
      toast({ variant: 'success', title: 'Saved successfully!' });
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto pb-20 relative px-4 sm:px-6 lg:px-8">
      <div className="lg:pr-72 xl:pr-80 animate-in fade-in zoom-in-95 duration-500">
        <DocHeader
          title="Button"
          description="A versatile button component that triggers actions and events with a premium matrix architecture."
          icon={<MousePointer2 />}
          importCode="import { Button } from '@multi_innovations_healthcare/myui';"
        />

        {/* 1. Type & Variants */}
        <section id="variants" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Type & Variants Matrix"
            description="Combine type, variant, and color for a wide range of UI expressions."
            code={`<Button variant="solid" color="primary">Solid Primary</Button>
<Button variant="outlined" color="danger">Outlined Danger</Button>
<Button variant="link" color="primary">Link Button</Button>`}
          >
            <div className="w-full overflow-x-auto custom-scrollbar">
              <div className="min-w-[500px] grid grid-cols-4 gap-4 p-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center justify-center">Variant \ Color</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Default</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-purple-500 text-center">Primary</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-red-500 text-center">Danger</div>

                {(['solid', 'outlined', 'dashed', 'filled', 'text', 'link'] as const).map((v) => (
                  <React.Fragment key={v}>
                    <div className="text-[11px] font-mono text-gray-500 flex items-center">{v}</div>
                    <div className="flex justify-center"><Button variant={v}>Button</Button></div>
                    <div className="flex justify-center"><Button variant={v} color="primary">Button</Button></div>
                    <div className="flex justify-center"><Button variant={v} color="danger">Button</Button></div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </DocExample>
        </section>

        {/* 2. Shapes */}
        <section id="shapes" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Shapes"
            description="Control roundness and iconography with specialized shapes."
            code={`<Button variant="solid" color="primary">Default</Button>
<Button variant="solid" color="primary" shape="round">Round</Button>
<Button variant="solid" color="primary" shape="circle" icon={<Search size={16} />} />`}
          >
            <div className="flex flex-wrap items-center gap-6">
              <Button variant="solid" color="primary">Default Shape</Button>
              <Button variant="solid" color="primary" shape="round">Round Shape</Button>
              <Button variant="solid" color="primary" shape="circle" icon={<Search size={16} />} />
              <Button variant="dashed" shape="circle" icon={<Search size={16} />} />
            </div>
          </DocExample>
        </section>

        {/* 3. Sizes & Block */}
        <section id="sizes" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="3. Sizes & Block"
            description="Scaling from compact actions to full-width primary calls."
            code={`<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button block>Full Width</Button>`}
          >
            <div className="w-full space-y-8">
              <div className="flex flex-wrap items-end gap-6 justify-center">
                <div className="flex flex-col items-center gap-2">
                  <Button size="sm">Small Action</Button>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">sm</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Button size="default">Medium Base</Button>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">default</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Button size="lg">Large Lead</Button>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">lg</span>
                </div>
              </div>
              <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <Button block variant="solid" color="primary" size="lg" className="h-14 rounded-2xl shadow-lg shadow-purple-500/20 font-bold uppercase tracking-widest">
                  Full Width Action
                </Button>
              </div>
            </div>
          </DocExample>
        </section>

        {/* 4. Loading States */}
        <section id="loading" className="space-y-6 scroll-mt-28 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DocExample
              title="4. Immediate Load"
              description="Visual feedback for async operations."
              code={`<Button loading variant="solid" color="primary">Processing</Button>`}
            >
              <Button loading variant="solid" color="primary" size="lg" className="rounded-xl px-10">Processing...</Button>
            </DocExample>

            <DocExample
              title="4. Delayed Load + State Control"
              description="Recommended: Control loading with React state."
              code={`const [isSaving, setIsSaving] = useState(false);

<Button loading={isSaving} variant="solid" color="primary" onClick={handleSave}>
  Save Changes
</Button>`}
            >
              <Button
                loading={isSaving}
                variant="solid"
                color="primary"
                size="lg"
                className="rounded-xl px-10"
                onClick={handleDelayedSave}
              >
                Save Changes
              </Button>
            </DocExample>
          </div>
        </section>

        {/* 5. Icons & Placement */}
        <section id="icons" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="5. Icons & Placement"
            description="Enhance cognitive recognition with iconography."
            code={`<Button icon={<Search size={16} />} variant="solid" color="primary">Search</Button>
<Button icon={<ArrowRight size={16} />} iconPlacement="end" variant="outlined">Continue</Button>`}
          >
            <div className="flex flex-wrap gap-4">
              <Button icon={<Search size={16} />} variant="solid" color="primary" shape="round" className="px-6">Search</Button>
              <Button icon={<ArrowRight size={16} />} iconPlacement="end" variant="outlined" shape="round" className="px-6 group">
                Continue <span className="group-hover:translate-x-1 transition-transform ml-1 inline-block">→</span>
              </Button>
              <Button icon={<Trash2 size={16} />} color="danger" variant="filled" shape="circle" />
            </div>
          </DocExample>
        </section>

        {/* 6. Advanced Options */}
        <section id="advanced" className="space-y-6 scroll-mt-28 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DocExample
              title="6. Link Integration"
              description="Seamlessly render as an anchor tag."
              code={`<Button href="/docs" target="_blank" variant="link" color="primary">
  External Link
</Button>`}
            >
              <Button
                href="#"
                variant="link"
                color="primary"
                className="text-indigo-600 font-bold underline-offset-4 decoration-2"
              >
                External Link ↗
              </Button>
            </DocExample>

            <DocExample
              title="6. Custom Slots"
              description="Fine-grained control over sub-component styles."
              code={`<Button 
  icon={<Zap />} 
  classNames={{ icon: 'animate-spin' }}
>
  Premium Button
</Button>`}
            >
              <Button
                variant="solid"
                color="primary"
                icon={<Zap size={16} />}
                classNames={{
                  icon: "text-emerald-400 group-hover:scale-125 transition-transform duration-500",
                  text: "font-black tracking-tighter"
                }}
                className="group h-14 px-8 rounded-2xl shadow-xl shadow-purple-500/10"
              >
                PREMIUM SLOTS
              </Button>
            </DocExample>
          </div>
        </section>

        {/* 7. API Reference */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">7. API Reference</h2>
          </div>

          <DocApiTable props={[
            { name: 'type', type: '"primary" | "default" | "dashed" | "link" | "text"', default: 'undefined', description: 'Legacy logical type' },
            { name: 'variant', type: '"solid" | "outlined" | "dashed" | "filled" | "text" | "link"', default: '"outlined"', description: 'Primary visual variant' },
            { name: 'color', type: '"default" | "primary" | "danger"', default: '"default"', description: 'Color theme' },
            { name: 'htmlType', type: '"button" | "submit" | "reset"', default: '"button"', description: 'Native HTML type' },
            { name: 'target', type: 'string', default: 'undefined', description: 'Standard target attribute (requires href)' },
            { name: 'asChild', type: 'boolean', default: 'false', description: 'Use Radix Slot pattern' },
            { name: 'autoInsertSpace', type: 'boolean', default: 'true', description: 'Auto space between Chinese characters' },
            { name: 'styles', type: '{ icon?: CSSProperties; text?: CSSProperties; spinner?: CSSProperties }', default: 'undefined', description: 'Inline styles for parts' },
            { name: 'size', type: '"sm" | "default" | "lg" | "icon"', default: '"default"', description: 'Button size' },
            { name: 'shape', type: '"default" | "circle" | "round"', default: '"default"', description: 'Button shape' },
            { name: 'loading', type: 'boolean | { delay?: number; icon?: ReactNode }', default: 'false', description: 'Loading state support' },
            { name: 'icon', type: 'ReactNode', default: 'undefined', description: 'Icon element' },
            { name: 'iconPlacement', type: '"start" | "end"', default: '"start"', description: 'Placement of the icon' },
            { name: 'block', type: 'boolean', default: 'false', description: 'Full width button' },
            { name: 'ghost', type: 'boolean', default: 'false', description: 'Transparent background' },
            { name: 'danger', type: 'boolean', default: 'false', description: 'Destructive style' },
            { name: 'href', type: 'string', default: 'undefined', description: 'Link URL' },
            { name: 'classNames', type: '{ icon?: string; text?: string; spinner?: string }', default: 'undefined', description: 'Custom class names' },
          ]} />
        </section>

        {/* 9. Best Practices */}
        <section id="best-practices" className="scroll-mt-28 mb-16">
          <DocBestPractices
            dos={[
              "Use primary for the main action on a page.",
              "Use danger color only for destructive actions.",
              "Always provide clear, concise labels.",
              "Use loading states for actions that take >1s.",
              "Prefer variant + color over legacy type prop."
            ]}
            donts={[
              "Don't use multiple primary buttons on a single screen.",
              "Don't hide buttons that are temporarily unavailable; use disabled.",
              "Don't use icons alone without proper aria-label.",
              "Don't mix button styles inconsistently within the same group."
            ]}
          />
        </section>

        {/* 10. Accessibility */}
        <section id="a11y" className="scroll-mt-28">
          <DocAccessibility
            icon={<ShieldCheck size={48} />}
            shortcuts={[
              { tag: 'SPACE', title: 'Trigger', body: 'Buttons are activated using the Space key.' },
              { tag: 'ENTER', title: 'Submit', body: 'Standard confirmation via the Enter key.' },
              { tag: 'TAB', title: 'Navigation', body: 'Sequential focus following logical page flow.' },
              { tag: 'ARIA', title: 'Labels', body: 'Support for aria-label and aria-expanded.' },
            ]}
          />
        </section>
      </div>

      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}