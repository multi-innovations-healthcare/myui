import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  extra?: React.ReactNode;
  footer?: React.ReactNode;
  cover?: React.ReactNode;
  bordered?: boolean;
  hoverable?: boolean;
  className?: string;
  bodyClassName?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  extra,
  footer,
  cover,
  bordered = true,
  hoverable = false,
  className = '',
  bodyClassName = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
      className={`
        relative overflow-hidden flex flex-col
        bg-white dark:bg-zinc-900 
        transition-all duration-500 rounded-[2.5rem]
        ${bordered ? 'border border-gray-100 dark:border-zinc-800' : ''}
        ${hoverable ? 'hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 cursor-pointer' : 'shadow-sm'}
        ${className}
      `}
    >
      {/* Cover Image Slot */}
      {cover && (
        <div className="w-full relative overflow-hidden rounded-t-[2.5rem]">
          {cover}
        </div>
      )}

      {/* Header Section */}
      {(title || subtitle || extra) && (
        <div className="p-8 pb-0 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            {title && (
              <h3 className="text-xl font-black text-gray-900 dark:text-zinc-50 tracking-tight leading-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
                {subtitle}
              </p>
            )}
          </div>
          {extra && <div className="shrink-0">{extra}</div>}
        </div>
      )}

      {/* Main Content */}
      <div className={`p-8 flex-1 ${bodyClassName}`}>
        {children}
      </div>

      {/* Footer Section */}
      {footer && (
        <div className="px-8 py-6 bg-gray-50/50 dark:bg-zinc-800/30 border-t border-gray-50 dark:border-zinc-800/50 mt-auto">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
