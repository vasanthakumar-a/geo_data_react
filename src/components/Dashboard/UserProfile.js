import React from 'react';

const UserProfile = ({ user, onLogout }) => {
    return (
        <div>
            <h2>User Profile</h2>
            <p>Email: {user.email}</p>
            <button onClick={onLogout}>Logout</button>
        </div>
    );
};

export default UserProfile;
