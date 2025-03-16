import React, { useEffect, useState } from "react";
import { getCurrentRideByDriverId, finishRide } from "../../repositories/RideRepo";
import { toast } from "react-toastify";
import MapView from "../UserPages/RideBooking/MapView"; // Adjust path as needed
import axios from "axios";

// Helper function: Geocode an address using Nominatim
const geocodeAddress = async (address) => {
  try {
    const response = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        format: "json",
        q: address,
      },
    });
    if (response.data && response.data.length > 0) {
      const result = response.data[0];
      return [parseFloat(result.lat), parseFloat(result.lon)];
    }
    return null;
  } catch (error) {
    console.error("Error geocoding address:", error);
    return null;
  }
};

const CurrentRide = () => {
  const [currentRide, setCurrentRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [route, setRoute] = useState(null);

  // Fetch route from pickup and drop-off coordinates using openrouteservice API
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
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  // Fetch current ride and geocode the addresses
  useEffect(() => {
    const fetchRide = async () => {
      // Retrieve driverId from localStorage
      let driverId = null;
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          driverId = parsed.userId;
        } catch (err) {
          console.error("Error parsing user from localStorage:", err);
          setError("Error parsing driver information.");
          setLoading(false);
          return;
        }
      }
      if (!driverId) {
        setError("Driver not found. Please log in.");
        setLoading(false);
        return;
      }
      try {
        const rideData = await getCurrentRideByDriverId(driverId);
        setCurrentRide(rideData);
        if (rideData) {
          const pickup = await geocodeAddress(rideData.pickupLocation);
          const dropoff = await geocodeAddress(rideData.dropOffLocation);
          setPickupCoords(pickup);
          setDropoffCoords(dropoff);
        }
      } catch (err) {
        console.error("Error fetching current ride:", err);
        setError("Failed to fetch current ride.");
        toast.error("Failed to fetch current ride.", { position: "top-center" });
      } finally {
        setLoading(false);
      }
    };

    fetchRide();
  }, []);

  // Fetch route once pickup and drop-off coordinates are available
  useEffect(() => {
    if (pickupCoords && dropoffCoords) {
      fetchRoute();
    }
  }, [pickupCoords, dropoffCoords]);

  // Handler for finishing the ride
  const handleFinishRide = async () => {
    if (!currentRide) return;
    try {
      const finishedRide = await finishRide(currentRide.id);
      if (finishedRide) {
        toast.success("Ride finished successfully!", { position: "top-center" });
        // Option 1: Remove the ride from view:
        setCurrentRide(null);
        // Option 2: Update current ride state with finished ride details:
        // setCurrentRide(finishedRide);
      } else {
        toast.error("Failed to finish ride.", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error finishing ride:", error);
      toast.error("An error occurred while finishing the ride.", { position: "top-center" });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white p-6 rounded shadow flex flex-col md:flex-row gap-6">
      {/* Left Column: Ride Details */}
      <div className="md:w-1/2">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Current Ride</h2>
        {currentRide ? (
          <div className="space-y-2">
            <p>
              <strong>Passenger:</strong> {currentRide.passenger}
            </p>
            <p>
              <strong>Phone:</strong> {currentRide.phone}
            </p>
            <p>
              <strong>Pick-up location:</strong> {currentRide.pickupLocation}
            </p>
            <p>
              <strong>Drop-off location:</strong> {currentRide.dropOffLocation}
            </p>
            <p>
              <strong>Estimated fare:</strong> {currentRide.estimatedFare} euro
            </p>
            <p>
              <strong>Request time:</strong> {currentRide.requestTime}
            </p>
          </div>
        ) : (
          <p>No current ride in progress.</p>
        )}
        {currentRide && (
          <button
            onClick={handleFinishRide}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Finish ride
          </button>
        )}
      </div>

      {/* Right Column: Map */}
      <div className="md:w-1/2">
        <MapView
          pickupCoords={pickupCoords || [51.4416, 5.4697]} // Fallback coordinates if geocoding fails
          dropoffCoords={dropoffCoords || [51.4386, 5.4757]}
          route={route}
        />
      </div>
    </div>
  );
};

export default CurrentRide;
