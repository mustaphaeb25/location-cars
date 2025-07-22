import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { FaCar, FaClipboardList, FaChartLine } from 'react-icons/fa';

const AdminDashboardPage = () => {
  const { user, isAuthenticated, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated or not an admin
  if (authLoading) {
    return null; // Or a loading spinner for auth check
  }
  if (!isAuthenticated || !isAdmin) {
    navigate('/'); // Redirect to home or login if not authorized
    return null;
  }

  return (
    <Container className="my-5 fade-in">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <p className="text-center text-muted">Welcome, {user?.nom|| user?.email}!</p>

      <Row xs={1} md={2} lg={3} className="g-4 mt-4">
        <Col>
          <Card className="h-100 shadow-sm hover-grow text-center">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <FaCar size={60} className="text-primary mb-3" />
              <Card.Title className="h4">Manage Cars</Card.Title>
              <Card.Text>Add, edit, or delete car listings.</Card.Text>
              <Button as={Link} to="/admin/manage-cars" variant="primary" className="mt-auto">Go to Cars</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100 shadow-sm hover-grow text-center">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <FaClipboardList size={60} className="text-success mb-3" />
              <Card.Title className="h4">Manage Reservations</Card.Title>
              <Card.Text>View, approve, or reject car reservations.</Card.Text>
              <Button as={Link} to="/admin/manage-reservations" variant="success" className="mt-auto">Go to Reservations</Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col>
          <Card className="h-100 shadow-sm hover-grow text-center">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <FaChartLine size={60} className="text-info mb-3" />
              <Card.Title className="h4">Reports & Analytics</Card.Title>
              <Card.Text>View platform statistics and reports (Future Feature).</Card.Text>
              <Button variant="info" disabled className="mt-auto">Coming Soon</Button>
            </Card.Body>
          </Card>
        </Col>
        
      </Row>
      
    </Container>
  );
};

export default AdminDashboardPage;