import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RootLayout from "./layout/RootLayout";
import { ThemeProvider } from "./context/ThemeContext";

// Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound";
import Orders from "./pages/Orders/Orders";
import Products from "./pages/Products/Products";
import Stock from "./pages/Stock/Stock";
import Reports from "./pages/Reports/Reports";
import Analytics from "./pages/Analytics/Analytics";
import Settings from "./pages/Settings/Settings";
import Notifications from "./pages/Notifications/Notifications";

const App = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={<RootLayout />}>
					<Route index element={<Dashboard />} />
					<Route path="orders" element={<Orders />} />
					<Route path="products" element={<Products />} />
					<Route path="stock" element={<Stock />} />
					<Route path="analytics" element={<Analytics />} />
					<Route path="reports" element={<Reports />} />
					<Route path="notifcations" element={<Notifications />} />
					<Route path="settings" element={<Settings />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</>
		)
	);

	return (
		<ThemeProvider>
			<>
				<RouterProvider router={router} />
				<ToastContainer
					position="top-right"
					autoClose={3000}
					newestOnTop
					closeOnClick
					pauseOnHover
				/>
			</>
		</ThemeProvider>
	);
};

export default App;
