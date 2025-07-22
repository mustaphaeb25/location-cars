import React, { useEffect, useState } from 'react';
import { Container, Table, Spinner, Alert, Card, Button } from 'react-bootstrap';
import { getContactMessages } from '../services/api'; // Import the new API function
import { format } from 'date-fns'; // For better date formatting (install if needed: npm install date-fns)

const AdminContactMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await getContactMessages();
        setMessages(response.data);
      } catch (err) {
        console.error('Failed to fetch contact messages:', err);
        setError('Failed to load messages. Please ensure you are logged in as an admin and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []); // Empty dependency array means this runs once on component mount

  const handleDeleteMessage = (messageId) => {
    // TODO: Implement actual delete functionality later if needed
    // For now, this is a placeholder. You'd need a backend DELETE endpoint too.
    if (window.confirm(`Are you sure you want to delete message ID: ${messageId}?`)) {
      console.log(`Attempting to delete message ID: ${messageId}`);
      // In a real app, you would make an API call:
      // api.delete(`/contact/${messageId}`)
      // .then(() => {
      //   setMessages(messages.filter(msg => msg.id !== messageId));
      //   alert('Message deleted successfully!');
      // })
      // .catch(err => console.error('Error deleting message:', err));
      alert('Delete functionality is not yet implemented on the backend.');
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Contact Messages</h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading messages...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && messages.length === 0 && (
        <Alert variant="info" className="text-center">No contact messages found.</Alert>
      )}

      {!loading && !error && messages.length > 0 && (
        <Card className="shadow-sm">
          <Card.Body>
            <Table striped bordered hover responsive className="mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Received On</th>
                  {/* <th>Actions</th> // Uncomment if you add delete functionality */}
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message.id}>
                    <td>{message.id}</td>
                    <td>{message.name}</td>
                    <td>{message.email}</td>
                    <td>{message.subject}</td>
                    <td>{message.message}</td>
                    <td>
                      {message.created_at ? format(new Date(message.created_at), 'PPPp') : 'N/A'}
                    </td>
                    {/* <td>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteMessage(message.id)}>
                        Delete
                      </Button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default AdminContactMessagesPage;