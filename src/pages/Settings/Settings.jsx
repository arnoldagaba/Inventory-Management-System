import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { CameraIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../hooks/useTheme";

const SettingsPage = () => {
	const { theme, toggleTheme } = useTheme();
	const [expandedRole, setExpandedRole] = useState(null);

	// const toggleTheme = () => {
	// 	const newTheme = theme === "light" ? "dark" : "light";
	// 	setTheme(newTheme);
	// 	document.documentElement.classList.toggle("dark");
	// 	toast.info(`Switched to ${newTheme} theme`);
	// };

	const handleProfileUpload = (e) => {
		// Placeholder logic for file upload
		const file = e.target.files[0];
		if (file) {
			toast.success("Profile picture updated successfully!");
		}
	};

	const handleRoleToggle = (role) => {
		setExpandedRole(expandedRole === role ? null : role);
	};

	return (
		<div className="p-6 space-y-6">
			{/* Header: User Profile and Preferences */}
			<div className="flex items-center space-x-6 mb-8">
				<div className="relative">
					<img
						src="https://via.placeholder.com/100"
						alt="Profile"
						className="w-24 h-24 rounded-full"
					/>
					<input
						type="file"
						onChange={handleProfileUpload}
						className="absolute inset-0 opacity-0 cursor-pointer"
					/>
					<motion.div
						whileHover={{ scale: 1.1 }}
						className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white"
					>
						<CameraIcon />
					</motion.div>
				</div>
				<div>
					<h2 className="text-xl font-semibold">John Doe</h2>
					<p className="text-gray-500">johndoe@example.com</p>
				</div>
			</div>

			{/* Main Section: Two-Column Layout */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Left Column: General Settings */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold">General Settings</h3>

					{/* Theme Toggle */}
					<div className="flex items-center justify-between">
						<p className="text-sm font-medium">Theme</p>
						<div className="flex items-center">
							<SunIcon
								className={`${
									theme === "light" ? "text-yellow-500" : "text-gray-400"
								}`}
							/>
							<motion.div
								onClick={toggleTheme}
								className="w-12 h-6 bg-gray-200 rounded-full mx-2 cursor-pointer relative"
								whileTap={{ scale: 0.9 }}
							>
								<motion.div
									animate={{ x: theme === "dark" ? 24 : 0 }}
									transition={{ type: "spring", stiffness: 300 }}
									className="w-6 h-6 bg-blue-500 rounded-full shadow-md"
								/>
							</motion.div>

							<MoonIcon
								className={`${
									theme === "dark" ? "text-blue-500" : "text-gray-400"
								}`}
							/>
						</div>
					</div>

					{/* Notification Settings */}
					<div className="flex items-center justify-between">
						<p className="text-sm font-medium">Notifications</p>
						<input type="checkbox" className="toggle-checkbox cursor-pointer" />
					</div>
				</div>

				{/* Right Column: Role and Permissions Management */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold">Role & Permissions</h3>

					{/* Expandable Role Settings */}
					{["Admin", "Editor", "Viewer"].map((role) => (
						<motion.div
							key={role}
							onClick={() => handleRoleToggle(role)}
							className="bg-gray-100 p-4 rounded-lg cursor-pointer shadow-md"
							initial={{ height: "auto" }}
							animate={{ height: expandedRole === role ? "auto" : 50 }}
							transition={{ type: "spring", stiffness: 200 }}
						>
							<div className="flex items-center justify-between">
								<p className="text-sm font-medium">{role} Permissions</p>

								<span
									className={`text-${
										expandedRole === role ? "blue" : "gray"
									}-500`}
								>
									{expandedRole === role ? "-" : "+"}
								</span>
							</div>

							{expandedRole === role && (
								<div className="mt-2 space-y-2">
									<div className="flex items-center justify-between">
										<p>Manage Users</p>

										<input
											type="checkbox"
											className="toggle-checkbox cursor-pointer"
										/>
									</div>

									<div className="flex items-center justify-between">
										<p>Edit Content</p>

										<input
											type="checkbox"
											className="toggle-checkbox cursor-pointer"
										/>
									</div>

									<div className="flex items-center justify-between">
										<p>View Analytics</p>

										<input
											type="checkbox"
											className="toggle-checkbox cursor-pointer"
										/>
									</div>
								</div>
							)}
						</motion.div>
					))}

					{/* Save Changes Button */}
					<button
						onClick={() => toast.success("Settings saved successfully!")}
						className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
					>
						Save Changes
					</button>
				</div>
			</div>
		</div>
	);
};

export default SettingsPage;
