// components/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  // Allow any other HTML button attributes
  [key: string]: any;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  onClick,
  ...props
}: ButtonProps) {
  const baseClass = `btn btn-${variant} btn-${size} ${className}`.trim();
  return (
    <button type={type} className={baseClass} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  );
}