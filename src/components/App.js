import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import UserProfile from "./Dashboard/UserProfile";
import FileUpload from "./Dashboard/FileUpload";
import Map from "./Dashboard/Map";

const App = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (    
    <div>
      <h1>Geo-Data App</h1>
      {user ? (
        <>
          <UserProfile user={user} onLogout={handleLogout} />
          <FileUpload />
          <Map />
        </>
      ) : (
        <>
          <Login onLoginSuccess={handleLoginSuccess} />
          <Signup />
        </>
      )}
    </div>
  );
};

export default App;