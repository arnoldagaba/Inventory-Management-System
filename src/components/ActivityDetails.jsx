import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Modal } from './ui/Modal';
import { formatDate } from '../utils/formatDate';
import { Badge, Button } from './ui';
import { cn } from '../utils/cn';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

export const ActivityDetails = ({ activity, isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!activity) return null;

  const getActivityIcon = () => {
    switch (activity.type) {
      case 'Order':
        return '🛍️';
      case 'Stock':
        return '📦';
      case 'User':
        return '👤';
      default:
        return '📝';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDetails = (details) => {
    if (!details) return null;

    // Map of detail keys to their display names
    const displayNames = {
      orderId: 'Order ID',
      amount: 'Amount',
      items: 'Items',
      customer: 'Customer',
      productId: 'Product ID',
      currentStock: 'Current Stock',
      reorderPoint: 'Reorder Point'
    };

    return Object.entries(details).map(([key, value]) => ({
      label: displayNames[key] || key,
      value: typeof value === 'number' && key === 'amount' 
        ? `UGX ${(value * 3700).toLocaleString()}`
        : value.toString()
    }));
  };

  const handleNavigate = () => {
    onClose(); // Close the modal first
    switch (activity.type.toLowerCase()) {
      case 'order':
        navigate('/orders', { state: { highlight: activity.details?.orderId } });
        break;
      case 'stock':
        navigate('/stock', { state: { highlight: activity.details?.productId } });
        break;
      case 'user':
        navigate('/settings');
        break;
      default:
        navigate('/dashboard');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Activity Details"
      size="lg"
    >
      <div className="space-y-6">
        {/* Activity Header */}
        <div className={cn(
          "flex items-start justify-between",
          "p-4 rounded-lg",
          "bg-gray-50 dark:bg-gray-800/50"
        )}>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getActivityIcon()}</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {activity.content}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(activity.timestamp)}
              </p>
            </div>
          </div>
          <Badge variant={getStatusColor(activity.status)}>
            {activity.status}
          </Badge>
        </div>

        {/* Activity Details */}
        <div className="space-y-4">
          <div className={cn(
            "grid grid-cols-2 gap-4",
            "p-4 rounded-lg",
            "bg-gray-50 dark:bg-gray-800/50"
          )}>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</p>
              <p className="mt-1 text-sm text-gray-900 dark:text-white capitalize">{activity.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">User</p>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">{activity.user}</p>
            </div>
          </div>

          {activity.details && (
            <div className={cn(
              "p-4 rounded-lg",
              "bg-gray-50 dark:bg-gray-800/50"
            )}>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Additional Details</p>
              <div className="space-y-2">
                {formatDetails(activity.details).map((detail, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{detail.label}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Items */}
        {activity.relatedItems && activity.relatedItems.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Related Items</h4>
            <div className="space-y-2">
              {activity.relatedItems.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-3 rounded-lg",
                    "bg-gray-50 dark:bg-gray-800/50",
                    "flex items-center justify-between"
                  )}
                >
                  <span className="text-sm text-gray-900 dark:text-white">{item.name}</span>
                  <Badge variant="secondary" size="sm">{item.type}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="secondary"
            onClick={handleNavigate}
            className="inline-flex items-center"
          >
            View All {activity.type} Activities
            <ArrowTopRightOnSquareIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

ActivityDetails.propTypes = {
  activity: PropTypes.shape({
    type: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    details: PropTypes.object,
    relatedItems: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })),
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}; 