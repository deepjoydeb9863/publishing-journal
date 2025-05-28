// Folder: /server/routes/journal.js

const router = require('express').Router();
const Journal = require('../models/Journal');
const auth = require('../middleware/authMiddleware');

// Submit a journal
router.post('/submit', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const journal = new Journal({
      title,
      content,
      authorId: req.userId
    });
    await journal.save();
    res.status(201).json(journal);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all journals
router.get('/all', async (req, res) => {
  try {
    const journals = await Journal.find().populate('authorId', 'email');
    res.json(journals);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
