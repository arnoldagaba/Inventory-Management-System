import { Disclosure, DisclosureButton } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import {
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
	HomeIcon,
	WrenchScrewdriverIcon,
	PresentationChartBarIcon,
	ChartPieIcon,
	ShoppingBagIcon,
	FolderIcon,
	CubeIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
	const { theme } = useTheme();

	const themeStyles = {
		bg: theme === "dark" ? "bg-gray-950" : "bg-gray-200",
		text: theme === "dark" ? "text-white" : "text-gray-800",
		hover: theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-300",
		icon: theme === "dark" ? "text-white" : "text-blue-800",
	};

	const navItems = [
		{
			name: "Dashboard",
			path: "/",
			icon: <HomeIcon className={`size-6 ${themeStyles.icon}`} />,
		},
		{
			name: "Orders",
			path: "/orders",
			icon: <ShoppingBagIcon className={`size-6 ${themeStyles.icon}`} />,
		},
		{
			name: "Products",
			path: "/products",
			icon: <CubeIcon className={`size-6 ${themeStyles.icon}`} />,
		},
		{
			name: "Stock",
			path: "/stock",
			icon: <ChartPieIcon className={`size-6 ${themeStyles.icon}`} />,
		},
		{
			name: "Analytics",
			path: "/analytics",
			icon: (
				<PresentationChartBarIcon className={`size-6 ${themeStyles.icon}`} />
			),
		},
		{
			name: "Reports",
			path: "/reports",
			icon: <FolderIcon className={`size-6 ${themeStyles.icon}`} />,
		},
		{
			name: "Settings",
			path: "/settings",
			icon: <WrenchScrewdriverIcon className={`size-6 ${themeStyles.icon}`} />,
		},
	];

	return (
		<Disclosure defaultOpen>
			{({ open }) => (
				<div
					className={`${themeStyles.bg} ${
						themeStyles.text
					} h-full transition-all duration-200 ${
						open ? "w-48" : "w-16"
					} flex flex-col`}
				>
					<DisclosureButton className={`p-2 mt-4 ml-4 rounded-full`}>
						<span className="sr-only">Toggle Sidebar</span>
						{open ? (
							<ChevronDoubleLeftIcon className="size-6 text-blue-800 dark:text-white" />
						) : (
							<ChevronDoubleRightIcon className="size-6 text-blue-800 dark:text-white" />
						)}
					</DisclosureButton>

					{/* Sidebar Links */}
					<div className="mt-8 px-3">
						<ul className="space-y-2">
							{navItems.map(({ name, path, icon }) => (
								<NavLink
									key={name}
									to={path}
									className={`flex items-center space-x-3 p-3 rounded-full ${themeStyles.hover}`}
									
								>
									{icon}
									{open && <span>{name}</span>}
								</NavLink>
							))}
						</ul>
					</div>
				</div>
			)}
		</Disclosure>
	);
};

export default Sidebar;
