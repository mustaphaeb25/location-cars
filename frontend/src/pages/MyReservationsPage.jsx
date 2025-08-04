
<<<<<<< HEAD
// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Alert } from 'react-bootstrap';
// import ReservationCard from '../components/ReservationCard';
// import LoadingSpinner from '../components/LoadingSpinner';
// import Modal from '../components/Modal';
// import { getReservations, updateReservationStatus, getCars } from '../services/api';
// import { useAuth } from '../contexts/AuthContext';

// const MyReservationsPage = () => {
//   console.log("MyReservationsPage: TOP OF COMPONENT RENDER");

//   const { user, loading: authLoading, isAuthenticated } = useAuth();
//   const [reservations, setReservations] = useState([]);
//   const [cars, setCars] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [reservationToCancel, setReservationToCancel] = useState(null);
//   const [cancelMessage, setCancelMessage] = useState('');

//   console.log("MyReservationsPage: Component Rendered");
//   console.log("    - user:", user);
//   console.log("    - isAuthenticated:", isAuthenticated);
//   console.log("    - authLoading:", authLoading);

//   const fetchUserReservations = async () => {
//     if (!user || !user.id) {
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
//       setCancelMessage('');

//       // 1. Fetch cars
//       const carsResponse = await getCars();
//       const carsMap = carsResponse.data.reduce((acc, car) => {
//         acc[car.id] = car;
//         return acc;
//       }, {});
//       setCars(carsMap);

//       // 2. Fetch reservations
//       const reservationsResponse = await getReservations(user.id);
      
