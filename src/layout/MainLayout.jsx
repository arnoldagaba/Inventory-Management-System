import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
	return (
		<>
			<NavigationBar />
			<Outlet />
			{/* <Footer /> */}
			<ToastContainer position="top-center" autoClose={5000} hideProgressBar />
		</>
	);
};

export default MainLayout;
