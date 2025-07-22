import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Form, Alert, Card } from 'react-bootstrap';
import { getCarById, createReservation } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/Modal';
import { FaCalendarAlt, FaDollarSign, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth(); // Destructure loading from useAuth
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservationDates, setReservationDates] = useState({
    startDate: '',
    endDate: '',
  });
  const [formError, setFormError] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [reservationDetails, setReservationDetails] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const response = await getCarById(id);
        setCar(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch car details. Please try again later.");
        setLoading(false);
        console.error("Error fetching car details:", err);
      }
    };
    fetchCar();
  }, [id]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setReservationDates((prev) => ({ ...prev, [name]: value }));
  };

  const handleReservation = async (e) => {
    e.preventDefault();
    setFormError('');
    setReservationSuccess(false);

    if (!isAuthenticated) {
      setFormError('You must be logged in to make a reservation.');
      return;
    }

    if (!reservationDates.startDate || !reservationDates.endDate) {
      setFormError('Please select both start and end dates.');
      return;
    }

    const startDate = new Date(reservationDates.startDate);
    const endDate = new Date(reservationDates.endDate);

    if (startDate >= endDate) {
      setFormError('End date must be after the start date.');
      return;
    }

    if (startDate < new Date().setHours(0, 0, 0, 0)) {
      setFormError('Start date cannot be in the past.');
      return;
    }

    try {
      // Assuming 'en attente' is the default status for new reservations
      const response = await createReservation({
        id_utilisateur: user.id, // Get user ID from AuthContext
        id_voiture: car.id,
        date_debut: reservationDates.startDate,
        date_fin: reservationDates.endDate,
        statut: 'en attente',
      });
      setReservationDetails(response.data);
      setReservationSuccess(true);
      setShowConfirmationModal(true);
      setFormError(''); // Clear any previous form errors
    } catch (err) {
      setFormError(err.response?.data?.erreur || 'Failed to create reservation. Please try again.');
      console.error("Reservation error:", err);
    }
  };

  if (loading || authLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="text-center">{error}</Alert>
      </Container>
    );
  }

  if (!car) {
    return (
      <Container className="my-5">
        <Alert variant="info" className="text-center">Car not found.</Alert>
      </Container>
    );
  }

  const imageUrl = car.image_url ? `http://localhost:3000/uploads/${car.image_url}` : 'https://via.placeholder.com/600x400?text=No+Image';

  return (
    <Container className="my-5 fade-in">
      <Row>
        <Col md={7}>
          <Card className="shadow-sm">
            <Card.Body>
              <Image src={imageUrl} alt={`${car.marque} ${car.modele}`} fluid rounded className="mb-4" />
              <h1 className="mb-3">{car.marque} {car.modele}</h1>
              <p className="lead mb-3">{car.description}</p>
              <hr />
              <p className="d-flex align-items-center"><FaDollarSign className="me-2" /> <strong>Price per Day:</strong> ${car.prix_par_jour}</p>
              <p className="d-flex align-items-center"><FaInfoCircle className="me-2" /> <strong>Status:</strong> <span className={`badge ${car.statut === 'disponible' ? 'bg-success' : 'bg-danger'}`}>{car.statut}</span></p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={5}>
          <Card className="shadow-sm p-4">
            <h2 className="mb-4">Book This Car</h2>
            {!isAuthenticated && (
              <Alert variant="info">
                Please <Link to="/login">log in</Link> to make a reservation.
              </Alert>
            )}
            <Form onSubmit={handleReservation}>
              <Form.Group className="mb-3" controlId="startDate">
                <Form.Label><FaCalendarAlt className="me-2" />Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={reservationDates.startDate}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split('T')[0]} // Cannot select past dates
                  required
                  disabled={!isAuthenticated || car.statut !== 'disponible'}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="endDate">
                <Form.Label><FaCalendarAlt className="me-2" />End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={reservationDates.endDate}
                  onChange={handleDateChange}
                  min={reservationDates.startDate || new Date().toISOString().split('T')[0]} // End date must be after start date
                  required
                  disabled={!isAuthenticated || car.statut !== 'disponible'}
                />
              </Form.Group>

              {formError && <Alert variant="danger">{formError}</Alert>}

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={!isAuthenticated || car.statut !== 'disponible'}
              >
                {car.statut === 'disponible' ? 'Confirm Reservation' : 'Car Not Available'}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>

      <Modal
        show={showConfirmationModal}
        handleClose={() => setShowConfirmationModal(false)}
        title="Reservation Confirmation"
        showConfirmButton={false}
      >
        {reservationSuccess ? (
          <div>
            <Alert variant="success">
              Your reservation has been successfully placed!
            </Alert>
            <p><strong>Reservation ID:</strong> {reservationDetails?.reservation_id}</p>
            <p>You can view your reservations in the "My Reservations" section.</p>
            <Button variant="primary" onClick={() => navigate('/my-reservations')}>Go to My Reservations</Button>
          </div>
        ) : (
          <Alert variant="danger">
            There was an issue with your reservation. Please try again.
          </Alert>
        )}
      </Modal>
    </Container>
  );
};

export default CarDetailPage;