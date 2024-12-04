import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
	EnvelopeIcon,
	LockClosedIcon,
	EyeIcon,
	EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { Button, Input } from "../../components/ui";
import { useAuth } from "../../hooks";
import AuthLayout from "../../components/layouts/AuthLayout";
import { toast } from "react-toastify";

const Login = () => {
	const { login, loading } = useAuth();
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({});

	const validateForm = () => {
		const newErrors = {};
		if (!formData.email) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (validateForm()) {
			try {
				await login(formData.email, formData.password, rememberMe);
				toast.success("Logged in successfully!");
			} catch (error) {
				console.error('Login error:', error);
				toast.error("Invalid email or password");
			}
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	return (
		<AuthLayout>
			<motion.form
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				onSubmit={handleSubmit}
				className="mt-8 space-y-6"
			>
				<div className="space-y-4">
					<Input
						label="Email address"
						type="email"
						name="email"
						autoComplete="email"
						required
						icon={EnvelopeIcon}
						value={formData.email}
						onChange={handleChange}
						error={errors.email}
					/>

					<div className="relative">
						<Input
							label="Password"
							type={showPassword ? "text" : "password"}
							name="password"
							autoComplete="current-password"
							required
							icon={LockClosedIcon}
							value={formData.password}
							onChange={handleChange}
							error={errors.password}
						/>

						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute text-gray-400 right-3 top-9 hover:text-gray-500"
						>
							{showPassword ? (
								<EyeSlashIcon className="w-5 h-5" />
							) : (
								<EyeIcon className="w-5 h-5" />
							)}
						</button>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<input
							id="remember-me"
							name="remember-me"
							type="checkbox"
							checked={rememberMe}
							onChange={(e) => setRememberMe(e.target.checked)}
							className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
						/>

						<label
							htmlFor="remember-me"
							className="block ml-2 text-sm text-gray-900 dark:text-gray-300"
						>
							Remember me
						</label>
					</div>

					<Link
						to="/reset-password"
						className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
					>
						Forgot password?
					</Link>
				</div>

				<Button type="submit" isLoading={loading} className="w-full">
					Login
				</Button>

				<p className="text-sm text-center text-gray-600 dark:text-gray-400">
					Don&apos;t have an account?{" "}
					<Link
						to="/signup"
						className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
					>
						Sign up
					</Link>
				</p>
			</motion.form>
		</AuthLayout>
	);
};

export default Login;
