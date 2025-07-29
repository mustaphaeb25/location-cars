// import React from 'react';
// import { Container, Row, Col, Nav } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
// import Logo from '../assets/logo.jpeg';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="footer py-5 mt-auto"> {/* mt-auto pushes footer to bottom */}
//       <Container>
//         <Row className="g-4">
//           {/* Column 1: About Us */}
//           <Col md={4} className="text-center text-md-start">
//             <h5 className="mb-3">About Us</h5>
//             <p className="text-muted">
//               Your premier destination for hassle-free car rentals. We offer a wide range of vehicles to suit every need and budget, ensuring a smooth journey every time.
//             </p>
//             {/* You can add a logo here if you have one */}
//               <Link to="/"> {/* Make the logo clickable to go to home */}
//                 <img
//                      src={Logo}
//                     alt="Car Rental Logo"
//                     className="img-fluid mb-3" // Make it responsive
//                     style={{ maxHeight: '60px' }} // Adjust max height as needed
//                 />
//             </Link> 
//           </Col>

//           {/* Column 2: Quick Links */}
//           <Col md={3} className="text-center text-md-start">
//             <h5 className="mb-3">Quick Links</h5>
//             <Nav className="flex-column">
//               <Nav.Link as={Link} to="/" className="text-muted py-1">Home</Nav.Link>
//               <Nav.Link as={Link} to="/cars" className="text-muted py-1"> Cars</Nav.Link>
//               <Nav.Link as={Link} to="/contact" className="text-muted py-1">Contact Us</Nav.Link>
//               <Link to="/blog" className="text-white text-decoration-none">Blog</Link>
//               <Link to="/faqs" className="text-muted py-1">FAQs</Link> 
//               <Nav.Link as={Link} to="/login" className="text-muted py-1">Login</Nav.Link>
//               <Nav.Link as={Link} to="/register" className="text-muted py-1">Register</Nav.Link>
//             </Nav>
//           </Col>

//           {/* Column 3: Contact Info */}
//           <Col md={3} className="text-center text-md-start">
//             <h5 className="mb-3">Contact Us</h5>
//             <ul className="list-unstyled text-muted">
//               <li className="mb-2">
//                 <FaMapMarkerAlt className="me-2" /> 123 Car Rental St, Azilal, Morocco
//               </li>
//               <li className="mb-2">
//                 <FaPhone className="me-2" /> +212 645555555
//               </li>
//               <li className="mb-2">
//                 <FaEnvelope className="me-2" /> info@luxdrive.com
//               </li>
//             </ul>
//           </Col>

//           {/* Column 4: Follow Us */}
//           <Col md={2} className="text-center text-md-start">
//             <h5 className="mb-3">Follow Us</h5>
//             <div className="d-flex justify-content-center justify-content-md-start">
//               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted me-3 fs-4 hover-grow">
//                 <FaFacebookF />
//               </a>
//               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted me-3 fs-4 hover-grow">
//                 <FaTwitter />
//               </a>
//               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted me-3 fs-4 hover-grow">
//                 <FaInstagram />
//               </a>
//               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted fs-4 hover-grow">
//                 <FaLinkedinIn />
//               </a>
//             </div>
//           </Col>
//         </Row>

//         {/* Copyright Section */}
//         <Row className="mt-5 pt-4 border-top border-secondary-subtle">
//           <Col className="text-center text-muted">
//             &copy; {currentYear} Car Rental Platform. All rights reserved.
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';


const Footer = () => {
  const { darkMode } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();

  // Mock logo - replace with your actual logo
  const Logo = () => (
    <div className="footer-logo">
      <div className="logo-icon">
        <FaMapMarkerAlt />
      </div>
      <div className="logo-text">
        <span>LUX</span>DRIVE
      </div>
    </div>
  );

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={`footer ${darkMode ? 'dark-mode' : ''}`}>
      <Container>
        <Row className="g-4">
          {/* Column 1: About Us */}
          <Col lg={4} md={6} className="footer-column">
            <div className="footer-about">
              <Logo />
              <p className="footer-about-text">
                Your premier destination for hassle-free luxury car rentals. 
                We offer a curated selection of premium vehicles to elevate every journey.
              </p>
              <div className="footer-newsletter">
                <h5>Subscribe to Newsletter</h5>
                <div className="newsletter-form">
                  <input type="email" placeholder="Your email address" />
                  <button type="submit">
                    <FaEnvelope />
                  </button>
                </div>
              </div>
            </div>
          </Col>

          {/* Column 2: Quick Links */}
          <Col lg={2} md={6} className="footer-column">
            <h5 className="footer-heading">Quick Links</h5>
            <Nav className="flex-column footer-links">
              <Nav.Link as={Link} to="/" className="footer-link">Home</Nav.Link>
              <Nav.Link as={Link} to="/cars" className="footer-link">Our Fleet</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="footer-link">Contact Us</Nav.Link>
              <Nav.Link as={Link} to="/blog" className="footer-link">Blog</Nav.Link>
              <Nav.Link as={Link} to="/faqs" className="footer-link">FAQs</Nav.Link>
              
            </Nav>
          </Col>

          {/* Column 3: Contact Info */}
          <Col lg={3} md={6} className="footer-column">
            <h5 className="footer-heading">Contact Us</h5>
            <ul className="footer-contact">
              <li className="contact-item">
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="contact-details">
                  <h6>Our Location</h6>
                  <p>123 Luxury Drive, Azilal, Morocco</p>
                </div>
              </li>
              <li className="contact-item">
                <div className="contact-icon">
                  <FaPhone />
                </div>
                <div className="contact-details">
                  <h6>Phone</h6>
                  <p>+212 645 555 555</p>
                </div>
              </li>
              <li className="contact-item">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div className="contact-details">
                  <h6>Email</h6>
                  <p>info@luxdrive.com</p>
                </div>
              </li>
            </ul>
          </Col>

          {/* Column 4: Follow Us */}
          <Col lg={3} md={6} className="footer-column">
            <h5 className="footer-heading">Follow Us</h5>
            <p className="footer-social-text">Stay connected with our latest updates</p>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedinIn />
              </a>
            </div>
            
            <div className="footer-payment">
              <h5 className="footer-heading">Payment Methods</h5>
              <div className="payment-methods">
                <div className="payment-icon">Visa</div>
                <div className="payment-icon">MasterCard</div>
                <div className="payment-icon">PayPal</div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      
      <div className="footer-bottom">
        <Container>
          <Row>
            <Col className="text-center">
              <p className="footer-copyright">
                &copy; {currentYear} <span>LUXDRIVE</span>. All rights reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      
      {showScrollTop && (
        <button className="scroll-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;