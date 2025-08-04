// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Alert, Button, Table, Image } from 'react-bootstrap';
// import LoadingSpinner from '../components/LoadingSpinner';
// import CarForm from '../components/CarForm';
// import Modal from '../components/Modal';
// import { getCars, addCar, updateCar, deleteCar } from '../services/api';
// import { useAuth } from '../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { translateStatus } from '../utils/statusTranslator';

// const ManageCarsPage = () => {
//   const { isAdmin, loading: authLoading } = useAuth();
//   const navigate = useNavigate();

//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [formError, setFormError] = useState(null);
//   const [formSuccess, setFormSuccess] = useState(null);
//   const [showCarFormModal, setShowCarFormModal] = useState(false);
//   const [currentCar, setCurrentCar] = useState(null); // For editing a car

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [carToDeleteId, setCarToDeleteId] = useState(null);

//   // Redirect if not an admin
//   useEffect(() => {
//     if (!authLoading && !isAdmin) {
//       navigate('/admin'); // Redirect to admin dashboard if not admin, or elsewhere
//     }
//   }, [authLoading, isAdmin, navigate]);

//   const fetchCars = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await getCars(); // Fetch all cars, not just available ones for admin
//       setCars(response.data);
//     } catch (err) {
//       setError("Failed to fetch cars. Please try again.");
//       console.error("Error fetching cars:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isAdmin) { // Only fetch if admin
//       fetchCars();
//     }
//   }, [isAdmin]);

//   const handleAddCarClick = () => {
//     setCurrentCar(null); // Clear for adding new car
//     setShowCarFormModal(true);
//     setFormError(null);
//     setFormSuccess(null);
//   };

//   const handleEditCarClick = (car) => {
//     setCurrentCar(car); // Set car data for editing
//     setShowCarFormModal(true);
//     setFormError(null);
//     setFormSuccess(null);
//   };

//   const handleDeleteClick = (carId) => {
//     setCarToDeleteId(carId);
//     setShowDeleteModal(true);
//   };

//   const handleCarFormSubmit = async (formData) => {
//     setFormError(null);
//     setFormSuccess(null);
//     try {
//       if (currentCar) {
//         // Update existing car
//         await updateCar(currentCar.id, formData);
//         setFormSuccess('Car updated successfully!');
//       } else {
//         // Add new car
//         await addCar(formData);
//         setFormSuccess('Car added successfully!');
//       }
//       fetchCars(); // Re-fetch cars to update list
//       setShowCarFormModal(false);
//     } catch (err) {
//       setFormError(err.response?.data?.erreur || 'Failed to save car. Please try again.');
//       console.error("Error saving car:", err);
//     }
//   };

//   const confirmDeleteCar = async () => {
//     try {
//       await deleteCar(carToDeleteId);
//       setFormSuccess('Car deleted successfully!');
//       fetchCars(); // Re-fetch cars
//     } catch (err) {
//       setFormError(err.response?.data?.erreur || 'Failed to delete car. Please try again.');
//       console.error("Error deleting car:", err);
//     } finally {
//       setShowDeleteModal(false);
//       setCarToDeleteId(null);
//       setTimeout(() => setFormSuccess(null), 3000); // Clear message
//       setTimeout(() => setFormError(null), 3000); // Clear message
//     }
//   };

//   if (authLoading || !isAdmin) {
//     return <LoadingSpinner />;
//   }

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     return <Alert variant="danger" className="text-center my-5">{error}</Alert>;
//   }

//   return (
//     <Container className="my-5">
//       <h1 className="text-center mb-4">Manage Cars</h1>
//       <Button variant="primary" className="mb-4" onClick={handleAddCarClick}>
//         Add New Car
//       </Button>

//       {formSuccess && <Alert variant="success">{formSuccess}</Alert>}
//       {formError && <Alert variant="danger">{formError}</Alert>}

