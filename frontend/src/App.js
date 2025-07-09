import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/" element={<h1>Welcome to the App</h1>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;