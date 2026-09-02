// app/components/Button.tsx
import React from 'react';

// Define the props type
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline'; // add other variants as needed
  className?: string;
  // ... any other props you want to pass
  [key: string]: any; // optional: for spreading rest props
}

export default function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  const baseClass = `btn btn-${variant} ${className}`;
  return (
    <button className={baseClass} {...props}>
      {children}
    </button>
  );
}