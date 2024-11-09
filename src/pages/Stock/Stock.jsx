import React, { useState } from "react";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { CubeIcon } from "@heroicons/react/24/outline";

const StockPage = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const stockData = [
		{ name: "Nov 1", stock: 20 },
		{ name: "Nov 2", stock: 15 },
		{ name: "Nov 3", stock: 10 },
		{ name: "Nov 4", stock: 5 },
		{ name: "Nov 5", stock: 8 },
	];

	const products = [
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

	const handleRestockClick = (product) => {
		setSelectedProduct(product);
		setIsDrawerOpen(true);
	};

	const triggerLowStockAlert = (product) => {
		toast.warn(`Low stock warning for ${product.name}`, {
			className: "shake-animation",
			icon: <CubeIcon />,
		});
	};

	return (
		<div className="p-4 space-y-6">
			{/* Header: Low Stock Alerts */}
			<div className="flex items-center space-x-4 mb-4">
				{products
					.filter((p) => p.stock < p.minThreshold)
					.map((product) => (
						<button
							key={product.id}
							onClick={() => triggerLowStockAlert(product)}
							className="bg-red-500 text-white px-4 py-2 rounded-md"
						>
							{product.name}: Low Stock - Restock Now
						</button>
					))}
			</div>

			{/* Main Section: Inventory Chart */}
			<div className="bg-white rounded-lg shadow-md p-4">
				<h3 className="text-lg font-semibold mb-2">Inventory Trends</h3>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={stockData}>
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="stock" fill="#4f46e5" />
					</BarChart>
				</ResponsiveContainer>
			</div>

			{/* Stock Table */}
			<div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Product
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Stock
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Supplier
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{products.map((product) => (
							<tr
								key={product.id}
								className={`${
									product.stock < product.minThreshold ? "bg-red-50" : ""
								}`}
							>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									{product.name}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									{product.stock}
									{product.stock < product.minThreshold && (
										<span className="ml-2 inline-block px-2 py-1 text-xs font-semibold text-red-700 bg-red-200 rounded-full animate-pulse">
											Low
										</span>
									)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{product.supplier}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									<button
										onClick={() => handleRestockClick(product)}
										className="text-blue-500 hover:underline"
									>
										Restock
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Restock Form Drawer */}
			<Transition show={isDrawerOpen} as={React.Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 overflow-hidden"
					onClose={() => setIsDrawerOpen(false)}
				>
					<div className="absolute inset-0 overflow-hidden">
						<Dialog.Overlay className="absolute inset-0 bg-black opacity-30" />
						<motion.div
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{ type: "spring", damping: 20, stiffness: 300 }}
							className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-xl p-6"
						>
							<h2 className="text-lg font-semibold mb-4">Restock Product</h2>
							<p className="mb-4">
								<strong>Product:</strong> {selectedProduct?.name}
							</p>
							<form className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Quantity
									</label>
									<input
										type="number"
										className="mt-1 px-3 py-2 border rounded-md w-full"
										placeholder="Enter quantity"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Supplier
									</label>
									<input
										type="text"
										value={selectedProduct?.supplier || ""}
										className="mt-1 px-3 py-2 border rounded-md w-full"
										placeholder="Supplier name"
										disabled
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Expected Arrival Date
									</label>
									<input
										type="date"
										className="mt-1 px-3 py-2 border rounded-md w-full"
									/>
								</div>
								<div className="flex justify-end space-x-4 mt-4">
									<button
										onClick={() => {
											toast.success(
												`Restock request for ${selectedProduct?.name} submitted!`
											);
											setIsDrawerOpen(false);
										}}
										type="button"
										className="bg-green-500 text-white px-4 py-2 rounded-md"
									>
										Submit
									</button>
									<button
										onClick={() => setIsDrawerOpen(false)}
										type="button"
										className="bg-gray-500 text-white px-4 py-2 rounded-md"
									>
										Cancel
									</button>
								</div>
							</form>
						</motion.div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default StockPage;
