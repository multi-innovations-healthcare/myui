import { useState, useEffect } from 'react';
import { Layout, Share2, Box, ExternalLink } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import {
  DocHeader, DocExample, DocApiTable, DocToc,
} from '../components/Documentation';

const tocItems = [
  { id: 'basic', label: '1. Basic Card' },
  { id: 'hoverable', label: '2. Hoverable' },
  { id: 'with-cover', label: '3. With Cover Image' },
  { id: 'complex', label: '4. Complex Layout' },
  { id: 'api', label: '5. API Reference' },
];

export default function CardOverview() {
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
          title="Card"
          description="A flexible content container for grouping related information. Supports headers, footers, cover images, and premium hover interactions."
          icon={<Layout />}
          importCode="import { Card } from '@multi_innovations_healthcare/myui';"
        />

        {/* 1. Basic */}
        <section id="basic" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Basic Card"
            description="Use title and subtitle to provide context, and children for the main content."
            code={`<Card \n  title="Account Settings" \n  subtitle="Manage your preferences"\n>\n  Your profile details go here.\n</Card>`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card 
                title="Account Settings" 
                subtitle="Manage your preferences"
              >
                <p className="text-sm text-gray-500">Update your email address, password, and communication settings to stay secure.</p>
              </Card>
              <Card 
                title="System Health" 
                subtitle="Active Monitoring"
                extra={<Badge color="success" variant="dot">Stable</Badge>}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">CPU Usage</span>
                    <span className="font-bold text-gray-900 dark:text-zinc-50">24%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[24%]" />
                  </div>
                </div>
              </Card>
            </div>
          </DocExample>
        </section>

        {/* 2. Hoverable */}
        <section id="hoverable" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Hoverable"
            description="Enable hoverable for a premium floating effect with deep shadows, perfect for clickable items."
            code={`<Card hoverable title="Feature Item">...</Card>`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <Card 
                  key={i}
                  hoverable 
                  title={`Feature ${i}`}
                  bodyClassName="flex flex-col gap-4 text-center items-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Box size={24} />
                  </div>
                  <p className="text-sm text-gray-500">Build faster with pre-designed components tailored for React.</p>
                </Card>
              ))}
            </div>
          </DocExample>
        </section>

        {/* 3. With Cover */}
        <section id="with-cover" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="3. With Cover Image"
            description="Add a cover prop to display an image at the top of the card. The image is automatically clipped by the card's rounded corners."
            code={`<Card\n  cover={<img src="..." />}\n  title="Design Systems"\n  footer={...}\n>\n  ...\n</Card>`}
          >
            <div className="max-w-sm">
              <Card
                hoverable
                cover={
                  <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Layout className="text-white w-16 h-16 opacity-30" strokeWidth={1} />
                  </div>
                }
                title="Building Modern UIs"
                subtitle="Article • 5 min read"
                footer={
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar name="Sarah Wilson" size="xs" />
                      <span className="text-xs font-bold text-gray-700 dark:text-zinc-300">S. Wilson</span>
                    </div>
                    <Button variant="text" size="sm" className="h-8 w-8 p-1" ghost>
                      <Share2 size={16} />
                    </Button>
                  </div>
                }
              >
                <p className="text-sm text-gray-500 line-clamp-2">
                  Learn how to leverage MyUI components to create stunning, accessible web applications in record time.
                </p>
              </Card>
            </div>
          </DocExample>
        </section>

        {/* 4. Complex */}
        <section id="complex" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="4. Complex Layout"
            description="Cards can contain any React elements, including nested grids, lists, and form controls."
            code={`<Card>\n  <div className="space-y-4">...</div>\n</Card>`}
          >
            <Card className="max-w-2xl">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-32 h-32 shrink-0 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
                  <Box size={48} />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-black tracking-tight dark:text-zinc-50">Enterprise Management</h4>
                      <div className="flex gap-2 mt-1">
                        <Badge color="indigo" variant="soft" pill>Active</Badge>
                        <Badge color="primary" variant="soft" pill>v2.4.0</Badge>
                      </div>
                    </div>
                    <Button variant="outlined" size="sm" icon={<ExternalLink size={14} />}>Open</Button>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Access deep analytics, automated reporting, and multi-tenant security configurations directly from this dashboard card.
                  </p>
                  <div className="pt-4 border-t border-gray-50 dark:border-zinc-800 flex items-center gap-6">
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Users</span>
                      <span className="text-lg font-black dark:text-zinc-50">1,204</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Growth</span>
                      <span className="text-lg font-black text-emerald-500">+12%</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </DocExample>
        </section>

        {/* API */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">5. API Reference</h2>
          </div>
          <DocApiTable props={[
            { name: 'title', type: 'ReactNode', default: '—', description: 'Main heading at the top.' },
            { name: 'subtitle', type: 'ReactNode', default: '—', description: 'Small text under the title.' },
            { name: 'extra', type: 'ReactNode', default: '—', description: 'Slot for buttons or badges in the header.' },
            { name: 'cover', type: 'ReactNode', default: '—', description: 'Element displayed at the very top (usually an image/banner).' },
            { name: 'footer', type: 'ReactNode', default: '—', description: 'Slot for actions or metadata at the bottom.' },
            { name: 'hoverable', type: 'boolean', default: 'false', description: 'Enables lift animation and deep shadow on hover.' },
            { name: 'bordered', type: 'boolean', default: 'true', description: 'Shows a subtle border around the card.' },
            { name: 'bodyClassName', type: 'string', default: '—', description: 'Extra CSS for the content container.' },
          ]} />
        </section>
      </div>
      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
