import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
	Bars3Icon,
	MagnifyingGlassIcon,
	BellIcon,
	UserCircleIcon,
	CheckCircleIcon,
	ExclamationCircleIcon,
	SunIcon,
	MoonIcon,
} from "@heroicons/react/24/outline";
import { Button } from "./ui";
import { useAuth, useSearch, useTheme, useNotifications } from '../hooks';
import PropTypes from "prop-types";
import { cn } from "../utils/cn";
import { unreadNotifications } from "../constants/constants";
import { getRelativeTime } from "../utils/formatDate";
import { useClickOutside } from "../hooks/useClickOutside";

const SearchResults = ({ results, onSelect, onClose }) => {
	if (results.length === 0) return null;

	const handleSelect = (result) => {
		onSelect(result);
		onClose();
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			
			className={cn(
				"absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg",
				"shadow-lg border border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto",
				"search-results-dropdown custom-scrollbar"
			)}
		>
			{results.map((result) => (
				<button
					key={`${result.type}-${result.id}`}
					className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
					onClick={() => handleSelect(result)}
				>
					<p className="text-sm font-medium text-gray-900 dark:text-white">
						{result.title}
					</p>
					<p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
						{result.type}
					</p>
				</button>
			))}
		</motion.div>
	);
};

SearchResults.propTypes = {
	results: PropTypes.arrayOf(
		PropTypes.shape({
			type: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		})
	).isRequired,
	onSelect: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
};

const NotificationDropdown = ({
	notifications,
	onClose,
	onNotificationClick,
}) => {
	const navigate = useNavigate();

	if (notifications.length === 0) return null;

	const handleNotificationClick = (notification) => {
		onNotificationClick(notification);
		onClose();
	};

	const handleViewAll = (e) => {
		e.preventDefault();
		console.log('Starting navigation to notifications page');
		onClose();
		navigate('/notifications');
		console.log('Navigation completed');
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			className={cn(
				"absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg",
				"shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden",
				"notifications-dropdown custom-scrollbar"
			)}
		>
			<div className="p-4 border-b border-gray-200 dark:border-gray-700">
				<div className="flex items-center justify-between">
					<h3 className="text-sm font-semibold text-gray-900 dark:text-white">
						Notifications
					</h3>
					<button
						onClick={handleViewAll}
						className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400"
					>
						View all
					</button>
				</div>
			</div>

			<div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[300px] overflow-y-auto notifications-dropdown custom-scrollbar">
				{notifications.map((notification) => (
					<button
						key={notification.id}
						onClick={() => handleNotificationClick(notification)}
						className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
					>
						<div className="flex items-start space-x-3">
							{notification.type === "success" ? (
								<CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5" />
							) : (
								<ExclamationCircleIcon className="h-5 w-5 text-yellow-500 mt-0.5" />
							)}
							<div>
								<p className="text-sm font-medium text-gray-900 dark:text-white">
									{notification.title}
								</p>
								<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
									{notification.description}
								</p>
								<p className="text-xs text-gray-400 mt-1">
									{getRelativeTime(notification.timestamp)}
								</p>
							</div>
						</div>
					</button>
				))}
			</div>
		</motion.div>
	);
};

NotificationDropdown.propTypes = {
	notifications: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired,
			timestamp: PropTypes.string.isRequired,
		})
	).isRequired,
	onClose: PropTypes.func.isRequired,
	onNotificationClick: PropTypes.func.isRequired,
};

