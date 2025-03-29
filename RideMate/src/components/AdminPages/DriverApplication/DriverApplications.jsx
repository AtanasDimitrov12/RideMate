import React, { useState, useEffect } from 'react';
import { getDriverRequests, deleteDriverRequest } from '../../../repositories/DriverRequestRepo';
import { createDriver } from '../../../repositories/DriverRepo';
import { createVehicle } from '../../../repositories/VehicleRepo';
import SearchBar from './SearchBar';
import ApplicantList from './ApplicantList';
import ApplicantDetails from './ApplicantDetails';

function DriverApplications() {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getDriverRequests();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching driver applications:', error);
      }
    };

    fetchApplications();
  }, []);

  // When an applicant is clicked, set that applicant as selected and reset category
  const handleSelect = (app) => {
    setSelectedApp(app);
    setSelectedCategory(null);
  };

  // Decline handler: simply delete the driver request
  const handleDecline = async (app) => {
    try {
      await deleteDriverRequest(app.id);
      console.log('Declined:', app);
      // Remove the declined application from the list
      setApplications(applications.filter(item => item.id !== app.id));
      setSelectedApp(null);
    } catch (error) {
      console.error('Error declining application:', error);
    }
  };

  // Approve handler: delete the driver request, create a driver and then create a vehicle
  const handleApprove = async (app) => {
    try {
      // 1. Delete the driver request
      await deleteDriverRequest(app.id);

      // 2. Create a new driver
      const driverDTO = {
        userId: app.userId, // if applicable
        firstName: app.firstName,
        lastName: app.lastName,
        licenseNumber: app.licenseNumber,
        Status:"OFFLINE",
        rideOption: selectedCategory,
      };
      const newDriver = await createDriver(driverDTO);
      if (!newDriver) {
        console.error("Error creating driver");
        return;
      }

      // 3. Create a vehicle for the new driver
      const vehicleDTO = {
        driverId: newDriver.id, // Adjust according to your driver's returned field
        brand: app.brand,
        model: app.model,
        licensePlate: app.licensePlate,
      };
      const newVehicle = await createVehicle(vehicleDTO);
      if (!newVehicle) {
        console.error("Error creating vehicle");
        return;
      }

      console.log('Approved:', app, 'with category:', selectedCategory);
      // Remove the approved application from the list
      setApplications(applications.filter(item => item.id !== app.id));
      setSelectedApp(null);
    } catch (error) {
      console.error('Error approving application:', error);
    }
  };

  // Filter the applications based on the search term.
  // Assuming each application has firstName and lastName.
  const filteredApps = applications.filter((app) =>
    (`${app.firstName || ""} ${app.lastName || ""}`).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Driver Applications
        </h1>

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Grid Layout for Applications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Left Column: List of Applicants */}
          <div className="col-span-1">
            <ApplicantList
              applicants={filteredApps}
              selectedApp={selectedApp}
              onSelect={handleSelect}
            />
          </div>

          {/* Right Column: Selected Applicant Details */}
          <div className="col-span-1 md:col-span-2">
            <div className="bg-white shadow rounded p-4 h-full">
              <ApplicantDetails
                selectedApp={selectedApp}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onApprove={handleApprove}
                onDecline={handleDecline}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DriverApplications;
