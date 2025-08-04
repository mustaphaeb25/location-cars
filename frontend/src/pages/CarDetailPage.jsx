
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Container, Row, Col, Image, Button, Form, Alert, Card } from 'react-bootstrap';
// import { getCarById, createReservation } from '../services/api';
// import LoadingSpinner from '../components/LoadingSpinner';
// import { useAuth } from '../contexts/AuthContext';
// import Modal from '../components/Modal';
// import { FaCalendarAlt, FaDollarSign, FaInfoCircle } from 'react-icons/fa';
// import { Link } from 'react-router-dom'; 

// const CarDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user, isAuthenticated, loading: authLoading } = useAuth();
//   const [car, setCar] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [reservationDates, setReservationDates] = useState({
//     startDate: '',
//     endDate: '',
//   });
//   const [formError, setFormError] = useState('');
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [reservationSuccess, setReservationSuccess] = useState(false);
//   const [reservationDetails, setReservationDetails] = useState(null);

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         setLoading(true);
//         const response = await getCarById(id);
//         setCar(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch car details. Please try again later.");
//         setLoading(false);
//         console.error("Error fetching car details:", err);
//       }
//     };
//     fetchCar();
//   }, [id]);

//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
//     setReservationDates((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleReservation = async (e) => {
//     e.preventDefault();
//     setFormError('');
//     setReservationSuccess(false);

//     if (!isAuthenticated) {
//       setFormError('You must be logged in to make a reservation.');
//       return;
//     }

//     if (!reservationDates.startDate || !reservationDates.endDate) {
//       setFormError('Please select both start and end dates.');
//       return;
//     }

//     const startDate = new Date(reservationDates.startDate);
//     const endDate = new Date(reservationDates.endDate);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     if (startDate >= endDate) {
//       setFormError('End date must be after the start date.');
//       return;
//     }

//     if (startDate < today) {
//       setFormError('Start date cannot be in the past.');
//       return;
//     }

//     try {
//       const response = await createReservation({
//         id_utilisateur: user.id,
//         id_voiture: id,
//         date_début: reservationDates.startDate,
//         date_fin: reservationDates.endDate,
//         statut: 'en attente',
//       });
      
//       setReservationDetails({
//          id: response.data.id
//       });
      
//       setReservationSuccess(true);
      
//       setShowConfirmationModal(true);
//     } catch (err) {
//       setFormError(
//         err.response?.data?.error || 
//         err.response?.data?.erreur || 
//         'Failed to create reservation. Please try again.'
        
//       );
//       console.error("Reservation error:", err);
//     }
//   };

//   if (loading || authLoading) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     return (
//       <Container className="my-5">
//         <Alert variant="danger" className="text-center">{error}</Alert>
//       </Container>
//     );
//   }

//   if (!car) {
//     return (
//       <Container className="my-5">
//         <Alert variant="info" className="text-center">Car not found.</Alert>
//       </Container>
//     );
//   }

//   const imageUrl = car.image_url 
//     ? (car.image_url.startsWith('http') 
//         ? car.image_url 
//         : `http://localhost:3000${car.image_url}`)
//     : 'https://via.placeholder.com/600x400?text=No+Image';

//   return (
//     <Container className="my-5 fade-in">
//       <Row>
//         <Col md={7}>
//           <Card className="shadow-sm">
//             <Card.Body>
//               <Image src={imageUrl} alt={`${car.marque} ${car.modele}`} fluid rounded className="mb-4" />
//               <h1 className="mb-3">{car.marque} {car.modele}</h1>
//               <p className="lead mb-3">{car.description}</p>
//               <hr />
//               <p className="d-flex align-items-center">
//                 <FaDollarSign className="me-2" /> 
//                 <strong>Price per Day:</strong> ${car.prix_par_jour}
//               </p>
//               <p className="d-flex align-items-center">
//                 <FaInfoCircle className="me-2" /> 
//                 <strong>Status:</strong> 
//                 <span className={`badge ${car.statut === 'disponible' ? 'bg-success' : 'bg-danger'}`}>
//                   {car.statut || 'N/A'}
//                 </span>
//               </p>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={5}>
//           <Card className="shadow-sm p-4">
//             <h2 className="mb-4">Book This Car</h2>
//             {!isAuthenticated && (
//               <Alert variant="info">
//                 Please <Link to="/login">log in</Link> to make a reservation.
//               </Alert>
//             )}
//             <Form onSubmit={handleReservation}>
//               <Form.Group className="mb-3" controlId="startDate">
//                 <Form.Label><FaCalendarAlt className="me-2" />Start Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   name="startDate"
//                   value={reservationDates.startDate}
//                   onChange={handleDateChange}
//                   min={new Date().toISOString().split('T')[0]}
//                   required
//                   disabled={!isAuthenticated || car.statut !== 'disponible'}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="endDate">
//                 <Form.Label><FaCalendarAlt className="me-2" />End Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   name="endDate"
//                   value={reservationDates.endDate}
//                   onChange={handleDateChange}
//                   min={reservationDates.startDate || new Date().toISOString().split('T')[0]}
//                   required
//                   disabled={!isAuthenticated || car.statut !== 'disponible'}
//                 />
//               </Form.Group>