//       if (reservationsResponse.data && Array.isArray(reservationsResponse.data)) {
//         setReservations(reservationsResponse.data);
//       } else {
//         setReservations([]);
//       }
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       if (err.response?.status === 404) {
//         setReservations([]);
//         setError("You have no reservations yet.");
//       } else {
//         setError("Failed to load reservations. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log("MyReservationsPage useEffect:", { authLoading, isAuthenticated, user });
//     if (!authLoading && isAuthenticated && user?.id) {
//       fetchUserReservations();
//     } else if (!authLoading && !isAuthenticated) {
//       console.log("MyReservationsPage useEffect: Not authenticated, setting loading to false.");
//       setLoading(false);
//       setReservations([]);
//        setError(null);
//     }
//     if (!user) {
//   console.warn("No user object yet");
// } else if (!user.id) {
//   console.warn("User object exists but missing ID");
// }

//   }, [authLoading, isAuthenticated, user]);

//   const handleCancelClick = (reservation) => {
//     setReservationToCancel(reservation);
//     setShowCancelModal(true);
//   };

//   const confirmCancel = async () => {
//     if (!reservationToCancel) return;

//     try {
//       const reservationId = reservationToCancel.id;
//       console.log("Cancelling reservation ID:", reservationId);
//       await updateReservationStatus(reservationId, 'annulée');

//       setCancelMessage('Reservation cancelled successfully!');
//       fetchUserReservations();
//     } catch (err) {
//       setCancelMessage('Failed to cancel reservation. Please try again.');
//       console.error("Error cancelling reservation:", err);
//     } finally {
//       setShowCancelModal(false);
//       setReservationToCancel(null);
//       setTimeout(() => setCancelMessage(''), 3000);
//     }
//   };

//   if (loading || authLoading) {
//     console.log("MyReservationsPage: Showing LoadingSpinner.");
//     return (
//       <Container className="my-5 text-center">
//         <LoadingSpinner />
//         <p>Loading reservations...</p>
//       </Container>
//     );
//   }

//   if (error) {
//     console.log("MyReservationsPage: Showing Error Alert:", error);
//     return (
//       <Container className="my-5">
//         <Alert variant="danger" className="text-center">{error}</Alert>
//       </Container>
//     );
//   }

//   if (reservations.length === 0) {
//     console.log("MyReservationsPage: Showing No Reservations Alert.");
//     return (
//       <Container className="my-5">
//         <Alert variant="info" className="text-center">You have no reservations yet.</Alert>
//       </Container>
//     );
//   }

//   console.log("MyReservationsPage: Rendering Reservations.");
//   return (
//     <Container className="my-5">
//       <h1 className="text-center mb-4">My Reservations</h1>
//       {cancelMessage && (
//         <Alert variant={cancelMessage.includes('successfully') ? 'success' : 'danger'}>
//           {cancelMessage}
//         </Alert>
//       )}
//       <Row xs={1} md={2} lg={3} className="g-4">
//         {reservations.map((reservation) => (
//           <Col key={reservation.id}>
//             <ReservationCard
//               reservation={reservation}
//               carDetails={cars[reservation.id_voiture]}
//               onDeleteReservation={handleCancelClick}
//               isAdminView={false}
//             />
//           </Col>
//         ))}
//       </Row>

//       <Modal
//         show={showCancelModal}
//         handleClose={() => setShowCancelModal(false)}
//         title="Confirm Cancellation"
//         confirmText="Yes, Cancel"
//         onConfirm={confirmCancel}
//       >
//         <p>
//           Are you sure you want to cancel this reservation for{' '}
//           <strong>{cars[reservationToCancel?.id_voiture]?.marque} {cars[reservationToCancel?.id_voiture]?.modele}</strong>?
//         </p>
//       </Modal>
//     </Container>
//   );
// };

// export default MyReservationsPage;
import React, { useEffect, useState } from 'react';
import { Container, Alert, Button, Badge } from 'react-bootstrap';
=======
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
>>>>>>> 501744de934533a45971193d0c974f2265742b3c
import ReservationCard from '../components/ReservationCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import { getReservations, updateReservationStatus, getCars } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FaArrowLeft, FaCalendarAlt, FaTimes, FaCar } from 'react-icons/fa';
import { format } from 'date-fns';
import './MyReservationsPage.css';

const MyReservationsPage = () => {
  console.log("MyReservationsPage: TOP OF COMPONENT RENDER");

  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { darkMode } = useTheme();
  const [reservations, setReservations] = useState([]);
  const [cars, setCars] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);
  const [cancelMessage, setCancelMessage] = useState('');
  const [cancelLoading, setCancelLoading] = useState(false);

  console.log("MyReservationsPage: Component Rendered");
  console.log("    - user:", user);
  console.log("    - isAuthenticated:", isAuthenticated);
  console.log("    - authLoading:", authLoading);

  const fetchUserReservations = async () => {
<<<<<<< HEAD
    if (!user?.id) {
=======
    if (!user || !user.id) {
>>>>>>> 501744de934533a45971193d0c974f2265742b3c
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setCancelMessage('');

<<<<<<< HEAD
=======
      // 1. Fetch cars
>>>>>>> 501744de934533a45971193d0c974f2265742b3c
      const carsResponse = await getCars();
      const carsMap = carsResponse.data.reduce((acc, car) => {
        acc[car.id] = car;
        return acc;
      }, {});
      setCars(carsMap);

<<<<<<< HEAD
      const reservationsResponse = await getReservations(user.id);
      setReservations(reservationsResponse.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.response?.status === 404 
        ? "You have no reservations yet." 
        : "Failed to load reservations. Please try again."
      );
      setReservations([]);
=======
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
>>>>>>> 501744de934533a45971193d0c974f2265742b3c
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
<<<<<<< HEAD
    if (!authLoading && isAuthenticated && user?.id) {
      fetchUserReservations();
    } else if (!authLoading) {
      setLoading(false);
      setReservations([]);
      setError(null);
=======
    console.log("MyReservationsPage useEffect:", { authLoading, isAuthenticated, user });
    if (!authLoading && isAuthenticated && user?.id) {
      fetchUserReservations();
    } else if (!authLoading && !isAuthenticated) {
      console.log("MyReservationsPage useEffect: Not authenticated, setting loading to false.");
      setLoading(false);
      setReservations([]);
       setError(null);
>>>>>>> 501744de934533a45971193d0c974f2265742b3c
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
<<<<<<< HEAD
      setCancelLoading(true);
      await updateReservationStatus(reservationToCancel.id, 'annulée');
=======
      const reservationId = reservationToCancel.id;
      console.log("Cancelling reservation ID:", reservationId);
      await updateReservationStatus(reservationId, 'annulée');

>>>>>>> 501744de934533a45971193d0c974f2265742b3c
      setCancelMessage('Reservation cancelled successfully!');
      fetchUserReservations();
    } catch (err) {
      setCancelMessage('Failed to cancel reservation. Please try again.');
      console.error("Error cancelling reservation:", err);
    } finally {
      setCancelLoading(false);
      setShowCancelModal(false);
      setReservationToCancel(null);
      setTimeout(() => setCancelMessage(''), 3000);
    }
  };

  if (loading || authLoading) {
<<<<<<< HEAD
    return (
      <div className={`reservations-loading ${darkMode ? 'dark-mode' : ''}`}>
        <LoadingSpinner />
        <p>Loading your reservations...</p>
      </div>
=======
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
>>>>>>> 501744de934533a45971193d0c974f2265742b3c
    );
  }

  console.log("MyReservationsPage: Rendering Reservations.");
  return (
<<<<<<< HEAD
    <div className={`my-reservations-page ${darkMode ? 'dark-mode' : ''}`}>
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Button 
            variant="outline-secondary" 
            onClick={() => window.history.back()}
            className="back-button"
          >
            <FaArrowLeft className="me-2" />
            Back
          </Button>
        </div>

        <div className="page-header text-center mb-5">
          <h1 className="page-title">
            <FaCalendarAlt className="me-2" />
            My Reservations
          </h1>
          <p className="page-subtitle">View and manage your upcoming bookings</p>
        </div>

        {error && (
          <Alert variant="info" className="text-center animate__fadeIn">
            {error}
          </Alert>
        )}

        {cancelMessage && (
          <Alert variant={cancelMessage.includes('successfully') ? 'success' : 'danger'} className="animate__fadeIn">
            {cancelMessage}
          </Alert>
        )}

        {reservations.length === 0 ? (
          <div className="no-reservations-card text-center p-5">
            <FaCar size={48} className="mb-3 text-muted" />
            <h4>No reservations found</h4>
            <p className="text-muted">You haven't made any reservations yet</p>
            <Button variant="primary" href="/cars">
              Browse Available Cars
            </Button>
          </div>
        ) : (
          <div className="reservations-grid">
            {reservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                carDetails={cars[reservation.id_voiture]}
                onDeleteReservation={handleCancelClick}
                isAdminView={false}
              />
            ))}
          </div>
        )}

        <Modal
          show={showCancelModal}
          handleClose={() => setShowCancelModal(false)}
          title="Confirm Cancellation"
          confirmText={cancelLoading ? "Cancelling..." : "Confirm Cancellation"}
          onConfirm={confirmCancel}
          confirmVariant="danger"
          showCancelButton={!cancelLoading}
          disabled={cancelLoading}
        >
          <div className="text-center">
            <FaTimes size={48} className="text-danger mb-3" />
            <h5>Cancel this reservation?</h5>
            <p>
              Are you sure you want to cancel your booking for the{' '}
              <strong>{cars[reservationToCancel?.id_voiture]?.marque} {cars[reservationToCancel?.id_voiture]?.modele}</strong>?
            </p>
          </div>
        </Modal>
      </Container>
    </div>
=======
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
>>>>>>> 501744de934533a45971193d0c974f2265742b3c
  );
};

export default MyReservationsPage;
