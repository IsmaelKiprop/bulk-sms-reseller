import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './LandingPage/Components/Home';
import UserForm from './Auth/UserForm';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;

