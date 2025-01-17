import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Use o useEffect para verificar se o usuário já está logado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Se o token existir, redireciona para o dashboard
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed, please try again');
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2 className="heading">Login</h2>
        <form onSubmit={handleLogin} className="form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="input"
          />
          <button type="submit" className="button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
