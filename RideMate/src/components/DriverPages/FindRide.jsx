import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAllRidesByStatus, driverGetRide } from "../../repositories/RideRepo";
import { getDriverStatusById } from "../../repositories/DriverRepo";
import MapView from "../UserPages/RideBooking/MapView";

function FindRide() {
  // State for the rides array
  const [rides, setRides] = useState([]);
  // Track which ride is selected
  const [selectedRide, setSelectedRide] = useState(null);
  // The current sort column: 'reqTime' or 'fare'
  const [sortBy, setSortBy] = useState("reqTime");
  // Driver status state (e.g., "AVAILABLE", "OFFLINE", "ON_RIDE", etc.)
  const [driverStatus, setDriverStatus] = useState("OFFLINE");

  // On mount, fetch rides with status REQUESTED
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const data = await getAllRidesByStatus("REQUESTED");
        setRides(data || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load rides.");
      }
    };
    fetchRides();
  }, []);

  // Sort rides whenever `sortBy` changes
  useEffect(() => {
    const sorted = [...rides];
    switch (sortBy) {
      case "reqTime":
        // Sort ascending by requestTime (older on top)
        sorted.sort((a, b) => a.requestTime.localeCompare(b.requestTime));
        break;
      case "fare":
        // Sort descending by fare
        sorted.sort((a, b) => b.estimatedFare - a.estimatedFare);
        break;
      default:
        break;
    }
    setRides(sorted);
  }, [sortBy]);

  // Fetch driver's status from localStorage and backend
  useEffect(() => {
    const fetchDriverStatus = async () => {
      let driverId = null;
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          driverId = parsed.userId;
        } catch (error) {
          console.error("Error parsing user from localStorage:", error);
        }
      }
      if (!driverId) {
        toast.error("Driver not found. Please log in as driver.", { position: "top-center" });
        return;
      }
      try {
        const status = await getDriverStatusById(driverId);
        if (status) {
          setDriverStatus(status);
        }
      } catch (error) {
        console.error("Error fetching driver status:", error);
        toast.error("Failed to fetch driver status.", { position: "top-center" });
      }
    };
    fetchDriverStatus();
  }, []);

  // Handle selecting a ride from the table
  const handleSelectRide = (ride) => {
    setSelectedRide(ride);
  };

  // Handle changing the sort column
  const handleSort = (column) => {
    setSortBy(column);
  };

  // Start a ride (assign the driver) and remove it from the list
  const handleStartRide = async () => {
    if (!selectedRide) return;

    let driverId = null;
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        driverId = parsed.userId;
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
    if (!driverId) {
      toast.error("No driver ID found. Please log in as driver.", { position: "top-center" });
      return;
    }

    try {
      const updatedRide = await driverGetRide(selectedRide.id, driverId);
      if (updatedRide) {
        toast.success("You have started the ride!", { position: "top-center" });
        // Remove the started ride from the list and clear the selection
        setRides((prev) => prev.filter((ride) => ride.id !== selectedRide.id));
        setSelectedRide(null);
      } else {
        toast.error("Failed to start the ride.", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error starting the ride:", error);
      toast.error("An error occurred while starting the ride.", { position: "top-center" });
    }
  };

  return (
    <div className="flex gap-6">
      {/* Left Panel: Rides List */}
      <div className="w-full md:w-2/3 bg-white p-4 rounded shadow">
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
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 font-semibold">Pick up</th>
                <th className="px-4 py-2 font-semibold">Drop-off</th>
                <th className="px-4 py-2 font-semibold">Req. time</th>
                <th className="px-4 py-2 font-semibold">Fare</th>
              </tr>
            </thead>
            <tbody>
              {rides.map((ride) => (
                <tr
                  key={ride.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSelectRide(ride)}
                >
                  <td className="border-t px-4 py-2">{ride.pickupLocation}</td>
                  <td className="border-t px-4 py-2">{ride.dropOffLocation}</td>
                  <td className="border-t px-4 py-2">{ride.requestTime}</td>
                  <td className="border-t px-4 py-2">{ride.estimatedFare}</td>
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
              <strong>Pick-up location:</strong> {selectedRide.pickupLocation}
            </p>
            <p>
              <strong>Drop-off location:</strong> {selectedRide.dropOffLocation}
            </p>
            <p>
              <strong>Estimated fare:</strong> {selectedRide.estimatedFare} euro
            </p>
            <p>
              <strong>Request time:</strong> {selectedRide.requestTime}
            </p>
            <button
              onClick={handleStartRide}
              disabled={driverStatus !== "AVAILABLE"}
              title={driverStatus !== "AVAILABLE" ? `Your status is ${driverStatus}` : ""}
              className={`mt-4 text-white px-4 py-2 rounded ${
                driverStatus !== "AVAILABLE"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#10C6C6] hover:opacity-90"
              }`}
            >
              Start a ride
            </button>
          </>
        ) : (
          <p className="text-gray-500">No ride selected. Click a ride on the left.</p>
        )}
      </div>
    </div>
  );
}

export default FindRide;
