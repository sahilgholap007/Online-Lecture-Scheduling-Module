const express = require('express');
const router = express.Router();
const Lecture = require('../models/Lecture');
const Instructor = require('../models/Instructor');

// Add a lecture
router.post('/', async (req, res) => {
  const { course, instructor, date } = req.body;

  try {
    // Check if the instructor is already assigned to a lecture on the same date
    const existingLecture = await Lecture.findOne({ instructor, date });
    if (existingLecture) {
      return res.status(400).send({ success: false, message: 'Instructor is already assigned to a lecture on this date.' });
    }

    const lecture = new Lecture({ course, instructor, date });
    await lecture.save();

    res.status(201).send({ success: true, lecture });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error' });
    console.error('Failed to add lecture:', error);
  }
});

// Get lectures by instructor and date (for frontend validation)
router.get('/', async (req, res) => {
  const { instructor, date } = req.query;

  try {
    const lectures = await Lecture.find({ instructor, date });
    res.status(200).send(lectures);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
    console.error('Failed to fetch lectures:', error);
  }
});

module.exports = router;
