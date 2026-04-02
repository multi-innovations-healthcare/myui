import React, { useState } from 'react';
import { 
  Terminal, Copy, Check, Eye, Code2, 
  CheckCircle2, AlertCircle, BookOpen, Info 
} from 'lucide-react';
import { toast } from 'sonner';

interface DocHeaderProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  importCode: string;
}

export const DocHeader: React.FC<DocHeaderProps> = ({ title, description, icon, importCode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(importCode);
    setCopied(true);
    toast.success('Import code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-10 mt-6 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex items-start gap-6">
        <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-[22px] flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0 border border-white/20 shadow-[inset_0_2px_10px_rgba(255,255,255,0.2)]">
          <div className="text-white drop-shadow-sm">
            {React.cloneElement(icon as React.ReactElement)}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">{title}</h1>
          <p className="text-muted-foreground mt-1.5 text-base font-medium leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center max-w-lg relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
        <div className="relative flex-1 flex items-center justify-between bg-card/60 backdrop-blur-xl rounded-xl px-4 py-3 shadow-xl border border-white/10 dark:border-white/5 ring-1 ring-border">
          <div className="flex items-center gap-3 overflow-hidden">
            <Terminal className="w-4 h-4 text-muted-foreground shrink-0" />
            <code className="text-[13px] font-mono whitespace-nowrap text-foreground">
              <span className="text-indigo-400">import</span> {`{ ${title} }`} <span className="text-indigo-400">from</span> <span className="text-cyan-400">'@multi_innovations_healthcare/myui'</span><span className="text-muted-foreground">;</span>
            </code>
          </div>
          <button 
            onClick={handleCopy} 
            className="p-2 ml-3 text-muted-foreground hover:text-foreground hover:bg-card/80 rounded-lg transition-all shrink-0 active:scale-90"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

interface DocExampleProps {
  title: string;
  description: string;
  code: string;
  children: React.ReactNode;
}

export const DocExample: React.FC<DocExampleProps> = ({ title, description, code, children }) => {
  const [view, setView] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code snippet copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group/example relative space-y-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold text-foreground tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground font-medium">{description}</p>
      </div>

      <div className="relative border border-white/10 dark:border-white/5 ring-1 ring-border rounded-3xl overflow-hidden bg-card/40 backdrop-blur-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/40">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-background/50">
          <div className="flex bg-card p-1 rounded-xl ring-1 ring-border">
            <button
              onClick={() => setView('preview')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                view === 'preview' ? 'bg-background text-foreground shadow-sm ring-1 ring-border' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Preview
            </button>
            <button
              onClick={() => setView('code')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                view === 'code' ? 'bg-background text-foreground shadow-sm ring-1 ring-border' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" /> Code
            </button>
          </div>
          <button onClick={handleCopy} className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all active:scale-90">
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <div className="relative">
          {view === 'preview' ? (
            <div className="p-8 min-h-[200px] flex items-center justify-center bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px]">
              {children}
            </div>
          ) : (
            <div className="bg-zinc-950 p-6 overflow-x-auto custom-scrollbar max-h-[400px]">
              <pre className="text-[13px] font-mono leading-relaxed">
                <code className="text-zinc-300">{code}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface ApiProp {
  name: string;
  type: string;
  default: string;
  description: string;
  required?: boolean;
}

interface DocApiTableProps {
  props: ApiProp[];
}

export const DocApiTable: React.FC<DocApiTableProps> = ({ props }) => (
  <div className="bg-card/40 backdrop-blur-xl rounded-3xl border border-white/10 dark:border-white/5 ring-1 ring-border overflow-hidden shadow-lg">
    <div className="overflow-x-auto custom-scrollbar">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-background/50 border-b border-border/50">
            <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground">Prop</th>
            <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground">Type</th>
            <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground">Default</th>
            <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {props.map((p) => (
            <tr key={p.name} className="group hover:bg-card/60 transition-colors">
              <td className="px-6 py-3.5 align-top">
                <code className="text-[13px] font-mono font-bold text-foreground">
                  {p.name}
                  {p.required && <span className="text-rose-500 ml-1">*</span>}
                </code>
              </td>
              <td className="px-6 py-3.5 align-top">
                <code className="text-[12px] font-mono text-indigo-500 dark:text-indigo-400 bg-primary/10 px-2 py-1 rounded-md">
                  {p.type}
                </code>
              </td>
              <td className="px-6 py-3.5 align-top">
                <code className="text-[12px] font-mono text-muted-foreground italic">
                  {p.default || '-'}
                </code>
              </td>
              <td className="px-6 py-3.5 text-[13px] text-muted-foreground font-medium leading-relaxed max-w-xs">
                {p.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

interface DocAccessibilityProps {
  shortcuts: { tag: string; title: string; body: string }[];
  icon: React.ReactNode;
}

export const DocAccessibility: React.FC<DocAccessibilityProps> = ({ shortcuts, icon }) => (
  <div className="bg-purple-600 dark:bg-purple-900/40 p-8 rounded-3xl shadow-xl shadow-purple-500/10 text-white dark:text-purple-100 relative overflow-hidden">
    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none scale-125">
      {icon}
    </div>
    <h2 className="text-3xl font-bold mb-8 flex items-center gap-4 relative z-10 tracking-tight">
      Accessibility Standard
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
      {shortcuts.map(f => (
        <div key={f.tag} className="flex items-start gap-5 bg-white/10 dark:bg-black/20 p-5 rounded-2xl border border-white/10 backdrop-blur-sm group hover:bg-white/15 transition-all active:scale-[0.98]">
          <div className="w-10 h-10 rounded-xl bg-white text-purple-600 flex items-center justify-center font-black text-[10px] shrink-0 shadow-lg group-hover:scale-110 transition-transform font-mono uppercase tracking-tighter ring-4 ring-purple-500/20">{f.tag}</div>
          <div className="space-y-1">
            <h4 className="font-bold text-lg leading-tight uppercase tracking-tighter">{f.title}</h4>
            <p className="text-sm opacity-80 leading-relaxed font-medium italic">{f.body}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

interface DocBestPracticesProps {
  dos: string[];
  donts: string[];
}

export const DocBestPractices: React.FC<DocBestPracticesProps> = ({ dos, donts }) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-2">
         <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-3">
           <BookOpen className="w-5 h-5 text-indigo-500" />
           Do's & Don'ts
         </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-3xl border border-emerald-500/20 space-y-3 backdrop-blur-md ring-1 ring-white/5">
          <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <h4 className="font-black uppercase tracking-widest text-[10px]">Best Practices</h4>
          </div>
          <ul className="space-y-2">
            {dos.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[12px] text-muted-foreground font-medium italic leading-relaxed">
                <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 bg-rose-500/5 dark:bg-rose-500/10 rounded-3xl border border-rose-500/20 space-y-3 backdrop-blur-md ring-1 ring-white/5">
          <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
            <AlertCircle className="w-4 h-4" />
            <h4 className="font-black uppercase tracking-widest text-[10px]">Avoid Patterns</h4>
          </div>
          <ul className="space-y-2">
            {donts.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[12px] text-muted-foreground font-medium italic leading-relaxed">
                <div className="w-1 h-1 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

interface DocTocProps {
  items: { id: string; label: string }[];
  activeId: string;
}

export const DocToc: React.FC<DocTocProps> = ({ items, activeId }) => {
  return (
    <div className="hidden lg:block fixed top-0 right-0 h-screen pt-28 pb-12 px-3 w-64 xl:w-72 overflow-y-auto bg-background/60 backdrop-blur-xl border-l border-border/50">
      <div className="h-full flex flex-col">
        <h4 className="text-[11px] font-bold text-foreground mb-4 uppercase tracking-widest opacity-80 mx-3">
          list of contents
        </h4>

        <nav className="flex flex-col gap-1">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`
                group relative flex items-center py-2 px-4 rounded-xl transition-all duration-200 text-[12px]
                ${activeId === item.id
                  ? 'text-primary bg-primary/10 font-bold shadow-sm ring-1 ring-border/50'
                  : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                }
              `}
            >
              <span
                className={`
                  absolute left-1.5 w-1.5 h-1.5 rounded-full bg-primary transition-all duration-300
                  ${activeId === item.id ? 'scale-125 opacity-100' : 'scale-0 opacity-0 group-hover:scale-75 group-hover:opacity-40'}
                `}
              />
              <span className="ml-2 truncate text-ellipsis overflow-hidden">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <div className="p-5 bg-card/60 backdrop-blur-md rounded-2xl border border-white/5 ring-1 ring-border relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-2xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"></div>
            <div className="flex items-center gap-2 text-primary mb-2 relative z-10">
              <Info className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider italic">Pro Tip</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed font-medium relative z-10">
              Use <code className="text-primary font-mono bg-primary/10 px-1 py-0.5 rounded">asChild</code> on triggers to avoid rendering extra DOM nodes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
