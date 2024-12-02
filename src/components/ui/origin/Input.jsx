import { forwardRef } from "react";
import PropTypes from "prop-types";
import { cn } from "../../../utils/cn";

const OriginInput = forwardRef(
  ({ className, type = "text", icon: Icon, label, error, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          )}
          <input
            type={type}
            className={cn(
              "block w-full rounded-lg border border-gray-300 dark:border-gray-600",
              "bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
              "placeholder:text-gray-400 dark:placeholder:text-gray-500",
              "focus:outline-none focus:ring-2 focus:ring-origin-500 focus:border-origin-500",
              "dark:focus:ring-origin-400 dark:focus:border-origin-400",
              Icon ? "pl-10" : "pl-4",
              "pr-4 py-2",
              error && "border-red-500 focus:ring-red-500 focus:border-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

OriginInput.displayName = "OriginInput";

OriginInput.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.elementType,
  label: PropTypes.string,
  error: PropTypes.string,
};

export { OriginInput }; 