import { useState, useEffect } from 'react';
import { Activity, ShieldCheck } from 'lucide-react';
import { Progress } from '../components/Progress';
import { Button } from '../components/Button';
import { 
  DocHeader, 
  DocExample, 
  DocApiTable, 
  DocToc,
  DocBestPractices,
  DocAccessibility 
} from '../components/Documentation';

const tocItems = [
  { id: 'variants', label: '1. Visual Variants' },
  { id: 'sizes', label: '2. Sizes' },
  { id: 'dynamic', label: '3. Dynamic States' },
  { id: 'api', label: '4. API Reference' },
  { id: 'best-practices', label: "5. Do's & Don'ts" },
  { id: 'a11y', label: '6. Accessibility' },
];

export default function ProgressOverview() {
  const [activeId, setActiveId] = useState(tocItems[0].id);
  const [value, setValue] = useState(33);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: [0.1, 0.5] }
    );
    tocItems.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-7xl mx-auto pb-20 relative px-4 sm:px-6 lg:px-8">
      <div className="lg:pr-72 xl:pr-80 animate-in fade-in zoom-in-95 duration-500">
        <DocHeader
          title="Progress"
          description="An indicator showing the completion status of a task, typically displayed as a progress bar."
          icon={<Activity />}
          importCode="import { Progress } from '@multi_innovations_healthcare/myui';"
        />

        {/* 1. Variants */}
        <section id="variants" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Visual Variants"
            description="Supports semantic colors to represent different states."
            code={`<Progress value={60} color="primary" />\n<Progress value={80} color="success" />\n<Progress value={40} color="danger" />`}
          >
            <div className="space-y-8 w-full">
              <div className="space-y-4">
                 <p className="text-xs font-black uppercase tracking-widest text-gray-400">Primary</p>
                 <Progress value={65} color="primary" />
              </div>
              <div className="space-y-4">
                 <p className="text-xs font-black uppercase tracking-widest text-emerald-500">Success</p>
                 <Progress value={90} color="success" />
              </div>
              <div className="space-y-4">
                 <p className="text-xs font-black uppercase tracking-widest text-amber-500">Warning</p>
                 <Progress value={45} color="warning" />
              </div>
              <div className="space-y-4">
                 <p className="text-xs font-black uppercase tracking-widest text-rose-500">Danger</p>
                 <Progress value={20} color="danger" />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 2. Sizes */}
        <section id="sizes" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Sizes"
            description="Available in small, medium, and large heights."
            code={`<Progress size="sm" value={50} />\n<Progress size="md" value={50} />\n<Progress size="lg" value={50} />`}
          >
            <div className="space-y-8 w-full">
               <Progress size="sm" value={50} showValue />
               <Progress size="md" value={50} showValue />
               <Progress size="lg" value={50} showValue />
            </div>
          </DocExample>
        </section>

        {/* 3. Dynamic */}
        <section id="dynamic" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="3. Dynamic States"
            description="Smooth transitions between values and custom label support."
            code={`<Progress value={value} showValue />`}
          >
            <div className="space-y-6 w-full">
               <Progress value={value} showValue color={value > 80 ? 'success' : value > 40 ? 'primary' : 'warning'} />
               <div className="flex gap-2">
                  <Button size="sm" onClick={() => setValue(Math.max(0, value - 10))}>Decrease</Button>
                  <Button size="sm" onClick={() => setValue(Math.min(100, value + 10))}>Increase</Button>
                  <Button size="sm" variant="text" onClick={() => setValue(Math.floor(Math.random() * 100))}>Random</Button>
               </div>
            </div>
          </DocExample>
        </section>

        {/* API */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">4. API Reference</h2>
          </div>
          <DocApiTable props={[
            { name: 'value', type: 'number', default: '0', description: 'The progress value (0-100).' },
            { name: 'color', type: '"default" | "primary" | "success" | "warning" | "danger"', default: '"primary"', description: 'Color theme of the progress bar.' },
            { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Height variant.' },
            { name: 'showValue', type: 'boolean', default: 'false', description: 'Whether to show the percentage label.' },
            { name: 'className', type: 'string', default: '—', description: 'Additional CSS classes.' },
          ]} />
        </section>

        {/* 5. Best Practices */}
        <section id="best-practices" className="scroll-mt-28 mb-16">
          <DocBestPractices
            dos={[
              "Provide a descriptive label indicating the current task.",
              "Use smooth transitions to prevent choppy progress bar jumps.",
              "Show a percentage text if exact values are important."
            ]}
            donts={[
              "Don't use a determinative progress bar if the task duration is completely unknown.",
              "Don't animate the progress bar backwards without explanation.",
              "Don't use bright warning/danger colors for normal operations."
            ]}
          />
        </section>

        {/* 6. Accessibility */}
        <section id="a11y" className="scroll-mt-28">
           <DocAccessibility
            icon={<ShieldCheck size={48} />}
            shortcuts={[
              { tag: 'ARIA', title: 'Roles', body: 'Uses role="progressbar" and manages aria-valuenow accurately.' },
              { tag: 'COLOR', title: 'Contrast', body: 'Ensure proper contrast between the progress indicator and track.' },
            ]}
          />
        </section>
      </div>
      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
