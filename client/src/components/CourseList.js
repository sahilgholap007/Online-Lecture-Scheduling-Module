import React, { useEffect, useState } from 'react';
import api from '../services/api';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const response = await api.get('/lectures');
      setLectures(response.data);
    } catch (error) {
      console.error('Error fetching lectures', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses', error);
    }
  };

  return (
    <div className="max-w-4xl mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Courses List</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div key={course._id} className="border border-gray-300 rounded-lg overflow-hidden">
            <img src={course.image} alt="Course" className="h-48 w-full object-cover" />
            <div className="p-4">
              <p className="text-xl font-semibold mb-2">{course.name}</p>
              <p className="text-gray-600 mb-2">{course.level}</p>
              <p className="text-sm text-gray-700 mb-4">{course.description}</p>
              <p className="text-gray-700 font-semibold mb-2">Lectures:</p>
              <ul className="ml-4">
                {lectures
                  .filter((lecture) => lecture.course._id === course._id)
                  .map((lecture) => (
                    <li key={lecture._id} className="text-sm text-gray-600">
                      {new Date(lecture.date).toLocaleDateString()} - {lecture.title}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
