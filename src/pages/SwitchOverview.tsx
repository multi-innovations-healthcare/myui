import { useState, useEffect } from 'react';
import {
  ToggleRight, Moon, Sun, Lock, Shield, Bell, ShieldCheck
} from 'lucide-react';
import { Switch } from '../components/Switch';
import { Button } from '../components/Button';
import {
  DocHeader,
  DocExample,
  DocApiTable,
  DocAccessibility,
  DocBestPractices,
  DocToc
} from '../components/Documentation';
import { toast } from 'sonner';

const tocItems = [
  { id: 'basic', label: '1. Basic Usage' },
  { id: 'sizes', label: '2. Size Variations' },
  { id: 'settings', label: '3. Settings Patterns' },
  { id: 'controlled', label: '4. Controlled Usage' },
  { id: 'api', label: '5. API Reference' },
  { id: 'best-practices', label: "6. Do's & Don'ts" },
  { id: 'a11y', label: '7. Accessibility' },
];

export default function SwitchOverview() {
  const [activeId, setActiveId] = useState<string>(tocItems[0]?.id || 'basic');

  // Controlled states
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(false);

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

  return (
    <div className="max-w-7xl mx-auto pb-20 relative px-4 sm:px-6 lg:px-8">
      <div className="lg:pr-72 xl:pr-80 animate-in fade-in zoom-in-95 duration-500">
        <DocHeader
          title="Switch"
          description="A smooth, animated toggle switch designed for binary choices and system preferences with peak tactile response."
          icon={<ToggleRight />}
          importCode="import { Switch } from 'myui';"
        />

        {/* 1. Basic Usage */}
        <section id="basic" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Basic Usage"
            description="Simple toggles for settings that take effect immediately."
            code={`<Switch label="Airplane Mode" />
<Switch label="Updates" description="Keep software current." />`}
          >
            <div className="w-full max-w-sm space-y-6">
              <Switch label="Airplane Mode" />
              <Switch
                label="Auto-updates"
                description="Enable automatic software updates for critical security patches."
                defaultChecked
              />
              <div className="flex flex-wrap gap-8 pt-4">
                <Switch label="Disabled Off" disabled />
                <Switch label="Disabled On" disabled defaultChecked />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 2. Size Variations */}
        <section id="sizes" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Size Variations"
            description="Scale toggles to fit your UI density requirements."
            code={`<Switch size="sm" />
<Switch size="default" />
<Switch size="lg" />`}
          >
            <div className="flex flex-wrap items-center gap-12 justify-center w-full py-8">
              <div className="flex flex-col items-center gap-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Small</span>
                <Switch size="sm" defaultChecked />
              </div>
              <div className="flex flex-col items-center gap-3 px-12 border-x border-gray-100 dark:border-zinc-800">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Default</span>
                <Switch defaultChecked />
              </div>
              <div className="flex flex-col items-center gap-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Large</span>
                <Switch size="lg" defaultChecked />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 3. Settings Patterns */}
        <section id="settings" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="3. Settings Patterns"
            description="Typical list layouts for application preferences and security controls."
            code={`<div className="divide-y">
  <Preference label="Privacy" ... />
</div>`}
          >
            <div className="w-full bg-white dark:bg-zinc-900 overflow-hidden rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
              <div className="divide-y divide-gray-100 dark:divide-zinc-800">
                <div className="p-6 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-zinc-800/30 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-xl group-hover:scale-110 transition-transform">
                      <Lock size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-zinc-50 tracking-tight">Two-Factor Authentication</p>
                      <p className="text-xs text-gray-500">Adds an extra layer of security to your account access.</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="p-6 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-zinc-800/30 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
                      <Shield size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-zinc-50 tracking-tight">Private Profile</p>
                      <p className="text-xs text-gray-500">Only approved followers can view your content and activity.</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </DocExample>
        </section>

        {/* 4. Controlled Usage */}
        <section id="controlled" className="space-y-6 scroll-mt-28 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DocExample
              title="4. Theme Control"
              description="Manage global state transitions."
              code={`<Switch checked={dark} onChange={setDark} />`}
            >
              <div className="w-full space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-950/50 rounded-2xl border border-gray-100 dark:border-zinc-800">
                  <div className="flex items-center gap-3">
                    {isDarkMode ? <Moon size={18} className="text-purple-400 animate-pulse" /> : <Sun size={18} className="text-amber-500" />}
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Dark Mode</span>
                  </div>
                  <Switch checked={isDarkMode} onChange={setIsDarkMode} />
                </div>
                <Button block variant="outlined" className="rounded-xl border-2 font-bold" onClick={() => setIsDarkMode(!isDarkMode)}>
                  Surgical Override
                </Button>
              </div>
            </DocExample>

            <DocExample
              title="4. Action Triggers"
              description="Capture events and trigger side effects."
              code={`<Switch onChange={(val) => toast(...)} />`}
            >
              <div className="w-full space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-950/50 rounded-2xl border border-gray-100 dark:border-zinc-800">
                  <div className="flex items-center gap-3">
                    <Bell size={18} className="text-rose-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Alerts</span>
                  </div>
                  <Switch checked={notifications} onChange={(val) => {
                    setNotifications(val);
                    toast.info(`External System: Alerts ${val ? 'Enabled' : 'Disabled'}`);
                  }} />
                </div>
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-center">
                  <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-tighter">Event Sink: {String(notifications)}</span>
                </div>
              </div>
            </DocExample>
          </div>
        </section>

        {/* 5. API Reference */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">5. API Reference</h2>
          </div>

          <DocApiTable props={[
            { name: 'checked', type: 'boolean', default: 'false', description: 'Controlled on/off state.' },
            { name: 'onChange', type: '(checked: boolean) => void', default: 'undefined', description: 'Callback triggered on toggle event.' },
            { name: 'defaultChecked', type: 'boolean', default: 'false', description: 'Initial state for uncontrolled usage.' },
            { name: 'label', type: 'string', default: 'undefined', description: 'Interactive label text.' },
            { name: 'description', type: 'string', default: 'undefined', description: 'Supporting text below the label.' },
            { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Dimensions of the switch track.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents user interaction and shades look.' },
            { name: 'error', type: 'string', default: 'undefined', description: 'Validation error text.' },
          ]} />
        </section>

        {/* 6. Best Practices */}
        <section id="best-practices" className="scroll-mt-28 mb-16">
          <DocBestPractices
            dos={[
              "Use Switch for actions that take effect instantly without a 'Save' button.",
              "Provide clear and concise labels that describe the state when 'on'.",
              "Use descriptive text for complex system preferences.",
              "Group related switches in card-like list layouts."
            ]}
            donts={[
              "Don't use Switch in long forms that require an overall 'Submit'.",
              "Don't use for selecting multiple items from a list (use Checkbox).",
              "Don't use alone without clear context or a label.",
              "Don't use large sizes for dense settings panels."
            ]}
          />
        </section>

        {/* 7. Accessibility */}
        <section id="a11y" className="scroll-mt-28">
          <DocAccessibility
            icon={<ShieldCheck size={48} />}
            shortcuts={[
              { tag: 'SPACE', title: 'Toggle', body: 'Activated via the Space key when focused.' },
              { tag: 'ENTER', title: 'Toggle', body: 'Can also be toggled via the Enter key.' },
              { tag: 'TAB', title: 'Focus', body: 'Follows standard sequential tab navigation.' },
              { tag: 'ARIA', title: 'Switch', body: 'Renders with role="switch" for accurate AT readout.' },
            ]}
          />
        </section>
      </div>

      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
