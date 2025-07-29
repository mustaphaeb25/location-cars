// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Carousel, Button, Card, Image } from 'react-bootstrap';
// import { getCars } from '../services/api';
// import LoadingSpinner from '../components/LoadingSpinner';
// import { Link } from 'react-router-dom';
// import { FaCar, FaUsers, FaCheckCircle } from 'react-icons/fa'; // FaQuoteLeft removed as it's not used in this version

// // Make sure these paths are correct based on your asset structure (e.g., '../assets/client-1.jpg' or '../assets/images/clients/client-1.jpg')
// import fatimaImage from '../assets/client-1.jpg';
// import ahmedImage from '../assets/client-2.jpg';
// import saraImage from '../assets/client-3.jpg';
// import youssefImage from '../assets/client-4.jpg';
// import lailaImage from '../assets/client-5.jpg';


// const HomePage = () => {
//   const [cars, setCars] = useState([]);
//   const [loadingCars, setLoadingCars] = useState(true);
//   const [errorCars, setErrorCars] = useState(null);

//   const [homepageTestimonials, setHomepageTestimonials] = useState([]);
//   const [loadingTestimonials, setLoadingTestimonials] = useState(true);

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         setLoadingCars(true);
//         const response = await getCars();
//         setCars(response.data.filter(car => car.statut === 'disponible').slice(0, 3));
//         setLoadingCars(false);
//       } catch (err) {
//         setErrorCars("Failed to fetch cars for homepage. Please try again later.");
//         setLoadingCars(false);
//         console.error("Error fetching cars:", err);
//       }
//     };
//     fetchCars();
//   }, []);

//   useEffect(() => {
//     const fetchHomepageTestimonials = async () => {
//       try {
//         setLoadingTestimonials(true);
//         const dummyData = [
//           {
//             id: 1,
//             name: "Fatima Z.",
//             car: "Mercedes-Benz C-Class",
//             rating: 5,
//             comment: "Absolutely seamless experience! The car was pristine, and the pickup/drop-off process was incredibly smooth. Highly recommend this service. A fantastic choice for anyone looking for reliability and comfort!",
//             date: "2025-07-20",
//             imageUrl: fatimaImage
//           },
//           {
//             id: 2,
//             name: "Ahmed K.",
//             car: "Renault Clio",
//             rating: 4,
//             comment: "Great value for money. The car was reliable for my trip across the country. Customer service was helpful when I had a question about extending my rental. Very satisfied overall.",
//             date: "2025-07-15",
//             imageUrl: ahmedImage
//           },
//           {
//             id: 3,
//             name: "Sara B.",
//             car: "BMW X5",
//             rating: 5,
//             comment: "Rented an SUV for a family vacation. The car was comfortable and spacious for all of us. Excellent service all around, from booking to drop-off. Will definitely rent again!",
//             date: "2025-07-10",
//             imageUrl: saraImage
//           },
//           {
//             id: 4,
//             name: "Youssef M.",
//             car: "Fiat Panda",
//             rating: 4,
//             comment: "Perfect for city driving. Economical and easy to park. The team was very efficient during pickup.",
//             date: "2025-07-01",
//             imageUrl: youssefImage
//           },
//           {
//             id: 5,
//             name: "Laila H.",
//             car: "Peugeot 308",
//             rating: 5,
//             comment: "Smooth rental process, friendly staff, and a clean, well-maintained car. Made my business trip much easier. Highly recommended for professionalism.",
//             date: "2025-06-28",
//             imageUrl: lailaImage
//           }
//         ];
//         setHomepageTestimonials(dummyData);
//       } catch (error) {
//         console.error("Error loading homepage testimonials:", error);
//       } finally {
//         setLoadingTestimonials(false);
//       }
//     };

//     fetchHomepageTestimonials();
//   }, []);

//   return (
//     <>
//       {/* Hero Section */}
//       <div className="bg-primary text-white text-center py-5">
//         <Container className="fade-in">
//           <h1 className="display-4 mb-3">Your Journey Starts Here</h1>
//           <p className="lead mb-4">Discover the perfect car for your next adventure.</p>
//           <Button as={Link} to="/cars" variant="light" size="lg">Browse Cars</Button>
//         </Container>
//       </div>