//       {cars.length === 0 ? (
//         <Alert variant="info" className="text-center">No cars found. Add a new car to get started.</Alert>
//       ) : (
//         <Table striped bordered hover responsive className="shadow-sm">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Image</th>
//               <th>Brand</th>
//               <th>Model</th>
//               <th>Price/Day</th>
//               <th>Status</th> {/* Correct order */}
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cars.map((car) => (
//               <tr key={car.id}>
//                 <td>{car.id}</td>
//                 <td>
//                   <Image
//                     src={car.image_url ? `http://localhost:3000${car.image_url}` : 'https://via.placeholder.com/50'}
//                     thumbnail
//                     style={{ width: '50px', height: '50px', objectFit: 'cover' }}
//                   />
//                 </td>
//                 <td>{car.marque}</td> {/* Correct position for Brand */}
//                 <td>{car.modele}</td> {/* Correct position for Model */}
//                 <td>${car.prix_par_jour}</td> {/* Correct position for Price/Day */}
//                 <td> {/* Correct position for Status with translated badge */}
//                   <span className={`badge ${car.statut === 'disponible' ? 'bg-success' : car.statut === 'louee' ? 'bg-warning text-dark' : (car.statut === 'réservée' || car.statut === 'en maintenance') ? 'bg-danger' : 'bg-secondary'}`}>
//                     {translateStatus(car.statut)}
//                   </span>
//                 </td>
//                 <td>
//                   <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditCarClick(car)}>
//                     Edit
//                   </Button>
//                   <Button variant="danger" size="sm" onClick={() => handleDeleteClick(car.id)}>
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}

//       {/* Add/Edit Car Modal */}
//       <Modal
//         show={showCarFormModal}
//         handleClose={() => setShowCarFormModal(false)}
//         title={currentCar ? 'Edit Car' : 'Add New Car'}
//         showConfirmButton={false}
//       >
//         <CarForm
//           onSubmit={handleCarFormSubmit}
//           initialData={currentCar}
//           loading={loading} // Re-using loading state, consider a separate one for form submission
//           error={formError}
//           success={formSuccess}
//         />
//       </Modal>

//       {/* Delete Confirmation Modal */}
//       <Modal
//         show={showDeleteModal}
//         handleClose={() => setShowDeleteModal(false)}
//         title="Confirm Deletion"
//         confirmText="Yes, Delete"
//         onConfirm={confirmDeleteCar}
//       >
//         <p>Are you sure you want to delete this car?</p>
//         <p className="text-danger">This action cannot be undone.</p>
//       </Modal>
//     </Container>
//   );
// };

// export default ManageCarsPage;

// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Alert, Button, Table, Image, Badge } from 'react-bootstrap';
// import LoadingSpinner from '../components/LoadingSpinner';
// import CarForm from '../components/CarForm';
// import Modal from '../components/Modal';
// import { getCars, addCar, updateCar, deleteCar } from '../services/api';
// import { useAuth } from '../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { useTheme } from '../contexts/ThemeContext';
// import { translateStatus } from '../utils/statusTranslator';
// import { FaPlus, FaEdit, FaTrash, FaCar } from 'react-icons/fa';
// import './ManageCarsPage.css';

// const ManageCarsPage = () => {
//   const { isAdmin, loading: authLoading } = useAuth();
//   const { darkMode } = useTheme();
//   const navigate = useNavigate();

//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [formError, setFormError] = useState(null);
//   const [formSuccess, setFormSuccess] = useState(null);
//   const [showCarFormModal, setShowCarFormModal] = useState(false);
//   const [currentCar, setCurrentCar] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [carToDeleteId, setCarToDeleteId] = useState(null);

//   // Redirect if not an admin
//   useEffect(() => {
//     if (!authLoading && !isAdmin) {
//       navigate('/admin');
//     }
//   }, [authLoading, isAdmin, navigate]);

//   const fetchCars = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await getCars();
//       setCars(response.data);
//     } catch (err) {
//       setError("Failed to fetch cars. Please try again.");
//       console.error("Error fetching cars:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isAdmin) {
//       fetchCars();
//     }
//   }, [isAdmin]);

//   const handleAddCarClick = () => {
//     setCurrentCar(null);
//     setShowCarFormModal(true);
//     setFormError(null);
//     setFormSuccess(null);
//   };

//   const handleEditCarClick = (car) => {
//     setCurrentCar(car);
//     setShowCarFormModal(true);
//     setFormError(null);
//     setFormSuccess(null);
//   };

//   const handleDeleteClick = (carId) => {
//     setCarToDeleteId(carId);
//     setShowDeleteModal(true);
//   };

//   const handleCarFormSubmit = async (formData) => {
//     setFormError(null);
//     setFormSuccess(null);
//     try {
//       if (currentCar) {
//         await updateCar(currentCar.id, formData);
//         setFormSuccess('Car updated successfully!');
//       } else {
//         await addCar(formData);
//         setFormSuccess('Car added successfully!');
//       }
//       fetchCars();
//       setShowCarFormModal(false);
//     } catch (err) {
//       setFormError(err.response?.data?.erreur || 'Failed to save car. Please try again.');
//       console.error("Error saving car:", err);
//     }
//   };

//   const confirmDeleteCar = async () => {
//     try {
//       await deleteCar(carToDeleteId);
//       setFormSuccess('Car deleted successfully!');
//       fetchCars();
//     } catch (err) {
//       setFormError(err.response?.data?.erreur || 'Failed to delete car. Please try again.');
//       console.error("Error deleting car:", err);
//     } finally {
//       setShowDeleteModal(false);
//       setCarToDeleteId(null);
//       setTimeout(() => setFormSuccess(null), 3000);
//       setTimeout(() => setFormError(null), 3000);
//     }
//   };

//   if (authLoading || !isAdmin) {
//     return <LoadingSpinner />;
//   }

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className={`manage-cars-page ${darkMode ? 'dark-mode' : ''}`}>
//       <Container className="py-5">
//         <div className="page-header text-center mb-5">
//           <h1 className="page-title">
//             <FaCar className="me-2" />
//             Manage Vehicles
//           </h1>
//           <p className="page-subtitle">Add, edit, or delete vehicles in your fleet</p>
//         </div>

//         {error && (
//           <Alert variant="danger" className="text-center my-4">
//             {error}
//           </Alert>
//         )}

//         {formSuccess && (
//           <Alert variant="success" className="animate__fadeIn">
//             {formSuccess}
//           </Alert>
//         )}

//         {formError && (
//           <Alert variant="danger" className="animate__fadeIn">
//             {formError}
//           </Alert>
//         )}

//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <div className="total-cars">
//             Showing <span className="badge bg-primary">{cars.length}</span> vehicles
//           </div>
//           <Button
//             variant="primary"
//             onClick={handleAddCarClick}
//             className="add-car-btn"
//           >
//             <FaPlus className="me-2" />
//             Add New Vehicle
//           </Button>
//         </div>

//         {cars.length === 0 ? (
//           <div className="no-cards-card text-center p-5">
//             <FaCar size={48} className="mb-3 text-muted" />
//             <h4>No vehicles found</h4>
//             <p className="text-muted">Add your first vehicle to get started</p>
//             <Button variant="primary" onClick={handleAddCarClick}>
//               Add Vehicle
//             </Button>
//           </div>
//         ) : (
//           <div className="table-responsive">
//             <Table hover className={`cars-table ${darkMode ? 'table-dark' : ''}`}>
//               <thead>
//                 <tr>
//                   <th>Image</th>
//                   <th>Brand</th>
//                   <th>Model</th>
//                   <th>Price/Day</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cars.map((car) => (
//                   <tr key={car.id} className="car-row">
//                     <td>
//                       <div className="car-image-container">
//                         <Image
//                           src={car.image_url ? `http://localhost:3000${car.image_url}` : '/placeholder-car.jpg'}
//                           rounded
//                           className="car-image"
//                           alt={`${car.marque} ${car.modele}`}
//                         />
//                       </div>
//                     </td>
//                     <td className="car-brand">{car.marque}</td>
//                     <td className="car-model">{car.modele}</td>
//                     <td className="car-price">${car.prix_par_jour}</td>
//                     <td>
//                       <Badge
//                         pill
//                         className={`status-badge ${
//                           car.statut === 'disponible'
//                             ? 'available'
//                             : car.statut === 'louee'
//                             ? 'rented'
//                             : (car.statut === 'réservée' || car.statut === 'en maintenance')
//                             ? 'maintenance'
//                             : 'secondary'
//                         }`}
//                       >
//                         {translateStatus(car.statut)}
//                       </Badge>
//                     </td>
//                     <td>
//                       <div className="action-buttons">
//                         <Button
//                           variant="outline-primary"
//                           size="sm"
//                           className="me-2"
//                           onClick={() => handleEditCarClick(car)}
//                         >
//                           <FaEdit />
//                         </Button>
//                         <Button
//                           variant="outline-danger"
//                           size="sm"
//                           onClick={() => handleDeleteClick(car.id)}
//                         >
//                           <FaTrash />
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </div>
//         )}

//         {/* Add/Edit Car Modal */}
//         <Modal
//           show={showCarFormModal}
//           handleClose={() => setShowCarFormModal(false)}
//           title={currentCar ? 'Edit Vehicle' : 'Add New Vehicle'}
//           showConfirmButton={false}
//           size="lg"
//         >
//           <CarForm
//             onSubmit={handleCarFormSubmit}
//             initialData={currentCar}
//             loading={loading}
//             error={formError}
//             success={formSuccess}
//           />
//         </Modal>

//         {/* Delete Confirmation Modal */}
//         <Modal
//           show={showDeleteModal}
//           handleClose={() => setShowDeleteModal(false)}
//           title="Confirm Deletion"
//           confirmText="Delete Vehicle"
//           onConfirm={confirmDeleteCar}
//           confirmVariant="danger"
//         >
//           <div className="text-center">
//             <FaTrash size={48} className="text-danger mb-3" />
//             <h5>Are you sure you want to delete this vehicle?</h5>
//             <p className="text-muted">This action cannot be undone.</p>
//           </div>
//         </Modal>
//       </Container>
//     </div>
//   );
// };

// export default ManageCarsPage;

import React, { useEffect, useState } from 'react';
import { Container, Alert, Button, Table, Image, Badge } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import CarForm from '../components/CarForm';
import Modal from '../components/Modal';
import { getCars, addCar, updateCar, deleteCar } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { translateStatus } from '../utils/statusTranslator';
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaCar } from 'react-icons/fa';
import './ManageCarsPage.css';

