import React, { useState } from "react";
import axios from "axios";

const LoginForm = ({ url }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [instructor, setInstructor] = useState(null);
  const [lectures, setLectures] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${url}/instructors/login`, {
        email,
        password,
      });

      if (response.data.success) {
        const instructorData = response.data.instructor;
        setLoggedIn(true);
        setInstructor(instructorData);
        window.localStorage.setItem("token", instructorData.token);
        fetchLectures(instructorData._id); // Fetch lectures for the logged-in instructor
      } else {
        setError(
          "Login failed. Please check your email and password and try again."
        );
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error("Login error:", error);
    }
  };

  const fetchLectures = async (instructorId, token) => {
    try {
      const response = await axios.get(`${url}/lectures`, {
        params: { instructor: instructorId },
      });
      setLectures(response.data);
    } catch (error) {
      setError(
        "An error occurred while fetching lectures. Please try again later."
      );
      console.error("Fetch lectures error:", error);
    }
  };

  if (loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Welcome, {instructor.name}</h2>
          <p className="text-gray-700 text-lg text-center mb-4">Email: {instructor.email}</p>
          {lectures.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Upcoming Lectures:</h3>
              <ul className="list-disc pl-6">
                {lectures
                  .filter((lecture) => instructor._id === lecture.instructor._id)
                  .map((lecture) => (
                    <li key={lecture._id} className="text-gray-600 text-lg">
                      {lecture.course.name} on {new Date(lecture.date).toDateString()}
                    </li>
                  ))}
              </ul>
            </div>
          )}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setLoggedIn(false);
                setInstructor(null);
                setLectures([]);
                window.localStorage.removeItem("token");
              }}
              className="py-3 px-6 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700 text-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Instructor's Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg"
              required
            />
          </div>
          {error && <div className="text-red-600 mb-4 text-center text-lg">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 text-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
