import { useState, useEffect } from 'react';
import { Menu, Layout, ShieldCheck } from 'lucide-react';
import { Drawer } from '../components/Modal';
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
  { id: 'usage', label: '1. Basic Drawer' },
  { id: 'placement', label: '2. Placements' },
  { id: 'api', label: '3. API Reference' },
  { id: 'best-practices', label: "4. Do's & Don'ts" },
  { id: 'a11y', label: '5. Accessibility' },
];

export default function DrawerOverview() {
  const [activeId, setActiveId] = useState(tocItems[0].id);
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState<'left' | 'right' | 'top' | 'bottom'>('right');

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
          title="Drawer"
          description="A panel that slides in from the edge of the screen, useful for menus, filters, or additional context."
          icon={<Menu />}
          importCode="import { Drawer } from '@multi_innovations_healthcare/myui';"
        />

        {/* 1. Basic */}
        <section id="usage" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Basic Drawer"
            description="Drawers use the same composition pattern as Modals."
            code={`<Drawer open={open} onOpenChange={setOpen}>\n  <Drawer.Trigger asChild>...</Drawer.Trigger>\n  <Drawer.Content>\n    <Drawer.Header>...</Drawer.Header>\n    <Drawer.Body>...</Drawer.Body>\n  </Drawer.Content>\n</Drawer>`}
          >
            <div className="flex gap-4">
               <Drawer>
                  <Drawer.Trigger asChild>
                     <Button type="primary">Open Standard Drawer</Button>
                  </Drawer.Trigger>
                  <Drawer.Content>
                     <Drawer.Header>
                        <Drawer.Title>System Settings</Drawer.Title>
                        <Drawer.Description>Configure your global preferences here.</Drawer.Description>
                     </Drawer.Header>
                     <Drawer.Body>
                        <div className="space-y-4">
                           <p className="text-sm font-medium text-gray-500">Drawer content goes here. It provides a full-height experience on the side of your screen.</p>
                           <div className="h-32 bg-gray-50 dark:bg-zinc-800 rounded-2xl border-2 border-dashed border-gray-200 dark:border-zinc-700" />
                        </div>
                     </Drawer.Body>
                     <Drawer.Footer>
                        <Button block>Close</Button>
                     </Drawer.Footer>
                  </Drawer.Content>
               </Drawer>
            </div>
          </DocExample>
        </section>

        {/* 2. Placements */}
        <section id="placement" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Placements"
            description="Supports sliding from any of the four edges of the viewport."
            code={`<Drawer.Content placement="left">...</Drawer.Content>`}
          >
            <div className="flex flex-wrap gap-2">
               {(['left', 'right', 'top', 'bottom'] as const).map(p => (
                 <Button 
                    key={p} 
                    variant="outlined" 
                    className="capitalize"
                    onClick={() => {
                       setPlacement(p);
                       setIsOpen(true);
                    }}
                  >
                    {p}
                 </Button>
               ))}
            </div>
          </DocExample>
        </section>

        {/* API */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">3. API Reference</h2>
          </div>
          <DocApiTable props={[
            { name: 'placement', type: '"left" | "right" | "top" | "bottom"', default: '"right"', description: 'The edge of the screen the drawer slides from.' },
            { name: 'size', type: '"sm" | "md" | "lg" | "xl" | "fullscreen"', default: '"md"', description: 'The width (or height if top/bottom) of the drawer.' },
          ]} />
        </section>

        {/* 4. Best Practices */}
        <section id="best-practices" className="scroll-mt-28 mb-16">
          <DocBestPractices
            dos={[
              "Use Drawers for complex forms, settings, or filtering options.",
              "Ensure sufficient contrast between the overlay and the background.",
              "Provide a clear close button."
            ]}
            donts={[
              "Don't use a Drawer for simple confirmations (use Alert Dialog).",
              "Don't stack multiple Drawers.",
              "Don't make the user lose context of what they were doing."
            ]}
          />
        </section>

        {/* 5. Accessibility */}
        <section id="a11y" className="scroll-mt-28">
           <DocAccessibility
            icon={<ShieldCheck size={48} />}
            shortcuts={[
              { tag: 'ESC', title: 'Close Drawer', body: 'Press Escape to dismiss the drawer if allowed.' },
              { tag: 'TAB', title: 'Navigation', body: 'Traps focus within the drawer when open.' },
              { tag: 'ARIA', title: 'Roles', body: 'Uses dialog role and manages aria-expanded state.' },
            ]}
          />
        </section>
      </div>
      <DocToc items={tocItems} activeId={activeId} />

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
         <Drawer.Content placement={placement}>
            <Drawer.Header>
               <Drawer.Title className="capitalize">{placement} Panel</Drawer.Title>
               <Drawer.Description>Sliding in from the {placement} edge.</Drawer.Description>
            </Drawer.Header>
            <Drawer.Body>
               <div className="p-8 bg-purple-50 dark:bg-purple-500/10 rounded-3xl border border-purple-100 dark:border-purple-500/20 text-center">
                  <Layout className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <p className="text-sm font-bold text-purple-700 dark:text-purple-300">Custom Placement Demo</p>
               </div>
            </Drawer.Body>
            <Drawer.Footer>
               <Button block onClick={() => setIsOpen(false)}>Close</Button>
            </Drawer.Footer>
         </Drawer.Content>
      </Drawer>
    </div>
  );
}
