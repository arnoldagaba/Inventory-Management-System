import PropTypes from "prop-types";
import { cn } from "../../utils/cn";

const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-6 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export { Card }; 