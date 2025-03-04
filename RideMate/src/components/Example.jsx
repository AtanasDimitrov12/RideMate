import React from "react";
import Navbar from "./LandingPage/Navbar";
import HeroSection from "./LandingPage/HeroSection";
import FeaturesSection from "./LandingPage/FeaturesSection";
import HowItWorksSection from "./LandingPage/HowItWorksSection";
import Footer from "./LandingPage/Footer";

const RideMateLanding = () => {
  return (
    <div className="bg-gray-900 text-white font-sans">
      
      <Navbar/>
      <HeroSection/>
      <FeaturesSection/>
      <HowItWorksSection/>
      <Footer/>
      
    </div>
  );
};

export default RideMateLanding;
