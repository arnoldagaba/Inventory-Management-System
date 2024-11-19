/********  Notifications *******/
export const roles = [
	"Admin",
	"Manager",
	"Sales Staff",
	"Stock Staff",
	"Customer",
];

/******* Reports *******/
export const salesData = [
	{ date: "2024-11-01", amount: 200000 },
	{ date: "2024-11-02", amount: 300000 },
	{ date: "2024-11-03", amount: 250000 },
];

export const reports = ["Sales", "Inventory"];

export const duration = [7, 30, 90];

/******* Analytics ********/
export const kpiData = [
	{ name: "Average Order Value", value: "120" },
	{ name: "Daily Active Users", value: "2500" },
	{ name: "Revenue Growth", value: "8.5%" },
];

export const salesData2 = [
	{ day: "Mon", value: 200 },
	{ day: "Tue", value: 300 },
	{ day: "Wed", value: 250 },
	{ day: "Thu", value: 400 },
	{ day: "Fri", value: 500 },
];

export const userEngagementData = [
	{ location: "USA", users: 1500 },
	{ location: "Canada", users: 1200 },
	{ location: "UK", users: 800 },
	{ location: "Germany", users: 900 },
];

export const metrics = ["Sales", "Revenue", "User Retention"];

/********** Stock *********/
export const products = [
	{
		id: "p001",
		name: "Product 1",
		stock: 5,
		minThreshold: 10,
		supplier: "Supplier A",
	},
	{
		id: "p002",
		name: "Product 2",
		stock: 50,
		minThreshold: 20,
		supplier: "Supplier B",
	},
	{
		id: "p003",
		name: "Product 3",
		stock: 8,
		minThreshold: 15,
		supplier: "Supplier C",
	},
];

export const stockData = [
	{ name: "Nov 1", stock: 20 },
	{ name: "Nov 2", stock: 15 },
	{ name: "Nov 3", stock: 10 },
	{ name: "Nov 4", stock: 5 },
	{ name: "Nov 5", stock: 8 },
];

/******* Products *******/
export const products2 = [
	{
		id: "p001",
		name: "Product 1",
		price: 500000,
		stock: 50,
		category: "Electronics",
		image: "https://source.unsplash.com/random/150x150?electronics",
	},
	{
		id: "p002",
		name: "Product 2",
		price: 150000,
		stock: 0,
		category: "Books",
		image: "https://source.unsplash.com/random/150x150?books",
	},
	{
		id: "p003",
		name: "Product 3",
		price: 600000,
		stock: 20,
		category: "Apparel",
		image: "https://source.unsplash.com/random/150x150?apparel",
	},
];

export const category = [
	{ value: "", name: "Category" },
	{ value: "Electronics", name: "Electronics" },
	{ value: "Books", name: "Books" },
	{ value: "Apparel", name: "Apparel" },
];

/******** Orders *********/
export const orders = [
	{
		id: "001",
		customer: "Alice",
		status: "Shipped",
		date: "2024-11-08",
		amount: "300000",
	},
	{
		id: "002",
		customer: "Bob",
		status: "Pending",
		date: "2024-11-07",
		amount: "50000",
	},
	{
		id: "003",
		customer: "Charlie",
		status: "Cancelled",
		date: "2024-11-06",
		amount: "550000",
	},
];

export const headers = ["Order ID", "Customer", "Status", "Date", "Amount"];

/******** Dashboard *********/
export const recentActivity = [
	{ type: "Order", content: "New order #1234 created." },
	{ type: "Stock", content: "Product B stock updated to 450." },
	{ type: "Alert", content: "Low stock warning for Product A." },
];

export const stockData2 = [
	{ product: "A", stock: 200 },
	{ product: "B", stock: 450 },
	{ product: "C", stock: 300 },
];

export const salesData3 = [
	{ month: "Jan", sales: 4000 },
	{ month: "Feb", sales: 3000 },
	{ month: "Mar", sales: 5000 },
];

export const actions = ["Add Order", "Update Stock"];

/********* Notifications **********/
export const notifications = [
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