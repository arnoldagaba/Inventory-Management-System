import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("authToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor
api.interceptors.response.use(
	(response) => response,
	(error) => {
		const message = error.response?.data?.message || "Something went wrong";
		
		if (error.response?.status === 401) {
			localStorage.removeItem("authToken");
			localStorage.removeItem("user");
			window.location.href = "/login";
		}

		toast.error(message);
		return Promise.reject(error);
	}
);

export const endpoints = {
	auth: {
		login: "/auth/login",
		signup: "/auth/signup",
		resetPassword: "/auth/reset-password",
		updateProfile: "/auth/profile",
	},
	orders: {
		list: "/orders",
		create: "/orders",
		update: (id) => `/orders/${id}`,
		delete: (id) => `/orders/${id}`,
	},
	products: {
		list: "/products",
		create: "/products",
		update: (id) => `/products/${id}`,
		delete: (id) => `/products/${id}`,
	},
	stock: {
		list: "/stock",
		update: (id) => `/stock/${id}`,
	},
	analytics: {
		dashboard: "/analytics/dashboard",
		sales: "/analytics/sales",
		customers: "/analytics/customers",
	},
};
