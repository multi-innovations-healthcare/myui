import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../index';
import {
  Accessibility,
  Blocks,
  Type,
  BookOpen,
  ChevronRight,
  Copy,
  Layers,
  Layout,
  MessageSquare,
  Sparkles,
  Eye,
  Check,
  Github,
  Star
} from 'lucide-react';
import { toast } from 'sonner';
import { useAppStore } from '../store/useAppStore';
import React from 'react';
import InstallTabs from '../components/InstallTabs';

const SimpleHighlighter = ({ code }: { code: string }) => {
  const lines = code.split('\n');
  return (
    <pre className="font-mono text-[13px] leading-relaxed text-gray-300">
      <code>
        {lines.map((line, i) => {
          const highlighted = line
            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/(\/\/.*)/g, '<span class="text-gray-500 italic">$1</span>')
            .replace(/('.*?'|".*?"|`.*?`)/g, '<span class="text-green-400">$1</span>')
            .replace(/\b(import|export|default|function|return|from|const|let|var|type|interface)\b/g, '<span class="text-blue-400">$1</span>')
            .replace(/\b([A-Z][a-zA-Z0-9_]*)\b/g, '<span class="text-yellow-200">$1</span>')
            .replace(/\b(className|onClick)\b/g, '<span class="text-blue-300">$1</span>');

          return <div key={i} dangerouslySetInnerHTML={{ __html: highlighted || '&#8203;' }} />
        })}
      </code>
    </pre>
  );
};

