import PropTypes from 'prop-types';
import { Modal } from './ui/Modal';
import { formatNumberWithComma } from '../utils/formatNumber';
import { Badge } from './ui/Badge';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

export const StockDetails = ({ item, isOpen, onClose }) => {
  if (!item) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Stock Details"
      size="lg"
    >
      <div className="space-y-6">
        {/* Stock Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {item.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              SKU: {item.sku}
            </p>
          </div>
          <Badge variant={item.status === "Low Stock" ? "warning" : "success"}>
            {item.status}
          </Badge>
        </div>

        {/* Stock Metrics */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
            <p className="text-sm text-gray-500 dark:text-gray-400">Current Stock</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {formatNumberWithComma(item.quantity)}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
            <p className="text-sm text-gray-500 dark:text-gray-400">Reorder Point</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {formatNumberWithComma(item.reorderPoint)}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
            <p className="text-sm text-gray-500 dark:text-gray-400">Optimal Stock</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {formatNumberWithComma(item.optimalStock || item.reorderPoint * 2)}
            </p>
          </div>
        </div>

        {/* Stock Movement History */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">
            Recent Stock Movements
          </h4>
          <div className="space-y-3">
            {(item.movements || []).map((movement, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md"
              >
                <div className="flex items-center gap-3">
                  {movement.type === 'increase' ? (
                    <ArrowTrendingUpIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {movement.type === 'increase' ? 'Stock Added' : 'Stock Removed'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {movement.date}
                    </p>
                  </div>
                </div>
                <p className={cn(
                  "text-sm font-medium",
                  movement.type === 'increase' 
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                )}>
                  {movement.type === 'increase' ? '+' : '-'}{movement.quantity} units
                </p>
              </div>
            ))}
            {(!item.movements || item.movements.length === 0) && (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                No recent stock movements
              </p>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Location
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              {item.location || "Not specified"}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Last Updated
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              {item.lastUpdated || "Not available"}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

StockDetails.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    sku: PropTypes.string,
    quantity: PropTypes.number,
    reorderPoint: PropTypes.number,
    optimalStock: PropTypes.number,
    status: PropTypes.string,
    location: PropTypes.string,
    lastUpdated: PropTypes.string,
    movements: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf(['increase', 'decrease']),
      quantity: PropTypes.number,
      date: PropTypes.string,
    })),
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}; 