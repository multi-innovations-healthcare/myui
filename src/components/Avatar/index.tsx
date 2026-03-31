import React, { useState } from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  icon?: React.ReactNode;
  size?: AvatarSize;
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'away' | 'busy';
  className?: string;
  onClick?: () => void;
}

const sizeMap: Record<AvatarSize, { size: string; text: string; dot: string }> = {
  xs: { size: 'w-6 h-6', text: 'text-[10px]', dot: 'w-1.5 h-1.5' },
  sm: { size: 'w-8 h-8', text: 'text-xs', dot: 'w-2 h-2' },
  md: { size: 'w-10 h-10', text: 'text-sm', dot: 'w-2.5 h-2.5' },
  lg: { size: 'w-12 h-12', text: 'text-base', dot: 'w-3 h-3' },
  xl: { size: 'w-16 h-16', text: 'text-lg', dot: 'w-4 h-4' },
  '2xl': { size: 'w-24 h-24', text: 'text-2xl', dot: 'w-6 h-6' },
};

const statusColors = {
  online: 'bg-emerald-500 shadow-emerald-500/50',
  offline: 'bg-gray-400 shadow-gray-400/50',
  away: 'bg-amber-400 shadow-amber-400/50',
  busy: 'bg-rose-500 shadow-rose-500/50',
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  icon,
  size = 'md',
  shape = 'circle',
  status,
  className = '',
  onClick,
}) => {
  const [error, setError] = useState(false);
  const s = sizeMap[size];

  const getInitials = (n: string) => {
    return n
      .split(' ')
      .map((x) => x[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const renderContent = () => {
    if (src && !error) {
      return (
        <img
          src={src}
          alt={alt || name}
          className="w-full h-full object-cover animate-in fade-in duration-500"
          onError={() => setError(true)}
        />
      );
    }

    if (name) {
      return (
        <span className={`${s.text} font-black tracking-tighter text-indigo-600 dark:text-indigo-400`}>
          {getInitials(name)}
        </span>
      );
    }

    if (icon) {
      return (
        <span className="text-gray-400 dark:text-zinc-500">
          {icon}
        </span>
      );
    }

    return (
      <div className="w-full h-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
        <svg
          className="w-2/3 h-2/3 text-gray-300 dark:text-zinc-700"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </div>
    );
  };

  return (
    <div 
      className={`relative shrink-0 ${className}`} 
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      <div
        className={`
          flex items-center justify-center overflow-hidden
          bg-gray-50 dark:bg-zinc-800/50
          border border-gray-100 dark:border-zinc-800
          ${s.size}
          ${shape === 'circle' ? 'rounded-full' : 'rounded-2xl'}
          transition-all duration-300
          ${onClick ? 'cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 ring-offset-2 hover:ring-2 ring-indigo-500/20' : ''}
        `}
      >
        {renderContent()}
      </div>

      {status && (
        <span
          className={`
            absolute bottom-0 right-0 
            block rounded-full ring-2 ring-white dark:ring-zinc-900
            ${s.dot}
            ${statusColors[status]}
            animate-in zoom-in duration-300 delay-150
          `}
        />
      )}
    </div>
  );
};

export default Avatar;
