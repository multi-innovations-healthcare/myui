import { useState, useEffect } from 'react';
import { User, Camera } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import {
  DocHeader, DocExample, DocApiTable, DocToc,
} from '../components/Documentation';

const tocItems = [
  { id: 'sizes', label: '1. Sizes' },
  { id: 'fallbacks', label: '2. Fallbacks' },
  { id: 'shapes', label: '3. Shapes' },
  { id: 'status', label: '4. Status Indicators' },
  { id: 'api', label: '5. API Reference' },
];

export default function AvatarOverview() {
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
          title="Avatar"
          description="Visual representation of a user or entity. Supports images, auto-generated initials, custom icons, and real-time status tracking via animated dots."
          icon={<User />}
          importCode="import { Avatar } from 'myui';"
        />

        {/* 1. Sizes */}
        <section id="sizes" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Sizes"
            description="Avatars scale from xs (24px) to 2xl (96px). Text and icons scale proportionally."
            code={`<Avatar size="xs" />\n<Avatar size="md" />\n<Avatar size="2xl" />`}
          >
            <div className="flex flex-wrap gap-8 items-end">
              {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map(s => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <Avatar size={s} name="Sarah Wilson" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{s}</span>
                </div>
              ))}
            </div>
          </DocExample>
        </section>

        {/* 2. Fallbacks */}
        <section id="fallbacks" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Fallbacks"
            description="If the image fails to load or is not provided, the component falls back to initials generated from the name, a custom icon, or a generic placeholder."
            code={`<Avatar src="broken.jpg" name="John Doe" />\n<Avatar icon={<User />} />`}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col gap-2">
                <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" />
                <span className="text-xs text-center text-gray-500">Image Source</span>
              </div>
              <div className="flex flex-col gap-2">
                <Avatar name="Sarah Wilson" />
                <span className="text-xs text-center text-gray-500">Initials (Full)</span>
              </div>
              <div className="flex flex-col gap-2">
                <Avatar name="Michael" />
                <span className="text-xs text-center text-gray-500">Initials (Single)</span>
              </div>
              <div className="flex flex-col gap-2">
                <Avatar icon={<Camera size={16} />} />
                <span className="text-xs text-center text-gray-500">Custom Icon</span>
              </div>
            </div>
          </DocExample>
        </section>

        {/* 3. Shapes */}
        <section id="shapes" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="3. Shapes"
            description="Avatars can be circle (default) or square (rounded-2xl)."
            code={`<Avatar shape="circle" />\n<Avatar shape="square" />`}
          >
            <div className="flex gap-8">
              <Avatar size="xl" name="Design System" shape="circle" />
              <Avatar size="xl" name="Design System" shape="square" />
            </div>
          </DocExample>
        </section>

        {/* 4. Status */}
        <section id="status" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="4. Status Indicators"
            description="Add a status dot to indicate presence. Supports online, offline, away, and busy."
            code={`<Avatar status="online" />\n<Avatar status="busy" />`}
          >
            <div className="flex flex-wrap gap-8">
              <Avatar size="lg" name="User A" status="online" />
              <Avatar size="lg" name="User B" status="busy" />
              <Avatar size="lg" name="User C" status="away" />
              <Avatar size="lg" name="User D" status="offline" />
            </div>
          </DocExample>
        </section>

        {/* API */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">5. API Reference</h2>
          </div>
          <DocApiTable props={[
            { name: 'src', type: 'string', default: '—', description: 'URL of the avatar image.' },
            { name: 'name', type: 'string', default: '—', description: 'Used for initials generation and alt text.' },
            { name: 'icon', type: 'ReactNode', default: '—', description: 'Icon to display if no image or name.' },
            { name: 'size', type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"', default: '"md"', description: 'Pre-defined size scale.' },
            { name: 'shape', type: '"circle" | "square"', default: '"circle"', description: 'Corner style.' },
            { name: 'status', type: '"online" | "offline" | "away" | "busy"', default: '—', description: 'Presence status indicator.' },
            { name: 'onClick', type: '() => void', default: '—', description: 'Click handler for interactive avatars.' },
          ]} />
        </section>
      </div>
      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
