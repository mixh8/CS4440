'use client';
 
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

// Dummy data for industries and price changes
const industries = ["Tech", "Finance", "Healthcare", "Energy"]; // Change these to be accurate later
const priceChanges = ["Underperforming", "Overperforming"];

export default function Search({ placeholder }: { placeholder: string }) {
    const [similarStocks, setSimilarStocks] = useState<number>(5); // Initial value for the number of similar stocks

    function handleSearch(term: string) {
    console.log(term);
  }

  function handleQuery() {
    // Logic to run query based on filters
    console.log("Querying based on filters...");
  }

  return (
    <div className="z-10 max-w-5xl w-full lg:flex items-center justify-between font-mono text-sm relative">
      <input
        type="text"
        placeholder={placeholder}
        className="block w-full lg:w-auto rounded-md border border-gray-200 py-2 px-4 text-sm placeholder:text-gray-500 text-black"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <select className="ml-2 rounded-md border border-gray-200 py-2 px-4 text-black">
        {industries.map((industry) => (
          <option key={industry} value={industry}>{industry}</option>
        ))}
      </select>
      <select className="ml-2 rounded-md border border-gray-200 py-2 px-4 text-black">
        {priceChanges.map((change) => (
          <option key={change} value={change}>{change}</option>
        ))}
      </select>
        <div className="ml-2 flex items-center">
        <label htmlFor="similarStocks" className="mr-2 text-white">Number of Similar Stocks:</label>
        <input
          type="number"
          id="similarStocks"
          min="1"
          max="100"
          value={similarStocks}
          onChange={(e) => setSimilarStocks(Number(e.target.value))}
          className="w-16 rounded-md border border-gray-200 py-2 px-4 text-sm text-black"
        />
      </div>
      <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleQuery}>
        Search
      </button>
    </div>
  );
}
