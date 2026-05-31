import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="relative group w-full">
        <input
          id={inputId}
          ref={ref}
          placeholder=" "
          className={cn(
            "peer w-full bg-transparent border-b border-white/20 text-white px-0 py-4 outline-none transition-all focus:border-brand-gold",
            className
          )}
          {...props}
        />
        <label
          htmlFor={inputId}
          className="absolute left-0 top-4 text-white/50 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand-gold cursor-text"
        >
          {label}
        </label>
      </div>
    );
  }
);

Input.displayName = 'Input';
