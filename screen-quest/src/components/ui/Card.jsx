/* eslint-disable no-unused-vars */
import React from 'react';
import { cn } from '../../lib/utils';

const Card = ({ 
  children, 
  className, 
  variant = "default",
  hover = false,
  onClick
}) => {
  const variants = {
    default: "bg-surface",
    primary: "bg-primary/10",
    secondary: "bg-secondary/10",
  };

  return (
    <div 
      className={cn(
        "rounded-lg p-6",
        variants[variant],
        hover && "transition-all duration-200 hover:scale-105 hover:shadow-lg",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className }) => {
  return (
    <div className={cn("flex items-center gap-2 mb-4", className)}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className }) => {
  return (
    <h3 className={cn("text-lg font-semibold", className)}>
      {children}
    </h3>
  );
};

const CardContent = ({ children, className }) => {
  return (
    <div className={cn("space-y-2", className)}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardContent };