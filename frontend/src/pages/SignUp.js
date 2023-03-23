import React, { useState } from 'react';
import { signup } from '../services/UserService';
import './SignUp.css';

const Signup = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      const response = await signup({ email, password });
      localStorage.setItem('token',response.token)
      localStorage.setItem('userId',response.userId)
      setIsLoggedIn(true)
      setEmail(response.email);
      setError('');
      window.location.reload();
    } catch (error) {
      setError('Username already taken');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign up</h2>
      {error && <p className="error">{error}</p>}
      <form>
        <label>
          E-mail:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit" onClick={handleSignup}>Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
