import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export interface NavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: Omit<NavItem, 'children'>[];
  onClick?: () => void;
}

export interface NavbarProps {
  logo?: React.ReactNode;
  items?: NavItem[];
  actions?: React.ReactNode;
  sticky?: boolean;
  bordered?: boolean;
  transparent?: boolean;
  className?: string;
  onNavigate?: (href: string, e: React.MouseEvent) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  items = [],
  actions,
  sticky = false,
  bordered = true,
  transparent = false,
  className = '',
  onNavigate,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!sticky) return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sticky]);

  const handleNav = (href?: string, onClick?: () => void, e?: React.MouseEvent) => {
    if (onClick) onClick();
    if (href && e && onNavigate) {
      e.preventDefault();
      onNavigate(href, e);
    }
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const navBg = transparent && !scrolled
    ? 'bg-transparent'
    : 'bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md';

  const navBorder = bordered
    ? (scrolled || !transparent)
      ? 'border-b border-gray-200 dark:border-zinc-800'
      : 'border-b border-transparent'
    : '';

  return (
    <nav
      role="navigation"
      className={`w-full transition-all duration-300 ${sticky ? 'sticky top-0 z-50' : ''} ${navBg} ${navBorder} ${scrolled ? 'shadow-sm' : ''} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {logo && <div className="flex items-center shrink-0">{logo}</div>}

          <div className="hidden md:flex items-center gap-1">
            {items.map((item) => (
              <div key={item.label} className="relative">
                {item.children ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      className="group inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {item.icon && <span>{item.icon}</span>}
                      {item.label}
                      <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === item.label && (
                      <div
                        className="absolute top-full left-0 mt-1 w-52 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-gray-200 dark:border-zinc-700 p-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        {item.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href ?? '#'}
                            onClick={(e) => handleNav(child.href, child.onClick, e)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-zinc-300 hover:bg-indigo-50 dark:hover:bg-zinc-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          >
                            {child.icon && <span>{child.icon}</span>}
                            {child.label}
                            {child.badge !== undefined && (
                              <span className="ml-auto text-[10px] font-bold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded-full">
                                {child.badge}
                              </span>
                            )}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={item.href ?? '#'}
                    onClick={(e) => handleNav(item.href, item.onClick, e)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {item.icon && <span>{item.icon}</span>}
                    {item.label}
                    {item.badge !== undefined && (
                      <span className="text-[10px] font-bold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {actions && <div className="hidden md:flex items-center gap-2">{actions}</div>}
            {items.length > 0 && (
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3 space-y-1 animate-in slide-in-from-top-4 duration-300">
          {items.map((item) => (
            <React.Fragment key={item.label}>
              <a
                href={item.href ?? '#'}
                onClick={(e) => handleNav(item.href, item.onClick, e)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {item.icon && <span>{item.icon}</span>}
                {item.label}
                {item.badge !== undefined && (
                  <span className="ml-auto text-[10px] font-bold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </a>
              {item.children?.map((child) => (
                <a
                  key={child.label}
                  href={child.href ?? '#'}
                  onClick={(e) => handleNav(child.href, child.onClick, e)}
                  className="flex items-center gap-2 px-3 py-2 ml-4 rounded-xl text-sm text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {child.icon && <span>{child.icon}</span>}
                  {child.label}
                </a>
              ))}
            </React.Fragment>
          ))}
          {actions && <div className="pt-3 border-t border-gray-100 dark:border-zinc-800 flex flex-col gap-2">{actions}</div>}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
