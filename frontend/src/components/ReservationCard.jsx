import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { IoCarOutline } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";

const ReservationCard = ({ reservation, carDetails, isAdminView = false, onUpdateStatus, onDeleteReservation }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'en attente':
        return <span className="badge bg-warning text-dark">Pending</span>;
      case 'validée':
        return <span className="badge bg-success">Approved</span>;
      case 'refusée':
        return <span className="badge bg-danger">Rejected</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card className="mb-3 shadow-sm fade-in">
      <Card.Body>
        <Card.Title className="d-flex align-items-center">
          <IoCarOutline className="me-2" />
          {carDetails ? `${carDetails.marque} ${carDetails.modele}` : 'Car Details Not Available'}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Reservation ID: {reservation.id}</Card.Subtitle>
        <Card.Text className="d-flex align-items-center">
          <MdDateRange className="me-2" />
          <strong>Dates:</strong> {formatDate(reservation.date_debut)} to {formatDate(reservation.date_fin)}
        </Card.Text>
        <Card.Text>
          <strong>Status:</strong> {getStatusBadge(reservation.statut)}
        </Card.Text>

        {isAdminView && (
          <div className="mt-3">
            <p><strong>User ID:</strong> {reservation.id_utilisateur}</p>
            <p><strong>Car ID:</strong> {reservation.id_voiture}</p>
            {reservation.statut === 'en attente' && (
              <>
                <Button variant="success" size="sm" className="me-2" onClick={() => onUpdateStatus(reservation.id, 'validée')}>
                  Approve
                </Button>
                <Button variant="danger" size="sm" onClick={() => onUpdateStatus(reservation.id, 'refusée')}>
                  Reject
                </Button>
              </>
            )}
            {/* Optionally allow deletion for admins */}
            {/* <Button variant="outline-danger" size="sm" className="ms-auto" onClick={() => onDeleteReservation(reservation.id)}>
              Delete Reservation
            </Button> */}
          </div>
        )}

        {!isAdminView && reservation.statut === 'en attente' && (
          <div className="mt-3">
            <Button variant="outline-danger" size="sm" onClick={() => onDeleteReservation(reservation.id)}>
              Cancel Reservation
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ReservationCard;