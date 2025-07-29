// import React from 'react';
// import { Container, Row, Col, Image, Card } from 'react-bootstrap';
// import { FaCar, FaUsers, FaHandshake, FaGlobe } from 'react-icons/fa'; // Icons for values/mission
// import teamMeetingImg from '../assets/Vehicle.jpeg';
// import customerServiceImg from '../assets/car.jpeg';

// const AboutUsPage = () => {
//     return (
//         <Container className="my-5 fade-in">
//             <h1 className="text-center mb-4">About LuxDrive Car Rental</h1>
//             <p className="lead text-center mb-5 text-muted">
//                 Your trusted partner for hassle-free and reliable car rentals.
//             </p>

//             {/* Company Story Section */}
//             <Row className="mb-5 align-items-center">
//                 <Col md={6}>
//                     <h2 className="mb-3">Our Story</h2>
//                     <p>
//                         Founded in [Year], LuxDrive Car Rental began with a simple vision: to provide a seamless and enjoyable car rental experience for everyone, from daily commuters to adventurous travelers. We started with a small fleet and a big dream, growing steadily by focusing on customer satisfaction and quality service.
//                     </p>
//                     <p>
//                         Over the years, we've expanded our fleet, embraced technology, and built a team passionate about helping you explore the world, one journey at a time. We believe that renting a car should be as exciting and stress-free as the destination itself.
//                     </p>
//                 </Col>
//                 <Col md={6} className="text-center">
//                     {/* Replace with an actual image of your team, office, or a symbolic image */}
//                     <Image
//                         src={teamMeetingImg}
//                         alt="Our team meeting"
//                         fluid
//                         rounded
//                         className="shadow-lg"
//                         width={240}
//                         height={240}
//                     />
//                 </Col>
//             </Row>

//             {/* Our Mission and Values Section */}
//             <div className="bg-light py-5 mb-5 rounded">
//                 <Container>
//                     <h2 className="text-center mb-5">Our Mission & Values</h2>
//                     <Row className="text-center g-4">
//                         <Col md={4}>
//                             <Card className="h-100 p-3 shadow-sm hover-grow">
//                                 <Card.Body>
//                                     <FaGlobe size={50} className="text-primary mb-3" />
//                                     <Card.Title>Seamless Journeys</Card.Title>
//                                     <Card.Text>
//                                         To provide reliable, high-quality vehicles and exceptional service that make every journey effortless and memorable.
//                                     </Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         <Col md={4}>
//                             <Card className="h-100 p-3 shadow-sm hover-grow">
//                                 <Card.Body>
//                                     <FaHandshake size={50} className="text-success mb-3" />
//                                     <Card.Title>Customer First</Card.Title>
//                                     <Card.Text>
//                                         We prioritize our customers' needs, ensuring transparency, fairness, and a personalized experience every step of the the way.
//                                     </Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         <Col md={4}>
//                             <Card className="h-100 p-3 shadow-sm hover-grow">
//                                 <Card.Body>
//                                     <FaCar size={50} className="text-info mb-3" />
//                                     <Card.Title>Quality & Safety</Card.Title>
//                                     <Card.Text>
//                                         Maintaining a modern, diverse fleet and adhering to the highest standards of vehicle maintenance and safety checks.
//                                     </Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>

//             {/* Why Choose Us (reiteration or focus on unique selling points) */}
//             <Row className="mb-5 align-items-center">
//                 <Col md={6} className="text-center">
//                     {/* Replace with an image representing quality, service, or a diverse fleet */}
//                     <Image
//                         src={customerServiceImg}
//                         alt="Customer service"
//                         fluid
//                         rounded
//                         className="shadow-lg"
//                     />
//                 </Col>
//                 <Col md={6}>
//                     <h2 className="mb-3">Why Choose LuxDrive?</h2>
//                     <p>
//                         At LuxDrive, we don't just rent cars; we provide solutions for your mobility needs. With transparent pricing, flexible booking options, and a commitment to cleanliness and maintenance, we ensure you can hit the road with confidence. Our diverse fleet caters to all preferences, from compact cars for city adventures to spacious SUVs for family trips.
//                     </p>
//                     <p>
//                         Experience the difference with a team that cares about your journey as much as you do.
//                     </p>
//                 </Col>
//             </Row>

//         </Container>
//     );
// };

// export default AboutUsPage;

import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaCar, FaUsers, FaHandshake, FaGlobe, FaStar, FaTrophy, FaShieldAlt } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';


