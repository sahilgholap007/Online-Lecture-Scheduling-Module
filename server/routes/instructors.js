// routes/instructors.js
const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor');
const Lecture = require('../models/Lecture');

// Login an instructor
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const instructor = await Instructor.findOne({ email });

    if (instructor) {
      // Compare passwords (assuming plain text for demonstration)
      if (password === instructor.password) {
        // Passwords match, login successful
        res.status(200).send({ success: true, instructor });
      } else {
        // Passwords do not match
        res.status(401).send({ success: false, message: 'Invalid credentials' });
      }
    } else {
      // Instructor not found
      res.status(404).send({ success: false, message: 'Instructor not found' });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const instructors = await Instructor.find().populate('lectures');
    res.status(200).send(instructors);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

router.get('/:instructorId/lectures', async (req, res) => {
  const { instructorId } = req.params;

  try {
    const lectures = await Lectureecture.find({ instructor: instructorId }).populate('course');
    res.status(200).send({ success: true, lectures });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error' });
    console.error('Failed to fetch lectures:', error);
  }
});

module.exports = router;
