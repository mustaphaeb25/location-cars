import React, { createContext, useState, useEffect, useContext } from 'react';
import { login, register } from '../services/api';
import { jwtDecode } from 'jwt-decode'; // npm install jwt-decode

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          console.log("Token expired.");
          logout();
        } else {
          setUser({
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
          });
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        logout();
      }
    }
    setLoading(false);
  }, [token]);

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const response = await login({ email, mot_de_passe: password });
      const receivedToken = response.data.token;
      localStorage.setItem('token', receivedToken);
      setToken(receivedToken);
      const decoded = jwtDecode(receivedToken);
      setUser({
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      });
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      console.error("Login failed:", error.response?.data?.message || error.message);
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const signUp = async (nom, email, password) => {
    try {
      setLoading(true);
      const response = await register({ nom, email, mot_de_passe: password });
      setLoading(false);
      return { success: true, message: response.data.message };
    } catch (error) {
      setLoading(false);
      console.error("Registration failed:", error.response?.data?.message || error.message);
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user && user.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, loading, signIn, signUp, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);