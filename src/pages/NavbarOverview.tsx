import { useState, useEffect } from 'react';
import { Navigation, ShieldCheck, Box, BookOpen, Github, Settings, LayoutGrid } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import {
  DocHeader, DocExample, DocApiTable, DocAccessibility, DocBestPractices, DocToc,
} from '../components/Documentation';

const tocItems = [
  { id: 'basic', label: '1. Basic Navbar' },
  { id: 'dropdowns', label: '2. Dropdown Menus' },
  { id: 'sticky', label: '3. Sticky & Bordered' },
  { id: 'with-actions', label: '4. With Action Buttons' },
  { id: 'api', label: '5. API Reference' },
  { id: 'best-practices', label: "6. Do's & Don'ts" },
  { id: 'a11y', label: '7. Accessibility' },
];

const LogoMark = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
      <Box className="w-4 h-4 text-white" />
    </div>
    <span className="text-base font-extrabold text-gray-900 dark:text-white tracking-tight">MyUI</span>
  </div>
);

export default function NavbarOverview() {
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

  const baseNavItems = [
    { label: 'Docs', href: '/introduction', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Components', href: '/components', icon: <LayoutGrid className="w-4 h-4" />, badge: 'New' },
    {
      label: 'GitHub',
      href: 'https://github.com/multi-innovations-healthcare/myui',
      icon: <Github className="w-4 h-4" />,
    },
  ];

  const dropdownNavItems = [
    {
      label: 'Products',
      children: [
        { label: 'Overview', href: '#', icon: <Navigation className="w-4 h-4" /> },
        { label: 'Changelog', href: '#', badge: '3' },
        { label: 'Roadmap', href: '#' },
      ],
    },
    {
      label: 'Resources',
      children: [
        { label: 'Documentation', href: '#', icon: <BookOpen className="w-4 h-4" /> },
        { label: 'Settings', href: '#', icon: <Settings className="w-4 h-4" /> },
      ],
    },
    {
      label: 'GitHub',
      href: 'https://github.com/multi-innovations-healthcare/myui',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-20 relative px-4 sm:px-6 lg:px-8">
      <div className="lg:pr-72 xl:pr-80 animate-in fade-in zoom-in-95 duration-500">
        <DocHeader
          title="Navbar"
          description="A responsive navigation bar with sticky positioning, dropdowns, action slots, and a mobile-responsive hamburger menu."
          icon={<Navigation />}
          importCode="import { Navbar } from '@multi_innovations_healthcare/myui';"
        />

        {/* 1. Basic Navbar */}
        <section id="basic" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Basic Navbar"
            description="A simple horizontal navbar with a logo and navigation links."
            code={`<Navbar\n  logo={<LogoMark />}\n  items={[\n    { label: 'Docs', href: '/docs' },\n    { label: 'Components', href: '/components' },\n  ]}\n/>`}
          >
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-sm">
              <Navbar logo={<LogoMark />} items={baseNavItems} />
            </div>
          </DocExample>
        </section>

        {/* 2. Dropdown Menus */}
        <section id="dropdowns" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Dropdown Menus"
            description="Add a children array to any nav item to create a dropdown menu."
            code={`{ label: 'Products', children: [\n  { label: 'Overview', href: '#' },\n  { label: 'Changelog', href: '#', badge: '3' },\n]}`}
          >
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-sm">
              <Navbar logo={<LogoMark />} items={dropdownNavItems} />
            </div>
          </DocExample>
        </section>

        {/* 3. Sticky & Bordered */}
        <section id="sticky" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="3. Sticky & Bordered"
            description="Enable sticky to pin the navbar to the top of the viewport. Toggle bordered to control the bottom border."
            code={`<Navbar sticky bordered logo={<LogoMark />} items={items} />\n<Navbar bordered={false} logo={<LogoMark />} items={items} />`}
          >
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Bordered (default)</p>
                <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-sm">
                  <Navbar logo={<LogoMark />} items={baseNavItems} bordered />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Borderless</p>
                <div className="rounded-2xl overflow-hidden bg-gray-50 dark:bg-zinc-800/50">
                  <Navbar logo={<LogoMark />} items={baseNavItems} bordered={false} />
                </div>
              </div>
            </div>
          </DocExample>
        </section>

        {/* 4. Actions */}
        <section id="with-actions" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="4. With Action Buttons"
            description="Use the actions prop to add CTA elements to the right side of the navbar."
            code={`<Navbar\n  logo={<LogoMark />}\n  items={navItems}\n  actions={<Button type="primary">Get Started</Button>}\n/>`}
          >
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-sm">
              <Navbar
                logo={<LogoMark />}
                items={baseNavItems}
                actions={
                  <div className="flex items-center gap-2">
                    <Button variant="text" size="sm" className="text-sm font-semibold text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white">
                      Sign In
                    </Button>
                    <Button type="primary" size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg px-4 py-2 shadow-sm shadow-indigo-500/20">
                      Get Started
                    </Button>
                  </div>
                }
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
            { name: 'logo', type: 'ReactNode', default: '—', description: 'Logo or brand element to display on the left.' },
            { name: 'items', type: 'NavItem[]', default: '[]', description: 'Array of navigation items.' },
            { name: 'actions', type: 'ReactNode', default: '—', description: 'Right-side content (CTAs, icons, etc.).' },
            { name: 'sticky', type: 'boolean', default: 'false', description: 'Pins navbar to the top of viewport on scroll.' },
            { name: 'bordered', type: 'boolean', default: 'true', description: 'Adds a bottom border.' },
            { name: 'transparent', type: 'boolean', default: 'false', description: 'Starts transparent, gains background on scroll.' },
            { name: 'className', type: 'string', default: '—', description: 'Additional root element classes.' },
            { name: 'onNavigate', type: '(href, e) => void', default: '—', description: 'Custom navigation handler for SPA routing.' },
          ]} />
          <DocApiTable props={[
            { name: 'label', type: 'string', default: '—', description: 'Display text for the nav item.' },
            { name: 'href', type: 'string', default: '—', description: 'URL the nav item links to.' },
            { name: 'icon', type: 'ReactNode', default: '—', description: 'Icon displayed before label.' },
            { name: 'badge', type: 'string | number', default: '—', description: 'Badge displayed after label.' },
            { name: 'children', type: 'NavItem[]', default: '—', description: 'Sub-items to render as dropdown.' },
            { name: 'onClick', type: '() => void', default: '—', description: 'Custom click handler.' },
          ]} />
        </section>

        {/* 6. Best Practices */}
        <section id="best-practices" className="scroll-mt-28 mb-16">
          <DocBestPractices
            dos={[
              "Keep top-level items to 4-6 for readability.",
              "Always include a logo or brand identifier on the left.",
              "Use sticky for apps where the navbar should always be accessible.",
              "Provide a mobile menu for screens smaller than md breakpoint.",
            ]}
            donts={[
              "Don't overload the navbar with more than 7 items.",
              "Don't nest dropdowns more than 1 level deep.",
              "Don't use the navbar for deeply nested app navigation — use a Sidebar instead.",
              "Don't forget to handle focus trapping when modals open from navbar actions.",
            ]}
          />
        </section>

        {/* 7. Accessibility */}
        <section id="a11y" className="scroll-mt-28">
          <DocAccessibility
            icon={<ShieldCheck size={48} />}
            shortcuts={[
              { tag: 'NAV', title: 'Landmark', body: 'Renders as <nav role="navigation"> for screen readers.' },
              { tag: 'ARIA', title: 'Mobile Menu', body: 'Hamburger button sets aria-expanded based on menu state.' },
              { tag: 'TAB', title: 'Focus Order', body: 'All links and buttons are fully keyboard-navigable.' },
              { tag: 'ESC', title: 'Close Dropdown', body: 'Mouse-leave closes dropdowns. Keyboard ESC support recommended.' },
            ]}
          />
        </section>
      </div>
      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