//               {formError && <Alert variant="danger">{formError}</Alert>}

//               <Button
//                 variant="primary"
//                 type="submit"
//                 className="w-100"
//                 disabled={!isAuthenticated || car.statut !== 'disponible'}
//               >
//                 {car.statut === 'disponible' ? 'Confirm Reservation' : 'Car Not Available'}
//               </Button>
//             </Form>
//           </Card>
//         </Col>
//       </Row>

//       <Modal
//         show={showConfirmationModal}
//         handleClose={() => setShowConfirmationModal(false)}
//         title="Reservation Confirmation"
//         showConfirmButton={false}
//       >
//         {reservationSuccess ? (
//           <div>
//             <Alert variant="success">
//               Your reservation has been successfully placed!
//             </Alert>
//             <p><strong>Reservation ID:</strong> {reservationDetails?.reservationId || reservationDetails?.id || 'N/A'}</p>
//             <p>You can view your reservations in the "My Reservations" section.</p>
//             <Button variant="primary" onClick={() => navigate('/my-reservations')}>
//               Go to My Reservations
//             </Button>
//           </div>
//         ) : (
//           <Alert variant="danger">
//             There was an issue with your reservation. Please try again.
//           </Alert>
//         )}
//       </Modal>
//     </Container>
//   );
// };

// export default CarDetailPage;


// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Container, Row, Col, Button, Alert, Badge } from 'react-bootstrap';
// import { getCarById, createReservation } from '../services/api';
// import LoadingSpinner from '../components/LoadingSpinner';
// import { useAuth } from '../contexts/AuthContext';
// import Modal from '../components/Modal';
// import { 
//   FaCalendarAlt, 
//   FaDollarSign, 
//   FaGasPump, 
//   FaCar, 
//   FaCogs, 
//   FaUsers,
//   FaStar,
//   FaCheckCircle
// } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import { useTheme } from '../contexts/ThemeContext';

// const CarDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user, isAuthenticated, loading: authLoading } = useAuth();
//   const { darkMode } = useTheme();
//   const [car, setCar] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [reservationDates, setReservationDates] = useState({
//     startDate: '',
//     endDate: '',
//   });
//   const [formError, setFormError] = useState('');
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [reservationSuccess, setReservationSuccess] = useState(false);
//   const [reservationDetails, setReservationDetails] = useState(null);
//   const [activeImage, setActiveImage] = useState(0);
  
//   // Sample images - replace with your actual image handling
//   const carImages = [
//     car?.image_url ? (car.image_url.startsWith('http') ? car.image_url : `http://localhost:3000${car.image_url}`) : 'https://via.placeholder.com/800x500?text=No+Image',
//     'https://via.placeholder.com/800x500?text=Interior',
//     'https://via.placeholder.com/800x500?text=Engine',
//     'https://via.placeholder.com/800x500?text=Dashboard'
//   ];

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         setLoading(true);
//         const response = await getCarById(id);
//         setCar(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch car details. Please try again later.");
//         setLoading(false);
//         console.error("Error fetching car details:", err);
//       }
//     };
//     fetchCar();
//   }, [id]);

//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
//     setReservationDates((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleReservation = async (e) => {
//     e.preventDefault();
//     setFormError('');
//     setReservationSuccess(false);

//     if (!isAuthenticated) {
//       setFormError('You must be logged in to make a reservation.');
//       return;
//     }

//     if (!reservationDates.startDate || !reservationDates.endDate) {
//       setFormError('Please select both start and end dates.');
//       return;
//     }

