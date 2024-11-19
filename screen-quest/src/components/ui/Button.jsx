import React from 'react';
import { cn } from '../../lib/utils';

export const Button = ({ 
  children, 
  className, 
  variant = "default", 
  size = "default",
  onClick,
  disabled,
  type = "button",
  icon
}) => {
  const variants = {
    default: "bg-primary hover:bg-primary/90 text-white",
    secondary: "bg-secondary hover:bg-secondary/90 text-white",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "hover:bg-gray-800 text-gray-300",
    destructive: "bg-red-600 hover:bg-red-700 text-white"
  };

  const sizes = {
    default: "px-4 py-2",
    sm: "px-2 py-1 text-sm",
    lg: "px-6 py-3 text-lg",
    icon: "p-2"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-lg font-medium transition-all duration-200",
        "flex items-center justify-center gap-2",
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </button>
  );
};

Button.displayName = "Button";

export default Button;