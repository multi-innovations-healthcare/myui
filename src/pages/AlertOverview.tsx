import { useState, useEffect } from 'react';
import { AlertCircle, ShieldCheck } from 'lucide-react';
import { Alert } from '../components/Alert';
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
  { id: 'features', label: '2. Features' },
  { id: 'api', label: '3. API Reference' },
  { id: 'best-practices', label: "4. Do's & Don'ts" },
  { id: 'a11y', label: '5. Accessibility' },
];

export default function AlertOverview() {
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
          title="Alert"
          description="Displays a prominent message to provide contextual feedback or inform the user about important information."
          icon={<AlertCircle />}
          importCode="import { Alert } from '@multi_innovations_healthcare/myui';"
        />

        {/* 1. Variants */}
        <section id="variants" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Semantic Variants"
            description="Categorize messages by severity using standard variants."
            code={`<Alert variant="default">Message</Alert>\n<Alert variant="success">Success</Alert>\n<Alert variant="warning">Warning</Alert>\n<Alert variant="danger">Error</Alert>\n<Alert variant="info">Info</Alert>`}
          >
            <div className="space-y-4 w-full">
               <Alert>A standard informational message for the user.</Alert>
               <Alert variant="success" title="Success">Your changes have been saved successfully.</Alert>
               <Alert variant="warning" title="Warning">Your subscription will expire in 3 days.</Alert>
               <Alert variant="danger" title="System Error">Failed to connect to the database. Please try again later.</Alert>
               <Alert variant="info" title="Update Available">A new version of MyUI is now available. Check the docs.</Alert>
            </div>
          </DocExample>
        </section>

        {/* 2. Features */}
        <section id="features" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Interactive & Custom Icons"
            description="Supports custom icons and dismissible actions."
            code={`<Alert onClose={() => {}}>Dismissible Alert</Alert>`}
          >
            <div className="space-y-4 w-full">
               <Alert onClose={() => alert('Closed')}>
                  This alert can be dismissed by the user.
               </Alert>
               <Alert 
                  variant="info" 
                  title="Custom Icon"
                  icon={<AlertCircle className="w-5 h-5 animate-bounce" />}
                >
                  You can pass any React element as an icon.
               </Alert>
            </div>
          </DocExample>
        </section>

        {/* API */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">3. API Reference</h2>
          </div>
          <DocApiTable props={[
            { name: 'variant', type: '"default" | "success" | "warning" | "danger" | "info"', default: '"default"', description: 'The visual style and behavior.' },
            { name: 'title', type: 'string', default: '—', description: 'Bold title text above the content.' },
            { name: 'icon', type: 'ReactNode', default: '—', description: 'Override the default semantic icon.' },
            { name: 'onClose', type: '() => void', default: '—', description: 'Called when the close button is clicked.' },
            { name: 'className', type: 'string', default: '—', description: 'Additional CSS classes.' },
          ]} />
        </section>

        {/* 4. Best Practices */}
        <section id="best-practices" className="scroll-mt-28 mb-16">
          <DocBestPractices
            dos={[
              "Use strictly for system-level feedback or important notices.",
              "Match the visual variant to the severity of the message.",
              "Keep the message concise and actionable."
            ]}
            donts={[
              "Don't use as a replacement for Toast notifications.",
              "Don't stack multiple alerts in the same view if possible.",
              "Don't use generic titles like 'Notice'."
            ]}
          />
        </section>

        {/* 5. Accessibility */}
        <section id="a11y" className="scroll-mt-28">
           <DocAccessibility
            icon={<ShieldCheck size={48} />}
            shortcuts={[
              { tag: 'ARIA', title: 'Roles', body: 'Automatically uses appropriate ARIA roles based on severity to announce correctly in screen readers.' },
              { tag: 'FOCUS', title: 'Focus Management', body: 'Close buttons are focusable and accessible via keyboard.' },
            ]}
          />
        </section>
      </div>
      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
