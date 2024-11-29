import { useState } from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({ children, content, position = "top" }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`
          absolute z-50 px-2 py-1 text-xs font-medium
          text-white bg-gray-900 dark:bg-gray-700
          rounded-md whitespace-nowrap
          ${positions[position]}
        `}>
          {content}
          <div className={`
            absolute w-2 h-2
            bg-gray-900 dark:bg-gray-700
            transform rotate-45
            ${position === 'top' ? 'top-full -translate-y-1 left-1/2 -translate-x-1/2' : ''}
            ${position === 'bottom' ? 'bottom-full translate-y-1 left-1/2 -translate-x-1/2' : ''}
            ${position === 'left' ? 'left-full -translate-x-1 top-1/2 -translate-y-1/2' : ''}
            ${position === 'right' ? 'right-full translate-x-1 top-1/2 -translate-y-1/2' : ''}
          `}/>
        </div>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
};

export default Tooltip; 