//     const startDate = new Date(reservationDates.startDate);
//     const endDate = new Date(reservationDates.endDate);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     if (startDate >= endDate) {
//       setFormError('End date must be after the start date.');
//       return;
//     }

//     if (startDate < today) {
//       setFormError('Start date cannot be in the past.');
//       return;
//     }

//     try {
//       const response = await createReservation({
//         id_utilisateur: user.id,
//         id_voiture: id,
//         date_début: reservationDates.startDate,
//         date_fin: reservationDates.endDate,
//         statut: 'en attente',
//       });
      
//       setReservationDetails({
//         id: response.data.id,
//         totalPrice: calculateTotalPrice(reservationDates.startDate, reservationDates.endDate, car.prix_par_jour)
//       });
      
//       setReservationSuccess(true);
//       setShowConfirmationModal(true);
//     } catch (err) {
//       setFormError(
//         err.response?.data?.error || 
//         err.response?.data?.erreur || 
//         'Failed to create reservation. Please try again.'
//       );
//       console.error("Reservation error:", err);
//     }
//   };

//   const calculateTotalPrice = (startDate, endDate, dailyPrice) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
//     return days * dailyPrice;
//   };

//   if (loading || authLoading) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     return (
//       <Container className="my-5">
//         <Alert variant="danger" className="text-center">{error}</Alert>
//       </Container>
//     );
//   }

//   if (!car) {
//     return (
//       <Container className="my-5">
//         <Alert variant="info" className="text-center">Car not found.</Alert>
//       </Container>
//     );
//   }

//   return (
//     <div className={`car-detail-page ${darkMode ? 'dark-mode' : ''}`}>
//       <Container className="py-5">
//         {/* Back Button */}
//         <Button 
//           variant="outline-secondary" 
//           onClick={() => navigate(-1)} 
//           className="mb-4 back-button"
//         >
//           ← Back to Cars
//         </Button>

//         <Row className="g-4">
//           {/* Car Images Column */}
//           <Col lg={7}>
//             <div className="car-gallery">
//               <div className="main-image-container">
//                 <img 
//                   src={carImages[activeImage]} 
//                   alt={`${car.marque} ${car.modele}`} 
//                   className="main-image"
//                 />
//               </div>
              
//               {carImages.length > 1 && (
//                 <div className="thumbnail-container">
//                   {carImages.map((img, index) => (
//                     <div 
//                       key={index}
//                       className={`thumbnail ${index === activeImage ? 'active' : ''}`}
//                       onClick={() => setActiveImage(index)}
//                     >
//                       <img src={img} alt={`Thumbnail ${index + 1}`} />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Car Details Section */}
//             <div className="car-details-section mt-4">
//               <div className="d-flex justify-content-between align-items-start">
//                 <div>
//                   <h1 className="car-title">{car.marque} {car.modele}</h1>
//                   <div className="car-subtitle">{car.annee} • {car.type_vehicule}</div>
//                 </div>
//                 <Badge pill bg={car.statut === 'disponible' ? 'success' : 'danger'} className="status-badge">
//                   {car.statut === 'disponible' ? 'Available' : 'Unavailable'}
//                 </Badge>
//               </div>

//               <div className="price-display mt-3">
//                 <span className="price">${car.prix_par_jour}</span>
//                 <span className="price-label"> / day</span>
//               </div>

//               <p className="car-description mt-4">{car.description}</p>

//               <div className="features-section mt-5">
//                 <h3 className="section-title">Features</h3>
//                 <Row className="g-3 mt-3">
//                   <Col xs={6} md={4}>
//                     <div className="feature-item">
//                       <FaCar className="feature-icon" />
//                       <span>{car.type_vehicule}</span>
//                     </div>
//                   </Col>
//                   <Col xs={6} md={4}>
//                     <div className="feature-item">
//                       <FaGasPump className="feature-icon" />
//                       <span>{car.type_carburant}</span>
//                     </div>
//                   </Col>
//                   <Col xs={6} md={4}>
//                     <div className="feature-item">
//                       <FaCogs className="feature-icon" />
//                       <span>{car.boite_vitesse}</span>
//                     </div>
//                   </Col>
//                   <Col xs={6} md={4}>
//                     <div className="feature-item">
//                       <FaUsers className="feature-icon" />
//                       <span>{car.nombre_places} seats</span>
//                     </div>
//                   </Col>
//                   <Col xs={6} md={4}>
//                     <div className="feature-item">
//                       <FaStar className="feature-icon" />
//                       <span>Premium</span>
//                     </div>
//                   </Col>
//                   <Col xs={6} md={4}>
//                     <div className="feature-item">
//                       <FaCheckCircle className="feature-icon" />
//                       <span>Insurance Included</span>
//                     </div>
//                   </Col>
//                 </Row>
//               </div>
//             </div>
//           </Col>

