import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AddLectureForm = () => {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    fetchCourses();
    fetchInstructors();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses', error);
    }
  };

  const fetchInstructors = async () => {
    
    try {
      const response = await api.get('/instructors');
      setInstructors(response.data);
    } catch (error) {
      console.error('Error fetching instructors', error);
    }
  };

  const handleAddLecture = async (e) => {
    e.preventDefault();
    if (!selectedCourse || !selectedInstructor || !selectedDate) {
      alert('Please select a course, instructor, and date for the lecture.');
      return;
    }

    try {
      const lectureData = {
        course: selectedCourse,
        instructor: selectedInstructor,
        date: selectedDate
      };

      await api.post('/lectures', lectureData);

      // Notify user and reset form after successful addition
      alert('Lecture added successfully!');
      setSelectedCourse('');
      setSelectedInstructor('');
      setSelectedDate('');

    } catch (error) {
      console.error('Error adding lecture:', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('Date conflict: Instructor is already assigned to another lecture on this date. Please select a different date.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg flex-1">
      <h2 className="text-2xl font-bold mb-4">Add Lecture</h2>
      <form onSubmit={handleAddLecture} className="space-y-4">
        <div>
          <label htmlFor="course" className="block text-gray-700 font-semibold mb-2">Select Course:</label>
          <select
            id="course"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            required
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>{course.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="instructor" className="block text-gray-700 font-semibold mb-2">Select Instructor:</label>
          <select
            id="instructor"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
            value={selectedInstructor}
            onChange={(e) => setSelectedInstructor(e.target.value)}
            required
          >
            <option value="">Select an instructor</option>
            {instructors.map((instructor) => (
              <option key={instructor._id} value={instructor._id}>{instructor.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className="block text-gray-700 font-semibold mb-2">Select Date:</label>
          <input
            id="date"
            type="date"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Lecture
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLectureForm;
