import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";

const Signup = () => {
  const { user, setUser } = useContext(AuthContext);
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      localStorage.setItem("email", data.email);
      localStorage.setItem("token", data.token);
      setUser(data);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password, password_confirmation: passwordConfirmation });
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
    nav('/')
  };

  useEffect(() => {
    if(user){
      nav('/')
    }
  }, [user, nav])

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
      <input
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        placeholder="Confirm Password"
        required
      />
      <button type="submit">Sign Up</button>
      <a href="/login">Login</a>
    </form>
  );
};

export default Signup;
