// models/Lecture.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lectureSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  instructor: { type: Schema.Types.ObjectId, ref: 'Instructor', required: true },
  date: { type: Date, required: true }
});

lectureSchema.pre('save', async function(next) {
  const Lecture = mongoose.model('Lecture');
  const conflictingLecture = await Lecture.findOne({
    instructor: this.instructor,
    date: this.date
  });

  if (conflictingLecture) {
    const error = new Error('Instructor is already assigned to another lecture on this date.');
    next(error);
  } else {
    next();
  }
});

module.exports = mongoose.model('Lecture', lectureSchema);
