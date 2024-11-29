import PropTypes from "prop-types";
import { cn } from "../../utils/cn";

const variants = {
  default: "bg-primary/10 text-primary hover:bg-primary/20",
  secondary: "bg-secondary/10 text-secondary hover:bg-secondary/20",
  success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
};

const sizes = {
  default: "px-4 py-1.5 text-sm",
  sm: "px-2.5 py-0.5 text-xs",
  lg: "px-5 py-2 text-base",
};

const Badge = ({ 
  className, 
  variant = "default", 
  size = "default", 
  children 
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md font-medium",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};

Badge.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    "default",
    "secondary",
    "success",
    "warning",
    "error",
    "info",
  ]),
  size: PropTypes.oneOf(["default", "sm", "lg"]),
  children: PropTypes.node.isRequired,
};

export { Badge }; 