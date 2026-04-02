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
            // strings first so injected highlight spans are not mistaken for string literals
            .replace(/('.*?'|".*?"|`.*?`)/g, '<span class="text-green-400">$1</span>')
            // line comments only (avoid matching // after : e.g. http://)
            .replace(/(?<!:)\/\/.*$/g, '<span class="text-gray-500 italic">$&</span>')
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
  const [starterView, setStarterView] = React.useState<'preview' | 'code'>('preview');

  const codeSnippet = `import { ToastProvider, Button, toast } from '@multi_innovations_healthcare/myui';

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

  const stylesV4Snippet = `@import "tailwindcss";
@import "@multi_innovations_healthcare/myui/styles";
`;

  const tailwindV3Snippet = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@multi_innovations_healthcare/myui/dist/**/*.{js,ts,jsx,tsx}"
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
          <p className="text-muted-foreground">Install <code className="text-pink-500 font-mono text-sm">@multi_innovations_healthcare/myui</code> via your preferred package manager. If you will wire <strong className="text-foreground">Tailwind v4</strong> in your own CSS (step 2), add <code className="text-pink-500 font-mono text-sm">tailwindcss</code> and <code className="text-pink-500 font-mono text-sm">@tailwindcss/vite</code> (or the PostCSS equivalent) to your app as well.</p>

          <InstallTabs />
        </div>
      </section>

      {/* Step 2 */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold shadow-[inset_0_2px_10px_rgba(99,102,241,0.2)]">2</div>
          <h2 className="text-2xl font-bold text-foreground">Styles <span className="text-lg font-semibold text-muted-foreground">(Tailwind v4)</span></h2>
        </div>
        <div className="pl-12 space-y-4">
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Importing components from <code className="bg-card px-1.5 py-0.5 rounded text-sm text-pink-500 font-mono ring-1 ring-border border border-transparent">@multi_innovations_healthcare/myui</code> still injects bundled CSS, so many apps need no extra setup. When <em>your</em> app runs its own Tailwind v4 pipeline (e.g. <code className="text-pink-500 font-mono text-xs">@tailwindcss/vite</code>), add the package styles entry so your build picks up MyUI&apos;s <code className="text-pink-500 font-mono text-xs">@source</code> globs, animation preset, and fonts in the same order the library uses.
          </p>

          <div className="max-w-3xl rounded-2xl overflow-hidden border border-white/10 dark:border-white/5 ring-1 ring-border bg-card/40 shadow-lg">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/50">
              <div className="flex items-center gap-2 min-w-0">
                <FileCode2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-mono text-muted-foreground truncate">src/index.css</span>
                <span className="hidden sm:inline text-[10px] text-muted-foreground/80 uppercase tracking-wider shrink-0">(or your global CSS)</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyCode(stylesV4Snippet, 'styles-v4')}
                className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all active:scale-95 shrink-0"
                aria-label="Copy Tailwind v4 style imports"
              >
                {hasCopiedCode === 'styles-v4' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="bg-zinc-950 p-4 sm:p-6 overflow-x-auto overflow-y-auto custom-scrollbar max-h-[min(280px,50vh)] text-sm">
              <SimpleHighlighter code={stylesV4Snippet} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground max-w-3xl">
            The scope is <code className="text-pink-500 font-mono">@multi_innovations_healthcare/myui</code> — use <code className="text-pink-500 font-mono">…/myui/styles</code>, not <code className="text-pink-500 font-mono opacity-80">@multi_innovations_healthcare/styles</code> (that path does not exist on npm).
          </p>

          <details className="max-w-3xl rounded-2xl border border-border bg-card/40 ring-1 ring-border/60 [&_summary]:list-none">
            <summary className="cursor-pointer select-none px-5 py-4 font-medium text-foreground hover:bg-muted/30 rounded-2xl transition-colors">
              Tailwind v3 — <code className="text-pink-500 font-mono text-sm">tailwind.config.js</code> content path
            </summary>
            <div className="space-y-4 px-5 pb-5 pt-0 text-sm text-muted-foreground border-t border-border/60">
              <p className="pt-4 leading-relaxed">
                For Tailwind v3, add the package <code className="text-pink-500 font-mono text-xs">dist</code> tree to <code className="text-pink-500 font-mono text-xs">content</code> so class names from the library are not purged.
              </p>
              <div className="rounded-2xl overflow-hidden border border-white/10 dark:border-white/5 ring-1 ring-border bg-card/40 shadow-lg">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/50">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileCode2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-xs font-mono text-muted-foreground truncate">tailwind.config.js</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(tailwindV3Snippet, 'tailwind-v3')}
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all active:scale-95 shrink-0"
                    aria-label="Copy Tailwind v3 config"
                  >
                    {hasCopiedCode === 'tailwind-v3' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="bg-zinc-950 p-4 sm:p-6 overflow-x-auto overflow-y-auto custom-scrollbar max-h-[min(360px,65vh)] text-sm">
                  <SimpleHighlighter code={tailwindV3Snippet} />
                </div>
              </div>
            </div>
          </details>
        </div>
      </section>

      {/* Step 3 */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold shadow-[inset_0_2px_10px_rgba(99,102,241,0.2)]">3</div>
          <h2 className="text-2xl font-bold text-foreground">Start Building</h2>
        </div>
        <div className="pl-12 space-y-6 min-w-0">
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Import components from <code className="text-pink-500 font-mono bg-background/50 ring-1 ring-border px-1.5 py-0.5 rounded text-sm">@multi_innovations_healthcare/myui</code> and wrap your tree with the required providers. Switch between Preview and Code to try the demo and copy the snippet into your app or library package.
          </p>

          <div className="relative max-w-3xl border border-white/10 dark:border-white/5 ring-1 ring-border rounded-3xl overflow-hidden bg-card/40 backdrop-blur-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30">
            <div className="flex flex-wrap items-center gap-3 justify-between px-4 sm:px-5 py-3 border-b border-border bg-background/50">
              <div className="flex bg-card p-1 rounded-xl ring-1 ring-border shrink-0">
                <button
                  type="button"
                  onClick={() => setStarterView('preview')}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    starterView === 'preview'
                      ? 'bg-background text-foreground shadow-sm ring-1 ring-border'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>
                <button
                  type="button"
                  onClick={() => setStarterView('code')}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    starterView === 'code'
                      ? 'bg-background text-foreground shadow-sm ring-1 ring-border'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" /> Code
                </button>
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <span className="hidden sm:inline text-[11px] font-mono text-muted-foreground truncate">App.tsx</span>
                <button
                  type="button"
                  onClick={() => handleCopyCode(codeSnippet, 'app')}
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all active:scale-95 shrink-0"
                  aria-label="Copy App.tsx snippet"
                >
                  {hasCopiedCode === 'app' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="relative min-h-[220px] sm:min-h-[260px]">
              {starterView === 'preview' ? (
                <div className="p-6 sm:p-8 flex items-center justify-center min-h-[220px] sm:min-h-[260px] bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px]">
                  <div className="p-6 sm:p-8 bg-card/80 backdrop-blur-md rounded-[2rem] shadow-2xl border border-border ring-1 ring-border/80 max-w-full">
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
              ) : (
                <div className="bg-zinc-950 p-4 sm:p-6 overflow-x-auto overflow-y-auto custom-scrollbar max-h-[min(420px,70vh)] text-sm min-h-[220px] sm:min-h-[260px]">
                  <SimpleHighlighter code={codeSnippet} />
                </div>
              )}
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
