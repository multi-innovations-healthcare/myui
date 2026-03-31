import React from 'react';
import { type AvatarSize } from './index';

export interface AvatarGroupProps {
  children: React.ReactNode;
  size?: AvatarSize;
  max?: number;
  borderColor?: string;
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  size = 'md',
  max = 4,
  borderColor = 'ring-white dark:ring-zinc-900',
  className = '',
}) => {
  const avatars = React.Children.toArray(children);
  const total = avatars.length;
  const displayedAvatars = avatars.slice(0, max);
  const remaining = total - max;

  return (
    <div className={`flex -space-x-3 hover:space-x-1 transition-all duration-500 ease-in-out px-2 ${className}`}>
      {displayedAvatars.map((avatar, i) => (
        <div 
          key={i} 
          className={`relative transition-transform duration-300 hover:-translate-y-2 hover:z-10 ring-4 ${borderColor} rounded-full`}
        >
          {React.isValidElement(avatar) 
            ? React.cloneElement(avatar as React.ReactElement<{ size?: AvatarSize }>, { size }) 
            : avatar}
        </div>
      ))}
      {remaining > 0 && (
        <div 
          className={`
            relative flex items-center justify-center 
            bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400
            font-black text-xs ring-4 ${borderColor} rounded-full
            ${size === 'xs' ? 'w-6 h-6' : 
              size === 'sm' ? 'w-8 h-8' : 
              size === 'md' ? 'w-10 h-10' : 
              size === 'lg' ? 'w-12 h-12' : 
              size === 'xl' ? 'w-16 h-16' : 'w-24 h-24'}
          `}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
