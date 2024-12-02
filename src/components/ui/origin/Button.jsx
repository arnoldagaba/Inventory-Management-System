import { forwardRef } from "react";
import PropTypes from "prop-types";
import { cn } from "../../../utils/cn";

const variants = {
  primary: "bg-origin-600 text-white hover:bg-origin-700 dark:bg-origin-500 dark:hover:bg-origin-600",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
  outline: "border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800",
  ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
  destructive: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
};

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4",
  lg: "h-12 px-6",
  icon: "h-10 w-10",
};

const OriginButton = forwardRef(
  ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-origin-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900",
          "disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);

OriginButton.displayName = "OriginButton";

OriginButton.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "outline", "ghost", "destructive"]),
  size: PropTypes.oneOf(["sm", "md", "lg", "icon"]),
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export { OriginButton }; 