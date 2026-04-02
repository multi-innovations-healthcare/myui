import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../../constants/navigation';

const FooterNavigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const allRoutes = NAVIGATION_ITEMS.flatMap(item => {
    if (item.subItems) {
      return item.subItems.map(sub => ({
        label: sub.label,
        href: sub.href
      }));
    }
    return item.href ? [{ label: item.label, href: item.href }] : [];
  }).filter(route => route.href);

  const currentIndex = allRoutes.findIndex(route => route.href === currentPath);

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? allRoutes[currentIndex - 1] : null;
  const next = currentIndex < allRoutes.length - 1 ? allRoutes[currentIndex + 1] : null;

  return (
    <div className="mt-16 pt-10 border-t border-zinc-200 dark:border-zinc-800 lg:pr-72 xl:pr-80">
      <div className="flex flex-col items-center gap-10">

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Previous */}
          {prev ? (
            <Link
              to={prev.href!}
              className="group relative flex flex-col gap-3 p-8 rounded-3xl 
                         bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl 
                         border border-zinc-200 dark:border-zinc-700 
                         hover:border-indigo-400 dark:hover:border-indigo-500
                         shadow-lg hover:shadow-2xl hover:shadow-indigo-500/20 
                         active:scale-[0.985] transition-all duration-300 overflow-hidden"
            >
              {/* Glass hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span className="text-xs font-bold text-muted-foreground uppercase tracking-[2px] flex items-center gap-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                PREVIOUS
              </span>
              <span className="text-2xl font-extrabold text-foreground tracking-tighter leading-tight group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                {prev.label}
              </span>
            </Link>
          ) : (
            <div className="flex flex-col gap-3 p-8 rounded-3xl bg-white/30 dark:bg-zinc-900/30 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-700/50 opacity-50 cursor-not-allowed">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-[2px] flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                PREVIOUS
              </span>
              <span className="text-2xl font-extrabold text-muted-foreground tracking-tighter">First Page</span>
            </div>
          )}

          {/* Next */}
          {next ? (
            <Link
              to={next.href!}
              className="group relative flex flex-col gap-3 p-8 rounded-3xl text-right
                         bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl 
                         border border-zinc-200 dark:border-zinc-700 
                         hover:border-indigo-400 dark:hover:border-indigo-500
                         shadow-lg hover:shadow-2xl hover:shadow-indigo-500/20 
                         active:scale-[0.985] transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span className="text-xs font-bold text-muted-foreground uppercase tracking-[2px] flex items-center gap-2 justify-end group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                NEXT
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="text-2xl font-extrabold text-foreground tracking-tighter leading-tight group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                {next.label}
              </span>
            </Link>
          ) : (
            <div className="flex flex-col gap-3 p-8 rounded-3xl text-right bg-white/30 dark:bg-zinc-900/30 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-700/50 opacity-50 cursor-not-allowed">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-[2px] flex items-center gap-2 justify-end">
                NEXT
                <ChevronRight className="w-4 h-4" />
              </span>
              <span className="text-2xl font-extrabold text-muted-foreground tracking-tighter">End of Docs</span>
            </div>
          )}
        </div>

        {/* GitHub Button - Premium Gradient */}
        <a
          href="https://github.com/multi-innovations-healthcare/myui"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center gap-3 px-8 h-14 rounded-2xl 
                     bg-gradient-to-r from-zinc-900 to-black hover:from-zinc-800 hover:to-zinc-950
                     text-white font-semibold tracking-tight shadow-2xl shadow-zinc-950/70 
                     active:scale-95 transition-all duration-300 overflow-hidden border border-zinc-700 hover:border-zinc-500"
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:-translate-x-0 transition-transform duration-700" />

          <Github className="w-5 h-5" />
          <span>Edit this page on GitHub</span>
          <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
        </a>

      </div>
    </div>
  );
};

export default FooterNavigation;