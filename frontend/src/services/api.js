// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:3000/api'; 
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor to add the authentication token
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, error => {
//   return Promise.reject(error);
// });


// api.interceptors.response.use(response => response, error => {
//   if (error.response && error.response.status === 401) {
//     console.error("Authentication expired or invalid. Redirecting to login page.");
//     localStorage.removeItem('token'); 
   
//   }
//   return Promise.reject(error);
// });


// export const login = (credentials) => api.post('/auth/login', credentials);
// export const register = (userData) => api.post('/auth/register', userData);

// // Cars
// export const getCars = () => api.get('/auth/voitures');
// export const getCarById = (id) => api.get(`/auth/voitures/${id}`);
// export const addCar = (carData) => api.post('/auth/voitures', carData, {
//     headers: {
//         'Content-Type': 'multipart/form-data' 
//     }
// });
// export const updateCar = (id, carData) => api.put(`/auth/voitures/${id}`, carData, {
//     headers: {
//         'Content-Type': 'multipart/form-data' 
//     }
// });
// export const deleteCar = (id) => api.delete(`/auth/voitures/${id}`);

// // Reservations
// export const createReservation = (reservationData) => api.post('/reservations', reservationData);
// export const updateReservationStatus = (reservationId, newStatus) => {
//   console.log(`API Call: Updating reservation ${reservationId} to status: ${newStatus}`); 
//   return axios.put(`/api/reservations/${reservationId}/statut`, { statut: newStatus });
// };


// export const getReservations = () => api.get('/reservations'); 

// export default api;
// frontend/src/services/api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    // Default to application/json, but it will be overridden by specific calls for form-data
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the authentication token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
    console.error("Authentication expired or invalid. Redirecting to login page.");
    localStorage.removeItem('token');
    // Consider adding a redirect to login page here if using React Router
  }
  return Promise.reject(error);
});


export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);

// Cars
export const getCars = () => api.get('/auth/voitures');
export const getCarById = (id) => api.get(`/auth/voitures/${id}`);
export const addCar = (carData) => api.post('/auth/voitures', carData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const updateCar = (id, carData) => api.put(`/auth/voitures/${id}`, carData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const deleteCar = (id) => api.delete(`/auth/voitures/${id}`);

// Reservations (using the base axios instance for now, if not specifically set up with 'api' instance)
// IMPORTANT: updateReservationStatus was still using global axios.
// Change it to use the 'api' instance to leverage baseURL and interceptors.
export const createReservation = (reservationData) => api.post('/reservations', reservationData); // This uses `api`
export const updateReservationStatus = (reservationId, newStatus) => {
  console.log(`API Call: Updating reservation ${reservationId} to status: ${newStatus}`);
  // IMPORTANT: Changed axios.put to api.put
  return api.put(`/reservations/${reservationId}/statut`, { statut: newStatus });
};

export const getReservations = () => api.get('/reservations'); // This uses `api`
export const getContactMessages = () => api.get('/contact');

export default api;