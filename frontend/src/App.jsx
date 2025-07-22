import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useAuth } from './contexts/AuthContext'; // To use within ProtectedRoute
import { Navigate, Outlet } from 'react-router-dom'; // For ProtectedRoute
import HomePage from './pages/HomePage';
import CarListingPage from './pages/CarListingPage';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyReservationsPage from './pages/MyReservationsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ManageCarsPage from './pages/ManageCarsPage';
import ManageReservationsPage from './pages/ManageReservationsPage';

import Navbar from './components/Navbar';
import CarDetailPage from './pages/CarDetailPage';
import Footer from'./components/Footer';
import ContactPage from './pages/ContactPage';
import AdminContactMessagesPage from './pages/AdminContactMessagesPage';

// ProtectedRoute component to guard routes
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <div>Loading authentication...</div>; // Or a proper spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.includes('admin') && !isAdmin) {
    // If route requires admin, but user is not admin
    return <Navigate to="/" replace />; // Or to a 403 Forbidden page
  }

  return children ? children : <Outlet />;
};

function App() {
  return (
    
      <ThemeProvider>
        <AuthProvider>
          <Navbar />
          <main style={{ flexGrow: 1 }}> 
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cars" element={<CarListingPage />} />
              <Route path="/cars/:id" element={<CarDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Authenticated User Routes */}
              <Route element={<ProtectedRoute allowedRoles={['client', 'admin']} />}>
                <Route path="/my-reservations" element={<MyReservationsPage />} />
              </Route>

              {/* Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route
              path="/admin/messages" // <--- Add this new admin route
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminContactMessagesPage />
                </ProtectedRoute>
              }
            />
                <Route path="/admin/manage-cars" element={<ManageCarsPage />} />
                <Route path="/admin/manage-reservations" element={<ManageReservationsPage />} />
              </Route>

              {/* Catch-all for 404 Not Found (Optional) */}
              <Route path="*" element={<h1 className="text-center my-5">404 - Page Not Found</h1>} />
            </Routes>
            
          </main>
          <Footer/>
          
        
        </AuthProvider>
      </ThemeProvider>
    
  );
}

export default App;