import React from "react";

const PhoneUpdateForm = ({ newPhone, onNewPhoneChange, onSubmit }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h3 className="text-xl font-semibold mb-4">Update Phone Number</h3>
    <form onSubmit={onSubmit}>
      <label className="block mb-2 font-medium">Phone Number</label>
      <input
        type="text"
        value={newPhone}
        onChange={onNewPhoneChange}
        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded"
      >
        Update Phone
      </button>
    </form>
  </div>
);

export default PhoneUpdateForm;
