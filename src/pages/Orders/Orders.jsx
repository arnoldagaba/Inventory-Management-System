import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
	PlusIcon,
	MagnifyingGlassIcon,
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
} from "../../components/ui";
import { formatDate } from "../../utils/formatDate";
import { formatCurrency } from "../../utils/formatNumber";
import { orders, orderStatus, tableHeaders } from "../../constants/constants";
import { toast } from "react-toastify";

const Orders = () => {
	const [sortConfig, setSortConfig] = useState({
		key: "date",
		direction: "desc",
	});
	const [searchQuery, setSearchQuery] = useState("");

	const handleSort = useCallback((key) => {
		setSortConfig((prev) => ({
			key,
			direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
		}));
	}, []);

	const handleView = useCallback((order) => {
		toast.info(`Viewing order ${order.id}`);
	}, []);

	const handleEdit = useCallback((e, order) => {
		e.stopPropagation();
		toast.info(`Editing order ${order.id}`);
	}, []);

	const handleDelete = useCallback((e, order) => {
		e.stopPropagation();
		toast.info(`Deleting order ${order.id}`);
	}, []);

	const sortedOrders = [...orders].sort((a, b) => {
		const aValue = a[sortConfig.key];
		const bValue = b[sortConfig.key];

		if (sortConfig.key === "amount") {
			return sortConfig.direction === "asc"
				? Number(aValue) - Number(bValue)
				: Number(bValue) - Number(aValue);
		}

		if (sortConfig.key === "date") {
			return sortConfig.direction === "asc"
				? new Date(aValue) - new Date(bValue)
				: new Date(bValue) - new Date(aValue);
		}

		return sortConfig.direction === "asc"
			? aValue.localeCompare(bValue)
			: bValue.localeCompare(aValue);
	});

	const filteredOrders = sortedOrders.filter(
		(order) =>
			order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
			order.customer.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<Container>
			<div className="space-y-6">
				<div className="flex flex-col sm:flex-row justify-between gap-4">
					<Input
						type="text"
						placeholder="Search orders..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						icon={MagnifyingGlassIcon}
						className="w-full sm:w-64"
					/>

					<Button onClick={() => toast.info("Add new order")}>
						<PlusIcon className="h-5 w-5 mr-2" />
						Add Order
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
										<TableCell>{order.id}</TableCell>
										<TableCell>{order.customer}</TableCell>
										<TableCell>{formatDate(order.date)}</TableCell>
										<TableCell>{formatCurrency(order.amount)}</TableCell>

										<TableCell>
											<Badge
												variant={orderStatus[order.status].color}
												size="sm"
											>
												{orderStatus[order.status].label}
											</Badge>
										</TableCell>

										<TableCell>
											<div className="flex items-center space-x-2">
												<Button
													variant="ghost"
													size="sm"
													onClick={() => handleView(order)}
													className="p-1"
												>
													<EyeIcon className="h-4 w-4" />
												</Button>

												<Button
													variant="ghost"
													size="sm"
													onClick={(e) => handleEdit(e, order)}
													className="p-1"
												>
													<PencilSquareIcon className="h-4 w-4" />
												</Button>
												
												<Button
													variant="ghost"
													size="sm"
													onClick={(e) => handleDelete(e, order)}
													className="p-1 text-red-600 dark:text-red-400"
												>
													<TrashIcon className="h-4 w-4" />
												</Button>
											</div>
										</TableCell>
									</motion.tr>
								))}
							</TableBody>
						</Table>
					</div>
				</Card>
			</div>
		</Container>
	);
};

export default Orders;
