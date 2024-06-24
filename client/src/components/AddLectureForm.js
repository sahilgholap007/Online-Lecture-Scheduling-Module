import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AddLectureForm = () => {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [lectures, setLectures] = useState([{ instructor: '', date: '' }]);

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
    if (!selectedCourse || lectures.some(lecture => !lecture.instructor || !lecture.date)) {
      alert('Please select a course and ensure all lectures have an instructor and date.');
      return;
    }

    try {
      const lectureData = {
        course: selectedCourse,
        lectures
      };

      await api.post('/lectures', lectureData);

      // Notify user and reset form after successful addition
      alert('Lectures added successfully!');
      setSelectedCourse('');
      setLectures([{ instructor: '', date: '' }]);
    } catch (error) {
      console.error('Error adding lectures:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      if (error.response && error.response.status === 409) {
        alert('Date conflict: An instructor is already assigned to another lecture on one of the selected dates. Please select different dates.');
      } else {
        alert('An error occurred. Please try again.');
      }
    }
  };

  const handleLectureChange = (index, field, value) => {
    const newLectures = [...lectures];
    newLectures[index][field] = value;
    setLectures(newLectures);
  };

  const addLecture = () => {
    setLectures([...lectures, { instructor: '', date: '' }]);
  };

  const removeLecture = (index) => {
    const newLectures = lectures.filter((_, i) => i !== index);
    setLectures(newLectures);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg flex-1">
      <h2 className="text-2xl font-bold mb-4">Add Lectures</h2>
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
        {lectures.map((lecture, index) => (
          <div key={index} className="space-y-2">
            <div>
              <label htmlFor={`instructor-${index}`} className="block text-gray-700 font-semibold mb-2">Select Instructor:</label>
              <select
                id={`instructor-${index}`}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                value={lecture.instructor}
                onChange={(e) => handleLectureChange(index, 'instructor', e.target.value)}
                required
              >
                <option value="">Select an instructor</option>
                {instructors.map((instructor) => (
                  <option key={instructor._id} value={instructor._id}>{instructor.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`date-${index}`} className="block text-gray-700 font-semibold mb-2">Select Date:</label>
              <input
                id={`date-${index}`}
                type="date"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                value={lecture.date}
                onChange={(e) => handleLectureChange(index, 'date', e.target.value)}
                required
              />
            </div>
            {lectures.length > 1 && (
              <button type="button" onClick={() => removeLecture(index)} className="text-red-500 hover:text-red-700">
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addLecture} className="text-blue-500 hover:text-blue-700">
          Add Another Lecture
        </button>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Lectures
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLectureForm;
