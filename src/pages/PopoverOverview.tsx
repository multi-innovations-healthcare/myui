import { useState, useEffect } from 'react';
import { Layers, ShieldCheck } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from '../components/Popover';
import { Button } from '../components/Button';
import {
  DocHeader,
  DocExample,
  DocApiTable,
  DocAccessibility,
  DocBestPractices,
  DocToc,
} from '../components/Documentation';

const tocItems = [
  { id: 'basic', label: '1. Basic Usage' },
  { id: 'sides', label: '2. Positioning' },
  { id: 'arrow', label: '3. Arrow' },
  { id: 'controlled', label: '4. Controlled' },
  { id: 'api', label: '5. API Reference' },
  { id: 'best-practices', label: "6. Do's & Don'ts" },
  { id: 'a11y', label: '7. Accessibility' },
];

export default function PopoverOverview() {
  const [activeId, setActiveId] = useState(tocItems[0]?.id || 'basic');
  const [controlledOpen, setControlledOpen] = useState(false);

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

  return (
    <div className="max-w-7xl mx-auto pb-20 relative px-4 sm:px-6 lg:px-8">
      <div className="lg:pr-72 xl:pr-80 animate-in fade-in zoom-in-95 duration-500">
        <DocHeader
          title="Popover"
          description="A floating content layer anchored to a trigger element. The foundation for tooltips, dropdowns, and all floating UI."
          icon={<Layers />}
          importCode="import { Popover, PopoverTrigger, PopoverContent } from 'myui';"
        />

        {/* 1. Basic */}
        <section id="basic" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Basic Usage"
            description="Click the trigger to toggle floating content. Closes on click-outside or Escape."
            code={`<Popover>
  <PopoverTrigger asChild>
    <Button>Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Hello from the popover!</p>
  </PopoverContent>
</Popover>`}
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button type="primary">Open Popover</Button>
              </PopoverTrigger>
              <PopoverContent className="space-y-3">
                <h4 className="text-sm font-bold text-gray-900 dark:text-zinc-50">Quick Actions</h4>
                <p className="text-sm text-gray-500 dark:text-zinc-400">This content floats above the page using a portal.</p>
                <PopoverClose asChild>
                  <Button size="sm" block>Got it</Button>
                </PopoverClose>
              </PopoverContent>
            </Popover>
          </DocExample>
        </section>

        {/* 2. Positioning */}
        <section id="sides" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Positioning"
            description="The popover supports top, bottom, left, and right sides with automatic collision flipping."
            code={`<PopoverContent side="top" />
<PopoverContent side="right" />
<PopoverContent side="bottom" />
<PopoverContent side="left" />`}
          >
            <div className="flex flex-wrap gap-4 items-center justify-center">
              {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
                <Popover key={side}>
                  <PopoverTrigger asChild>
                    <Button>{side.charAt(0).toUpperCase() + side.slice(1)}</Button>
                  </PopoverTrigger>
                  <PopoverContent side={side} className="w-48">
                    <p className="text-sm text-gray-600 dark:text-zinc-400">
                      Positioned on <span className="font-bold text-gray-900 dark:text-zinc-50">{side}</span> with auto flip.
                    </p>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          </DocExample>
        </section>

        {/* 3. Arrow */}
        <section id="arrow" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="3. Arrow"
            description="Enable a directional arrow that points back to the trigger element."
            code={`<PopoverContent showArrow>
  Arrow pointing to trigger
</PopoverContent>`}
          >
            <div className="flex gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button type="primary">With Arrow</Button>
                </PopoverTrigger>
                <PopoverContent showArrow>
                  <p className="text-sm text-gray-600 dark:text-zinc-400">The arrow points to the trigger element.</p>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button>No Arrow</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <p className="text-sm text-gray-600 dark:text-zinc-400">No arrow on this popover.</p>
                </PopoverContent>
              </Popover>
            </div>
          </DocExample>
        </section>

        {/* 4. Controlled */}
        <section id="controlled" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="4. Controlled"
            description="Fully controlled open/close state via open + onOpenChange."
            code={`const [open, setOpen] = useState(false);
<Popover open={open} onOpenChange={setOpen}>
  ...
</Popover>`}
          >
            <div className="flex items-center gap-4">
              <Popover open={controlledOpen} onOpenChange={setControlledOpen}>
                <PopoverTrigger asChild>
                  <Button type="primary">Controlled</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <p className="text-sm text-gray-600 dark:text-zinc-400 mb-3">State: <span className="font-bold text-indigo-600 dark:text-indigo-400">{controlledOpen ? 'Open' : 'Closed'}</span></p>
                  <Button size="sm" onClick={() => setControlledOpen(false)} block>Close</Button>
                </PopoverContent>
              </Popover>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {controlledOpen ? '● Open' : '○ Closed'}
              </span>
            </div>
          </DocExample>
        </section>

        {/* 5. API */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">5. API Reference</h2>
          </div>
          <DocApiTable props={[
            { name: 'open', type: 'boolean', default: 'undefined', description: 'Controlled open state.' },
            { name: 'onOpenChange', type: '(open: boolean) => void', default: 'undefined', description: 'Callback when open state changes.' },
            { name: 'side', type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: 'Preferred side for positioning.' },
            { name: 'align', type: '"start" | "center" | "end"', default: '"center"', description: 'Alignment relative to the trigger.' },
            { name: 'sideOffset', type: 'number', default: '8', description: 'Distance from the trigger in pixels.' },
            { name: 'showArrow', type: 'boolean', default: 'false', description: 'Show directional arrow pointing to the trigger.' },
            { name: 'collisionPadding', type: 'number', default: '8', description: 'Padding from viewport edges for collision detection.' },
          ]} />
        </section>

        {/* 6. Best Practices */}
        <section id="best-practices" className="scroll-mt-28 mb-16">
          <DocBestPractices
            dos={[
              'Use Popover for contextual content related to a trigger.',
              'Keep popover content concise and scannable.',
              'Provide a clear close affordance for complex content.',
              'Use collision-aware positioning to avoid off-screen content.',
            ]}
            donts={[
              "Don't nest Popovers more than one level deep.",
              "Don't put lengthy forms in Popovers — use Modal instead.",
              "Don't remove the click-outside-to-close behavior.",
              "Don't use Popover for system-level notifications — use Toast.",
            ]}
          />
        </section>

        {/* 7. Accessibility */}
        <section id="a11y" className="scroll-mt-28">
          <DocAccessibility
            icon={<ShieldCheck size={48} />}
            shortcuts={[
              { tag: 'ESC', title: 'Dismiss', body: 'Closes the popover and returns focus to the trigger.' },
              { tag: 'TAB', title: 'Focus Trap', body: 'Tabs through interactive elements inside the popover.' },
              { tag: 'ARIA', title: 'Dialog Pattern', body: 'Uses aria-haspopup and aria-expanded for screen readers.' },
              { tag: 'FOCUS', title: 'Auto Focus', body: 'Focus moves into the popover on open and returns on close.' },
            ]}
          />
        </section>
      </div>

      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
