
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// --- BUTTON ---
interface DSButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const DSButton: React.FC<DSButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  icon,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-[var(--primary-color)] text-[var(--primary-fg)] hover:opacity-90 shadow-lg shadow-[var(--primary-color)]/20',
    secondary: 'bg-[var(--bg-secondary)] text-[var(--text-main)] border border-[var(--border-subtle)] hover:bg-[var(--border-subtle)]',
    ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-secondary)]',
    danger: 'bg-[var(--danger-color)] text-white hover:opacity-90',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        inline-flex items-center justify-center gap-2 
        rounded-[var(--radius-md)] font-semibold transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <Loader2 size={16} className="animate-spin" /> : icon}
      {children}
    </motion.button>
  );
};

// --- CARD ---
interface DSCardProps extends HTMLMotionProps<"div"> {
  children?: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const DSCard: React.FC<DSCardProps> = ({ children, hoverEffect = false, className = '', ...props }) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' } : {}}
      className={`ds-card p-6 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// --- INPUT ---
interface DSInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const DSInput: React.FC<DSInputProps> = ({ label, error, icon, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">
            {icon}
          </div>
        )}
        <input
          className={`ds-input w-full py-2.5 ${icon ? 'pl-10' : 'pl-3'} pr-3 text-sm ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-[var(--danger-color)]">{error}</span>}
    </div>
  );
};

// --- BADGE ---
interface DSBadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'neutral' | 'accent';
  className?: string;
}

export const DSBadge: React.FC<DSBadgeProps> = ({ children, variant = 'neutral', className = '' }) => {
  const styles = {
    success: 'bg-[var(--success-color)]/10 text-[var(--success-color)] border-[var(--success-color)]/20',
    warning: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    error: 'bg-[var(--danger-color)]/10 text-[var(--danger-color)] border-[var(--danger-color)]/20',
    neutral: 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-subtle)]',
    accent: 'bg-[var(--accent-color)]/10 text-[var(--accent-color)] border-[var(--accent-color)]/20',
  };

  return (
    <span className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border
      ${styles[variant]} ${className}
    `}>
      {children}
    </span>
  );
};
