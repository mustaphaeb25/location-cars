const express = require('express');
const router = express.Router();
const db = require('../data/db'); // Assuming db.js is in data folder

router.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const sql = 'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, subject, message], (err, result) => {
    if (err) {
      console.error('Error saving contact message:', err);
      return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
    res.status(201).json({ message: 'Message sent successfully!', messageId: result.insertId });
  });
});
router.get('/contact', (req, res) => { // You might add authenticateToken middleware here: router.get('/contact', authenticateToken, (req, res) => {
  const sql = 'SELECT * FROM contact_messages ORDER BY created_at DESC'; // Order by newest first
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching contact messages:', err);
      return res.status(500).json({ error: 'Failed to retrieve messages.' });
    }
    res.json(results);
  });
});

module.exports = router;