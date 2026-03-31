import React from 'react';
import { ChevronRight, MoreHorizontal } from 'lucide-react';

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  className?: string;
  onNavigate?: (href: string, e: React.MouseEvent) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = <ChevronRight className="w-3.5 h-3.5 shrink-0 text-gray-400 dark:text-zinc-500" />,
  maxItems,
  className = '',
  onNavigate,
}) => {
  const [collapsed, setCollapsed] = React.useState(
    maxItems !== undefined && items.length > maxItems
  );

  const displayedItems = React.useMemo(() => {
    if (!collapsed || maxItems === undefined || items.length <= maxItems) {
      return items;
    }
    const visibleEnd = Math.max(maxItems - 1, 1);
    return [
      items[0],
      { label: '...', href: undefined } as BreadcrumbItem,
      ...items.slice(items.length - visibleEnd),
    ];
  }, [collapsed, items, maxItems]);

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center ${className}`}>
      <ol className="flex items-center gap-1 flex-wrap text-sm">
        {displayedItems.map((item, idx) => {
          const isLast = idx === displayedItems.length - 1;
          const isEllipsis = item.label === '...';

          return (
            <li key={idx} className="flex items-center gap-1">
              {isEllipsis ? (
                <button
                  onClick={() => setCollapsed(false)}
                  className="inline-flex items-center px-2 py-0.5 rounded-md text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-zinc-100 transition-colors"
                  aria-label="Show all breadcrumb items"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              ) : isLast || !item.href ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md font-medium ${
                    isLast
                      ? 'text-gray-900 dark:text-zinc-50 bg-gray-100 dark:bg-zinc-800'
                      : 'text-gray-500 dark:text-zinc-400'
                  }`}
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  onClick={onNavigate ? (e) => { e.preventDefault(); onNavigate(item.href!, e); } : undefined}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  {item.label}
                </a>
              )}
              {!isLast && (
                <span className="pointer-events-none select-none flex items-center">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
