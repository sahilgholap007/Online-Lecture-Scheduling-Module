# Lecture Management System

A web application to manage lectures, courses, and instructors.

## Project Overview

This project provides a simple interface to manage lectures for different courses and instructors. The backend is built with Node.js, Express, and MongoDB, while the frontend is built with React.

## Features

- Add, view, and manage courses
- Add, view, and manage instructors
- Add, view, and manage lectures
- Ensure no instructor is double-booked for lectures on the same date
## Routes

API Routes

Courses
GET /api/courses: Retrieve a list of all courses
GET /api/courses/:id: Retrieve details of a specific course
POST /api/courses: Add a new course

Instructors
GET /api/instructors: Retrieve a list of all instructors
GET /api/instructors/:id: Retrieve details of a specific instructor
POST /api/instructors: Add a new instructor
DELETE /api/instructors/:id: Delete an instructor

Lectures
GET /api/lectures: Retrieve a list of all lectures
GET /api/lectures/:id: Retrieve details of a specific lecture
POST /api/lectures: Add a new lecture



