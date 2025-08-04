<<<<<<< HEAD
// import React from 'react';
// import { Card, Button, Col, Badge, Form } from 'react-bootstrap';
// import { translateStatus } from '../utils/statusTranslator';

// const ReservationCard = ({ reservation, carDetails, onDeleteReservation, isAdminView, onUpdateStatus }) => {
//   // FIX: Use the correct property names with the accent 'é'
//   const formattedStartDate = new Date(reservation.date_début).toLocaleDateString();
//   const formattedEndDate = new Date(reservation.date_fin).toLocaleDateString();

//   return (
//     <Card className="shadow-sm h-100">
//       {/* Car Image Display (from previous steps) */}
//       {carDetails && carDetails.image_url ? (
//         <Card.Img
//           variant="top"
//           src={`http://localhost:3000${carDetails.image_url}`}
//           alt={`${carDetails.marque} ${carDetails.modele}`}
//           style={{ height: '180px', objectFit: 'cover' }}
//         />
//       ) : (
//         <div style={{ height: '180px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
//           No Image
//         </div>
//       )}

//       <Card.Body className="d-flex flex-column">
//         <Card.Title>{carDetails ? `${carDetails.marque} ${carDetails.modele}` : 'Car Not Found'}</Card.Title>
//         <Card.Text>
//           <strong>Dates:</strong> {formattedStartDate} - {formattedEndDate}<br />
//           <strong>Status:</strong>
//           <Badge bg={
//             // Determine badge color based on the original (French) status
//             reservation.statut === 'validée' ? 'success' :
//             (reservation.statut === 'annulée' || reservation.statut === 'refusée') ? 'danger' : 'warning' // 'en attente' and any others will be warning
//           } className="ms-2">
//             {translateStatus(reservation.statut)} {/* Display the translated status */}
//           </Badge>
//         </Card.Text>

//         {/* Admin Actions: Accept/Refuse Buttons */}
//         {isAdminView && reservation.statut === 'en attente' && (
//           <div className="mt-auto d-flex flex-column"> {/* mt-auto pushes buttons to bottom */}
//             <Button
//               variant="success"
//               className="mb-2"
//               onClick={() => onUpdateStatus(reservation.id, 'validée')}
//             >
//               Approve
//             </Button>
//             <Button
//               variant="danger"
//               onClick={() => onUpdateStatus(reservation.id, 'refusée')}
//             >
//               Reject
//             </Button>
//           </div>
//         )}

//         {/* Client Cancel Button */}
//         {/* Show cancel button only if it's the client's view AND the reservation is not already finalized */}
//         {!isAdminView &&
//           reservation.statut !== 'annulée' &&
//           reservation.statut !== 'refusée' &&
//           reservation.statut !== 'validée' && (
//           <div className="mt-auto">
//             <Button variant="danger" onClick={() => onDeleteReservation(reservation)} className="w-100 mt-2">
//               Cancel Reservation
//             </Button>
//           </div>
//         )}

//       </Card.Body>
//     </Card>
//   );
// };

// export default ReservationCard;

import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { translateStatus } from '../utils/statusTranslator';
import { FaCheck, FaTimes, FaCalendarAlt, FaCar } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import './ReservationCard.css';

