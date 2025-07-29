
// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card } from 'react-bootstrap';
// import AuthForms from '../components/AuthForms';
// import { useAuth } from '../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';


// const LoginPage = () => {
//   const { signIn, loading, user } = useAuth();
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // This useEffect handles redirection if the user is ALREADY logged in
//   // when they try to access the /login page, or becomes logged in.
//   useEffect(() => {
//     // Only navigate if user is defined and not null
//     if (user) {
//       navigate('/');
//     }
//   }, [user, navigate]); // Depend on 'user' and 'navigate'

//   // IMPORTANT: This conditional rendering is crucial.
//   // If authentication is still loading, or if a user is already logged in
//   // (and the useEffect will handle the navigation), then don't render the form.
//   // This prevents the "Cannot update a component while rendering" error.
//   if (loading || user) { // <-- This condition is correct and critical
//       return <div>Loading...</div>; // Or a proper LoadingSpinner component
//   }

//   const handleLogin = async (email, password) => {
//     setError('');
//     const result = await signIn(email, password);
//     if (result.success) {
//       // Login successful. The useEffect above will handle the navigation
//       // when 'user' state is updated by AuthContext.
//       // We also include navigate('/') here for an immediate redirect
//       // right after a successful manual login action.
//       navigate('/');
//     } else {
//       setError(result.error);
//     }
//   };

//   return (
//     <Container className="my-5">
//       <Row className="justify-content-center">
//         <Col md={6} lg={5}>
//           <Card className="p-4 shadow">
//             <h2 className="text-center mb-4">Login</h2>
//             <AuthForms
//               isRegister={false}
//               onSubmit={handleLogin}
//               loading={loading} // Pass loading state to AuthForms if it uses it
//               error={error}
//             />
//             <p className="text-center mt-3">
//               Don't have an account? <a href="/register">Register here</a>
//             </p>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default LoginPage;


import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import AuthForms from '../components/AuthForms';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FaSignInAlt, FaArrowLeft } from 'react-icons/fa';


const LoginPage = () => {
  const { signIn, loading, user } = useAuth();
  const { darkMode } = useTheme();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (loading || user) {
    return (
      <div className="auth-loading-overlay">
        <div className="auth-spinner"></div>
      </div>
    );
  }

  const handleLogin = async (email, password) => {
    setError('');
    const result = await signIn(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className={`login-page ${darkMode ? 'dark-mode' : ''}`}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Button 
              variant="outline-secondary" 
              onClick={() => navigate(-1)} 
              className="mb-4 back-button"
            >
              <FaArrowLeft className="me-2" /> Back
            </Button>
            
            <Card className="auth-card">
              <Card.Body className="p-4 p-md-5">
                <div className="auth-header mb-4">
                  <div className="auth-icon">
                    <FaSignInAlt />
                  </div>
                  <h2 className="auth-title">Welcome Back</h2>
                  <p className="auth-subtitle">Sign in to access your account</p>
                </div>

                {error && (
                  <Alert variant="danger" className="auth-alert">
                    {error}
                  </Alert>
                )}

                <AuthForms
                  isRegister={false}
                  onSubmit={handleLogin}
                  loading={loading}
                  error={error}
                />

                <div className="auth-footer mt-4 text-center">
                  <p className="mb-2">
                    Don't have an account?{' '}
                    <Link to="/register" className="auth-link">
                      Register here
                    </Link>
                  </p>
                  <Link to="/register" className="auth-link">
                    Forgot your password?
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;