import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginType } = location.state || {}; // Check login type from location state

  // Handle Add Event Button Click
  const handleAddEvent = () => {
    navigate('/addeventpage'); // Redirect to AddEventPage
  };

  const handleLogout = () => {
    navigate('/home'); 
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="Website Logo" />
        <h1>ZAVA</h1>
      </div>
      <nav>
        {loginType === 'admin' ? (
          <ul className="nav-links">
            <li>
              <button onClick={handleAddEvent} className="nav-button">
                Add Event
              </button>
            </li>
            <li>
              <button onClick={handleLogout} className="nav-button">
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
