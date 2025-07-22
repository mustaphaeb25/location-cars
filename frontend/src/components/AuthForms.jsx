import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';

const AuthForms = ({ isRegister, onSubmit, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError(''); // Clear previous validation errors

    if (isRegister) {
      if (!nom || !email || !password || !confirmPassword) {
        setValidationError('All fields are required.');
        return;
      }
      if (password !== confirmPassword) {
        setValidationError('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setValidationError('Password must be at least 6 characters long.');
        return;
      }
      onSubmit(nom, email, password);
    } else {
      if (!email || !password) {
        setValidationError('Email and password are required.');
        return;
      }
      onSubmit(email, password);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {validationError && <Alert variant="danger">{validationError}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {isRegister && (
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </Form.Group>
      )}

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      {isRegister && (
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
      )}

      <Button variant="primary" type="submit" className="w-100" disabled={loading}>
        {loading ? <LoadingSpinner /> : (isRegister ? 'Register' : 'Login')}
      </Button>
    </Form>
  );
};

export default AuthForms;