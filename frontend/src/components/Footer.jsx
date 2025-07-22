import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Logo from '../assets/logo.jpeg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer py-5 mt-auto"> {/* mt-auto pushes footer to bottom */}
      <Container>
        <Row className="g-4">
          {/* Column 1: About Us */}
          <Col md={4} className="text-center text-md-start">
            <h5 className="mb-3">About Us</h5>
            <p className="text-muted">
              Your premier destination for hassle-free car rentals. We offer a wide range of vehicles to suit every need and budget, ensuring a smooth journey every time.
            </p>
            {/* You can add a logo here if you have one */}
              <Link to="/"> {/* Make the logo clickable to go to home */}
                <img
                     src={Logo}
                    alt="Car Rental Logo"
                    className="img-fluid mb-3" // Make it responsive
                    style={{ maxHeight: '60px' }} // Adjust max height as needed
                />
            </Link> 
          </Col>

          {/* Column 2: Quick Links */}
          <Col md={3} className="text-center text-md-start">
            <h5 className="mb-3">Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/" className="text-muted py-1">Home</Nav.Link>
              <Nav.Link as={Link} to="/cars" className="text-muted py-1">Available Cars</Nav.Link>
              <Nav.Link as={Link} to="/my-reservations" className="text-muted py-1">My Reservations</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="text-muted py-1">Contact Us</Nav.Link> {/* <--- Add this link */}
              <Nav.Link as={Link} to="/login" className="text-muted py-1">Login</Nav.Link>
              <Nav.Link as={Link} to="/register" className="text-muted py-1">Register</Nav.Link>
              <Nav.Link as={Link} to="/admin" className="text-muted py-1">Admin Dashboard</Nav.Link>
            </Nav>
          </Col>

          {/* Column 3: Contact Info */}
          <Col md={3} className="text-center text-md-start">
            <h5 className="mb-3">Contact Us</h5>
            <ul className="list-unstyled text-muted">
              <li className="mb-2">
                <FaMapMarkerAlt className="me-2" /> 123 Car Rental St, Azilal, Morocco
              </li>
              <li className="mb-2">
                <FaPhone className="me-2" /> +212 645555555
              </li>
              <li className="mb-2">
                <FaEnvelope className="me-2" /> info@luxdrive.com
              </li>
            </ul>
          </Col>

          {/* Column 4: Follow Us */}
          <Col md={2} className="text-center text-md-start">
            <h5 className="mb-3">Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-start">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted me-3 fs-4 hover-grow">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted me-3 fs-4 hover-grow">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted me-3 fs-4 hover-grow">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted fs-4 hover-grow">
                <FaLinkedinIn />
              </a>
            </div>
          </Col>
        </Row>

        {/* Copyright Section */}
        <Row className="mt-5 pt-4 border-top border-secondary-subtle">
          <Col className="text-center text-muted">
            &copy; {currentYear} Car Rental Platform. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;