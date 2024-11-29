import { useState } from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({ children, content, position = "top", size = "default" }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const sizes = {
    small: "px-2 py-1 text-xs",
    default: "px-3 py-2 text-sm",
  };

  return (
    <div className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`
          absolute z-[60] font-medium
          text-white bg-gray-900 dark:bg-gray-800
          rounded-md shadow-lg border border-gray-700 dark:border-gray-600
          whitespace-nowrap transition-opacity duration-200
          ${sizes[size]}
          ${positions[position]}
        `}>
          {content}
          <div className={`
            absolute w-2 h-2
            bg-gray-900 dark:bg-gray-800
            border-gray-700 dark:border-gray-600
            transform rotate-45
            ${position === 'top' ? 'border-b border-r top-full -translate-y-1 left-1/2 -translate-x-1/2' : ''}
            ${position === 'bottom' ? 'border-t border-l bottom-full translate-y-1 left-1/2 -translate-x-1/2' : ''}
            ${position === 'left' ? 'border-t border-r left-full -translate-x-1 top-1/2 -translate-y-1/2' : ''}
            ${position === 'right' ? 'border-b border-l right-full translate-x-1 top-1/2 -translate-y-1/2' : ''}
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
  size: PropTypes.oneOf(['small', 'default']),
};

export default Tooltip; 