//           {/* Booking Column */}
//           <Col lg={5}>
//             <div className="booking-card">
//               <h2 className="booking-title">Reserve This Vehicle</h2>
              
//               {!isAuthenticated && (
//                 <Alert variant="info" className="auth-alert">
//                   Please <Link to="/login">log in</Link> to make a reservation.
//                 </Alert>
//               )}

//               <form onSubmit={handleReservation}>
//                 <div className="date-pickers">
//                   <div className="form-group">
//                     <label htmlFor="startDate">
//                       <FaCalendarAlt className="me-2" />
//                       Pick-Up Date
//                     </label>
//                     <input
//                       type="date"
//                       id="startDate"
//                       name="startDate"
//                       value={reservationDates.startDate}
//                       onChange={handleDateChange}
//                       min={new Date().toISOString().split('T')[0]}
//                       required
//                       disabled={!isAuthenticated || car.statut !== 'disponible'}
//                       className="form-control"
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="endDate">
//                       <FaCalendarAlt className="me-2" />
//                       Return Date
//                     </label>
//                     <input
//                       type="date"
//                       id="endDate"
//                       name="endDate"
//                       value={reservationDates.endDate}
//                       onChange={handleDateChange}
//                       min={reservationDates.startDate || new Date().toISOString().split('T')[0]}
//                       required
//                       disabled={!isAuthenticated || car.statut !== 'disponible' || !reservationDates.startDate}
//                       className="form-control"
//                     />
//                   </div>
//                 </div>

//                 {reservationDates.startDate && reservationDates.endDate && (
//                   <div className="price-summary mt-4">
//                     <div className="price-row">
//                       <span>${car.prix_par_jour} x {calculateTotalPrice(reservationDates.startDate, reservationDates.endDate, 1)} days</span>
//                       <span>${calculateTotalPrice(reservationDates.startDate, reservationDates.endDate, car.prix_par_jour)}</span>
//                     </div>
//                     <div className="price-row total">
//                       <span>Total</span>
//                       <span>${calculateTotalPrice(reservationDates.startDate, reservationDates.endDate, car.prix_par_jour)}</span>
//                     </div>
//                   </div>
//                 )}

//                 {formError && <Alert variant="danger" className="mt-3">{formError}</Alert>}

//                 <Button
//                   variant="primary"
//                   type="submit"
//                   className="w-100 mt-4 reserve-btn"
//                   disabled={!isAuthenticated || car.statut !== 'disponible'}
//                 >
//                   {car.statut === 'disponible' ? 'Reserve Now' : 'Not Available'}
//                 </Button>
//               </form>
//             </div>
//           </Col>
//         </Row>
//       </Container>

//       <Modal
//         show={showConfirmationModal}
//         handleClose={() => setShowConfirmationModal(false)}
//         title="Reservation Confirmed"
//         showConfirmButton={false}
//       >
//         {reservationSuccess ? (
//           <div className="confirmation-content">
//             <div className="confirmation-icon">
//               <FaCheckCircle />
//             </div>
//             <h4 className="confirmation-title">Your reservation is confirmed!</h4>
//             <div className="confirmation-details">
//               <p><strong>Reservation ID:</strong> {reservationDetails?.id || 'N/A'}</p>
//               <p><strong>Total:</strong> ${reservationDetails?.totalPrice || car.prix_par_jour}</p>
//               <p><strong>Vehicle:</strong> {car.marque} {car.modele}</p>
//             </div>
//             <div className="confirmation-actions">
//               <Button 
//                 variant="outline-secondary" 
//                 onClick={() => setShowConfirmationModal(false)}
//                 className="me-2"
//               >
//                 Continue Browsing
//               </Button>
//               <Button 
//                 variant="primary" 
//                 onClick={() => navigate('/my-reservations')}
//               >
//                 View My Reservations
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <Alert variant="danger">
//             There was an issue with your reservation. Please try again.
//           </Alert>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default CarDetailPage;


// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Container, Row, Col, Button, Alert, Badge } from 'react-bootstrap';
// import { getCarById, createReservation } from '../services/api';
// import LoadingSpinner from '../components/LoadingSpinner';
// import { useAuth } from '../contexts/AuthContext';
// import Modal from '../components/Modal';
// import { 
//   FaCalendarAlt, 
//   FaDollarSign, 
//   FaGasPump, 
//   FaCar, 
//   FaCogs, 
//   FaUsers,
//   FaStar,
//   FaCheckCircle,
//   FaChevronLeft
// } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import { useTheme } from '../contexts/ThemeContext';

// const CarDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user, isAuthenticated, loading: authLoading } = useAuth();
//   const { darkMode } = useTheme();
//   const [car, setCar] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [reservationDates, setReservationDates] = useState({
//     startDate: '',
//     endDate: '',
//   });
//   const [formError, setFormError] = useState('');
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [reservationSuccess, setReservationSuccess] = useState(false);
//   const [reservationDetails, setReservationDetails] = useState(null);

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         setLoading(true);
//         const response = await getCarById(id);
//         setCar(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch car details. Please try again later.");
//         setLoading(false);
//         console.error("Error fetching car details:", err);
//       }
//     };
//     fetchCar();
//   }, [id]);

//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
//     setReservationDates((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleReservation = async (e) => {
//     e.preventDefault();
//     setFormError('');
//     setReservationSuccess(false);

//     if (!isAuthenticated) {
//       setFormError('You must be logged in to make a reservation.');
//       return;
//     }

//     if (!reservationDates.startDate || !reservationDates.endDate) {
//       setFormError('Please select both start and end dates.');
//       return;
//     }

//     const startDate = new Date(reservationDates.startDate);
//     const endDate = new Date(reservationDates.endDate);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     if (startDate >= endDate) {
//       setFormError('End date must be after the start date.');
//       return;
//     }

//     if (startDate < today) {
//       setFormError('Start date cannot be in the past.');
//       return;
//     }

//     try {
//       const response = await createReservation({
//         id_utilisateur: user.id,
//         id_voiture: id,
//         date_début: reservationDates.startDate,
//         date_fin: reservationDates.endDate,
//         statut: 'en attente',
//       });
      
//       setReservationDetails({
//         id: response.data.id,
//         totalPrice: calculateTotalPrice(reservationDates.startDate, reservationDates.endDate, car.prix_par_jour)
//       });
      
//       setReservationSuccess(true);
//       setShowConfirmationModal(true);
//     } catch (err) {
//       setFormError(
//         err.response?.data?.error || 
//         err.response?.data?.erreur || 
//         'Failed to create reservation. Please try again.'
//       );
//       console.error("Reservation error:", err);
//     }
//   };

//   const calculateTotalPrice = (startDate, endDate, dailyPrice) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
//     return days * dailyPrice;
//   };

//   if (loading || authLoading) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     return (
//       <Container className="my-5">
//         <Alert variant="danger" className="text-center">{error}</Alert>
//       </Container>
//     );
//   }

//   if (!car) {
//     return (
//       <Container className="my-5">
//         <Alert variant="info" className="text-center">Car not found.</Alert>
//       </Container>
//     );
//   }

//   const imageUrl = car.image_url 
//     ? (car.image_url.startsWith('http') 
//         ? car.image_url 
//         : `http://localhost:3000${car.image_url}`)
//     : 'https://via.placeholder.com/800x500?text=No+Image';

//   return (
//     <div className={`car-detail-page ${darkMode ? 'dark-mode' : ''}`}>
//       <Container className="py-5">
//         <Button 
//           variant="outline-secondary" 
//           onClick={() => navigate(-1)} 
//           className="mb-4 back-button"
//         >
//           <FaChevronLeft className="me-1" /> Back to Cars
//         </Button>

//         <Row className="g-4">
//           {/* Car Images Column */}
//           <Col lg={7}>
//             <div className="main-image-container">
//               <img 
//                 src={imageUrl} 
//                 alt={`${car.marque} ${car.modele}`} 
//                 className="main-image"
//                 onError={(e) => {
//                   e.target.src = 'https://via.placeholder.com/800x500?text=Image+Not+Available';
//                 }}
//               />
//             </div>

