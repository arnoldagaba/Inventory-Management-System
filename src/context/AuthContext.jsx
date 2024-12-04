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

	const handleFirebaseError = (error) => {
		switch (error.code) {
			case "auth/email-already-in-use":
				return "Email is already registered.";

			case "auth/invalid-email":
				return "Invalid email address.";

			case "auth/weak-password":
				return "Password is too weak.";

			case "auth/user-not-found":
				return "No user found with that email.";

			case "auth/wrong-password":
				return "Incorrect password.";

			case "auth/too-many-requests":
				return "Too many login attempts. Please try again later.";

			case "auth/invalid-login-credentials":
				return "Invalid email or password. Please try again.";

			default:
				return "An unexpected error occurred. Please try again.";
		}
	};

	const executeWithLoading = useCallback(() => {
		async (fn) => {
			setLoading(true);
			try {
				await fn();
			} catch (error) {
				console.error("Firebase operation failed", error);
				toast.error(handleFirebaseError(error));
			} finally {
				setLoading(false);
			}
		};
	}, []);

	const signup = useCallback(
		(email, password) =>
			executeWithLoading(async () => {
				await createUserWithEmailAndPassword(auth, email, password);
				// await updateFirebaseProfile(user, {
				// 	displayName: name,
				// 	photoURL: "https://via.placeholder.com/150",
				// });
				navigate("/login");
				toast.success("Account created successfully!");
			}),
		[executeWithLoading, navigate]
	);

	const login = useCallback(() => {
		executeWithLoading(async (email, password, rememberMe) => {
			// Set persistence based on remember me choice
			await setPersistence(
				auth,
				rememberMe ? browserLocalPersistence : browserSessionPersistence
			);
			await signInWithEmailAndPassword(auth, email, password);
			navigate("/");
			toast.success("Logged in successfully!");
		});
	}, [executeWithLoading, navigate]);

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

	/* const updateProfile = async (data) => {
		setLoading(true);

		try {
			const updates = { displayName: data.name };
			let photoURL;

			if (data.photo instanceof File) {
				const isFirebaseStorage = currentUser?.photoURL?.includes("firebasestorage");
				if (isFirebaseStorage) {
					const oldPhotoRef = ref(storage, `profile-pictures/${currentUser.uid}`);
					await deleteObject(oldPhotoRef).catch(console.error);
				}

				const photoRef = ref(storage, `profile-pictures/${currentUser.uid}`);
				const photoSnapshot = await uploadBytes(photoRef, data.photo);
				photoURL = await getDownloadURL(photoSnapshot.ref);
				updates.photoURL = photoURL;
			}

			await updateFirebaseProfile(auth.currentUser, updates);
			if (photoURL) {
				setCurrentUser((prev) => ({ ...prev, ...updates }));
			}

			toast.success("Profile updated successfully!");
		} catch (error) {
			console.error(error);
			toast.error("Failed to update profile");
			throw error;
		} finally {
			setLoading(false);
		}
	}; */

	const value = {
		currentUser,
		loading,
		signup,
		login,
		logout,
		resetPassword,
		// updateProfile,
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
