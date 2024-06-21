const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lectureSchema = new Schema({
  date: { type: Date, required: true },
  instructor: { type: Schema.Types.ObjectId, ref: 'Instructor', required: true }
});

const courseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  lectures: [lectureSchema]
});

module.exports = mongoose.model('Course', courseSchema);
