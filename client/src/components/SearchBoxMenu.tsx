import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBoxMenu() {
  return (
    <div className="flex justify-center mt-5">
      <form className="flex items-center bg-zinc-50 px-1 py-1 rounded-lg shadow-neo-sm" action="/search">
        <FaSearch color="#3a2e3c" className="mx-2" />
        <input
          type="search"
          placeholder="جستجو در منو"
          name="query"
          className="px-2 py-1 text-[#3a2e3c] focus:outline-zinc-400 w-64"
          spellCheck="false"
          autoComplete="off"
        />
      </form>
    </div>
  );
}

export default SearchBoxMenu;
