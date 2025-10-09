import React from "react";
import Link from "next/link";

const categories = [
  "Rings",
  "Earrings",
  "Bangles",
  "Bracelets",
  "Pendants",
  "Pendant Chain",
];

const NavCategories = () => (
  <nav className="hidden md:block bg-white border-b border-gray-200 text-sm font-semibold text-gray-700 sticky top-[73px] z-40">
    <div
      className="flex justify-center space-x-4 md:space-x-8 lg:space-x-12 py-3 overflow-x-auto scrollbar-hide px-4"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/category/${encodeURIComponent(cat)}`}
          className="relative hover:text-teal-700 uppercase whitespace-nowrap px-1 md:px-2 text-center min-w-fit transition-colors duration-300 group"
        >
          <span className="relative">
            {cat}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-600 to-emerald-600 group-hover:w-full transition-all duration-300 ease-out"></span>
          </span>
        </Link>
      ))}
    </div>
  </nav>
);

export default NavCategories;
