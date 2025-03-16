import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TabNavigation from "./TabNavigation";
import SearchBox from "./SearchBox";
import RideOptions from "./RideOptions";
import FareDetails from "./FareDetails";
import MapView from "./MapView";
import { createRide } from "../../../repositories/RideRepo"; // Ensure this function is implemented

const RideBooking = () => {
  const [selectedTab, setSelectedTab] = useState("taxi"); // "taxi" or "car_return"
  const [selectedRide, setSelectedRide] = useState("standard");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [route, setRoute] = useState(null);
  const [fare, setFare] = useState("--");
  const [duration, setDuration] = useState("--");

  // Fetch route when pickup and dropoff coordinates are available
  const fetchRoute = async () => {
    if (!pickupCoords || !dropoffCoords) return;
    try {
      const response = await axios.get(
        "https://api.openrouteservice.org/v2/directions/driving-car",
        {
          params: {
            api_key:
              "5b3ce3597851110001cf62482880794f19eb495781fe9d95fc1e6406",
            start: `${pickupCoords[1]},${pickupCoords[0]}`,
            end: `${dropoffCoords[1]},${dropoffCoords[0]}`,
          },
        }
      );

      const coordinates = response.data.features[0].geometry.coordinates.map(
        (coord) => [coord[1], coord[0]]
      );
      setRoute(coordinates);

      const distance =
        response.data.features[0].properties.segments[0].distance / 1000;
      const time =
        response.data.features[0].properties.segments[0].duration / 60;
      setDuration(time.toFixed(1));

      const baseFare = 5;
      const perKmRate =
        selectedRide === "premium"
          ? 1.5
          : selectedRide === "economy"
          ? 0.8
          : 1.0;
      setFare((baseFare + distance * perKmRate).toFixed(2));
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  useEffect(() => {
    if (pickupCoords && dropoffCoords) {
      fetchRoute();
    }
  }, [pickupCoords, dropoffCoords, selectedRide]);

  // Create Ride on Confirm
  const handleConfirmRide = async () => {
    // Get the userId from localStorage
    const storedUser = localStorage.getItem("user");
    let userId = null;
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        userId = parsed.userId;
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
    if (!userId) {
      toast.error("User not found. Please log in again.", { position: "top-center" });
      return;
    }

    // Determine ride method based on selectedTab
    const rideMethod = selectedTab === "taxi" ? "TAXI" : "CAR_RETURN";

    // Build the ride object. Notice driverId is set to 0.
    const ride = {
      userId: userId,
      driverId: 0, // No driver assigned yet; use 0 to indicate that
      method: rideMethod, // New enum field: "TAXI" or "CAR_RETURN"
      pickupLocation: pickup,
      dropOffLocation: dropoff,
      rideOption: selectedRide.toUpperCase(), // e.g., "STANDARD", "ECONOMY", "PREMIUM"
      estimatedFare: parseFloat(fare),
      actualFare: null,
      status: "REQUESTED", // Assuming "REQUESTED" is the initial status
      requestTime: new Date().toISOString(), // Frontend sets request time
      startTime: null,
      endTime: null,
    };

    try {
      const createdRide = await createRide(ride);
      if (createdRide) {
        toast.success("Ride created successfully!", { position: "top-center" });
        // Optionally clear fields or navigate away
      } else {
        toast.error("Failed to create ride.", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error creating ride:", error);
      toast.error("An error occurred while creating ride.", { position: "top-center" });
    }
  };

  return (
    <div className="bg-gray-900 text-white font-sans">
      <section className="flex flex-col items-center px-12 py-8 bg-white text-black">
        {/* Tab Navigation */}
        <TabNavigation selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row items-start justify-between w-full">
          {/* Left Side: Inputs & Ride Options */}
          <div className="w-full md:w-1/3 space-y-6">
            <SearchBox
              label="Enter pickup location"
              value={pickup}
              setValue={setPickup}
              setCoords={setPickupCoords}
              type="pickup"
            />
            <SearchBox
              label="Enter drop-off location"
              value={dropoff}
              setValue={setDropoff}
              setCoords={setDropoffCoords}
              type="dropoff"
            />

            {selectedTab === "taxi" && (
              <RideOptions selectedRide={selectedRide} setSelectedRide={setSelectedRide} />
            )}

            <FareDetails fare={fare} duration={duration} />

            <button 
              onClick={handleConfirmRide}
              className="bg-blue-700 text-white px-6 py-3 rounded mt-4"
            >
              Confirm your ride
            </button>
          </div>

          {/* Right Side: Map */}
          <MapView pickupCoords={pickupCoords} dropoffCoords={dropoffCoords} route={route} />
        </div>
      </section>
    </div>
  );
};

export default RideBooking;