export default function Overview() {
  const navigate = useNavigate();
  const { setSidebarOpen } = useAppStore();
  const [hasCopiedCode, setHasCopiedCode] = React.useState('');

  const handleCopyCode = (code: string, id: string = 'code') => {
    navigator.clipboard.writeText(code);
    setHasCopiedCode(id);
    toast.success('Code copied to clipboard');
    setTimeout(() => setHasCopiedCode(''), 2000);
  };

  const usageCode = `import { ToastProvider, Button, toast } from 'myui';

function App() {
  return (
    <ToastProvider>
      <div className="flex h-full items-center justify-center">
        <Button onClick={() => toast.success('It works! 🎉')}>
          Click me
        </Button>
      </div>
    </ToastProvider>
  );
}`;

  const features = [
    {
      title: 'Accessible by default',
      description: 'Built with accessibility in mind from the start. Deliver inclusive experiences without the extra effort.',
      icon: <Accessibility className="w-6 h-6" />,
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
    },
    {
      title: 'Composable API',
      description: 'Designed for flexibility. Compose components freely without being constrained by rigid structures.',
      icon: <Blocks className="w-6 h-6" />,
      color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
    },
    {
      title: 'Fully Typed',
      description: 'Comprehensive static typing out of the box. Catch errors early and enjoy full autocomplete support.',
      icon: <Type className="w-6 h-6" />,
      color: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400'
    },
    {
      title: 'Docs + Playground',
      description: 'Interactive documentation with live playgrounds. Test props and see results instantly before implementing.',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
    }
  ];

  const componentCategories = [
    {
      title: 'Basic',
      icon: <Layers className="w-5 h-5 text-indigo-500 flex-shrink-0" />,
      items: [
        { name: 'Button', path: '/components/button' },
        { name: 'Input', path: '/components/input' },
        { name: 'Checkbox', path: '/components/checkbox' },
        { name: 'Switch', path: '/components/switch' }
      ]
    },
    {
      title: 'Layout & Nav',
      icon: <Layout className="w-5 h-5 text-fuchsia-500 flex-shrink-0" />,
      items: [
        { name: 'Menu', path: '/components/menu' },
        { name: 'Tabs', path: '/components/tabs' },
        { name: 'Header', path: '/components/header' },
        { name: 'Sidebar', path: '/components/sidebar' }
      ]
    },
    {
      title: 'Feedback',
      icon: <MessageSquare className="w-5 h-5 text-rose-500 flex-shrink-0" />,
      items: [
        { name: 'Toast', path: '/components/toast', badge: 'Hot', badgeColor: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400' },
        { name: 'Modal', path: '/components/modal' },
        { name: 'Popover', path: '/components/popover' },
        { name: 'Tooltip', path: '/components/tooltip' }
      ]
    },
    {
      title: 'Advanced',
      icon: <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0" />,
      items: [
        { name: 'Combobox', path: '/components/combobox', badge: 'New', badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' },
        { name: 'Calendar', path: '/components/calendar' },
        { name: 'Date Picker', path: '/components/date-picker', badge: 'New', badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' },
        { name: 'Number Input', path: '/components/number-input' }
      ]
    }
  ];

  const navigateToComponent = (path: string) => {
    navigate(path);
    setSidebarOpen(true);
  };

  return (
    <div className="animate-in fade-in duration-700 max-w-6xl mx-auto space-y-16 md:space-y-24 pb-20 px-4 sm:px-6">

      {/* 1. Hero Section */}
      <section className="text-center space-y-6 pt-16 lg:pt-24 pb-8 relative flex flex-col items-center justify-center">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-4xl h-80 bg-gradient-to-tr from-indigo-500/30 via-purple-500/20 to-cyan-400/20 blur-[130px] rounded-[100%] pointer-events-none -z-10 mix-blend-screen dark:mix-blend-lighten"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600/30 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-violet-600/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
          className="rounded-full p-[1px] bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-cyan-400/50 shadow-sm mb-4 backdrop-blur-md"
        >
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-background/80 text-foreground text-sm font-bold backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">MyUI version 1.0 is here</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative text-center w-full max-w-5xl mx-auto"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-extrabold tracking-tight text-foreground leading-[1.1] relative z-10 px-2 drop-shadow-sm">
            Stop fighting with CSS. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 filter drop-shadow-sm pb-2 inline-block">Start building features.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium px-4"
        >
          Top-tier React components designed to be flexible, predictable, easy to use, and exceptionally beautiful right out of the box.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 w-full max-w-md mx-auto"
        >
          <Button
            className="relative w-full sm:flex-1 h-14 px-8 text-lg font-bold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-2xl shadow-[0_0_40px_-10px_rgba(99,102,241,0.4)] dark:shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)] hover:shadow-[0_0_60px_-15px_rgba(99,102,241,0.6)] dark:hover:shadow-[0_0_60px_-10px_rgba(99,102,241,0.8)] hover:-translate-y-1 transition-all duration-300 ring-1 ring-white/30 overflow-hidden group"
            onClick={() => {
              navigate('/introduction');
              setSidebarOpen(true);
            }}
          >
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 ease-in-out -translate-x-full skew-x-12"></div>
            <span className="relative z-10 flex items-center justify-center">
              Get Started
              <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>

          <a
            href="https://github.com/tetetee/myui"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 h-14 px-6 text-lg font-bold inline-flex items-center justify-center bg-card/50 backdrop-blur-md border border-border border-gray-200 dark:border-gray-600 hover:border-indigo-500/50 hover:bg-card text-foreground rounded-2xl transition-all shadow-sm hover:shadow-indigo-500/10 hover:-translate-y-0.5"
          >
            <Github className="w-5 h-5 mr-3" />
            <span className="whitespace-nowrap">Star us</span>
            <div className="ml-3 pl-3 border-l-2 border-border flex items-center text-sm font-semibold text-muted-foreground">
              <Star className="w-4 h-4 mr-1 text-amber-400 fill-amber-400 drop-shadow-sm" />
              1.2k
            </div>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="pt-10 w-full max-w-lg mx-auto"
        >
          <InstallTabs />
        </motion.div>
      </section>

      {/* 2. Interactive Quick Usage Example */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Quick Usage Example
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 px-4">
            Incredibly easy to use. Just wrap your app with the Provider and you can start using powerful components like Toast immediately.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch">
          {/* Code View */}
          <div className="bg-[#111118]/90 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 dark:border-indigo-500/20 flex flex-col h-full ring-1 ring-white/5">
            <div className="flex items-center justify-between px-5 py-4 bg-black/40 border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-rose-500/90 shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-amber-400/90 shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/90 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              </div>
              <div className="text-xs text-indigo-300/60 font-mono font-bold tracking-widest uppercase">App.tsx</div>
              <button
                onClick={() => handleCopyCode(usageCode, 'usage')}
                className="text-gray-500 hover:text-indigo-300 transition-colors"
                title="Copy code"
              >
                {hasCopiedCode === 'usage' ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <div className="p-8 overflow-x-auto custom-scrollbar flex-1">
              <SimpleHighlighter code={usageCode} />
            </div>
          </div>

          {/* Live Preview Playground */}
          <div className="bg-card/40 backdrop-blur-2xl rounded-[2rem] border border-white/20 dark:border-indigo-500/20 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col group min-h-[400px]">
            <div className="px-5 py-4 border-b border-border/50 bg-background/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-indigo-500" />
                <span className="text-sm font-bold text-gray-700 dark:text-zinc-300 tracking-tight">Interactive Playground</span>
              </div>
              <div className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
                Live
              </div>
            </div>
            <div className="flex-1 p-10 flex flex-col items-center justify-center bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] relative">
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>

              <div className="relative z-10 p-10 bg-card/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-white/5 ring-1 ring-white/10 dark:ring-indigo-500/20 flex flex-col items-center text-center max-w-xs w-full">
                <div className="w-16 h-16 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 rounded-full flex items-center justify-center mb-6 shadow-[inset_0_2px_10px_rgba(99,102,241,0.2)]">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">MyUI App</h3>
                <p className="text-sm text-muted-foreground mb-8 font-medium">Click the button below to trigger the interactive toast component.</p>
                <Button
                  onClick={() => toast.success('It works! 🎉', {
                    description: 'This is a live interactive proof of the ease of use.',
                    classNames: {
                      toast: 'group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border shadow-xl',
                    }
                  })}
                  className="w-full h-12 text-base font-bold rounded-xl shadow-lg shadow-indigo-500/25 bg-indigo-600 hover:bg-indigo-700 text-white transition-all hover:scale-105 active:scale-95"
                >
                  Click me
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Features Grid */}
      <section className="space-y-10">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white text-center">
          Why choose MyUI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, delay: 0.1 + (i * 0.1) }}
              className="bg-card/40 backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] shadow-lg border border-white/10 dark:border-white/5 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/50 transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ring-1 ring-white/20 shadow-[inset_0_2px_10px_rgba(255,255,255,0.2)]`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Recommended Components */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Featured Components
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 px-4">
            Browse through an organized collection of ready-to-use components perfectly crafted for your next project.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {componentCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
              className="bg-card/30 backdrop-blur-xl rounded-[2rem] p-8 border border-gray-200 dark:border-gray-600 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group"
            >
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-border/50">
                <div className="p-2.5 bg-background/50 rounded-xl ring-1 ring-border shadow-inner">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-extrabold text-foreground tracking-tight">{cat.title}</h3>
              </div>
              <ul className="space-y-1">
                {cat.items.map((item, j) => (
                  <li key={j}>
                    <button
                      onClick={() => navigateToComponent(item.path)}
                      className="w-full text-left group flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                    >
                      <span className="flex items-center gap-3 text-[15px] font-semibold text-gray-600 dark:text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        <ChevronRight className="w-3.5 h-3.5 opacity-0 -ml-2 transition-all group-hover:opacity-100 group-hover:ml-0 text-indigo-500" />
                        {item.name}
                      </span>
                      {item.badge && (
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Footer CTA */}
      <section className="relative py-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-500/5 dark:to-indigo-500/10 rounded-[3rem] pointer-events-none"></div>
        <div className="bg-card/40 backdrop-blur-3xl rounded-[3rem] p-10 md:p-24 text-center relative overflow-hidden shadow-2xl border border-white/10 dark:border-white/5">
          
          {/* Animated Background Gradients */}
          <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-br from-indigo-500/30 to-purple-500/30 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none transform translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition-transform duration-700"></div>
          <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none transform -translate-x-1/3 translate-y-1/3 group-hover:scale-110 transition-transform duration-700"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center justify-center p-4 bg-background/50 rounded-2xl ring-1 ring-border shadow-inner mb-4">
              <Sparkles className="w-8 h-8 text-indigo-500" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight drop-shadow-sm">
              Ready to dive in?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
              Experience fast, beautiful UI development. Get started for free today and build exceptional web applications.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8">
              <Button
                onClick={() => {
                  navigate('/quickstart');
                  setSidebarOpen(true);
                }}
                className="w-full sm:w-auto h-16 px-10 text-xl font-bold bg-foreground text-background hover:bg-foreground/90 rounded-2xl shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Start building
                <ChevronRight className="w-6 h-6 ml-2" />
              </Button>
              <Button
                onClick={() => {
                  navigate('/components');
                  setSidebarOpen(true);
                }}
                className="w-full sm:w-auto h-16 px-10 text-xl font-bold bg-card/60 hover:bg-card text-foreground rounded-2xl backdrop-blur-md border border-border hover:border-indigo-500/50 transition-all shadow-sm hover:shadow-indigo-500/10"
              >
                Browse Components
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
