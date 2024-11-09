import React, { useState } from "react";
import {
	LineChart,
	Line,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";

const Analytics = () => {
	const [selectedMetric, setSelectedMetric] = useState("Sales");
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [dateRange, setDateRange] = useState("Last 30 Days");
	const [comparison, setComparison] = useState(false);

	const kpiData = [
		{ name: "Average Order Value", value: "$120" },
		{ name: "Daily Active Users", value: "2,500" },
		{ name: "Revenue Growth", value: "8.5%" },
	];

	const salesData = [
		{ day: "Mon", value: 200 },
		{ day: "Tue", value: 300 },
		{ day: "Wed", value: 250 },
		{ day: "Thu", value: 400 },
		{ day: "Fri", value: 500 },
	];

	const userEngagementData = [
		{ location: "USA", users: 1500 },
		{ location: "Canada", users: 1200 },
		{ location: "UK", users: 800 },
		{ location: "Germany", users: 900 },
	];

	const toggleComparison = () => setComparison(!comparison);

	const updateDateRange = (range) => {
		setDateRange(range);
		toast.info(`Date range updated to ${range}`);
	};

	return (
		<div className="p-4 space-y-6">
			{/* Header: Metrics Selector */}
			<div className="flex items-center space-x-4 mb-4">
				<select
					onChange={(e) => setSelectedMetric(e.target.value)}
					className="px-4 py-2 border rounded-lg"
				>
					<option value="Sales">Sales</option>
					<option value="Revenue">Revenue</option>
					<option value="User Retention">User Retention</option>
				</select>

				<p className="text-xl font-semibold">{selectedMetric} Analytics</p>
			</div>

			{/* KPI Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{kpiData.map((kpi, index) => (
					<motion.div
						key={index}
						className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
						whileHover={{ scale: 1.05 }}
					>
						<h3 className="text-lg font-semibold">{kpi.name}</h3>
						<p className="text-2xl font-bold">{kpi.value}</p>

						<motion.div
							className="absolute bg-black text-white text-xs rounded p-2"
							style={{ opacity: 0 }}
							whileHover={{ opacity: 1 }}
						>
							{`Change over time: +5%`}
						</motion.div>
					</motion.div>
				))}
			</div>

			{/* Main Section: Charts and Graphs */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="bg-white p-4 rounded-lg shadow-md">
					<h3 className="text-lg font-semibold mb-2">Sales Trends</h3>
					<ResponsiveContainer width="100%" height={300}>
						<LineChart data={salesData}>
							<XAxis dataKey="day" />
							<YAxis />
							<Tooltip />
							<Line
								type="monotone"
								dataKey="value"
								stroke="#4f46e5"
								strokeWidth={2}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>

				<div className="bg-white p-4 rounded-lg shadow-md">
					<h3 className="text-lg font-semibold mb-2">
						User Engagement by Location
					</h3>

					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={userEngagementData}>
							<XAxis dataKey="location" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="users" fill="#82ca9d" />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* Date Range Picker */}
			<div className="flex items-center space-x-4 mt-6">
				<button
					onClick={() => updateDateRange("Last 7 Days")}
					className="px-4 py-2 border rounded-lg"
				>
					Last 7 Days
				</button>

				<button
					onClick={() => updateDateRange("Last 30 Days")}
					className="px-4 py-2 border rounded-lg"
				>
					Last 30 Days
				</button>

				<button
					onClick={() => updateDateRange("Last 90 Days")}
					className="px-4 py-2 border rounded-lg"
				>
					Last 90 Days
				</button>

				<div className="flex items-center ml-auto">
					<label className="mr-2">Compare to Last Period</label>
          
					<div className="relative inline-flex">
						<input
							type="checkbox"
							checked={comparison}
							onChange={toggleComparison}
							className="hidden"
						/>
						<motion.div
							className="w-12 h-6 bg-gray-200 rounded-full shadow-inner"
							whileTap={{ scale: 0.95 }}
						>
							<motion.div
								animate={{ x: comparison ? 24 : 0 }}
								transition={{ type: "spring", stiffness: 300 }}
								className="w-6 h-6 bg-blue-500 rounded-full shadow-md"
							/>
						</motion.div>
					</div>
				</div>
			</div>

			{/* Sidebar (Optional): Filters and Comparisons */}
			<Transition show={isSidebarOpen} as={React.Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 overflow-hidden"
					onClose={() => setIsSidebarOpen(false)}
				>
					<div className="absolute inset-0 overflow-hidden">
						<Dialog.Overlay className="absolute inset-0 bg-black opacity-30" />

						<motion.div
							initial={{ x: "-100%" }}
							animate={{ x: 0 }}
							exit={{ x: "-100%" }}
							transition={{ type: "spring", damping: 20, stiffness: 300 }}
							className="absolute inset-y-0 left-0 max-w-md w-full bg-white shadow-xl p-6"
						>
							<h2 className="text-lg font-semibold mb-4">Filters</h2>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Select Period
									</label>

									<select className="mt-1 px-3 py-2 border rounded-md w-full">
										<option>Monthly</option>
										<option>Quarterly</option>
										<option>Yearly</option>
									</select>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700">
										Comparison Metric
									</label>

									<select className="mt-1 px-3 py-2 border rounded-md w-full">
										<option>Last Month</option>
										<option>Last Quarter</option>
										<option>Last Year</option>
									</select>
								</div>

								<button
									onClick={() => setIsSidebarOpen(false)}
									className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md w-full"
								>
									Apply Filters
								</button>
							</div>
						</motion.div>
					</div>
				</Dialog>
			</Transition>

			{/* Toggle Sidebar Button */}
			<button
				onClick={() => setIsSidebarOpen(true)}
				className="fixed bottom-6 right-6 bg-gray-700 text-white p-3 rounded-full shadow-lg"
			>
				Filters
			</button>
		</div>
	);
};

export default Analytics;
