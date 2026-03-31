import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Input, type InputProps } from '../Input';

export interface NumberInputProps extends Omit<InputProps, 'onChange' | 'value' | 'type'> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  format?: boolean;
  onChange?: (value: number) => void;
}

export const NumberInput = ({
  value: controlledValue,
  defaultValue,
  min = -Infinity,
  max = Infinity,
  step = 1,
  precision = 0,
  format = true,
  onChange,
  className,
  ...props
}: NumberInputProps) => {
  const [internalValue, setInternalValue] = useState<number>(controlledValue ?? defaultValue ?? 0);
  const [displayValue, setDisplayValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const formatNumber = useCallback((num: number) => {
    if (isNaN(num)) return '';
    const fixed = num.toFixed(precision);
    if (!format) return fixed;
    
    const parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }, [precision, format]);

  useEffect(() => {
    setDisplayValue(formatNumber(value));
  }, [value, formatNumber]);

  const updateValue = (newValue: number) => {
    const clamped = Math.min(Math.max(newValue, min), max);
    const rounded = parseFloat(clamped.toFixed(precision));
    
    if (controlledValue === undefined) {
      setInternalValue(rounded);
    }
    onChange?.(rounded);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value;
    setDisplayValue(str);
    
    // Allow typing valid characters but only update value if it's a valid number
    const clean = str.replace(/,/g, '');
    if (clean === '' || clean === '-' || clean.endsWith('.')) return;
    
    const num = parseFloat(clean);
    if (!isNaN(num)) {
      updateValue(num);
    }
  };

  const handleBlur = () => {
    // On blur, ensure the display value matches the formatted number
    setDisplayValue(formatNumber(value));
  };

  const handleIncrement = () => updateValue(value + step);
  const handleDecrement = () => updateValue(value - step);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleDecrement();
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <Input
        {...props}
        ref={inputRef}
        value={displayValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="pr-10"
        autoComplete="off"
      />
      <div className="absolute right-1 top-1 bottom-1 flex flex-col w-7 gap-0.5">
        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          className="flex-1 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed group/btn"
        >
          <ChevronUp className="w-3.5 h-3.5 text-gray-400 group-hover/btn:text-gray-900 dark:group-hover/btn:text-zinc-50" />
        </button>
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          className="flex-1 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed group/btn"
        >
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover/btn:text-gray-900 dark:group-hover/btn:text-zinc-50" />
        </button>
      </div>
    </div>
  );
};
