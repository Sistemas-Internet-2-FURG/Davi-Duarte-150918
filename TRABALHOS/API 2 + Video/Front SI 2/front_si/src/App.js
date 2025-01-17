import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import PrivateRoute from './PrivateRoute.js';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
          <Dashboard />
          </PrivateRoute>
          }
           />
      </Routes>
    </Router>
  );
}

export default App;
