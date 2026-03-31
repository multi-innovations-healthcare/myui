import React from 'react';
import { Check, Copy, Sparkles, Eye, FileCode2, Code2 } from 'lucide-react';
import { toast } from 'sonner';
import { InstallTabs, Button } from '../index';

const SimpleHighlighter = ({ code }: { code: string }) => {
  const lines = code.split('\n');
  return (
    <pre className="font-mono text-[13px] leading-relaxed text-gray-300">
      <code>
        {lines.map((line, i) => {
          const highlighted = line
            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
            // comments
            .replace(/(\/\/.*)/g, '<span class="text-gray-500 italic">$1</span>')
            // strings
            .replace(/('.*?'|".*?"|`.*?`)/g, '<span class="text-green-400">$1</span>')
            // keywords
            .replace(/\b(import|export|default|function|return|from|const|let|var|type|interface)\b/g, '<span class="text-blue-400">$1</span>')
            // Components / Types
            .replace(/\b([A-Z][a-zA-Z0-9_]*)\b/g, '<span class="text-yellow-200">$1</span>')
            // properties
            .replace(/\b(className|onClick)\b/g, '<span class="text-blue-300">$1</span>');

          return <div key={i} dangerouslySetInnerHTML={{ __html: highlighted || '&#8203;' }} />
        })}
      </code>
    </pre>
  );
};

export default function Quickstart() {
  const [hasCopiedCode, setHasCopiedCode] = React.useState('');

  const codeSnippet = `import { ToastProvider, Button, toast } from 'myui';

export default function App() {
  return (
    <ToastProvider>
      <div className="p-8">
        <Button onClick={() => toast.success('MyUI is awesome!')}>
          Show Toast
        </Button>
      </div>
    </ToastProvider>
  );
}`;

  const tailwindSnippet = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Add MyUI content path
    "./node_modules/myui/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};`;

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setHasCopiedCode(id);
    toast.success('Code block copied');
    setTimeout(() => setHasCopiedCode(''), 2000);
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto space-y-12 pb-24 pt-6">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Quickstart
        </h1>
        <p className="text-xl text-muted-foreground">
          Get MyUI up and running in your React project in minutes.
        </p>
      </div>

      {/* Step 1 */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold shadow-[inset_0_2px_10px_rgba(99,102,241,0.2)]">1</div>
          <h2 className="text-2xl font-bold text-foreground">Install Package</h2>
        </div>
        <div className="pl-12 space-y-4">
          <p className="text-muted-foreground">Install `myui` and its core dependencies via your prefered package manager.</p>

          <InstallTabs />
        </div>
      </section>

      {/* Step 2 */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold shadow-[inset_0_2px_10px_rgba(99,102,241,0.2)]">2</div>
          <h2 className="text-2xl font-bold text-foreground">Configure Tailwind (Optional but Recommended)</h2>
        </div>
        <div className="pl-12 space-y-4">
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            If you want to ensure the underlying styles match perfectly, add MyUI to your Tailwind content paths in <code className="bg-card px-1.5 py-0.5 rounded text-sm text-pink-500 font-mono ring-1 ring-border border border-[transparent]">tailwind.config.js</code>. For Tailwind v4, configure your CSS accordingly.
          </p>

          <div className="bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-xl border border-gray-800 max-w-3xl">
            <div className="flex items-center justify-between px-4 py-3 bg-[#2D2D2D]/80 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-gray-300 font-mono">tailwind.config.js</span>
              </div>
              <button
                onClick={() => handleCopyCode(tailwindSnippet, 'tailwind')}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Copy Tailwind config"
              >
                {hasCopiedCode === 'tailwind' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="p-6 overflow-x-auto text-sm">
              <SimpleHighlighter code={tailwindSnippet} />
            </div>
          </div>
        </div>
      </section>

      {/* Step 3 */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold shadow-[inset_0_2px_10px_rgba(99,102,241,0.2)]">3</div>
          <h2 className="text-2xl font-bold text-foreground">Start Building</h2>
        </div>
        <div className="pl-12 space-y-6">
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Wrap your top-level component with the required Providers and you are good to go! Check out the interactive live preview next to the code.
          </p>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Code Block */}
            <div className="bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-xl border border-gray-800">
              <div className="flex items-center justify-between px-4 py-3 bg-[#2D2D2D]/80 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs text-gray-300 font-mono">App.tsx</span>
                </div>
                <button
                  onClick={() => handleCopyCode(codeSnippet, 'app')}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Copy App.tsx snippet"
                >
                  {hasCopiedCode === 'app' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="p-6 overflow-x-auto text-sm">
                <SimpleHighlighter code={codeSnippet} />
              </div>
            </div>

            {/* Live Preview */}
            <div className="bg-card/40 backdrop-blur-xl rounded-2xl border border-zinc-200 dark:border-zinc-800 ring-1 ring-zinc-200/80 dark:ring-zinc-800/80 shadow-lg overflow-hidden flex flex-col group">
              <div className="px-4 py-3 border-b border-border bg-background/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Live Preview</span>
                </div>
                <div className="flex gap-1.5 opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.5)]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                </div>
              </div>
              <div className="flex-1 p-8 flex items-center justify-center bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px]">
                <div className="p-8 bg-card/80 backdrop-blur-md rounded-[2rem] shadow-2xl border border-zinc-200 dark:border-zinc-800 ring-1 ring-zinc-200/80 dark:ring-zinc-800/80">
                  <Button
                    onClick={() => toast.success('MyUI is awesome!', {
                      description: 'You just clicked the live preview button.',
                      icon: <Sparkles className="text-amber-500 w-4 h-4" />
                    })}
                    className="h-12 px-8 text-base rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all"
                  >
                    Show Toast
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 max-w-3xl">
            <div className="p-5 bg-card/60 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 ring-1 ring-zinc-200/80 dark:ring-zinc-800/80 rounded-2xl flex items-start gap-4 shadow-xl">
              <div className="bg-primary/20 p-2.5 rounded-xl shrink-0 shadow-[inset_0_2px_10px_rgba(99,102,241,0.2)] mt-0.5 ring-1 ring-primary/30">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-foreground tracking-tight">Pro-Tip</h4>
                <p className="text-[15px] text-muted-foreground leading-relaxed font-medium">
                  MyUI supports <strong className="text-foreground">React Server Components (RSC)</strong> out of the box! You can safely import and render all components in the Next.js App Router without cluttering your files with <code className="text-pink-500 font-mono bg-background/50 ring-1 ring-border px-1.5 py-0.5 rounded">'use client'</code> directives.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
