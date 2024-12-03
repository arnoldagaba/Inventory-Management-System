import { NavLink, useLocation } from "react-router-dom";
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
	Square3Stack3DIcon,
	ChartBarIcon,
	DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { Button, SidebarTooltip } from "./ui";
import PropTypes from "prop-types";
import { cn } from "../utils/cn";
import { useTheme } from '../hooks';

const navItems = [
	{ name: "Dashboard", path: "/", icon: HomeIcon },
	{ name: "Orders", path: "/orders", icon: ShoppingBagIcon },
	{ name: "Products", path: "/products", icon: CubeIcon },
	{ name: "Stock", path: "/stock", icon: Square3Stack3DIcon },
	{ name: "Reports", path: "/reports", icon: DocumentTextIcon },
	{ name: "Analytics", path: "/analytics", icon: ChartPieIcon },
	{ name: "Settings", path: "/settings", icon: Cog6ToothIcon },
];

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen, isMobile, isMinimized, toggleMinimized }) => {
	const location = useLocation();

	const handleNavClick = (path) => {
		if (isMobile) {
			setIsMobileMenuOpen(false);
		}
	};

	return (
		<motion.aside
			initial={isMobile ? { x: -240 } : false}
			animate={isMobile ? { x: isMobileMenuOpen ? 0 : -240 } : false}
			className={cn(
				"fixed left-0 top-16 bottom-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 z-40 transition-all duration-300",
				"flex flex-col",
				isMobile ? "shadow-lg" : "",
				isMinimized ? "w-20" : "w-60",
				!isMobile && !isMobileMenuOpen ? "hidden md:block" : ""
			)}
		>
			{isMobile ? (
				<div className="p-4 border-b border-gray-200 dark:border-gray-700">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsMobileMenuOpen(false)}
						className="md:hidden"
						aria-label="Close menu"
					>
						<XMarkIcon className="h-6 w-6" />
					</Button>
				</div>
			) : (
				<div className="p-4 border-b border-gray-200 dark:border-gray-700">
					<Button
						variant="ghost"
						size="icon"
						onClick={toggleMinimized}
						className="hidden md:flex"
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

			<div className="flex-1 overflow-y-auto">
				<nav className="px-4 py-3">
					<ul className="space-y-2">
						{navItems.map((item) => {
							const Icon = item.icon;
							const link = (
								<NavLink
									to={item.path}
									onClick={() => handleNavClick(item.path)}
									className={({ isActive }) =>
										cn(
											"flex items-center px-4 py-2.5 rounded-lg transition-colors",
											isMinimized ? "justify-center" : "space-x-3",
											isActive
												? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
												: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
										)
									}
								>
									<Icon className="h-5 w-5 flex-shrink-0" />
									{!isMinimized && <span>{item.name}</span>}
								</NavLink>
							);

							return (
								<li key={item.name}>
									{isMinimized ? (
										<SidebarTooltip content={item.name}>
											{link}
										</SidebarTooltip>
									) : (
										link
									)}
								</li>
							);
						})}
					</ul>
				</nav>
			</div>
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
