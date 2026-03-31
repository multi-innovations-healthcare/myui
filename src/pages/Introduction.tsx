import { ShieldCheck, Palette, FileCode2, Copy, Sparkles, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InstallTabs, Button } from '../index';

export default function Introduction() {
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto pb-24 pt-8 sm:pt-12 px-2 sm:px-6">

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20 mb-24">

        {/* Left: Text & Install */}
        <div className="flex-1 space-y-10 max-w-2xl w-full">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-foreground leading-[1.1]">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 pb-2">MyUI</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium tracking-tight leading-relaxed">
              Designed to be accessible, beautiful, and developer-friendly out of the box.
            </p>
          </div>

          <div className="pt-2 w-full shadow-2xl shadow-indigo-500/5 rounded-xl">
            <InstallTabs />
          </div>
        </div>

        {/* Right: Visual Proof */}
        <div className="w-full lg:w-[420px] shrink-0 pt-4 lg:pt-0">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur-lg opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-300"></div>
            <div className="relative bg-card/40 backdrop-blur-xl ring-1 ring-border rounded-[2rem] p-10 shadow-2xl flex flex-col items-center justify-center gap-8 min-h-[340px]">
              <div className="text-center space-y-3 mb-2">
                <div className="inline-flex items-center justify-center p-3.5 bg-primary/10 rounded-2xl mb-3 ring-1 ring-primary/20 shadow-[inset_0_2px_10px_rgba(99,102,241,0.2)]">
                  <Sparkles className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground tracking-tight">Interactive Preview</h3>
                <p className="text-sm text-muted-foreground">Hover and click to feel the components.</p>
              </div>
              <div className="flex flex-col gap-4 w-full px-2">
                <Button className="w-full h-12 rounded-xl text-base bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5">
                  Primary Action
                </Button>
                <Button variant="outlined" className="w-full h-12 text-base rounded-xl transition-all hover:scale-[1.03] active:scale-[0.97] hover:bg-card/80 pb-0.5">
                  Secondary Action
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why MyUI - Features Grid */}
      <div className="space-y-12 mb-24">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">Why choose MyUI?</h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Building intuitive user interfaces is hard. MyUI simplifies this by providing highly customizable components with sensible defaults.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-card/40 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 ring-1 ring-zinc-200/80 dark:ring-zinc-800/80 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ring-1 ring-zinc-200 dark:ring-zinc-800">
              <ShieldCheck className="w-7 h-7 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">Accessible by Default</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Focus management, ARIA roles, and keyboard navigation are built-in perfectly out of the box. No extra configuration required.
            </p>
          </div>

          <div className="bg-card/40 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 ring-1 ring-zinc-200/80 dark:ring-zinc-800/80 shadow-sm hover:shadow-xl hover:border-purple-500/30 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ring-1 ring-zinc-200 dark:ring-zinc-800">
              <Palette className="w-7 h-7 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">Highly Themeable</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Customize everything easily to match your brand. Fully supports dynamic system dark mode and light mode securely.
            </p>
          </div>

          <div className="bg-card/40 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 ring-1 ring-zinc-200/80 dark:ring-zinc-800/80 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 ring-1 ring-zinc-200 dark:ring-zinc-800">
              <FileCode2 className="w-7 h-7 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">TypeScript Ready</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Written purely in TypeScript, ensuring absolute type safety, predictable properties, and top-tier autocomplete hints.
            </p>
          </div>

          <div className="bg-card/40 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 ring-1 ring-zinc-200/80 dark:ring-zinc-800/80 shadow-sm hover:shadow-xl hover:border-pink-500/30 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ring-1 ring-zinc-200 dark:ring-zinc-800">
              <Copy className="w-7 h-7 text-pink-500" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">Copy & Paste Friendly</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              You own the code. Get up and running in minutes by utilizing our well-documented component examples directly into your app.
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-card/40 backdrop-blur-3xl p-8 sm:p-12 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 ring-1 ring-zinc-200/80 dark:ring-zinc-800/80 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 bg-indigo-500/30 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="space-y-3 relative z-10 w-full">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Ready to Start Building?</h2>
          <p className="text-muted-foreground text-lg sm:max-w-xl">
            Head over to the quickstart guide to get the library installed and configured beautifully in your project.
          </p>
        </div>
        <button
          onClick={() => navigate('/quickstart')}
          className="shrink-0 group relative z-10 inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-2xl text-white dark:text-black bg-foreground text-background hover:bg-foreground/90 transition-all shadow-xl hover:-translate-y-0.5 w-full sm:w-auto"
        >
          Go to Quickstart
          <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}