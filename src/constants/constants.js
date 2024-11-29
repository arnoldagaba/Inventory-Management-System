/******** Auth Pages *********/
export const authMessages = {
	LOGIN_SUCCESS: "Logged in successfully!",
	SIGNUP_SUCCESS: "Account created successfully!",
	RESET_EMAIL_SENT: "Password reset email sent!",
	LOGOUT_SUCCESS: "Logged out successfully!",
};

/******** Dashboard Page *********/
import {
	ShoppingBagIcon,
	CreditCardIcon,
	RectangleStackIcon,
	UsersIcon,
} from "@heroicons/react/24/outline";

export const dashboardStats = [
	{
		title: "Total Orders",
		value: 1240,
		icon: ShoppingBagIcon,
		trend: 12,
		color: "blue",
	},
	{
		title: "Revenue",
		value: 43210,
		icon: CreditCardIcon,
		trend: -5,
		color: "green",
	},
	{
		title: "Products",
		value: 789,
		icon: RectangleStackIcon,
		trend: 8,
		color: "purple",
	},
	{
		title: "Customers",
		value: 3200,
		icon: UsersIcon,
		trend: 15,
		color: "orange",
	},
];

export const dashboardChartData = {
	sales: [
		{ name: "Jan", value: 4000 },
		{ name: "Feb", value: 3000 },
		{ name: "Mar", value: 5000 },
		{ name: "Apr", value: 4500 },
		{ name: "May", value: 6000 },
		{ name: "Jun", value: 5500 },
		{ name: "Jul", value: 7000 },
	],
	stock: [
		{ name: "Product A", stock: 45 },
		{ name: "Product B", stock: 32 },
		{ name: "Product C", stock: 18 },
		{ name: "Product D", stock: 67 },
		{ name: "Product E", stock: 25 },
	],
};

/******** Analytics Page *********/
export const analyticsMetrics = {
	totalRevenue: {
		value: 12500000,
		trend: 15,
		label: "Total Revenue",
	},
	averageOrder: {
		value: 250000,
		trend: 8,
		label: "Average Order Value",
	},
	orderCount: {
		value: 450,
		trend: -5,
		label: "Total Orders",
	},
	customerCount: {
		value: 280,
		trend: 12,
		label: "New Customers",
	},
};

export const analyticsChartData = {
	revenue: [
		{ month: "Jan", revenue: 4500000 },
		{ month: "Feb", revenue: 5200000 },
		{ month: "Mar", revenue: 4800000 },
		{ month: "Apr", revenue: 6300000 },
		{ month: "May", revenue: 5900000 },
		{ month: "Jun", revenue: 7100000 },
	],
	categories: [
		{ name: "Electronics", value: 45 },
		{ name: "Clothing", value: 25 },
		{ name: "Food", value: 20 },
		{ name: "Other", value: 10 },
	],
	orderStatus: [
		{ status: "Completed", count: 250 },
		{ status: "Pending", count: 120 },
		{ status: "Processing", count: 80 },
		{ status: "Cancelled", count: 30 },
	],
};

export const chartColors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

/******** Orders Page *********/
export const orders = [
	{
		id: "001",
		customer: "Alice",
		status: "SHIPPED",
		date: "2024-11-08",
		amount: "300000",
	},
	{
		id: "002",
		customer: "Bob",
		status: "PENDING",
		date: "2024-11-07",
		amount: "50000",
	},
	{
		id: "003",
		customer: "Charlie",
		status: "CANCELLED",
		date: "2024-11-06",
		amount: "550000",
	},
];

export const orderStatus = {
	PENDING: {
		label: "Pending",
		color: "warning",
	},
	PROCESSING: {
		label: "Processing",
		color: "info",
	},
	SHIPPED: {
		label: "Shipped",
		color: "success",
	},
	DELIVERED: {
		label: "Delivered",
		color: "success",
	},
	CANCELLED: {
		label: "Cancelled",
		color: "error",
	},
};

/******** Products Page *********/
export const products = [
	{
		id: "1",
		name: "Product A",
		sku: "SKU001",
		price: 150000,
		stock: 45,
		category: "Electronics",
		image: "https://via.placeholder.com/150",
	},
	// Add more products...
];

export const productCategories = ["Electronics", "Clothing", "Food", "Other"];

export const stockItems = [
	{
		id: "STOCK001",
		name: "Laptop X1",
		sku: "LAP001",
		quantity: 15,
		reorderPoint: 20,
		lastUpdated: "2024-03-01",
		status: "Low",
	},
	{
		id: "STOCK002",
		name: "Smartphone Y2",
		sku: "PHN002",
		quantity: 45,
		reorderPoint: 25,
		lastUpdated: "2024-03-05",
		status: "Optimal",
	},
	{
		id: "STOCK003",
		name: "Tablet Z3",
		sku: "TAB003",
		quantity: 8,
		reorderPoint: 15,
		lastUpdated: "2024-03-10",
		status: "Critical",
	},
];

