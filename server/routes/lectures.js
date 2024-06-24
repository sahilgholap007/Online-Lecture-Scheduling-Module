// routes/lectures.js

const express = require('express');
const router = express.Router();
const Lecture = require('../models/Lecture');
const Instructor = require('../models/Instructor');
const Course = require('../models/Course'); // Ensure Course model is imported

// Create multiple lectures
router.post('/', async (req, res) => {
  try {
    const { course, lectures } = req.body;

    // Validate the incoming request data
    if (!course || !lectures || !Array.isArray(lectures) || lectures.length === 0) {
      return res.status(400).send({ message: 'Course and lectures are required. Lectures must be an array.' });
    }

    // Check if the provided course exists
    const courseObj = await Course.findById(course);
    if (!courseObj) {
      return res.status(404).send({ message: 'Course not found.' });
    }

    // Validate each lecture
    for (const lecture of lectures) {
      const { instructor, date } = lecture;

      if (!instructor || !date) {
        return res.status(400).send({ message: 'Instructor and date are required for each lecture.' });
      }

      const instructorObj = await Instructor.findById(instructor);
      if (!instructorObj) {
        return res.status(404).send({ message: 'Instructor not found.' });
      }

      // Check for date conflicts
      const dateConflict = await Lecture.findOne({ instructor, date });
      if (dateConflict) {
        return res.status(409).send({ message: `Date conflict: Instructor is already assigned to another lecture on ${date}. Please select a different date.` });
      }

      // Create and save each lecture
      const newLecture = new Lecture({ course, instructor, date });
      await newLecture.save();

      // Add lecture to instructor's list of lectures
      instructorObj.lectures.push(newLecture);
      await instructorObj.save();
    }

    res.status(201).send({ message: 'Lectures created successfully.' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Get all lectures
router.get('/', async (req, res) => {
  try {
    const lectures = await Lecture.find().populate('course').populate('instructor');
    res.status(200).send(lectures);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
