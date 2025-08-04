// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
// import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
// import { sendContactMessage } from '../services/api';

// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });
//   const [feedback, setFeedback] = useState({ type: '', message: '' });
//   const [validationError, setValidationError] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     // Clear specific validation error when user types
//     if (validationError && (e.target.name === 'email' || e.target.name === 'name' || e.target.name === 'subject' || e.target.name === 'message')) {
//       setValidationError('');
//     }
//   };

//   const validateEmail = (email) => {
//     return /\S+@\S+\.\S+/.test(email);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFeedback({ type: '', message: '' }); // Clear previous feedback
//     setValidationError(''); // Clear previous validation errors

//     // --- NEW: Frontend Validation ---
//     if (!formData.name || !formData.email || !formData.subject || !formData.message) {
//       setValidationError('All fields are required.');
//       return; // Stop submission
//     }
//     if (!validateEmail(formData.email)) {
//       setValidationError('Please enter a valid email address.');
//       return; // Stop submission
//     }
//     // --- END NEW Frontend Validation ---

//     setFeedback({ type: 'loading', message: 'Sending message...' });

//     try {
//       const response = await sendContactMessage(formData);
//       setFeedback({
//         type: 'success',
//         message: response.data.message || 'Message sent successfully!'
//       });
//       setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form on success
//     } catch (error) {
//       console.error('Error submitting contact form:', error);
//       setFeedback({
//         type: 'danger',
//         message: error.response?.data?.error ||
//                 'Failed to send message. Please try again later.'
//       });
//     }
//   };

//   return (
//     <Container className="my-5 fade-in">
//       <Row className="justify-content-center">
//         <Col md={10} lg={8}>
//           <h2 className="text-center mb-4">Contact Us</h2>
//           {feedback.message && <Alert variant={feedback.type === 'loading' ? 'info' : feedback.type}>{feedback.message}</Alert>}
//           {validationError && <Alert variant="warning">{validationError}</Alert>}

//           <Card className="p-4 shadow-sm">
//             <Row>
//               <Col md={6}>
//                 <h4 className="mb-3">Send us a Message</h4>
//                 <Form onSubmit={handleSubmit}>
//                   <Form.Group controlId="formName" className="mb-3">
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                     />
//                   </Form.Group>

//                   <Form.Group controlId="formEmail" className="mb-3">
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                     />
//                   </Form.Group>

//                   <Form.Group controlId="formSubject" className="mb-3">
//                     <Form.Label>Subject</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="subject"
//                       value={formData.subject}
//                       onChange={handleChange}
//                       required // Added required based on backend check
//                     />
//                   </Form.Group>

//                   <Form.Group controlId="formMessage" className="mb-3">
//                     <Form.Label>Message</Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       name="message"
//                       rows={5}
//                       value={formData.message}
//                       onChange={handleChange}
//                       required
//                     />
//                   </Form.Group>

//                   <Button variant="primary" type="submit" disabled={feedback.type === 'loading'}>
//                     {feedback.type === 'loading' ? 'Sending...' : 'Send Message'}
//                   </Button>
//                 </Form>
//               </Col>
//               <Col md={6}>
//                 <h4 className="mb-3">Contact Information</h4>
//                 <ul className="list-unstyled">
//                   <li className="mb-3">
//                     <FaMapMarkerAlt className="me-3 fs-5" />
//                     123 Car Rental St, City, Country
//                   </li>
//                   <li className="mb-3">
//                     <FaPhone className="me-3 fs-5" />
//                     <a href="tel:+123456789" className="text-decoration-none text-muted">
//                       +123 456 789
//                     </a>
//                   </li>
//                   <li className="mb-3">
//                     <FaEnvelope className="me-3 fs-5" />
//                     <a href="mailto:info@carrental.com" className="text-decoration-none text-muted">
//                       info@carrental.com
//                     </a>
//                   </li>
//                   <li className="mb-3">
//                     <FaClock className="me-3 fs-5" />
//                     Mon - Fri: 9:00 AM - 6:00 PM <br />
//                     Sat: 10:00 AM - 3:00 PM <br />
//                     Sunday: Closed
//                   </li>
//                 </ul>

