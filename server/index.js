// server.js
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const instructors = require('./routes/instructors');
const courses = require('./routes/courses');
const lectures = require('./routes/lectures');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb+srv://gholapsahil007:c4fazNCRRGwu6sZH@lecturescheduling.dpyr1dt.mongodb.net/?retryWrites=true&w=majority&appName=LectureScheduling', {
    useNewUrlParser: true,
}
).then(() => {
    console.log('Connected to database!');
}).catch(() => {
    console.log('Connection failed!');
}
);

app.listen(3001, () => {
    console.log('Server started!');
});

app.use('/api/instructors', instructors);
app.use('/api/courses', courses);
app.use('/api/lectures', lectures);
