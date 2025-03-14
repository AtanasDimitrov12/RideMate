import React from 'react';

function UserSearch({ searchTerm, setSearchTerm, handleSearch }) {
  return (
    <form onSubmit={handleSearch} className="mb-6 flex space-x-2">
      <input
        type="text"
        placeholder="Search user by username..."
        className="border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
}

export default UserSearch;
