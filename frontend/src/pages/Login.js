import React, { useState } from "react";
import "./Login.css";
import { login } from "../services/UserService";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login({ email, password });
      
      localStorage.setItem('token',response.token)
      localStorage.setItem('userId', response.userId)
      setIsLoggedIn(true);
      setError('');
      window.location.reload();
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-card">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <label>
        Username:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;