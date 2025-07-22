import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import ToggleButton from './ToggleButton';
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import logo from '../assets/logo.jpeg';

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BootstrapNavbar expand="lg" className={darkMode ? 'bg-dark navbar-dark' : 'bg-light navbar-light'} sticky="top">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/"><img src={logo} alt="Logo" height="30" />LuxDrive</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/cars">Cars</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
            {isAuthenticated && (
              <Nav.Link as={Link} to="/my-reservations">My Reservations</Nav.Link>
            )}
            {isAdmin && (
              <Nav.Link as={Link} to="/admin">Admin Dashboard</Nav.Link>
            )}
          </Nav>
          <Nav>
            <Nav.Item className="d-flex align-items-center me-3">
              {darkMode ? <MdOutlineDarkMode size={20} className="me-2" /> : <MdOutlineLightMode size={20} className="me-2" />}
              <ToggleButton
                label={darkMode ? "Dark Mode" : "Light Mode"}
                checked={darkMode}
                onChange={toggleTheme}
              />
            </Nav.Item>
            {isAuthenticated ? (
              <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
            ) : (
              <>
                <Button as={Link} to="/login" variant="outline-primary" className="me-2">Login</Button>
                <Button as={Link} to="/register" variant="primary">Register</Button>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;