const ReservationCard = ({ reservation, carDetails, onDeleteReservation, isAdminView, onUpdateStatus }) => {
  const { darkMode } = useTheme();
  const formattedStartDate = new Date(reservation.date_début).toLocaleDateString();
  const formattedEndDate = new Date(reservation.date_fin).toLocaleDateString();

  const getStatusColor = (status) => {
    switch (status) {
      case 'validée': return 'success';
      case 'annulée': 
      case 'refusée': return 'danger';
      case 'en attente': return 'warning';
      default: return 'primary';
    }
  };

  return (
    <div className={`reservation-card ${darkMode ? 'dark-mode' : ''}`}>
      <div className="card-image-container">
        {carDetails?.image_url ? (
          <img
            src={`http://localhost:3000${carDetails.image_url}`}
            alt={`${carDetails.marque} ${carDetails.modele}`}
            className="card-image"
          />
        ) : (
          <div className="no-image-placeholder">
            <FaCar size={32} className="text-muted" />
=======

// import React from 'react';
// import { Card, Button, Badge } from 'react-bootstrap';
// import { IoCarOutline } from "react-icons/io5";
// import { MdDateRange } from "react-icons/md";

// const ReservationCard = ({ 
//   reservation, 
//   carDetails, 
//   isAdminView = false, 
//   onUpdateStatus, 
//   onDeleteReservation 
// }) => {
//   // Create a safe car details object
//   const safeCarDetails = carDetails || {
//     marque: 'Unknown',
//     modele: 'Car',
//     prix_par_jour: 0
//   };

//   // Use reservation ID from multiple possible fields
//   const reservationId = reservation.id || reservation.reservation_id || 'N/A';


//   const getStatusBadge = (status) => {
//     switch (status) {
//       case 'en attente':
//         return <Badge bg="warning" text="dark">Pending</Badge>;
//       case 'validée':
//         return <Badge bg="success">Approved</Badge>;
//       case 'refusée':
//         return <Badge bg="danger">Rejected</Badge>;
//       default:
//         return <Badge bg="secondary">{status}</Badge>;
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };

//   const handleCancel = () => {
//     // Use the consistent reservationId we defined
//     if (onDeleteReservation) {
//       onDeleteReservation(reservation);
//     }
//   };

//   const handleStatusUpdate = (newStatus) => {
//     // Use the consistent reservationId we defined
//     if (onUpdateStatus) {
//       onUpdateStatus(reservationId, newStatus);
//     }
//   };

//   return (
//     <Card className="mb-3 shadow-sm fade-in">
//       <Card.Body>
//         <Card.Title className="d-flex align-items-center">
//           <IoCarOutline className="me-2" />
//           {safeCarDetails.marque} {safeCarDetails.modele}
//         </Card.Title>
//         <Card.Subtitle className="mb-2 text-muted">
//           Reservation ID: {reservationId}
//         </Card.Subtitle>
//         <Card.Text className="d-flex align-items-center">
//           <MdDateRange className="me-2" />
//           <strong>Dates:</strong> {formatDate(reservation.date_debut)} to {formatDate(reservation.date_fin)}
//         </Card.Text>
//         <Card.Text>
//           <strong>Status:</strong> {getStatusBadge(reservation.statut)}
//         </Card.Text>

//         {isAdminView && (
//           <div className="mt-3">
//             <p><strong>User ID:</strong> {reservation.id_utilisateur}</p>
//             <p><strong>Car ID:</strong> {reservation.id_voiture}</p>
//             {reservation.statut === 'en attente' && (
//               <>
//                 <Button 
//                   variant="success" 
//                   size="sm" 
//                   className="me-2" 
//                   onClick={() => handleStatusUpdate('validée')}
//                 >
//                   Approve
//                 </Button>
//                 <Button 
//                   variant="danger" 
//                   size="sm" 
//                   onClick={() => handleStatusUpdate('refusée')}
//                 >
//                   Reject
//                 </Button>
//               </>
//             )}
//           </div>
//         )}

//         {!isAdminView && reservation.statut === 'en attente' && (
//           <div className="mt-3">
//             <Button 
//               variant="outline-danger" 
//               size="sm" 
//               onClick={handleCancel}
//             >
//               Cancel Reservation
//             </Button>
//           </div>
//         )}
//       </Card.Body>
//     </Card>
//   );
// };

// export default ReservationCard;

// import React from 'react';
// import { Card, Button, Badge } from 'react-bootstrap';
// import { format } from 'date-fns';

// const ReservationCard = ({ reservation, carDetails, onDeleteReservation, isAdminView }) => {
//   // DESTRUCTURE RESERVATION PROPERTIES HERE
//   const { id, date_debut, date_fin, statut } = reservation;

//   // Format dates
//   const formattedStart = format(new Date(date_debut), 'MMM dd, yyyy');
//   const formattedEnd = format(new Date(date_fin), 'MMM dd, yyyy');

//   return (
//     <Card className="h-100 shadow-sm">
//       <Card.Img 
//         variant="top" 
//         src={carDetails?.image_url || 'https://via.placeholder.com/300x200?text=No+Image'} 
//         style={{ height: '200px', objectFit: 'cover' }}
//       />
//       <Card.Body className="d-flex flex-column">
//         <Card.Title>{carDetails?.marque} {carDetails?.modele}</Card.Title>
//         <Card.Text>
//           <strong>Dates:</strong> {formattedStart} - {formattedEnd}<br />
//           <strong>Status:</strong> 
//           <Badge bg={
//             statut === 'validée' ? 'success' : 
//             statut === 'annulée' || statut === 'refusée' ? 'danger' : 'warning'
//           } className="ms-2">
//             {statut}
//           </Badge>
//         </Card.Text>
//         <div className="mt-auto">
//           {/* Use the destructured id here */}
//           {!isAdminView && statut === 'en attente' && (
//             <Button 
//               variant="outline-danger" 
//               onClick={() => onDeleteReservation(reservation)}
//               className="w-100"
//             >
//               Cancel Reservation
//             </Button>
//           )}
//         </div>
//       </Card.Body>
//     </Card>
//   );
// };

// export default ReservationCard;
// import React from 'react';
// import { Card, Button, Badge } from 'react-bootstrap';
// import { format } from 'date-fns';

// const ReservationCard = ({ reservation, carDetails, onDeleteReservation, isAdminView }) => {
//   // Destructure reservation properties
//   const { id, date_début, date_fin, statut,   image_url } = reservation;

//   // Format dates
//   const formattedStart = format(new Date(date_début), 'MMM dd, yyyy');
//   const formattedEnd = format(new Date(date_fin), 'MMM dd, yyyy');

//   return (
//     <Card className="h-100 shadow-sm">
//       <Card.Img 
//         variant="top" 
//         src={image_url} 
//         style={{ height: '200px', objectFit: 'cover' }}
//         onError={(e) => {
//           e.target.onerror = null;
//           e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
//         }}
//       />
//       <Card.Body className="d-flex flex-column">
//         <Card.Title>{carDetails?.marque} {carDetails?.modele}</Card.Title>
//         <Card.Text>
//           <strong>Dates:</strong> {formattedStart} - {formattedEnd}<br />
//           <strong>Status:</strong> 
//           <Badge bg={
//             statut === 'validée' ? 'success' : 
//             statut === 'annulée' || statut === 'refusée' ? 'danger' : 'warning'
//           } className="ms-2">
//             {statut}
//           </Badge>
//         </Card.Text>
//         <div className="mt-auto">
//           {!isAdminView && statut === 'en attente' && (
//             <Button 
//               variant="outline-danger" 
//               onClick={() => onDeleteReservation(reservation)}
//               className="w-100"
//             >
//               Cancel Reservation
//             </Button>
//           )}
//         </div>
//       </Card.Body>
//     </Card>
//   );
// };

// export default ReservationCard;


// src/components/ReservationCard.jsx

import React from 'react';
import { Card, Button, Col, Badge, Form } from 'react-bootstrap';
import { translateStatus } from '../utils/statusTranslator';

const ReservationCard = ({ reservation, carDetails, onDeleteReservation, isAdminView, onUpdateStatus }) => {
  // FIX: Use the correct property names with the accent 'é'
  const formattedStartDate = new Date(reservation.date_début).toLocaleDateString();
  const formattedEndDate = new Date(reservation.date_fin).toLocaleDateString();

  return (
    <Card className="shadow-sm h-100">
      {/* Car Image Display (from previous steps) */}
      {carDetails && carDetails.image_url ? (
        <Card.Img
          variant="top"
          src={`http://localhost:3000${carDetails.image_url}`}
          alt={`${carDetails.marque} ${carDetails.modele}`}
          style={{ height: '180px', objectFit: 'cover' }}
        />
      ) : (
        <div style={{ height: '180px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
          No Image
        </div>
      )}

      <Card.Body className="d-flex flex-column">
        <Card.Title>{carDetails ? `${carDetails.marque} ${carDetails.modele}` : 'Car Not Found'}</Card.Title>
        <Card.Text>
          <strong>Dates:</strong> {formattedStartDate} - {formattedEndDate}<br />
          <strong>Status:</strong>
          <Badge bg={
            // Determine badge color based on the original (French) status
            reservation.statut === 'validée' ? 'success' :
            (reservation.statut === 'annulée' || reservation.statut === 'refusée') ? 'danger' : 'warning' // 'en attente' and any others will be warning
          } className="ms-2">
            {translateStatus(reservation.statut)} {/* Display the translated status */}
          </Badge>
        </Card.Text>

        {/* Admin Actions: Accept/Refuse Buttons */}
        {isAdminView && reservation.statut === 'en attente' && (
          <div className="mt-auto d-flex flex-column"> {/* mt-auto pushes buttons to bottom */}
            <Button
              variant="success"
              className="mb-2"
              onClick={() => onUpdateStatus(reservation.id, 'validée')}
            >
              Approve
            </Button>
            <Button
              variant="danger"
              onClick={() => onUpdateStatus(reservation.id, 'refusée')}
            >
              Reject
            </Button>
>>>>>>> 501744de934533a45971193d0c974f2265742b3c
          </div>
        )}
      </div>

<<<<<<< HEAD
      <div className="card-content">
        <div className="card-header">
          <h3 className="car-title">
            {carDetails ? `${carDetails.marque} ${carDetails.modele}` : 'Car Not Found'}
          </h3>
          <Badge 
            pill 
            className={`status-badge ${getStatusColor(reservation.statut)}`}
          >
            {translateStatus(reservation.statut)}
          </Badge>
        </div>

        <div className="card-details">
          <div className="detail-item">
            <FaCalendarAlt className="detail-icon" />
            <span className="detail-label">Dates:</span>
            <span className="detail-value">{formattedStartDate} - {formattedEndDate}</span>
          </div>

          {carDetails && (
            <>
              <div className="detail-item">
                <span className="detail-label">Price/Day:</span>
                <span className="detail-value">${carDetails.prix_par_jour}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Total:</span>
                <span className="detail-value">
                  ${calculateTotal(reservation.date_début, reservation.date_fin, carDetails.prix_par_jour)}
                </span>
              </div>
            </>
          )}
        </div>

        {isAdminView && reservation.statut === 'en attente' && (
          <div className="action-buttons">
            <Button
              variant="success"
              className="approve-btn"
              onClick={() => onUpdateStatus(reservation.id, 'validée')}
            >
              <FaCheck className="me-2" />
              Approve
            </Button>
            <Button
              variant="danger"
              className="reject-btn"
              onClick={() => onUpdateStatus(reservation.id, 'refusée')}
            >
              <FaTimes className="me-2" />
              Reject
=======
        {/* Client Cancel Button */}
        {/* Show cancel button only if it's the client's view AND the reservation is not already finalized */}
        {!isAdminView &&
          reservation.statut !== 'annulée' &&
          reservation.statut !== 'refusée' &&
          reservation.statut !== 'validée' && (
          <div className="mt-auto">
            <Button variant="danger" onClick={() => onDeleteReservation(reservation)} className="w-100 mt-2">
              Cancel Reservation
>>>>>>> 501744de934533a45971193d0c974f2265742b3c
            </Button>
          </div>
        )}

<<<<<<< HEAD
        {!isAdminView &&
          reservation.statut !== 'annulée' &&
          reservation.statut !== 'refusée' &&
          reservation.statut !== 'validée' && (
          <Button 
            variant="danger" 
            className="cancel-btn"
            onClick={() => onDeleteReservation(reservation)}
          >
            Cancel Reservation
          </Button>
        )}
      </div>
    </div>
=======
      </Card.Body>
    </Card>
>>>>>>> 501744de934533a45971193d0c974f2265742b3c
  );
};

// Helper function to calculate total price
const calculateTotal = (startDate, endDate, pricePerDay) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  return (days * pricePerDay).toFixed(2);
};

export default ReservationCard;