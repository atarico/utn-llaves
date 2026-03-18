import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { KeyStatus } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: KeyStatus;
}

export const Badge: React.FC<BadgeProps> = ({ status, className, ...props }) => {
  const statusStyles: Record<KeyStatus, string> = {
    ACTIVO: 'bg-utn-navy text-white',
    DEVUELTO: 'bg-green-600 text-white',
    EDITADO: 'bg-amber-500 text-white',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-mono',
        statusStyles[status],
        className
      )}
      {...props}
    >
      {status}
    </span>
  );
};