export const stockStatusColors = {
	Optimal: "success",
	Low: "warning",
	Critical: "error",
};
/******** Reports Page *********/
export const reports = [
	{
		id: "REP001",
		name: "Monthly Sales Report",
		type: "Sales",
		date: "2024-03-01",
		status: "Ready",
	},
	{
		id: "REP002",
		name: "Inventory Status",
		type: "Inventory",
		date: "2024-03-05",
		status: "Processing",
	},
	{
		id: "REP003",
		name: "Customer Analytics",
		type: "Analytics",
		date: "2024-03-10",
		status: "Ready",
	},
];

/******** Table Headers *********/
export const tableHeaders = {
	orders: [
		{ key: "id", label: "Order ID" },
		{ key: "customer", label: "Customer" },
		{ key: "date", label: "Date" },
		{ key: "amount", label: "Amount" },
		{ key: "status", label: "Status" },
		{ key: "actions", label: "Actions" },
	],
	products: [
		{ key: "name", label: "Product Name" },
		{ key: "sku", label: "SKU" },
		{ key: "price", label: "Price" },
		{ key: "stock", label: "Stock" },
		{ key: "category", label: "Category" },
		{ key: "actions", label: "Actions" },
	],
};

/******** Activity Feed *********/
export const activity = [
	{
		type: "New Order",
		content: "John Doe placed an order for UGX 250,000",
		timestamp: "2024-03-08T10:30:00Z",
	},
	{
		type: "Stock Alert",
		content: "Product 'Laptop X1' is running low on stock",
		timestamp: "2024-03-08T09:15:00Z",
	},
	{
		type: "Payment Received",
		content: "Payment received for Order #12345",
		timestamp: "2024-03-08T08:45:00Z",
	},
	{
		type: "New Customer",
		content: "Jane Smith created an account",
		timestamp: "2024-03-08T07:20:00Z",
	},
	{
		type: "Shipment Update",
		content: "Order #12344 has been delivered",
		timestamp: "2024-03-08T06:10:00Z",
	},
];

export const reportStatusColors = {
	Ready: "success",
	Processing: "warning",
	Failed: "error",
};

/******** Notifications *********/
export const notifications = [
	{
		id: 1,
		type: "Stock",
		title: "Low Stock Alert",
		description: "Laptop X1 stock has fallen below the reorder point (5 units remaining)",
		timestamp: "2024-03-08T09:15:00Z",
		priority: "High",
		read: false,
	},
	{
		id: 2,
		type: "Order",
		title: "New Order Received",
		description: "Order #1234 received from John Doe worth UGX 1,500,000",
		timestamp: "2024-03-08T10:30:00Z",
		priority: "Medium",
		read: false,
	},
	{
		id: 3,
		type: "System",
		title: "Backup Completed",
		description: "System backup completed successfully",
		timestamp: "2024-03-08T08:00:00Z",
		priority: "Low",
		read: true,
	},
	{
		id: 4,
		type: "Order",
		title: "Order Delivered",
		description: "Order #1230 has been marked as delivered",
		timestamp: "2024-03-07T15:45:00Z",
		priority: "Medium",
		read: true,
	},
	{
		id: 5,
		type: "Stock",
		title: "Critical Stock Alert",
		description: "Smartphone Y2 is out of stock! Immediate reorder required",
		timestamp: "2024-03-08T11:20:00Z",
		priority: "High",
		read: false,
	},
	{
		id: 6,
		type: "System",
		title: "System Update Available",
		description: "New system update v2.1.0 is available for installation",
		timestamp: "2024-03-07T14:30:00Z",
		priority: "Medium",
		read: true,
	},
	{
		id: 7,
		type: "Order",
		title: "Payment Received",
		description: "Payment received for Order #1235 - UGX 2,300,000",
		timestamp: "2024-03-08T12:15:00Z",
		priority: "Medium",
		read: false,
	},
	{
		id: 8,
		type: "Stock",
		title: "Stock Adjustment",
		description: "Manual stock adjustment made for Tablet Z3 (+10 units)",
		timestamp: "2024-03-07T16:45:00Z",
		priority: "Low",
		read: true,
	},
];

// Notification type icons mapping
export const notificationTypeIcons = {
	System: "BellIcon",
	Stock: "FunnelIcon",
	Order: "CheckCircleIcon",
};

// Notification priority colors
export const notificationPriorityColors = {
	High: "error",
	Medium: "warning",
	Low: "info",
};

// Unread notifications for navbar dropdown
export const unreadNotifications = notifications
	.filter(notification => !notification.read)
	.slice(0, 5); // Only show latest 5 unread notifications
