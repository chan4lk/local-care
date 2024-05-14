// SearchBar.tsx
import React, { ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  searchText: string;
  handleSearchTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void; // Function to handle the search
}

const SearchBar: React.FC<SearchBarProps> = ({ searchText, handleSearchTextChange, handleSearch }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(); // Call handleSearch when Enter key is pressed
    }
  };

  return (
    <div className="mb-4 border border-gray-300 rounded-md p-2 flex items-center relative">
      <input
        type="text"
        id="search"
        className="input-field pl-2 pr-8 outline-none w-full" // Adjust padding
        value={searchText}
        onChange={handleSearchTextChange}
        onKeyDown={handleKeyDown} // Listen for Enter key press
        placeholder="Enter Name or Mobile Number"
      />
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none focus:outline-none"
        onClick={handleSearch} // Call handleSearch when button is clicked
      >
        <FaSearch className="text-gray-400" />
      </button>
    </div>
  );
};

export default SearchBar;
