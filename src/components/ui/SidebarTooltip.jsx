import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const SidebarTooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const tooltipRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateTooltipPosition = () => {
    if (isVisible && tooltipRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const centerY = containerRect.top + (containerRect.height / 2);
      tooltipRef.current.style.top = `${centerY}px`;
    }
  };

  const handleMouseEnter = () => {
    if (isDesktop) {
      setIsVisible(true);
      requestAnimationFrame(updateTooltipPosition);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && isDesktop && (
        <div 
          ref={tooltipRef}
          className="fixed left-[4.5rem] -translate-y-1/2 z-[100]"
        >
          <div className="bg-gray-900 dark:bg-gray-800 text-white px-2 py-1 rounded-md text-xs font-medium shadow-lg whitespace-nowrap">
            {content}
            <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 transform rotate-45" />
          </div>
        </div>
      )}
    </div>
  );
};

SidebarTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.string.isRequired,
};

export default SidebarTooltip; 