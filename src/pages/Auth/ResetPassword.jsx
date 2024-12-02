import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "../../components/ui";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/layouts/AuthLayout";
import { toast } from "react-toastify";

const ResetPassword = () => {
	const { resetPassword, loading } = useAuth();
	
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const validateForm = () => {
		if (!email) {
			setError("Email is required");
			return false;
		}

		if (!/\S+@\S+\.\S+/.test(email)) {
			setError("Email is invalid");
			return false;
		}

		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateForm()) {
			try {
				await resetPassword(email);
				toast.success("Password reset email sent!");
				setIsSubmitted(true);
			} catch {
				toast.error("Failed to send reset email. Please try again.");
			}
		}
	};

	const handleChange = (e) => {
		setEmail(e.target.value);
		if (error) setError("");
	};

	if (isSubmitted) {
		return (
			<AuthLayout>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center"
				>
					<h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
						Check your email
					</h2>

					<p className="mt-2 text-gray-600 dark:text-gray-400">
						We&apos;ve sent password reset instructions to {email}
					</p>

					<div className="mt-6">
						<Link
							to="/login"
							className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
						>
							Back to login
						</Link>
					</div>
				</motion.div>
			</AuthLayout>
		);
	}

	return (
		<AuthLayout>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
			>
				<h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
					Reset your password
				</h2>

				<p className="mt-2 text-gray-600 dark:text-gray-400">
					Enter your email address and we&apos;ll send you instructions to reset
					your password.
				</p>

				<form onSubmit={handleSubmit} className="mt-8 space-y-6">
					<Input
						label="Email address"
						type="email"
						name="email"
						autoComplete="email"
						required
						icon={EnvelopeIcon}
						value={email}
						onChange={handleChange}
						error={error}
					/>

					<Button type="submit" isLoading={loading} className="w-full">
						Send reset instructions
					</Button>

					<p className="text-center text-sm text-gray-600 dark:text-gray-400">
						Remember your password?{" "}
						<Link
							to="/login"
							className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
						>
							Back to login
						</Link>
					</p>
				</form>
			</motion.div>
		</AuthLayout>
	);
};

export default ResetPassword;
