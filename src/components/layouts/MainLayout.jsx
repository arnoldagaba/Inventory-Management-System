import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { SearchProvider } from "../../context/SearchContext";
import { cn } from "../../utils/cn";

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMinimized, setIsMinimized] = useState(false);

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

  const toggleMinimized = () => {
    setIsMinimized(prev => !prev);
  };

  return (
    <SearchProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isMobile={isMobile}
        />

        <div className="flex pt-16">
          <Sidebar
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            isMobile={isMobile}
            isMinimized={isMinimized}
            toggleMinimized={toggleMinimized}
          />

          <main
            className={cn(
              "flex-1 p-4 transition-all duration-300 custom-scrollbar",
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