const Navbar = ({ isMobileMenuOpen, setIsMobileMenuOpen, isMobile }) => {
	const navigate = useNavigate();
	const { currentUser, logout } = useAuth();
	const { theme, toggleTheme } = useTheme();
	const { searchQuery, searchResults, handleSearch, clearSearch } = useSearch();
	const { unreadNotifications } = useNotifications();
	
	const [isSearchFocused, setIsSearchFocused] = useState(false);
	const [showUserMenu, setShowUserMenu] = useState(false);
	const [showNotifications, setShowNotifications] = useState(false);

	// Click outside handlers
	const notificationsRef = useClickOutside(() => setShowNotifications(false));
	const userMenuRef = useClickOutside(() => setShowUserMenu(false));

	const handleSearchChange = (e) => {
		handleSearch(e.target.value);
	};

	const handleSearchResultSelect = (result) => {
		clearSearch();
		setIsSearchFocused(false);

		// Handle navigation based on result type
		console.log("Selected:", result);
	};

	const handleNotificationClick = (notification) => {
		setShowNotifications(false);
		navigate("/notifications", {
			state: { selectedNotification: notification.id },
		});
	};

	const handleUserMenuItemClick = (action) => {
		setShowUserMenu(false);
		if (action === 'logout') {
			logout();
		} else if (action === 'settings') {
			navigate('/settings');
		}
	};

	return (
		<nav className="fixed top-0 left-0 right-0 h-16 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-50">
			<div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between max-w-[100vw] mx-auto">
				{/* Left section */}
				<div className="flex items-center gap-4">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="md:hidden"
					>
						<Bars3Icon className="h-6 w-6" />
					</Button>

					<Link to="/" className="flex items-center space-x-2">
						<img
							src="/src/assets/InvenEase.webp"
							alt="Logo"
							className="h-8 w-8 rounded-xl object-cover"
						/>
						<span className="text-xl font-semibold text-gray-900 dark:text-white hidden sm:inline-block">
							Dashboard
						</span>
					</Link>
				</div>

				{/* Center section - Search */}
				<div className="hidden md:block flex-1 max-w-xl mx-4 relative">
					<div className="relative">
						<MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
						<input
							type="text"
							placeholder="Search..."
							value={searchQuery}
							onChange={handleSearchChange}
							onFocus={() => setIsSearchFocused(true)}
							onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
							className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{isSearchFocused && searchResults.length > 0 && (
						<SearchResults
							results={searchResults}
							onSelect={handleSearchResultSelect}
							onClose={() => setIsSearchFocused(false)}
						/>
					)}
				</div>

				{/* Right section */}
				<div className="flex items-center space-x-4">
					<Button
						variant="ghost"
						size="icon"
						onClick={toggleTheme}
						className="hidden sm:flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
						aria-label={
							theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
						}
					>
						{theme === "dark" ? (
							<SunIcon className="h-7 w-7 text-gray-600 dark:text-gray-400" />
						) : (
							<MoonIcon className="h-7 w-7 text-gray-600 dark:text-gray-400" />
						)}
					</Button>

					<div className="relative" ref={notificationsRef}>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setShowNotifications(!showNotifications)}
							className="relative"
						>
							<BellIcon className="h-7 w-7" />
							{unreadNotifications.length > 0 && (
								<span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
									{unreadNotifications.length}
								</span>
							)}
						</Button>

						{showNotifications && (
							<NotificationDropdown
								notifications={unreadNotifications}
								onClose={() => setShowNotifications(false)}
								onNotificationClick={handleNotificationClick}
							/>
						)}
					</div>

					<div className="relative" ref={userMenuRef}>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setShowUserMenu(!showUserMenu)}
							className="relative"
						>
							{currentUser?.photoURL ? (
								<img
									src={currentUser.photoURL}
									alt="Profile"
									className="h-8 w-8 rounded-full object-cover"
								/>
							) : (
								<UserCircleIcon className="h-6 w-6" />
							)}
						</Button>

						{showUserMenu && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
							>
								<div className="p-3 border-b border-gray-200 dark:border-gray-700">
									<p className="text-sm font-medium text-gray-900 dark:text-white">
										{currentUser?.displayName}
									</p>

									<p className="text-xs text-gray-500 dark:text-gray-400">
										{currentUser?.email}
									</p>
								</div>

								<div className="p-2">
									<button
										onClick={() => handleUserMenuItemClick('settings')}
										className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
									>
										Settings
									</button>

									<button
										onClick={() => handleUserMenuItemClick('logout')}
										className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
									>
										Sign out
									</button>
								</div>
							</motion.div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

Navbar.propTypes = {
	isMobileMenuOpen: PropTypes.bool.isRequired,
	setIsMobileMenuOpen: PropTypes.func.isRequired,
	isMobile: PropTypes.bool.isRequired,
};

export default Navbar;
