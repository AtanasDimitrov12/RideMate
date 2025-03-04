import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Example from './components/Example'
import './App.css'
import RideBooking from './components/RideBooking/RideBooking';
import Navbar from './components/LandingPage/Navbar';
import Footer from './components/LandingPage/Footer';
import AuthContainer from './components/Register/AuthContainer';

function App() {

  return (
    <>
      
      <Navbar /> {/* Navbar stays persistent across pages */}
      <Routes>
        <Route path="/" element={<Example/>} />
        <Route path="/book" element={<RideBooking />} />
        <Route path="/register" element={<AuthContainer />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
