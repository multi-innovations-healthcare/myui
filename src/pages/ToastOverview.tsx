import { useState, useEffect } from 'react';
import { 
  Bell, CheckCircle2, AlertCircle, Info, 
  AlertTriangle, Play, ShieldCheck
} from 'lucide-react';
import { Button } from '../components/Button';
import { useToast } from '../components/Toast';
import { 
  DocHeader, 
  DocExample, 
  DocApiTable, 
  DocAccessibility, 
  DocBestPractices, 
  DocToc 
} from '../components/Documentation';

const tocItems = [
  { id: 'variants', label: '1. Toast Variants' },
  { id: 'usage', label: '2. Basic Usage' },
  { id: 'api', label: '3. API Reference' },
  { id: 'best-practices', label: "4. Do's & Don'ts" },
  { id: 'a11y', label: '5. Accessibility' },
];

export default function ToastOverview() {
  const [activeId, setActiveId] = useState<string>(tocItems[0]?.id || 'variants');
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: [0.1, 0.5, 0.9] }
    );

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const triggerToast = (variant: 'default' | 'success' | 'error' | 'warning' | 'info') => {
    const titles = {
      default: 'System Update',
      success: 'Deployment Successful',
      error: 'Connection Failure',
      warning: 'Disk Space Low',
      info: 'New Messages',
    };
    
    const descriptions = {
      default: 'A new version of the dashboard is available.',
      success: 'Your changes have been successfully pushed to production.',
      error: 'We could not establish a connection to the server. Please try again.',
      warning: 'Your workspace is currently at 92% capacity.',
      info: 'You have been mentioned in 3 new conversation threads.',
    };

    toast({
      title: titles[variant],
      description: descriptions[variant],
      variant,
    });
  };

  return (
    <div className="max-w-7xl mx-auto pb-20 relative px-4 sm:px-6 lg:px-8">
      <div className="lg:pr-72 xl:pr-80 animate-in fade-in zoom-in-95 duration-500">
        <DocHeader
          title="Toast"
          description="A responsive notification system that provides non-intrusive feedback to the user on background processes."
          icon={<Bell />}
          importCode="import { useToast, ToastProvider } from '@multi_innovations_healthcare/myui';"
        />

        {/* 1. Toast Variants */}
        <section id="variants" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Toast Variants"
            description="Use semantic variants to communicate the outcome of user actions."
            code={`toast({
  title: "Success",
  description: "Task completed",
  variant: "success"
})`}
          >
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button 
                variant="outlined" 
                className="justify-start gap-4 h-16 rounded-2xl border-2 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all font-bold tracking-tight" 
                onClick={() => triggerToast('default')}
              >
                <div className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-lg"><Info size={16} className="text-gray-500" /></div>
                Default
              </Button>
              <Button 
                variant="outlined" 
                className="justify-start gap-4 h-16 rounded-2xl border-2 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all font-bold tracking-tight" 
                onClick={() => triggerToast('success')}
              >
                <div className="p-2 bg-emerald-100 dark:bg-emerald-950/40 rounded-lg"><CheckCircle2 size={16} className="text-emerald-500" /></div>
                Success
              </Button>
              <Button 
                variant="outlined" 
                className="justify-start gap-4 h-16 rounded-2xl border-2 hover:bg-red-50 dark:hover:bg-red-950/20 hover:border-red-200 dark:hover:border-red-800/50 transition-all font-bold tracking-tight" 
                onClick={() => triggerToast('error')}
              >
                <div className="p-2 bg-red-100 dark:bg-red-950/40 rounded-lg"><AlertCircle size={16} className="text-red-500" /></div>
                Error
              </Button>
              <Button 
                variant="outlined" 
                className="justify-start gap-4 h-16 rounded-2xl border-2 hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:border-amber-200 dark:hover:border-amber-800/50 transition-all font-bold tracking-tight" 
                onClick={() => triggerToast('warning')}
              >
                <div className="p-2 bg-amber-100 dark:bg-amber-950/40 rounded-lg"><AlertTriangle size={16} className="text-amber-500" /></div>
                Warning
              </Button>
              <Button 
                variant="outlined" 
                className="justify-start gap-4 h-16 rounded-2xl border-2 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:border-blue-200 dark:hover:border-blue-800/50 transition-all font-bold tracking-tight" 
                onClick={() => triggerToast('info')}
              >
                <div className="p-2 bg-blue-100 dark:bg-blue-950/40 rounded-lg"><Info size={16} className="text-blue-500" /></div>
                Information
              </Button>
            </div>
          </DocExample>
        </section>

        {/* 2. Basic Usage */}
        <section id="usage" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Provider Setup"
            description="Ensure the ToastProvider is wrapped at the root of your application."
            code={`<ToastProvider>
  <App />
</ToastProvider>`}
          >
            <div className="w-full bg-purple-600 dark:bg-purple-900/40 p-8 rounded-[2rem] text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                <Play size={160} />
              </div>
              <div className="relative z-10 space-y-6">
                <h3 className="text-2xl font-bold tracking-tight">Lifecycle Management</h3>
                <p className="max-w-md text-purple-100 dark:text-purple-300 font-medium leading-relaxed">
                  The notification system uses a centralized queue. Once dispatched, toasts are automatically cleared after their duration expires.
                </p>
                <div className="bg-black/20 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                  <pre className="text-sm font-mono text-purple-50 overflow-x-auto whitespace-pre-wrap leading-relaxed">
{`const { toast } = useToast();

toast({
  title: 'Alert Target',
  description: 'Update successful.',
  duration: 5000
});`}
                  </pre>
                </div>
              </div>
            </div>
          </DocExample>
        </section>

        {/* 3. API Reference */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">3. API Reference</h2>
          </div>
          
          <DocApiTable props={[
            { name: 'title', type: 'string', default: 'undefined', description: 'Main heading text for the notification.', required: true },
            { name: 'description', type: 'string', default: 'undefined', description: 'Supporting message text.' },
            { name: 'variant', type: '"default" | "success" | "error" | "warning" | "info"', default: '"default"', description: 'Semantic color and icon theme.' },
            { name: 'duration', type: 'number', default: '5000', description: 'Time in milliseconds before auto-dismissal.' },
            { name: 'action', type: 'ReactNode', default: 'undefined', description: 'Optional interactive element (e.g., Undo button).' },
          ]} />
        </section>

        {/* 4. Best Practices */}
        <section id="best-practices" className="scroll-mt-28 mb-16">
          <DocBestPractices
            dos={[
              "Keep titles short and action-oriented (e.g., 'File Saved').",
              "Use success variants only for positive outcomes.",
              "Provide actionable descriptions for error states.",
              "Ensure duration is long enough for users to read (>3s)."
            ]}
            donts={[
              "Don't use toasts for critical information that requires persistence.",
              "Don't trigger multiple toasts simultaneously if possible.",
              "Don't include complex HTML or forms inside a toast.",
              "Don't use for mundane background noise like 'Page Loaded'."
            ]}
          />
        </section>

        {/* 5. Accessibility */}
        <section id="a11y" className="scroll-mt-28">
           <DocAccessibility
            icon={<ShieldCheck size={48} />}
            shortcuts={[
              { tag: 'ARIA', title: 'Live Region', body: 'Toasts use aria-live="polite" by default for screen readers.' },
              { tag: 'FOCUS', title: 'Trap', body: 'Interactive toasts support focus trapping for keyboard users.' },
              { tag: 'ESC', title: 'Dismiss', body: 'Press Escape to instantly clear all active notifications.' },
              { tag: 'COLOR', title: 'Contrast', body: 'Variants are tested against WCAG AAA contrast standards.' },
            ]}
          />
        </section>
      </div>

      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
