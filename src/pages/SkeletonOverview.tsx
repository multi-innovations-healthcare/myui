import { useState, useEffect } from 'react';
import { Layout, ShieldCheck } from 'lucide-react';
import { Skeleton } from '../components/Skeleton';
import { 
  DocHeader, 
  DocExample, 
  DocApiTable, 
  DocToc,
  DocBestPractices,
  DocAccessibility 
} from '../components/Documentation';

const tocItems = [
  { id: 'variants', label: '1. Variants' },
  { id: 'examples', label: '2. Composition' },
  { id: 'api', label: '3. API Reference' },
  { id: 'best-practices', label: "4. Do's & Don'ts" },
  { id: 'a11y', label: '5. Accessibility' },
];

export default function SkeletonOverview() {
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
          title="Skeleton"
          description="A placeholder component used to provide visual feedback while content is loading, reducing perceived wait time."
          icon={<Layout />}
          importCode="import { Skeleton } from 'myui';"
        />

        {/* 1. Variants */}
        <section id="variants" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Variants"
            description="Supports different shapes including circle, rectangle, and text line."
            code={`<Skeleton variant="circle" width={40} height={40} />\n<Skeleton variant="rect" width="100%" height={100} />\n<Skeleton variant="text" />`}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <Skeleton variant="circle" width={48} height={48} />
                <div className="space-y-2 flex-1">
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </div>
              </div>
              <Skeleton variant="rect" width="100%" height={120} className="rounded-2xl" />
            </div>
          </DocExample>
        </section>

        {/* 2. Composition */}
        <section id="examples" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Complex Composition"
            description="Build complex loading states by combining multiple skeletons."
            code={`<div className="flex gap-4">\n  <Skeleton variant="rect" width={100} height={100} />\n  <div className="flex-1 space-y-4">\n    <Skeleton variant="text" />\n    <Skeleton variant="text" />\n  </div>\n</div>`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 border border-gray-100 dark:border-zinc-800 rounded-3xl space-y-4">
                 <div className="flex items-center gap-3">
                    <Skeleton variant="circle" width={40} height={40} />
                    <div className="space-y-1">
                       <Skeleton variant="text" width={100} height={12} />
                       <Skeleton variant="text" width={60} height={8} />
                    </div>
                 </div>
                 <Skeleton variant="rect" width="100%" height={150} className="rounded-2xl" />
                 <div className="space-y-2">
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" width="70%" />
                 </div>
              </div>

               <div className="p-6 border border-gray-100 dark:border-zinc-800 rounded-3xl space-y-6">
                 {Array.from({ length: 4 }).map((_, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <Skeleton variant="rect" width={32} height={32} className="rounded-lg" />
                         <Skeleton variant="text" width={120} height={10} />
                      </div>
                      <Skeleton variant="rect" width={60} height={24} className="rounded-full" />
                   </div>
                 ))}
              </div>
            </div>
          </DocExample>
        </section>

        {/* API */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">3. API Reference</h2>
          </div>
          <DocApiTable props={[
            { name: 'variant', type: '"circle" | "rect" | "text"', default: '"rect"', description: 'The visual shape of the skeleton.' },
            { name: 'width', type: 'string | number', default: '—', description: 'Explicit width of the element.' },
            { name: 'height', type: 'string | number', default: '—', description: 'Explicit height of the element.' },
            { name: 'className', type: 'string', default: '—', description: 'Additional CSS classes for styling.' },
          ]} />
        </section>

        {/* 4. Best Practices */}
        <section id="best-practices" className="scroll-mt-28 mb-16">
          <DocBestPractices
            dos={[
              "Match the skeleton to the layout and size of the loaded content.",
              "Use animation to indicate that content is actively loading.",
              "Group skeletons together to represent complex content structures."
            ]}
            donts={[
              "Don't use skeletons for very fast loading states under 300ms.",
              "Don't make skeletons significantly darker or brighter than the real content.",
              "Don't use highly detailed skeletons; keep them abstract."
            ]}
          />
        </section>

        {/* 5. Accessibility */}
        <section id="a11y" className="scroll-mt-28">
           <DocAccessibility
            icon={<ShieldCheck size={48} />}
            shortcuts={[
              { tag: 'ARIA', title: 'Roles', body: 'Use aria-hidden="true" to prevent screen readers from announcing individual skeleton pieces.' },
              { tag: 'ARIA', title: 'Live Regions', body: 'Use aria-busy="true" on the container and aria-live="polite" to announce when loading completes.' },
            ]}
          />
        </section>
      </div>
      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
