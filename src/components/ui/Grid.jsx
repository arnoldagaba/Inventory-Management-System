import PropTypes from "prop-types";
import { cn } from "../../utils/cn";

const Grid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {children}
    </div>
  );
};

Grid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export { Grid }; 