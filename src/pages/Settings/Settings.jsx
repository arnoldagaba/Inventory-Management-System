import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
	UserIcon,
	BellIcon,
	ShieldCheckIcon,
	GlobeAltIcon,
	PaintBrushIcon,
} from "@heroicons/react/24/outline";
import { Card, Container, Input, Button, Badge } from "../../components/ui";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const SettingsSection = ({ title, children }) => (
	<Card>
		<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
			{title}
		</h2>
		{children}
	</Card>
);

SettingsSection.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

const Settings = () => {
	const { theme, toggleTheme } = useTheme();
	const { currentUser, updateProfile } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [profileData, setProfileData] = useState({
		name: currentUser?.displayName || "",
		email: currentUser?.email || "",
		phone: currentUser?.phone || "",
	});

	const handleProfileUpdate = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await updateProfile(profileData);
			toast.success("Profile updated successfully!");
		} catch (_error) {
			// Error handled by axios interceptor
		} finally {
			setIsLoading(false);
		}
	};

	const notificationSettings = [
		{ id: "email", label: "Email Notifications", enabled: true },
		{ id: "push", label: "Push Notifications", enabled: false },
		{ id: "sms", label: "SMS Notifications", enabled: true },
	];

	const securitySettings = [
		{ id: "2fa", label: "Two-Factor Authentication", enabled: false },
		{ id: "sessions", label: "Active Sessions", count: 2 },
		{ id: "devices", label: "Trusted Devices", count: 3 },
	];

	return (
		<Container>
			<div className="space-y-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<SettingsSection title="Profile Settings">
						<form onSubmit={handleProfileUpdate} className="space-y-4">
							<Input
								icon={UserIcon}
								label="Full Name"
								name="name"
								value={profileData.name}
								onChange={(e) =>
									setProfileData((prev) => ({
										...prev,
										name: e.target.value,
									}))
								}
							/>
							<Input
								icon={GlobeAltIcon}
								label="Email"
								type="email"
								name="email"
								value={profileData.email}
								disabled
							/>
							<Input
								icon={UserIcon}
								label="Phone"
								name="phone"
								value={profileData.phone}
								onChange={(e) =>
									setProfileData((prev) => ({
										...prev,
										phone: e.target.value,
									}))
								}
							/>
							<Button type="submit" isLoading={isLoading}>
								Update Profile
							</Button>
						</form>
					</SettingsSection>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
				>
					<SettingsSection title="Notification Settings">
						<div className="space-y-4">
							{notificationSettings.map((setting) => (
								<div
									key={setting.id}
									className="flex items-center justify-between"
								>
									<div className="flex items-center space-x-3">
										<BellIcon className="h-5 w-5 text-gray-400" />
										<span className="text-gray-700 dark:text-gray-300">
											{setting.label}
										</span>
									</div>
									<Badge
										variant={setting.enabled ? "success" : "error"}
										size="sm"
									>
										{setting.enabled ? "Enabled" : "Disabled"}
									</Badge>
								</div>
							))}
						</div>
					</SettingsSection>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					<SettingsSection title="Security Settings">
						<div className="space-y-4">
							{securitySettings.map((setting) => (
								<div
									key={setting.id}
									className="flex items-center justify-between"
								>
									<div className="flex items-center space-x-3">
										<ShieldCheckIcon className="h-5 w-5 text-gray-400" />
										<span className="text-gray-700 dark:text-gray-300">
											{setting.label}
										</span>
									</div>
									{typeof setting.enabled === "boolean" ? (
										<Badge
											variant={setting.enabled ? "success" : "error"}
											size="sm"
										>
											{setting.enabled ? "Enabled" : "Disabled"}
										</Badge>
									) : (
										<Badge variant="info" size="sm">
											{setting.count}
										</Badge>
									)}
								</div>
							))}
						</div>
					</SettingsSection>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
				>
					<SettingsSection title="Appearance">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<PaintBrushIcon className="h-5 w-5 text-gray-400" />
								<span className="text-gray-700 dark:text-gray-300">
									Dark Mode
								</span>
							</div>
							<Button variant="secondary" onClick={toggleTheme}>
								{theme === "dark" ? "Light Mode" : "Dark Mode"}
							</Button>
						</div>
					</SettingsSection>
				</motion.div>
			</div>
		</Container>
	);
};

export default Settings;
