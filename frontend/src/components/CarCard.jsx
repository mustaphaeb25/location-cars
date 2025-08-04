import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { translateStatus } from '../utils/statusTranslator';
import { FaCar, FaGasPump, FaCogs, FaUserFriends } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const CarCard = ({ car, showActions = true, isAdminView = false, onDelete, onEdit }) => {
  const { darkMode } = useTheme();
  const imageUrl = car.image_url ? `http://localhost:3000${car.image_url}` : 'https://via.placeholder.com/300x200?text=No+Image';
  
  // Only show "New Arrival" for cars added in the last 30 days
  const isNewArrival = () => {
    if (!car.created_at) return false;
    const carDate = new Date(car.created_at);
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return carDate > thirtyDaysAgo;
  };

  return (
    <Card className={`car-card ${darkMode ? 'dark-mode' : ''}`}>
      <div className="card-image-wrapper">
        <Card.Img variant="top" src={imageUrl} alt={`${car.marque} ${car.modele}`} />
        <div className="card-badges">
          
          <Badge 
            bg={car.statut === 'disponible' ? 'success' : 
                car.statut === 'réservée' ? 'warning' : 
                'danger'}
            className="status-badge"
          >
            {translateStatus(car.statut)}
          </Badge>
        </div>
        <div className="price-overlay">
          <span className="price">${car.prix_par_jour}</span>
          <span className="price-label">/day</span>
        </div>
      </div>
      
      <Card.Body>
        <Card.Title className="car-title">
          {car.marque} {car.modele} <span className="car-year">{car.annee}</span>
        </Card.Title>
        
        <div className="car-specs">
          <div className="spec-item">
            <FaCar className="spec-icon" />
            <span>{car.type_vehicule}</span>
          </div>
          <div className="spec-item">
            <FaGasPump className="spec-icon" />
            <span>{car.type_carburant}</span>
          </div>
          <div className="spec-item">
            <FaCogs className="spec-icon" />
            <span>{car.boite_vitesse}</span>
          </div>
          <div className="spec-item">
            <FaUserFriends className="spec-icon" />
            <span>{car.nombre_places} seats</span>
          </div>
        </div>
        
        {car.description && (
          <Card.Text className="car-description">
            {car.description.substring(0, 100)}{car.description.length > 100 ? '...' : ''}
          </Card.Text>
        )}
      </Card.Body>
      
      <Card.Footer className="card-footer">
        <div className="d-flex justify-content-between">
          <Button 
            as={Link} 
            to={`/cars/${car.id}`} 
            variant="outline-primary" 
            className="details-btn"
          >
            Details
          </Button>
          {!isAdminView && car.statut === 'disponible' && (
            <Button 
              as={Link} 
              to={`/cars/${car.id}`} 
              variant="primary" 
              className="book-btn"
            >
              Book Now
            </Button>
          )}
          {isAdminView && (
            <>
              <Button 
                variant="outline-warning" 
                size="sm" 
                onClick={() => onEdit(car)}
                className="me-2"
              >
                Edit
              </Button>
              <Button 
                variant="outline-danger" 
                size="sm" 
                onClick={() => onDelete(car.id)}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </Card.Footer>
    </Card>
  );
};

export default CarCard;