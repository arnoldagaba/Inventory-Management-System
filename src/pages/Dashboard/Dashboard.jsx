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

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
	<Card className="relative overflow-hidden">
		<div className="flex items-start justify-between">
			<div>
				<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
					{title}
				</p>

				<div className="mt-2 flex items-baseline">
					<p className="text-2xl font-semibold text-gray-900 dark:text-white">
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

			<div className={`p-2 rounded-lg bg-${color}-100 dark:bg-${color}-900/20`}>
				<Icon className={`h-6 w-6 text-${color}-600 dark:text-${color}-400`} />
			</div>
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

const Dashboard = () => {
	const { theme } = useTheme();

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
							<LineChart data={dashboardChartData.sales}>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
								/>

								<XAxis
									dataKey="name"
									stroke={theme === "dark" ? "#9ca3af" : "#4b5563"}
								/>

								<YAxis
									stroke={theme === "dark" ? "#9ca3af" : "#4b5563"}
									tickFormatter={(value) => formatNumberWithComma(value)}
								/>

								<Tooltip
									contentStyle={{
										backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
										border: "none",
										borderRadius: "0.5rem",
									}}
									formatter={(value) => [`UGX ${formatNumberWithComma(value)}`]}
								/>

								<Line
									type="monotone"
									dataKey="value"
									stroke={theme === "dark" ? "#60a5fa" : "#3b82f6"}
									strokeWidth={2}
									dot={{ r: 4 }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</ChartCard>

					<ChartCard title="Stock Levels">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={dashboardChartData.stock}>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
								/>

								<XAxis
									dataKey="name"
									stroke={theme === "dark" ? "#9ca3af" : "#4b5563"}
								/>

								<YAxis stroke={theme === "dark" ? "#9ca3af" : "#4b5563"} />

								<Tooltip
									contentStyle={{
										backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
										border: "none",
										borderRadius: "0.5rem",
									}}
								/>

								<Bar
									dataKey="stock"
									fill={theme === "dark" ? "#60a5fa" : "#3b82f6"}
									radius={[4, 4, 0, 0]}
								/>
							</BarChart>
						</ResponsiveContainer>
					</ChartCard>
				</div>

				{/* Recent Activity */}
				<Card>
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Recent Activity
					</h3>

					<div className="space-y-4">
						{activity.map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.1 }}
								className="flex items-start space-x-3 py-3 border-b last:border-0 border-gray-200 dark:border-gray-700"
								whileHover={{ x: 4 }}
							>
								<span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500" />
								
								<div>
									<span className="font-medium text-gray-900 dark:text-white">
										{item.type}
									</span>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										{item.content}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</Card>
			</div>
		</Container>
	);
};

export default Dashboard;
