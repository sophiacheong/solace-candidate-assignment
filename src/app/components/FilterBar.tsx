import React from "react";
import type { Adovcate } from "../page";

type FilterBarProps = {
  advocates: Adovcate[];
  setSearchTerm: (value: string) => void;
  searchTerm: string;
};

export const FilterBar: React.FC<FilterBarProps> = ({
  advocates,
  setSearchTerm,
  searchTerm,
}) => {
  const onClick = () => {
    console.log(advocates);
    setSearchTerm("");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let searchTerm = e.target.value;
    const searchElement = document.getElementById("search-term");

    if (searchElement) {
      searchElement.innerHTML = searchTerm;
    }

    setSearchTerm(searchTerm);
  };

  return (
    <div className="flex flex-col w-1/2 gap-1 border-2 border-double p-2 rounded-lg border-slate-400">
      <p className="dark:text-white">
        Searching for: <span id="search-term"></span>
      </p>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={onChange}
        value={searchTerm}
      />
      <div className="flex justify-end">
        <button
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={onClick}
        >
          Reset Search
        </button>
      </div>
    </div>
  );
};
