import React, { useEffect, useState } from 'react';
import api from '../services/api';

const InstructorsList = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const response = await api.get('/instructors');
      setInstructors(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching instructors', error);
    }
  };

  const deleteInstructor = async (id) => {
    try {
      const response = await api.delete(`/instructors/${id}`);
      if (response.data.success) {
        alert('Instructor deleted successfully!');
        fetchInstructors();
      } else {
        alert('Failed to delete instructor. Please try again.');
      }
    } catch (error) {
      console.error('Delete instructor error:', error);
    }
  };

  return (
    <div className="max-w-md mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Instructors List</h2>
      <ul>
        {instructors.map((instructor) => (
          <li key={instructor._id} className="border-b border-gray-300 py-2">
            <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start gap-2">
              <div>
                <p className="text-lg font-semibold">{instructor?.name}</p>
                <p className="text-gray-600">{instructor?.email}</p>
              </div>
              <p className="text-gray-500">ID: {instructor?._id}</p>
              <button
                className="text-white p-2 bg-[#ff3939]"
                onClick={() => deleteInstructor(instructor?._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstructorsList;
