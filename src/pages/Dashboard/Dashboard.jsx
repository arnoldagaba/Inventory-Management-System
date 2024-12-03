import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
	LineChart,
	Line,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { Card, Grid, Container, Badge } from "../../components/ui";
import { useTheme } from "../../hooks/useTheme";
import { formatNumberWithComma } from "../../utils/formatNumber";
import { dashboardStats, dashboardChartData, activity } from "../../constants/constants";
import { formatAxisLabel } from "../../utils/formatNumber";
import { ActivityDetails } from '../../components/ActivityDetails';

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
	<Card className="relative overflow-hidden">
		<div className="flex items-start justify-between">
			<div>
				<p className="text-sm font-medium text-gray-600 dark:text-gray-300">
					{title}
				</p>

				<div className="mt-2 flex items-baseline">
					<p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
						<CountUp end={value} separator="," />
					</p>

					{trend && (
						<Badge
							variant={trend > 0 ? "success" : "error"}
							size="sm"
							className="ml-2"
						>
							{trend > 0 ? "+" : ""}
							{trend}%
						</Badge>
					)}
				</div>
			</div>

			<div className={`
				p-2 rounded-lg 
				${color === "blue" && "bg-blue-100 dark:bg-blue-900/25"}
				${color === "green" && "bg-green-100 dark:bg-green-900/25"}
				${color === "purple" && "bg-purple-100 dark:bg-purple-900/25"}
				${color === "orange" && "bg-orange-100 dark:bg-orange-900/25"}
			`}>
				<Icon className={`
					h-6 w-6 
					${color === "blue" && "text-blue-600 dark:text-blue-400"}
					${color === "green" && "text-green-600 dark:text-green-400"}
					${color === "purple" && "text-purple-600 dark:text-purple-400"}
					${color === "orange" && "text-orange-600 dark:text-orange-400"}
				`} />
			</div>
		</div>
	</Card>
);

StatCard.propTypes = {
	title: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired,
	icon: PropTypes.elementType.isRequired,
	trend: PropTypes.number,
	color: PropTypes.string.isRequired,
};

const ChartCard = ({ title, children }) => (
	<Card>
		<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
			{title}
		</h3>
		<div className="h-[300px] w-full">{children}</div>
	</Card>
);

const Dashboard = () => {
	const { theme } = useTheme();
	const [selectedActivity, setSelectedActivity] = useState(null);
	const [isActivityDetailsOpen, setIsActivityDetailsOpen] = useState(false);

	const darkModeChartColors = {
		grid: "#2D3748",        // Darker grid lines
		text: "#E2E8F0",        // Lighter text
		tooltip: "#2D3748",     // Darker tooltip background
		line: "#90CDF4",        // Lighter blue for line chart
		bar: "#90CDF4",         // Lighter blue for bar chart
	};

	const lightModeChartColors = {
		grid: "#E5E7EB",
		text: "#4B5563",
		tooltip: "#FFFFFF",
		line: "#3B82F6",
		bar: "#3B82F6",
	};

	const chartColors = theme === "dark" ? darkModeChartColors : lightModeChartColors;

	const handleActivityClick = (activity) => {
		setSelectedActivity(activity);
		setIsActivityDetailsOpen(true);
	};

	return (
		<Container>
			<div className="space-y-6">
				{/* Stats Grid */}
				<Grid>
					{dashboardStats.map((stat, index) => (
						<motion.div
							key={stat.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
						>
							<StatCard {...stat} />
						</motion.div>
					))}
				</Grid>

				{/* Charts */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<ChartCard title="Sales Overview">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart
								data={dashboardChartData.sales}
								margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
							>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke={chartColors.grid}
									vertical={false}
								/>

								<XAxis
									dataKey="name"
									stroke={chartColors.text}
									tickFormatter={formatAxisLabel}
									axisLine={false}
									tickLine={false}
									dy={10}
								/>

								<YAxis
									stroke={chartColors.text}
									tickFormatter={(value) => formatAxisLabel(value)}
									axisLine={false}
									tickLine={false}
									dx={-10}
								/>

								<Tooltip
									contentStyle={{
										backgroundColor: chartColors.tooltip,
										border: "none",
										borderRadius: "0.5rem",
										color: theme === "dark" ? "#E2E8F0" : "#1A202C",
									}}
									
									formatter={(value) => [`UGX ${formatNumberWithComma(value)}`]}
									labelFormatter={formatAxisLabel}
								/>

								<Line
									type="monotone"
									dataKey="value"
									stroke={chartColors.line}
									strokeWidth={2}
									dot={{ r: 4, fill: chartColors.line }}
									activeDot={{ r: 6 }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</ChartCard>

					<ChartCard title="Stock Levels">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={dashboardChartData.stock}
								margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
							>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke={chartColors.grid}
									horizontal={true}
									vertical={false}
								/>

								<XAxis
									dataKey="name"
									stroke={chartColors.text}
									tickFormatter={formatAxisLabel}
									axisLine={false}
									tickLine={false}
									dy={10}
								/>

								<YAxis
									stroke={chartColors.text}
									tickFormatter={formatAxisLabel}
									axisLine={false}
									tickLine={false}
									dx={-10}
								/>

								<Tooltip
									contentStyle={{
										backgroundColor: chartColors.tooltip,
										border: "none",
										borderRadius: "0.5rem",
										color: theme === "dark" ? "#E2E8F0" : "#1A202C",
									}}
									formatter={(value) => [value]}
									labelFormatter={(label) => `Product: ${label}`}
								/>

								<Bar
									dataKey="stock"
									fill={chartColors.bar}
									radius={[4, 4, 0, 0]}
									maxBarSize={50}
								/>
							</BarChart>
						</ResponsiveContainer>
					</ChartCard>
				</div>

				{/* Recent Activity */}
				<div className="mt-8">
					<Card>
						<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
							Recent Activity
						</h2>
						<div className="space-y-4">
							{activity.map((item, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
									className="flex items-start space-x-3 py-3 border-b last:border-0 border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 px-3 rounded-lg transition-colors"
									onClick={() => handleActivityClick(item)}
								>
									<span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500 dark:bg-blue-400" />
									<div>
										<span className="font-medium text-gray-900 dark:text-gray-100">
											{item.type}
										</span>
										<p className="text-sm text-gray-500 dark:text-gray-300">
											{item.content}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</Card>
				</div>

				<ActivityDetails
					activity={selectedActivity}
					isOpen={isActivityDetailsOpen}
					onClose={() => {
						setIsActivityDetailsOpen(false);
						setSelectedActivity(null);
					}}
				/>
			</div>
		</Container>
	);
};

export default Dashboard;