//             <div className="car-details-section mt-4">
//               <div className="d-flex justify-content-between align-items-start">
//                 <div>
//                   <h1 className="car-title">{car.marque} {car.modele}</h1>
//                   <div className="car-subtitle">{car.annee} • {car.type_vehicule}</div>
//                 </div>
//                 <Badge pill bg={car.statut === 'disponible' ? 'success' : 'danger'} className="status-badge">
//                   {car.statut === 'disponible' ? 'Available' : 'Unavailable'}
//                 </Badge>
//               </div>

//               <div className="price-display mt-3">
//                 <span className="price">${car.prix_par_jour}</span>
//                 <span className="price-label"> / day</span>
//               </div>

//               <p className="car-description mt-4">{car.description}</p>

//               <div className="features-section mt-5">
//                 <h3 className="section-title">Features</h3>
//                 <Row className="g-3 mt-3">
//                   <Col xs={6} md={4}>
//                     <div className="feature-item">
//                       <FaCar className="feature-icon" />
//                       <span>{car.type_vehicule}</span>
//                     </div>
//                   </Col>
//                   <Col xs={6} md={4}>
//                     <div className="feature-item">
//                       <FaGasPump className="feature-icon" />
//                       <span>{car.type_carburant}</span>
//                     </div>
//                   </Col>
//                   <Col xs={6} md={4}>
//                     <div className="feature-item">
//                       <FaCogs className="feature-icon" />
//                       <span>{car.boite_vitesse}</span>
//                     </div>
//                   </Col>
//                   <Col xs={6} md={4}>
//                     <div className="feature-item">
//                       <FaUsers className="feature-icon" />
//                       <span>{car.nombre_places} seats</span>
//                     </div>
//                   </Col>
//                   <Col xs={6} md={4}>
//                     <div className="feature-item">
//                       <FaStar className="feature-icon" />
//                       <span>Premium</span>
//                     </div>
//                   </Col>
//                   <Col xs={6} md={4}>
//                     <div className="feature-item">
//                       <FaCheckCircle className="feature-icon" />
//                       <span>Insurance Included</span>
//                     </div>
//                   </Col>
//                 </Row>
//               </div>
//             </div>
//           </Col>

//           {/* Booking Column */}
//           <Col lg={5}>
//             <div className="booking-card">
//               <h2 className="booking-title">Reserve This Vehicle</h2>
              
//               {!isAuthenticated && (
//                 <Alert variant="info" className="auth-alert">
//                   Please <Link to="/login">log in</Link> to make a reservation.
//                 </Alert>
//               )}

//               <form onSubmit={handleReservation}>
//                 <div className="date-pickers">
//                   <div className="form-group">
//                     <label htmlFor="startDate">
//                       <FaCalendarAlt className="me-2" />
//                       Pick-Up Date
//                     </label>
//                     <input
//                       type="date"
//                       id="startDate"
//                       name="startDate"
//                       value={reservationDates.startDate}
//                       onChange={handleDateChange}
//                       min={new Date().toISOString().split('T')[0]}
//                       required
//                       disabled={!isAuthenticated || car.statut !== 'disponible'}
//                       className="form-control"
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="endDate">
//                       <FaCalendarAlt className="me-2" />
//                       Return Date
//                     </label>
//                     <input
//                       type="date"
//                       id="endDate"
//                       name="endDate"
//                       value={reservationDates.endDate}
//                       onChange={handleDateChange}
//                       min={reservationDates.startDate || new Date().toISOString().split('T')[0]}
//                       required
//                       disabled={!isAuthenticated || car.statut !== 'disponible' || !reservationDates.startDate}
//                       className="form-control"
//                     />
//                   </div>
//                 </div>

//                 {reservationDates.startDate && reservationDates.endDate && (
//                   <div className="price-summary mt-4">
//                     <div className="price-row">
//                       <span>${car.prix_par_jour} x {calculateTotalPrice(reservationDates.startDate, reservationDates.endDate, 1)} days</span>
//                       <span>${calculateTotalPrice(reservationDates.startDate, reservationDates.endDate, car.prix_par_jour)}</span>
//                     </div>
//                     <div className="price-row total">
//                       <span>Total</span>
//                       <span>${calculateTotalPrice(reservationDates.startDate, reservationDates.endDate, car.prix_par_jour)}</span>
//                     </div>
//                   </div>
//                 )}

//                 {formError && <Alert variant="danger" className="mt-3">{formError}</Alert>}

