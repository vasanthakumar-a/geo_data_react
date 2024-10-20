import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../api/auth";

const UserProfile = () => {
  const { user, setUser } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      setUser(null);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleLogout = async (e) => {
    e.preventDefault();
    mutation.mutate()
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.email}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  );
};

export default UserProfile;
