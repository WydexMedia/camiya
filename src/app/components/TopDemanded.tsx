'use client';
import React from "react";
import productsData from "../data/products.json";
import Link from "next/link";
import BuyNowPopup from "./form";
import ProductCard from "./ProductCard";


type Product = {
  category: string;
  image: string;
  price: number;
};

const products: Product[] = productsData as Product[];

const formatPrice = (price: number) =>
  "₹ " + price.toLocaleString("en-IN");

// Example: Top demanded = top 8 most expensive
const topDemanded = [...products]
  .sort((a, b) => b.price - a.price)
  .slice(0, 8);

const TopDemanded = () => {
  const [showForm, setShowForm] = React.useState(false); // ✅ control modal
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  return (
    <section className="px-6 py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-semibold text-gray-800">Top Demanded Items</h2>
        <p className="text-gray-500 mt-1">{topDemanded.length} Top items</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
        {topDemanded.map((product: Product, idx: number) => (
          <ProductCard
            key={idx}
            product={product}
            onBuyNow={(product) => {
              setSelectedProduct(product);
              setShowForm(true);
            }}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Link
          href={{ pathname: "/category/All", query: { sort: "demanded" } }}
          className="mt-4 sm:mt-0 inline-block px-6 py-12 text-teal-700 font-medium hover:text-teal-800 transition"
        >
          See All
        </Link>
      </div>
      {/* Render the modal only when needed */}
      {showForm && selectedProduct && (
        <BuyNowPopup
          product={selectedProduct}
          onClose={() => setShowForm(false)}
        />
      )}
    </section>
  );
};

export default TopDemanded;
