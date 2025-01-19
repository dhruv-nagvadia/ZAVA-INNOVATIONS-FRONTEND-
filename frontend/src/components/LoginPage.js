import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [loginType, setLoginType] = useState('user'); // Default to user login
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    try {
      const endpoint =
        loginType === 'user'
          ? 'http://localhost:5000/api/login/user'
          : 'http://localhost:5000/api/login/admin';

      const response = await axios.post(endpoint, formData);

      if (response.data.success) {
        navigate('/home', { state: { loginType } });
      } else {
        setErrorMessage('Wrong email or password');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Unauthorized: Invalid credentials');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
      console.error('Login error:', error);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-page">
      <h1>{loginType === 'user' ? 'User Login' : 'Admin Login'}</h1>
      <div className="login-toggle">
        <button
          className={loginType === 'user' ? 'active' : ''}
          onClick={() => setLoginType('user')}
        >
          User Login
        </button>
        <button
          className={loginType === 'admin' ? 'active' : ''}
          onClick={() => setLoginType('admin')}
        >
          Admin Login
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">
          {loginType === 'user' ? 'Login as User' : 'Login as Admin'}
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {loginType === 'user' && (
        <div className="register-link">
          <p>
            Don't have an account?{' '}
            <button onClick={handleRegisterRedirect}>Register here</button>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
