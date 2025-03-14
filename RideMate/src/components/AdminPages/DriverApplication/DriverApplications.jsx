import React, { useState, useEffect } from 'react';
import { driverApplications } from '../driveData'; // or replace with your API fetch

function DriverApplications() {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // In a real app, fetch from your API:
    // fetch('/api/driver-applications')
    //   .then(res => res.json())
    //   .then(data => setApplications(data))
    //   .catch(err => console.error(err));

    // For demo, use mock data:
    setApplications(driverApplications);
  }, []);

  const handleSelect = (app) => {
    setSelectedApp(app);
    // Reset category selection each time a new driver is selected
    setSelectedCategory(null);
  };

  const handleApprove = (app) => {
    // Implement your logic for approving with a chosen category
    console.log('Approved:', app, 'with category:', selectedCategory);
  };

  const handleDecline = (app) => {
    // Implement your logic for declining
    console.log('Declined:', app);
  };

  // Filter the applications based on the search term
  const filteredApps = applications.filter((app) =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Driver Applications
        </h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full md:w-1/2 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Grid Layout for Applications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: List of Applicants */}
          <div className="col-span-1">
            <div className="bg-white shadow rounded p-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Applicants
              </h2>
              <div className="space-y-2">
                {filteredApps.length > 0 ? (
                  filteredApps.map((app) => (
                    <div
                      key={app.id}
                      className={`p-2 rounded cursor-pointer hover:bg-gray-100 ${
                        selectedApp?.id === app.id
                          ? 'border-l-4 border-blue-500 bg-gray-50'
                          : ''
                      }`}
                      onClick={() => handleSelect(app)}
                    >
                      {app.name} wants to become a driver
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No applications found.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Selected Application Details */}
          <div className="col-span-1 md:col-span-2">
            <div className="bg-white shadow rounded p-4 h-full">
              {selectedApp ? (
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
                  <div className="mt-6">
                    <h3 className="font-medium text-gray-700 mb-2">
                      Select Ride Category:
                    </h3>
                    <div className="flex space-x-3">
                      {/* Economy */}
                      <button
                        className={`px-4 py-2 rounded border ${
                          selectedCategory === 'Economy'
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedCategory('Economy')}
                      >
                        Economy
                      </button>
                      {/* Standard */}
                      <button
                        className={`px-4 py-2 rounded border ${
                          selectedCategory === 'Standard'
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedCategory('Standard')}
                      >
                        Standard
                      </button>
                      {/* Premium */}
                      <button
                        className={`px-4 py-2 rounded border ${
                          selectedCategory === 'Premium'
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedCategory('Premium')}
                      >
                        Premium
                      </button>
                    </div>
                  </div>

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
                      onClick={() => handleApprove(selectedApp)}
                      disabled={!selectedCategory}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                      onClick={() => handleDecline(selectedApp)}
                    >
                      Decline
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-gray-500">
                  No application selected.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DriverApplications;
