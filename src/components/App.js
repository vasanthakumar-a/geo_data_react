import React, { useState } from 'react';
import Login from './Auth/Login';
import UserProfile from './Dashboard/UserProfile';
import Map from './Dashboard/Map';

const App = () => {
    const [user, setUser] = useState(null);

    const handleLoginSuccess = (userData) => {
        setUser(userData); // Set user data on successful login
    };

    const handleLogout = () => {
        setUser(null); // Clear user data on logout
    };

    return (
        <div>
            <h1>Geo-Data App</h1>
            {user ? (
                <UserProfile user={user} onLogout={handleLogout} />
            ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
};

export default App;
