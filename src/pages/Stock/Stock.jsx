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
import { products, stockData } from "../../constants/constants";
import { useTheme } from "../../hooks/useTheme";

const Stock = () => {
	const { theme } = useTheme();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);

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
				{/*  TODO: Maybe these function of this button should be changed */}
				{products
					.filter((p) => p.stock < p.minThreshold)
					.map((product) => (
						<button
							key={product.id}
							onClick={() => triggerLowStockAlert(product)}
							className="bg-red-600 dark:bg-red-700 text-white px-4 py-2 rounded-md"
						>
							{product.name}: Low on Stock - Restock Now
						</button>
					))}
			</div>

			{/* Main Section: Inventory Chart */}
			<div className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-4">
				<h3 className="text-lg font-semibold mb-2 dark:text-white">
					Inventory Trends
				</h3>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={stockData}>
						<XAxis
							dataKey="name"
							stroke={theme === "dark" ? "white" : "black"}
						/>
						<YAxis stroke={theme === "dark" ? "white" : "black"} />
						<Tooltip />
						<Bar dataKey="stock" fill="#4f46e5" />
					</BarChart>
				</ResponsiveContainer>
			</div>

			{/* Stock Table */}
			<div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
				<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-500">
					<thead className="bg-gray-50 dark:bg-slate-500">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
								Product
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
								Stock
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
								Supplier
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>

					<tbody className="bg-white dark:bg-slate-700  divide-y divide-gray-200 dark:divide-gray-500">
						{products.map((product) => (
							<tr
								key={product.id}
								className={`${
									product.stock < product.minThreshold
										? "bg-red-50 dark:bg-inherit"
										: ""
								} `}
							>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
									{product.name}
								</td>

								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
									{product.stock}
									{product.stock < product.minThreshold && (
										<span className="ml-2 inline-block px-2 py-1 text-xs font-semibold text-red-700 dark:text-red-800 bg-red-200 dark:bg-red-300 rounded-full animate-pulse">
											Low
										</span>
									)}
								</td>

								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">
									{product.supplier}
								</td>

								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">
									<button
										onClick={() => handleRestockClick(product)}
										className="text-blue-400 hover:underline"
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

export default Stock;
