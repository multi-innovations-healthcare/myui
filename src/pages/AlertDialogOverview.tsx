import { useState, useEffect } from 'react';
import { AlertTriangle, Trash2, ShieldCheck } from 'lucide-react';
import { Alert as AlertDialog } from '../components/Modal';
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
  { id: 'usage', label: '1. Basic Usage' },
  { id: 'api', label: '2. API Reference' },
  { id: 'best-practices', label: "3. Do's & Don'ts" },
  { id: 'a11y', label: '4. Accessibility' },
];

export default function AlertDialogOverview() {
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
          title="Alert Dialog"
          description="A modal dialog that interrupts the user with important content and expects a response. Typically used for destructive actions."
          icon={<AlertTriangle />}
          importCode="import { Alert as AlertDialog } from '@multi_innovations_healthcare/myui';"
        />

        {/* 1. Basic */}
        <section id="usage" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Basic Usage"
            description="Forces the user to confirm an action. Clicking outside or pressing escape will not close it if configured."
            code={`<AlertDialog>\n  <AlertDialog.Trigger asChild>...</AlertDialog.Trigger>\n  <AlertDialog.Content>\n    <AlertDialog.Header>...</AlertDialog.Header>\n    <AlertDialog.Footer>\n      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>\n      <AlertDialog.Action>Confirm</AlertDialog.Action>\n    </AlertDialog.Footer>\n  </AlertDialog.Content>\n</AlertDialog>`}
          >
            <div className="flex gap-4">
               <AlertDialog>
                  <AlertDialog.Trigger asChild>
                     <Button color="danger" variant="solid" icon={<Trash2 size={16} />}>Delete Project</Button>
                  </AlertDialog.Trigger>
                  <AlertDialog.Content>
                     <AlertDialog.Header>
                        <AlertDialog.Title className="text-rose-600">Are you absolutely sure?</AlertDialog.Title>
                        <AlertDialog.Description>
                           This action cannot be undone. This will permanently delete your project and remove all associated data from our servers.
                        </AlertDialog.Description>
                     </AlertDialog.Header>
                     <AlertDialog.Footer>
                        <AlertDialog.Cancel asChild>
                           <Button variant="outlined" shape="round">Cancel</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                           <Button color="danger" shape="round" className="shadow-lg shadow-rose-500/20 px-8">Yes, Delete</Button>
                        </AlertDialog.Action>
                     </AlertDialog.Footer>
                  </AlertDialog.Content>
               </AlertDialog>
            </div>
          </DocExample>
        </section>

        {/* API */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">2. API Reference</h2>
          </div>
          <DocApiTable props={[
            { name: 'open', type: 'boolean', default: 'false', description: 'Controlled open state.' },
            { name: 'onOpenChange', type: '(open: boolean) => void', default: '—', description: 'Event handler called when open state changes.' },
          ]} />
        </section>

        {/* 3. Best Practices */}
        <section id="best-practices" className="scroll-mt-28 mb-16">
          <DocBestPractices
            dos={[
              "Use for destructive actions like deleting data or account cancellation.",
              "Use clear, unambiguous labels for primary actions (e.g., 'Delete', not 'OK').",
              "Provide a safe secondary action to escape the dialog (e.g., 'Cancel')."
            ]}
            donts={[
              "Don't use for non-destructive actions (use a standard Modal/Dialog instead).",
              "Don't use complex forms inside an Alert Dialog.",
              "Don't include more than two primary buttons."
            ]}
          />
        </section>

        {/* 4. Accessibility */}
        <section id="a11y" className="scroll-mt-28">
           <DocAccessibility
            icon={<ShieldCheck size={48} />}
            shortcuts={[
              { tag: 'ESC', title: 'Close Dialog', body: 'Dismisses the dialog if not explicitly disabled.' },
              { tag: 'TAB', title: 'Navigation', body: 'Traps focus within the alert dialog.' },
              { tag: 'ARIA', title: 'Roles', body: 'Uses alertdialog role and aria-describedby for the description.' },
            ]}
          />
        </section>
      </div>
      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
