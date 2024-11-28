import { createContext, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      // Mock API call - replace with actual authentication
      const user = {
        id: "1",
        email,
        displayName: "John Doe",
        photoURL: "https://via.placeholder.com/150",
      };
      
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("authToken", "mock-token");
      setCurrentUser(user);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Failed to login");
      throw error;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const signup = useCallback(async (email, password, name) => {
    setLoading(true);
    try {
      // Mock API call - replace with actual registration
      const user = {
        id: "1",
        email,
        displayName: name,
        photoURL: "https://via.placeholder.com/150",
      };
      
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("authToken", "mock-token");
      setCurrentUser(user);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Failed to create account");
      throw error;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(async () => {
    try {
      // Mock API call - replace with actual logout
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      setCurrentUser(null);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Failed to logout");
      throw error;
    }
  }, [navigate]);

  const resetPassword = useCallback(async (email) => {
    setLoading(true);
    try {
      // Mock API call - replace with actual password reset
      toast.success("Password reset email sent!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Failed to send reset email");
      throw error;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const updateProfile = useCallback(async (data) => {
    setLoading(true);
    try {
      // Mock API call - replace with actual profile update
      const updatedUser = { ...currentUser, ...data };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
      throw error;
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
