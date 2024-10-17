import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import UserProfile from './Dashboard/UserProfile';
import FileUpload from './Dashboard/FileUpload';
import Map from './Dashboard/Map';

const App = () => {
    return (
        <AuthProvider>
            <div>
                <h1>Geo-Data App</h1>
                <UserProfile />
                <Login />
                <Signup />
                <FileUpload />
                <Map />
            </div>
        </AuthProvider>
    );
};

export default App;
