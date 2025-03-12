import React, { useState, useEffect } from "react";
import axios from "axios";
import TabNavigation from "./TabNavigation";
import SearchBox from "./SearchBox";
import RideOptions from "./RideOptions";
import FareDetails from "./FareDetails";
import MapView from "./MapView";

const RideBooking = () => {
  const [selectedTab, setSelectedTab] = useState("taxi");
  const [selectedRide, setSelectedRide] = useState("standard");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [route, setRoute] = useState(null);
  const [fare, setFare] = useState("--");
  const [duration, setDuration] = useState("--");

  // Fetch Route when locations are selected
  const fetchRoute = async () => {
    if (!pickupCoords || !dropoffCoords) return;
    try {
      const response = await axios.get(
        "https://api.openrouteservice.org/v2/directions/driving-car",
        {
          params: {
            api_key: "5b3ce3597851110001cf62482880794f19eb495781fe9d95fc1e6406",
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
            
            <button className="bg-blue-700 text-white px-6 py-3 rounded mt-4">
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
