// import React, { useEffect, useState } from 'react';
// import { Container, Table, Spinner, Alert, Card, Button } from 'react-bootstrap';
// import { getContactMessages } from '../services/api'; // Import the new API function
// import { format } from 'date-fns'; // For better date formatting (install if needed: npm install date-fns)

// const AdminContactMessagesPage = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         setLoading(true);
//         setError('');
//         const response = await getContactMessages();
//         setMessages(response.data);
//       } catch (err) {
//         console.error('Failed to fetch contact messages:', err);
//         setError('Failed to load messages. Please ensure you are logged in as an admin and try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMessages();
//   }, []); // Empty dependency array means this runs once on component mount

//   const handleDeleteMessage = (messageId) => {
//     // TODO: Implement actual delete functionality later if needed
//     // For now, this is a placeholder. You'd need a backend DELETE endpoint too.
//     if (window.confirm(`Are you sure you want to delete message ID: ${messageId}?`)) {
//       console.log(`Attempting to delete message ID: ${messageId}`);
//       // In a real app, you would make an API call:
//       // api.delete(`/contact/${messageId}`)
//       // .then(() => {
//       //   setMessages(messages.filter(msg => msg.id !== messageId));
//       //   alert('Message deleted successfully!');
//       // })
//       // .catch(err => console.error('Error deleting message:', err));
//       alert('Delete functionality is not yet implemented on the backend.');
//     }
//   };

//   return (
//     <Container className="my-5">
//       <h2 className="text-center mb-4">Contact Messages</h2>

//       {loading && (
//         <div className="text-center">
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading messages...</span>
//           </Spinner>
//         </div>
//       )}

//       {error && <Alert variant="danger">{error}</Alert>}

//       {!loading && !error && messages.length === 0 && (
//         <Alert variant="info" className="text-center">No contact messages found.</Alert>
//       )}

//       {!loading && !error && messages.length > 0 && (
//         <Card className="shadow-sm">
//           <Card.Body>
//             <Table striped bordered hover responsive className="mb-0">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Subject</th>
//                   <th>Message</th>
//                   <th>Received On</th>
//                   {/* <th>Actions</th> // Uncomment if you add delete functionality */}
//                 </tr>
//               </thead>
//               <tbody>
//                 {messages.map((message) => (
//                   <tr key={message.id}>
//                     <td>{message.id}</td>
//                     <td>{message.name}</td>
//                     <td>{message.email}</td>
//                     <td>{message.subject}</td>
//                     <td>{message.message}</td>
//                     <td>
//                       {message.created_at ? format(new Date(message.created_at), 'PPPp') : 'N/A'}
//                     </td>
//                     {/* <td>
//                       <Button variant="danger" size="sm" onClick={() => handleDeleteMessage(message.id)}>
//                         Delete
//                       </Button>
//                     </td> */}
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </Card.Body>
//         </Card>
//       )}
//     </Container>
//   );
// };

// export default AdminContactMessagesPage;

import React, { useEffect, useState } from 'react';
import { Container, Alert, Button, Badge, Modal } from 'react-bootstrap';
import { getContactMessages, deleteContactMessage } from '../services/api';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FaArrowLeft, FaEnvelope, FaTrash, FaUser, FaCalendarAlt } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import './AdminContactMessagesPage.css';

const AdminContactMessagesPage = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/admin');
    }
  }, [authLoading, isAdmin, navigate]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await getContactMessages();
        setMessages(response.data);
      } catch (err) {
        console.error('Failed to fetch contact messages:', err);
        setError('Failed to load messages. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchMessages();
    }
  }, [isAdmin]);

  const handleDeleteMessage = (messageId) => {
    setSelectedMessage(messageId);
    setShowDeleteModal(true);
  };

  const confirmDeleteMessage = async () => {
    try {
      setDeleteLoading(true);
      await deleteContactMessage(selectedMessage);
      setMessages(messages.filter(msg => msg.id !== selectedMessage));
      setShowDeleteModal(false);
      setSelectedMessage(null);
    } catch (err) {
      console.error('Error deleting message:', err);
      setError('Failed to delete message. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const getMessagePreview = (message) => {
    return message.length > 50 ? `${message.substring(0, 50)}...` : message;
  };

  if (authLoading || !isAdmin) {
    return <LoadingSpinner />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={`contact-messages-page ${darkMode ? 'dark-mode' : ''}`}>
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Button
            variant="outline-secondary"
            onClick={() => navigate('/admin')}
            className="back-to-dashboard-btn"
          >
            <FaArrowLeft className="me-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="page-header text-center mb-5">
          <h1 className="page-title">
            <FaEnvelope className="me-2" />
            Contact Messages
          </h1>
          <p className="page-subtitle">Review customer inquiries and messages</p>
        </div>

        {error && (
          <Alert variant="danger" className="animate__fadeIn">
            {error}
          </Alert>
        )}

        {!loading && !error && messages.length === 0 && (
          <div className="no-messages-card text-center p-5">
            <FaEnvelope size={48} className="mb-3 text-muted" />
            <h4>No messages found</h4>
            <p className="text-muted">No contact messages have been received yet</p>
          </div>
        )}

        {!loading && !error && messages.length > 0 && (
          <div className="messages-container">
            <div className="messages-grid">
              {messages.map((message) => (
                <div key={message.id} className="message-card">
                  <div className="message-header">
                    <div className="message-sender">
                      <FaUser className="me-2" />
                      <span className="sender-name">{message.name}</span>
                      <Badge pill bg="secondary" className="ms-2">
                        {message.email}
                      </Badge>
                    </div>
                    <div className="message-date">
                      <FaCalendarAlt className="me-2" />
                      {message.created_at ? format(new Date(message.created_at), 'MMM d, yyyy - h:mm a') : 'N/A'}
                    </div>
                  </div>

                  <div className="message-subject">
                    {message.subject}
                  </div>

                  <div className="message-content">
                    {message.message}
                  </div>

                  <div className="message-actions">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteMessage(message.id)}
                    >
                      <FaTrash className="me-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <FaTrash size={48} className="text-danger mb-3" />
              <h5>Are you sure you want to delete this message?</h5>
              <p className="text-muted">This action cannot be undone.</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
              disabled={deleteLoading}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDeleteMessage}
              disabled={deleteLoading}
            >
              {deleteLoading ? 'Deleting...' : 'Delete Message'}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminContactMessagesPage;