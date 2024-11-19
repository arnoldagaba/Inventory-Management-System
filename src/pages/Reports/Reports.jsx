import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
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
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import { CloudArrowDownIcon } from "@heroicons/react/24/outline";
import { duration, reports, salesData } from "../../constants/constants";
import { formatNumberWithComma } from "../../utils/formatNumber";
import { useTheme } from "../../hooks/useTheme";

const Reports = () => {
	const { theme } = useTheme();

	const [reportType, setReportType] = useState("Sales");
	const [dateRange, setDateRange] = useState("Last 30 Days");
	const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
	const [dataPreview, setDataPreview] = useState("table"); // 'table' or 'chart'

	const generateReport = () => {
		toast.success(`Generating ${reportType} report for ${dateRange}`);
		// Placeholder function for TODO: report generation logic
	};

	const exportReport = (format) => {
		toast.info(`Exporting report as ${format}`);
		// Placeholder export logic, can use libraries like json2csv for CSV export or pdfmake for PDF
		// TODO: Add more formats
		if (format === "CSV") {
			// TODO: Try to fix this logic
			const blob = new Blob([JSON.stringify(salesData)], {
				type: "text/csv;charset=utf-8;",
			});
			saveAs(blob, "report.csv");
		}
	};

	return (
		<div className="p-4 space-y-6">
			{/* Header: Report Type and Date Selection */}
			<div className="flex items-center space-x-4 mb-4">
				<select
					onChange={(e) => setReportType(e.target.value)}
					className="px-4 py-2 border rounded-lg outline-none dark:text-white dark:bg-slate-700"
				>
					{reports.map((report) => (
						<option key={report} value={report}>
							{report}
						</option>
					))}
				</select>

				<select
					onChange={(e) => setDateRange(e.target.value)}
					className="px-4 py-2 border rounded-lg outline-none dark:text-white dark:bg-slate-700"
				>
					{/*TODO: Find a way of adding the chosen date range to the toast notification */}
					{duration.map((duration) => (
						<option key={duration} value="duration">
							Last {duration} days
						</option>
					))}
				</select>

				<button
					onClick={generateReport}
					className="bg-blue-500 dark:bg-blue-900 text-white px-4 py-2 rounded-md shadow-md"
				>
					Generate Report
				</button>

				<button
					onClick={() => exportReport("PDF")}
					className="bg-red-500 dark:bg-red-700 text-white px-4 py-2 rounded-md shadow-md flex items-center space-x-2"
				>
					<CloudArrowDownIcon /> <span>Download PDF</span>
				</button>
			</div>

			{/* Main Section: Report Preview */}
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-semibold dark:text-white">
					{reportType} Report Preview
				</h3>
				<div className="flex space-x-4">
					<button
						onClick={() => setDataPreview("table")}
						className={`${
							dataPreview === "table"
								? "text-blue-700 dark:text-white"
								: "text-gray-600/75 dark:text-gray-400"
						}`}
					>
						Table View
					</button>

					<button
						onClick={() => setDataPreview("chart")}
						className={`${
							dataPreview === "chart"
								? "text-blue-700 dark:text-white"
								: "text-gray-600/75 dark:text-gray-400"
						}`}
					>
						Chart View
					</button>
				</div>
			</div>

			{/* TODO: Find a way of changing the data when a some chooses inventory data instead of sales data */}
			{dataPreview === "table" ? (
				<div className="rounded-lg shadow-md overflow-hidden">
					<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-500">
						<thead className="bg-gray-50 dark:bg-gray-600">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">
									Date
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">
									Amount
								</th>
							</tr>
						</thead>

						<tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-500">
							{salesData.map((item, index) => (
								<tr
									key={index}
									className="hover:bg-gray-50 dark:hover:bg-gray-500"
								>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
										{item.date}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
										UGX {formatNumberWithComma(item.amount)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<div className="bg-white dark:bg-gray-500 rounded-lg shadow-md p-4">
					<ResponsiveContainer width="100%" height={300}>
						<LineChart data={salesData}>
							<XAxis
								dataKey="date"
								stroke={theme === "dark" ? "white" : "black"}
							/>
							<YAxis stroke={theme === "dark" ? "white" : "black"} />
							<Tooltip />
							<Line
								type="monotone"
								dataKey="amount"
								stroke={theme === "dark" ? "white" : "black"}
								strokeWidth={2}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			)}

			{/* Export Options */}
			<div className="flex space-x-4 mt-4">
				<button
					onClick={() => exportReport("CSV")}
					className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md animate-pulse"
				>
					Export as CSV
				</button>

				<button
					onClick={() => exportReport("Excel")}
					className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md animate-pulse"
				>
					Export as Excel
				</button>
			</div>

			{/* Custom Report Generator Sidebar */}
			{/* TODO: Find a way of creating the reports basing on the chosen data */}
			<Transition show={isFilterPanelOpen} as={React.Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 overflow-hidden"
					onClose={() => setIsFilterPanelOpen(false)}
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
							<h2 className="text-lg font-semibold mb-4">Customize Report</h2>

							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Include Data Points
									</label>

									<select className="mt-1 px-3 py-2 border rounded-md w-full">
										<option>Sales Amount</option>
										<option>Revenue</option>
										<option>Inventory Levels</option>
									</select>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700">
										Display Format
									</label>

									<select className="mt-1 px-3 py-2 border rounded-md w-full">
										<option>Table</option>
										<option>Chart</option>
									</select>
								</div>

								<button
									onClick={() => {
										setIsFilterPanelOpen(false);
										toast.success("Custom report applied!");
									}}
									className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md w-full"
								>
									Apply Custom Report
								</button>
							</div>
						</motion.div>
					</div>
				</Dialog>
			</Transition>

			{/* Toggle Custom Report Sidebar */}
			<button
				onClick={() => setIsFilterPanelOpen(true)}
				className="fixed bottom-6 right-6 bg-gray-700 text-white p-3 rounded-full shadow-lg"
			>
				Customize Report
			</button>
		</div>
	);
};

export default Reports;
