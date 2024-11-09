import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme); // Save new theme immediately
	};

	useEffect(() => {
		// Apply theme class to body based on current theme
		document.body.classList.toggle("dark", theme === "dark");
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export { ThemeContext, ThemeProvider };
