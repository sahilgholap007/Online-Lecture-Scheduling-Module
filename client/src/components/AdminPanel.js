import React from "react";
import InstructorsList from "./InstructorsList";
import CoursesList from "./CourseList";
import AddLectureForm from "./AddLectureForm";
import AddCourseForm from "./AddCourseForm";

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gray-800 text-white text-center py-6">
        <h1 className="text-3xl font-bold">ADMIN PANEL</h1>
      </div>
      <div className="container mx-auto p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Instructors</h2>
            <InstructorsList />
          </div>
          <div className="w-full lg:w-2/3 space-y-8">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Add Course</h2>
                <AddCourseForm />
              </div>
              <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>
                <AddLectureForm />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Courses</h2>
              <CoursesList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
