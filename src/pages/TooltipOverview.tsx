import { useState, useEffect } from 'react';
import { MessageSquare, ShieldCheck } from 'lucide-react';
import { Tooltip } from '../components/Tooltip';
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
  { id: 'usage', label: '1. Basic Usage' },
  { id: 'placement', label: '2. Placements' },
  { id: 'delays', label: '3. Custom Delays' },
  { id: 'api', label: '4. API Reference' },
  { id: 'best-practices', label: "5. Do's & Don'ts" },
  { id: 'a11y', label: '6. Accessibility' },
];

export default function TooltipOverview() {
  const [activeId, setActiveId] = useState(tocItems[0].id);

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
          title="Tooltip"
          description="A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
          icon={<MessageSquare />}
          importCode="import { Tooltip } from 'myui';"
        />

        {/* 1. Usage */}
        <section id="usage" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Basic Usage"
            description="The Tooltip component provides a simplified API for common use cases."
            code={`<Tooltip content="Add to library">\n  <Button shape="circle" icon={<Plus />} />\n</Tooltip>`}
          >
            <div className="flex gap-4 items-center justify-center p-12">
               <Tooltip content="Edit project parameters">
                  <Button variant="outlined" shape="round">Hover for Info</Button>
               </Tooltip>
               <Tooltip content="This action is irreversible" className="bg-rose-500 text-white border-rose-600">
                  <Button color="danger" variant="filled" shape="round">Danger Action</Button>
               </Tooltip>
            </div>
          </DocExample>
        </section>

        {/* 2. Placements */}
        <section id="placement" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Placements"
            description="Tooltip supports 4 primary sides: top, right, bottom, and left."
            code={`<Tooltip side="right" content="Right side">...</Tooltip>`}
          >
            <div className="flex flex-wrap gap-4 items-center justify-center p-12">
               <Tooltip side="left" content="Left Tooltip">
                  <Button variant="outlined">Left</Button>
               </Tooltip>
               <Tooltip side="top" content="Top Tooltip">
                  <Button variant="outlined">Top</Button>
               </Tooltip>
               <Tooltip side="bottom" content="Bottom Tooltip">
                  <Button variant="outlined">Bottom</Button>
               </Tooltip>
               <Tooltip side="right" content="Right Tooltip">
                  <Button variant="outlined">Right</Button>
               </Tooltip>
            </div>
          </DocExample>
        </section>

        {/* 3. Delays */}
        <section id="delays" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="3. Delays"
            description="Control how long the mouse must hover before the tooltip appears."
            code={`<Tooltip delayDuration={0} content="Instant">...</Tooltip>`}
          >
            <div className="flex gap-4 items-center justify-center p-12">
               <Tooltip delayDuration={0} content="Appears instantly">
                  <Button variant="dashed">Instant (0ms)</Button>
               </Tooltip>
               <Tooltip delayDuration={1000} content="Heavy processing info">
                  <Button variant="dashed">Slow (1s)</Button>
               </Tooltip>
            </div>
          </DocExample>
        </section>

        {/* API */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">4. API Reference</h2>
          </div>
          <DocApiTable props={[
            { name: 'content', type: 'ReactNode', default: '—', description: 'The text or element to display inside the tooltip.', required: true },
            { name: 'side', type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: 'The preferred side of the trigger to render.' },
            { name: 'align', type: '"start" | "center" | "end"', default: '"center"', description: 'The preferred alignment against the trigger.' },
            { name: 'delayDuration', type: 'number', default: '200', description: 'Duration in ms to wait before opening.' },
            { name: 'className', type: 'string', default: '—', description: 'Additional CSS classes for the content box.' },
          ]} />
        </section>

        {/* 5. Best Practices */}
        <section id="best-practices" className="scroll-mt-28 mb-16">
          <DocBestPractices
            dos={[
              "Keep tooltip text brief and directly related to the trigger element.",
              "Use tooltips to provide secondary context, not critical interactions.",
              "Add a slight delay (e.g., 200ms) to prevent flashing during fast mouse movements."
            ]}
            donts={[
              "Don't put interactive elements (links, buttons) inside tooltips.",
              "Don't use tooltips as the ONLY way to convey critical task information.",
              "Don't rely heavily on tooltips for touch devices, as hover is unavailable."
            ]}
          />
        </section>

        {/* 6. Accessibility */}
        <section id="a11y" className="scroll-mt-28">
           <DocAccessibility
            icon={<ShieldCheck size={48} />}
            shortcuts={[
              { tag: 'HOVER', title: 'Mouse', body: 'Displays tooltip on mouse enter.' },
              { tag: 'FOCUS', title: 'Keyboard', body: 'Displays tooltip when the trigger element receives keyboard focus.' },
              { tag: 'ESC', title: 'Dismiss', body: 'Pressing Escape dismisses an open tooltip.' },
            ]}
          />
        </section>
      </div>
      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
