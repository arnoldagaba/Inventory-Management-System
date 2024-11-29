import PropTypes from 'prop-types';
import { Modal } from './ui/Modal';
import { formatCurrency } from '../utils/formatNumber';
import { Badge } from './ui/Badge';
import { cn } from '../utils/cn';

const statusColors = {
  'Pending': 'warning',
  'Processing': 'info',
  'Completed': 'success',
  'Cancelled': 'error'
};

export const OrderDetails = ({ order, isOpen, onClose }) => {
  if (!order) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Order Details"
      size="lg"
    >
      <div className="space-y-6">
        {/* Order Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Order #{order.orderNumber}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Placed on {order.orderDate}
            </p>
          </div>
          <Badge variant={statusColors[order.status]}>
            {order.status}
          </Badge>
        </div>

        {/* Customer Information */}
        <div className="grid grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Customer Details
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {order.customer.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {order.customer.email}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {order.customer.phone}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Shipping Address
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {order.shippingAddress.street}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {order.shippingAddress.city}, {order.shippingAddress.state}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {order.shippingAddress.zipCode}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">
            Order Items
          </h4>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md"
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t dark:border-gray-700 pt-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
              <span className="text-gray-900 dark:text-white">{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Shipping</span>
              <span className="text-gray-900 dark:text-white">{formatCurrency(order.shipping)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Tax</span>
              <span className="text-gray-900 dark:text-white">{formatCurrency(order.tax)}</span>
            </div>
            <div className="flex justify-between font-medium text-base pt-2 border-t dark:border-gray-700">
              <span className="text-gray-900 dark:text-white">Total</span>
              <span className="text-gray-900 dark:text-white">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Order Timeline */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">
            Order Timeline
          </h4>
          <div className="space-y-4">
            {order.timeline?.map((event, index) => (
              <div key={index} className="flex gap-3">
                <div className={cn(
                  "w-2 h-2 mt-2 rounded-full",
                  event.completed ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                )} />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {event.status}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {event.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

OrderDetails.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string,
    orderNumber: PropTypes.string,
    orderDate: PropTypes.string,
    status: PropTypes.string,
    customer: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
    }),
    shippingAddress: PropTypes.shape({
      street: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      zipCode: PropTypes.string,
    }),
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      quantity: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
    })),
    subtotal: PropTypes.number,
    shipping: PropTypes.number,
    tax: PropTypes.number,
    total: PropTypes.number,
    timeline: PropTypes.arrayOf(PropTypes.shape({
      status: PropTypes.string,
      date: PropTypes.string,
      completed: PropTypes.bool,
    })),
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}; 