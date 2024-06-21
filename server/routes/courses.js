const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Instructor = require('../models/Instructor');

// Get all courses with instructors populated
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('lectures.instructor');
    res.status(200).send(courses);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a new course
router.post('/', async (req, res) => {
  try {
    const { name, level, description, image } = req.body;
    const newCourse = new Course({ name, level, description, image });
    await newCourse.save();
    res.status(201).send(newCourse);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add lecture to a course
router.post('/:id/add-lecture', async (req, res) => {
  const { date, instructor } = req.body;
  const courseId = req.params.id;

  try {
    // Check if there's already a lecture with the same date and instructor for this course
    const course = await Course.findById(courseId);

    const existingLecture = course.lectures.find(lecture =>
      new Date(lecture.date).toISOString() === new Date(date).toISOString() &&
      lecture.instructor.toString() === instructor
    );

    if (existingLecture) {
      return res.status(400).send({ message: 'Instructor is already assigned to a lecture on this date for this course.' });
    }

    // Check if the instructor is assigned to a different course's lecture on the same date
    const conflictingLecture = await Course.findOne({
      'lectures.date': date,
      'lectures.instructor': instructor
    });

    if (conflictingLecture) {
      return res.status(400).send({ message: 'Instructor is already assigned to a lecture on this date.' });
    }

    // Add new lecture to the course
    course.lectures.push({ date, instructor });
    await course.save();

    res.status(200).send(course);
  } catch (error) {
    console.error('Error adding lecture to course:', error);
    res.status(500).send({ message: 'Failed to add lecture to course. Please try again.' });
  }
});

module.exports = router;
