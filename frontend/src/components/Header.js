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
    <header 
  className="header"
  style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)',padding:"25px" }}
>
  <div className="logo">
    <img src="https://media.istockphoto.com/id/1324569050/vector/z-letter-liner-logo-design.jpg?s=612x612&w=0&k=20&c=OK89QZJ90zvKhFkB0lYGnpRBtXcf4Y067pY_xMGXwr8="  style={{borderRadius:13,height:"40px",width:"auto"}}alt="Website Logo" />
  </div>
  <nav>
    {loginType === 'admin' ? (
      <ul style={{ display: "flex", gap: "20px", listStyle: "none", margin: 0, padding: 0 }}>
      <li>
        <a
          href="#"
          onClick={handleAddEvent}
          style={{
            textDecoration: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "white",
            padding: "10px 20px",
            borderRadius: "6px",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          Add Event
        </a>
      </li>
      <li>
        <a
          href="#"
          onClick={handleLogout}
          style={{
            textDecoration: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "white",
            padding: "10px 20px",
            borderRadius: "6px",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          Logout
        </a>
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
