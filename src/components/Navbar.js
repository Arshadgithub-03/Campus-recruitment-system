// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/login'); // Redirect to login page
  };
  
  const isLoggedIn = localStorage.getItem('token');
  const userType = localStorage.getItem('userType'); // Could be 'student', 'recruiter', 'admin'

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Campus Recruitment</Link>
        
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          {!isLoggedIn ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          ) : (
            <>
              {userType === 'student' && <li><Link to="/student-dashboard">Dashboard</Link></li>}
              {userType === 'recruiter' && <li><Link to="/recruiter-dashboard">Dashboard</Link></li>}
              {userType === 'admin' && <li><Link to="/admin-dashboard">Dashboard</Link></li>}
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
