import React, { useContext } from 'react'
import UserProfile from './UserProfile'
import { AuthContext } from '../../context/AuthContext';
import Map from './Map';
import FileUpload from './FileUpload';

const Home = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <UserProfile user={user} onLogout={handleLogout} />
      <FileUpload />
      <Map />
    </>
  )
}

export default Home