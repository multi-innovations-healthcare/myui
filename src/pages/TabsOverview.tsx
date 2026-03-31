import { useState, useEffect } from 'react';
import { BarChart2, ShieldCheck, Home, FileText, Settings, Star, Bell, Inbox } from 'lucide-react';
import { Tabs } from '../components/Tabs';
import {
  DocHeader, DocExample, DocApiTable, DocAccessibility, DocBestPractices, DocToc,
} from '../components/Documentation';

const tocItems = [
  { id: 'variants', label: '1. Variants' },
  { id: 'sizes', label: '2. Sizes' },
  { id: 'icons-badges', label: '3. Icons & Badges' },
  { id: 'controlled', label: '4. Controlled / Full Width' },
  { id: 'api', label: '5. API Reference' },
  { id: 'best-practices', label: "6. Do's & Don'ts" },
  { id: 'a11y', label: '7. Accessibility' },
];

export default function TabsOverview() {
  const [activeId, setActiveId] = useState(tocItems[0].id);
  const [activeTab, setActiveTab] = useState('tab1');

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
      <div className="lg:mr-64 xl:mr-72 animate-in fade-in zoom-in-95 duration-500">
        <DocHeader
          title="Tabs"
          description="A flexible tab navigation component to organize content into separate views. Supports multiple visual variants, icons, badges, and both controlled & uncontrolled modes."
          icon={<BarChart2 />}
          importCode="import { Tabs } from 'myui';"
        />

        {/* 1. Variants */}
        <section id="variants" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Variants"
            description="Choose from four visual variants: line (default), enclosed, pills, and soft-rounded."
            code={`<Tabs variant="line" items={items} />\n<Tabs variant="enclosed" items={items} />\n<Tabs variant="pills" items={items} />\n<Tabs variant="soft-rounded" items={items} />`}
          >
            <div className="space-y-10">
              {(['line', 'enclosed', 'pills', 'soft-rounded'] as const).map(v => (
                <div key={v}>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">{v}</p>
                  <Tabs
                    variant={v}
                    defaultActiveKey="overview"
                    items={[
                      { key: 'overview', label: 'Overview', children: <div className="p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50 text-sm text-gray-600 dark:text-zinc-400">Content for Overview tab.</div> },
                      { key: 'specs', label: 'Specifications', children: <div className="p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50 text-sm text-gray-600 dark:text-zinc-400">Content for Specifications tab.</div> },
                      { key: 'reviews', label: 'Reviews', children: <div className="p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50 text-sm text-gray-600 dark:text-zinc-400">Content for Reviews tab.</div> },
                      { key: 'disabled', label: 'Disabled', disabled: true },
                    ]}
                  />
                </div>
              ))}
            </div>
          </DocExample>
        </section>

        {/* 2. Sizes */}
        <section id="sizes" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Sizes"
            description="Scale the tab bar with sm, default, and lg sizes."
            code={`<Tabs size="sm" items={items} />\n<Tabs size="default" items={items} />\n<Tabs size="lg" items={items} />`}
          >
            <div className="space-y-8">
              {(['sm', 'default', 'lg'] as const).map(s => (
                <div key={s}>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">size = {s}</p>
                  <Tabs
                    size={s}
                    variant="pills"
                    defaultActiveKey="a"
                    items={[
                      { key: 'a', label: 'Tab A', children: <div className="pt-4 text-sm text-gray-500">Content A</div> },
                      { key: 'b', label: 'Tab B', children: <div className="pt-4 text-sm text-gray-500">Content B</div> },
                      { key: 'c', label: 'Tab C', children: <div className="pt-4 text-sm text-gray-500">Content C</div> },
                    ]}
                  />
                </div>
              ))}
            </div>
          </DocExample>
        </section>

        {/* 3. Icons & Badges */}
        <section id="icons-badges" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="3. Icons & Badges"
            description="Add icon and badge props to individual tab items."
            code={`const items = [\n  { key: 'inbox', label: 'Inbox', icon: <Inbox />, badge: 12 },\n  { key: 'starred', label: 'Starred', icon: <Star /> },\n];`}
          >
            <Tabs
              variant="soft-rounded"
              defaultActiveKey="inbox"
              items={[
                { key: 'inbox', label: 'Inbox', icon: <Inbox className="w-4 h-4" />, badge: 12, children: <div className="pt-4 text-sm text-gray-500">Your inbox messages.</div> },
                { key: 'starred', label: 'Starred', icon: <Star className="w-4 h-4" />, children: <div className="pt-4 text-sm text-gray-500">Starred conversations.</div> },
                { key: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" />, badge: 3, children: <div className="pt-4 text-sm text-gray-500">Recent notifications.</div> },
                { key: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" />, children: <div className="pt-4 text-sm text-gray-500">Account settings.</div> },
              ]}
            />
          </DocExample>
        </section>

        {/* 4. Controlled / Full Width */}
        <section id="controlled" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="4. Controlled & Full Width"
            description="Use activeKey + onChange for controlled mode, and fullWidth to stretch tabs across the container."
            code={`<Tabs\n  activeKey={activeTab}\n  onChange={setActiveTab}\n  fullWidth\n  items={items}\n/>`}
          >
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {['tab1', 'tab2', 'tab3'].map(t => (
                  <button key={t} onClick={() => setActiveTab(t)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${activeTab === t ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-200 dark:border-zinc-700 text-gray-500 hover:border-indigo-300'}`}>
                    Set: {t}
                  </button>
                ))}
              </div>
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                variant="line"
                fullWidth
                items={[
                  { key: 'tab1', label: 'Dashboard', icon: <Home className="w-4 h-4" />, children: <div className="p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50 text-sm text-gray-600 dark:text-zinc-400">Dashboard content.</div> },
                  { key: 'tab2', label: 'Documents', icon: <FileText className="w-4 h-4" />, children: <div className="p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50 text-sm text-gray-600 dark:text-zinc-400">Documents content.</div> },
                  { key: 'tab3', label: 'Settings', icon: <Settings className="w-4 h-4" />, children: <div className="p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50 text-sm text-gray-600 dark:text-zinc-400">Settings content.</div> },
                ]}
              />
            </div>
          </DocExample>
        </section>

        {/* 5. API Reference */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">5. API Reference</h2>
          </div>
          <DocApiTable props={[
            { name: 'items', type: 'TabItem[]', default: '—', description: 'Array of tab items to render.' },
            { name: 'variant', type: '"line" | "enclosed" | "pills" | "soft-rounded"', default: '"line"', description: 'Visual style of the tab bar.' },
            { name: 'size', type: '"sm" | "default" | "lg"', default: '"default"', description: 'Size scale of tab buttons.' },
            { name: 'defaultActiveKey', type: 'string', default: 'first item', description: 'Initially active tab (uncontrolled).' },
            { name: 'activeKey', type: 'string', default: '—', description: 'Active tab key (controlled mode).' },
            { name: 'onChange', type: '(key: string) => void', default: '—', description: 'Callback when active tab changes.' },
            { name: 'centered', type: 'boolean', default: 'false', description: 'Centers the tab bar horizontally.' },
            { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretches tab buttons to fill container.' },
          ]} />
          <DocApiTable props={[
            { name: 'key', type: 'string', default: '—', description: 'Unique identifier for the tab.' },
            { name: 'label', type: 'ReactNode', default: '—', description: 'Content of the tab button.' },
            { name: 'children', type: 'ReactNode', default: '—', description: 'Panel content shown when active.' },
            { name: 'icon', type: 'ReactNode', default: '—', description: 'Icon displayed before label.' },
            { name: 'badge', type: 'string | number', default: '—', description: 'Badge count or label.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the tab.' },
          ]} />
        </section>

        {/* 6. Best Practices */}
        <section id="best-practices" className="scroll-mt-28 mb-16">
          <DocBestPractices
            dos={[
              "Use tabs for peer-level content that is mutually exclusive.",
              "Keep tab labels concise — ideally 1-2 words.",
              "Use icons to add visual clarity for complex category names.",
              "Highlight active state clearly to orient the user.",
            ]}
            donts={[
              "Don't use tabs for content that should be compared simultaneously.",
              "Don't put more than 6-7 tabs in a single tab bar.",
              "Don't nest tabs in tabs — it creates a confusing hierarchy.",
              "Don't hide critical actions behind rarely-clicked tabs.",
            ]}
          />
        </section>

        {/* 7. Accessibility */}
        <section id="a11y" className="scroll-mt-28">
          <DocAccessibility
            icon={<ShieldCheck size={48} />}
            shortcuts={[
              { tag: 'ROLE', title: 'ARIA Roles', body: 'nav + role="tablist", role="tab", role="tabpanel" are applied automatically.' },
              { tag: 'TAB', title: 'Focus', body: 'Tab key moves focus into the active tab. Arrow keys move between tabs.' },
              { tag: 'ARIA', title: 'State', body: 'aria-selected and aria-disabled are set on each tab.' },
              { tag: 'PAGE', title: 'Current', body: 'aria-current="page" is set on the active panel.' },
            ]}
          />
        </section>
      </div>
      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
