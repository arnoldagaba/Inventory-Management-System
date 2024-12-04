import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
	updateProfile as updateFirebaseProfile,
	onAuthStateChanged,
	setPersistence,
	browserLocalPersistence,
	browserSessionPersistence,
} from "firebase/auth";
import { auth, storage } from "../config/firebase";
import {
	ref,
	uploadBytes,
	getDownloadURL,
	deleteObject,
} from "firebase/storage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		console.log("Setting up auth state listener...");
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			console.log("Auth state changed:", user);
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const signup = async (email, password, name) => {
		setLoading(true);
		try {
			// Create the user
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			// Update profile
			await updateFirebaseProfile(user, {
				displayName: name,
				photoURL: "https://via.placeholder.com/150",
			});

			// Verify the user was created
			if (auth.currentUser) {
				toast.success("Account created successfully!");
				navigate("/login");
			} else {
				throw new Error("Failed to create user account");
			}
		} catch (error) {
			console.error("Signup error:", error);
			// Provide more specific error messages based on error code
			const errorMessage =
				{
					"auth/email-already-in-use": "Email is already registered",
					"auth/invalid-email": "Invalid email address",
					"auth/operation-not-allowed":
						"Email/password accounts are not enabled",
					"auth/weak-password": "Password is too weak",
				}[error.code] || error.message;

			toast.error(errorMessage);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	const login = async (email, password, remember = false) => {
		setLoading(true);
		try {
			// Set persistence based on remember me choice
			await setPersistence(
				auth,
				remember ? browserLocalPersistence : browserSessionPersistence
			);

			await signInWithEmailAndPassword(auth, email, password);
			toast.success("Logged in successfully!");
			navigate("/");
		} catch (error) {
			console.error("Login error:", error);
			toast.error("Invalid email or password");
			throw error;
		} finally {
			setLoading(false);
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			toast.success("Logged out successfully!");
			navigate("/login");
		} catch (error) {
			toast.error("Failed to logout");
			throw error;
		}
	};

	const resetPassword = async (email) => {
		setLoading(true);
		try {
			await sendPasswordResetEmail(auth, email);
			toast.success("Password reset email sent!");
			navigate("/login");
		} catch (error) {
			toast.error("Failed to send reset email");
			throw error;
		} finally {
			setLoading(false);
		}
	};

	const updateProfile = async (data) => {
		setLoading(true);

		try {
			const updates = { displayName: data.name };

			// Handle photo upload
			if (data.photo instanceof File) {
				// Delete old photo if exists
				if (
					currentUser?.photoURL &&
					currentUser.photoURL.includes("firebasestorage")
				) {
					const oldPhotoRef = ref(
						storage,
						`profile-pictures/${currentUser.uid}`
					);
					await deleteObject(oldPhotoRef).catch(console.error);
				}

				// Upload new photo
				const photoRef = ref(storage, `profile-pictures/${currentUser.uid}`);
				const photoSnapshot = await uploadBytes(photoRef, data.photo);
				updates.photoURL = await getDownloadURL(photoSnapshot.ref);
			}

			await updateFirebaseProfile(auth.currentUser, updates);
			setCurrentUser((prev) => ({ ...prev, ...updates }));
			toast.success("Profile updated successfully!");
		} catch (error) {
			console.error(error);
			toast.error("Failed to update profile");
			throw error;
		} finally {
			setLoading(false);
		}
	};

	const value = {
		currentUser,
		loading,
		signup,
		login,
		logout,
		resetPassword,
		updateProfile,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
