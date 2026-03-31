import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { ChevronDown, X, Search, Check, XCircle } from "lucide-react";
import { selectVariants, dropdownVariants } from "./variants";

export interface SelectOption {
  label: React.ReactNode;
  value: string | number;
  group?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "value" | "defaultValue" | "prefix">,
    VariantProps<typeof selectVariants> {
  options: SelectOption[];
  value?: string | number | (string | number)[];
  defaultValue?: string | number | (string | number)[];
  onChange?: (value: string | number | (string | number)[] | undefined) => void;
  placeholder?: string;
  mode?: "single" | "multiple";
  showSearch?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  maxTagCount?: number | "responsive";
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  loading?: boolean;
  dropdownRender?: (menu: React.ReactNode) => React.ReactNode;
  tagRender?: (props: { label: React.ReactNode; value: string | number; onClose: () => void }) => React.ReactNode;
  optionRender?: (option: SelectOption) => React.ReactNode;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      className,
      options = [],
      value,
      defaultValue,
      onChange,
      placeholder = "Select...",
      mode = "single",
      showSearch = false,
      allowClear = false,
      disabled = false,
      maxTagCount,
      variant,
      size,
      status,
      prefix,
      suffix,
      loading,
      dropdownRender,
      tagRender,
      optionRender,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");
    const [selectedValues, setSelectedValues] = React.useState<(string | number)[]>(() => {
      const initValue = value || defaultValue;
      if (Array.isArray(initValue)) return initValue as (string | number)[];
      return initValue !== undefined ? [initValue as string | number] : [];
    });
    
    const containerRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Sync external value
    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValues(Array.isArray(value) ? value : [value]);
      }
    }, [value]);

    // Handle Click Outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleOpen = () => {
      if (disabled || loading) return;
      setIsOpen(!isOpen);
      if (!isOpen && showSearch) {
        setTimeout(() => inputRef.current?.focus(), 10);
      }
    };

    const handleSelect = (option: SelectOption) => {
      if (option.disabled) return;

      let nextValues: (string | number)[];
      if (mode === "multiple") {
        const isSelected = selectedValues.includes(option.value);
        nextValues = isSelected
          ? selectedValues.filter((v) => v !== option.value)
          : [...selectedValues, option.value];
      } else {
        nextValues = [option.value];
        setIsOpen(false);
      }

      setSelectedValues(nextValues);
      setSearchValue("");
      onChange?.(mode === "multiple" ? nextValues : nextValues[0]);
    };

    const removeValue = (e: React.MouseEvent, val: string | number) => {
      e.stopPropagation();
      const nextValues = selectedValues.filter((v) => v !== val);
      setSelectedValues(nextValues);
      onChange?.(mode === "multiple" ? nextValues : nextValues[0]);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedValues([]);
      onChange?.(mode === "multiple" ? [] : undefined);
    };

    const filteredOptions = options.filter((opt) => {
      const labelStr = typeof opt.label === "string" ? opt.label : String(opt.value);
      return labelStr.toLowerCase().includes(searchValue.toLowerCase());
    });

    // Grouping logic
    const groupedOptions: Record<string, SelectOption[]> = {};
    const noGroupOptions: SelectOption[] = [];

    filteredOptions.forEach((opt) => {
      if (opt.group) {
        if (!groupedOptions[opt.group]) groupedOptions[opt.group] = [];
        groupedOptions[opt.group].push(opt);
      } else {
        noGroupOptions.push(opt);
      }
    });

    const renderSelectedContent = () => {
      if (selectedValues.length === 0 && !searchValue) {
        return <span className="text-gray-400 dark:text-zinc-500 truncate">{placeholder}</span>;
      }

      if (mode === "multiple") {
        const visibleValues = typeof maxTagCount === "number" ? selectedValues.slice(0, maxTagCount) : selectedValues;
        const hiddenCount = selectedValues.length - visibleValues.length;

        return (
          <div className="flex flex-wrap gap-1.5 items-center mr-2">
            {visibleValues.map((val) => {
              const option = options.find((opt) => opt.value === val);
              const label = option?.label || val;
              
              if (tagRender) return tagRender({ label, value: val, onClose: () => removeValue({ stopPropagation: () => {} } as React.MouseEvent, val) });

              return (
                <span
                  key={val}
                  className="inline-flex items-center bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 px-2 py-0.5 rounded-md text-xs font-medium border border-gray-200 dark:border-zinc-700 gap-1"
                >
                  {label}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-rose-500"
                    onClick={(e) => removeValue(e, val)}
                  />
                </span>
              );
            })}
            {hiddenCount > 0 && (
              <span className="text-xs text-gray-400 font-medium">+{hiddenCount}...</span>
            )}
          </div>
        );
      }

      const selectedOption = options.find((opt) => opt.value === selectedValues[0]);
      return <span className="truncate">{selectedOption?.label || selectedValues[0]}</span>;
    };

    return (
      <div 
        className={cn("relative w-full group", className)} 
        ref={containerRef}
        {...props}
      >
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          className={cn(
            selectVariants({ variant, size, status }),
            isOpen && "ring-2 ring-indigo-500/20 border-indigo-500",
            disabled && "cursor-not-allowed opacity-50",
            loading && "cursor-wait"
          )}
          onClick={toggleOpen}
        >
          <div className="flex items-center flex-1 min-w-0 h-full">
            {prefix && (
              <div className="mr-2 text-gray-400 dark:text-zinc-500 shrink-0">
                {prefix}
              </div>
            )}
            
            <div className="flex-1 flex items-center min-w-0 py-1 overflow-hidden relative">
              {renderSelectedContent()}
              
              {showSearch && (
                <div className={cn("flex items-center flex-1", !isOpen && "absolute opacity-0 pointer-events-none")}>
                  {searchValue === "" && <Search className="h-3 w-3 text-gray-400 mr-1" />}
                  <input
                    ref={inputRef}
                    className="bg-transparent border-none outline-none p-0 text-sm w-full min-w-[20px]"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    disabled={disabled}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 ml-2 shrink-0">
            {allowClear && selectedValues.length > 0 && !disabled && (
              <button
                type="button"
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors"
                onClick={handleClear}
              >
                <XCircle className="h-4 w-4" />
              </button>
            )}
            <ChevronDown
              className={cn(
                "h-4 w-4 text-gray-400 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />

            {suffix && (
              <div className="ml-1 text-gray-400 dark:text-zinc-500 shrink-0 border-l border-gray-100 dark:border-zinc-800 pl-2 h-4 flex items-center">
                {suffix}
              </div>
            )}
          </div>
        </div>

        {/* Dropdown Menu */}
        <div className={dropdownVariants({ isOpen })}>
          {dropdownRender ? (
            dropdownRender(
              <MenuItems 
                groupedOptions={groupedOptions} 
                noGroupOptions={noGroupOptions} 
                selectedValues={selectedValues}
                handleSelect={handleSelect}
                optionRender={optionRender}
              />
            )
          ) : (
            <MenuItems 
              groupedOptions={groupedOptions} 
              noGroupOptions={noGroupOptions} 
              selectedValues={selectedValues}
              handleSelect={handleSelect}
              optionRender={optionRender}
            />
          )}
        </div>
      </div>
    );
  }
);
Select.displayName = "Select";

interface MenuItemsProps {
  groupedOptions: Record<string, SelectOption[]>;
  noGroupOptions: SelectOption[];
  selectedValues: (string | number)[];
  handleSelect: (option: SelectOption) => void;
  optionRender?: (option: SelectOption) => React.ReactNode;
}

const MenuItems = ({ groupedOptions, noGroupOptions, selectedValues, handleSelect, optionRender }: MenuItemsProps) => (
  <div className="py-1.5 max-h-72 overflow-y-auto custom-scrollbar">
    {noGroupOptions.length === 0 && Object.keys(groupedOptions).length === 0 && (
      <div className="px-4 py-8 text-center text-sm text-gray-400 dark:text-zinc-500">
        No options found
      </div>
    )}

    {noGroupOptions.map((opt) => (
      <OptionItem 
        key={opt.value} 
        opt={opt} 
        isSelected={selectedValues.includes(opt.value)} 
        onSelect={() => handleSelect(opt)}
        render={optionRender}
      />
    ))}

    {Object.entries(groupedOptions).map(([group, opts]) => (
      <div key={group} className="mt-2 first:mt-0">
        <div className="px-4 py-1.5 text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
          {group}
        </div>
        {opts.map((opt) => (
          <OptionItem 
            key={opt.value} 
            opt={opt} 
            isSelected={selectedValues.includes(opt.value)} 
            onSelect={() => handleSelect(opt)}
            render={optionRender}
          />
        ))}
      </div>
    ))}
  </div>
);

interface OptionItemProps {
  opt: SelectOption;
  isSelected: boolean;
  onSelect: () => void;
  render?: (option: SelectOption) => React.ReactNode;
}

const OptionItem = ({ opt, isSelected, onSelect, render }: OptionItemProps) => {
  if (render) return <div onClick={onSelect}>{render(opt)}</div>;

  return (
    <button
      type="button"
      className={cn(
        "w-full flex items-center justify-between px-4 py-2.5 text-sm transition-all duration-150",
        isSelected
          ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold"
          : "text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800",
        opt.disabled && "cursor-not-allowed opacity-40 grayscale pointer-events-none"
      )}
      onClick={onSelect}
      disabled={opt.disabled}
    >
      <div className="flex items-center gap-2 truncate">
        {opt.icon && <span className="shrink-0">{opt.icon}</span>}
        <span className="truncate">{opt.label}</span>
      </div>
      {isSelected && <Check className="h-4 w-4 shrink-0" />}
    </button>
  );
};

export { Select };