//       {/* Car Carousel Section */}
//       <Container className="my-5 fade-in">
//         <h2 className="text-center mb-4">Featured Cars</h2>
//         {loadingCars ? (
//           <LoadingSpinner />
//         ) : errorCars ? (
//           <p className="text-center text-danger">{errorCars}</p>
//         ) : cars.length === 0 ? (
//           <p className="text-center">No featured cars available at the moment.</p>
//         ) : (
//           <Carousel indicators={false} controls={true} className="shadow-lg rounded" interval={3000}>
//             {cars.map((car) => (
//               <Carousel.Item key={car.id}>
//                 <img
//                   className="d-block w-100 rounded"
//                   src={car.image_url ? `http://localhost:3000${car.image_url}` : 'https://via.placeholder.com/800x400?text=No+Image'}
//                   alt={`${car.marque} ${car.modele}`}
//                   style={{ height: '400px', objectFit: 'cover' }}
//                 />
//                 <Carousel.Caption className="bg-dark bg-opacity-75 p-3 rounded">
//                   <h3>{car.marque} {car.modele}</h3>
//                   <p>${car.prix_par_jour} / day</p>
//                   <Button as={Link} to={`/cars/${car.id}`} variant="outline-light">View Details</Button>
//                 </Carousel.Caption>
//               </Carousel.Item>
//             ))}
//           </Carousel>
//         )}
//       </Container>

//       {/* Services Section */}
//       <Container className="my-5 fade-in">
//         <h2 className="text-center mb-4">Why Choose Us?</h2>
//         <Row className="text-center">
//           <Col md={4} className="mb-4">
//             <Card className="h-100 p-3 hover-grow">
//               <Card.Body>
//                 <FaCar size={50} className="text-primary mb-3" />
//                 <Card.Title>Wide Selection</Card.Title>
//                 <Card.Text>
//                   Choose from a diverse fleet of vehicles to suit every need and budget.
//                 </Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col md={4} className="mb-4">
//             <Card className="h-100 p-3 hover-grow">
//               <Card.Body>
//                 <FaCheckCircle size={50} className="text-primary mb-3" />
//                 <Card.Title>Easy Booking</Card.Title>
//                 <Card.Text>
//                   Our intuitive platform makes booking your next rental quick and hassle-free.
//                 </Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col md={4} className="mb-4">
//             <Card className="h-100 p-3 hover-grow">
//               <Card.Body>
//                 <FaUsers size={50} className="text-primary mb-3" />
//                 <Card.Title>24/7 Support</Card.Title>
//                 <Card.Text>
//                   Our dedicated team is always ready to assist you, day or night.
//                 </Card.Text>
//               </Card.Body>
//             </Card> {/* Corrected closing tag */}
//           </Col>
//         </Row>
//       </Container>

//       {/* Testimonials Carousel Section */}
//      <section className="bg-light py-5">
//         <Container className="fade-in">
//           <h2 className="text-center mb-5">What Our Customers Say</h2>
//           {loadingTestimonials ? (
//             <p className="text-center">Loading testimonials...</p>
//           ) : homepageTestimonials.length === 0 ? (
//             <p className="text-center">No testimonials to display yet.</p>
//           ) : (
//             <>
//               <Carousel indicators={true} controls={true} interval={5000} className="shadow-lg rounded">
//                 {homepageTestimonials.map((testimonial) => (
//                   <Carousel.Item key={testimonial.id}>
//                     <div className="d-flex flex-column align-items-center text-center p-5">
//                       {testimonial.imageUrl && (
//                         <Image
//                           src={testimonial.imageUrl}
//                           alt={testimonial.name}
//                           roundedCircle
//                           className="mb-3"
//                           style={{ width: '120px', height: '120px', objectFit: 'cover', border: '4px solid #007bff' }}
//                         />
//                       )}
//                       <p className="lead font-italic mb-3">"{testimonial.comment}"</p>
//                       <h4 className="mb-1">{testimonial.name}</h4>
//                       <p className="text-muted mb-0">{testimonial.car}</p>
//                       <div className="mb-2">
//                         {'⭐'.repeat(testimonial.rating)}
//                       </div>
//                     </div>
//                   </Carousel.Item>
//                 ))}
//               </Carousel>
              
//             </>
//           )}
//         </Container>
//       </section>

