import React from 'react';
import CategorySelection from './CategorySelection';

function ApplicantDetails({
  selectedApp,
  selectedCategory,
  setSelectedCategory,
  onApprove,
  onDecline,
}) {
  if (!selectedApp) {
    return <p className="text-gray-500">No application selected.</p>;
  }

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-700">
        Name: {selectedApp.name}
      </h2>
      <p className="mt-2">
        <strong>License number:</strong> {selectedApp.licenseNumber}
      </p>
      <p className="mt-1">
        <strong>Brand:</strong> {selectedApp.brand}
      </p>
      <p className="mt-1">
        <strong>Model:</strong> {selectedApp.model}
      </p>
      <p className="mt-1">
        <strong>License Plate:</strong> {selectedApp.plate}
      </p>

      {/* Category Selection */}
      <CategorySelection
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Action Buttons */}
      <div className="flex space-x-2 mt-6">
        <button
          className={`px-4 py-2 rounded 
            ${
              selectedCategory
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-green-300 text-white cursor-not-allowed'
            }
          `}
          onClick={() => onApprove(selectedApp)}
          disabled={!selectedCategory}
        >
          Approve
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => onDecline(selectedApp)}
        >
          Decline
        </button>
      </div>
    </>
  );
}

export default ApplicantDetails;
