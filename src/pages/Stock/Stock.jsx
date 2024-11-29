import { useState } from "react";
import { motion } from "framer-motion";
import {
	PlusIcon,
	ArrowUpIcon,
	ArrowDownIcon,
	ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Card, Container, Button, Badge, Input, Tooltip } from "../../components/ui";
import { formatNumberWithComma } from "../../utils/formatNumber";
import { stockItems, stockStatusColors } from "../../constants/constants";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { StockDetails } from '../../components/StockDetails';

const StockItem = ({ item, onUpdateStock, onClick }) => (
	<motion.div
		onClick={onClick}
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		className="p-4 border-b last:border-0 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
	>
		<div className="flex items-start justify-between">
			<div>
				<h3 className="font-medium text-gray-900 dark:text-white">
					{item.name}
				</h3>

				<p className="text-sm text-gray-500 dark:text-gray-400">
					SKU: {item.sku}
				</p>
			</div>

			<Badge variant={stockStatusColors[item.status]} size="sm">
				{item.status}
			</Badge>
		</div>

		<div className="mt-4 flex items-center justify-between">
			<div className="flex items-center space-x-4">
				<div>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						Current Stock
					</p>

					<p className="text-lg font-semibold text-gray-900 dark:text-white">
						{formatNumberWithComma(item.quantity)}
					</p>
				</div>

				<div>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						Reorder Point
					</p>

					<p className="text-lg font-semibold text-gray-900 dark:text-white">
						{formatNumberWithComma(item.reorderPoint)}
					</p>
				</div>
			</div>

			<div className="flex space-x-2">
				<Tooltip content="Decrease stock quantity" size="small">
					<Button
						variant="secondary"
						onClick={() => onUpdateStock(item, "decrease")}
						className="p-2"
						disabled={item.quantity <= 0}
					>
						<ArrowDownIcon className="h-4 w-4" />
					</Button>
				</Tooltip>

				<Tooltip content="Increase stock quantity" size="small">
					<Button
						variant="secondary"
						onClick={() => onUpdateStock(item, "increase")}
						className="p-2"
					>
						<ArrowUpIcon className="h-4 w-4" />
					</Button>
				</Tooltip>
			</div>
		</div>
	</motion.div>
);

StockItem.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		sku: PropTypes.string.isRequired,
		quantity: PropTypes.number.isRequired,
		reorderPoint: PropTypes.number.isRequired,
		status: PropTypes.string.isRequired,
	}).isRequired,
	onUpdateStock: PropTypes.func.isRequired,
	onClick: PropTypes.func.isRequired,
};

const Stock = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [items, setItems] = useState(stockItems);
	const [selectedItem, setSelectedItem] = useState(null);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);

	const handleUpdateStock = (item, action) => {
		if (action === "decrease" && item.quantity <= 0) {
			toast.error("Stock cannot be negative");
			return;
		}

		setItems((prevItems) =>
			prevItems.map((i) => {
				if (i.id === item.id) {
					const newQuantity =
						action === "increase" ? i.quantity + 1 : i.quantity - 1;
					const newStatus =
						newQuantity <= i.reorderPoint / 2
							? "Critical"
							: newQuantity <= i.reorderPoint
							? "Low"
							: "Optimal";
					return { ...i, quantity: newQuantity, status: newStatus };
				}

				return i;
			})
		);

		toast.success(
			`${action === "increase" ? "Added" : "Removed"} 1 unit of ${item.name}`
		);
	};

	const handleItemClick = (item) => {
		setSelectedItem(item);
		setIsDetailsOpen(true);
	};

	const filteredItems = items.filter(
		(item) =>
			item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.sku.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const lowStockItems = filteredItems.filter(
		(item) => item.status !== "Optimal"
	);

	return (
		<Container>
			<div className="space-y-6">
				{lowStockItems.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
					>
						<Card className="bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-700">
							<div className="flex items-start space-x-3">
								<ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mt-0.5" />

								<div>
									<h3 className="font-medium text-yellow-800 dark:text-yellow-300">
										Low Stock Alert
									</h3>

									<p className="mt-1 text-sm text-yellow-700 dark:text-yellow-400">
										{lowStockItems.length} items need attention
									</p>
								</div>
							</div>
						</Card>
					</motion.div>
				)}

				<div className="flex flex-col sm:flex-row justify-between gap-4">
					<Input
						type="text"
						placeholder="Search stock items..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full sm:w-64"
					/>

					<Button 
						onClick={() => toast.info("Add new stock item")}
						className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white dark:text-gray-100 transition-colors duration-200 whitespace-nowrap inline-flex items-center"
					>
						<PlusIcon className="h-5 w-5 mr-2" />
						Add Item
					</Button>
				</div>

				<Card>
					<div className="divide-y dark:divide-gray-700">
						{filteredItems.map((item) => (
							<StockItem
								key={item.id}
								item={item}
								onUpdateStock={handleUpdateStock}
								onClick={() => handleItemClick(item)}
							/>
						))}

						{filteredItems.length === 0 && (
							<div className="text-center py-8 text-gray-500 dark:text-gray-400">
								o items found matching your search.
							</div>
						)}
					</div>
				</Card>
			</div>

			<StockDetails
				item={selectedItem}
				isOpen={isDetailsOpen}
				onClose={() => {
					setIsDetailsOpen(false);
					setSelectedItem(null);
				}}
			/>
		</Container>
	);
};

export default Stock;
