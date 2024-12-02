import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { SearchProvider } from "../../context/SearchContext";
import { cn } from "../../utils/cn";

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMinimized, setIsMinimized] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsMinimized(true);
    }
  }, [location.pathname, isMobile]);

  const toggleMinimized = () => {
    setIsMinimized(prev => !prev);
  };

  return (
    <SearchProvider>
      <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <Navbar
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isMobile={isMobile}
          isMinimized={isMinimized}
        />

        <div className="flex flex-1 pt-16 overflow-hidden">
          <Sidebar
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            isMobile={isMobile}
            isMinimized={isMinimized}
            toggleMinimized={toggleMinimized}
          />

          <main
            className={cn(
              "flex-1 transition-all duration-300 overflow-auto",
              "p-4 sm:p-6 lg:p-8",
              isMobile ? "w-full" : isMinimized ? "ml-20" : "ml-60"
            )}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mx-auto max-w-7xl">
                  <Outlet />
                </div>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </SearchProvider>
  );
};

export default MainLayout; 