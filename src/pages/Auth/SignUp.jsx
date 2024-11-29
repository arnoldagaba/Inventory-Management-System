import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
	EnvelopeIcon,
	LockClosedIcon,
	UserIcon,
	EyeIcon,
	EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { Button, Input } from "../../components/ui";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/layouts/AuthLayout";
import { toast } from "react-toastify";

const SignUp = () => {
	const { signup, loading } = useAuth();
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});

	const validateForm = () => {
		const newErrors = {};
		if (!formData.name) {
			newErrors.name = "Name is required";
		}

		if (!formData.email) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}

		if (!formData.confirmPassword) {
			newErrors.confirmPassword = "Please confirm your password";
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (validateForm()) {
			try {
				await signup(formData.email, formData.password, formData.name);
				toast.success("Account created successfully! Please log in.");
				navigate("/login");
			} catch {
				//TODO: Error handled by auth context
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
						label="Full name"
						type="text"
						name="name"
						autoComplete="name"
						required
						icon={UserIcon}
						value={formData.name}
						onChange={handleChange}
						error={errors.name}
					/>

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
							autoComplete="new-password"
							required
							icon={LockClosedIcon}
							value={formData.password}
							onChange={handleChange}
							error={errors.password}
						/>

						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-9 text-gray-400 hover:text-gray-500"
						>
							{showPassword ? (
								<EyeSlashIcon className="h-5 w-5" />
							) : (
								<EyeIcon className="h-5 w-5" />
							)}
						</button>
					</div>

					<Input
						label="Confirm password"
						type="password"
						name="confirmPassword"
						autoComplete="new-password"
						required
						icon={LockClosedIcon}
						value={formData.confirmPassword}
						onChange={handleChange}
						error={errors.confirmPassword}
					/>
				</div>

				<div className="flex items-center">
					<input
						id="terms"
						name="terms"
						type="checkbox"
						required
						className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
					/>
          
					<label
						htmlFor="terms"
						className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
					>
						I agree to the{" "}
						<Link
							to="/terms"
							className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
						>
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link
							to="/privacy"
							className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
						>
							Privacy Policy
						</Link>
					</label>
				</div>

				<Button type="submit" isLoading={loading} className="w-full">
					Create account
				</Button>

				<p className="text-center text-sm text-gray-600 dark:text-gray-400">
					Already have an account?{" "}
					<Link
						to="/login"
						className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
					>
						Sign in
					</Link>
				</p>
			</motion.form>
		</AuthLayout>
	);
};

export default SignUp;
