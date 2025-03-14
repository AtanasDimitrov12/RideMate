import React from "react";

const TabNavigation = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        className={`px-6 py-3 rounded ${
          selectedTab === "taxi" ? "bg-blue-700 text-white" : "bg-gray-300 text-black"
        }`}
        onClick={() => setSelectedTab("taxi")}
      >
        Book a Taxi
      </button>
      <button
        className={`px-6 py-3 rounded ${
          selectedTab === "return" ? "bg-blue-700 text-white" : "bg-gray-300 text-black"
        }`}
        onClick={() => setSelectedTab("return")}
      >
        Car Return Service
      </button>
    </div>
  );
};

export default TabNavigation;
