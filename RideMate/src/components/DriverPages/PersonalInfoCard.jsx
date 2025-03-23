import React from "react";

const PersonalInfoCard = ({ formData }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="mb-2">
        <strong>Username:</strong> {formData.username}
      </div>
      <div className="mb-2">
        <strong>First Name:</strong> {formData.firstName}
      </div>
      <div className="mb-2">
        <strong>Last Name:</strong> {formData.lastName}
      </div>
      <div className="mb-2">
        <strong>Email:</strong> {formData.email}
      </div>
      <div className="mb-2">
        <strong>Pnone number:</strong> {formData.phoneNumber}
      </div>
      <div className="mb-2">
        <strong>Created At:</strong>{" "}
        {formData.createdAt ? new Date(formData.createdAt).toLocaleDateString() : ""}
      </div>
      <div className="mb-2">
        <strong>Role:</strong> {formData.role}
      </div>
      <div className="mb-2">
        <strong>Active:</strong> {formData.isActive ? "Yes" : "No"}
      </div>
      <div className="mb-2">
        <strong>License Number:</strong> {formData.licenseNumber}
      </div>
    </div>
  );
};

export default PersonalInfoCard;
