import { motion } from "framer-motion";
import {
	AreaChart,
	Area,
	PieChart,
	Pie,
	Cell,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";
import { Card, Grid, Container, Badge } from "../../components/ui";
import { useTheme } from "../../hooks/useTheme";
import { formatCurrency, formatPercentage } from "../../utils/formatNumber";
import {
	analyticsMetrics,
	analyticsChartData,
	chartColors,
} from "../../constants/constants";

const MetricCard = ({ label, value, trend }) => (
	<Card>
		<div className="flex items-start justify-between">
			<div>
				<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
					{label}
				</p>
				<p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
					{typeof value === "number"
						? value >= 1000
							? formatCurrency(value)
							: value.toLocaleString()
						: value}
				</p>
			</div>
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
	</Card>
);

const ChartCard = ({ title, children }) => (
	<Card>
		<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
			{title}
		</h3>
		<div className="h-[300px]">{children}</div>
	</Card>
);

const Analytics = () => {
	const { theme } = useTheme();

	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
					<p className="text-gray-900 dark:text-white font-medium">{label}</p>
					{payload.map((entry, index) => (
						<p
							key={index}
							className="text-sm text-gray-600 dark:text-gray-400"
						>
							{entry.name}: {formatCurrency(entry.value)}
						</p>
					))}
				</div>
			);
		}
		return null;
	};

	return (
		<Container>
			<div className="space-y-6">
				{/* Metrics Grid */}
				<Grid>
					{Object.values(analyticsMetrics).map((metric, index) => (
						<motion.div
							key={metric.label}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
						>
							<MetricCard {...metric} />
						</motion.div>
					))}
				</Grid>

				{/* Charts */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<ChartCard title="Revenue Trend">
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart data={analyticsChartData.revenue}>
								<defs>
									<linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
										<stop
											offset="5%"
											stopColor={theme === "dark" ? "#60a5fa" : "#3b82f6"}
											stopOpacity={0.8}
										/>
										<stop
											offset="95%"
											stopColor={theme === "dark" ? "#60a5fa" : "#3b82f6"}
											stopOpacity={0}
										/>
									</linearGradient>
								</defs>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
								/>
								<XAxis
									dataKey="month"
									stroke={theme === "dark" ? "#9ca3af" : "#4b5563"}
								/>
								<YAxis
									stroke={theme === "dark" ? "#9ca3af" : "#4b5563"}
									tickFormatter={(value) => formatCurrency(value)}
								/>
								<Tooltip content={<CustomTooltip />} />
								<Area
									type="monotone"
									dataKey="revenue"
									stroke={theme === "dark" ? "#60a5fa" : "#3b82f6"}
									fillOpacity={1}
									fill="url(#colorRevenue)"
								/>
							</AreaChart>
						</ResponsiveContainer>
					</ChartCard>

					<ChartCard title="Sales by Category">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={analyticsChartData.categories}
									cx="50%"
									cy="50%"
									labelLine={false}
									outerRadius={80}
									fill="#8884d8"
									dataKey="value"
									label={({ name, percent }) =>
										`${name} ${formatPercentage(percent * 100)}`
									}
								>
									{analyticsChartData.categories.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={chartColors[index % chartColors.length]}
										/>
									))}
								</Pie>
								<Legend />
								<Tooltip
									formatter={(value) => formatPercentage(value)}
								/>
							</PieChart>
						</ResponsiveContainer>
					</ChartCard>

					<ChartCard title="Order Status Distribution">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={analyticsChartData.orderStatus}>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
								/>
								<XAxis
									dataKey="status"
									stroke={theme === "dark" ? "#9ca3af" : "#4b5563"}
								/>
								<YAxis stroke={theme === "dark" ? "#9ca3af" : "#4b5563"} />
								<Tooltip />
								<Bar
									dataKey="count"
									fill={theme === "dark" ? "#60a5fa" : "#3b82f6"}
									radius={[4, 4, 0, 0]}
								/>
							</BarChart>
						</ResponsiveContainer>
					</ChartCard>
				</div>
			</div>
		</Container>
	);
};

export default Analytics;
