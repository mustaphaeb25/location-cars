import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, InputGroup, FormControl, Button, Alert } from 'react-bootstrap';
import CarCard from '../components/CarCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getCars } from '../services/api';
import { FaSearch } from 'react-icons/fa';

const CarListingPage = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPrice, setFilterPrice] = useState(''); // Max price

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await getCars();
        setCars(response.data);
        setFilteredCars(response.data); // Initialize filtered cars with all cars
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch car listings. Please try again later.");
        setLoading(false);
        console.error("Error fetching cars:", err);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    // Apply filters and search whenever dependencies change
    let currentCars = [...cars];

    // Search by brand or model
    if (searchTerm) {
      currentCars = currentCars.filter(car =>
        car.marque.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.modele.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by brand
    if (filterBrand) {
      currentCars = currentCars.filter(car => car.marque.toLowerCase() === filterBrand.toLowerCase());
    }

    // Filter by status
    if (filterStatus) {
      currentCars = currentCars.filter(car => car.statut.toLowerCase() === filterStatus.toLowerCase());
    }

    // Filter by price
    if (filterPrice) {
      currentCars = currentCars.filter(car => car.prix_par_jour <= parseFloat(filterPrice));
    }

    setFilteredCars(currentCars);
  }, [searchTerm, filterBrand, filterStatus, filterPrice, cars]);

  // Extract unique brands for filter dropdown
  const uniqueBrands = [...new Set(cars.map(car => car.marque))];

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Available Cars</h1>

      {/* Search and Filter Bar */}
      <Row className="mb-4 fade-in">
        <Col md={12}>
          <Form className="p-3 shadow-sm rounded bg-light">
            <Row className="g-3">
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text><FaSearch /></InputGroup.Text>
                  <FormControl
                    placeholder="Search by brand or model..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={2}>
                <Form.Select value={filterBrand} onChange={(e) => setFilterBrand(e.target.value)}>
                  <option value="">All Brands</option>
                  {uniqueBrands.map((brand, index) => (
                    <option key={index} value={brand}>{brand}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={2}>
                <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="">All Statuses</option>
                  <option value="disponible">Available</option>
                  <option value="louee">Rented</option>
                  <option value="en_maintenance">In Maintenance</option>
                </Form.Select>
              </Col>
              <Col md={2}>
                <FormControl
                  type="number"
                  placeholder="Max Price"
                  value={filterPrice}
                  onChange={(e) => setFilterPrice(e.target.value)}
                />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Alert variant="danger" className="text-center">{error}</Alert>
      ) : filteredCars.length === 0 ? (
        <Alert variant="info" className="text-center">No cars found matching your criteria.</Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredCars.map((car) => (
            <Col key={car.id}>
              <CarCard car={car} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CarListingPage;