import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert, Card } from 'react-bootstrap';
import ReservationCard from '../components/ReservationCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import { getReservations, updateReservationStatus, getCars } from '../services/api'; // getCars needed to fetch car details
import { useAuth } from '../contexts/AuthContext';

const MyReservationsPage = () => {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [cars, setCars] = useState({}); // To store car details mapped by ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);
  const [cancelMessage, setCancelMessage] = useState('');

  const fetchUserReservations = async () => {
    if (!user || !user.id) return;

    try {
      setLoading(true);
      setError(null);
      setCancelMessage('');

      // Fetch all cars first to map them to reservations
      const carsResponse = await getCars();
      const carsMap = carsResponse.data.reduce((acc, car) => {
        acc[car.id] = car;
        return acc;
      }, {});
      setCars(carsMap);

      // Fetch all reservations (backend doesn't have a user-specific endpoint)
      const reservationsResponse = await getReservations();
      // Filter client-side based on user ID
      const userReservations = reservationsResponse.data.filter(
        (res) => res.id_utilisateur === user.id
      );
      setReservations(userReservations);
    } catch (err) {
      console.error("Error fetching reservations or cars:", err);
      setError("Failed to load your reservations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchUserReservations();
    } else if (!authLoading && !isAuthenticated) {
      setLoading(false);
      setError("You must be logged in to view your reservations.");
    }
  }, [authLoading, isAuthenticated, user]);

  const handleCancelClick = (reservation) => {
    setReservationToCancel(reservation);
    setShowCancelModal(true);
  };

  const confirmCancel = async () => {
    if (!reservationToCancel) return;

    try {
      await updateReservationStatus(reservationToCancel.id, 'refusée'); // Or 'annulée' if backend supports it
      setCancelMessage('Reservation cancelled successfully!');
      fetchUserReservations(); // Re-fetch reservations to update status
    } catch (err) {
      setCancelMessage('Failed to cancel reservation. Please try again.');
      console.error("Error cancelling reservation:", err);
    } finally {
      setShowCancelModal(false);
      setReservationToCancel(null);
      setTimeout(() => setCancelMessage(''), 3000); // Clear message after 3 seconds
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

  if (reservations.length === 0) {
    return (
      <Container className="my-5">
        <Alert variant="info" className="text-center">You have no reservations yet.</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">My Reservations</h1>
      {cancelMessage && <Alert variant={cancelMessage.includes('successfully') ? 'success' : 'danger'}>{cancelMessage}</Alert>}
      <Row xs={1} md={2} lg={3} className="g-4">
        {reservations.map((reservation) => (
          <Col key={reservation.id}>
            <ReservationCard
              reservation={reservation}
              carDetails={cars[reservation.id_voiture]}
              onDeleteReservation={handleCancelClick}
              isAdminView={false} // Ensure client view
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
        <p>Are you sure you want to cancel this reservation for{' '}
          <strong>{cars[reservationToCancel?.id_voiture]?.marque} {cars[reservationToCancel?.id_voiture]?.modele}</strong>?
        </p>
        <p className="text-danger">This action cannot be undone.</p>
      </Modal>
    </Container>
  );
};

export default MyReservationsPage;