"use client";
import React, { useState } from "react";
import productsData from "../data/products.json";
import Link from "next/link";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 0) {
      const filtered = (productsData as any[]).filter(
        (p) =>
          p.category.toLowerCase().includes(value.toLowerCase()) ||
          (p.price + "").includes(value) ||
          (p.image && p.image.toLowerCase().includes(value.toLowerCase()))
      );
      setResults(filtered.slice(0, 8));
      setShowDropdown(true);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 150);
  };

  return (
    <div className="relative w-full max-w-md mx-4">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">🔍</span>
      <input
        type="text"
        placeholder="Search for diamond jewellery"
        className="w-full pl-10 pr-4 py-2 rounded-full bg-white placeholder-gray-500 text-black focus:outline-none text-xs"
        value={query}
        onChange={handleChange}
        onFocus={() => query && setShowDropdown(true)}
        onBlur={handleBlur}
      />
      {showDropdown && results.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 max-h-72 overflow-y-auto">
          {results.map((item, idx) => (
            <Link
              href={"/category/" + encodeURIComponent(item.category)}
              key={idx}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-800"
              onClick={() => setShowDropdown(false)}
            >
              <img src={item.image} alt={item.category} className="w-10 h-10 object-contain rounded" />
              <div>
                <div className="font-semibold text-xs">{item.category}</div>
                <div className="text-xs text-gray-500">₹ {item.price.toLocaleString("en-IN")}</div>
              </div>
            </Link>
          ))}
          {results.length === 0 && (
            <div className="px-4 py-2 text-gray-500">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
