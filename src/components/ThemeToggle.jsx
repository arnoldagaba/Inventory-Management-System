import { Button } from "./ui";
import { useTheme } from "../hooks/useTheme";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export const ThemeToggle = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={className}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <SunIcon className="h-7 w-7 text-gray-600 dark:text-gray-400" />
      ) : (
        <MoonIcon className="h-7 w-7 text-gray-600 dark:text-gray-400" />
      )}
    </Button>
  );
}; 