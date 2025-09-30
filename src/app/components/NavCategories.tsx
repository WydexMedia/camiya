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
  "Pendant Chain",
  "Guinness",
];

const NavCategories = () => (
  <nav className="bg-white border-b border-gray-200 text-sm font-semibold text-gray-700 sticky top-[73px] z-40">
    <div
      className="flex justify-center space-x-4 md:space-x-8 lg:space-x-12 py-3 overflow-x-auto scrollbar-hide px-4"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/category/${encodeURIComponent(cat)}`}
          className="hover:text-teal-700 uppercase whitespace-nowrap px-1 md:px-2 text-center min-w-fit"
        >
          {cat}
        </Link>
      ))}
    </div>
  </nav>
);

export default NavCategories;
