import { useState } from "react";
import { motion } from "framer-motion";
import {
	BellIcon,
	CheckCircleIcon,
	XMarkIcon,
	FunnelIcon,
} from "@heroicons/react/24/outline";
import { Card, Container, Button, Badge } from "../../components/ui";
import { formatDate } from "../../utils/formatDate";
import { notifications } from "../../constants/constants";

const priorityColors = {
	High: "error",
	Medium: "warning",
	Low: "info",
};

const typeIcons = {
	System: BellIcon,
	Stock: FunnelIcon,
	Order: CheckCircleIcon,
};

const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
	const Icon = typeIcons[notification.type] || BellIcon;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, x: -20 }}
			className={`p-4 border-b last:border-0 dark:border-gray-700 ${
				!notification.read ? "bg-blue-50 dark:bg-blue-900/20" : ""
			}`}
		>
			<div className="flex items-start justify-between gap-4">
				<div className="flex items-start space-x-3">
					<Icon className="h-6 w-6 text-gray-400 mt-1" />
					<div>
						<div className="flex items-center space-x-2">
							<h3 className="font-medium text-gray-900 dark:text-white">
								{notification.title}
							</h3>
							<Badge variant={priorityColors[notification.priority]} size="sm">
								{notification.priority}
							</Badge>
						</div>
						<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
							{notification.description}
						</p>
						<p className="mt-1 text-xs text-gray-400">
							{notification.timestamp}
						</p>
					</div>
				</div>

				<div className="flex items-center space-x-2">
					{!notification.read && (
						<Button
							variant="secondary"
							onClick={() => onMarkAsRead(notification.id)}
							className="text-sm"
						>
							Mark as read
						</Button>
					)}
					<Button
						variant="secondary"
						onClick={() => onDelete(notification.id)}
						className="p-1 text-red-600 dark:text-red-400"
					>
						<XMarkIcon className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</motion.div>
	);
};

NotificationItem.propTypes = {
	notification: PropTypes.shape({
		id: PropTypes.number.isRequired,
		type: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		timestamp: PropTypes.string.isRequired,
		priority: PropTypes.string.isRequired,
		read: PropTypes.bool.isRequired,
	}).isRequired,
	onMarkAsRead: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
};

const Notifications = () => {
	const [selectedType, setSelectedType] = useState("all");
	const [items, setItems] = useState(notifications);

	const handleMarkAsRead = (id) => {
		setItems((prev) =>
			prev.map((item) =>
				item.id === id ? { ...item, read: true } : item
			)
		);
	};

	const handleDelete = (id) => {
		setItems((prev) => prev.filter((item) => item.id !== id));
	};

	const handleMarkAllAsRead = () => {
		setItems((prev) => prev.map((item) => ({ ...item, read: true })));
	};

	const handleClearAll = () => {
		setItems([]);
	};

	const filteredItems = items.filter(
		(item) => selectedType === "all" || item.type === selectedType
	);

	const unreadCount = items.filter((item) => !item.read).length;

	return (
		<Container>
			<div className="space-y-6">
				<div className="flex flex-col sm:flex-row justify-between gap-4">
					<div className="flex flex-col sm:flex-row gap-4">
						<select
							value={selectedType}
							onChange={(e) => setSelectedType(e.target.value)}
							className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
						>
							<option value="all">All Types</option>
							<option value="System">System</option>
							<option value="Stock">Stock</option>
							<option value="Order">Order</option>
						</select>

						{unreadCount > 0 && (
							<Button variant="secondary" onClick={handleMarkAllAsRead}>
								Mark all as read
							</Button>
						)}
					</div>

					<Button
						variant="secondary"
						onClick={handleClearAll}
						className="text-red-600 dark:text-red-400"
					>
						Clear All
					</Button>
				</div>

				<Card>
					<div className="divide-y dark:divide-gray-700">
						{filteredItems.map((notification) => (
							<NotificationItem
								key={notification.id}
								notification={notification}
								onMarkAsRead={handleMarkAsRead}
								onDelete={handleDelete}
							/>
						))}
						{filteredItems.length === 0 && (
							<div className="text-center py-8 text-gray-500 dark:text-gray-400">
								<BellIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
								<p>No notifications found.</p>
							</div>
						)}
					</div>
				</Card>
			</div>
		</Container>
	);
};

export default Notifications;
