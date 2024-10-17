import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../api/auth';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const mutation = useMutation({
      mutationFn: loginUser,
      onSuccess: (data) => {
          onLoginSuccess(data); // Call onLoginSuccess with user data
      },
      onError: (error) => {
          alert(error.message); // Show error message
      },
  });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ email, password }); // Trigger login mutation
    };

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
                {mutation.isLoading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
};

export default Login;