//                 <h5 className="mt-4 mb-3">Find Us on Map</h5>
//                 <div style={{ position: 'relative', overflow: 'hidden', paddingTop: '56.25%' }}>
//                   <iframe
//                     // --- YOU MUST REPLACE THIS SRC WITH A VALID GOOGLE MAPS EMBED URL ---
//                     src="YOUR_CORRECT_Maps_EMBED_URL_HERE"
//                     width="100%"
//                     height="100%"
//                     style={{ position: 'absolute', top: 0, left: 0, border: 0 }}
//                     allowFullScreen=""
//                     loading="lazy"
//                     title="Our Location"
//                   ></iframe>
//                 </div>
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default ContactPage;

import React, { useState, useEffect } from 'react';
// --- FIX: Added InputGroup to the import ---
import { Container, Row, Col, Form, Button, Card, Alert, InputGroup } from 'react-bootstrap';
// --- END FIX ---
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane, FaUser, FaTag } from 'react-icons/fa';
import { sendContactMessage } from '../services/api';
import { useTheme } from '../contexts/ThemeContext';


const ContactPage = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Add animation on mount
    // Ensure Animate.css is linked in your public/index.html or imported globally
    const contactCard = document.querySelector('.contact-card');
    if (contactCard) {
      setTimeout(() => {
        contactCard.classList.add('animate__fadeInUp');
      }, 100);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (validationError) setValidationError(''); // Clear validation error on input change
    if (feedback.message) setFeedback({ type: '', message: '' }); // Clear feedback on input change
  };

  const validateEmail = (email) => {
    // A more robust email regex could be used if needed
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });
    setValidationError('');
    setIsSubmitting(true);

    // --- Form Validation ---
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setValidationError('All fields are required.');
      setIsSubmitting(false);
      return;
    }
    if (!validateEmail(formData.email)) {
      setValidationError('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }
    // --- End Form Validation ---

    try {
      const response = await sendContactMessage(formData);
      setFeedback({
        type: 'success',
        message: response.data.message || 'Message sent successfully!'
      });
      // Clear form on successful submission
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setFeedback({
        type: 'danger',
        message: error.response?.data?.error ||
          'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`contact-page py-5 ${darkMode ? 'dark-mode' : ''}`}> {/* Added py-5 for top/bottom padding */}
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="text-center mb-5">
              <h2 className="contact-title fw-bold">Contact Us</h2> {/* Added fw-bold */}
              <p className="contact-subtitle lead">We'd love to hear from you! Reach out anytime.</p> {/* Added lead class */}
            </div>

            <Card className="contact-card animate__animated shadow-lg"> {/* Added shadow-lg for visual depth */}
              <Card.Body className="p-4 p-md-5">
                <Row className="g-4"> {/* Use g-4 for consistent gutter spacing */}
                  <Col md={6}>
                    <div className="contact-info h-100 p-4 p-md-0"> {/* Adjusted padding */}
                      <div className="text-center mb-4">
                        <div className="contact-icon mb-3">
                          <FaEnvelope aria-hidden="true" /> {/* Accessibility: Decorative icon */}
                        </div>
                        <h3 className="fw-bold">Get in Touch</h3> {/* Added fw-bold */}
                        <p className="text-muted">Our team is ready to assist you</p>
                      </div>

                      <ul className="contact-details list-unstyled"> {/* list-unstyled to remove default list styling */}
                        <li>
                          <FaMapMarkerAlt aria-hidden="true" className="me-3 contact-detail-icon" />
                          <div>
                            <h5 className="mb-0">Our Location</h5>
                            <p className="text-muted">123 Car Rental St, City, Country</p>
                          </div>
                        </li>
                        <li>
                          <FaPhone aria-hidden="true" className="me-3 contact-detail-icon" />
                          <div>
                            <h5 className="mb-0">Call Us</h5>
                            <p><a href="tel:+123456789" className={darkMode ? 'text-light' : 'text-primary'}>+123 456 789</a></p> {/* Ensure link color adjusts for dark mode */}
                          </div>
                        </li>
                        <li>
                          <FaEnvelope aria-hidden="true" className="me-3 contact-detail-icon" />
                          <div>
                            <h5 className="mb-0">Email Us</h5>
                            <p><a href="mailto:info@carrental.com" className={darkMode ? 'text-light' : 'text-primary'}>info@carrental.com</a></p> {/* Ensure link color adjusts for dark mode */}
                          </div>
                        </li>
                        <li>
                          <FaClock aria-hidden="true" className="me-3 contact-detail-icon" />
                          <div>
                            <h5 className="mb-0">Working Hours</h5>
                            <p className="text-muted mb-0">Mon-Fri: 9AM - 6PM</p>
                            <p className="text-muted mb-0">Sat: 10AM - 3PM</p>
                            <p className="text-muted">Sunday: Closed</p> {/* Removed mb-0 on last line */}
                          </div>
                        </li>
                      </ul>

                      <div className="mt-4">
                        <h5 className="mb-3 fw-bold">Find Us on Map</h5>
                        <div className="map-container rounded overflow-hidden shadow-sm"> {/* Added rounded and overflow-hidden */}
                          <iframe
                            // Replace this src with the actual URL copied from Google Maps
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15758.802129596307!2d-7.618645749999999!3d33.57311045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd78107c1b5a2a7f%3A0x7d6b3e6a2c5a2b0!2sCasablanca%2C%20Morocco!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma"

                            width="100%"
                            height="100%"
                            style={{ position: 'absolute', top: 0, left: 0, border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Our Location"
                          ></iframe>
                          <div className="map-placeholder d-flex align-items-center justify-content-center text-center">
                            <div className="map-overlay p-3">
                              <p className="mb-0 text-white fw-bold">Interactive Map Location Coming Soon!</p> {/* Clearer text */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="contact-form h-100">
                      <h3 className="mb-4 fw-bold">Send us a Message</h3>

                      {feedback.message && (
                        <Alert variant={feedback.type} className="contact-alert fade show" role="alert"> {/* Added role="alert" */}
                          {feedback.message}
                        </Alert>
                      )}

                      {validationError && (
                        <Alert variant="warning" className="contact-alert fade show" role="alert"> {/* Added role="alert" */}
                          {validationError}
                        </Alert>
                      )}

                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-4" controlId="contactFormName"> {/* Added controlId */}
                          <InputGroup>
                            <InputGroup.Text><FaUser aria-hidden="true" /></InputGroup.Text>
                            <Form.Control
                              type="text"
                              name="name"
                              placeholder="Your Name"
                              value={formData.name}
                              onChange={handleChange}
                              className="form-control-lg"
                              aria-label="Your Name" // Accessibility: Explicit label for screen readers
                            />
                          </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="contactFormEmail">
                          <InputGroup>
                            <InputGroup.Text><FaEnvelope aria-hidden="true" /></InputGroup.Text>
                            <Form.Control
                              type="email"
                              name="email"
                              placeholder="Your Email"
                              value={formData.email}
                              onChange={handleChange}
                              className="form-control-lg"
                              aria-label="Your Email"
                            />
                          </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="contactFormSubject">
                          <InputGroup>
                            <InputGroup.Text><FaTag aria-hidden="true" /></InputGroup.Text>
                            <Form.Control
                              type="text"
                              name="subject"
                              placeholder="Subject"
                              value={formData.subject}
                              onChange={handleChange}
                              className="form-control-lg"
                              aria-label="Subject of your message"
                            />
                          </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="contactFormMessage">
                          <Form.Control
                            as="textarea"
                            name="message"
                            rows={6}
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            className="form-control-lg"
                            aria-label="Your message"
                          />
                        </Form.Group>

                        <Button
                          variant="primary"
                          type="submit"
                          className="w-100 submit-btn py-3 fw-bold" // Added py-3 and fw-bold for larger, bolder button
                          disabled={isSubmitting}
                          aria-label={isSubmitting ? "Sending message..." : "Send Message"} // Accessibility: Dynamic label
                        >
                          {isSubmitting ? (
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          ) : (
                            <>
                              <FaPaperPlane className="me-2" aria-hidden="true" /> Send Message
                            </>
                          )}
                        </Button>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactPage;