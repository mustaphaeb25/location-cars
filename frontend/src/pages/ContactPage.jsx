import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'; // Added Alert for feedback
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import axios from 'axios'; // <--- Import axios

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [feedback, setFeedback] = useState({ type: '', message: '' }); // State for user feedback

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => { // <--- Made function async
    e.preventDefault();
    setFeedback({ type: '', message: '' }); // Clear previous feedback

    try {
      const response = await axios.post('http://localhost:3000/api/contact', formData); // <--- API call
      setFeedback({ type: 'success', message: response.data.message });
      console.log('Backend response:', response.data);
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form on success
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setFeedback({
        type: 'danger',
        message: error.response?.data?.error || 'Failed to send message. Please try again.'
      });
    }
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Contact Us</h1>
      <p className="text-center mb-5 text-muted">
        Have questions, feedback, or need assistance? Reach out to us through the form below or using our direct contact details.
      </p>

      <Row className="justify-content-center">
        {/* Contact Form Column */}
        <Col md={7} className="mb-4">
          <Card className="p-4 shadow-sm">
            <h4 className="mb-4">Send us a Message</h4>
            {feedback.message && ( // Display feedback message
              <Alert variant={feedback.type} className="mb-3">
                {feedback.message}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="contactFormName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="contactFormEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="contactFormSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Regarding your inquiry..."
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="contactFormMessage">
                <Form.Label>Your Message</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Type your message here..."
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Send Message
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Contact Info Column */}
        <Col md={5} className="mb-4">
          <Card className="p-4 shadow-sm h-100">
            <h4 className="mb-4">Our Details</h4>
            <ul className="list-unstyled">
              <li className="mb-3">
                <FaMapMarkerAlt className="me-3 fs-5" />
                <address className="d-inline">
                  123 Car Rental Avenue, <br />
                  Suite 100, City, <br />
                  ZIP Code, Country
                </address>
              </li>
              <li className="mb-3">
                <FaPhone className="me-3 fs-5" />
                <a href="tel:+15551234567" className="text-decoration-none text-muted">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="mb-3">
                <FaEnvelope className="me-3 fs-5" />
                <a href="mailto:info@carrental.com" className="text-decoration-none text-muted">
                  info@carrental.com
                </a>
              </li>
              <li className="mb-3">
                <FaClock className="me-3 fs-5" />
                Mon - Fri: 9:00 AM - 6:00 PM <br />
                Sat: 10:00 AM - 3:00 PM <br />
                Sunday: Closed
              </li>
            </ul>

            <h5 className="mt-4 mb-3">Find Us on Map</h5>
            <div style={{ position: 'relative', overflow: 'hidden', paddingTop: '56.25%' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15758.802129596307!2d-7.618645749999999!3d33.57311045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd78107c1b5a2a7f%3A0x7d6b3e6a2c5a2b0!2sCasablanca%2C%20Morocco!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location"
              ></iframe>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;