import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HomeIcon } from "@heroicons/react/24/outline";
import { Button } from "../components/ui";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-lg w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-500">
            404
          </h1>
          <h2 className="mt-4 text-3xl font-semibold text-gray-900 dark:text-white">
            Page Not Found
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Sorry, we couldn't find the page you're looking for. Perhaps you've
            mistyped the URL or the page has been moved.
          </p>

          <div className="mt-8">
            <Link to="/">
              <Button className="inline-flex items-center">
                <HomeIcon className="h-5 w-5 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
