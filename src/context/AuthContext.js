import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Function to handle login
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        email,
        password,
      });
      const { token } = response.data;

      // Save token in local storage
      localStorage.setItem("authToken", token);

      // Decode token to get user details
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);

      // Redirect based on role
      if (decodedUser.role === "student") {
        navigate("/student-dashboard");
      } else if (decodedUser.role === "recruiter") {
        navigate("/recruiter-dashboard");
      } else if (decodedUser.role === "admin") {
        navigate("/admin-dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error.response.data.message);
      throw new Error(error.response.data.message);
    }
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/login");
  };

  // Check for an existing token on initial load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
