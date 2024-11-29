import PropTypes from 'prop-types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { cn } from '../../utils/cn';

export const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  itemsPerPage,
  totalItems,
  showItemsPerPage = true,
  className 
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    if (totalPages <= 7) return pages;

    if (currentPage <= 4) {
      return [...pages.slice(0, 5), '...', totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [1, '...', ...pages.slice(totalPages - 5)];
    }

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages
    ];
  };

  return (
    <div className={cn("flex flex-col sm:flex-row justify-between items-center gap-4", className)}>
      {showItemsPerPage && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {startItem} to {endItem} of {totalItems} items
        </div>
      )}
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-md border border-gray-300 dark:border-gray-700 disabled:opacity-50 
            disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>

        <div className="flex items-center space-x-1">
          {getVisiblePages().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
              className={cn(
                "px-3 py-1 rounded-md text-sm font-medium",
                page === currentPage
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : page === '...'
                  ? "cursor-default"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              )}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md border border-gray-300 dark:border-gray-700 disabled:opacity-50 
            disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  showItemsPerPage: PropTypes.bool,
  className: PropTypes.string,
}; 