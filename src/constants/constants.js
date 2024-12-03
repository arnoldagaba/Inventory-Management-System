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
		id: "1",
		orderNumber: "ORD-001",
		orderDate: "2024-03-15",
		status: "Pending",
		total: 1250.00,
		customer: {
			name: "John Doe",
			email: "john@example.com",
			phone: "+1234567890"
		},
		shippingAddress: {
			street: "123 Main St",
			city: "New York",
			state: "NY",
			zipCode: "10001"
		},
		items: [
			{
				name: "Product A",
				quantity: 2,
				price: 500.00,
				image: "https://via.placeholder.com/150"
			},
			{
				name: "Product B",
				quantity: 1,
				price: 250.00,
				image: "https://via.placeholder.com/150"
			}
		],
		subtotal: 1000.00,
		shipping: 150.00,
		tax: 100.00,
		timeline: [
			{
				status: "Order Placed",
				date: "2024-03-15",
				completed: true
			},
			{
				status: "Processing",
				date: "2024-03-16",
				completed: false
			}
		]
	},
	{
		id: "2",
		orderNumber: "ORD-002",
		orderDate: "2024-03-14",
		status: "Processing",
		total: 850.00,
		customer: {
			name: "Jane Smith",
			email: "jane@example.com",
			phone: "+1234567891"
		},
		shippingAddress: {
			street: "456 Oak Ave",
			city: "Los Angeles",
			state: "CA",
			zipCode: "90001"
		},
		items: [
			{
				name: "Product C",
				quantity: 3,
				price: 200.00,
				image: "https://via.placeholder.com/150"
			}
		],
		subtotal: 600.00,
		shipping: 150.00,
		tax: 100.00,
		timeline: [
			{
				status: "Order Placed",
				date: "2024-03-14",
				completed: true
			},
			{
				status: "Payment Confirmed",
				date: "2024-03-14",
				completed: true
			},
			{
				status: "Processing",
				date: "2024-03-15",
				completed: true
			},
			{
				status: "Shipping",
				date: "2024-03-16",
				completed: false
			}
		]
	},
	{
		id: "3",
		orderNumber: "ORD-003",
		orderDate: "2024-03-13",
		status: "Completed",
		total: 2100.00,
		customer: {
			name: "Robert Johnson",
			email: "robert@example.com",
			phone: "+1234567892"
		},
		shippingAddress: {
			street: "789 Pine St",
			city: "Chicago",
			state: "IL",
			zipCode: "60601"
		},
		items: [
			{
				name: "Product D",
				quantity: 1,
				price: 1500.00,
				image: "https://via.placeholder.com/150"
			},
			{
				name: "Product E",
				quantity: 2,
				price: 300.00,
				image: "https://via.placeholder.com/150"
			}
		],
		subtotal: 1800.00,
		shipping: 200.00,
		tax: 100.00,
		timeline: [
			{
				status: "Order Placed",
				date: "2024-03-13",
				completed: true
			},
			{
				status: "Processing",
				date: "2024-03-13",
				completed: true
			},
			{
				status: "Shipped",
				date: "2024-03-14",
				completed: true
			},
			{
				status: "Delivered",
				date: "2024-03-15",
				completed: true
			}
		]
	},
	{
		id: "4",
		orderNumber: "ORD-004",
		orderDate: "2024-03-12",
		status: "Cancelled",
		total: 450.00,
		customer: {
			name: "Sarah Wilson",
			email: "sarah@example.com",
			phone: "+1234567893"
		},
		shippingAddress: {
			street: "321 Elm St",
			city: "Houston",
			state: "TX",
			zipCode: "77001"
		},
		items: [
			{
				name: "Product F",
				quantity: 1,
				price: 450.00,
				image: "https://via.placeholder.com/150"
			}
		],
		subtotal: 450.00,
		shipping: 0.00,
		tax: 0.00,
		timeline: [
			{
				status: "Order Placed",
				date: "2024-03-12",
				completed: true
			},
			{
				status: "Cancelled",
				date: "2024-03-12",
				completed: true
			}
		]
	}
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
		name: "MacBook Pro M2",
		sku: "SKU001",
		price: 5500000,  // UGX 5.5M
		stock: 45,
		category: "Electronics",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "2",
		name: "Samsung 4K Smart TV",
		sku: "SKU002",
		price: 3200000,  // UGX 3.2M
		stock: 30,
		category: "Electronics",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "3",
		name: "Nike Air Max",
		sku: "SKU003",
		price: 450000,  // UGX 450K
		stock: 100,
		category: "Footwear",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "4",
		name: "Leather Office Chair",
		sku: "SKU004",
		price: 850000,  // UGX 850K
		stock: 25,
		category: "Furniture",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "5",
		name: "iPhone 14 Pro",
		sku: "SKU005",
		price: 3800000,  // UGX 3.8M
		stock: 50,
		category: "Electronics",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "6",
		name: "Coffee Maker Deluxe",
		sku: "SKU006",
		price: 280000,  // UGX 280K
		stock: 60,
		category: "Appliances",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "7",
		name: "Gaming Mouse",
		sku: "SKU007",
		price: 220000,  // UGX 220K
		stock: 80,
		category: "Electronics",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "8",
		name: "Yoga Mat Premium",
		sku: "SKU008",
		price: 95000,  // UGX 95K
		stock: 120,
		category: "Sports",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "9",
		name: "Wireless Earbuds",
			sku: "SKU009",
		price: 550000,  // UGX 550K
		stock: 75,
		category: "Electronics",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "10",
		name: "Standing Desk",
		sku: "SKU010",
		price: 1500000,  // UGX 1.5M
		stock: 20,
		category: "Furniture",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "11",
		name: "Protein Powder",
		sku: "SKU011",
		price: 150000,  // UGX 150K
		stock: 150,
		category: "Health",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "12",
		name: "Smart Watch",
		sku: "SKU012",
		price: 750000,  // UGX 750K
		stock: 40,
		category: "Electronics",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "13",
		name: "Backpack Pro",
			sku: "SKU013",
		price: 180000,  // UGX 180K
		stock: 90,
		category: "Accessories",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "14",
		name: "Air Purifier",
		sku: "SKU014",
		price: 480000,  // UGX 480K
		stock: 35,
		category: "Appliances",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "15",
		name: "Mechanical Keyboard",
			sku: "SKU015",
		price: 320000,  // UGX 320K
		stock: 65,
		category: "Electronics",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "16",
		name: "Running Shoes",
		sku: "SKU016",
		price: 280000,  // UGX 280K
		stock: 85,
		category: "Footwear",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "17",
		name: "Blender Pro",
		sku: "SKU017",
		price: 250000,  // UGX 250K
		stock: 45,
		category: "Appliances",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "18",
		name: "Desk Lamp",
		sku: "SKU018",
		price: 120000,  // UGX 120K
		stock: 70,
		category: "Furniture",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "19",
		name: "Tablet Stand",
		sku: "SKU019",
		price: 85000,  // UGX 85K
		stock: 100,
		category: "Accessories",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "20",
		name: "Water Bottle",
		sku: "SKU020",
		price: 65000,  // UGX 65K
		stock: 200,
		category: "Sports",
		image: "https://via.placeholder.com/150",
	}
];

