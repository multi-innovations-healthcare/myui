import { useState, useEffect } from 'react';
import {
  CheckSquare, ShieldCheck, Info,
} from 'lucide-react';
import { Checkbox } from '../components/Checkbox';
import { Button } from '../components/Button';
import {
  DocHeader,
  DocExample,
  DocApiTable,
  DocAccessibility,
  DocBestPractices,
  DocToc
} from '../components/Documentation';

const tocItems = [
  { id: 'basic', label: '1. Basic Usage' },
  { id: 'indeterminate', label: '2. Indeterminate State' },
  { id: 'validation', label: '3. Validation & Status' },
  { id: 'controlled', label: '4. Controlled Usage' },
  { id: 'api', label: '5. API Reference' },
  { id: 'best-practices', label: "6. Do's & Don'ts" },
  { id: 'a11y', label: '7. Accessibility' },
];

export default function CheckboxOverview() {
  const [activeId, setActiveId] = useState<string>(tocItems[0]?.id || 'basic');

  // Indeterminate logic
  const [checkedItems, setCheckedItems] = useState([true, false]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  // Controlled logic
  const [controlledChecked, setControlledChecked] = useState<boolean | 'indeterminate'>(true);

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
          title="Checkbox"
          description="A high-fidelity checkbox with support for indeterminate state, rich labels, and accessible animations."
          icon={<CheckSquare />}
          importCode="import { Checkbox } from '@multi_innovations_healthcare/myui';"
        />

        {/* 1. Basic Usage */}
        <section id="basic" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Basic Usage"
            description="Standard checkboxes with optional descriptions and disabled states."
            code={`<Checkbox label="Accept Terms" />
<Checkbox label="Notify me" description="Get email updates." />`}
          >
            <div className="w-full max-w-sm space-y-6">
              <Checkbox label="Accept terms and conditions" />
              <Checkbox
                label="Receive notifications"
                description="Stay updated with our latest news and features."
              />
              <div className="flex flex-wrap gap-8 pt-4">
                <Checkbox label="Disabled" disabled />
                <Checkbox label="Disabled Checked" disabled defaultChecked />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 2. Indeterminate State */}
        <section id="indeterminate" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Indeterminate State"
            description="Indicate partial selection when a checkbox controls a group of child items."
            code={`<Checkbox checked={isIndeterminate ? 'indeterminate' : allChecked} />`}
          >
            <div className="w-full max-w-md p-6 bg-gray-50 dark:bg-zinc-900/50 rounded-3xl border border-gray-100 dark:border-zinc-800">
              <div className="space-y-6">
                <Checkbox
                  label="Select all platforms"
                  checked={isIndeterminate ? 'indeterminate' : allChecked}
                  onChange={(checked) => {
                    setCheckedItems([checked === true, checked === true]);
                  }}
                />
                <div className="ml-8 space-y-4 pt-4 border-t border-gray-200/50 dark:border-zinc-800">
                  <Checkbox
                    label="Web Desktop"
                    checked={checkedItems[0]}
                    onChange={(checked) => setCheckedItems([checked === true, checkedItems[1]])}
                  />
                  <Checkbox
                    label="Mobile Apps"
                    checked={checkedItems[1]}
                    onChange={(checked) => setCheckedItems([checkedItems[0], checked === true])}
                  />
                </div>
              </div>
            </div>
          </DocExample>
        </section>

        {/* 3. Validation & Status */}
        <section id="validation" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="3. Validation & Status"
            description="Communicate requirements and errors clearly."
            code={`<Checkbox error="This field is required" ... />`}
          >
            <div className="w-full max-w-sm">
              <Checkbox
                label="Marketing Policy"
                description="I agree to receive personalized advertisements."
                error="You must accept our policy before proceeding"
                required
              />
            </div>
          </DocExample>
        </section>

        {/* 4. Controlled Usage */}
        <section id="controlled" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="4. Controlled Usage"
            description="Surgically manage state and cycle through indeterminate values."
            code={`<Checkbox checked={state} onChange={setState} />`}
          >
            <div className="w-full max-w-sm space-y-4">
              <div className="flex items-center justify-between p-5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100/50 dark:border-purple-900/30">
                <Checkbox
                  label="Master System Control"
                  checked={controlledChecked}
                  onChange={setControlledChecked}
                />
                <Button
                  size="sm"
                  variant="outlined"
                  className="rounded-xl h-10 px-4 text-[10px] font-bold uppercase tracking-widest border-2"
                  onClick={() => setControlledChecked(prev => prev === 'indeterminate' ? true : prev === true ? false : 'indeterminate')}
                >
                  Cycle
                </Button>
              </div>
              <div className="px-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <Info size={12} className="text-purple-500" />
                State: <span className="font-mono text-purple-600 dark:text-purple-400">{String(controlledChecked)}</span>
              </div>
            </div>
          </DocExample>
        </section>

        {/* 5. API Reference */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">5. API Reference</h2>
          </div>

          <DocApiTable props={[
            { name: 'checked', type: "boolean | 'indeterminate'", default: 'false', description: 'Controlled checked state.' },
            { name: 'onChange', type: "(checked: boolean | 'indeterminate') => void", default: 'undefined', description: 'Callback when checked state changes.' },
            { name: 'defaultChecked', type: "boolean | 'indeterminate'", default: 'false', description: 'Initial state for uncontrolled usage.' },
            { name: 'label', type: 'string', default: 'undefined', description: 'Primary label text.' },
            { name: 'description', type: 'string', default: 'undefined', description: 'Supporting text shown below the label.' },
            { name: 'error', type: 'string', default: 'undefined', description: 'Error message to display.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents user interaction.' },
            { name: 'required', type: 'boolean', default: 'false', description: 'Indicates the field is mandatory.' },
          ]} />
        </section>

        {/* 6. Best Practices */}
        <section id="best-practices" className="scroll-mt-28 mb-16">
          <DocBestPractices
            dos={[
              "Use Checkbox for options where user can select multiple items.",
              "Provide a description if the action has side effects.",
              "Use indeterminate state for 'Select All' parent checkboxes.",
              "Ensure labels are clickable as well as the checkbox itself."
            ]}
            donts={[
              "Don't use Checkbox for settings that take effect immediately (use Switch).",
              "Don't use alone without a label unless an aria-label is provided.",
              "Don't hide the checkbox based on state; use disabled or hidden props.",
              "Don't nest complex interaction like buttons inside labels."
            ]}
          />
        </section>

        {/* 7. Accessibility */}
        <section id="a11y" className="scroll-mt-28">
          <DocAccessibility
            icon={<ShieldCheck size={48} />}
            shortcuts={[
              { tag: 'SPACE', title: 'Toggle', body: 'Press Space to toggle the checkbox state.' },
              { tag: 'TAB', title: 'Focus', body: 'Navigate between form controls via Tab.' },
              { tag: 'ARIA', title: 'States', body: 'Support for aria-checked="mixed" for indeterminate.' },
              { tag: 'ID', title: 'Linking', body: 'Automatic linking of label and error IDs.' },
            ]}
          />
        </section>
      </div>

      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
