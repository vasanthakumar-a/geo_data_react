import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
    localStorage.setItem("email", email);
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if(user){
      nav('/')
    }
  }, [user])

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
