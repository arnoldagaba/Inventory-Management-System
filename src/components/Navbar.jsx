import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import {
	BellIcon,
	MagnifyingGlassIcon,
	MoonIcon,
	SunIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Navbar = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const { theme, toggleTheme } = useTheme();

	const handleSearchChange = (e) => setSearchQuery(e.target.value);

	return (
		<div
			className={`sticky top-0 z-10 px-2 ${
				theme === "dark" ? "bg-gray-900" : "bg-white"
			} shadow-md`}
		>
			<div className="container mx-auto p-4 flex items-center justify-between">
				{/* Logo/Brand */}
				<div className="text-2xl font-bold dark:text-white">
					<Link to="/">IVM</Link>
				</div>

				{/* Search Bar */}
				<div className="flex items-center w-1/3">
					<input
						type="text"
						value={searchQuery}
						onChange={handleSearchChange}
						placeholder="Search..."
						className="w-full py-2 px-3 rounded-l-full border border-gray-300 dark:placeholder:text-black outline-none"
					/>
					<button className="py-[11px] px-3 bg-blue-900 text-white rounded-r-full">
						<MagnifyingGlassIcon className="h-5 w-5 text-white" />
					</button>
				</div>

				{/* Theme Toggle, Notifications, Profile */}
				<div className="flex items-center space-x-4">
					<button onClick={toggleTheme} className="p-2">
						{theme === "dark" ? (
							<SunIcon className="h-6 w-6 text-yellow-400" />
						) : (
							<MoonIcon className="h-6 w-6 text-blue-800" />
						)}
					</button>

					{/* Notifications Dropdown */}
					<Menu as="div" className="relative">
						<MenuButton className="relative p-2">
							<BellIcon className="h-6 w-6 text-blue-800 dark:text-white" />
							<span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
								10
							</span>
						</MenuButton>

						<MenuItems className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden">
							<MenuItem>
								{({ active }) => (
									<Link
										to="/notifications"
										className={`block px-4 py-2 ${active ? "bg-gray-100" : ""}`}
									>
										View all notifications
									</Link>
								)}
							</MenuItem>
						</MenuItems>
					</Menu>

					{/* Profile Dropdown */}
					<Menu as="div" className="relative">
						<MenuButton className="flex items-center space-x-2 p-2">
							<UserIcon className="h-6 w-6 text-blue-800 dark:text-white" />
							{/* <span>Profile</span> */}
						</MenuButton>

						<MenuItems className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden">
							<MenuItem>
								{({ active }) => (
									<Link
										to="/profile"
										className={`block px-4 py-2 ${active ? "bg-gray-100" : ""}`}
									>
										View Profile
									</Link>
								)}
							</MenuItem>

							<MenuItem>
								{({ active }) => (
									<button
										className={`w-full text-left px-4 py-2 ${
											active ? "bg-gray-100" : ""
										}`}
										onClick={() => alert("Logout")}
									>
										Logout
									</button>
								)}
							</MenuItem>
						</MenuItems>
					</Menu>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
