import axios from "axios";

const API_URL = "https://inventorymanagement-systemwithstrapi.onrender.com";

// Register a new user
export const registerUser = async (userData) => {
	try {
		const response = await axios.post(
			`${API_URL}/api/auth/local/register`,
			userData
		);
		return response.data;
	} catch (error) {
		console.error("Error during user registration:", error);
		throw error;
	}
};

// Login a user
export const loginUser = async (loginData) => {
	try {
		const response = await axios.post(`${API_URL}/api/auth/local`, loginData);
        console.log("Login response data: ", response.data)
		return response.data;
	} catch (error) {
		console.error("Error during user login:", error);
		throw error;
	}
};

// Fetch a user profile (optional, remove token if unused)
export const fetchUserProfile = async () => {
	try {
		const response = await axios.get(`${API_URL}/api/users/me`);
		return response.data;
	} catch (error) {
		console.error("Error fetching user profile:", error);
		throw error;
	}
};

// Create a product
export const createProduct = async (productData) => {
	try {
		const response = await axios.post(`${API_URL}/api/products`, productData);
		return response.data;
	} catch (error) {
		console.error("Error during product creation:", error);
		throw error;
	}
};
