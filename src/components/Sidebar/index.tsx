import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';

export interface SidebarItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
  subItems?: {
    label: string;
    href?: string;
    active?: boolean;
  }[];
}

export interface SidebarProps {
  items: SidebarItem[];
  isOpen?: boolean;
  onItemClick?: (item: { label: string; href?: string }) => void;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ items, isOpen = false, onItemClick, onClose }) => {
  const location = useLocation();
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    // Initial expansion state
    const initial: Record<string, boolean> = {};
    items.forEach(item => {
      if (item.subItems?.some(s => s.href && location.pathname === s.href)) {
        initial[item.label] = true;
      }
    });
    return initial;
  });

  const [prevPathname, setPrevPathname] = useState(location.pathname);

  // Sync state if pathname changes (derived state)
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    
    const needsExpand: Record<string, boolean> = {};
    let changed = false;

    items.forEach(item => {
      if (item.subItems?.some(s => s.href && location.pathname === s.href)) {
        if (!expanded[item.label]) {
          needsExpand[item.label] = true;
          changed = true;
        }
      }
    });

    if (changed) {
      setExpanded(prev => ({ ...prev, ...needsExpand }));
    }
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-16 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed top-16 left-0 h-[calc(100dvh-4rem)] bg-background/80 backdrop-blur-xl border-r border-border border-gray-200 dark:border-gray-800 shadow-[10px_0_40px_-10px_rgba(0,0,0,0.05)] dark:shadow-2xl lg:shadow-none transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-50 flex flex-col
          ${isOpen ? 'w-72 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}`}
      >
        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {items.map((item, index) => {
            const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);
            const isExpanded = expanded[item.label];

            // If it's just a regular link
            if (!hasSubItems) {
              return (
                <NavLink
                  key={index}
                  to={item.href || '#'}
                  onClick={(e) => {
                    if (!item.href || item.href === '#') e.preventDefault();
                    onItemClick?.(item);
                  }}
                  title={!isOpen ? item.label : undefined}
                  className={({ isActive }) => `flex items-center gap-3.5 px-3 py-3 rounded-xl transition-all duration-200 group relative
                    ${isActive
                      ? 'bg-primary/10 text-primary font-medium shadow-[inset_0_2px_10px_rgba(99,102,241,0.05)]'
                      : 'text-muted-foreground hover:bg-card/50 hover:text-foreground'
                    }`}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-primary rounded-r-full" />
                      )}
                      <span className={`relative flex items-center justify-center w-6 h-6 shrink-0 transition-colors duration-200 
                        ${isActive ? 'text-primary' : 'text-muted-foreground opacity-70 group-hover:opacity-100 group-hover:text-foreground'}`}>
                        {item.icon}
                      </span>
                      <span className={`whitespace-nowrap transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:hidden opacity-0'}`}>
                        {item.label}
                      </span>
                    </>
                  )}
                </NavLink>
              );
            }

            // It's a category with sub-items
            return (
              <div key={index} className="space-y-1 relative" title={!isOpen ? item.label : undefined}>
                <button
                  onClick={() => setExpanded(prev => ({ ...prev, [item.label]: !prev[item.label] }))}
                  className={`w-full flex items-center justify-between gap-3.5 px-3 py-3 rounded-xl transition-all duration-200 group
                    text-muted-foreground hover:bg-card/50 hover:text-foreground
                  `}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="flex items-center justify-center w-6 h-6 shrink-0 text-muted-foreground opacity-70 group-hover:opacity-100 group-hover:text-foreground transition-colors">
                      {item.icon}
                    </span>
                    <span className={`whitespace-nowrap transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:hidden opacity-0'}`}>
                      {item.label}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-300 text-muted-foreground opacity-50 
                      ${isExpanded ? 'rotate-180' : ''} 
                      ${isOpen ? 'opacity-100' : 'lg:hidden opacity-0'}`}
                  />
                </button>

                {/* Sub items dropdown */}
                <AnimatePresence>
                  {isExpanded && isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-12 pr-3 py-1 flex flex-col gap-1 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-px before:bg-border/50">
                        {item.subItems?.map((sub, sIdx) => (
                          <NavLink
                            key={sIdx}
                            to={sub.href || '#'}
                            onClick={(e) => {
                              if (!sub.href || sub.href === '#') e.preventDefault();
                              onItemClick?.(sub);
                            }}
                            className={({ isActive }) => `py-2 px-3 rounded-lg text-sm font-medium transition-colors relative
                              ${isActive
                                ? 'text-primary bg-primary/10'
                                : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                              }
                            `}
                          >
                            {({ isActive }) => (
                              <>
                                {isActive && (
                                  <motion.span 
                                    layoutId="subitem-active"
                                    className="absolute -left-[1.625rem] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary ring-4 ring-background" 
                                  />
                                )}
                                {sub.label}
                              </>
                            )}
                          </NavLink>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
