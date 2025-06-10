import React from "react";


import Link from "next/link";
import productsData from "../data/products.json";

const budgetRanges = [
  { label: "Under 50000", max: 50000, image: "/images/2.jpg" },
  { label: "Under 40000", max: 40000, image: "/images/3.jpg" },
  { label: "Under 30000", max: 30000, image: "/images/1.jpg" },
  { label: "Under 20000", max: 20000, image: "/images/4.jpg" },
];

const ShopOnBudget = () => (
  <section className="px-4 sm:px-6 py-12">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-semibold text-gray-800">Shop on Budget</h2>
      <p className="text-gray-500 mt-2">We have every style at your affordable budget</p>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {budgetRanges.map((range) => {
        const count = (productsData as any[]).filter((p) => p.price <= range.max).length;
        return (
          <Link
            key={range.label}
            href={{
              pathname: "/category/All",
              query: { maxPrice: range.max },
            }}
            className="relative rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 block"
          >
            <img src={range.image} alt={range.label} className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-semibold">{range.label}</h3>
              <p className="text-cyan-300 text-sm">{count} styles</p>
            </div>
          </Link>
        );
      })}
    </div>
  </section>
);

export default ShopOnBudget;
