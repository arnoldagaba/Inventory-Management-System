import PropTypes from 'prop-types';
import { Modal } from './ui/Modal';
import { formatCurrency } from '../utils/formatNumber';
import { Badge } from './ui/Badge';

export const ProductDetails = ({ product, isOpen, onClose }) => {
  if (!product) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Product Details"
      size="lg"
    >
      <div className="space-y-6">
        {/* Product Header */}
        <div className="flex items-start gap-6">
          <img
            src={product.image}
            alt={product.name}
            className="h-32 w-32 rounded-md object-cover"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              SKU: {product.sku}
            </p>
            <div className="mt-2">
              <Badge
                variant={product.stock > 20 ? "success" : "warning"}
                size="sm"
              >
                {product.stock} in stock
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(product.price)}
            </p>
          </div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Category
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              {product.category}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Status
            </h4>
            <Badge variant={product.stock > 0 ? "success" : "error"}>
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
          {/* Add more product details as needed */}
        </div>

        {/* Product Description */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
            Description
          </h4>
          <p className="text-gray-600 dark:text-gray-300">
            {product.description || "No description available."}
          </p>
        </div>

        {/* Product History/Activity */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
            Recent Activity
          </h4>
          <div className="space-y-2">
            {/* Add activity items here */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No recent activity.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

ProductDetails.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    sku: PropTypes.string,
    price: PropTypes.number,
    stock: PropTypes.number,
    category: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}; 