// SearchBar.tsx
import React, { ChangeEvent } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  searchText: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchText, onChange, onSearch }) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Existing Patient</h1>
      <div className="mb-4 flex items-center justify-center">
        <label htmlFor="search" className="mr-2 font-bold">
          Search Patient
        </label>
        <div className="border border-gray-300 rounded-md p-2 flex items-center relative">
          <input
            type="text"
            id="search"
            className="input-field pl-2 pr-8 outline-none"
            value={searchText}
            onChange={onChange} // Add onChange event here
            placeholder="Enter Name or Mobile"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none focus:outline-none" onClick={onSearch}>
            <FaSearch className="text-gray-400" />
          </button>
        </div>
      </div>
      <div>
        <p className="text-xs mb-1">(Patient ID, Name, Mobile Number)</p>
      </div>
    </div>
  );
};

export default SearchBar;