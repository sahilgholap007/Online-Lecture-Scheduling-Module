// routes/lectures.js

const express = require('express');
const router = express.Router();
const Lecture = require('../models/Lecture');
const Instructor = require('../models/Instructor');

// Create a lecture
router.post('/', async (req, res) => {
  try {
    const { course, instructor, date } = req.body;

    // Create new lecture
    const lecture = new Lecture({ course, instructor, date });
    await lecture.save();

    // Update Instructor's lectures array
    await Instructor.findByIdAndUpdate(
      instructor,
      { $push: { lectures: lecture._id } },
      { new: true }
    );

    res.status(201).send(lecture);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all lectures
router.get('/', async (req, res) => {
  try {
    const lectures = await Lecture.find().populate('course').populate('instructor');
    res.status(200).send(lectures);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
