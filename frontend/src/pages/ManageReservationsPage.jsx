import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert, Form } from 'react-bootstrap';
import ReservationCard from '../components/ReservationCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import { getReservations, updateReservationStatus, getCars } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ManageReservationsPage = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [cars, setCars] = useState({}); // To map car details to reservations
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState(''); // Filter for reservation status
  const [updateMessage, setUpdateMessage] = useState('');

  // Redirect if not an admin
  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/admin'); // Redirect to admin dashboard if not authorized
    }
  }, [authLoading, isAdmin, navigate]);

  const fetchReservationsAndCars = async () => {
    try {
      setLoading(true);
      setError(null);
      setUpdateMessage('');

      // Fetch all cars first to map them by ID for easy lookup
      const carsResponse = await getCars(); // Get all cars, not just available
      const carsMap = carsResponse.data.reduce((acc, car) => {
        acc[car.id] = car;
        return acc;
      }, {});
      setCars(carsMap);

      // Fetch all reservations
      const reservationsResponse = await getReservations();
      setReservations(reservationsResponse.data);
      setFilteredReservations(reservationsResponse.data); // Initialize filtered list
    } catch (err) {
      setError("Failed to fetch reservations or car data. Please try again.");
      console.error("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchReservationsAndCars();
    }
  }, [isAdmin]);

  useEffect(() => {
    let currentReservations = [...reservations];
    if (statusFilter) {
      currentReservations = currentReservations.filter(res => res.statut.toLowerCase() === statusFilter.toLowerCase());
    }
    setFilteredReservations(currentReservations);
  }, [statusFilter, reservations]);

  const handleUpdateStatus = async (reservationId, newStatus) => {
    try {
      setUpdateMessage('');
      await updateReservationStatus(reservationId, newStatus);
      setUpdateMessage(`Reservation ${reservationId} status updated to ${newStatus} successfully!`);
      fetchReservationsAndCars(); // Re-fetch to get latest data
    } catch (err) {
      setUpdateMessage('Failed to update reservation status. Please try again.');
      console.error("Error updating reservation status:", err);
    } finally {
      setTimeout(() => setUpdateMessage(''), 3000); // Clear message after 3 seconds
    }
  };

  if (authLoading || !isAdmin) {
    return <LoadingSpinner />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Alert variant="danger" className="text-center my-5">{error}</Alert>;
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Manage Reservations</h1>

      <Row className="mb-4">
        <Col md={4}>
          <Form.Group controlId="statusFilter">
            <Form.Label>Filter by Status:</Form.Label>
            <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="en attente">Pending</option>
              <option value="validée">Approved</option>
              <option value="refusée">Rejected</option>
              <option value="annulée">Cancelled</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {updateMessage && <Alert variant={updateMessage.includes('successfully') ? 'success' : 'danger'}>{updateMessage}</Alert>}

      {filteredReservations.length === 0 ? (
        <Alert variant="info" className="text-center">No reservations found matching your criteria.</Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredReservations.map((reservation) => (
            <Col key={reservation.id}>
              <ReservationCard
                reservation={reservation}
                carDetails={cars[reservation.id_voiture]}
                isAdminView={true}
                onUpdateStatus={handleUpdateStatus}
                // onDeleteReservation for admin if needed (not explicitly requested but could be added)
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ManageReservationsPage;