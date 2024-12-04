import React from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ManageSearchSharpIcon from '@mui/icons-material/ManageSearchSharp';

function Searchbar() {
  return (
    <div className="w-full relative">
      <input
        type="text"
        placeholder="Search Posts"
        className="w-full px-10 py-1 rounded-md outline-none border text-gray-600 pr-10"
      />
      <ManageSearchSharpIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"/>
      <HelpOutlineIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
  );
}

export default Searchbar;
