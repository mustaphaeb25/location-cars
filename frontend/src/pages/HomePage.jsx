// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Button, Card, Image ,Carousel} from 'react-bootstrap';
// import { getCars } from '../services/api';
// import LoadingSpinner from '../components/LoadingSpinner';
// import { Link } from 'react-router-dom';
// import { FaCar, FaUsers, FaCheckCircle, FaStar, FaArrowRight } from 'react-icons/fa';
// import { useTheme } from '../contexts/ThemeContext';

// // Client images
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
//   const { darkMode } = useTheme();

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         setLoadingCars(true);
//         const response = await getCars();
//         setCars(response.data.filter(car => car.statut === 'disponible').slice(0, 6));
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
//           // ... (keep your existing testimonial data)
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
//     <div className={`home-page ${darkMode ? 'dark-mode' : ''}`}>
//       {/* Hero Section */}
//       <section className="hero-section">
//         <div className="hero-overlay"></div>
//         <Container className="hero-content">
//           <div className="hero-text">
//             <h1 className="hero-title">Premium Car Rentals</h1>
//             <p className="hero-subtitle">Experience luxury and performance with our exclusive fleet</p>
//             <div className="hero-buttons">
//               <Button as={Link} to="/cars" variant="primary" size="lg" className="mr-3">
//                 Browse Fleet
//               </Button>
//               <Button as={Link} to="/about" variant="outline-light" size="lg">
//                 Learn More
//               </Button>
//             </div>
//           </div>
//         </Container>
//       </section>

//       {/* Featured Cars Section */}
//       <section className="featured-cars py-5">
//         <Container>
//           <div className="section-header text-center mb-5">
//             <h2 className="section-title">Our Featured Vehicles</h2>
//             <p className="section-subtitle">Select from our premium collection</p>
//           </div>
          
//           {loadingCars ? (
//             <LoadingSpinner />
//           ) : errorCars ? (
//             <p className="text-center text-danger">{errorCars}</p>
//           ) : cars.length === 0 ? (
//             <p className="text-center">No featured cars available at the moment.</p>
//           ) : (
//             <Row className="g-4">
//               {cars.map((car) => (
//                 <Col key={car.id} lg={4} md={6}>
//                   <Card className="car-card h-100">
//                     <div className="car-image-wrapper">
//                       <Image
//                         src={car.image_url ? `http://localhost:3000${car.image_url}` : 'https://via.placeholder.com/800x400?text=No+Image'}
//                         alt={`${car.marque} ${car.modele}`}
//                         fluid
//                         className="car-image"
//                       />
//                       <div className="car-badge">${car.prix_par_jour}<span>/day</span></div>
//                     </div>
//                     <Card.Body>
//                       <div className="d-flex justify-content-between align-items-start mb-2">
//                         <div>
//                           <h3 className="car-title">{car.marque} {car.modele}</h3>
//                           <p className="car-specs">{car.annee} • {car.type_carburant}</p>
//                         </div>
//                         <div className="car-rating">
//                           <FaStar className="text-warning" /> 4.8
//                         </div>
//                       </div>
//                       <div className="car-features">
//                         <span><FaCar /> {car.type_vehicule}</span>
//                         <span>{car.nombre_places} Seats</span>
//                         <span>{car.boite_vitesse}</span>
//                       </div>
//                     </Card.Body>
//                     <Card.Footer className="bg-transparent border-top-0">
//                       <Button 
//                         as={Link} 
//                         to={`/cars/${car.id}`} 
//                         variant="outline-primary" 
//                         className="w-100 car-view-btn"
//                       >
//                         View Details <FaArrowRight className="ms-2" />
//                       </Button>
//                     </Card.Footer>
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
//           )}
          
//           <div className="text-center mt-5">
//             <Button as={Link} to="/cars" variant="primary" size="lg">
//               View All Vehicles
//             </Button>
//           </div>
//         </Container>
//       </section>

//       {/* Services Section */}
//       <section className="services-section py-5">
//         <Container>
//           <div className="section-header text-center mb-5">
//             <h2 className="section-title">Why Choose LuxDrive</h2>
//             <p className="section-subtitle">Premium service at every step</p>
//           </div>
          
//           <Row className="g-4">
//             <Col md={4}>
//               <Card className="service-card h-100">
//                 <Card.Body className="text-center">
//                   <div className="service-icon">
//                     <FaCar size={40} />
//                   </div>
//                   <h3 className="service-title">Diverse Fleet</h3>
//                   <p className="service-text">
//                     From economy to luxury, our extensive selection ensures you'll find the perfect vehicle for any occasion.
//                   </p>
//                 </Card.Body>
//               </Card>
//             </Col>
            
