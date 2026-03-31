import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Component, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { NAVIGATION_ITEMS } from '../../constants/navigation';

export default function SearchModal() {
  const { isSearchOpen, setSearchOpen, setSidebarOpen } = useAppStore();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Extract all searchable items from NAVIGATION_ITEMS
  const searchItems = React.useMemo(() => {
    const items: { label: string; href: string; type: 'Page' | 'Component'; icon: React.ReactNode }[] = [];
    NAVIGATION_ITEMS.forEach(category => {
      const type = category.label === 'Components' ? 'Component' : 'Page';
      const icon = category.label === 'Components' ? <Component className="w-4 h-4" /> : <FileText className="w-4 h-4" />;

      if (category.href) {
        items.push({ label: category.label, href: category.href, type, icon });
      }
      if (category.subItems) {
        category.subItems.forEach(sub => {
          if (sub.href) items.push({ label: sub.label, href: sub.href, type, icon });
        });
      }
    });
    return items;
  }, []);

  const filteredItems = React.useMemo(() => {
    if (!query.trim()) return searchItems;
    const lowerQuery = query.toLowerCase();
    return searchItems.filter(item => item.label.toLowerCase().includes(lowerQuery));
  }, [query, searchItems]);

  const groupedItems = React.useMemo(() => {
    return {
      Pages: filteredItems.filter(item => item.type === 'Page'),
      Components: filteredItems.filter(item => item.type === 'Component'),
    };
  }, [filteredItems]);

  const handleSelect = (href: string) => {
    navigate(href);
    setSearchOpen(false);
    // Expand sidebar if navigating to components or pages that typically need it
    if (href !== '/') setSidebarOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSearchOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 overflow-x-hidden flex items-start justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="max-w-2xl w-full bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl ring-1 ring-gray-200 dark:ring-zinc-800 pointer-events-auto overflow-hidden flex flex-col max-h-[80vh]"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 dark:border-zinc-800/80">
                <Search className="w-5 h-5 text-gray-400 dark:text-zinc-500 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search documentation and components..."
                  className="flex-1 bg-transparent border-0 focus:ring-0 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 text-lg outline-none w-full"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                {filteredItems.length === 0 ? (
                  <div className="py-14 text-center text-gray-500 dark:text-zinc-400 text-sm">
                    No results found for "<span className="text-gray-900 dark:text-zinc-200">{query}</span>"
                  </div>
                ) : (
                  <div className="space-y-4 p-2">
                    {/* Pages Group */}
                    {groupedItems.Pages.length > 0 && (
                      <div>
                        <div className="px-3 text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                          Pages
                        </div>
                        <div className="space-y-1">
                          {groupedItems.Pages.map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSelect(item.href)}
                              className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-gray-700 dark:text-zinc-300 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group text-left"
                            >
                              <div className="flex items-center gap-3">
                                <span className="p-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                  {item.icon}
                                </span>
                                <span className="font-medium">{item.label}</span>
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-300 dark:text-zinc-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Components Group */}
                    {groupedItems.Components.length > 0 && (
                      <div className={groupedItems.Pages.length > 0 ? "pt-2 border-t border-gray-100 dark:border-zinc-800/80" : ""}>
                        <div className="px-3 text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-2 mt-2">
                          Components
                        </div>
                        <div className="space-y-1">
                          {groupedItems.Components.map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSelect(item.href)}
                              className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-gray-700 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors group text-left"
                            >
                              <div className="flex items-center gap-3">
                                <span className="p-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                  {item.icon}
                                </span>
                                <span className="font-medium">{item.label}</span>
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-300 dark:text-zinc-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="px-4 py-3 border-t border-gray-100 dark:border-zinc-800/80 bg-gray-50/50 dark:bg-zinc-900/50 flex items-center gap-4 text-xs text-gray-500 dark:text-zinc-500">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono text-[10px]">ESC</kbd>
                  to close
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono text-[10px]">Enter</kbd>
                  to select
                </span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
