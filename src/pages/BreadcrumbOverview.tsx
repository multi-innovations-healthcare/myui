import { useState, useEffect } from 'react';
import { Map, ShieldCheck, Home, Folder, FileText, Settings, Star, Slash } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import {
  DocHeader, DocExample, DocApiTable, DocAccessibility, DocBestPractices, DocToc,
} from '../components/Documentation';

const tocItems = [
  { id: 'basic', label: '1. Basic Usage' },
  { id: 'icons', label: '2. With Icons' },
  { id: 'custom-separator', label: '3. Custom Separator' },
  { id: 'collapse', label: '4. Collapse Long Paths' },
  { id: 'api', label: '5. API Reference' },
  { id: 'best-practices', label: "6. Do's & Don'ts" },
  { id: 'a11y', label: '7. Accessibility' },
];

export default function BreadcrumbOverview() {
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
          title="Breadcrumb"
          description="A navigation component that shows users their current location in a hierarchy. Supports custom separators, icons, and automatic collapsing for long paths."
          icon={<Map />}
          importCode="import { Breadcrumb } from 'myui';"
        />

        {/* 1. Basic */}
        <section id="basic" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Basic Usage"
            description="Pass an array of items with label and href to render a breadcrumb trail."
            code={`<Breadcrumb\n  items={[\n    { label: 'Home', href: '/' },\n    { label: 'Docs', href: '/docs' },\n    { label: 'Breadcrumb' },\n  ]}\n/>`}
          >
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Documentation', href: '/docs' },
                { label: 'Components', href: '/components' },
                { label: 'Breadcrumb' },
              ]}
            />
          </DocExample>
        </section>

        {/* 2. Icons */}
        <section id="icons" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. With Icons"
            description="Each item can include an icon prop for richer visual context."
            code={`<Breadcrumb\n  items={[\n    { label: 'Home', href: '/', icon: <Home className="w-4 h-4" /> },\n    { label: 'Projects', icon: <Folder className="w-4 h-4" /> },\n  ]}\n/>`}
          >
            <div className="space-y-6">
              <Breadcrumb
                items={[
                  { label: 'Home', href: '/', icon: <Home className="w-3.5 h-3.5" /> },
                  { label: 'Projects', href: '#', icon: <Folder className="w-3.5 h-3.5" /> },
                  { label: 'MyUI Docs', href: '#', icon: <FileText className="w-3.5 h-3.5" /> },
                  { label: 'Settings', icon: <Settings className="w-3.5 h-3.5" /> },
                ]}
              />
              <Breadcrumb
                items={[
                  { label: 'Home', href: '/', icon: <Home className="w-3.5 h-3.5" /> },
                  { label: 'Favorites', href: '#', icon: <Star className="w-3.5 h-3.5" /> },
                  { label: 'Design System' },
                ]}
              />
            </div>
          </DocExample>
        </section>

        {/* 3. Custom Separator */}
        <section id="custom-separator" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="3. Custom Separator"
            description="Provide any ReactNode as the separator prop."
            code={`<Breadcrumb separator={<Slash />} items={items} />\n<Breadcrumb separator={<span>·</span>} items={items} />`}
          >
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Slash separator</p>
                <Breadcrumb
                  separator={<Slash className="w-3 h-3 text-gray-400" />}
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'Docs', href: '#' },
                    { label: 'Breadcrumb' },
                  ]}
                />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Dot separator</p>
                <Breadcrumb
                  separator={<span className="text-gray-300 dark:text-zinc-600 font-bold">·</span>}
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'Docs', href: '#' },
                    { label: 'Breadcrumb' },
                  ]}
                />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 4. Collapse */}
        <section id="collapse" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="4. Collapse Long Paths"
            description="When maxItems is set, the breadcrumb collapses middle items. Click the ellipsis to expand."
            code={`<Breadcrumb maxItems={3} items={longItems} />`}
          >
            <Breadcrumb
              maxItems={3}
              items={[
                { label: 'Home', href: '/', icon: <Home className="w-3.5 h-3.5" /> },
                { label: 'Products', href: '#' },
                { label: 'Electronics', href: '#' },
                { label: 'Computers', href: '#' },
                { label: 'Laptops', href: '#' },
                { label: 'Gaming Laptops' },
              ]}
            />
          </DocExample>
        </section>

        {/* 5. API Reference */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">5. API Reference</h2>
          </div>
          <DocApiTable props={[
            { name: 'items', type: 'BreadcrumbItem[]', default: '—', description: 'Array of breadcrumb items.' },
            { name: 'separator', type: 'ReactNode', default: '<ChevronRight />', description: 'Custom separator element between items.' },
            { name: 'maxItems', type: 'number', default: '—', description: 'Maximum visible items. Extra items collapse into ellipsis.' },
            { name: 'className', type: 'string', default: '—', description: 'Additional classes for the wrapper nav.' },
            { name: 'onNavigate', type: '(href: string, e) => void', default: '—', description: 'Custom navigation handler (e.g., for React Router).' },
          ]} />
          <DocApiTable props={[
            { name: 'label', type: 'ReactNode', default: '—', description: 'Text or element to display.' },
            { name: 'href', type: 'string', default: '—', description: 'URL. If omitted, renders as a non-link span.' },
            { name: 'icon', type: 'ReactNode', default: '—', description: 'Optional icon before the label.' },
          ]} />
        </section>

        {/* 6. Best Practices */}
        <section id="best-practices" className="scroll-mt-28 mb-16">
          <DocBestPractices
            dos={[
              "Always show the full path from root to current page.",
              "Make all items except the last one clickable links.",
              "Keep breadcrumb labels consistent with page titles.",
              "Use maxItems for deeply nested navigation trees.",
            ]}
            donts={[
              "Don't use breadcrumbs as the primary navigation.",
              "Don't make the last item (current page) a link.",
              "Don't use breadcrumbs on flat, single-level sites.",
              "Don't truncate labels with ellipsis — use maxItems instead.",
            ]}
          />
        </section>

        {/* 7. Accessibility */}
        <section id="a11y" className="scroll-mt-28">
          <DocAccessibility
            icon={<ShieldCheck size={48} />}
            shortcuts={[
              { tag: 'NAV', title: 'Landmark', body: 'Renders as <nav aria-label="Breadcrumb"> for screen readers.' },
              { tag: 'ARIA', title: 'Current Page', body: 'The last item gets aria-current="page".' },
              { tag: 'TAB', title: 'Focus', body: 'Each link is individually focusable and keyboard-navigable.' },
              { tag: 'OL', title: 'List Structure', body: 'Rendered as <ol> for proper screen reader traversal.' },
            ]}
          />
        </section>
      </div>
      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
