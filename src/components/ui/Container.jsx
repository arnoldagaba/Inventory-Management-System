import PropTypes from "prop-types";
import { cn } from "../../utils/cn";

const Container = ({ className, children }) => {
  return (
    <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
};

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export { Container }; 