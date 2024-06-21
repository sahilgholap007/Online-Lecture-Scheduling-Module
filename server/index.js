const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const instructors = require('./routes/instructors');
const courses = require('./routes/courses');
const lectures = require('./routes/lectures');

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGO_URI;

console.log('MONGODB_URL:', MONGODB_URL); // Debugging output

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

app.use('/api/instructors', instructors);
app.use('/api/courses', courses);
app.use('/api/lectures', lectures);
