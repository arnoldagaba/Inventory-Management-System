import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { OriginButton } from "../../components/ui/origin";
import { ThemeToggle } from "../../components/ThemeToggle";
import {
  ChartBarIcon,
  CubeIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: ChartBarIcon,
    title: "Real-time Analytics",
    description: "Get instant insights into your inventory performance with detailed analytics and reporting.",
  },
  {
    icon: CubeIcon,
    title: "Stock Management",
    description: "Efficiently manage your inventory with automated stock tracking and reorder notifications.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure & Reliable",
    description: "Enterprise-grade security to protect your business data with regular backups.",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img
                src="/src/assets/InvenEase.webp"
                alt="Logo"
                className="h-8 w-8 rounded-xl"
              />
              <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                InvenEase
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle className="hover:bg-gray-100 dark:hover:bg-gray-700" />
              <Link to="/login">
                <OriginButton variant="outline">Sign in</OriginButton>
              </Link>
              <Link to="/signup">
                <OriginButton>Get Started</OriginButton>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              Simplify Your{" "}
              <span className="text-origin-600 dark:text-origin-500">
                Inventory Management
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Streamline your business operations with our powerful inventory management system. 
              Track stock, manage orders, and grow your business with ease.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <OriginButton 
                  size="lg" 
                  className="w-full sm:w-auto bg-origin-600 hover:bg-origin-700 dark:bg-origin-500 dark:hover:bg-origin-600 text-white shadow-lg hover:shadow-origin-500/25 dark:shadow-origin-400/25 transition-all duration-200"
                >
                  Start Free Trial
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </OriginButton>
              </Link>
              <OriginButton
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-origin-200 dark:border-origin-400/20 hover:bg-origin-50 dark:hover:bg-origin-400/10 text-origin-600 dark:text-origin-400"
                onClick={() => window.open('https://calendly.com', '_blank')}
              >
                Book a Demo
              </OriginButton>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="absolute -top-6 left-6">
                  <div className="p-3 bg-origin-600 rounded-lg shadow-lg">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-origin-600 dark:bg-origin-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to transform your business?
          </h2>
          <p className="mt-4 text-lg text-origin-100">
            Join thousands of businesses that trust InvenEase
          </p>
          <Link to="/signup" className="mt-8 inline-block">
            <OriginButton
              size="lg"
              className="bg-white hover:bg-gray-50 dark:bg-origin-500 dark:hover:bg-origin-600 text-origin-600 dark:text-white shadow-lg hover:shadow-white/25 dark:hover:shadow-origin-400/25 transition-all duration-200"
            >
              Get Started Now
            </OriginButton>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>© 2024 InvenEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 