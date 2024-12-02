import { createContext, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { api } from "../constants/api";

export const SearchContext = createContext();

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
			// Replace mock search with actual API call
			const results = await api.get(`/search?q=${query}`).then(res => res.data);
			
			// Fallback to mock results if API is not available
			if (!results?.length) {
				const mockResults = [
					{ type: "order", id: "001", title: "Order #001" },
					{ type: "product", id: "P001", title: "Product A" },
					{ type: "customer", id: "C001", title: "John Doe" },
				].filter((item) =>
					item.title.toLowerCase().includes(query.toLowerCase())
				);
				setSearchResults(mockResults);
				return;
			}
			
			setSearchResults(results);
		} catch (error) {
			console.error('Search error:', error);
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
