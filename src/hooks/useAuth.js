// src/hooks/useAuth.js
import { useState } from 'react';

const useAuth = () => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData); // Simulate user login
    };

    const logout = () => {
        setUser(null); // Simulate user logout
    };

    return { user, login, logout };
};

export default useAuth;
