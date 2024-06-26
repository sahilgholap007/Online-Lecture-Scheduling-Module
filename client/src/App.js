// src/App.js
import React from "react";
import LoginForm from "./components/LoginForm";
import AdminPanel from "./components/AdminPanel";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const API_BASE_URL = "https://online-lecture-scheduling-module-ajjh.onrender.com/api";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm url={API_BASE_URL} />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
  );
};

export default App;
