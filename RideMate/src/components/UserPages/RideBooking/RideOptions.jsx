import React from "react";

const RideOptions = ({ selectedRide, setSelectedRide }) => {
  return (
    <>
      <h3 className="text-lg font-semibold">Ride options:</h3>
      <div className="flex space-x-4">
        {["standard", "premium", "economy"].map((option) => (
          <button
            key={option}
            onClick={() => setSelectedRide(option)}
            className={`px-4 py-2 rounded ${
              selectedRide === option ? "bg-blue-700 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
    </>
  );
};

export default RideOptions;