//             <Col md={4}>
//               <Card className="service-card h-100">
//                 <Card.Body className="text-center">
//                   <div className="service-icon">
//                     <FaCheckCircle size={40} />
//                   </div>
//                   <h3 className="service-title">Hassle-Free Booking</h3>
//                   <p className="service-text">
//                     Our streamlined process gets you behind the wheel quickly with minimal paperwork.
//                   </p>
//                 </Card.Body>
//               </Card>
//             </Col>
            
//             <Col md={4}>
//               <Card className="service-card h-100">
//                 <Card.Body className="text-center">
//                   <div className="service-icon">
//                     <FaUsers size={40} />
//                   </div>
//                   <h3 className="service-title">24/7 Support</h3>
//                   <p className="service-text">
//                     Our dedicated team is available around the clock to assist with any needs during your rental.
//                   </p>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </section>

//       {/* Testimonials Section */}
//       {/* Testimonials Section - Carousel with Original Cards */}
// <section className={`testimonials-section py-5 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
//   <Container>
//     <div className="section-header text-center mb-5">
//       <h2 className={`section-title ${darkMode ? 'text-white' : ''}`}>Client Experiences</h2>
//       <p className={`section-subtitle ${darkMode ? 'text-light' : 'text-muted'}`}>What our customers say about us</p>
//     </div>
    
//     {loadingTestimonials ? (
//       <p className={`text-center ${darkMode ? 'text-light' : ''}`}>Loading testimonials...</p>
//     ) : homepageTestimonials.length === 0 ? (
//       <p className={`text-center ${darkMode ? 'text-light' : ''}`}>No testimonials to display yet.</p>
//     ) : (
//       <Carousel 
//         indicators={true}
//         controls={true}
//         interval={5000}
//         pause="hover"
//         className="testimonial-carousel"
//         prevIcon={
//           <span className="carousel-control-prev-icon" aria-hidden="true" />
//         }
//         nextIcon={
//           <span className="carousel-control-next-icon" aria-hidden="true" />
//         }
//       >
//         {homepageTestimonials.map((testimonial) => (
//           <Carousel.Item key={testimonial.id}>
//             <div className="d-flex justify-content-center">
//               <Col lg={8}>
//                 <Card className={`testimonial-card h-100 ${darkMode ? 'bg-dark text-white' : ''}`}>
//                   <Card.Body className="text-center">
//                     <div className="testimonial-image-wrapper">
//                       <Image
//                         src={testimonial.imageUrl}
//                         alt={testimonial.name}
//                         roundedCircle
//                         className="testimonial-image"
//                       />
//                     </div>
//                     <div className="testimonial-rating mb-3">
//                       {[...Array(5)].map((_, i) => (
//                         <FaStar 
//                           key={i} 
//                           className={i < testimonial.rating ? "text-warning" : "text-muted"} 
//                         />
//                       ))}
//                     </div>
//                     <blockquote className="testimonial-quote">
//                       "{testimonial.comment}"
//                     </blockquote>
//                     <div className="testimonial-author">
//                       <h4 className="mb-1">{testimonial.name}</h4>
//                       <p className={`mb-0 ${darkMode ? 'text-light' : 'text-muted'}`}>
//                         {testimonial.car}
//                       </p>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             </div>
//           </Carousel.Item>
//         ))}
//       </Carousel>
//     )}
//   </Container>
// </section>

//       {/* CTA Section */}
//       <section className="cta-section py-5">
//         <Container className="text-center">
//           <h2 className="cta-title mb-4">Ready for Your Next Adventure?</h2>
//           <p className="cta-text mb-5">
//             Join thousands of satisfied customers who've experienced the LuxDrive difference.
//           </p>
//           <div className="cta-buttons">
//             <Button as={Link} to="/cars" variant="primary" size="lg" className="me-3">
//               Reserve Now
//             </Button>
//             <Button as={Link} to="/contact" variant="outline-light" size="lg">
//               Contact Us
//             </Button>
//           </div>
//         </Container>
//       </section>
//     </div>
//   );
// };

// export default HomePage;

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Image, Carousel } from 'react-bootstrap';
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
      <section className="hero-section position-relative">
        <div className="hero-overlay position-absolute w-100 h-100"></div>
        <Container className="hero-content position-relative d-flex align-items-center min-vh-80 py-5">
          <div className="hero-text text-white text-center text-md-start">
            <h1 className="hero-title display-3 fw-bold mb-4">Premium Car Rentals</h1>
            <p className="hero-subtitle lead mb-5">Experience luxury and performance with our exclusive fleet of premium vehicles</p>
            <div className="hero-buttons d-flex flex-column flex-md-row gap-3 justify-content-center justify-content-md-start">
              <Button as={Link} to="/cars" variant="primary" size="lg" className="px-4 py-3">
                Browse Fleet
              </Button>
              <Button as={Link} to="/about" variant="outline-light" size="lg" className="px-4 py-3">
                Learn More
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Cars Section */}
      {/* Featured Cars Section */}
