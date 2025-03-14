import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const RideBooking = () => {
  const [selectedTab, setSelectedTab] = useState("taxi"); // Default tab
  const [selectedRide, setSelectedRide] = useState("standard");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [route, setRoute] = useState(null);
  const [fare, setFare] = useState("--");
  const [duration, setDuration] = useState("--");
  const [suggestions, setSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null);

  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      if (pickupCoords && dropoffCoords) {
        map.fitBounds([pickupCoords, dropoffCoords], { padding: [50, 50] });
      } else if (pickupCoords) {
        map.setView(pickupCoords, 14);
      } else if (dropoffCoords) {
        map.setView(dropoffCoords, 14);
      }
    }, [pickupCoords, dropoffCoords, map]);
    return null;
  };

  const fetchAddressSuggestions = async (query, type) => {
    if (query.length < 3) {
      setSuggestions([]);
      setActiveInput(null); // Hide dropdown if too few characters
      return;
    }
    try {
      console.log("Fetching suggestions for query:", query);

      const response = await axios.get(
        `http://localhost:8080/api/location/search`,
        {
          params: { q: query },
        }
      );

      console.log("API Response:", response.data);

      if (response.data.length > 0) {
        setSuggestions(response.data);
        setActiveInput(type); // Ensure dropdown is shown
      } else {
        setSuggestions([
          { display_name: "No address found", isPlaceholder: true },
        ]);
        setActiveInput(type);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSelectLocation = (location, type) => {
    const coords = [parseFloat(location.lat), parseFloat(location.lon)];
    if (type === "pickup") {
      setPickup(location.display_name);
      setPickupCoords(coords);
    } else {
      setDropoff(location.display_name);
      setDropoffCoords(coords);
    }
    setSuggestions([]);
    setActiveInput(null);
  };

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
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-6 py-3 rounded ${
              selectedTab === "taxi"
                ? "bg-blue-700 text-white"
                : "bg-gray-300 text-black"
            }`}
            onClick={() => setSelectedTab("taxi")}
          >
            Book a Taxi
          </button>
          <button
            className={`px-6 py-3 rounded ${
              selectedTab === "return"
                ? "bg-blue-700 text-white"
                : "bg-gray-300 text-black"
            }`}
            onClick={() => setSelectedTab("return")}
          >
            Car Return Service
          </button>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row items-start justify-between w-full">
          {/* Left Side: Booking Inputs */}
          <div className="w-full md:w-1/3 space-y-6">
            {/* Pickup Input with Search Button */}
            <div className="relative flex items-center border border-gray-300 rounded">
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Enter pickup location"
                className="px-4 py-2 w-full"
              />
              <button
                onClick={() => fetchAddressSuggestions(pickup, "pickup")}
                className="px-3 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700"
              >
                🔍
              </button>
              {activeInput === "pickup" && suggestions.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 w-full max-h-40 overflow-auto shadow-lg z-50 top-full mt-1">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() =>
                        !suggestion.isPlaceholder &&
                        handleSelectLocation(suggestion, "pickup")
                      }
                      className={`cursor-pointer px-4 py-2 ${
                        suggestion.isPlaceholder
                          ? "text-gray-500 italic"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      {suggestion.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Dropoff Input with Search Button */}
            <div className="relative flex items-center border border-gray-300 rounded">
              <input
                type="text"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                placeholder="Enter drop-off location"
                className="px-4 py-2 w-full"
              />
              <button
                onClick={() => fetchAddressSuggestions(dropoff, "dropoff")}
                className="px-3 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700"
              >
                🔍
              </button>
              {activeInput === "dropoff" && suggestions.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 w-full max-h-40 overflow-auto shadow-lg z-50 top-full mt-1">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() =>
                        !suggestion.isPlaceholder &&
                        handleSelectLocation(suggestion, "dropoff")
                      }
                      className={`cursor-pointer px-4 py-2 ${
                        suggestion.isPlaceholder
                          ? "text-gray-500 italic"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      {suggestion.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Show ride options ONLY when Taxi is selected */}
            {selectedTab === "taxi" && (
              <>
                <h3 className="text-lg font-semibold">Ride options:</h3>
                <div className="flex space-x-4">
                  {["standard", "premium", "economy"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedRide(option)}
                      className={`px-4 py-2 rounded ${
                        selectedRide === option
                          ? "bg-blue-700 text-white"
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Estimated Fare & Time */}
            <p className="mt-4">
              <strong>Estimated fare:</strong> €{fare}
            </p>
            <p>
              <strong>Estimated time:</strong> {duration} mins
            </p>

            {/* Confirm Button */}
            <button className="bg-blue-700 text-white px-6 py-3 rounded mt-4">
              Confirm your ride
            </button>
          </div>

          {/* Right Side: Map */}
          {/* Right Side: Map */}
          <div className="w-full md:w-3/5 h-80 md:ml-6">
            {" "}
            {/* Reduced width and added margin */}
            <MapContainer
              center={[51.4416, 5.4697]}
              zoom={13}
              className="h-full w-full rounded-lg"
            >
              <MapUpdater />
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {pickupCoords && (
                <Marker position={pickupCoords}>
                  <Popup>Pickup</Popup>
                </Marker>
              )}
              {dropoffCoords && (
                <Marker position={dropoffCoords}>
                  <Popup>Drop-off</Popup>
                </Marker>
              )}
              {route && <Polyline positions={route} color="blue" />}
            </MapContainer>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RideBooking;
