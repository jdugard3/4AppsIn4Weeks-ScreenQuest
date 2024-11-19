/* eslint-disable no-unused-vars */
import React from 'react';
import { cn } from '../../lib/utils';

const Badge = ({ 
  children, 
  className, 
  variant = "default",
  size = "default"
}) => {
  const variants = {
    default: "bg-primary/20 text-primary",
    secondary: "bg-secondary/20 text-secondary",
    success: "bg-green-500/20 text-green-500",
    warning: "bg-yellow-500/20 text-yellow-500",
    danger: "bg-red-500/20 text-red-500"
  };

  const sizes = {
    default: "px-2.5 py-0.5 text-sm",
    lg: "px-3 py-1 text-base",
    sm: "px-2 py-0.5 text-xs"
  };

  return (
    <span className={cn(
      "rounded-full font-medium inline-flex items-center",
      variants[variant],
      sizes[size],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;