<section className={`featured-cars py-6 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
  <Container>
    <div className="section-header text-center mb-5">
      <div className="section-icon mx-auto mb-4">
        <FaCar />
      </div>
      <h2 className={`section-title display-5 fw-bold mb-3 ${darkMode ? 'text-white' : ''}`}>Our Featured Vehicles</h2>
      <p className={`section-subtitle lead ${darkMode ? 'text-light' : 'text-muted'}`}>
        Select from our premium collection of luxury cars
      </p>
    </div>
    
    {loadingCars ? (
      <LoadingSpinner />
    ) : errorCars ? (
      <div className={`alert alert-danger text-center ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}>
        {errorCars}
      </div>
    ) : cars.length === 0 ? (
      <div className={`alert alert-info text-center ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}>
        No featured cars available at the moment.
      </div>
    ) : (
      <Row className="g-4">
        {cars.map((car) => (
          <Col key={car.id} lg={4} md={6}>
            <Card className={`car-card h-100 border-0 shadow-sm overflow-hidden transition-all ${darkMode ? 'bg-dark text-white' : ''}`}>
              <div className="position-relative" style={{ height: '500px', overflow: 'hidden' }}>
                <Image
                  src={car.image_url ? `http://localhost:3000${car.image_url}` : 'https://via.placeholder.com/800x400?text=No+Image'}
                  alt={`${car.marque} ${car.modele}`}
                  className="w-100 h-100 object-fit-cover transition-all"
                  fluid
                />
                <div className={`position-absolute top-0 end-0 p-2 px-3 rounded-start ${darkMode ? 'bg-primary' : 'bg-primary text-white'}`}>
                  <span className="fw-bold">${car.prix_par_jour}</span>
                  <span className="small ms-1">/day</span>
                </div>
              </div>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h3 className={`h5 fw-bold mb-1 ${darkMode ? 'text-white' : ''}`}>
                      {car.marque} {car.modele}
                    </h3>
                    <p className={`small ${darkMode ? 'text-light' : 'text-muted'}`}>
                      {car.annee} • {car.type_carburant}
                    </p>
                  </div>
                  <div className={`d-flex align-items-center px-2 py-1 rounded ${darkMode ? 'bg-dark text-white border border-secondary' : 'bg-light text-dark'}`}>
                    <FaStar className="text-warning me-1" />
                    <span className="small fw-bold">4.8</span>
                  </div>
                </div>
                <div className={`d-flex justify-content-between small mb-3 ${darkMode ? 'text-light' : 'text-muted'}`}>
                  <span><FaCar className="me-1" /> {car.type_vehicule}</span>
                  <span>{car.nombre_places} Seats</span>
                  <span>{car.boite_vitesse}</span>
                </div>
              </Card.Body>
              <Card.Footer className={`bg-transparent border-top-0 p-4 pt-0 ${darkMode ? 'border-secondary' : ''}`}>
                <Button 
                  as={Link} 
                  to={`/cars/${car.id}`} 
                  variant={darkMode ? "outline-light" : "outline-primary"} 
                  className="w-100 d-flex align-items-center justify-content-center"
                >
                  View Details <FaArrowRight className="ms-2" />
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    )}
    
    <div className="text-center mt-5 pt-3">
      <Button 
        as={Link} 
        to="/cars" 
        variant="primary" 
        size="lg" 
        className="px-5 py-3 fw-bold"
      >
        View All Vehicles
      </Button>
    </div>
  </Container>