const AboutUsPage = () => {
  const { darkMode } = useTheme();

  useEffect(() => {
    // Add animation on mount
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate__fadeInUp');
            }
          });
        }, { threshold: 0.1 });
        
        observer.observe(el);
      });
    };

    animateElements();
  }, []);

  return (
    <div className={`about-us-page ${darkMode ? 'dark-mode' : ''}`}>
      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-overlay">
          <Container>
            <div className="hero-content text-center">
              <h1 className="hero-title">About LuxDrive Car Rental</h1>
              <p className="hero-subtitle">
                Your trusted partner for premium car rental experiences
              </p>
            </div>
          </Container>
        </div>
      </div>

      <Container className="py-5">
        {/* Company Story Section */}
        <Row className="mb-5 align-items-center animate-on-scroll">
          <Col lg={6} className="mb-4 mb-lg-0">
            <div className="section-header mb-4">
              <div className="section-icon">
                <FaStar />
              </div>
              <h2>Our Story</h2>
            </div>
            <p className="about-text">
              Founded in 2015, LuxDrive Car Rental began with a simple vision: to provide a seamless and enjoyable car rental experience for everyone, from daily commuters to adventurous travelers. We started with a small fleet and a big dream, growing steadily by focusing on customer satisfaction and quality service.
            </p>
            <p className="about-text">
              Over the years, we've expanded our fleet, embraced technology, and built a team passionate about helping you explore the world, one journey at a time. We believe that renting a car should be as exciting and stress-free as the destination itself.
            </p>
            
            <div className="achievements mt-4">
              <Row>
                <Col md={4} className="text-center mb-3">
                  <div className="achievement-icon">
                    <FaTrophy />
                  </div>
                  <h3>12,000+</h3>
                  <p>Happy Customers</p>
                </Col>
                <Col md={4} className="text-center mb-3">
                  <div className="achievement-icon">
                    <FaCar />
                  </div>
                  <h3>150+</h3>
                  <p>Premium Vehicles</p>
                </Col>
                <Col md={4} className="text-center mb-3">
                  <div className="achievement-icon">
                    <FaShieldAlt />
                  </div>
                  <h3>99%</h3>
                  <p>Safety Record</p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col lg={6} className="text-center">
            <div className="image-container">
              <div className="main-image"></div>
              <div className="decoration-shape shape-1"></div>
              <div className="decoration-shape shape-2"></div>
            </div>
          </Col>
        </Row>

        {/* Our Mission and Values Section */}
        <div className="mission-values py-5 mb-5 animate-on-scroll">
          <div className="section-header text-center mb-5">
            <div className="section-icon">
              <FaGlobe />
            </div>
            <h2>Our Mission & Values</h2>
            <p className="section-subtitle">The principles that drive everything we do</p>
          </div>
          
          <Row className="g-4">
            <Col md={4}>
              <Card className="value-card h-100">
                <Card.Body className="p-4">
                  <div className="value-icon">
                    <FaGlobe />
                  </div>
                  <Card.Title>Seamless Journeys</Card.Title>
                  <Card.Text>
                    To provide reliable, high-quality vehicles and exceptional service that make every journey effortless and memorable.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="value-card h-100">
                <Card.Body className="p-4">
                  <div className="value-icon">
                    <FaHandshake />
                  </div>
                  <Card.Title>Customer First</Card.Title>
                  <Card.Text>
                    We prioritize our customers' needs, ensuring transparency, fairness, and a personalized experience every step of the way.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="value-card h-100">
                <Card.Body className="p-4">
                  <div className="value-icon">
                    <FaCar />
                  </div>
                  <Card.Title>Quality & Safety</Card.Title>
                  <Card.Text>
                    Maintaining a modern, diverse fleet and adhering to the highest standards of vehicle maintenance and safety checks.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Why Choose Us */}
        <Row className="mb-5 align-items-center animate-on-scroll">
          <Col lg={6} className="text-center mb-4 mb-lg-0">
            <div className="image-container">
              <div className="secondary-image"></div>
              <div className="decoration-shape shape-3"></div>
            </div>
          </Col>
          <Col lg={6}>
            <div className="section-header mb-4">
              <div className="section-icon">
                <FaUsers />
              </div>
              <h2>Why Choose LuxDrive?</h2>
            </div>
            <p className="about-text">
              At LuxDrive, we don't just rent cars; we provide solutions for your mobility needs. With transparent pricing, flexible booking options, and a commitment to cleanliness and maintenance, we ensure you can hit the road with confidence.
            </p>
            
            <div className="benefits">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <FaStar />
                </div>
                <div>
                  <h5>Premium Fleet</h5>
                  <p>Carefully maintained vehicles for every need and preference</p>
                </div>
              </div>
              
              <div className="benefit-item">
                <div className="benefit-icon">
                  <FaHandshake />
                </div>
                <div>
                  <h5>Personalized Service</h5>
                  <p>Dedicated support team available 24/7 for your convenience</p>
                </div>
              </div>
              
              <div className="benefit-item">
                <div className="benefit-icon">
                  <FaShieldAlt />
                </div>
                <div>
                  <h5>Complete Peace of Mind</h5>
                  <p>Comprehensive insurance and roadside assistance included</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Team Section */}
        <div className="team-section py-5 animate-on-scroll">
          <div className="section-header text-center mb-5">
            <div className="section-icon">
              <FaUsers />
            </div>
            <h2>Meet Our Leadership</h2>
            <p className="section-subtitle">The passionate team behind LuxDrive</p>
          </div>
          
          <Row className="g-4">
            <Col md={4}>
              <Card className="team-card">
                <div className="team-image member-1"></div>
                <Card.Body className="text-center">
                  <Card.Title>Sarah Johnson</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">CEO & Founder</Card.Subtitle>
                  <Card.Text>
                    With 15 years in the automotive industry, Sarah's vision drives our company forward.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="team-card">
                <div className="team-image member-2"></div>
                <Card.Body className="text-center">
                  <Card.Title>Michael Chen</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Operations Director</Card.Subtitle>
                  <Card.Text>
                    Michael ensures our fleet is always in perfect condition and ready for your journey.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="team-card">
                <div className="team-image member-3"></div>
                <Card.Body className="text-center">
                  <Card.Title>Amira Hassan</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Customer Experience</Card.Subtitle>
                  <Card.Text>
                    Amira leads our customer service team to deliver exceptional experiences.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default AboutUsPage;















