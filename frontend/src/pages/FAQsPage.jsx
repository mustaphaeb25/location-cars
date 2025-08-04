// import React from 'react';
// import { Container, Accordion } from 'react-bootstrap';

// const FAQsPage = () => {
//   const faqs = [
//     {
//       id: "1",
//       question: "What documents do I need to rent a car?",
//       answer: "You typically need a valid driver's license (held for at least 1 year), a valid ID (passport or national ID card), and a credit card in the main driver's name for the security deposit."
//     },
//     {
//       id: "2",
//       question: "What is the minimum age to rent a car?",
//       answer: "The minimum age to rent a car is usually 21 years old. Drivers aged 21-24 may be subject to a young driver surcharge, and certain car categories might have higher age restrictions."
//     },
//     {
//       id: "3",
//       question: "Can I pick up the car in one city and drop it off in another?",
//       answer: "Yes, we offer one-way rentals between select locations. A one-way fee may apply, which will be specified during the booking process."
//     },
//     {
//       id: "4",
//       question: "What is included in the rental price?",
//       answer: "Our standard rental price typically includes unlimited mileage, basic third-party liability insurance, and 24/7 roadside assistance. Additional insurance options and extras can be added during booking."
//     },
//     {
//       id: "5",
//       question: "How do I extend my rental period?",
//       answer: "If you wish to extend your rental, please contact our customer service team as soon as possible. Extensions are subject to vehicle availability and may incur additional charges."
//     },
//     {
//       id: "6",
//       question: "What if I return the car late?",
//       answer: "Late returns may be subject to additional hourly or daily charges. Please notify us immediately if you anticipate returning the car after the agreed-upon time."
//     },
//     {
//       id: "7",
//       question: "What kind of fuel policy do you have?",
//       answer: "Our standard fuel policy is 'full to full'. You pick up the car with a full tank and should return it with a full tank. Otherwise, a refueling service charge plus the cost of fuel will apply."
//     },
//     {
//       id: "8",
//       question: "Do I need insurance to rent a car?",
//       answer: "While basic third-party liability is usually included, we highly recommend considering additional insurance options for comprehensive coverage against damages to the rental vehicle or other incidents. You can choose these during the booking process."
//     },
//   ];

//   return (
//     <Container className="my-5 fade-in">
//       <h1 className="text-center mb-4">Frequently Asked Questions</h1>
//       <p className="lead text-center mb-5 text-muted">
//         Find answers to the most common questions about renting a car with LuxDrive.
//       </p>

//       <Accordion defaultActiveKey="0" alwaysOpen className="shadow-lg">
//         {faqs.map((faq, index) => (
//           <Accordion.Item eventKey={faq.id} key={faq.id}>
//             <Accordion.Header>{faq.question}</Accordion.Header>
//             <Accordion.Body>
//               {faq.answer}
//             </Accordion.Body>
//           </Accordion.Item>
//         ))}
//       </Accordion>
//     </Container>
//   );
// };

// export default FAQsPage;
import React, { useState, useEffect } from 'react';
import { Container, Accordion } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';


const FAQsPage = () => {
  const { darkMode } = useTheme();
  const [activeKey, setActiveKey] = useState(null);
  
  const faqs = [
    {
      id: "1",
      question: "What documents do I need to rent a car?",
      answer: "You typically need a valid driver's license (held for at least 1 year), a valid ID (passport or national ID card), and a credit card in the main driver's name for the security deposit."
    },
    {
      id: "2",
      question: "What is the minimum age to rent a car?",
      answer: "The minimum age to rent a car is usually 21 years old. Drivers aged 21-24 may be subject to a young driver surcharge, and certain car categories might have higher age restrictions."
    },
    {
      id: "3",
      question: "Can I pick up the car in one city and drop it off in another?",
      answer: "Yes, we offer one-way rentals between select locations. A one-way fee may apply, which will be specified during the booking process."
    },
    {
      id: "4",
      question: "What is included in the rental price?",
      answer: "Our standard rental price typically includes unlimited mileage, basic third-party liability insurance, and 24/7 roadside assistance. Additional insurance options and extras can be added during booking."
    },
    {
      id: "5",
      question: "How do I extend my rental period?",
      answer: "If you wish to extend your rental, please contact our customer service team as soon as possible. Extensions are subject to vehicle availability and may incur additional charges."
    },
    {
      id: "6",
      question: "What if I return the car late?",
      answer: "Late returns may be subject to additional hourly or daily charges. Please notify us immediately if you anticipate returning the car after the agreed-upon time."
    },
    {
      id: "7",
      question: "What kind of fuel policy do you have?",
      answer: "Our standard fuel policy is 'full to full'. You pick up the car with a full tank and should return it with a full tank. Otherwise, a refueling service charge plus the cost of fuel will apply."
    },
    {
      id: "8",
      question: "Do I need insurance to rent a car?",
      answer: "While basic third-party liability is usually included, we highly recommend considering additional insurance options for comprehensive coverage against damages to the rental vehicle or other incidents. You can choose these during the booking process."
    },
  ];

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
    <div className={`faqs-page ${darkMode ? 'dark-mode' : ''}`}>
      {/* Hero Section */}
      <div className="faqs-hero">
        <div className="hero-overlay">
          <Container>
            <div className="hero-content text-center">
              <div className="hero-icon">
                <FaQuestionCircle />
              </div>
              <h1 className="hero-title">Frequently Asked Questions</h1>
              <p className="hero-subtitle">
                Find answers to the most common questions about renting with LuxDrive
              </p>
            </div>
          </Container>
        </div>
      </div>

      <Container className="py-5">
        <div className="text-center mb-5">
          <p className="lead">
            Can't find what you're looking for? <a href="/contact" className="contact-link">Contact our support team</a>
          </p>
        </div>

        <div className="faqs-accordion animate-on-scroll">
          <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
            {faqs.map((faq) => (
              <Accordion.Item eventKey={faq.id} key={faq.id} className="faq-item">
                <Accordion.Header className="faq-header">
                  <div className="faq-question">
                    <div className="faq-icon">
                      {activeKey === faq.id ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    <span>{faq.question}</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body className="faq-answer">
                  {faq.answer}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>

        <div className="support-section mt-5 pt-4 text-center animate-on-scroll">
          <div className="support-card p-5 rounded">
            <h3 className="mb-3">Still Have Questions?</h3>
            <p className="mb-4">
              Our customer support team is available 24/7 to assist you with any inquiries.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <a href="/contact" className="btn btn-primary btn-lg px-4">
                Contact Support
              </a>
              <a href="tel:+212645555555" className="btn btn-outline-primary btn-lg px-4">
                Call Now
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FAQsPage;