const ManageCarsPage = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);
  const [showCarFormModal, setShowCarFormModal] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carToDeleteId, setCarToDeleteId] = useState(null);

  // Redirect if not an admin
  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/admin');
    }
  }, [authLoading, isAdmin, navigate]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCars();
      setCars(response.data);
    } catch (err) {
      setError("Failed to fetch cars. Please try again.");
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchCars();
    }
  }, [isAdmin]);

  const handleAddCarClick = () => {
    setCurrentCar(null);
    setShowCarFormModal(true);
    setFormError(null);
    setFormSuccess(null);
  };

  const handleEditCarClick = (car) => {
    setCurrentCar(car);
    setShowCarFormModal(true);
    setFormError(null);
    setFormSuccess(null);
  };

  const handleDeleteClick = (carId) => {
    setCarToDeleteId(carId);
    setShowDeleteModal(true);
  };

  const handleCarFormSubmit = async (formData) => {
    setFormError(null);
    setFormSuccess(null);
    try {
      if (currentCar) {
        await updateCar(currentCar.id, formData);
        setFormSuccess('Car updated successfully!');
      } else {
        await addCar(formData);
        setFormSuccess('Car added successfully!');
      }
      fetchCars();
      setShowCarFormModal(false);
    } catch (err) {
      setFormError(err.response?.data?.erreur || 'Failed to save car. Please try again.');
      console.error("Error saving car:", err);
    }
  };

  const confirmDeleteCar = async () => {
    try {
      await deleteCar(carToDeleteId);
      setFormSuccess('Car deleted successfully!');
      fetchCars();
    } catch (err) {
      setFormError(err.response?.data?.erreur || 'Failed to delete car. Please try again.');
      console.error("Error deleting car:", err);
    } finally {
      setShowDeleteModal(false);
      setCarToDeleteId(null);
      setTimeout(() => setFormSuccess(null), 3000);
      setTimeout(() => setFormError(null), 3000);
    }
  };

  if (authLoading || !isAdmin) {
    return <LoadingSpinner />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={`manage-cars-page ${darkMode ? 'dark-mode' : ''}`}>
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Button 
            variant="outline-secondary" 
            onClick={() => navigate('/admin')}
            className="back-to-dashboard-btn"
          >
            <FaArrowLeft className="me-2" />
            Back to Dashboard
          </Button>
          
          <Button
            variant="primary"
            onClick={handleAddCarClick}
            className="add-car-btn"
          >
            <FaPlus className="me-2" />
            Add New Vehicle
          </Button>
        </div>

        <div className="page-header text-center mb-5">
          <h1 className="page-title">
            <FaCar className="me-2" />
            Manage Vehicles
          </h1>
          <p className="page-subtitle">Add, edit, or delete vehicles in your fleet</p>
        </div>

        {error && (
          <Alert variant="danger" className="text-center my-4">
            {error}
          </Alert>
        )}

        {formSuccess && (
          <Alert variant="success" className="animate__fadeIn">
            {formSuccess}
          </Alert>
        )}

        {formError && (
          <Alert variant="danger" className="animate__fadeIn">
            {formError}
          </Alert>
        )}

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="total-cars">
            Showing <span className="badge bg-primary">{cars.length}</span> vehicles
          </div>
        </div>

        {cars.length === 0 ? (
          <div className="no-cards-card text-center p-5">
            <FaCar size={48} className="mb-3 text-muted" />
            <h4>No vehicles found</h4>
            <p className="text-muted">Add your first vehicle to get started</p>
            <Button variant="primary" onClick={handleAddCarClick}>
              Add Vehicle
            </Button>
          </div>
        ) : (
          <div className="table-responsive">
            <Table hover className={`cars-table ${darkMode ? 'table-dark' : ''}`}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Price/Day</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car.id} className="car-row">
                    <td>
                      <div className="car-image-container">
                        <Image
                          src={car.image_url ? `http://localhost:3000${car.image_url}` : '/placeholder-car.jpg'}
                          rounded
                          className="car-image"
                          alt={`${car.marque} ${car.modele}`}
                        />
                      </div>
                    </td>
                    <td className="car-brand">{car.marque}</td>
                    <td className="car-model">{car.modele}</td>
                    <td className="car-price">${car.prix_par_jour}</td>
                    <td>
                      <Badge
                        pill
                        className={`status-badge ${
                          car.statut === 'disponible'
                            ? 'available'
                            : car.statut === 'louee'
                            ? 'rented'
                            : (car.statut === 'réservée' || car.statut === 'en maintenance')
                            ? 'maintenance'
                            : 'secondary'
                        }`}
                      >
                        {translateStatus(car.statut)}
                      </Badge>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEditCarClick(car)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteClick(car.id)}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        <Modal
          show={showCarFormModal}
          handleClose={() => setShowCarFormModal(false)}
          title={currentCar ? 'Edit Vehicle' : 'Add New Vehicle'}
          showConfirmButton={false}
          size="lg"
        >
          <CarForm
            onSubmit={handleCarFormSubmit}
            initialData={currentCar}
            loading={loading}
            error={formError}
            success={formSuccess}
          />
        </Modal>

        <Modal
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          title="Confirm Deletion"
          confirmText="Delete Vehicle"
          onConfirm={confirmDeleteCar}
          confirmVariant="danger"
        >
          <div className="text-center">
            <FaTrash size={48} className="text-danger mb-3" />
            <h5>Are you sure you want to delete this vehicle?</h5>
            <p className="text-muted">This action cannot be undone.</p>
          </div>
        </Modal>
      </Container>
    </div>
  );
};

export default ManageCarsPage;