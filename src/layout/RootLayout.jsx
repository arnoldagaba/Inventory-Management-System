import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { SearchProvider } from "../context/SearchContext";

const RootLayout = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
			if (window.innerWidth >= 768) {
				setIsMobileMenuOpen(false);
			}
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<SearchProvider>
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
				<Navbar 
					isMobileMenuOpen={isMobileMenuOpen} 
					setIsMobileMenuOpen={setIsMobileMenuOpen} 
					isMobile={isMobile} 
				/>
				
				<div className="flex h-[calc(100vh-4rem)] pt-16">
					<Sidebar 
						isMobileMenuOpen={isMobileMenuOpen} 
						setIsMobileMenuOpen={setIsMobileMenuOpen} 
						isMobile={isMobile} 
					/>
					
					<main className={`flex-1 overflow-y-auto p-4 transition-all duration-300
						${isMobileMenuOpen ? 'opacity-50 lg:opacity-100' : 'opacity-100'}
						${isMobile ? 'w-full' : 'w-[calc(100%-16rem)]'}`}
					>
						<div className="mx-auto max-w-7xl space-y-6">
							<Outlet />
						</div>
					</main>
				</div>
			</div>
		</SearchProvider>
	);
};

export default RootLayout;
