import { LineChart, Line, BarChart, Bar, Tooltip } from "recharts";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { toast } from "react-toastify";
import {
	BanknotesIcon,
	RectangleStackIcon,
	ShoppingBagIcon,
	UsersIcon,
} from "@heroicons/react/24/outline";
import {
	actions,
	recentActivity,
	salesData3,
	stockData2,
} from "../../constants/constants";
import { useTheme } from "../../hooks/useTheme";

const Dashboard = () => {
	const { theme } = useTheme();

	// Example data for charts and counters
	const summaryData = [
		{
			title: "Total Orders",
			value: 1240,
			icon: <ShoppingBagIcon className="size-6" />,
			trend: [{ value: 1200 }, { value: 1240 }],
		},
		{
			title: "Revenue",
			value: 43210,
			icon: <BanknotesIcon className="size-6" />,
			trend: [{ value: 40000 }, { value: 43210 }],
		},
		{
			title: "Inventory Status",
			value: 35,
			icon: <RectangleStackIcon className="size-6" />,
			trend: [{ value: 40 }, { value: 35 }],
		},
		{
			title: "Active Users",
			value: 145,
			icon: <UsersIcon className="size-6" />,
			trend: [{ value: 130 }, { value: 145 }],
		},
	];

	const handleActionClick = (action) => {
		toast.success(`${action} action completed!`);
	};

	return (
		<div className="p-4 space-y-6">
			{/* Top Section: Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				{summaryData.map((card, index) => (
					<motion.div
						key={index}
						className="bg-white dark:bg-slate-700 dark:text-white p-4 rounded-lg shadow-md flex flex-col items-center space-y-2"
						whileHover={{ scale: 1.05 }}
					>
						<span className="text-4xl">{card.icon}</span>

						<h3 className="text-xl font-semibold">{card.title}</h3>

						<CountUp
							start={0}
							end={card.value}
							duration={2.5}
							separator=","
							className="text-2xl font-bold"
						/>

						<LineChart width={100} height={30} data={card.trend}>
							<Line
								type="monotone"
								dataKey="value"
								dot={false}
								stroke={`${theme === "dark" ? "white" : "#8884d8"}`}
								strokeWidth={2}
							/>
						</LineChart>
					</motion.div>
				))}
			</div>

			{/* Quick Actions */}
			<div className="flex space-x-4">
				{actions.map((action, index) => (
					<motion.button
						key={index}
						onClick={() => handleActionClick(action)}
						className="bg-blue-500 dark:bg-blue-800 hover:bg-blue-600 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md"
						whileHover={{ scale: 1.1 }}
					>
						{action}
					</motion.button>
				))}
			</div>

			{/* Main Section: Analytics Graphs */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<motion.div
					initial={{ opacity: 0, x: -100 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 1 }}
					className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-md"
				>
					<h3 className="text-lg font-semibold mb-2 dark:text-white">
						Sales Trends
					</h3>

					<LineChart width={400} height={200} data={salesData3}>
						<Line
							type="monotone"
							dataKey="sales"
							stroke={`${theme === "dark" ? "white" : "#8884d8"}`}
							strokeWidth={3}
						/>
						<Tooltip />
					</LineChart>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 1 }}
					className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-md"
				>
					<h3 className="text-lg font-semibold mb-2 dark:text-white">
						Stock Levels
					</h3>

					<BarChart width={400} height={200} data={stockData2}>
						<Bar dataKey="stock" fill="#82ca9d" />
						<Tooltip />
					</BarChart>
				</motion.div>
			</div>

			{/* Recent Activity Feed */}
			<div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-md mt-6">
				<h3 className="text-lg font-semibold mb-2 dark:text-white">
					Recent Activity
				</h3>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
				>
					{recentActivity.map((activity, index) => (
						<motion.div
							key={index}
							className="py-2 border-b last:border-b-0 dark:border-gray-400 dark:text-gray-200"
							whileHover={{ scale: 1.02 }}
							transition={{ duration: 0.2 }}
						>
							<span className="font-semibold dark:text-white">
								{activity.type}:{" "}
							</span>
							{activity.content}
						</motion.div>
					))}
				</motion.div>
			</div>
		</div>
	);
};

export default Dashboard;
