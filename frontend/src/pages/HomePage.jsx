import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Carousel, Button, Card } from 'react-bootstrap';
import { getCars } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';
import { FaCar, FaUsers, FaCheckCircle } from 'react-icons/fa';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await getCars();
        // Filter for available cars to show in carousel if needed, or show all for display
        setCars(response.data.filter(car => car.statut === 'disponible').slice(0, 3)); // Limit to 3 for carousel
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch cars for homepage. Please try again later.");
        setLoading(false);
        console.error("Error fetching cars:", err);
      }
    };
    fetchCars();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary text-white text-center py-5">
        <Container className="fade-in">
          <h1 className="display-4 mb-3">Your Journey Starts Here</h1>
          <p className="lead mb-4">Discover the perfect car for your next adventure.</p>
          <Button as={Link} to="/cars" variant="light" size="lg">Browse Cars</Button>
        </Container>
      </div>

      {/* Car Carousel Section */}
      <Container className="my-5 fade-in">
        <h2 className="text-center mb-4">Featured Cars</h2>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : cars.length === 0 ? (
          <p className="text-center">No featured cars available at the moment.</p>
        ) : (
          <Carousel indicators={false} controls={true} className="shadow-lg rounded">
            {cars.map((car) => (
              <Carousel.Item key={car.id} interval={3000}>
                <img
                  className="d-block w-100 rounded"
                  src={car.image_url ? `http://localhost:3000/uploads/${car.image_url}` : 'https://via.placeholder.com/800x400?text=No+Image'}
                  alt={`${car.marque} ${car.modele}`}
                  style={{ height: '400px', objectFit: 'cover' }}
                />
                <Carousel.Caption className="bg-dark bg-opacity-75 p-3 rounded">
                  <h3>{car.marque} {car.modele}</h3>
                  <p>${car.prix_par_jour} / day</p>
                  <Button as={Link} to={`/cars/${car.id}`} variant="outline-light">View Details</Button>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </Container>

      {/* Services Section */}
      <Container className="my-5 fade-in">
        <h2 className="text-center mb-4">Why Choose Us?</h2>
        <Row className="text-center">
          <Col md={4} className="mb-4">
            <Card className="h-100 p-3 hover-grow">
              <Card.Body>
                <FaCar size={50} className="text-primary mb-3" />
                <Card.Title>Wide Selection</Card.Title>
                <Card.Text>
                  Choose from a diverse fleet of vehicles to suit every need and budget.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 p-3 hover-grow">
              <Card.Body>
                <FaCheckCircle size={50} className="text-primary mb-3" />
                <Card.Title>Easy Booking</Card.Title>
                <Card.Text>
                  Our intuitive platform makes booking your next rental quick and hassle-free.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 p-3 hover-grow">
              <Card.Body>
                <FaUsers size={50} className="text-primary mb-3" />
                <Card.Title>24/7 Support</Card.Title>
                <Card.Text>
                  Our dedicated team is always ready to assist you, day or night.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Call to Action Section */}
      <div className="bg-secondary text-white text-center py-5">
        <Container className="fade-in">
          <h2 className="mb-3">Ready to find your perfect ride?</h2>
          <p className="lead mb-4">Start Browse our extensive collection of cars today!</p>
          <Button as={Link} to="/cars" variant="light" size="lg">View All Cars</Button>
        </Container>
      </div>
    </>
  );
};

export default HomePage;