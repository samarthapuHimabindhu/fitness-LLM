import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure this is imported
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('username', res.data.username);
        onLogin(); // Call the onLogin function passed as a prop
        navigate('/videos'); // Navigate to videos page
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Error during login');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <button onClick={() => navigate('/signup')}>Sign Up</button>
      </p>
    </div>
  );
};

export default LoginPage;
