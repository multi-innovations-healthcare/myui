import * as React from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import {
  ChevronDown,
  Check,
  Search,
  Loader2,
  X,
  Plus,
} from "lucide-react";

/* ─── Types ─── */
export interface ComboboxOption {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[] | undefined) => void;
  onSearch?: (query: string) => void;
  onCreate?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  mode?: "single" | "multiple";
  allowCreate?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  debounceMs?: number;
}

/* ─── Component ─── */
const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      options = [],
      value,
      defaultValue,
      onChange,
      onSearch,
      onCreate,
      placeholder = "Select...",
      searchPlaceholder = "Search...",
      emptyText = "No results found",
      mode = "single",
      allowCreate = false,
      loading = false,
      disabled = false,
      className,
      debounceMs = 300,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [highlightIdx, setHighlightIdx] = React.useState(0);
    const [selected, setSelected] = React.useState<string[]>(() => {
      const init = value ?? defaultValue;
      if (!init) return [];
      return Array.isArray(init) ? init : [init];
    });

    const inputRef = React.useRef<HTMLInputElement>(null);
    const listRef = React.useRef<HTMLDivElement>(null);
    const debounceRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);

    // sync external value
    React.useEffect(() => {
      if (value !== undefined) {
        setSelected(Array.isArray(value) ? value : [value]);
      }
    }, [value]);

    // filter options
    const filtered = React.useMemo(
      () =>
        options.filter((o) =>
          o.label.toLowerCase().includes(search.toLowerCase())
        ),
      [options, search]
    );

    // clamp highlight
    React.useEffect(() => {
      setHighlightIdx(0);
    }, [search, filtered.length]);

    // debounced onSearch
    const handleSearchChange = (val: string) => {
      setSearch(val);
      if (onSearch) {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => onSearch(val), debounceMs);
      }
    };

    // select / toggle
    const handleSelect = (optValue: string) => {
      let next: string[];
      if (mode === "multiple") {
        next = selected.includes(optValue)
          ? selected.filter((v) => v !== optValue)
          : [...selected, optValue];
      } else {
        next = [optValue];
        setOpen(false);
        setSearch("");
      }
      setSelected(next);
      onChange?.(mode === "multiple" ? next : next[0]);
    };

    const removeTag = (e: React.MouseEvent, val: string) => {
      e.stopPropagation();
      const next = selected.filter((v) => v !== val);
      setSelected(next);
      onChange?.(mode === "multiple" ? next : undefined);
    };

    // keyboard nav
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!open) {
        if (e.key === "ArrowDown" || e.key === "Enter") {
          e.preventDefault();
          setOpen(true);
        }
        return;
      }
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightIdx((prev) => Math.min(prev + 1, filtered.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightIdx((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (filtered[highlightIdx] && !filtered[highlightIdx].disabled) {
            handleSelect(filtered[highlightIdx].value);
          } else if (
            allowCreate &&
            search.trim() &&
            filtered.length === 0
          ) {
            onCreate?.(search.trim());
            setSearch("");
          }
          break;
        case "Escape":
          e.preventDefault();
          setOpen(false);
          setSearch("");
          break;
      }
    };

    // scroll highlighted item into view
    React.useEffect(() => {
      if (!open || !listRef.current) return;
      const el = listRef.current.children[highlightIdx] as HTMLElement;
      el?.scrollIntoView({ block: "nearest" });
    }, [highlightIdx, open]);

    // auto-focus input on open
    React.useEffect(() => {
      if (open) {
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }, [open]);

    const displayLabel = () => {
      if (mode === "multiple") {
        if (selected.length === 0) {
          return (
            <span className="text-gray-400 dark:text-zinc-500 truncate">
              {placeholder}
            </span>
          );
        }
        return (
          <div className="flex flex-wrap gap-1.5 items-center">
            {selected.map((val) => {
              const opt = options.find((o) => o.value === val);
              return (
                <span
                  key={val}
                  className="inline-flex items-center gap-1 bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 px-2 py-0.5 rounded-md text-xs font-medium border border-gray-200 dark:border-zinc-700"
                >
                  {opt?.label || val}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-rose-500"
                    onClick={(e) => removeTag(e, val)}
                  />
                </span>
              );
            })}
          </div>
        );
      }
      const opt = options.find((o) => o.value === selected[0]);
      if (!opt) {
        return (
          <span className="text-gray-400 dark:text-zinc-500 truncate">
            {placeholder}
          </span>
        );
      }
      return (
        <span className="truncate text-gray-900 dark:text-zinc-50 font-medium">
          {opt.label}
        </span>
      );
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <div
            ref={ref}
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className={cn(
              "flex w-full items-center justify-between rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 min-h-[44px] px-4 text-sm cursor-pointer",
              "transition-all duration-200 hover:border-gray-300 dark:hover:border-zinc-700",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500",
              open && "ring-2 ring-indigo-500/20 border-indigo-500",
              disabled && "cursor-not-allowed opacity-50",
              className
            )}
          >
            <div className="flex-1 min-w-0 py-1">{displayLabel()}</div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-gray-400 transition-transform duration-200 shrink-0 ml-2",
                open && "rotate-180"
              )}
            />
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="p-0 w-[var(--radix-popover-trigger-width)] overflow-hidden"
          sideOffset={6}
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {/* Search input */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100 dark:border-zinc-800">
            <Search className="h-4 w-4 text-gray-400 dark:text-zinc-500 shrink-0" />
            <input
              ref={inputRef}
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-zinc-50 placeholder:text-gray-400 dark:placeholder:text-zinc-500"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {loading && (
              <Loader2 className="h-4 w-4 text-gray-400 animate-spin shrink-0" />
            )}
          </div>

          {/* Option list */}
          <div
            ref={listRef}
            role="listbox"
            className="py-1.5 max-h-60 overflow-y-auto custom-scrollbar"
          >
            {filtered.length === 0 && !loading && (
              <div className="px-4 py-8 text-center text-sm text-gray-400 dark:text-zinc-500">
                {emptyText}
              </div>
            )}
            {loading && filtered.length === 0 && (
              <div className="px-4 py-8 flex flex-col items-center justify-center gap-2 text-gray-400 dark:text-zinc-500">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm">Loading...</span>
              </div>
            )}
            {filtered.map((opt, idx) => {
              const isSelected = selected.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={opt.disabled}
                  onClick={() => handleSelect(opt.value)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-2.5 text-sm transition-all duration-150",
                    idx === highlightIdx &&
                      "bg-gray-50 dark:bg-zinc-800/50",
                    isSelected
                      ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800",
                    opt.disabled &&
                      "cursor-not-allowed opacity-40 pointer-events-none"
                  )}
                >
                  <div className="flex items-center gap-2 truncate">
                    {opt.icon && (
                      <span className="shrink-0">{opt.icon}</span>
                    )}
                    <span className="truncate">{opt.label}</span>
                  </div>
                  {isSelected && <Check className="h-4 w-4 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Create option */}
          {allowCreate && search.trim() && filtered.length === 0 && !loading && (
            <div className="border-t border-gray-100 dark:border-zinc-800 p-2">
              <button
                type="button"
                onClick={() => {
                  onCreate?.(search.trim());
                  setSearch("");
                }}
                className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                Create "{search.trim()}"
              </button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    );
  }
);
Combobox.displayName = "Combobox";

export { Combobox };
