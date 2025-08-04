// import React from 'react';
// import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';

// import { useAuth } from '../contexts/AuthContext';
// import { FaCar, FaClipboardList, FaChartLine, FaEnvelope } from 'react-icons/fa';


// const AdminDashboardPage = () => {
//   const { user, isAuthenticated, isAdmin, loading: authLoading } = useAuth();
//   const navigate = useNavigate();

//   // Redirect if not authenticated or not an admin
//   if (authLoading) {
//     return null; // Or a loading spinner for auth check
//   }
//   if (!isAuthenticated || !isAdmin) {
//     navigate('/'); // Redirect to home or login if not authorized
//     return null;
//   }

//   return (
//     <Container className="my-5 fade-in">
//       <h1 className="text-center mb-4">Admin Dashboard</h1>
//       <p className="text-center text-muted">
//         Welcome, {user ? `${user.nom} (${user.email})` : 'Guest'}!
//       </p>
//       <Row xs={1} md={2} lg={3} className="g-4 mt-4">
//         <Col>
//           <Card className="h-100 shadow-sm hover-grow text-center">
//             <Card.Body className="d-flex flex-column justify-content-center align-items-center">
//               <FaCar size={60} className="text-primary mb-3" />
//               <Card.Title className="h4">Manage Cars</Card.Title>
//               <Card.Text>Add, edit, or delete car listings.</Card.Text>
//               <Button as={Link} to="/admin/manage-cars" variant="primary" className="mt-auto">Go to Cars</Button>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col>
//           <Card className="h-100 shadow-sm hover-grow text-center">
//             <Card.Body className="d-flex flex-column justify-content-center align-items-center">
//               <FaClipboardList size={60} className="text-success mb-3" />
//               <Card.Title className="h4">Manage Reservations</Card.Title>
//               <Card.Text>View, approve, or reject car reservations.</Card.Text>
//               <Button as={Link} to="/admin/manage-reservations" variant="success" className="mt-auto">Go to Reservations</Button>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col>
//           <Card className="h-100 shadow-sm hover-grow text-center">
//             <Card.Body className="d-flex flex-column justify-content-center align-items-center">
//               <FaEnvelope size={60} className="text-warning mb-3" />
//               <Card.Title className="h4">Contact Messages</Card.Title>
//               <Card.Text>Review inquiries from your contact form.</Card.Text>
//               <Button as={Link} to="/admin/messages" variant="warning" className="mt-auto">View Messages</Button>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col>
//           <Card className="h-100 shadow-sm hover-grow text-center">
//             <Card.Body className="d-flex flex-column justify-content-center align-items-center">
//               <FaChartLine size={60} className="text-info mb-3" />
//               <Card.Title className="h4">Reports & Analytics</Card.Title>
//               <Card.Text>View platform statistics and reports (Future Feature).</Card.Text>
//               <Button variant="info" disabled className="mt-auto">Coming Soon</Button>
//             </Card.Body>
//           </Card>
//         </Col>

//       </Row>

//     </Container>
//   );
// };

// export default AdminDashboardPage;



import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FaCar, FaClipboardList, FaChartLine, FaEnvelope, FaUserCog, FaCog } from 'react-icons/fa';
import { MdOutlineAnalytics, MdOutlineContactSupport } from 'react-icons/md';
import './AdminDashboardPage.css';

const AdminDashboardPage = () => {
  const { user, isAuthenticated, isAdmin, loading: authLoading } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    // Add animation on mount
    const animateElements = () => {
      const elements = document.querySelectorAll('.dashboard-card');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('animate__fadeInUp');
        }, index * 100);
      });
    };

    if (!authLoading && isAuthenticated && isAdmin) {
      animateElements();
    }
  }, [authLoading, isAuthenticated, isAdmin]);

  // Redirect if not authenticated or not an admin
  if (authLoading) {
    return <div className="loading-overlay"><div className="loading-spinner"></div></div>;
  }
  if (!isAuthenticated || !isAdmin) {
    navigate('/');
    return null;
  }

  const dashboardCards = [
    {
      icon: <FaCar size={40} />,
      title: "Manage Vehicles",
      description: "Add, edit, or delete vehicle listings in your fleet",
      link: "/admin/manage-cars",
      variant: "primary",
      color: "#3a7bd5"
    },
    {
      icon: <FaClipboardList size={40} />,
      title: "Reservations",
      description: "View, approve, or reject booking requests",
      link: "/admin/manage-reservations",
      variant: "success",
      color: "#00b09b"
    },
    {
      icon: <MdOutlineContactSupport size={40} />,
      title: "Customer Messages",
      description: "Review inquiries from your contact form",
      link: "/admin/messages",
      variant: "warning",
      color: "#f46b45"
    },
    {
      icon: <FaUserCog size={40} />,
      title: "User Management",
      description: "Manage customer and admin accounts",
      link: "/admin/manage-users",
      variant: "danger",
      color: "#ed213a"
    },
    {
      icon: <MdOutlineAnalytics size={40} aria-hidden="true" />,
      title: "Analytics",
      description: "View platform statistics and reports",
      link: "/admin/analytics",
      variant: "info",
      color: "#00d2ff",
      
    },
    {
      icon: <FaCog size={40} />,
      title: "Settings",
      description: "Configure system preferences and options",
      link: "/admin/settings",
      variant: "secondary",
      color: "#8e2de2"
    }
  ];

  return (
    <div className={`admin-dashboard ${darkMode ? 'dark-mode' : ''}`}>
      <Container className="py-5">
        <div className="dashboard-header text-center mb-5">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-subtitle">
            Welcome back, <span className="user-name">{user?.nom || 'Admin'}</span>
          </p>
        </div>

        <Row xs={1} md={2} lg={3} className="g-4">
          {dashboardCards.map((card, index) => (
            <Col key={index}>
              <Card 
                className={`dashboard-card animate-on-scroll ${card.disabled ? 'disabled-card' : ''}`}
                style={{ '--card-color': card.color }}
              >
                <Card.Body className="card-body">
                  <div className="card-icon">
                    {card.icon}
                  </div>
                  <Card.Title className="card-title">{card.title}</Card.Title>
                  <Card.Text className="card-text">{card.description}</Card.Text>
                  {card.disabled ? (
                    <button className="card-button" disabled>
                      Coming Soon
                    </button>
                  ) : (
                    <Link to={card.link} className="card-button">
                      Manage
                    </Link>
                  )}
                </Card.Body>
                <div className="card-decoration"></div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboardPage;