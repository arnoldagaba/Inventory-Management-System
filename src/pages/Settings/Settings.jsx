import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
	UserIcon,
	BellIcon,
	ShieldCheckIcon,
	GlobeAltIcon,
	PaintBrushIcon,
	CameraIcon,
} from "@heroicons/react/24/outline";
import { Card, Container, Input, Button, Badge } from "../../components/ui";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { cn } from "../../utils/cn";

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
	const [isUploading, setIsUploading] = useState(false);
	const fileInputRef = useRef(null);
	const [profileData, setProfileData] = useState({
		name: currentUser?.displayName || "",
		email: currentUser?.email || "",
		phone: currentUser?.phone || "",
		photoURL: currentUser?.photoURL || "",
	});

	const handleImageClick = () => {
		fileInputRef.current?.click();
	};

	const handleImageChange = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Validate file type
		if (!file.type.startsWith('image/')) {
			toast.error('Please upload an image file');
			return;
		}

		// Validate file size (max 5MB)
		if (file.size > 5 * 1024 * 1024) {
			toast.error('Image must be less than 5MB');
			return;
		}

		try {
			setIsUploading(true);
			await updateProfile({ 
				...profileData, 
				photo: file 
			});
			toast.success('Profile picture updated successfully!');
		} catch (error) {
			console.error(error);
			toast.error('Failed to upload image');
		} finally {
			setIsUploading(false);
		}
	};

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
						<div className="mb-6 flex justify-center">
							<div className="relative">
								<button
									onClick={handleImageClick}
									className="relative group"
									disabled={isUploading}
								>
									<div className={cn(
										"h-24 w-24 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700",
										"group-hover:border-blue-500 transition-colors"
									)}>
										{profileData.photoURL ? (
											<img
												src={profileData.photoURL}
												alt="Profile"
												className="h-full w-full object-cover"
											/>
										) : (
											<div className="h-full w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
												<UserIcon className="h-12 w-12 text-gray-400" />
											</div>
										)}
									</div>
									<div className={cn(
										"absolute inset-0 flex items-center justify-center rounded-full",
										"bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
									)}>
										<CameraIcon className="h-8 w-8 text-white" />
									</div>
									{isUploading && (
										<div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
											<div className="h-8 w-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
										</div>
									)}
								</button>
								<input
									type="file"
									ref={fileInputRef}
									onChange={handleImageChange}
									accept="image/*"
									className="hidden"
								/>
							</div>
						</div>

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