//                 <Button
//                   variant="primary"
//                   type="submit"
//                   className="w-100 mt-4 reserve-btn"
//                   disabled={!isAuthenticated || car.statut !== 'disponible'}
//                 >
//                   {car.statut === 'disponible' ? 'Reserve Now' : 'Not Available'}
//                 </Button>
//               </form>
//             </div>
//           </Col>
//         </Row>
//       </Container>

//       <Modal
//         show={showConfirmationModal}
//         handleClose={() => setShowConfirmationModal(false)}
//         title="Reservation Confirmed"
//         showConfirmButton={false}
//       >
//         {reservationSuccess ? (
//           <div className="confirmation-content">
//             <div className="confirmation-icon">
//               <FaCheckCircle />
//             </div>
//             <h4 className="confirmation-title">Your reservation is confirmed!</h4>
//             <div className="confirmation-details">
//               <p><strong>Reservation ID:</strong> {reservationDetails?.id || 'N/A'}</p>
//               <p><strong>Total:</strong> ${reservationDetails?.totalPrice || car.prix_par_jour}</p>
//               <p><strong>Vehicle:</strong> {car.marque} {car.modele}</p>
//             </div>
//             <div className="confirmation-actions">
//               <Button 
//                 variant="outline-secondary" 
//                 onClick={() => setShowConfirmationModal(false)}
//                 className="me-2"
//               >
//                 Continue Browsing
//               </Button>
//               <Button 
//                 variant="primary" 
//                 onClick={() => navigate('/my-reservations')}
//               >
//                 View My Reservations
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <Alert variant="danger">
//             There was an issue with your reservation. Please try again.
//           </Alert>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default CarDetailPage;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Alert, Badge } from 'react-bootstrap';
import { getCarById, createReservation } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/Modal';
import { 
  FaCalendarAlt, 
  FaDollarSign, 
  FaGasPump, 
  FaCar, 
  FaCogs, 
  FaUsers,
  FaStar,
  FaCheckCircle,
  FaChevronLeft
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { darkMode } = useTheme();
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate >= endDate) {
      setFormError('End date must be after the start date.');
      return;
    }

    if (startDate < today) {
      setFormError('Start date cannot be in the past.');
      return;
    }

    try {
      const response = await createReservation({
        id_utilisateur: user.id,
        id_voiture: id,
        date_début: reservationDates.startDate,
        date_fin: reservationDates.endDate,
        statut: 'en attente',
      });
      
      setReservationDetails({
        id: response.data.id,
        totalPrice: calculateTotalPrice(reservationDates.startDate, reservationDates.endDate, car.prix_par_jour)
      });
      
      setReservationSuccess(true);
      setShowConfirmationModal(true);
    } catch (err) {
      setFormError(
        err.response?.data?.error || 
        err.response?.data?.erreur || 
        'Failed to create reservation. Please try again.'
      );
      console.error("Reservation error:", err);
    }
  };

  const calculateTotalPrice = (startDate, endDate, dailyPrice) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return days * dailyPrice;
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

  const imageUrl = car.image_url 
    ? (car.image_url.startsWith('http') 
        ? car.image_url 
        : `http://localhost:3000${car.image_url}`)
    : 'https://via.placeholder.com/800x500?text=No+Image';

  return (
    <div className={`car-detail-page ${darkMode ? 'dark-mode' : ''}`}>
      <Container className="py-5">
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate(-1)} 
          className="mb-4 back-button"
        >
          <FaChevronLeft className="me-1" /> Back to Cars
        </Button>

        <Row className="g-4">
          {/* Car Images Column */}
          <Col lg={7}>
            <div className="main-image-container">
              <img 
                src={imageUrl} 
                alt={`${car.marque} ${car.modele}`} 
                className="main-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x500?text=Image+Not+Available';
                }}
              />
            </div>

            <div className="car-details-section mt-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h1 className="car-title">{car.marque} {car.modele}</h1>
                  <div className="car-subtitle">{car.annee} • {car.type_vehicule}</div>
                </div>
                <Badge pill bg={car.statut === 'disponible' ? 'success' : 'danger'} className="status-badge">
                  {car.statut === 'disponible' ? 'Available' : 'Unavailable'}
                </Badge>
              </div>

              <div className="price-display mt-3">
                <span className="price">${car.prix_par_jour}</span>
                <span className="price-label"> / day</span>
              </div>

              <p className="car-description mt-4">{car.description}</p>

              <div className="features-section mt-5">
                <h3 className="section-title">Features</h3>
                <Row className="g-3 mt-3">
                  <Col xs={6} md={4}>
                    <div className="feature-item">
                      <FaCar className="feature-icon" />
                      <span>{car.type_vehicule}</span>
                    </div>
                  </Col>
                  <Col xs={6} md={4}>
                    <div className="feature-item">
                      <FaGasPump className="feature-icon" />
                      <span>{car.type_carburant}</span>
                    </div>
                  </Col>
                  <Col xs={6} md={4}>
                    <div className="feature-item">
                      <FaCogs className="feature-icon" />
                      <span>{car.boite_vitesse}</span>
                    </div>
                  </Col>
                  <Col xs={6} md={4}>
                    <div className="feature-item">
                      <FaUsers className="feature-icon" />
                      <span>{car.nombre_places} seats</span>
                    </div>
                  </Col>
                  <Col xs={6} md={4}>
                    <div className="feature-item">
                      <FaStar className="feature-icon" />
                      <span>Premium</span>
                    </div>
                  </Col>
                  <Col xs={6} md={4}>
                    <div className="feature-item">
                      <FaCheckCircle className="feature-icon" />
                      <span>Insurance Included</span>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>

          {/* Booking Column */}
          <Col lg={5}>
            <div className="booking-card">
              <h2 className="booking-title">Reserve This Vehicle</h2>
              
              {!isAuthenticated && (
                <Alert variant="info" className="auth-alert">
                  Please <Link to="/login">log in</Link> to make a reservation.
                </Alert>
              )}

              <form onSubmit={handleReservation}>
                <div className="date-pickers">
                  <div className="form-group">
                    <label htmlFor="startDate">
                      <FaCalendarAlt className="me-2" />
                      Pick-Up Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={reservationDates.startDate}
                      onChange={handleDateChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      disabled={!isAuthenticated || car.statut !== 'disponible'}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="endDate">
                      <FaCalendarAlt className="me-2" />
                      Return Date
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={reservationDates.endDate}
                      onChange={handleDateChange}
                      min={reservationDates.startDate || new Date().toISOString().split('T')[0]}
                      required
                      disabled={!isAuthenticated || car.statut !== 'disponible' || !reservationDates.startDate}
                      className="form-control"
                    />
                  </div>
                </div>

                {reservationDates.startDate && reservationDates.endDate && (
                  <div className="price-summary mt-4">
                    <div className="price-row">
                      <span>${car.prix_par_jour} x {calculateTotalPrice(reservationDates.startDate, reservationDates.endDate, 1)} days</span>
                      <span>${calculateTotalPrice(reservationDates.startDate, reservationDates.endDate, car.prix_par_jour)}</span>
                    </div>
                    <div className="price-row total">
                      <span>Total</span>
                      <span>${calculateTotalPrice(reservationDates.startDate, reservationDates.endDate, car.prix_par_jour)}</span>
                    </div>
                  </div>
                )}

                {formError && <Alert variant="danger" className="mt-3">{formError}</Alert>}

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mt-4 reserve-btn"
                  disabled={!isAuthenticated || car.statut !== 'disponible'}
                >
                  {car.statut === 'disponible' ? 'Reserve Now' : 'Not Available'}
                </Button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal
        show={showConfirmationModal}
        handleClose={() => setShowConfirmationModal(false)}
        title="Reservation Confirmed"
        showConfirmButton={false}
      >
        {reservationSuccess ? (
          <div className="confirmation-content">
            <div className="confirmation-icon">
              <FaCheckCircle />
            </div>
            <h4 className="confirmation-title">Your reservation is confirmed!</h4>
            <div className="confirmation-details">
              <p><strong>Reservation ID:</strong> {reservationDetails?.id || 'N/A'}</p>
              <p><strong>Total:</strong> ${reservationDetails?.totalPrice || car.prix_par_jour}</p>
              <p><strong>Vehicle:</strong> {car.marque} {car.modele}</p>
            </div>
            <div className="confirmation-actions">
              <Button 
                variant="outline-secondary" 
                onClick={() => setShowConfirmationModal(false)}
                className="me-2"
              >
                Continue Browsing
              </Button>
              <Button 
                variant="primary" 
                onClick={() => navigate('/my-reservations')}
              >
                View My Reservations
              </Button>
            </div>
          </div>
        ) : (
          <Alert variant="danger">
            There was an issue with your reservation. Please try again.
          </Alert>
        )}
      </Modal>
    </div>
  );
};

export default CarDetailPage;