import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Example from './components/Example'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Navbar from './components/LandingPage/Navbar';
import Footer from './components/LandingPage/Footer';
import AuthContainer from './components/Register/AuthContainer';
import DriverApplications from "./components/AdminPages/DriverApplication/DriverApplications";
import RideHistory from "./components/UserPages/UserDashboard/RideHistory";
import UserDashboard from "./components/UserPages/UserDashboard/UserDashboard";
import AdminDashboard from "./components/AdminPages/AdminDashboard/AdminDashboard";
import DriverDashboard from "./components/DriverPages/DriverDashboard";
import RideBooking from "./components/UserPages/RideBooking/RideBooking";

function App() {

  return (
    <>
      <ToastContainer />
      <Navbar /> {/* Navbar stays persistent across pages */}
      <Routes>
        <Route path="/" element={<Example/>} />

        <Route path="/book" element={<RideBooking/>} />
        <Route path="/register" element={<AuthContainer />} />
        <Route path="/user-dashboard/*" element={<UserDashboard />} />

        <Route path="/driver-applications" element={<DriverApplications />} />
        <Route path="/admin-dashboard/*" element={<AdminDashboard />} />

        <Route path="/driver-dashboard/*" element={<DriverDashboard />} />

      </Routes>
      <Footer/>
    </>
  )
}

export default App
