/* eslint-disable no-unused-vars */
import React from 'react';
import { cn } from '../../lib/utils';

const IconButton = ({ 
  icon, 
  className, 
  variant = "default",
  size = "default",
  onClick,
  disabled
}) => {
  const variants = {
    default: "bg-primary hover:bg-primary-hover text-white",
    secondary: "bg-secondary hover:bg-secondary-hover text-white",
    ghost: "hover:bg-surface text-text-primary",
    danger: "bg-red-500 hover:bg-red-600 text-white"
  };

  const sizes = {
    default: "p-2",
    sm: "p-1",
    lg: "p-3"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-full transition-all duration-200",
        "flex items-center justify-center",
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {icon}
    </button>
  );
};

export default IconButton;