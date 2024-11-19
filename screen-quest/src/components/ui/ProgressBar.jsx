import { cn } from '../../lib/utils';

const ProgressBar = ({ current, max, className, variant = "primary" }) => {
  const percentage = Math.min((current / max) * 100, 100);
  
  const variants = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    success: "bg-green-500",
    danger: "bg-red-500"
  };

  return (
    <div className={cn("w-full bg-background rounded-full h-2", className)}>
      <div 
        className={cn(
          variants[variant],
          "h-full rounded-full transition-all duration-300 ease-out"
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;