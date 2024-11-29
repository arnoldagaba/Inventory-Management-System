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
import { formatCurrency, formatPercentage, formatAxisLabel } from "../../utils/formatNumber";
import {
	analyticsMetrics,
	analyticsChartData,
	chartColors,
} from "../../constants/constants";

const MetricCard = ({ label, value, trend }) => (
	<Card className="h-full">
		<div className="flex flex-col justify-between h-full">
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
				<div className="mt-4">
					<Badge
						variant={trend > 0 ? "success" : "error"}
						size="sm"
						className="ml-2"
					>
						{trend > 0 ? "+" : ""}
						{trend}%
					</Badge>
				</div>
			)}
		</div>
	</Card>
);

const ChartCard = ({ title, children }) => (
	<Card>
		<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
			{title}
		</h3>
		<div className="h-[300px] w-full">{children}</div>
	</Card>
);

const Analytics = () => {
	const { theme } = useTheme();

	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
					<p className="text-gray-900 dark:text-white font-medium">{formatAxisLabel(label)}</p>
					{payload.map((entry, index) => (
						<p key={index} className="text-sm text-gray-600 dark:text-gray-400">
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
				<Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{Object.values(analyticsMetrics).map((metric, index) => (
						<motion.div
							key={metric.label}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className="h-full"
						>
							<MetricCard {...metric} />
						</motion.div>
					))}
				</Grid>

				{/* Charts */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<ChartCard title="Revenue Trend">
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart
								data={analyticsChartData.revenue}
								margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
							>
								<defs>
									<linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor={theme === "dark" ? "#60a5fa" : "#3b82f6"} stopOpacity={0.1}/>
										<stop offset="95%" stopColor={theme === "dark" ? "#60a5fa" : "#3b82f6"} stopOpacity={0.01}/>
									</linearGradient>
								</defs>

								<CartesianGrid
									strokeDasharray="3 3"
									stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
									vertical={false}
								/>

								<XAxis
									dataKey="month"
									stroke={theme === "dark" ? "#9ca3af" : "#4b5563"}
									tickFormatter={formatAxisLabel}
									axisLine={false}
									tickLine={false}
									dy={10}
								/>

								<YAxis
									stroke={theme === "dark" ? "#9ca3af" : "#4b5563"}
									tickFormatter={(value) => formatAxisLabel(value)}
									axisLine={false}
									tickLine={false}
									dx={-10}
								/>

								<Tooltip content={<CustomTooltip />} />

								<Area
									type="monotone"
									dataKey="revenue"
									stroke={theme === "dark" ? "#60a5fa" : "#3b82f6"}
									strokeWidth={2}
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
									outerRadius={100}
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
								<Legend
									layout="horizontal"
									verticalAlign="bottom"
									align="center"
									wrapperStyle={{ paddingTop: "20px" }}
								/>
								<Tooltip formatter={(value) => formatPercentage(value)} />
							</PieChart>
						</ResponsiveContainer>
					</ChartCard>

					<ChartCard title="Order Status Distribution">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart 
								data={analyticsChartData.orderStatus}
								margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
							>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
									vertical={false}
								/>

								<XAxis
									dataKey="status"
									stroke={theme === "dark" ? "#9ca3af" : "#4b5563"}
									tickFormatter={formatAxisLabel}
									axisLine={false}
									tickLine={false}
									dy={10}
								/>

								<YAxis
									stroke={theme === "dark" ? "#9ca3af" : "#4b5563"}
									tickFormatter={formatAxisLabel}
									axisLine={false}
									tickLine={false}
									dx={-10}
								/>

								<Tooltip
									formatter={(value) => [value, "Orders"]}
									labelFormatter={(label) => `Status: ${label}`}
									contentStyle={{
										backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
										border: "none",
										borderRadius: "0.5rem",
										color: theme === "dark" ? "#e5e7eb" : "#1f2937",
									}}
								/>

								<Bar
									dataKey="count"
									fill={theme === "dark" ? "#60a5fa" : "#3b82f6"}
									radius={[4, 4, 0, 0]}
									maxBarSize={50}
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