export const productCategories = [
	"Electronics",
	"Furniture",
	"Appliances",
	"Sports",
	"Footwear",
	"Health",
	"Accessories"
];

export const stockItems = [
	{
		id: "STOCK001",
		name: "MacBook Pro M2",
		sku: "LAP001",
		quantity: 15,
		reorderPoint: 20,
		lastUpdated: "2024-03-01",
		status: "Low",
	},
	{
		id: "STOCK002",
		name: "Samsung 4K Smart TV",
		sku: "TV002",
		quantity: 45,
		reorderPoint: 25,
		lastUpdated: "2024-03-05",
		status: "Optimal",
	},
	{
		id: "STOCK003",
		name: "iPhone 14 Pro",
		sku: "PHN003",
		quantity: 8,
		reorderPoint: 15,
		lastUpdated: "2024-03-10",
		status: "Critical",
	},
	{
		id: "STOCK004",
		name: "Gaming Mouse",
		sku: "ACC004",
		quantity: 30,
		reorderPoint: 20,
		lastUpdated: "2024-03-12",
		status: "Optimal",
	},
	{
		id: "STOCK005",
		name: "Mechanical Keyboard",
		sku: "ACC005",
		quantity: 12,
		reorderPoint: 15,
		lastUpdated: "2024-03-13",
		status: "Low",
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
		type: "Order",
		content: "New order #1234 received",
		timestamp: "2024-03-15T10:30:00Z",
		status: "pending",
		user: "System",
		details: {
			orderId: "1234",
			amount: 1107000,  // UGX 1,107,000 (≈ $299)
			items: 3,
			customer: "John Doe"
		},
		relatedItems: [
			{ name: "Order #1234", type: "order" },
			{ name: "John Doe", type: "customer" }
		]
	},
	{
		type: "Stock",
		content: "Low stock alert for Product A",
		timestamp: "2024-03-15T09:15:00Z",
		status: "warning",
		user: "System",
		details: {
			productId: "P123",
			currentStock: 5,
			reorderPoint: 10
		},
		relatedItems: [
			{ name: "Product A", type: "product" }
		]
	},
	// ... add more activity items with detailed information
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
