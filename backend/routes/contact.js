const express = require('express');
const router = express.Router();
const db = require('../data/db'); // Assuming db.js is in data folder

router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const sql = 'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, subject, message], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ 
        error: 'Failed to send message. Please try again later.',
        details: err.message // Include specific error message
      });
    }
    res.status(201).json({ message: 'Message sent successfully!', messageId: result.insertId });
  });
});
router.get('/', (req, res) => { // You might add authenticateToken middleware here: router.get('/contact', authenticateToken, (req, res) => {
  const sql = 'SELECT * FROM contact_messages ORDER BY created_at DESC'; // Order by newest first
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching contact messages:', err);
      return res.status(500).json({ error: 'Failed to retrieve messages.' });
    }
    res.json(results);
  });
});
// DELETE a contact message by ID
// Corrected path: Changed from '/contact/:id' to '/:id'
// Add authenticateToken and authorizeAdmin middleware here for protection
router.delete('/:id', async (req, res) => { // <-- CHANGE THIS LINE
  try {
    const { id } = req.params;

    // Optional: Check if message exists before attempting to delete
    // const checkSql = 'SELECT id FROM contact_messages WHERE id = ?';
    // const [checkResult] = await db.promise().query(checkSql, [id]);
    // if (checkResult.length === 0) {
    //   return res.status(404).json({ message: 'Message not found.' });
    // }

    const deleteSql = 'DELETE FROM contact_messages WHERE id = ?';
    db.query(deleteSql, [id], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          error: 'Failed to delete message. Please try again later.',
          details: err.message
        });
      }
      if (result.affectedRows === 0) {
        // This case might mean the ID didn't exist if you don't do a prior check
        return res.status(404).json({ message: 'Message not found or already deleted.' });
      }
      res.status(200).json({ message: 'Contact message deleted successfully' });
    });
  } catch (err) {
    console.error('Error in DELETE /contact/:id:', err);
    res.status(500).json({ error: 'Server error during message deletion.' });
  }
});
module.exports = router;