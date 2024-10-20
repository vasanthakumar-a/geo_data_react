import React, { useContext } from 'react'
import UserProfile from './UserProfile'
import { AuthContext } from '../../context/AuthContext';
import ListShapes from '../Shapes/ListShapes';

const Home = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <UserProfile user={user} onLogout={handleLogout} />
      <br /><br />
      <ListShapes />
    </>
  )
}

export default Home