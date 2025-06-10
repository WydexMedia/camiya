import React from "react";
import Link from "next/link";

const categories = [
  "Rings",
  "Earrings",
  "Bangles",
  "Bracelets",
  "Necklaces",
  "Nose Pins",
  "Pendants",
  "Charms",
  "Guinness",
];

const NavCategories = () => (
  <nav className="bg-white border-b border-gray-200 text-sm font-semibold text-gray-700">
    <div
      className="flex md:justify-center space-x-8 md:space-x-20 py-3 overflow-x-auto scrollbar-hide px-2 md:px-0"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/category/${encodeURIComponent(cat)}`}
          className="hover:text-teal-700 uppercase whitespace-nowrap px-2 md:px-0"
        >
          {cat}
        </Link>
      ))}
    </div>
  </nav>
);

export default NavCategories;
