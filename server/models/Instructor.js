// models/Instructor.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add lectures array reference
  lectures: [{ type: Schema.Types.ObjectId, ref: 'Lecture' }]
});

module.exports = mongoose.model('Instructor', instructorSchema);
