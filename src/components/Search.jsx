import React from 'react';

const Search = ({ onSearch }) => {
  return (
    <>
      <div>
        <input
          type="search"
          className="px-5 py-2 border border-gray-500 rounded-full focus:border-gray-700 focus:outline-none"
          placeholder="Search"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </>
  );
};

export default Search;