import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');

    if (storedEmail) {
      setUser({ email: storedEmail });
    }
  }, []);

  const login = async (credentials) => {
    const response = await axios.post("/api/auth/login", credentials);
    setUser(response.data.user);
  };

  const signup = async (userData) => {
    const response = await axios.post("/api/auth/signup", userData);
    setUser(response.data.user);
  };

  const logout = async () => {
    // await axios.post("/api/auth/logout");
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
