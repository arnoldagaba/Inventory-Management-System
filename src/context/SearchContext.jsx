import { createContext, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { api } from "../constants/api";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState({
		orders: [],
		products: [],
		customers: [],
		all: []
	});
	const [isSearching, setIsSearching] = useState(false);

	const handleSearch = useCallback(async (query, type = 'all') => {
		setSearchQuery(query);
		if (!query.trim()) {
			setSearchResults({
				orders: [],
				products: [],
				customers: [],
				all: []
			});
			return;
		}

		setIsSearching(true);
		try {
			// Mock search results - replace with actual API call
			const mockData = {
				orders: [
					{ type: "order", id: "ORD001", title: "Order #001", status: "Pending", date: "2024-03-15" },
					{ type: "order", id: "ORD002", title: "Order #002", status: "Completed", date: "2024-03-14" },
				],
				products: [
					{ type: "product", id: "PRD001", title: "Product A", stock: 50, price: 29.99 },
					{ type: "product", id: "PRD002", title: "Product B", stock: 30, price: 39.99 },
				],
				customers: [
					{ type: "customer", id: "CUS001", title: "John Doe", email: "john@example.com" },
					{ type: "customer", id: "CUS002", title: "Jane Smith", email: "jane@example.com" },
				],
			};

			// Filter based on search query
			const filteredResults = {
				orders: mockData.orders.filter(item => 
					item.title.toLowerCase().includes(query.toLowerCase()) ||
					item.status.toLowerCase().includes(query.toLowerCase())
				),
				products: mockData.products.filter(item => 
					item.title.toLowerCase().includes(query.toLowerCase())
				),
				customers: mockData.customers.filter(item => 
					item.title.toLowerCase().includes(query.toLowerCase()) ||
					item.email.toLowerCase().includes(query.toLowerCase())
				),
			};

			// Combine all results for the 'all' type
			const allResults = [
				...filteredResults.orders,
				...filteredResults.products,
				...filteredResults.customers,
			];

			// Update results based on search type
			if (type === 'all') {
				setSearchResults({
					...filteredResults,
					all: allResults
				});
			} else {
				setSearchResults(prev => ({
					...prev,
					[type]: filteredResults[type] || [],
					all: allResults
				}));
			}

			// Uncomment and modify for actual API implementation
			// const response = await api.get(`/search`, {
			//   params: { q: query, type }
			// });
			// setSearchResults(response.data);

		} catch (error) {
			console.error('Search error:', error);
			setSearchResults({
				orders: [],
				products: [],
				customers: [],
				all: []
			});
		} finally {
			setIsSearching(false);
		}
	}, []);

	const clearSearch = useCallback(() => {
		setSearchQuery("");
		setSearchResults({
			orders: [],
			products: [],
			customers: [],
			all: []
		});
	}, []);

	const getResultsByType = useCallback((type) => {
		return searchResults[type] || [];
	}, [searchResults]);

	const value = {
		searchQuery,
		searchResults,
		isSearching,
		handleSearch,
		clearSearch,
		getResultsByType,
	};

	return (
		<SearchContext.Provider value={value}>{children}</SearchContext.Provider>
	);
};

SearchProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
