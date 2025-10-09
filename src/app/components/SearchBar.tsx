"use client";
import React, { useState } from "react";
import productsData from "../data/products.json";
import Link from "next/link";
import { Search } from "lucide-react";
import Image from "next/image";

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
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        placeholder="Search for diamond jewellery..."
        className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/95 backdrop-blur-sm placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:bg-white text-sm shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
        value={query}
        onChange={handleChange}
        onFocus={() => query && setShowDropdown(true)}
        onBlur={handleBlur}
      />
      {showDropdown && results.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto backdrop-blur-lg animate-in fade-in slide-in-from-top-2 duration-200">
          {results.map((item, idx) => (
            <Link
              href={"/category/" + encodeURIComponent(item.category)}
              key={idx}
              className="flex items-center gap-4 px-4 py-3 hover:bg-gradient-to-r hover:from-teal-50 hover:to-emerald-50 text-gray-800 cursor-pointer transition-all duration-200 first:rounded-t-2xl last:rounded-b-2xl border-b border-gray-50 last:border-b-0 group"
              onClick={() => setShowDropdown(false)}
            >
              <div className="relative">
                <Image 
                  src={item.image} 
                  alt={item.category} 
                  width={48} 
                  height={48} 
                  className="w-12 h-12 object-contain rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-200" 
                />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-gray-900 group-hover:text-teal-700 transition-colors">{item.category}</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">₹ {item.price.toLocaleString("en-IN")}</div>
              </div>
              <Search className="w-4 h-4 text-gray-300 group-hover:text-teal-500 transition-colors" />
            </Link>
          ))}
          {results.length === 0 && (
            <div className="px-4 py-3 text-gray-500 text-sm">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
