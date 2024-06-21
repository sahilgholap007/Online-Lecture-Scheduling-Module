import React, { useState } from 'react';
import api from '../services/api';

const AddCourseForm = () => {
  const [name, setName] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const courseData = { name, level, description, image };
      await api.post('/courses', courseData);
      setName('');
      setLevel('Beginner');
      setDescription('');
      setImage('');
      alert('Course added successfully!');
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Failed to add course. Please try again.');
    }
  };

  return (
    <div className="max-w-md mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name:</label>
          <input
            id="name"
            type="text"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="level" className="block text-gray-700 font-semibold mb-2">Level:</label>
          <select
            id="level"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description:</label>
          <textarea
            id="description"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">Image URL:</label>
          <input
            id="image"
            type="text"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourseForm;
