import React, { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";
import { CircleLoader } from "react-spinners";
// import { FiFilter, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { FunnelIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const OrdersPage = () => {
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [sortOrder, setSortOrder] = useState({
		column: "date",
		direction: "asc",
	});
	const [loading, setLoading] = useState(false);
	const [filters, setFilters] = useState([]);

	const orders = [
		{
			id: "001",
			customer: "Alice",
			status: "Shipped",
			date: "2024-11-08",
			amount: "$100.00",
		},
		{
			id: "002",
			customer: "Bob",
			status: "Pending",
			date: "2024-11-07",
			amount: "$50.00",
		},
		{
			id: "003",
			customer: "Charlie",
			status: "Cancelled",
			date: "2024-11-06",
			amount: "$75.00",
		},
	];

	const handleRowClick = (order) => {
		setSelectedOrder(order);
		setIsDrawerOpen(true);
	};

	const applyFilter = (filter) => {
		setFilters((prev) => [...prev, filter]);
	};

	const clearFilter = (filter) => {
		setFilters(filters.filter((f) => f !== filter));
	};

	const toggleSortOrder = (column) => {
		setSortOrder((prev) => ({
			column,
			direction: prev.direction === "asc" ? "desc" : "asc",
		}));
	};

	return (
		<div className="p-4 space-y-6">
			{/* Header: Search and Filters */}
			<div className="flex items-center space-x-4 mb-4">
				<input
					type="text"
					placeholder="Search Orders..."
					className="px-4 py-2 border rounded-lg w-1/2"
				/>
				<div className="flex space-x-2">
					<button
						onClick={() => applyFilter("Shipped")}
						className="bg-blue-500 text-white px-3 py-1 rounded-full"
					>
						Shipped
					</button>
					<button
						onClick={() => applyFilter("Pending")}
						className="bg-yellow-500 text-white px-3 py-1 rounded-full"
					>
						Pending
					</button>
					<button
						onClick={() => applyFilter("Cancelled")}
						className="bg-red-500 text-white px-3 py-1 rounded-full"
					>
						Cancelled
					</button>
				</div>

				<div className="flex space-x-2">
					{filters.map((filter, idx) => (
						<span
							key={idx}
							className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full cursor-pointer"
							onClick={() => clearFilter(filter)}
						>
							{filter} &times;
						</span>
					))}
				</div>
			</div>

			{/* Order Table */}
			<div className="bg-white rounded-lg shadow-md overflow-hidden">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							{["Order ID", "Customer", "Status", "Date", "Amount"].map(
								(column) => (
									<th
										key={column}
										onClick={() => toggleSortOrder(column.toLowerCase())}
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
									>
										{column}
										{sortOrder.column === column.toLowerCase() && (
											<span>
												{sortOrder.direction === "asc" ? (
                                                    <ArrowUpIcon className="h-4 w-4" />
												) : (
                                                    <ArrowDownIcon className="h-4 w-4" />
												)}
											</span>
										)}
									</th>
								)
							)}
						</tr>
					</thead>

					<tbody className="bg-white divide-y divide-gray-200">
						{loading ? (
							<tr>
								<td colSpan="5" className="text-center py-8">
									<CircleLoader size={40} />
								</td>
							</tr>
						) : (
							orders.map((order) => (
								<motion.tr
									key={order.id}
									className="hover:bg-gray-100 cursor-pointer"
									onClick={() => handleRowClick(order)}
									whileHover={{ scale: 1.02 }}
								>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										{order.id}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{order.customer}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{order.status}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{order.date}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{order.amount}
									</td>
								</motion.tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			<div className="flex justify-end py-2">
				<button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md mr-2">
					Previous
				</button>
				<button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md">
					Next
				</button>
			</div>

			{/* Order Details Drawer */}
			<Transition show={isDrawerOpen} as={React.Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 overflow-hidden"
					onClose={() => setIsDrawerOpen(false)}
				>
					<div className="absolute inset-0 overflow-hidden">
						<Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
						<motion.div
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{ type: "spring", damping: 20, stiffness: 300 }}
							className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-xl"
						>
							<div className="p-6 space-y-4">
								<h2 className="text-lg font-semibold">Order Details</h2>
								<p>
									<strong>Customer:</strong> {selectedOrder?.customer}
								</p>
								<p>
									<strong>Status:</strong> {selectedOrder?.status}
								</p>
								<p>
									<strong>Date:</strong> {selectedOrder?.date}
								</p>
								<p>
									<strong>Amount:</strong> {selectedOrder?.amount}
								</p>
								<div className="flex space-x-4 mt-4">
									<button
										onClick={() => toast.success("Order marked as shipped!")}
										className="bg-blue-500 text-white px-4 py-2 rounded-md"
									>
										Mark as Shipped
									</button>
									<button
										onClick={() => toast.success("Invoice generated!")}
										className="bg-green-500 text-white px-4 py-2 rounded-md"
									>
										Generate Invoice
									</button>
								</div>
							</div>
						</motion.div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default OrdersPage;
