import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');

    if (storedEmail) {
      setUser({ email: storedEmail });
    }
  }, []);

  const logout = async () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
