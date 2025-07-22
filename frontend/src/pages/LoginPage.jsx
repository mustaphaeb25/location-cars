import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AuthForms from '../components/AuthForms';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { signIn, loading, user } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    navigate('/');
    return null;
  }

  const handleLogin = async (email, password) => {
    setError('');
    const result = await signIn(email, password);
    if (result.success) {
      // Login successful, AuthContext handles user state and token
      navigate('/'); // Redirect to home or dashboard
    } else {
      setError(result.error);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="p-4 shadow">
            <h2 className="text-center mb-4">Login</h2>
            <AuthForms
              isRegister={false}
              onSubmit={handleLogin}
              loading={loading}
              error={error}
            />
            <p className="text-center mt-3">
              Don't have an account? <a href="/register">Register here</a>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;