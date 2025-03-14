import React from 'react';

function CategorySelection({ selectedCategory, setSelectedCategory }) {
  return (
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
  );
}

export default CategorySelection;
