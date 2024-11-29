import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
	HomeIcon,
	ShoppingBagIcon,
	CubeIcon,
	ChartPieIcon,
	Cog6ToothIcon,
	XMarkIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Button } from "./ui";
import PropTypes from "prop-types";
import { cn } from "../utils/cn";

const navItems = [
	{ name: "Dashboard", path: "/", icon: HomeIcon },
	{ name: "Orders", path: "/orders", icon: ShoppingBagIcon },
	{ name: "Products", path: "/products", icon: CubeIcon },
	{ name: "Analytics", path: "/analytics", icon: ChartPieIcon },
	{ name: "Settings", path: "/settings", icon: Cog6ToothIcon },
];

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen, isMobile, isMinimized, toggleMinimized }) => {
	return (
		<motion.aside
			initial={isMobile ? { x: -240 } : false}
			animate={isMobile ? { x: isMobileMenuOpen ? 0 : -240 } : false}
			className={cn(
				"fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 transition-all duration-300",
				isMobile ? "shadow-lg" : "",
				isMinimized ? "w-20" : "w-60"
			)}
		>
			<nav className="h-full flex flex-col">
				{isMobile ? (
					<div className="flex justify-end p-4">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsMobileMenuOpen(false)}
							className="lg:hidden"
							aria-label="Close menu"
						>
							<XMarkIcon className="h-6 w-6" />
						</Button>
					</div>
				) : (
					<div className="flex justify-end p-4">
						<Button
							variant="ghost"
							size="icon"
							onClick={toggleMinimized}
							className="hidden lg:flex"
							 aria-label={isMinimized ? "Expand menu" : "Minimize menu"}
						>
							{isMinimized ? (
								<ChevronRightIcon className="h-6 w-6" />
							) : (
								<ChevronLeftIcon className="h-6 w-6" />
							)}
						</Button>
					</div>
				)}

				<div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-4">
					<ul className="space-y-2">
						{navItems.map((item) => {
							const Icon = item.icon;
							return (
								<li key={item.name}>
									<NavLink
										to={item.path}
										onClick={() => isMobile && setIsMobileMenuOpen(false)}
										className={({ isActive }) =>
											cn(
												"flex items-center px-4 py-2.5 rounded-lg transition-colors",
												isMinimized ? "justify-center" : "space-x-3",
												isActive
													? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
													: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
											)
										}
										title={isMinimized ? item.name : undefined}
									>
										<Icon className="h-5 w-5 flex-shrink-0" />
										{!isMinimized && <span>{item.name}</span>}
									</NavLink>
								</li>
							);
						})}
					</ul>
				</div>
			</nav>
		</motion.aside>
	);
};

Sidebar.propTypes = {
	isMobileMenuOpen: PropTypes.bool.isRequired,
	setIsMobileMenuOpen: PropTypes.func.isRequired,
	isMobile: PropTypes.bool.isRequired,
	isMinimized: PropTypes.bool.isRequired,
	toggleMinimized: PropTypes.func.isRequired,
};

export default Sidebar;
