import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { Button } from "../ui";
import { useTheme } from "../../hooks/useTheme";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const AuthLayout = ({ children }) => {
	const location = useLocation();
	const isLoginPage = location.pathname === "/login";
	const { theme, toggleTheme } = useTheme();

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
			<Button
				variant="ghost"
				size="icon"
				onClick={toggleTheme}
				className="fixed top-4 right-4 hover:bg-gray-100 dark:hover:bg-gray-700"
				aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
			>
				{theme === "dark" ? (
					<SunIcon className="h-7 w-7 text-gray-600 dark:text-gray-400" />
				) : (
					<MoonIcon className="h-7 w-7 text-gray-600 dark:text-gray-400" />
				)}
			</Button>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="max-w-md w-full space-y-8"
			>
				<div className="flex flex-col items-center">
					<img
						src="/src/assets/InvenEase.webp"
						alt="Logo"
						className="h-20 w-auto rounded-xl"
					/>

					{isLoginPage ? (
						<>
							<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
								Welcome back
							</h2>
							<p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
								Sign in to your account to continue
							</p>
						</>
					) : (
						<>
							<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
								Create an account
							</h2>
							<p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
								Get started with InvenEase today
							</p>
						</>
					)}
				</div>

				{children}

				<div className="mt-4 text-center">
					<p className="text-sm text-gray-600 dark:text-gray-400">
						Need help?{" "}
						<a
							href="/contact"
							className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
						>
							Contact support
						</a>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

AuthLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthLayout;
