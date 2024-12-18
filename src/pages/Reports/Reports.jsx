import { useState } from "react";
import { motion } from "framer-motion";
import {
	DocumentTextIcon,
	ArrowDownTrayIcon,
	CalendarIcon,
	FunnelIcon,
} from "@heroicons/react/24/outline";
import { Card, Container, Button, Input, Badge } from "../../components/ui";
import { formatDate } from "../../utils/formatDate";
import { reports } from "../../constants/constants";
import { toast } from "react-toastify";
import { ReportBuilder } from "../../components/ReportBuilder";
import { generateReport } from "../../services/reportService";

const statusColors = {
	Ready: "success",
	Processing: "warning",
	Failed: "error",
};

const Reports = () => {
	const [selectedType, setSelectedType] = useState("all");
	const [dateRange, setDateRange] = useState({
		start: "",
		end: "",
	});
	const [isBuilderOpen, setIsBuilderOpen] = useState(false);

	const handleGenerateReport = async (config) => {
		try {
			await generateReport(config);
			setIsBuilderOpen(false);
			toast.success("Report generated successfully!");
		} catch (error) {
			console.error('Report generation error:', error);
			toast.error("Failed to generate report");
		}
	};

	const filteredReports = reports.filter(
		(report) =>
			(selectedType === "all" || report.type === selectedType) &&
				(!dateRange.start ||
					new Date(report.date) >= new Date(dateRange.start)) &&
				(!dateRange.end || new Date(report.date) <= new Date(dateRange.end))
	);

	return (
		<Container>
			<div className="space-y-6">
				<div className="flex flex-col sm:flex-row justify-between gap-4">
					<div className="flex flex-col sm:flex-row gap-4">
						<select
							value={selectedType}
							onChange={(e) => setSelectedType(e.target.value)}
							className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
						>
							<option value="all">All Types</option>
							<option value="Sales">Sales</option>
							<option value="Inventory">Inventory</option>
							<option value="Analytics">Analytics</option>
						</select>

						<div className="flex gap-2">
							<Input
								type="date"
								value={dateRange.start}
								onChange={(e) =>
									setDateRange((prev) => ({ ...prev, start: e.target.value }))
								}
								icon={CalendarIcon}
								className="w-40"
							/>

							<Input
								type="date"
								value={dateRange.end}
								onChange={(e) =>
									setDateRange((prev) => ({ ...prev, end: e.target.value }))
								}
								icon={CalendarIcon}
								className="w-40"
							/>
						</div>
					</div>

					<Button onClick={() => setIsBuilderOpen(true)}>
						<DocumentTextIcon className="h-5 w-5 mr-2" />
						Generate Report
					</Button>
				</div>

				<Card>
					<div className="space-y-4">
						{filteredReports.map((report, index) => (
							<motion.div
								key={report.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
								className="flex items-center justify-between p-4 border-b last:border-0 dark:border-gray-700"
							>
								<div className="flex items-start space-x-4">
									<DocumentTextIcon className="h-6 w-6 text-gray-400 mt-1" />

									<div>
										<h3 className="font-medium text-gray-900 dark:text-white">
											{report.name}
										</h3>

										<div className="mt-1 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
											<span>{report.type}</span>
											<span>•</span>
											<span>{formatDate(report.date)}</span>
										</div>
									</div>
								</div>

								<div className="flex items-center space-x-4">
									<Badge variant={statusColors[report.status]} size="sm">
										{report.status}
									</Badge>

									{report.status === "Ready" && (
										<Button
											variant="secondary"
											onClick={() => handleDownload(report)}
											className="p-2"
										>
											<ArrowDownTrayIcon className="h-4 w-4" />
										</Button>
									)}
								</div>
							</motion.div>
						))}

						{filteredReports.length === 0 && (
							<div className="text-center py-8 text-gray-500 dark:text-gray-400">
								<FunnelIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />

								<p>No reports found matching your filters.</p>
							</div>
						)}
					</div>
				</Card>
			</div>

			{isBuilderOpen && (
				<ReportBuilder
					onClose={() => setIsBuilderOpen(false)}
					onGenerateReport={handleGenerateReport}
				/>
			)}
		</Container>
	);
};

export default Reports;
