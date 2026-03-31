import React from 'react';

export type BadgeVariant = 'solid' | 'soft' | 'outline' | 'dot';
export type BadgeColor = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'indigo' | 'cyan';

export interface BadgeProps {
  children?: React.ReactNode;
  variant?: BadgeVariant;
  color?: BadgeColor;
  className?: string;
  pill?: boolean;
}

const colorMap: Record<BadgeColor, { bg: string; text: string; border: string; dot: string; softBg: string; softText: string }> = {
  default: {
    bg: 'bg-gray-900',
    text: 'text-white',
    border: 'border-gray-200',
    dot: 'bg-gray-400',
    softBg: 'bg-gray-100',
    softText: 'text-gray-700',
  },
  primary: {
    bg: 'bg-zinc-900 dark:bg-zinc-100',
    text: 'text-white dark:text-zinc-900',
    border: 'border-zinc-200 dark:border-zinc-700',
    dot: 'bg-zinc-500',
    softBg: 'bg-zinc-100 dark:bg-zinc-800',
    softText: 'text-zinc-700 dark:text-zinc-300',
  },
  success: {
    bg: 'bg-emerald-600 dark:bg-emerald-500',
    text: 'text-white',
    border: 'border-emerald-200 dark:border-emerald-500/30',
    dot: 'bg-emerald-500',
    softBg: 'bg-emerald-100 dark:bg-emerald-500/10',
    softText: 'text-emerald-700 dark:text-emerald-400',
  },
  warning: {
    bg: 'bg-amber-500 dark:bg-amber-500',
    text: 'text-white',
    border: 'border-amber-200 dark:border-amber-500/30',
    dot: 'bg-amber-500',
    softBg: 'bg-amber-100 dark:bg-amber-500/10',
    softText: 'text-amber-800 dark:text-amber-400',
  },
  danger: {
    bg: 'bg-rose-600 dark:bg-rose-500',
    text: 'text-white',
    border: 'border-rose-200 dark:border-rose-500/30',
    dot: 'bg-rose-500',
    softBg: 'bg-rose-100 dark:bg-rose-500/10',
    softText: 'text-rose-700 dark:text-rose-400',
  },
  indigo: {
    bg: 'bg-indigo-600 dark:bg-indigo-500',
    text: 'text-white',
    border: 'border-indigo-200 dark:border-indigo-500/30',
    dot: 'bg-indigo-500',
    softBg: 'bg-indigo-100 dark:bg-indigo-500/10',
    softText: 'text-indigo-700 dark:text-indigo-400',
  },
  cyan: {
    bg: 'bg-cyan-500 dark:bg-cyan-500',
    text: 'text-white',
    border: 'border-cyan-200 dark:border-cyan-500/30',
    dot: 'bg-cyan-500',
    softBg: 'bg-cyan-100 dark:bg-cyan-500/10',
    softText: 'text-cyan-700 dark:text-cyan-400',
  },
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'solid',
  color = 'default',
  className = '',
  pill = false,
}) => {
  const c = colorMap[color];
  const base = `inline-flex items-center gap-1.5 font-black uppercase tracking-widest transition-all duration-300 px-2.5 py-0.5 whitespace-nowrap ${pill ? 'rounded-full' : 'rounded-lg'}`;
  
  let finalStyle = '';
  switch (variant) {
    case 'solid':
      finalStyle = `${c.bg} ${c.text} text-[10px] shadow-sm`;
      break;
    case 'soft':
      finalStyle = `${c.softBg} ${c.softText} text-[10px]`;
      break;
    case 'outline':
      finalStyle = `border ${c.border} ${c.softText} text-[10px] px-2`;
      break;
    case 'dot':
      return (
        <span className={`inline-flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-zinc-300 ${className}`}>
          <span className={`w-2 h-2 rounded-full ${c.dot} animate-pulse shadow-[0_0_8px_rgba(0,0,0,0.1)]`} />
          {children}
        </span>
      );
  }

  return (
    <span className={`${base} ${finalStyle} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
