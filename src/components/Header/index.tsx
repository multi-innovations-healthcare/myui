import React, { useEffect, useState } from 'react';
import { PanelLeftOpen, PanelLeftClose, Search, Sun, Moon, Github } from 'lucide-react';

export interface HeaderProps {
  title?: string;
  logo?: React.ReactNode;
  isSidebarOpen?: boolean;
  theme?: 'light' | 'dark';
  isHomePage?: boolean;
  onMenuClick?: () => void;
  onThemeToggle?: (event: React.MouseEvent) => void;
  onLogoClick?: () => void;
  onDocsClick?: () => void;
  onComponentsClick?: () => void;
  onSearch?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  logo,
  isSidebarOpen,
  isHomePage,
  theme = 'light',
  onThemeToggle,
  onSearch,
  onLogoClick,
  onDocsClick,
  onComponentsClick,
}) => {
  const [scrolled, setScrolled] = useState(false);

  // Keyboard shortcut: Ctrl/Cmd+K → search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onSearch?.();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onSearch]);

  // Track scroll to collapse hero header
  useEffect(() => {
    if (!isHomePage) {
      const t = setTimeout(() => setScrolled(false), 0);
      return () => clearTimeout(t);
    }
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHomePage]);

  const isHero = isHomePage && !scrolled;

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-[9999] w-full
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isHero
          ? 'bg-background/40 backdrop-blur-2xl border-b border-gray-200 dark:border-gray-600'
          : 'bg-background/80 backdrop-blur-2xl border-b border-gray-200 dark:border-gray-600 shadow-sm shadow-black/5 dark:shadow-[0_1px_30px_rgba(0,0,0,0.12)]'
        }
      `}
    >
      {/* Subtle gradient line at the very top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent pointer-events-none" />

      <div
        className={`
          flex items-center justify-between w-full px-4 sm:px-6 lg:px-8
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isHero ? 'h-[72px]' : 'h-16'}
        `}
      >
        {/* ─── Left ─── */}
        <div className="flex items-center gap-2">

          {/* Sidebar toggle */}
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="p-2 -ml-2 text-muted-foreground rounded-xl hover:bg-primary/10 hover:text-primary transition-all active:scale-95"
              aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {isSidebarOpen
                ? <PanelLeftClose className="w-5 h-5 flex-shrink-0" />
                : <PanelLeftOpen className="w-5 h-5 flex-shrink-0" />
              }
            </button>
          )}

          {/* Logo + Brand — always visible since header is fixed */}
          <button
            onClick={onLogoClick}
            className="flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl transition-all duration-300 active:scale-95 group"
            aria-label="Go to Home"
          >
              {logo ?? (
                <div
                  className={`
                    relative rounded-xl flex items-center justify-center
                    bg-gradient-to-br from-indigo-500 to-purple-600
                    shadow-lg shadow-indigo-500/25
                    group-hover:shadow-indigo-500/50 group-hover:scale-105
                    transition-all duration-300
                    ${isHero ? 'w-10 h-10' : 'w-8 h-8'}
                  `}
                >
                  {/* Inner highlight */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                  <span className={`relative text-white font-black ${isHero ? 'text-base' : 'text-sm'}`}>M</span>
                </div>
              )}

              <div className="flex flex-col leading-none">
                <span
                  className={`
                    font-black text-foreground tracking-tight
                    transition-all duration-300 group-hover:text-primary
                    ${isHero ? 'text-xl' : 'text-base'}
                  `}
                >
                 MyUI
                </span>
              </div>

              {/* Beta badge */}
              {isHero && (
                <span className="hidden sm:inline-flex items-center h-5 px-2 rounded-full text-[9px] font-black bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 tracking-wider uppercase">
                  beta
                </span>
              )}
            </button>

          {/* Nav links (Home page only) */}
          {isHomePage && !isSidebarOpen && (
            <nav
              className={`
                hidden md:flex items-center gap-1
                border-l border-border/40 ml-3
                transition-all duration-300
                ${isHero ? 'pl-5 h-9 gap-5' : 'pl-4 h-6 gap-4'}
              `}
            >
              <button
                onClick={onDocsClick}
                className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                Docs
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
              <button
                onClick={onComponentsClick}
                className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                Components
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            </nav>
          )}
        </div>

        {/* ─── Right ─── */}
        <div className="flex items-center gap-1.5 sm:gap-2">

          {/* Search Bar */}
          <div className="hidden sm:block">
            <button
              onClick={onSearch}
              className={`
                flex items-center gap-2.5 px-3 py-2 rounded-xl text-left
                border transition-all duration-300
                hover:border-indigo-500/50 group
                ${isHero
                  ? 'border-border/50 border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 w-56 lg:w-72'
                  : 'border-border border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 w-44 md:w-56 lg:w-64'
                }
              `}
            >
              <Search className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              <span className="flex-1 text-sm text-muted-foreground truncate">Search...</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded-md border border-border/70 border-gray-400 dark:border-gray-600 bg-background/80 px-1.5 font-mono text-[10px] text-muted-foreground">
                ⌃K
              </kbd>
            </button>
          </div>

          {/* Mobile search icon */}
          <button
            onClick={onSearch}
            className="sm:hidden p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Divider */}
          <div className="hidden sm:block w-px h-5 bg-border/60 mx-1" />

          {/* Theme Toggle */}
          {onThemeToggle && (
            <button
              onClick={onThemeToggle}
              className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark'
                ? <Moon className="w-4.5 h-4.5 animate-in zoom-in-50 duration-300" />
                : <Sun className="w-5 h-5 animate-in zoom-in-50 duration-300" />
              }
            </button>
          )}

          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-card/80 rounded-xl transition-all"
            aria-label="GitHub Repository"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
