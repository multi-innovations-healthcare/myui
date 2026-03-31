import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownItem {
  value: string;
  label: React.ReactNode;
}

export interface DropdownProps {
  items: DropdownItem[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ items, value, onChange, placeholder = 'Select...', className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedItem = items.find(item => item.value === value);

  return (
    <div className={cn("relative inline-block w-full", className)} ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <span className={cn("block truncate font-medium", !selectedItem ? "text-gray-400 dark:text-zinc-500" : "text-gray-900 dark:text-zinc-50")}>
          {selectedItem ? selectedItem.label : placeholder}
        </span>
        <ChevronDown className={cn("w-4 h-4 ml-3 text-gray-500 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      <div className={cn(
        "absolute z-[100] w-full mt-2 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl shadow-xl transition-all duration-200 origin-top",
        isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-95 pointer-events-none"
      )}>
        <div className="py-1.5 max-h-60 overflow-y-auto custom-scrollbar">
          {items.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                onChange?.(item.value);
                setIsOpen(false);
              }}
              className={cn(
                "w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between",
                value === item.value 
                  ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold" 
                  : "text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 font-medium"
              )}
            >
              {item.label}
              {value === item.value && (
                <Check className="w-4 h-4" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
