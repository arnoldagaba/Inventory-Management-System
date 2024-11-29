import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { SearchProvider } from "./context/SearchContext";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import MainLayout from "./components/layouts/MainLayout";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import ResetPassword from "./pages/Auth/ResetPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import Orders from "./pages/Orders/Orders";
import Products from "./pages/Products/Products";
import Analytics from "./pages/Analytics/Analytics";
import Settings from "./pages/Settings/Settings";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications/Notifications";
import { NotificationsProvider } from "./context/NotificationsContext";

const App = () => {
	return (
		<Router>
			<ThemeProvider>
				<AuthProvider>
					<NotificationsProvider>
						<SearchProvider>
							<Routes>
								{/* Public Routes */}
								<Route element={<PublicRoute />}>
									<Route path="/login" element={<Login />} />
									<Route path="/signup" element={<SignUp />} />
									<Route path="/reset-password" element={<ResetPassword />} />
								</Route>

								{/* Protected Routes */}
								<Route element={<ProtectedRoute />}>
									<Route element={<MainLayout />}>
										<Route path="/" element={<Dashboard />} />
										<Route path="/orders" element={<Orders />} />
										<Route path="/products" element={<Products />} />
										<Route path="/analytics" element={<Analytics />} />
										<Route path="/notifications" element={<Notifications />} />
										<Route path="/settings" element={<Settings />} />
									</Route>
								</Route>

								{/* Redirect root to dashboard if authenticated */}
								<Route path="/" element={<Navigate to="/dashboard" replace />} />

								{/* 404 Route */}
								<Route path="*" element={<NotFound />} />
							</Routes>
							<ToastContainer
								position="top-right"
								autoClose={3000}
								hideProgressBar={false}
								newestOnTop
								closeOnClick
								rtl={false}
								pauseOnFocusLoss
								draggable
								pauseOnHover
								theme="colored"
							/>
						</SearchProvider>
					</NotificationsProvider>
				</AuthProvider>
			</ThemeProvider>
		</Router>
	);
};

export default App;
