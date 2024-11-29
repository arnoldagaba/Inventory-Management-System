import { motion } from "framer-motion";
import PropTypes from "prop-types";

const AuthLayout = ({ children }) => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
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

					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
						Welcome back
					</h2>
					
					<p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
						Sign in to your account to continue
					</p>
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
