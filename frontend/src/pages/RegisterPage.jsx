// import React, { useState } from 'react';
// import { Container, Row, Col, Card } from 'react-bootstrap';
// import AuthForms from '../components/AuthForms';
// import { useAuth } from '../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const RegisterPage = () => {
//   const { signUp, loading, user } = useAuth();
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate();

//   // Redirect if already logged in
//   if (user) {
//     navigate('/');
//     return null;
//   }

//   const handleRegister = async (nom, email, password) => {
//     setError('');
//     setSuccessMessage('');
//     const result = await signUp(nom, email, password);
//     if (result.success) {
//       setSuccessMessage(result.message + ' You can now log in.');
//       setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
//     } else {
//       setError(result.error);
//     }
//   };

//   return (
//     <Container className="my-5">
//       <Row className="justify-content-center">
//         <Col md={6} lg={5}>
//           <Card className="p-4 shadow">
//             <h2 className="text-center mb-4">Register</h2>
//             {successMessage && <div className="alert alert-success">{successMessage}</div>}
//             <AuthForms
//               isRegister={true}
//               onSubmit={handleRegister}
//               loading={loading}
//               error={error}
//             />
//             <p className="text-center mt-3">
//               Already have an account? <a href="/login">Login here</a>
//             </p>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default RegisterPage;


import React, { useState } from 'react';

import AuthForms from '../components/AuthForms';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FaUserPlus, FaArrowLeft } from 'react-icons/fa';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';


const RegisterPage = () => {
  const { signUp, loading, user } = useAuth();
  const { darkMode } = useTheme();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    navigate('/');
    return null;
  }

  const handleRegister = async (nom, email, password) => {
    setError('');
    setSuccessMessage('');
    const result = await signUp(nom, email, password);
    if (result.success) {
      setSuccessMessage(result.message + ' Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className={`register-page ${darkMode ? 'dark-mode' : ''}`}>
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
                    <FaUserPlus />
                  </div>
                  <h2 className="auth-title">Create Your Account</h2>
                  <p className="auth-subtitle">Join our community to start booking premium vehicles</p>
                </div>

                {successMessage && (
                  <Alert variant="success" className="auth-alert">
                    {successMessage}
                  </Alert>
                )}

                <AuthForms
                  isRegister={true}
                  onSubmit={handleRegister}
                  loading={loading}
                  error={error}
                />

                <div className="auth-footer mt-4 text-center">
                  <p className="mb-0">
                    Already have an account?{' '}
                    <Link to="/login" className="auth-link">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;