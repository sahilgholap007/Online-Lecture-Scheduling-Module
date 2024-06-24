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

    // Log the incoming request data for debugging
    console.log('Incoming lecture data:', req.body);

    if (!course || !lectures || !Array.isArray(lectures) || lectures.length === 0) {
      console.error('Validation error: Missing required fields or lectures are not in correct format');
      return res.status(400).send({ message: 'Course and lectures are required. Lectures must be an array.' });
    }

    // Check if the provided course exists
    const courseObj = await Course.findById(course);
    if (!courseObj) {
      console.error('Course not found');
      return res.status(404).send({ message: 'Course not found.' });
    }

    // Validate each lecture
    for (const lecture of lectures) {
      const { instructor, date } = lecture;

      if (!instructor || !date) {
        console.error('Validation error: Missing instructor or date for a lecture');
        return res.status(400).send({ message: 'Instructor and date are required for each lecture.' });
      }

      const instructorObj = await Instructor.findById(instructor);
      if (!instructorObj) {
        console.error('Instructor not found');
        return res.status(404).send({ message: 'Instructor not found.' });
      }

      // Check for date conflicts
      const dateConflict = await Lecture.findOne({ instructor, date });
      if (dateConflict) {
        console.error('Date conflict');
        return res.status(409).send({ message: `Date conflict: Instructor is already assigned to another lecture on ${date}. Please select a different date.` });
      }

      // Create and save each lecture
      const newLecture = new Lecture({ course, instructor, date });
      await newLecture.save();

      // Add lecture to instructor's list of lectures
      instructorObj.lectures.push(newLecture);
      await instructorObj.save();
    }

    // Log the success and return the response
    console.log('Lectures created successfully');
    res.status(201).send({ message: 'Lectures created successfully.' });
  } catch (error) {
    console.error('Error creating lectures:', error);
    res.status(400).send({ message: error.message });
  }
});

// Get all lectures
router.get('/', async (req, res) => {
  try {
    const lectures = await Lecture.find().populate('course').populate('instructor');
    res.status(200).send(lectures);
  } catch (error) {
    console.error('Error fetching lectures:', error);
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
