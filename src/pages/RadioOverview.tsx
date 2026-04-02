import { useState, useEffect } from 'react';
import { 
  CircleDot, Layout, AlignLeft, ShieldCheck
} from 'lucide-react';
import { RadioGroup } from '../components/Radio';
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
  { id: 'orientation', label: '2. Orientations' },
  { id: 'rich-options', label: '3. Rich Options' },
  { id: 'validation', label: '4. Validation State' },
  { id: 'api', label: '5. API Reference' },
  { id: 'best-practices', label: "6. Do's & Don'ts" },
  { id: 'a11y', label: '7. Accessibility' },
];

export default function RadioOverview() {
  const [activeId, setActiveId] = useState<string>(tocItems[0]?.id || 'basic');
  const [value, setValue] = useState('one');

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
          title="Radio"
          description="A high-fidelity radio group for selecting a single option from multiple choices with support for rich descriptions."
          icon={<CircleDot />}
          importCode="import { RadioGroup } from '@multi_innovations_healthcare/myui';"
        />

        {/* 1. Basic Usage */}
        <section id="basic" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="1. Basic Usage"
            description="Simple radio groups with labels and disabled states."
            code={`<RadioGroup 
  label="Select an option"
  value={value}
  onValueChange={setValue}
  options={[
    { label: 'Option One', value: 'one' },
    { label: 'Option Two', value: 'two' },
    { label: 'Option Three', value: 'three', disabled: true },
  ]}
/>`}
          >
            <div className="w-full max-w-sm">
              <RadioGroup 
                label="Basic Selection"
                value={value}
                onValueChange={setValue}
                options={[
                  { label: 'Option One', value: 'one' },
                  { label: 'Option Two', value: 'two' },
                  { label: 'Option Three (Disabled)', value: 'three', disabled: true },
                ]}
              />
            </div>
          </DocExample>
        </section>

        {/* 2. Orientations */}
        <section id="orientation" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="2. Orientations"
            description="Switch between vertical and horizontal layouts seamlessly."
            code={`<RadioGroup orientation="vertical" ... />
<RadioGroup orientation="horizontal" ... />`}
          >
            <div className="w-full space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Layout className="w-4 h-4 text-purple-500" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vertical (Default)</span>
                </div>
                <RadioGroup 
                  options={[
                    { label: 'Vertical One', value: 'v1' },
                    { label: 'Vertical Two', value: 'v2' },
                  ]}
                  defaultValue="v1"
                />
              </div>
              <div className="space-y-4 pt-8 border-t border-gray-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-2">
                  <AlignLeft className="w-4 h-4 text-purple-500 rotate-90" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Horizontal</span>
                </div>
                <RadioGroup 
                  orientation="horizontal"
                  options={[
                    { label: 'Standard', value: 'std' },
                    { label: 'Express', value: 'exp' },
                    { label: 'Next Day', value: 'nd' },
                  ]}
                  defaultValue="std"
                />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 3. Rich Options */}
        <section id="rich-options" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="3. Rich Options"
            description="Include descriptive text for each option to provide more context."
            code={`<RadioGroup 
  options={[
    { 
      label: 'Pro Plan', 
      value: 'pro', 
      description: 'Advanced features for growing teams.' 
    }
  ]}
/>`}
          >
            <div className="w-full max-w-md">
              <RadioGroup 
                label="Subscription Plan"
                defaultValue="pro"
                options={[
                  { 
                    label: 'Starter', 
                    value: 'starter', 
                    description: 'Best for small projects and personal experiments.' 
                  },
                  { 
                    label: 'Pro', 
                    value: 'pro', 
                    description: 'Advanced features for growing teams and businesses.' 
                  },
                  { 
                    label: 'Enterprise', 
                    value: 'enterprise', 
                    description: 'Custom solutions for large-scale production requirements.' 
                  },
                ]}
              />
            </div>
          </DocExample>
        </section>

        {/* 4. Validation State */}
        <section id="validation" className="space-y-6 scroll-mt-28 mb-16">
          <DocExample
            title="4. Validation State"
            description="Communicate errors or required fields effectively."
            code={`<RadioGroup 
  error="Selection is required" 
  ... 
/>`}
          >
            <div className="w-full max-w-sm">
              <RadioGroup 
                label="Payment Method"
                error="Selected method is currently unavailable"
                options={[
                  { label: 'Bank Transfer', value: 'bank' },
                  { label: 'PayPal', value: 'paypal', disabled: true },
                  { label: 'Stripe', value: 'stripe' },
                ]}
                defaultValue="bank"
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
            { name: 'options', type: 'RadioOption[]', default: '[]', description: 'Array of options including label, value, and optional description.', required: true },
            { name: 'value', type: 'string', default: 'undefined', description: 'Controlled value of the selected radio item.' },
            { name: 'onValueChange', type: '(value: string) => void', default: 'undefined', description: 'Callback when selection changes.' },
            { name: 'defaultValue', type: 'string', default: 'undefined', description: 'Initial value for uncontrolled usage.' },
            { name: 'label', type: 'string', default: 'undefined', description: 'Label text for the entire group.' },
            { name: 'error', type: 'string', default: 'undefined', description: 'Error message to display below the group.' },
            { name: 'orientation', type: '"vertical" | "horizontal"', default: '"vertical"', description: 'Layout direction of the items.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the entire radio group.' },
          ]} />
        </section>

        {/* 6. Best Practices */}
        <section id="best-practices" className="scroll-mt-28 mb-16">
          <DocBestPractices
            dos={[
              "Use Radio groups when user must select exactly one option.",
              "Use vertical orientation for longer lists to improve readability.",
              "Provide descriptive text for complex choices.",
              "Group related options under a clear collective label."
            ]}
            donts={[
              "Don't use Radio if the user can select multiple items (use Checkbox).",
              "Don't use for more than 5-6 options (consider Select).",
              "Don't leave a radio group with no default selection if possible.",
              "Don't use horizontal orientation if labels are long or wrapped."
            ]}
          />
        </section>

        {/* 7. Accessibility */}
        <section id="a11y" className="scroll-mt-28">
           <DocAccessibility
            icon={<ShieldCheck size={48} />}
            shortcuts={[
              { tag: 'ARROW', title: 'Navigation', body: 'Move selection within the group using arrow keys.' },
              { tag: 'SPACE', title: 'Select', body: 'Select the focused radio item.' },
              { tag: 'TAB', title: 'Focus', body: 'Move focus into and out of the radio group.' },
              { tag: 'ARIA', title: 'Roles', body: 'Automatic radiogroup and radio ARIA roles.' },
            ]}
          />
        </section>
      </div>

      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}
