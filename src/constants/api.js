import axios from "axios";
import { toast } from "react-toastify";

const token = localStorage.getItem("authToken");

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:1337",
	headers: {
		"Content-Type": "application/json",
		...(token && { Authorization: `Bearer ${token}` }),
	},
});

// Request interceptor:Attach token dynamically if it changes
axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("authToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	// If there's an error in the request setup, reject the promise with the error
	(error) => Promise.reject(error)
);

// Response interceptor: Handle errors globally
axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		const status = error.response?.status;

		switch (status) {
			case 400:
				toast.error(error.response.data.message);
				break;
			case 401:
				toast.error("Your session has expired. Please login again.");
				window.location.href = "/login";
				break;
			case 403:
				toast.error("You don't have permission to access this resource.");
				break;
			case 404:
				toast.error("Resource not found.");
				break;
			case 500:
				toast.error("Something went wrong. Please try again.");
				break;
			default:
				toast.error("Something went wrong. Please try again.");
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