</section>

      {/* Services Section */}
      <section className={`services-section py-6 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
        <Container>
          <div className="section-header text-center mb-5">
            <h2 className={`section-title display-5 fw-bold mb-3 ${darkMode ? 'text-white' : ''}`}>Why Choose LuxDrive</h2>
            <p className={`section-subtitle lead ${darkMode ? 'text-light' : 'text-muted'}`}>Premium service at every step of your journey</p>
          </div>
          
          <Row className="g-4">
            <Col md={4}>
              <Card className={`service-card h-100 border-0 shadow-sm ${darkMode ? 'bg-dark text-white' : ''}`}>
                <Card.Body className="text-center p-4">
                  <div className="service-icon bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
                    <FaCar size={32} />
                  </div>
                  <h3 className="service-title h4 fw-bold mb-3">Diverse Fleet</h3>
                  <p className="service-text mb-0">
                    From economy to luxury, our extensive selection ensures you'll find the perfect vehicle for any occasion.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className={`service-card h-100 border-0 shadow-sm ${darkMode ? 'bg-dark text-white' : ''}`}>
                <Card.Body className="text-center p-4">
                  <div className="service-icon bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
                    <FaCheckCircle size={32} />
                  </div>
                  <h3 className="service-title h4 fw-bold mb-3">Hassle-Free Booking</h3>
                  <p className="service-text mb-0">
                    Our streamlined process gets you behind the wheel quickly with minimal paperwork and maximum convenience.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className={`service-card h-100 border-0 shadow-sm ${darkMode ? 'bg-dark text-white' : ''}`}>
                <Card.Body className="text-center p-4">
                  <div className="service-icon bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
                    <FaUsers size={32} />
                  </div>
                  <h3 className="service-title h4 fw-bold mb-3">24/7 Support</h3>
                  <p className="service-text mb-0">
                    Our dedicated team is available around the clock to assist with any needs during your rental period.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      {/* Testimonials Section */}
<section className={`testimonials-section py-6 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
  <Container>
    <div className="section-header text-center mb-5">
      <div className="section-icon mx-auto mb-4">
        <FaStar />
      </div>
      <h2 className={`section-title display-5 fw-bold mb-3 ${darkMode ? 'text-white' : ''}`}>Client Experiences</h2>
      <p className={`section-subtitle lead ${darkMode ? 'text-light' : 'text-muted'}`}>What our customers say about us</p>
    </div>
    
    {loadingTestimonials ? (
      <div className={`text-center ${darkMode ? 'text-light' : ''}`}>
        <LoadingSpinner />
      </div>
    ) : homepageTestimonials.length === 0 ? (
      <div className={`alert alert-info text-center ${darkMode ? 'bg-dark border-secondary' : ''}`}>
        No testimonials to display yet.
      </div>
    ) : (
      <Carousel 
        indicators={true}
        controls={true}
        interval={5000}
        pause="hover"
        className="testimonial-carousel"
        prevIcon={
          <span aria-hidden="true" className={`carousel-control-prev-icon ${darkMode ? 'bg-dark rounded-circle p-3' : ''}`} />
        }
        nextIcon={
          <span aria-hidden="true" className={`carousel-control-next-icon ${darkMode ? 'bg-dark rounded-circle p-3' : ''}`} />
        }
        variant={darkMode ? 'dark' : 'light'}
      >
        {homepageTestimonials.map((testimonial) => (
          <Carousel.Item key={testimonial.id}>
            <div className="d-flex justify-content-center">
              <Col lg={8}>
                <Card className={`testimonial-card h-100 border-0 shadow-sm ${darkMode ? 'bg-dark text-white' : ''}`}>
                  <Card.Body className="text-center p-5">
                    <div className="testimonial-image-wrapper mb-4">
                      <Image
                        src={testimonial.imageUrl}
                        alt={testimonial.name}
                        roundedCircle
                        className="testimonial-image border border-3 border-primary"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="testimonial-rating mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={`${i < testimonial.rating ? "text-warning" : "text-muted"} mx-1`} 
                          size={20}
                        />
                      ))}
                    </div>
                    <blockquote className="testimonial-quote fs-5 mb-4">
                      "{testimonial.comment}"
                    </blockquote>
                    <div className="testimonial-author">
                      <h4 className="h5 fw-bold mb-1">{testimonial.name}</h4>
                      <p className={`small mb-0 ${darkMode ? 'text-light' : 'text-muted'}`}>
                        {testimonial.car} • {testimonial.date}
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    )}
  </Container>
</section>

      {/* CTA Section */}
      <section className={`cta-section py-6 ${darkMode ? 'bg-dark' : 'bg-primary'}`}>
        <Container className="text-center">
          <h2 className={`cta-title display-5 fw-bold mb-4 ${darkMode ? 'text-white' : 'text-white'}`}>Ready for Your Next Adventure?</h2>
          <p className={`cta-text lead mb-5 ${darkMode ? 'text-light' : 'text-white'}`}>
            Join thousands of satisfied customers who've experienced the LuxDrive difference.
          </p>
          <div className="cta-buttons d-flex flex-column flex-md-row gap-3 justify-content-center">
            <Button as={Link} to="/cars" variant={darkMode ? "light" : "light"} size="lg" className="px-5 py-3">
              Reserve Now
            </Button>
            <Button as={Link} to="/contact" variant={darkMode ? "outline-light" : "outline-light"} size="lg" className="px-5 py-3">
              Contact Us
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;

