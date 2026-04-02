import { useState, useEffect } from 'react';
import { Tag } from 'lucide-react';
import { Badge } from '../components/Badge';
import {
  DocHeader, DocExample, DocApiTable, DocToc,
} from '../components/Documentation';

const tocItems = [
  { id: 'variants', label: '1. Variants' },
  { id: 'colors', label: '2. Colors' },
  { id: 'pills', label: '3. Pill Style' },
  { id: 'dots', label: '4. Dot Status' },
  { id: 'api', label: '5. API Reference' },
];

export default function BadgeOverview() {
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
          title="Badge"
          description="Small status descriptors used for highlighting categories, properties, or numeric counts. Supports multiple visual variants and a distinct dot mode for status tracking."
          icon={<Tag />}
          importCode="import { Badge } from '@multi_innovations_healthcare/myui';"
        />

        {/* 1. Variants */}
        <section id="variants" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Variants"
            description="MyUI provides four distinct visual styles: solid, soft, outline, and dot."
            code={`<Badge variant="solid">Solid</Badge>\n<Badge variant="soft">Soft</Badge>\n<Badge variant="outline">Outline</Badge>`}
          >
            <div className="flex flex-wrap gap-4 items-center">
              <Badge variant="solid">Solid Badge</Badge>
              <Badge variant="soft">Soft Badge</Badge>
              <Badge variant="outline">Outline Badge</Badge>
              <Badge variant="dot" color="success">System Online</Badge>
            </div>
          </DocExample>
        </section>

        {/* 2. Colors */}
        <section id="colors" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Colors"
            description="Use semantic colors to convey meaning (Status, Priority, Type)."
            code={`<Badge color="success">Success</Badge>\n<Badge color="danger">Danger</Badge>\n<Badge color="cyan">Brand</Badge>`}
          >
            <div className="space-y-8">
              <div>
                <p className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">Solid Colors</p>
                <div className="flex flex-wrap gap-3">
                  <Badge color="default">Default</Badge>
                  <Badge color="primary">Primary</Badge>
                  <Badge color="indigo">Indigo</Badge>
                  <Badge color="cyan">Cyan</Badge>
                  <Badge color="success">Success</Badge>
                  <Badge color="warning">Warning</Badge>
                  <Badge color="danger">Danger</Badge>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">Soft Colors</p>
                <div className="flex flex-wrap gap-3">
                  <Badge color="default" variant="soft">Default</Badge>
                  <Badge color="primary" variant="soft">Primary</Badge>
                  <Badge color="indigo" variant="soft">Indigo</Badge>
                  <Badge color="cyan" variant="soft">Cyan</Badge>
                  <Badge color="success" variant="soft">Success</Badge>
                  <Badge color="warning" variant="soft">Warning</Badge>
                  <Badge color="danger" variant="soft">Danger</Badge>
                </div>
              </div>
            </div>
          </DocExample>
        </section>

        {/* 3. Pill */}
        <section id="pills" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="3. Pill Style"
            description="Enable pill to make the badge fully rounded, often used for counters or tags."
            code={`<Badge pill color="indigo">v1.2.0</Badge>\n<Badge pill variant="soft">Beta</Badge>`}
          >
            <div className="flex flex-wrap gap-4 items-center">
              <Badge pill color="indigo">v1.0.0</Badge>
              <Badge pill color="indigo" variant="soft">Beta</Badge>
              <Badge pill variant="outline" color="indigo" className="px-4">React Framework</Badge>
              <Badge pill color="primary" variant="solid" className="px-3">New Update</Badge>
            </div>
          </DocExample>
        </section>

        {/* 4. Dots */}
        <section id="dots" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="4. Dot Status"
            description="Dot variant displays a small animated indicator next to the label, ideal for real-time status tracking."
            code={`<Badge variant="dot" color="success">Online</Badge>`}
          >
            <div className="flex flex-wrap gap-8 items-center">
              <Badge variant="dot" color="success">Active Servers</Badge>
              <Badge variant="dot" color="danger">Outage Detected</Badge>
              <Badge variant="dot" color="warning">Database Maintenance</Badge>
              <Badge variant="dot" color="default">Standby Mode</Badge>
            </div>
          </DocExample>
        </section>

        {/* API */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">5. API Reference</h2>
          </div>
          <DocApiTable props={[
            { name: 'variant', type: '"solid" | "soft" | "outline" | "dot"', default: '"solid"', description: 'Visual style of the badge.' },
            { name: 'color', type: '"default" | "primary" | "success" | "warning" | "danger" | "indigo" | "cyan"', default: '"default"', description: 'Pre-defined color palette.' },
            { name: 'pill', type: 'boolean', default: 'false', description: 'Sets fully rounded corners.' },
            { name: 'className', type: 'string', default: '—', description: 'Additional CSS classes.' },
          ]} />
        </section>
      </div>
      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
