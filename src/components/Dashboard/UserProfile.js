import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const UserProfile = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div>
            {user ? (
                <div>
                    <h1>Welcome, {user.email}</h1>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <h1>Please log in</h1>
            )}
        </div>
    );
};

export default UserProfile;
