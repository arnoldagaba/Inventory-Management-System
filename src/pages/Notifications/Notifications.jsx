import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Cog6ToothIcon, BellIcon, CubeIcon } from "@heroicons/react/24/outline";

const NotificationsPage = () => {
	const [filter, setFilter] = useState("All");
	const [dateRange, setDateRange] = useState("Last 7 Days");
	const [expandedNotification, setExpandedNotification] = useState(null);

	const notifications = [
		{
			id: 1,
			type: "System",
			title: "System Maintenance",
			description: "Scheduled maintenance at midnight.",
			timestamp: "Today",
			priority: "High",
			read: false,
		},
		{
			id: 2,
			type: "Stock",
			title: "Low Stock Alert",
			description: "Product XYZ is low on stock.",
			timestamp: "Yesterday",
			priority: "Medium",
			read: true,
		},
		{
			id: 3,
			type: "Order",
			title: "Order Shipped",
			description: "Order #12345 has been shipped.",
			timestamp: "Yesterday",
			priority: "Low",
			read: false,
		},
		// More notifications...
	];

	const toggleNotificationExpansion = (id) => {
		setExpandedNotification(expandedNotification === id ? null : id);
	};

	const markAsRead = (id) => {
		// Mark notification as read and update state
		toast.info(`Notification ${id} marked as read`);
	};

	return (
		<div className="p-4 space-y-6">
			{/* Header Section */}
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-2xl font-semibold">Notifications</h2>

				<button className="text-gray-500 hover:text-gray-700">
					<Cog6ToothIcon size={24} />
				</button>
			</div>

			<div className="flex items-center space-x-4 mb-4">
				<select
					onChange={(e) => setFilter(e.target.value)}
					className="px-4 py-2 border rounded-lg"
				>
					<option value="All">All</option>
					<option value="System">System</option>
					<option value="Stock">Stock</option>
					<option value="Order">Order</option>
					<option value="Announcements">Announcements</option>
				</select>

				<select
					onChange={(e) => setDateRange(e.target.value)}
					className="px-4 py-2 border rounded-lg"
				>
					<option value="Last 7 Days">Last 7 Days</option>
					<option value="This Month">This Month</option>
					<option value="Last 3 Months">Last 3 Months</option>
				</select>
			</div>

			{/* Main Notifications Feed */}
			<div className="space-y-4">
				{notifications
					.filter((n) => filter === "All" || n.type === filter)
					.map((notification) => (
						<motion.div
							key={notification.id}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							className={`p-4 rounded-lg shadow-md ${
								notification.read ? "bg-gray-100" : "bg-white"
							} ${
								notification.priority === "High"
									? "border-l-4 border-red-500"
									: ""
							}`}
							onClick={() => toggleNotificationExpansion(notification.id)}
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<div className="text-xl">
										{notification.type === "System" && (
											<BellIcon className="text-blue-500" />
										)}
										{notification.type === "Stock" && (
											<CubeIcon className="text-yellow-500" />
										)}
										{/* Add icons for other types */}
									</div>

									<div>
										<h4 className="text-lg font-semibold">
											{notification.title}
										</h4>
										<p className="text-sm text-gray-600">
											{notification.description}
										</p>
									</div>
								</div>

								<div className="flex items-center space-x-3">
									<span className="text-xs text-gray-500">
										{notification.timestamp}
									</span>
									{!notification.read && (
										<span className="text-xs font-bold text-red-500">New</span>
									)}
								</div>
							</div>

							{/* Expanded Notification Panel */}
							{expandedNotification === notification.id && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: "auto", opacity: 1 }}
									className="mt-3 text-sm text-gray-700"
								>
									<p>Details: {notification.description}</p>
									<div className="flex space-x-4 mt-3">
										<button
											onClick={() => markAsRead(notification.id)}
											className="bg-green-500 text-white px-4 py-1 rounded-md shadow-md"
										>
											Mark as Read
										</button>

										<button className="bg-gray-300 text-gray-800 px-4 py-1 rounded-md shadow-md">
											Dismiss
										</button>
									</div>
								</motion.div>
							)}
						</motion.div>
					))}
			</div>
		</div>
	);
};

export default NotificationsPage;
