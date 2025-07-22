import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AuthForms from '../components/AuthForms';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { signUp, loading, user } = useAuth();
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
      setSuccessMessage(result.message + ' You can now log in.');
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
    } else {
      setError(result.error);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="p-4 shadow">
            <h2 className="text-center mb-4">Register</h2>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <AuthForms
              isRegister={true}
              onSubmit={handleRegister}
              loading={loading}
              error={error}
            />
            <p className="text-center mt-3">
              Already have an account? <a href="/login">Login here</a>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;