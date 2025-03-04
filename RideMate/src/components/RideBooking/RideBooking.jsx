import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const RideBooking = () => {
  const [selectedRide, setSelectedRide] = useState("standard");
  const [userLocation, setUserLocation] = useState([51.4416, 5.4697]); // Default to Eindhoven
  const [currentLocation, setCurrentLocation] = useState(null);
  
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error fetching location: ", error);
        }
      );
    }
  }, []);

  return (
    <div className="bg-gray-900 text-white font-sans">
      
      {/* Booking Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-12 py-16 bg-white text-black">
        <div className="max-w-lg space-y-6">
          <div className="space-x-4">
            <button className="bg-blue-700 text-white px-6 py-3 rounded">Book a Taxi</button>
            <button className="bg-blue-700 text-white px-6 py-3 rounded">Car Return Service</button>
          </div>
          <button className="bg-teal-400 text-white px-6 py-3 rounded">Set your pickup/drop-off locations</button>

          <h3 className="text-lg font-semibold">Ride options:</h3>
          <div className="flex space-x-4">
            {["standard", "premium", "economy"].map((option) => (
              <button
                key={option}
                onClick={() => setSelectedRide(option)}
                className={`px-4 py-2 rounded ${
                  selectedRide === option ? "bg-blue-700 text-white" : "bg-teal-400 text-black"
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>

          <p>
            <strong>Estimated fare:</strong> --
          </p>
          <p>
            <strong>Estimated time:</strong> --
          </p>

          <button className="bg-blue-700 text-white px-6 py-3 rounded">Confirm your ride</button>
        </div>

        {/* Map */}
        <div className="w-full md:w-1/2 h-80 mt-8 md:mt-0">
          <MapContainer center={currentLocation || userLocation} zoom={13} className="h-full w-full rounded-lg">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={currentLocation || userLocation}>
              <Popup>{currentLocation ? "Your current location" : "Default: Eindhoven"}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>
    </div>
  );
};

export default RideBooking;
