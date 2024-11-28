import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
	HomeIcon,
	ShoppingBagIcon,
	CubeIcon,
	ChartPieIcon,
	Cog6ToothIcon,
	XMarkIcon
} from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

const navItems = [
	{ name: "Dashboard", path: "/", icon: HomeIcon },
	{ name: "Orders", path: "/orders", icon: ShoppingBagIcon },
	{ name: "Products", path: "/products", icon: CubeIcon },
	{ name: "Analytics", path: "/analytics", icon: ChartPieIcon },
	{ name: "Settings", path: "/settings", icon: Cog6ToothIcon },
];

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen, isMobile }) => {
	return (
		<motion.aside
			initial={isMobile ? { x: -240 } : false}
			animate={isMobile ? { x: isMobileMenuOpen ? 0 : -240 } : false}
			transition={{ duration: 0.2 }}
			className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-60 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40
				${isMobile ? "shadow-lg" : ""}`}
		>
			<nav className="h-full p-4">
				<ul className="space-y-2">
					{navItems.map((item) => {
						const Icon = item.icon;
						return (
							<li key={item.name}>
								<NavLink
									to={item.path}
									onClick={() => isMobile && setIsMobileMenuOpen(false)}
									className={({ isActive }) =>
										`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors
										${
											isActive
												? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
												: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
										}`
									}
								>
									<Icon className="h-5 w-5" />
									<span>{item.name}</span>
								</NavLink>
							</li>
						);
					})}
				</ul>
			</nav>
		</motion.aside>
	);
};

Sidebar.propTypes = {
	isMobileMenuOpen: PropTypes.bool.isRequired,
	setIsMobileMenuOpen: PropTypes.func.isRequired,
	isMobile: PropTypes.bool.isRequired,
};

export default Sidebar;
