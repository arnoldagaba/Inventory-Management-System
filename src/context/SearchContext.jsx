import { createContext, useContext, useState, useCallback } from "react";
import PropTypes from "prop-types";

const SearchContext = createContext();

export const useSearch = () => {
	const context = useContext(SearchContext);
	if (!context) {
		throw new Error("useSearch must be used within a SearchProvider");
	}
	return context;
};

export const SearchProvider = ({ children }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [isSearching, setIsSearching] = useState(false);

	const handleSearch = useCallback(async (query) => {
		setSearchQuery(query);
		if (!query.trim()) {
			setSearchResults([]);
			return;
		}

		setIsSearching(true);
		try {
			// Mock search results - replace with actual API call
			const results = [
				{ type: "order", id: "001", title: "Order #001" },
				{ type: "product", id: "P001", title: "Product A" },
				{ type: "customer", id: "C001", title: "John Doe" },
			].filter((item) =>
				item.title.toLowerCase().includes(query.toLowerCase())
			);

			setSearchResults(results);
		} catch {
			setSearchResults([]);
		} finally {
			setIsSearching(false);
		}
	}, []);

	const clearSearch = useCallback(() => {
		setSearchQuery("");
		setSearchResults([]);
	}, []);

	const value = {
		searchQuery,
		searchResults,
		isSearching,
		handleSearch,
		clearSearch,
	};

	return (
		<SearchContext.Provider value={value}>{children}</SearchContext.Provider>
	);
};

SearchProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
