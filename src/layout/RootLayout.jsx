import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const RootLayout = () => {
	return (
		<div className="h-screen w-screen flex overflow-hidden">
			{/* Sidebar */}
			<Sidebar />

			{/* Main Content Area */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Navbar */}
				<Navbar />

				{/* Page Content */}
				<main className="flex-1 overflow-y-auto p-4 bg-gray-100">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default RootLayout;