//       {/* Call to Action Section */}
//       <div className="bg-secondary text-white text-center py-5">
//         <Container className="fade-in">
//           <h2 className="mb-3">Ready to find your perfect ride?</h2>
//           <p className="lead mb-4">Start Browse our extensive collection of cars today!</p>
//           <Button as={Link} to="/cars" variant="light" size="lg">View All Cars</Button>
//         </Container>
//       </div>
//     </>
//   );
// };

// export default HomePage;

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import { getCars } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';
import { FaCar, FaUsers, FaCheckCircle, FaStar, FaArrowRight } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

// Client images
import fatimaImage from '../assets/client-1.jpg';
import ahmedImage from '../assets/client-2.jpg';
import saraImage from '../assets/client-3.jpg';
import youssefImage from '../assets/client-4.jpg';
import lailaImage from '../assets/client-5.jpg';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);
  const [errorCars, setErrorCars] = useState(null);
  const [homepageTestimonials, setHomepageTestimonials] = useState([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoadingCars(true);
        const response = await getCars();
        setCars(response.data.filter(car => car.statut === 'disponible').slice(0, 6));
        setLoadingCars(false);
      } catch (err) {
        setErrorCars("Failed to fetch cars for homepage. Please try again later.");
        setLoadingCars(false);
        console.error("Error fetching cars:", err);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const fetchHomepageTestimonials = async () => {
      try {
        setLoadingTestimonials(true);
        const dummyData = [
          // ... (keep your existing testimonial data)
          {
            id: 1,
            name: "Fatima Z.",
            car: "Mercedes-Benz C-Class",
            rating: 5,
            comment: "Absolutely seamless experience! The car was pristine, and the pickup/drop-off process was incredibly smooth. Highly recommend this service. A fantastic choice for anyone looking for reliability and comfort!",
            date: "2025-07-20",
            imageUrl: fatimaImage
          },
          {
            id: 2,
            name: "Ahmed K.",
            car: "Renault Clio",
            rating: 4,
            comment: "Great value for money. The car was reliable for my trip across the country. Customer service was helpful when I had a question about extending my rental. Very satisfied overall.",
            date: "2025-07-15",
            imageUrl: ahmedImage
          },
          {
            id: 3,
            name: "Sara B.",
            car: "BMW X5",
            rating: 5,
            comment: "Rented an SUV for a family vacation. The car was comfortable and spacious for all of us. Excellent service all around, from booking to drop-off. Will definitely rent again!",
            date: "2025-07-10",
            imageUrl: saraImage
          },
          {
            id: 4,
            name: "Youssef M.",
            car: "Fiat Panda",
            rating: 4,
            comment: "Perfect for city driving. Economical and easy to park. The team was very efficient during pickup.",
            date: "2025-07-01",
            imageUrl: youssefImage
          },
          {
            id: 5,
            name: "Laila H.",
            car: "Peugeot 308",
            rating: 5,
            comment: "Smooth rental process, friendly staff, and a clean, well-maintained car. Made my business trip much easier. Highly recommended for professionalism.",
            date: "2025-06-28",
            imageUrl: lailaImage
          }
        ];
        setHomepageTestimonials(dummyData);
      } catch (error) {
        console.error("Error loading homepage testimonials:", error);
      } finally {
        setLoadingTestimonials(false);
      }
    };
    fetchHomepageTestimonials();
  }, []);

  return (
    <div className={`home-page ${darkMode ? 'dark-mode' : ''}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <Container className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Premium Car Rentals</h1>
            <p className="hero-subtitle">Experience luxury and performance with our exclusive fleet</p>
            <div className="hero-buttons">
              <Button as={Link} to="/cars" variant="primary" size="lg" className="mr-3">
                Browse Fleet
              </Button>
              <Button as={Link} to="/about" variant="outline-light" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Cars Section */}
      <section className="featured-cars py-5">
        <Container>
          <div className="section-header text-center mb-5">
            <h2 className="section-title">Our Featured Vehicles</h2>
            <p className="section-subtitle">Select from our premium collection</p>
          </div>
          
          {loadingCars ? (
            <LoadingSpinner />
          ) : errorCars ? (
            <p className="text-center text-danger">{errorCars}</p>
          ) : cars.length === 0 ? (
            <p className="text-center">No featured cars available at the moment.</p>
          ) : (
            <Row className="g-4">
              {cars.map((car) => (
                <Col key={car.id} lg={4} md={6}>
                  <Card className="car-card h-100">
                    <div className="car-image-wrapper">
                      <Image
                        src={car.image_url ? `http://localhost:3000${car.image_url}` : 'https://via.placeholder.com/800x400?text=No+Image'}
                        alt={`${car.marque} ${car.modele}`}
                        fluid
                        className="car-image"
                      />
                      <div className="car-badge">${car.prix_par_jour}<span>/day</span></div>
                    </div>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h3 className="car-title">{car.marque} {car.modele}</h3>
                          <p className="car-specs">{car.annee} • {car.type_carburant}</p>
                        </div>
                        <div className="car-rating">
                          <FaStar className="text-warning" /> 4.8
                        </div>
                      </div>
                      <div className="car-features">
                        <span><FaCar /> {car.type_vehicule}</span>
                        <span>{car.nombre_places} Seats</span>
                        <span>{car.boite_vitesse}</span>
                      </div>
                    </Card.Body>
                    <Card.Footer className="bg-transparent border-top-0">
                      <Button 
                        as={Link} 
                        to={`/cars/${car.id}`} 
                        variant="outline-primary" 
                        className="w-100 car-view-btn"
                      >
                        View Details <FaArrowRight className="ms-2" />
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
          
          <div className="text-center mt-5">
            <Button as={Link} to="/cars" variant="primary" size="lg">
              View All Vehicles
            </Button>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <section className="services-section py-5">
        <Container>
          <div className="section-header text-center mb-5">
            <h2 className="section-title">Why Choose LuxDrive</h2>
            <p className="section-subtitle">Premium service at every step</p>
          </div>
          
          <Row className="g-4">
            <Col md={4}>
              <Card className="service-card h-100">
                <Card.Body className="text-center">
                  <div className="service-icon">
                    <FaCar size={40} />
                  </div>
                  <h3 className="service-title">Diverse Fleet</h3>
                  <p className="service-text">
                    From economy to luxury, our extensive selection ensures you'll find the perfect vehicle for any occasion.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="service-card h-100">
                <Card.Body className="text-center">
                  <div className="service-icon">
                    <FaCheckCircle size={40} />
                  </div>
                  <h3 className="service-title">Hassle-Free Booking</h3>
                  <p className="service-text">
                    Our streamlined process gets you behind the wheel quickly with minimal paperwork.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="service-card h-100">
                <Card.Body className="text-center">
                  <div className="service-icon">
                    <FaUsers size={40} />
                  </div>
                  <h3 className="service-title">24/7 Support</h3>
                  <p className="service-text">
                    Our dedicated team is available around the clock to assist with any needs during your rental.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-5">
        <Container>
          <div className="section-header text-center mb-5">
            <h2 className="section-title">Client Experiences</h2>
            <p className="section-subtitle">What our customers say about us</p>
          </div>
          
          {loadingTestimonials ? (
            <p className="text-center">Loading testimonials...</p>
          ) : homepageTestimonials.length === 0 ? (
            <p className="text-center">No testimonials to display yet.</p>
          ) : (
            <Row className="g-4">
              {homepageTestimonials.slice(0, 3).map((testimonial) => (
                <Col key={testimonial.id} lg={4} md={6}>
                  <Card className="testimonial-card h-100">
                    <Card.Body className="text-center">
                      <div className="testimonial-image-wrapper">
                        <Image
                          src={testimonial.imageUrl}
                          alt={testimonial.name}
                          roundedCircle
                          className="testimonial-image"
                        />
                      </div>
                      <div className="testimonial-rating mb-3">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={i < testimonial.rating ? "text-warning" : "text-muted"} 
                          />
                        ))}
                      </div>
                      <blockquote className="testimonial-quote">
                        "{testimonial.comment}"
                      </blockquote>
                      <div className="testimonial-author">
                        <h4 className="mb-1">{testimonial.name}</h4>
                        <p className="text-muted mb-0">{testimonial.car}</p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <Container className="text-center">
          <h2 className="cta-title mb-4">Ready for Your Next Adventure?</h2>
          <p className="cta-text mb-5">
            Join thousands of satisfied customers who've experienced the LuxDrive difference.
          </p>
          <div className="cta-buttons">
            <Button as={Link} to="/cars" variant="primary" size="lg" className="me-3">
              Reserve Now
            </Button>
            <Button as={Link} to="/contact" variant="outline-light" size="lg">
              Contact Us
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;

