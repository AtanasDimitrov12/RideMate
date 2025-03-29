import React from 'react';

function ApplicantList({ applicants, selectedApp, onSelect }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Applicants
      </h2>
      <div className="space-y-2">
        {applicants.length > 0 ? (
          applicants.map((app) => (
            <div
              key={app.id}
              className={`p-2 rounded cursor-pointer hover:bg-gray-100 ${
                selectedApp?.id === app.id
                  ? 'border-l-4 border-blue-500 bg-gray-50'
                  : ''
              }`}
              onClick={() => onSelect(app)}
            >
              {app.firstName + " " + app.lastName} wants to become a driver
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No applications found.
          </p>
        )}
      </div>
    </div>
  );
}

export default ApplicantList;
