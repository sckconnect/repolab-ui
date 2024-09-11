// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import CreateTest from './components/Test/CreateTest';
import SubTest from './components/Test/SubTest';
import PatientReport from './components/Report/PatientReport';
import PrivateRoute from './routes/privateRoute';
import Typography from '@mui/material/Typography';
import { AppBar, Toolbar, Container, TextField, Button } from '@mui/material';
import backgroundImage from './Content/MedLab.jpg';

function App() {
  return (
    
    <Router>
    <Routes>
      {/* Login route */}
      <Route path="/" element={<Login />} />

      {/* Home route with nested routes */}
      <Route path="/home" element={<Home />}>
        <Route path="create-test" element={<CreateTest/>} />
        <Route path="create-subtest" element={<SubTest/>} />
        <Route path="create-patient-report" element={<PatientReport/>} />
      </Route>
    </Routes>
  </Router>
  
 )
}
export default App;
