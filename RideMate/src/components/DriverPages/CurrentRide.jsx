import React from "react";
import MapView from "../UserPages/RideBooking/MapView"; // Adjust import path as needed

function CurrentRide() {
  // Example coordinates (Eindhoven area)
  const pickupCoords = [51.4416, 5.4697];
  const dropoffCoords = [51.4386, 5.4757];

  // Optional route array (Polyline) between pickup and drop-off
  // If you have an actual route from a service, you can fill in real coordinates
  const route = [
    [51.4416, 5.4697],
    [51.4425, 5.4701],
    [51.4432, 5.4723],
    [51.4419, 5.4740],
    [51.4386, 5.4757],
  ];

  return (
    <div className="bg-white p-6 rounded shadow flex flex-col md:flex-row gap-6">
      {/* Left Column: Ride Details */}
      <div className="md:w-1/2">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Current Ride</h2>
        <div className="space-y-2">
          <p>
            <strong>Passenger:</strong> John Doe
          </p>
          <p>
            <strong>Phone number:</strong> 0555494503
          </p>
          <p>
            <strong>Pick-up location:</strong> 5615PE, Eindhoven
          </p>
          <p>
            <strong>Drop-off location:</strong> Eindhoven Central
          </p>
          <p>
            <strong>Estimated time:</strong> 8 min
          </p>
          <p>
            <strong>Estimated fare:</strong> 10 euro
          </p>
          <p>
            <strong>Request time:</strong> 19.02.2025 20:20
          </p>
        </div>
        <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Finish ride
        </button>
      </div>

      {/* Right Column: Map */}
      <div className="md:w-1/2">
        <MapView
          pickupCoords={pickupCoords}
          dropoffCoords={dropoffCoords}
          route={route}
        />
      </div>
    </div>
  );
}

export default CurrentRide;
