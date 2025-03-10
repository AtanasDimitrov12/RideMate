import React from "react";

const SearchBox = ({ label, value, setValue, fetchSuggestions, suggestions = [], handleSelect }) => {
  return (
    <div className="relative flex items-center border border-gray-300 rounded">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
              onClick={() => !suggestion.isPlaceholder && handleSelect(suggestion)}
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
