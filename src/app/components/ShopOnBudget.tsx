import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Lato } from "next/font/google";
import productsData from "../data/products.json";

const lato = Lato({ 
  weight: ["400", "700"],
  subsets: ["latin"] 
});

const budgetRanges = [
  { label: "Under 50000", max: 50000, image: "/images/shop_on_budimg/shop1.jpg" },
  { label: "Under 40000", max: 40000, image: "/images/shop_on_budimg/shop2.jpg" },
  { label: "Under 30000", max: 30000, image: "/images/shop_on_budimg/shop3.jpg" },
  { label: "Under 20000", max: 20000, image: "/images/shop_on_budimg/shop4.jpg" },
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
                         <Image src={range.image} alt={range.label} width={800} height={600} className="w-full h-full object-cover" priority loading="eager" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className={`text-lg font-semibold ${lato.className}`}>{range.label}</h3>
            </div>
          </Link>
        );
      })}
    </div>
  </section>
);

export default ShopOnBudget;
