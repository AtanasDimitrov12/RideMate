import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Example from './components/Example'
import './App.css'
import Navbar from './components/LandingPage/Navbar';
import Footer from './components/LandingPage/Footer';
import AuthContainer from './components/Register/AuthContainer';
import DriverApplications from "./components/AdminPages/DriverApplication/DriverApplications";
import RideHistory from "./components/UserPages/UserDashboard/RideHistory";
import UserDashboard from "./components/UserPages/UserDashboard/UserDashboard";

function App() {

  return (
    <>
      
      <Navbar /> {/* Navbar stays persistent across pages */}
      <Routes>
        <Route path="/" element={<Example/>} />
        <Route path="/book" element={<RideHistory />} />
        <Route path="/register" element={<AuthContainer />} />
        <Route path="/user-dashboard/*" element={<UserDashboard />} />
        <Route path="/driver-applications" element={<DriverApplications />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
