import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
	PlusIcon,
	EyeIcon,
	PencilSquareIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import {
	Card,
	Container,
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
	Badge,
	Button,
	Input,
	Tooltip,
} from "../../components/ui";
import { formatCurrency } from "../../utils/formatNumber";
import { orders, tableHeaders } from "../../constants/constants";
import { toast } from "react-toastify";
import { OrderDetails } from "../../components/OrderDetails";

const statusColors = {
	'Pending': 'warning',
	'Processing': 'info',
	'Completed': 'success',
	'Cancelled': 'error'
};

const Orders = () => {
	const [sortConfig, setSortConfig] = useState({
		key: "orderDate",
		direction: "desc",
	});
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);

	const handleSort = useCallback((key) => {
		setSortConfig((prev) => ({
			key,
			direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
		}));
	}, []);

	const handleView = useCallback((order) => {
		setSelectedOrder(order);
		setIsDetailsOpen(true);
	}, []);

	const handleEdit = useCallback((e, order) => {
		e.stopPropagation();
		toast.info(`Editing order ${order.orderNumber}`);
	}, []);

	const handleDelete = useCallback((e, order) => {
		e.stopPropagation();
		toast.info(`Deleting order ${order.orderNumber}`);
	}, []);

	const sortedOrders = [...orders].sort((a, b) => {
		const aValue = a[sortConfig.key];
		const bValue = b[sortConfig.key];

		if (sortConfig.key === "total") {
			return sortConfig.direction === "asc"
				? Number(aValue) - Number(bValue)
				: Number(bValue) - Number(aValue);
		}

		return sortConfig.direction === "asc"
			? String(aValue).localeCompare(String(bValue))
			: String(bValue).localeCompare(String(aValue));
	});

	const filteredOrders = sortedOrders.filter((order) => {
		const searchTerm = searchQuery.toLowerCase();
		const orderNumber = order.orderNumber?.toLowerCase() || '';
		const customerName = order.customer?.name?.toLowerCase() || '';
		
		return orderNumber.includes(searchTerm) || customerName.includes(searchTerm);
	});

	return (
		<Container>
			<div className="space-y-6">
				<div className="flex flex-col sm:flex-row justify-between gap-4">
					<Input
						type="text"
						placeholder="Search orders..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full sm:w-64"
					/>

					<Button 
						onClick={() => toast.info("Create new order")}
						className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white dark:text-gray-100 transition-colors duration-200 whitespace-nowrap inline-flex items-center"
					>
						<PlusIcon className="h-5 w-5 mr-2" />
						New Order
					</Button>
				</div>

				<Card>
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									{tableHeaders.orders.map(({ key, label }) => (
										<TableHead
											key={key}
											onClick={() => handleSort(key)}
											className="cursor-pointer group"
										>
											<div className="flex items-center space-x-1">
												<span>{label}</span>
											</div>
										</TableHead>
									))}
								</TableRow>
							</TableHeader>

							<TableBody>
								{filteredOrders.map((order, index) => (
									<motion.tr
										key={order.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.05 }}
										onClick={() => handleView(order)}
										className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
									>
										<TableCell>{order.orderNumber}</TableCell>
										<TableCell>{order.orderDate}</TableCell>
										<TableCell>{order.customer.name}</TableCell>
										<TableCell>
											<Badge variant={statusColors[order.status]}>
												{order.status}
											</Badge>
										</TableCell>
										<TableCell>{formatCurrency(order.total)}</TableCell>
										<TableCell>
											<div className="flex items-center space-x-2">
												<Tooltip content="View Order">
													<Button
														variant="ghost"
														size="sm"
														onClick={() => handleView(order)}
														className="p-1"
													>
														<EyeIcon className="h-4 w-4" />
													</Button>
												</Tooltip>

												<Tooltip content="Edit Order">
													<Button
														variant="ghost"
														size="sm"
														onClick={(e) => handleEdit(e, order)}
														className="p-1"
													>
														<PencilSquareIcon className="h-4 w-4" />
													</Button>
												</Tooltip>

												<Tooltip content="Delete Order">
													<Button
														variant="ghost"
														size="sm"
														onClick={(e) => handleDelete(e, order)}
														className="p-1 text-red-600 dark:text-red-400"
													>
														<TrashIcon className="h-4 w-4" />
													</Button>
												</Tooltip>
											</div>
										</TableCell>
									</motion.tr>
								))}
							</TableBody>
						</Table>
					</div>
				</Card>
			</div>

			<OrderDetails
				order={selectedOrder}
				isOpen={isDetailsOpen}
				onClose={() => {
					setIsDetailsOpen(false);
					setSelectedOrder(null);
				}}
			/>
		</Container>
	);
};

export default Orders;
