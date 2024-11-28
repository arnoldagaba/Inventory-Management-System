import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
	Bars3Icon,
	MagnifyingGlassIcon,
	BellIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "./ui";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";
import { useTheme } from "../hooks/useTheme";
import PropTypes from "prop-types";

const SearchResults = ({ results, onSelect, onClose }) => {
	if (results.length === 0) return null;

	return (
		<motion.div
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto"
		>
			{results.map((result) => (
				<button
					key={`${result.type}-${result.id}`}
					className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
					onClick={() => {
						onSelect(result);
						onClose();
					}}
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

const Navbar = ({ isMobileMenuOpen, setIsMobileMenuOpen, isMobile }) => {
	const { currentUser, logout } = useAuth();
	const { theme, toggleTheme } = useTheme();
	const { searchQuery, searchResults, handleSearch, clearSearch } = useSearch();
	const [isSearchFocused, setIsSearchFocused] = useState(false);
	const [showUserMenu, setShowUserMenu] = useState(false);

	const handleSearchChange = (e) => {
		handleSearch(e.target.value);
	};

	const handleSearchResultSelect = (result) => {
		clearSearch();
		// Handle navigation based on result type
		console.log("Selected:", result);
	};

	return (
		<nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50">
			<div className="h-full px-4 flex items-center justify-between">
				{/* Left section */}
				<div className="flex items-center gap-4">
					{isMobile && (
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="lg:hidden"
						>
							<Bars3Icon className="h-6 w-6" />
						</Button>
					)}

					<Link to="/" className="flex items-center space-x-2">
						<img src="/logo.svg" alt="Logo" className="h-8 w-8" />
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
						className="hidden sm:flex"
					>
						{theme === "dark" ? "🌞" : "🌙"}
					</Button>

					<Button variant="ghost" size="icon">
						<BellIcon className="h-5 w-5" />
					</Button>

					<div className="relative">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setShowUserMenu(!showUserMenu)}
						>
							<UserCircleIcon className="h-6 w-6" />
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
									<Link
										to="/settings"
										className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
									>
										Settings
									</Link>
									<button
										onClick={logout}
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
