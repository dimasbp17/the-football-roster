import React from 'react';
import { IoSearch } from 'react-icons/io5';

const Search = ({ onSearch, placeholder = 'Search' }) => {
  return (
    <label className="relative block w-full sm:w-72">
      <IoSearch className="absolute z-10 -translate-y-1/2 pointer-events-none left-4 top-1/2 text-white/40" />
      <input
        type="search"
        className="w-full py-3 pl-11 pr-5 text-sm text-white transition rounded-full glass placeholder:text-white/40 focus:border-volt focus:outline-none focus:ring-2 focus:ring-volt/30"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
      />
    </label>
  );
};

export default Search;
