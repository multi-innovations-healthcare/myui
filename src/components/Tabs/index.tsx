import React, { useState, useRef, useEffect } from 'react';

export type TabVariant = 'line' | 'enclosed' | 'pills' | 'soft-rounded';
export type TabSize = 'sm' | 'default' | 'lg';

export interface TabItem {
  key: string;
  label: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

export interface TabsProps {
  items: TabItem[];
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (key: string) => void;
  variant?: TabVariant;
  size?: TabSize;
  centered?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const sizeMap: Record<TabSize, string> = {
  sm: 'text-xs px-3 py-1.5 gap-1.5',
  default: 'text-sm px-4 py-2.5 gap-2',
  lg: 'text-base px-5 py-3 gap-2.5',
};

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveKey,
  activeKey: controlledKey,
  onChange,
  variant = 'line',
  size = 'default',
  centered = false,
  fullWidth = false,
  className = '',
}) => {
  const [internalKey, setInternalKey] = useState(
    defaultActiveKey ?? items.find(i => !i.disabled)?.key ?? ''
  );
  const activeKey = controlledKey ?? internalKey;
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleChange = (key: string) => {
    setInternalKey(key);
    onChange?.(key);
  };

  useEffect(() => {
    if (variant !== 'line') return;
    const el = tabRefs.current[activeKey];
    if (el) {
      setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [activeKey, variant]);

  const getTabStyle = (item: TabItem) => {
    const isActive = activeKey === item.key;
    const base = `relative inline-flex items-center font-medium transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 rounded-md ${sizeMap[size]}`;
    const disabledStyle = item.disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer';

    switch (variant) {
      case 'line':
        return `${base} ${disabledStyle} ${isActive
          ? 'text-indigo-600 dark:text-indigo-400'
          : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100'
        }`;
      case 'enclosed':
        return `${base} ${disabledStyle} border-x border-t ${isActive
          ? 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700 -mb-px text-gray-900 dark:text-zinc-50 rounded-t-lg rounded-b-none'
          : 'bg-transparent border-transparent text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-300 rounded-t-lg rounded-b-none'
        }`;
      case 'pills':
        return `${base} ${disabledStyle} ${isActive
          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
          : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800'
        } rounded-lg`;
      case 'soft-rounded':
        return `${base} ${disabledStyle} ${isActive
          ? 'bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300'
          : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800'
        } rounded-full`;
      default:
        return `${base} ${disabledStyle}`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = -1;
    if (e.key === 'ArrowRight') nextIndex = (index + 1) % items.length;
    if (e.key === 'ArrowLeft') nextIndex = (index - 1 + items.length) % items.length;

    if (nextIndex !== -1) {
      e.preventDefault();
      const nextItem = items[nextIndex];
      if (!nextItem.disabled) {
        handleChange(nextItem.key);
        tabRefs.current[nextItem.key]?.focus();
      }
    }
  };

  const navClassName = `flex items-center gap-0.5 ${centered ? 'justify-center' : ''} ${fullWidth ? 'w-full' : ''}`;

  return (
    <div className={`w-full ${className}`}>
      <div className={`relative ${variant === 'line' || variant === 'enclosed' ? 'border-b border-gray-200 dark:border-zinc-700' : ''}`}>
        <div className="overflow-x-auto scrollbar-none custom-scrollbar">
          <div className={navClassName} role="tablist">
            {items.map((item, idx) => (
              <button
                key={item.key}
                ref={el => { tabRefs.current[item.key] = el; }}
                role="tab"
                aria-selected={activeKey === item.key}
                aria-disabled={item.disabled}
                tabIndex={activeKey === item.key ? 0 : -1}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onClick={() => !item.disabled && handleChange(item.key)}
                className={`${getTabStyle(item)} ${fullWidth ? 'flex-1 justify-center' : ''}`}
              >
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                {item.label}
                {item.badge !== undefined && (
                  <span className="ml-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
            {variant === 'line' && (
              <span
                className="absolute bottom-0 h-[2px] bg-indigo-600 dark:bg-indigo-400 rounded-full transition-all duration-300 ease-in-out"
                style={indicatorStyle}
              />
            )}
          </div>
        </div>
      </div>
      <div className="mt-4" role="tabpanel">
        {items.find(i => i.key === activeKey)?.children}
      </div>
    </div>
  );
};

export default Tabs;
