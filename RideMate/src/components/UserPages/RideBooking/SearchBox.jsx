import React, { useState } from "react";
import axios from "axios";

const SearchBox = ({ label, value, setValue, setCoords }) => {
  const [suggestions, setSuggestions] = useState([]);

  // Fetch suggestions from your API when the query is long enough
  const fetchSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get("http://localhost:8080/api/location/search", {
        params: { q: query },
      });
      // Use the API response if available; otherwise, show a placeholder
      if (response.data && response.data.length > 0) {
        setSuggestions(response.data);
      } else {
        setSuggestions([{ display_name: "No results found", isPlaceholder: true }]);
      }
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      setSuggestions([]);
    }
  };

  // When a suggestion is clicked, update the parent's state
  const handleSelect = (suggestion) => {
    if (suggestion.isPlaceholder) return;
    const coords = [parseFloat(suggestion.lat), parseFloat(suggestion.lon)];
    setValue(suggestion.display_name);
    setCoords(coords);
    setSuggestions([]);
  };

  return (
    <div className="relative flex items-center border border-gray-300 rounded">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          fetchSuggestions(e.target.value);
        }}
        placeholder={label}
        className="px-4 py-2 w-full"
      />
      <button
        onClick={() => fetchSuggestions(value)}
        className="px-3 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700"
      >
        🔍
      </button>
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 w-full max-h-40 overflow-auto shadow-lg z-50 top-full mt-1">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelect(suggestion)}
              className={`cursor-pointer px-4 py-2 ${
                suggestion.isPlaceholder ? "text-gray-500 italic" : "hover:bg-gray-200"
              }`}
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
