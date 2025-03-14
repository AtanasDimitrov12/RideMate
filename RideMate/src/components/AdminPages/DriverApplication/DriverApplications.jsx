import React, { useState, useEffect } from 'react';
import { driverApplications } from '../driveData'; // or your API fetch
import SearchBar from './SearchBar';
import ApplicantList from './ApplicantList';
import ApplicantDetails from './ApplicantDetails';

function DriverApplications() {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // In a real app, fetch data from your API here
    // fetch('/api/driver-applications')
    //   .then(res => res.json())
    //   .then(data => setApplications(data))
    //   .catch(err => console.error(err));

    // Using mock data for now:
    setApplications(driverApplications);
  }, []);

  // When an applicant is clicked, set that applicant as selected and reset category
  const handleSelect = (app) => {
    setSelectedApp(app);
    setSelectedCategory(null);
  };

  // Approve/Decline handlers (currently just logs to console)
  const handleApprove = (app) => {
    console.log('Approved:', app, 'with category:', selectedCategory);
  };

  const handleDecline = (app) => {
    console.log('Declined:', app);
  };

  // Filter the applications based on the search term
  const filteredApps = applications.filter((app) =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
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
