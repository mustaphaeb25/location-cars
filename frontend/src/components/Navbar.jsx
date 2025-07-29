import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import ToggleButton from './ToggleButton';
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BootstrapNavbar expand="lg" className={`luxdrive-navbar ${darkMode ? 'dark-mode' : 'light-mode'}`} sticky="top">
      <Container fluid="xxl">
        <BootstrapNavbar.Brand as={Link} to="/" className="navbar-brand">
          <span className="brand-text">LuxDrive</span>
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle
          aria-controls="basic-navbar-nav"
          className="navbar-toggler"
          aria-label="Toggle navigation"
        />

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-link" activeClassName="active" exact>Home</Nav.Link>
            <Nav.Link as={Link} to="/cars" className="nav-link" activeClassName="active">Cars</Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link" activeClassName="active">About Us</Nav.Link>
            <Nav.Link as={Link} to="/faqs" className="nav-link" activeClassName="active">FAQs</Nav.Link>
            {/* <Nav.Link as={Link} to="/blog" className="nav-link" activeClassName="active">Blog</Nav.Link> */}
            <Nav.Link as={Link} to="/contact" className="nav-link" activeClassName="active">Contact Us</Nav.Link>
            {isAuthenticated && (
              <Nav.Link as={Link} to="/my-reservations" className="nav-link" activeClassName="active">My Reservations</Nav.Link>
            )}
            {isAdmin && (
              <Nav.Link as={Link} to="/admin" className="nav-link" activeClassName="active">Admin Dashboard</Nav.Link>
            )}
          </Nav>


            
          <div className="theme-toggle d-flex align-items-center">
            {darkMode ? (
              <MdOutlineDarkMode size={20} className="theme-icon me-2" />
            ) : (
              <MdOutlineLightMode size={20} className="theme-icon me-2" />
            )}
            <ToggleButton
              label={darkMode ? "Dark Mode" : "Light Mode"}
              checked={darkMode}
              onChange={toggleTheme}
              aria-label={`Toggle ${darkMode ? "light" : "dark"} mode`}
            />
          </div>
          {isAuthenticated ? (
            <Button
              variant="outline-danger"
              onClick={handleLogout}
              className="logout-btn ms-2"
            >
              Logout
            </Button>
          ) : (
            <div className="auth-buttons d-flex ms-3">
              <Button
                as={Link}
                to="/login"
                variant="outline-primary"
                className="login-btn"
              >
                Login
              </Button>
              <Button
                as={Link}
                to="/register"
                variant="primary"
                className="register-btn ms-2"
              >
                Register
              </Button>
            </div>
          )}
       
      </BootstrapNavbar.Collapse>
    </Container>
    </BootstrapNavbar >
  );
};

export default Navbar;