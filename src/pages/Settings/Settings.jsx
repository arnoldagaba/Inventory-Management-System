import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { CameraIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../hooks/useTheme";
import { roles } from "../../constants/constants";

const SettingsPage = () => {
	const { theme, toggleTheme } = useTheme();
	const [expandedRole, setExpandedRole] = useState(null);

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
		<div className="p-6 space-y-6 dark:bg-gray-800">
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
						className="absolute bottom-0 right-0 bg-blue-500 dark:bg-blue-900 p-2 rounded-full text-white"
					>
						<CameraIcon className="w-6 h-6" />
					</motion.div>
				</div>

				<div>
					<h2 className="text-xl font-semibold dark:text-white">John Doe</h2>
					<p className="text-gray-500 dark:text-gray-300">
						johndoe@example.com
					</p>
				</div>
			</div>

			{/* Main Section: Two-Column Layout */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Left Column: General Settings */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold dark:text-white">
						General Settings
					</h3>

					{/* Theme Toggle */}
					<div className="flex items-center justify-between">
						<p className="text-sm font-medium dark:text-white">Theme</p>

						<div className="flex items-center">
							<SunIcon className="h-5 w-5 text-yellow-500 dark:text-gray-100" />

							<motion.div
								onClick={toggleTheme}
								className="w-12 h-6 bg-gray-300 dark:bg-gray-900 rounded-full mx-2 cursor-pointer relative"
								whileTap={{ scale: 0.9 }}
							>
								<motion.div
									animate={{ x: theme === "dark" ? 24 : 0 }}
									transition={{ type: "spring", stiffness: 80 }}
									className="w-6 h-6 bg-blue-900 dark:bg-blue-100 rounded-full shadow-md"
								/>
								{/* {toast.info(`Switched to ${theme} theme`)} */}
							</motion.div>

							<MoonIcon className="h-5 w-5 text-gray-950 dark:text-gray-100" />
						</div>
					</div>

					{/* Notification Settings */}
					<div className="flex items-center justify-between">
						<p className="text-sm font-medium dark:text-white">Notifications</p>
						<input type="checkbox" className="toggle-checkbox cursor-pointer" />
					</div>
				</div>

				{/* Right Column: Role and Permissions Management */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold dark:text-white">
						Role & Permissions
					</h3>
					
					{/* Expandable Role Settings */}{" "}
					{/* TODO: Convert into a headlessUI dropdown */}
					{roles.map((role) => (
						<div
							key={role}
							onClick={() => handleRoleToggle(role)}
							className="bg-gray-100 p-4 rounded-lg cursor-pointer shadow-md"
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
						</div>
					))}

					{/* Save Changes Button */}
					<button
						onClick={() => toast.success("Settings saved successfully!")}
						className="bg-blue-500 dark:bg-blue-900 text-white px-4 py-2 rounded-md shadow-md"
					>
						Save Changes
					</button>
				</div>
			</div>
		</div>
	);
};

export default SettingsPage;
