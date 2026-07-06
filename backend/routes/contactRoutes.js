const express = require('express');
const router = express.Router();
const { createInquiry, getAllInquiries } = require('../models/contactModel');

// POST new inquiry (from contact form)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, product } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }
    const id = await createInquiry({ name, email, phone, message, product });
    res.status(201).json({ success: true, id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// GET all inquiries (for future admin use)
router.get('/', async (req, res) => {
  try {
    const rows = await getAllInquiries();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
