// import React from 'react';
// import { Routes, Route } from 'react-router-dom';

// import AuthProvider from './contexts/AuthContext';
// import { ThemeProvider } from './contexts/ThemeContext';
// import { useAuth } from './contexts/AuthContext'; // To use within ProtectedRoute
// import { Navigate, Outlet } from 'react-router-dom'; // For ProtectedRoute
// import HomePage from './pages/HomePage';
// import CarListingPage from './pages/CarListingPage';

// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import MyReservationsPage from './pages/MyReservationsPage';
// import AdminDashboardPage from './pages/AdminDashboardPage';
// import ManageCarsPage from './pages/ManageCarsPage';
// import ManageReservationsPage from './pages/ManageReservationsPage';

// import Navbar from './components/Navbar';
// import CarDetailPage from './pages/CarDetailPage';
// import Footer from'./components/Footer';
// import ContactPage from './pages/ContactPage';
// import AdminContactMessagesPage from './pages/AdminContactMessagesPage';

// // ProtectedRoute component to guard routes
// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { isAuthenticated, isAdmin, loading,user  } = useAuth();
//   console.log("ProtectedRoute Status Check:");
//   console.log("  - loading:", loading);
//   console.log("  - isAuthenticated:", isAuthenticated);
//   console.log("  - user:", user);
//   console.log("  - isAdmin:", isAdmin);
//   console.log("  - allowedRoles:", allowedRoles);

//   if (loading) {
//     return <div>Loading authentication...</div>; // Or a proper spinner
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//    // Fixed role checking logic
//   if (allowedRoles) {
//     const hasRequiredRole = 
//       (allowedRoles.includes('admin') && isAdmin) ||
//       (allowedRoles.includes('client') && !isAdmin);
<<<<<<< HEAD

=======
    
>>>>>>> 501744de934533a45971193d0c974f2265742b3c
//     if (!hasRequiredRole) {
//       return <Navigate to="/" replace />;
//     }
//   }

//   return children ? children : <Outlet />;
// };

// function App() {
//   return (
<<<<<<< HEAD

=======
    
>>>>>>> 501744de934533a45971193d0c974f2265742b3c
//       <ThemeProvider>
//         <AuthProvider>
//           <Navbar />
//           <main style={{ flexGrow: 1 }}> 
//             <Routes>
//               <Route path="/" element={<HomePage />} />
//               <Route path="/cars" element={<CarListingPage />} />
//               <Route path="/cars/:id" element={<CarDetailPage />} />
//               <Route path="/login" element={<LoginPage />} />
//               <Route path="/register" element={<RegisterPage />} />
//               <Route path="/contact" element={<ContactPage />} />

//               {/* Authenticated User Routes */}
//               <Route element={<ProtectedRoute allowedRoles={['client', 'admin']} />}>
//                 <Route path="/my-reservations" element={<MyReservationsPage />} />
//               </Route>

//               {/* Admin Routes */}
//               <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
//                 <Route path="/admin" element={<AdminDashboardPage />} />
//                 <Route
//               path="/admin/messages" // <--- Add this new admin route
//               element={
//                 <ProtectedRoute adminOnly={true}>
//                   <AdminContactMessagesPage />
//                 </ProtectedRoute>
//               }
//             />
//                 <Route path="/admin/manage-cars" element={<ManageCarsPage />} />
//                 <Route path="/admin/manage-reservations" element={<ManageReservationsPage />} />
//               </Route>

//               {/* Catch-all for 404 Not Found (Optional) */}
//               <Route path="*" element={<h1 className="text-center my-5">404 - Page Not Found</h1>} />
//             </Routes>
<<<<<<< HEAD

//           </main>
//           <Footer/>


//         </AuthProvider>
//       </ThemeProvider>

=======
            
//           </main>
//           <Footer/>
          
        
//         </AuthProvider>
//       </ThemeProvider>
    
>>>>>>> 501744de934533a45971193d0c974f2265742b3c
//   );
// }

// export default App;
// src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthProvider from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useAuth } from './contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
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
import Footer from './components/Footer';
import ContactPage from './pages/ContactPage';
import AdminContactMessagesPage from './pages/AdminContactMessagesPage';
import AboutUsPage from './pages/AboutUsPage';
import FAQsPage from './pages/FAQsPage';
<<<<<<< HEAD
import AnalyticsPage from './pages/AnalyticsPage';
=======
>>>>>>> 501744de934533a45971193d0c974f2265742b3c
// import BlogPage from './pages/BlogPage';
// import BlogPostPage from './pages/BlogPostPage';

// ProtectedRoute component to guard routes (this part is correct)
const ProtectedRoute = ({ children, allowedRoles }) => {
<<<<<<< HEAD
  const { isAuthenticated, isAdmin, loading, user } = useAuth();
=======
  const { isAuthenticated, isAdmin, loading,user  } = useAuth();
>>>>>>> 501744de934533a45971193d0c974f2265742b3c
  console.log("ProtectedRoute Status Check:");
  console.log("  - loading:", loading);
  console.log("  - isAuthenticated:", isAuthenticated);
  console.log("  - user:", user);
  console.log("  - isAdmin:", isAdmin);
  console.log("  - allowedRoles:", allowedRoles);

  if (loading) {
    return <div>Loading authentication...</div>; // Or a proper spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Fixed role checking logic (this part is correct)
  if (allowedRoles) {
    const hasRequiredRole =
      (allowedRoles.includes('admin') && isAdmin) ||
      (allowedRoles.includes('client') && !isAdmin);

    if (!hasRequiredRole) {
      return <Navigate to="/" replace />;
    }
  }

  return children ? children : <Outlet />;
};

function App() {
  return (
<<<<<<< HEAD
=======

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
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/faqs" element={<FAQsPage />} /> 
              {/* <Route path="/blog" element={<BlogPage/>} /> 
              <Route path="/blog/:slug" element={<BlogPostPage/>} /> */}
>>>>>>> 501744de934533a45971193d0c974f2265742b3c

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
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            {/* <Route path="/blog" element={<BlogPage/>} /> 
              <Route path="/blog/:slug" element={<BlogPostPage/>} /> */}

<<<<<<< HEAD
            {/* Authenticated User Routes */}
            <Route element={<ProtectedRoute allowedRoles={['client', 'admin']} />}>
              <Route path="/my-reservations" element={<MyReservationsPage />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminDashboardPage />} />

              <Route
                path="/admin/analytics" // <--- Make sure this path exactly matches the 'link' in AdminDashboardPage
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AnalyticsPage /> {/* <--- Ensure this component is rendered */}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/messages"
                element={
                  <ProtectedRoute allowedRoles={['admin']}> {/* <-- CORRECTED LINE */}
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
        <Footer />


      </AuthProvider>
    </ThemeProvider>

=======
              {/* Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route
                  path="/admin/messages"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}> {/* <-- CORRECTED LINE */}
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

>>>>>>> 501744de934533a45971193d0c974f2265742b3c
  );
}

export default App;