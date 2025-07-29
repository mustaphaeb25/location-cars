
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import ReservationCard from '../components/ReservationCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import { getReservations, updateReservationStatus, getCars } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const MyReservationsPage = () => {
  console.log("MyReservationsPage: TOP OF COMPONENT RENDER");

  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [cars, setCars] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);
  const [cancelMessage, setCancelMessage] = useState('');

  console.log("MyReservationsPage: Component Rendered");
  console.log("    - user:", user);
  console.log("    - isAuthenticated:", isAuthenticated);
  console.log("    - authLoading:", authLoading);

  const fetchUserReservations = async () => {
    if (!user || !user.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setCancelMessage('');

      // 1. Fetch cars
      const carsResponse = await getCars();
      const carsMap = carsResponse.data.reduce((acc, car) => {
        acc[car.id] = car;
        return acc;
      }, {});
      setCars(carsMap);

      // 2. Fetch reservations
      const reservationsResponse = await getReservations(user.id);
      
      if (reservationsResponse.data && Array.isArray(reservationsResponse.data)) {
        setReservations(reservationsResponse.data);
      } else {
        setReservations([]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      if (err.response?.status === 404) {
        setReservations([]);
        setError("You have no reservations yet.");
      } else {
        setError("Failed to load reservations. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("MyReservationsPage useEffect:", { authLoading, isAuthenticated, user });
    if (!authLoading && isAuthenticated && user?.id) {
      fetchUserReservations();
    } else if (!authLoading && !isAuthenticated) {
      console.log("MyReservationsPage useEffect: Not authenticated, setting loading to false.");
      setLoading(false);
      setReservations([]);
       setError(null);
    }
    if (!user) {
  console.warn("No user object yet");
} else if (!user.id) {
  console.warn("User object exists but missing ID");
}

  }, [authLoading, isAuthenticated, user]);

  const handleCancelClick = (reservation) => {
    setReservationToCancel(reservation);
    setShowCancelModal(true);
  };

  const confirmCancel = async () => {
    if (!reservationToCancel) return;

    try {
      const reservationId = reservationToCancel.id;
      console.log("Cancelling reservation ID:", reservationId);
      await updateReservationStatus(reservationId, 'annulée');

      setCancelMessage('Reservation cancelled successfully!');
      fetchUserReservations();
    } catch (err) {
      setCancelMessage('Failed to cancel reservation. Please try again.');
      console.error("Error cancelling reservation:", err);
    } finally {
      setShowCancelModal(false);
      setReservationToCancel(null);
      setTimeout(() => setCancelMessage(''), 3000);
    }
  };

  if (loading || authLoading) {
    console.log("MyReservationsPage: Showing LoadingSpinner.");
    return (
      <Container className="my-5 text-center">
        <LoadingSpinner />
        <p>Loading reservations...</p>
      </Container>
    );
  }

  if (error) {
    console.log("MyReservationsPage: Showing Error Alert:", error);
    return (
      <Container className="my-5">
        <Alert variant="danger" className="text-center">{error}</Alert>
      </Container>
    );
  }

  if (reservations.length === 0) {
    console.log("MyReservationsPage: Showing No Reservations Alert.");
    return (
      <Container className="my-5">
        <Alert variant="info" className="text-center">You have no reservations yet.</Alert>
      </Container>
    );
  }

  console.log("MyReservationsPage: Rendering Reservations.");
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">My Reservations</h1>
      {cancelMessage && (
        <Alert variant={cancelMessage.includes('successfully') ? 'success' : 'danger'}>
          {cancelMessage}
        </Alert>
      )}
      <Row xs={1} md={2} lg={3} className="g-4">
        {reservations.map((reservation) => (
          <Col key={reservation.id}>
            <ReservationCard
              reservation={reservation}
              carDetails={cars[reservation.id_voiture]}
              onDeleteReservation={handleCancelClick}
              isAdminView={false}
            />
          </Col>
        ))}
      </Row>

      <Modal
        show={showCancelModal}
        handleClose={() => setShowCancelModal(false)}
        title="Confirm Cancellation"
        confirmText="Yes, Cancel"
        onConfirm={confirmCancel}
      >
        <p>
          Are you sure you want to cancel this reservation for{' '}
          <strong>{cars[reservationToCancel?.id_voiture]?.marque} {cars[reservationToCancel?.id_voiture]?.modele}</strong>?
        </p>
      </Modal>
    </Container>
  );
};

export default MyReservationsPage;
