import React from "react";

const UserInfoCard = ({ userInfo }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h3 className="text-xl font-semibold mb-4">Current Information</h3>
    <p>
      <strong>Username:</strong> {userInfo.username}
    </p>
    <p>
      <strong>Email:</strong> {userInfo.email}
    </p>
    <p>
      <strong>Phone Number:</strong> {userInfo.phoneNumber}
    </p>
    <p>
      <strong>Role:</strong> {userInfo.role}
    </p>
    <p>
      <strong>Is Active:</strong> {userInfo.isActive ? "Yes" : "No"}
    </p>
    <p>
      <strong>Account Created:</strong>{" "}
      {new Date(userInfo.createdAt).toLocaleDateString()}
    </p>
  </div>
);

export default UserInfoCard;
