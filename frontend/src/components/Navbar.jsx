// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
// import { useAuth } from '../contexts/AuthContext';
// import { useTheme } from '../contexts/ThemeContext';
// import ToggleButton from './ToggleButton';
// import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
// import './Navbar.css';

// const Navbar = () => {
//   const { isAuthenticated, isAdmin, logout } = useAuth();
//   const { darkMode, toggleTheme } = useTheme();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <BootstrapNavbar expand="lg" className={`luxdrive-navbar ${darkMode ? 'dark-mode' : 'light-mode'}`} sticky="top">
//       <Container fluid="xxl">
//         <BootstrapNavbar.Brand as={Link} to="/" className="navbar-brand">
//           <span className="brand-text">LuxDrive</span>
//         </BootstrapNavbar.Brand>

//         <BootstrapNavbar.Toggle
//           aria-controls="basic-navbar-nav"
//           className="navbar-toggler"
//           aria-label="Toggle navigation"
//         />

//         <BootstrapNavbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link as={Link} to="/" className="nav-link" activeClassName="active" exact>Home</Nav.Link>
//             <Nav.Link as={Link} to="/cars" className="nav-link" activeClassName="active">Cars</Nav.Link>
//             <Nav.Link as={Link} to="/about" className="nav-link" activeClassName="active">About Us</Nav.Link>
//             <Nav.Link as={Link} to="/faqs" className="nav-link" activeClassName="active">FAQs</Nav.Link>
//             {/* <Nav.Link as={Link} to="/blog" className="nav-link" activeClassName="active">Blog</Nav.Link> */}
//             <Nav.Link as={Link} to="/contact" className="nav-link" activeClassName="active">Contact Us</Nav.Link>
//             {isAuthenticated && (
//               <Nav.Link as={Link} to="/my-reservations" className="nav-link" activeClassName="active">My Reservations</Nav.Link>
//             )}
//             {isAdmin && (
//               <Nav.Link as={Link} to="/admin" className="nav-link" activeClassName="active">Admin Dashboard</Nav.Link>
//             )}
//           </Nav>


            
//           <div className="theme-toggle d-flex align-items-center">
//             {darkMode ? (
//               <MdOutlineDarkMode size={20} className="theme-icon me-2" />
//             ) : (
//               <MdOutlineLightMode size={20} className="theme-icon me-2" />
//             )}
//             <ToggleButton
//               label={darkMode ? "Dark Mode" : "Light Mode"}
//               checked={darkMode}
//               onChange={toggleTheme}
//               aria-label={`Toggle ${darkMode ? "light" : "dark"} mode`}
//             />
//           </div>
//           {isAuthenticated ? (
//             <Button
//               variant="outline-danger"
//               onClick={handleLogout}
//               className="logout-btn ms-2"
//             >
//               Logout
//             </Button>
//           ) : (
//             <div className="auth-buttons d-flex ms-3">
//               <Button
//                 as={Link}
//                 to="/login"
//                 variant="outline-primary"
//                 className="login-btn"
//               >
//                 Login
//               </Button>
//               <Button
//                 as={Link}
//                 to="/register"
//                 variant="primary"
//                 className="register-btn ms-2"
//               >
//                 Register
//               </Button>
//             </div>
//           )}
       
//       </BootstrapNavbar.Collapse>
//     </Container>
//     </BootstrapNavbar >
//   );
// };

// export default Navbar;

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
<<<<<<< HEAD
import { MdOutlineLightMode, MdOutlineDarkMode, MdAccountCircle, MdDirectionsCar, MdHelpOutline, MdContacts, MdHome } from 'react-icons/md';
import { FiLogOut, FiLogIn, FiUserPlus } from 'react-icons/fi';
import { RiAdminLine } from 'react-icons/ri';
import { BsCalendarCheck } from 'react-icons/bs';
=======
import ToggleButton from './ToggleButton';
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
>>>>>>> 501744de934533a45971193d0c974f2265742b3c
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <BootstrapNavbar expand="lg" className={`luxdrive-navbar ${darkMode ? 'dark-mode' : 'light-mode'}`} sticky="top">
      <Container fluid="xxl">
        <BootstrapNavbar.Brand as={Link} to="/" className="navbar-brand">
<<<<<<< HEAD
          <span className="brand-logo">
            <MdDirectionsCar className="logo-icon" />
            <span className="brand-text">LuxDrive</span>
          </span>
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle
          aria-controls="luxdrive-navbar"
          className="navbar-toggler"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </BootstrapNavbar.Toggle>

        <BootstrapNavbar.Collapse id="luxdrive-navbar">
          <Nav className="mx-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              <MdHome className="nav-icon" />
              <span className="nav-text">Home</span>
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/cars" 
              className={`nav-link ${isActive('/cars') ? 'active' : ''}`}
            >
              <MdDirectionsCar className="nav-icon" />
              <span className="nav-text">Our Fleet</span>
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            >
              <MdHelpOutline className="nav-icon" />
              <span className="nav-text">About</span>
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/faqs" 
              className={`nav-link ${isActive('/faqs') ? 'active' : ''}`}
            >
              <MdHelpOutline className="nav-icon" />
              <span className="nav-text">FAQs</span>
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/contact" 
              className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
            >
              <MdContacts className="nav-icon" />
              <span className="nav-text">Contact</span>
            </Nav.Link>
          </Nav>

          <div className="navbar-right">
            <div className="theme-toggle" onClick={toggleTheme}>
              {darkMode ? (
                <MdOutlineDarkMode size={22} className="theme-icon" />
              ) : (
                <MdOutlineLightMode size={22} className="theme-icon" />
              )}
            </div>

            {isAuthenticated ? (
              <Dropdown align="end">
                <Dropdown.Toggle as={Button} variant="link" className="user-dropdown">
                  <MdAccountCircle size={24} className="user-icon" />
                  <span className="user-name">{user?.name || 'Account'}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu">
                  <Dropdown.Item 
                    as={Link} 
                    to="/my-reservations" 
                    className={`dropdown-item ${isActive('/my-reservations') ? 'active' : ''}`}
                  >
                    <BsCalendarCheck className="dropdown-icon" />
                    My Reservations
                  </Dropdown.Item>
                  
                  {isAdmin && (
                    <Dropdown.Item 
                      as={Link} 
                      to="/admin" 
                      className={`dropdown-item ${isActive('/admin') ? 'active' : ''}`}
                    >
                      <RiAdminLine className="dropdown-icon" />
                      Admin Dashboard
                    </Dropdown.Item>
                  )}
                  
                  <Dropdown.Divider />
                  
                  <Dropdown.Item onClick={handleLogout} className="dropdown-item">
                    <FiLogOut className="dropdown-icon" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="auth-buttons">
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-primary"
                  className="login-btn"
                >
                  <FiLogIn className="btn-icon" />
                  <span>Login</span>
                </Button>
                <Button
                  as={Link}
                  to="/register"
                  variant="primary"
                  className="register-btn"
                >
                  <FiUserPlus className="btn-icon" />
                  <span>Register</span>
                </Button>
              </div>
            )}
          </div>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
=======
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
>>>>>>> 501744de934533a45971193d0c974f2265742b3c
  );
};

export default Navbar;