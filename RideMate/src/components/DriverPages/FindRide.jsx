import React, { useState, useEffect } from "react";

function FindRide() {
  // Mock rides for demonstration. In a real app, fetch from your API.
  const [rides, setRides] = useState([
    {
      id: 1,
      requestTime: "19.02.2025 20:20", // for "Req. time" sorting
      pickup: "5615PE",
      dropoff: "Station",
      estTime: "8min",
      fare: 10,
      passenger: "John Doe",
      phone: "0555494503",
    },
    {
      id: 2,
      requestTime: "19.02.2025 20:25",
      pickup: "5615PE",
      dropoff: "Eindhoven Central",
      estTime: "10min",
      fare: 12,
      passenger: "Jane Smith",
      phone: "0551234567",
    },
    // Add more rides as needed
  ]);

  // Track which ride is selected
  const [selectedRide, setSelectedRide] = useState(null);

  // The current sort column: 'reqTime', 'estTime', or 'fare'
  const [sortBy, setSortBy] = useState("reqTime");

  // Sort rides whenever sortBy changes
  useEffect(() => {
    const sorted = [...rides];
    switch (sortBy) {
      case "reqTime":
        // Sort ascending by requestTime (older on top)
        sorted.sort((a, b) => a.requestTime.localeCompare(b.requestTime));
        break;
      case "estTime":
        // Sort descending by estTime
        // e.g. '10min' => 10, '8min' => 8
        sorted.sort(
          (a, b) =>
            parseInt(b.estTime.replace(/\D/g, "")) -
            parseInt(a.estTime.replace(/\D/g, ""))
        );
        break;
      case "fare":
        // Sort descending by fare
        sorted.sort((a, b) => b.fare - a.fare);
        break;
      default:
        break;
    }
    setRides(sorted);
    // eslint-disable-next-line
  }, [sortBy]);

  const handleSelectRide = (ride) => {
    setSelectedRide(ride);
  };

  const handleSort = (column) => {
    setSortBy(column);
  };

  return (
    <div className="flex gap-6">
      {/* Left Panel: Rides List */}
      <div className="w-full md:w-2/3 bg-white p-4 rounded shadow">
        {/* Sort by Buttons */}
        <div className="bg-gray-100 p-4 mb-4 rounded">
          <h3 className="font-semibold mb-2">Sort by</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => handleSort("reqTime")}
              className={`px-4 py-2 rounded ${
                sortBy === "reqTime"
                  ? "bg-[#10C6C6] text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Req. time
            </button>
            <button
              onClick={() => handleSort("estTime")}
              className={`px-4 py-2 rounded ${
                sortBy === "estTime"
                  ? "bg-[#10C6C6] text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Est. time
            </button>
            <button
              onClick={() => handleSort("fare")}
              className={`px-4 py-2 rounded ${
                sortBy === "fare"
                  ? "bg-[#10C6C6] text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Fare
            </button>
          </div>
        </div>

        {/* Rides Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 font-semibold">pick up</th>
                <th className="px-4 py-2 font-semibold">drop-off</th>
                <th className="px-4 py-2 font-semibold">est. time</th>
                <th className="px-4 py-2 font-semibold">fare</th>
              </tr>
            </thead>
            <tbody>
              {rides.map((ride) => (
                <tr
                  key={ride.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSelectRide(ride)}
                >
                  <td className="border-t px-4 py-2">{ride.pickup}</td>
                  <td className="border-t px-4 py-2">{ride.dropoff}</td>
                  <td className="border-t px-4 py-2">{ride.estTime}</td>
                  <td className="border-t px-4 py-2">{ride.fare}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Panel: Selected Ride Details */}
      <div className="w-full md:w-1/3 bg-white p-4 rounded shadow">
        {selectedRide ? (
          <>
            <h2 className="text-lg font-bold mb-2">
              Passenger: {selectedRide.passenger}
            </h2>
            <p>
              <strong>Pick-up location:</strong> {selectedRide.pickup}
            </p>
            <p>
              <strong>Drop-off location:</strong> {selectedRide.dropoff}
            </p>
            <p>
              <strong>Estimated time:</strong> {selectedRide.estTime}
            </p>
            <p>
              <strong>Estimated fare:</strong> {selectedRide.fare} euro
            </p>
            <p>
              <strong>Request time:</strong> {selectedRide.requestTime}
            </p>
            <button className="mt-4 bg-[#10C6C6] hover:opacity-90 text-white px-4 py-2 rounded">
              Start a ride
            </button>
          </>
        ) : (
          <p className="text-gray-500">
            No ride selected. Click a ride on the left.
          </p>
        )}
      </div>
    </div>
  );
}

export default FindRide;
