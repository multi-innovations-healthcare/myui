import { useState, useRef, useEffect } from 'react';
import { 
  Maximize2, ShieldCheck, Info, Layout, AlertTriangle,
  Menu, ScrollText,
  Loader2, ChevronRight, Accessibility, CheckCircle2
} from 'lucide-react';
import { Button } from '../components/Button';
import { Modal, Drawer, Alert } from '../components/Modal';
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
  { id: 'composition', label: '1. Composition API' },
  { id: 'alert-dialog', label: '2. Alert Dialog' },
  { id: 'behaviors', label: '3. Advanced Flows' },
  { id: 'variations', label: '4. Sizing & Placements' },
  { id: 'api', label: '5. API Reference' },
  { id: 'best-practices', label: "6. Do's & Don'ts" },
  { id: 'a11y', label: '7. Accessibility' },
];

export default function ModalOverview() {
  const [activeId, setActiveId] = useState<string>(tocItems[0]?.id || 'composition');
  
  // Modal states
  const [isStandardOpen, setIsStandardOpen] = useState(false);
  const [isDestructiveOpen, setIsDestructiveOpen] = useState(false);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'fullscreen'>('md');

  // Drawer states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerPlacement, setDrawerPlacement] = useState<'left' | 'right' | 'top' | 'bottom'>('right');

  // Behavior & Loading states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isLongOpen, setIsLongOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const initialFocusRef = useRef<HTMLInputElement>(null);

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

  const handleAction = (type: string) => {
    toast({
      title: 'Action successful',
      description: `The ${type} operation was completed.`,
      variant: 'success',
    });
    setIsStandardOpen(false);
    setIsDestructiveOpen(false);
    setIsSizeOpen(false);
    setIsDrawerOpen(false);
    setIsFormOpen(false);
    setIsLongOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      handleAction('Form Submission');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto pb-20 relative px-4 sm:px-6 lg:px-8">
      <div className="lg:pr-72 xl:pr-80 animate-in fade-in zoom-in-95 duration-500">
        <DocHeader
          title="Modal"
          description="Flexible, accessible, and high-performance overlay systems including Dialogs, Drawers, and Alerts."
          icon={<Maximize2 />}
          importCode="import { Modal, Drawer, Alert } from '@multi_innovations_healthcare/myui';"
        />

        {/* 1. Composition API */}
        <section id="composition" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Composition API"
            description="Build complex overlays using structured sub-components for maximum flexibility."
            code={`<Modal>
  <Modal.Trigger asChild>
    <Button>Open Modal</Button>
  </Modal.Trigger>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Modal Title</Modal.Title>
      <Modal.Description>Description text goes here.</Modal.Description>
    </Modal.Header>
    <Modal.Body>
      Main content area...
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={() => setOpen(false)}>Close</Button>
    </Modal.Footer>
  </Modal.Content>
</Modal>`}
          >
            <div className="flex gap-4">
              <Modal open={isStandardOpen} onOpenChange={setIsStandardOpen}>
                <Modal.Trigger asChild>
                  <Button type="primary" size="lg" className="rounded-2base gap-4 shadow-lg shadow-purple-500/10 h-14 whitespace-nowrap px-8">
                    <Layout className="w-5 h-5 shrink-0" />
                    Standard Dialog
                  </Button>
                </Modal.Trigger>
                <Modal.Content size="md">
                  <Modal.Header>
                    <Modal.Title>Composition API</Modal.Title>
                    <Modal.Description>Using dot-notation for clean, readable layouts.</Modal.Description>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="p-8 bg-gray-50 dark:bg-zinc-900/50 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-zinc-800 flex flex-col items-center gap-4 group/box transition-all hover:border-purple-400/50">
                      <div className="w-16 h-16 rounded-full bg-white dark:bg-zinc-800 shadow-xl flex items-center justify-center group-hover/box:rotate-12 transition-transform duration-500">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                      </div>
                      <p className="text-sm font-medium text-gray-500 text-center">Your content goes here with full styling control.</p>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button block variant="filled" className="h-12 rounded-2base font-bold" color="primary" onClick={() => handleAction('Composition')}>Got it, thanks!</Button>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
            </div>
          </DocExample>
        </section>

        {/* 2. Alert Dialog */}
        <section id="alert-dialog" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Alert Dialog"
            description="Strict interactions for critical actions. Forces user input before closing."
            code={`<Alert>
  <Alert.Trigger asChild>
    <Button color="danger">Delete</Button>
  </Alert.Trigger>
  <Alert.Content>
    <Alert.Header>
      <Alert.Title>Are you sure?</Alert.Title>
      <Alert.Description>This action cannot be undone.</Alert.Description>
    </Alert.Header>
    <Alert.Footer>
      <Alert.Cancel asChild><Button>Cancel</Button></Alert.Cancel>
      <Alert.Action asChild><Button color="danger">Delete</Button></Alert.Action>
    </Alert.Footer>
  </Alert.Content>
</Alert>`}
          >
            <Alert open={isDestructiveOpen} onOpenChange={setIsDestructiveOpen}>
              <Alert.Trigger asChild>
                <Button color="danger" variant="outlined" size="lg" className="rounded-2xl gap-3 border-2 h-14 whitespace-nowrap px-8">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  Critical Warning
                </Button>
              </Alert.Trigger>
              <Alert.Content>
                <Alert.Header>
                  <Alert.Title className="text-red-600 dark:text-red-400">Critical Action</Alert.Title>
                  <Alert.Description>
                    User must explicitly take an action to close this dialog. Default behavior props are locked.
                  </Alert.Description>
                </Alert.Header>
                <Alert.Footer>
                  <Alert.Cancel asChild><Button variant="outlined" className="rounded-xl">Cancel</Button></Alert.Cancel>
                  <Alert.Action asChild><Button color="danger" className="rounded-xl shadow-lg shadow-red-500/20" onClick={() => handleAction('Delete')}>Delete Project</Button></Alert.Action>
                </Alert.Footer>
              </Alert.Content>
            </Alert>
          </DocExample>
        </section>

        {/* 3. Advanced Flows */}
        <section id="behaviors" className="space-y-6 scroll-mt-28 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DocExample
              title="3. Scrolling Content"
              description="Automatic scroll handling for long legal texts."
              code={`<Modal.Body className="max-h-[60vh] overflow-y-auto pr-4">
  {content}
</Modal.Body>`}
            >
              <Button
                variant="outlined"
                size="lg"
                className="rounded-2xl gap-3 h-14 w-full"
                onClick={() => setIsLongOpen(true)}
              >
                <ScrollText className="w-5 h-5 text-purple-500 shrink-0" />
                Terms of Service
              </Button>
            </DocExample>

            <DocExample
              title="3. Loading & Logic"
              description="Submission states and initial focus management."
              code={`<Button loading={isLoading}>
  Save Changes
</Button>`}
            >
              <Button
                variant="outlined"
                size="lg"
                className="rounded-2xl gap-3 h-14 w-full"
                onClick={() => setIsFormOpen(true)}
              >
                <Loader2 className="w-5 h-5 text-blue-500 shrink-0" />
                Workspace Settings
              </Button>
            </DocExample>
          </div>
        </section>

        {/* 4. Sizing & Placements */}
        <section id="variations" className="space-y-6 scroll-mt-28 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DocExample
              title="4. Modal Sizing"
              description="Flexible widths from SM to Fullscreen."
              code={`<Modal.Content size="xl">...</Modal.Content>`}
            >
              <div className="flex flex-wrap justify-center gap-2">
                {(['sm', 'md', 'lg', 'xl', 'fullscreen'] as const).map((s) => (
                  <Button
                    key={s}
                    variant={modalSize === s ? 'filled' : 'outlined'}
                    size="sm"
                    className="rounded-xl uppercase text-[10px] tracking-widest font-bold h-10 px-4 active:scale-95 transition-all"
                    onClick={() => {
                      setModalSize(s);
                      setIsSizeOpen(true);
                    }}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </DocExample>

            <DocExample
              title="4. Drawer Placements"
              description="Slide panels from any screen edge."
              code={`<Drawer.Content placement="${drawerPlacement}">...</Drawer.Content>`}
            >
              <div className="flex flex-wrap justify-center gap-2">
                {(['left', 'right', 'top', 'bottom'] as const).map(p => (
                  <Button
                    key={p}
                    variant={drawerPlacement === p ? 'filled' : 'outlined'}
                    size="sm"
                    className="rounded-xl uppercase text-[10px] tracking-widest font-bold h-10 px-4 active:scale-95 transition-all"
                    onClick={() => {
                      setDrawerPlacement(p);
                      setIsDrawerOpen(true);
                    }}
                  >
                    {p}
                  </Button>
                ))}
              </div>
            </DocExample>
          </div>
        </section>

        {/* 5. API Reference */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">5. API Reference</h2>
          </div>
          
          <div className="space-y-12">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400 font-mono tracking-tight underline decoration-2 underline-offset-8 decoration-purple-500/20">Modal.Root</h3>
              <DocApiTable props={[
                { name: 'open', type: 'boolean', default: 'false', description: 'Controlled open state of the modal.', required: true },
                { name: 'onOpenChange', type: '(open: boolean) => void', default: 'undefined', description: 'Event handler called when open state changes.', required: true },
                { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial open state for uncontrolled usage.' },
              ]} />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400 font-mono tracking-tight underline decoration-2 underline-offset-8 decoration-purple-500/20">Modal.Content / Drawer.Content</h3>
              <DocApiTable props={[
                { name: 'size', type: '"sm" | "md" | "lg" | "xl" | "fullscreen"', default: '"md"', description: 'Width/Size variant of the overlay.' },
                { name: 'placement', type: '"left" | "right" | "top" | "bottom"', default: '"right"', description: 'Drawer only: Side to slide from.' },
                { name: 'closeOnOverlayClick', type: 'boolean', default: 'true', description: 'Whether to close when clicking the backdrop.' },
                { name: 'closeOnEsc', type: 'boolean', default: 'true', description: 'Whether to close when pressing Escape.' },
                { name: 'initialFocus', type: 'RefObject<HTMLElement>', default: 'undefined', description: 'Element to focus when modal opens.' },
              ]} />
            </div>
          </div>
        </section>

        {/* 6. Best Practices */}
        <section id="best-practices" className="scroll-mt-28 mb-16">
          <DocBestPractices
            dos={[
              "Use specific titles to set context immediately.",
              "Add Modal.Description for complex interactions.",
              "Use Alert Dialog for destructive irreversible actions.",
              "Return focus to the trigger for a smooth workflow."
            ]}
            donts={[
              "Nesting Modals within Modals (use Alert Dialog instead).",
              "Using Modals for long-form content over 60vh without scrolling.",
              "Closing critical forms on overlay click (disable it).",
              "Opening Modals automatically on page load without intent."
            ]}
          />
        </section>

        {/* 7. Accessibility */}
        <section id="a11y" className="scroll-mt-28">
          <DocAccessibility
            icon={<ShieldCheck size={48} />}
            shortcuts={[
              { tag: 'ESC', title: 'Escape Key', body: 'Instantly dismisses the overlay.' },
              { tag: 'TAB', title: 'Focus Trap', body: 'Keeps focus navigation within the modal.' },
              { tag: 'ARIA', title: 'Dynamic IDs', body: 'Auto-links labels and descriptions.' },
              { tag: 'FOCUS', title: 'Return Focus', body: 'Restores focus to trigger on close.' },
            ]}
          />
        </section>
      </div>

      <DocToc items={tocItems} activeId={activeId} />

      {/* Shared Modals for Demos */}
      <Modal open={isSizeOpen} onOpenChange={setIsSizeOpen}>
        <Modal.Content size={modalSize}>
          <Modal.Header>
            <Modal.Title>Size: {modalSize.toUpperCase()}</Modal.Title>
            <Modal.Description>Previewing at different scales.</Modal.Description>
          </Modal.Header>
          <Modal.Body>
            <div className="h-64 bg-gray-50 dark:bg-zinc-800/50 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-zinc-700 flex items-center justify-center">
              <Maximize2 className="w-12 h-12 text-gray-300" />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button block onClick={() => setIsSizeOpen(false)} shape="round">Close Preview</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal open={isLongOpen} onOpenChange={setIsLongOpen}>
        <Modal.Content size="lg">
          <Modal.Header>
            <Modal.Title>Privacy Policy & Terms</Modal.Title>
            <Modal.Description>Last updated: March 2024</Modal.Description>
          </Modal.Header>
          <Modal.Body className="max-h-[60vh] overflow-y-auto pr-4 space-y-6 custom-scrollbar">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <h4 className="font-bold text-gray-900 dark:text-zinc-50 tracking-tight text-lg underline decoration-purple-100 underline-offset-4">Article {i + 1}: General Usage</h4>
                <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed font-medium italic">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer className="bg-gray-50/50 dark:bg-zinc-900/30">
            <Button variant="outlined" onClick={() => setIsLongOpen(false)} shape="round" className="px-8 font-bold">Decline</Button>
            <Button onClick={() => handleAction('Policy Accepted')} shape="round" className="px-10 shadow-lg shadow-purple-500/10 font-bold">Accept & Continue</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal open={isFormOpen} onOpenChange={(open) => {
        if (!open && !isLoading) setIsConfirmOpen(true);
        else if (open) setIsFormOpen(true);
      }}>
        <Modal.Content closeOnOverlayClick={false} initialFocus={initialFocusRef}>
          <Modal.Header>
            <Modal.Title>Workspace Settings</Modal.Title>
            <Modal.Description>Configure your environment details.</Modal.Description>
          </Modal.Header>
          <form onSubmit={handleSubmit}>
            <Modal.Body className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-zinc-300 ml-1">Workspace Name</label>
                <input
                  ref={initialFocusRef}
                  disabled={isLoading}
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-purple-500/30 rounded-2xl focus:ring-4 focus:ring-purple-500/10 outline-none transition-all disabled:opacity-50 font-medium"
                  placeholder="Enter workspace name..."
                  defaultValue="Corporate Dashboard Project v2"
                />
              </div>
              <div className="p-5 bg-blue-50/50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/20 rounded-3xl flex items-start gap-4 shadow-inner">
                <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                  <Info className="w-4 h-4 text-white" />
                </div>
                <p className="text-[13px] text-blue-700 dark:text-blue-300 font-medium italic leading-relaxed">
                  Notice: Safety guards are active. Closing this modal while editing will trigger a confirmation dialogue.
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer className="bg-gray-50/50 dark:bg-zinc-900/40 pt-6">
              <Button variant="text" disabled={isLoading} onClick={() => setIsConfirmOpen(true)} className="text-gray-400 hover:underline">Discard Changes</Button>
              <Button
                htmlType="submit"
                loading={isLoading}
                color="primary"
                className="min-w-[160px] rounded-2xl shadow-xl shadow-blue-500/20 h-14 font-black tracking-tight"
              >
                Save Settings
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Content>
      </Modal>

      <Alert open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <Alert.Content size="sm">
          <Alert.Header>
            <Alert.Title>Discard Changes?</Alert.Title>
            <Alert.Description>Unsaved progress will be lost. Are you sure you want to exit?</Alert.Description>
          </Alert.Header>
          <Alert.Footer>
            <Alert.Cancel asChild><Button variant="outlined" className="rounded-xl h-12 px-6">Go Back</Button></Alert.Cancel>
            <Alert.Action asChild><Button color="danger" onClick={() => {
              setIsConfirmOpen(false);
              setIsFormOpen(false);
            }} className="rounded-xl px-10 h-12 shadow-lg shadow-red-500/20 font-bold tracking-tight">Discard</Button></Alert.Action>
          </Alert.Footer>
        </Alert.Content>
      </Alert>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <Drawer.Content placement={drawerPlacement}>
          <Drawer.Header className="pt-12">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-purple-500/30">
              <Menu className="w-7 h-7 text-white" />
            </div>
            <Drawer.Title className="text-2xl tracking-tighter sm:text-3xl">System Menu</Drawer.Title>
            <Drawer.Description className="max-w-xs">Administrative controls and access.</Drawer.Description>
          </Drawer.Header>
          <Drawer.Body className="pt-4">
            <div className="space-y-3">
              {[
                { label: 'Cloud Console', icon: Layout },
                { label: 'Team Accounts', icon: Accessibility },
                { label: 'Analytical Logs', icon: ScrollText },
                { label: 'Security Firewall', icon: ShieldCheck }
              ].map((item) => (
                <div key={item.label} className="p-5 bg-gray-50 dark:bg-zinc-800/40 rounded-[2rem] hover:bg-white dark:hover:bg-zinc-800 border-2 border-transparent hover:border-purple-100 dark:hover:border-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/10 transition-all cursor-pointer group flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-2xl bg-white dark:bg-zinc-900 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                    </div>
                    <span className="font-bold text-gray-700 dark:text-zinc-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-sm uppercase tracking-widest leading-none">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-purple-500 translate-x-0 group-hover:translate-x-1.5 transition-all" />
                </div>
              ))}
            </div>
          </Drawer.Body>
          <Drawer.Footer className="pb-12 pt-8">
            <Button block className="h-16 text-lg font-black tracking-tight" onClick={() => setIsDrawerOpen(false)} shape="round" color="primary">Done</Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer>
    </div>
  );
}
