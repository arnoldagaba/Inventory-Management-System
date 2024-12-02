import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	BellIcon,
	CheckCircleIcon,
	XMarkIcon,
	FunnelIcon,
} from "@heroicons/react/24/outline";
import { Card, Container, Button, Badge } from "../../components/ui";
import { getRelativeTime } from "../../utils/formatDate";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useNotifications } from '../../hooks';
import { notificationPriorityColors } from "../../constants/constants";
import { cn } from "../../utils/cn";

const typeIcons = {
	System: BellIcon,
	Stock: FunnelIcon,
	Order: CheckCircleIcon,
};

const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
	const Icon = typeIcons[notification.type] || BellIcon;

	return (
		<motion.div
			id={`notification-${notification.id}`}
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

							<Badge variant={notificationPriorityColors[notification.priority]} size="sm">
								{notification.priority}
							</Badge>
						</div>

						<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
							{notification.description}
						</p>

						<p className="mt-1 text-xs text-gray-400">
							{getRelativeTime(notification.timestamp)}
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
						variant="ghost"
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
	console.log('Notifications component rendered');
	const location = useLocation();
	const selectedNotificationId = location.state?.selectedNotification;
	const [selectedType, setSelectedType] = useState("all");
	const {
		notifications: items,
		markAsRead,
		markAllAsRead,
		deleteNotification: handleDelete,
		clearAll: handleClearAll,
	} = useNotifications();

	useEffect(() => {
		if (selectedNotificationId) {
			const element = document.getElementById(`notification-${selectedNotificationId}`);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
				element.classList.add("bg-blue-50", "dark:bg-blue-900/20");
				setTimeout(() => {
					element.classList.remove("bg-blue-50", "dark:bg-blue-900/20");
				}, 3000);
				markAsRead(selectedNotificationId);
			}
		}
	}, [selectedNotificationId, markAsRead]);

	const filteredItems = items.filter(
		(item) => selectedType === "all" || item.type === selectedType
	);

	const unreadCount = items.filter((item) => !item.read).length;

	return (
		<Container>
			<div className="space-y-6">
				<div className="flex flex-col sm:flex-row justify-between gap-4">
					<div className="flex flex-col sm:flex-row items-center gap-4">
						<select
							value={selectedType}
							onChange={(e) => setSelectedType(e.target.value)}
							
							className={cn(
								"w-full sm:w-auto px-3 py-2 border rounded-lg text-sm",
								"bg-white dark:bg-gray-700",
								"border-gray-300 dark:border-gray-600",
								"text-gray-900 dark:text-white",
								"focus:outline-none focus:ring-2 focus:ring-blue-500"
							)}
						>
							<option value="all">All Notifications</option>
							<option value="System">System Notifications</option>
							<option value="Stock">Stock Updates</option>
							<option value="Order">Order Updates</option>
						</select>

						{unreadCount > 0 && (
							<Button 
								variant="secondary" 
								onClick={markAllAsRead}
								className="w-full sm:w-auto whitespace-nowrap"
							>
								Mark all as read ({unreadCount})
							</Button>
						)}
					</div>

					<Button
						variant="secondary"
						onClick={handleClearAll}
						className={cn(
							"w-full sm:w-auto whitespace-nowrap",
							"text-red-600 dark:text-red-400"
						)}
					>
						Clear All
					</Button>
				</div>

				<Card>
					<div className="divide-y dark:divide-gray-700 notifications-list custom-scrollbar">
						{filteredItems.map((notification) => (
							<NotificationItem
								key={notification.id}
								notification={notification}
								onMarkAsRead={markAsRead}
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
