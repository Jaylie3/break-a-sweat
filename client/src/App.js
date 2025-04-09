import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Workouts from './components/Workouts';
import Login from './components/Login';
import UploadWorkout from './components/UploadWorkout';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<UploadWorkout />} />
      </Routes>
    </Router>
  );
}

export default App;