import PropTypes from "prop-types";
import { cn } from "../../utils/cn";

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-md border bg-white shadow-sm",
        "border-gray-200 dark:border-gray-700",
        "bg-white/80 dark:bg-gray-800/80",
        "backdrop-blur-sm",
        className
      )}
    >
      <div className="p-6">{children}</div>
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}; 