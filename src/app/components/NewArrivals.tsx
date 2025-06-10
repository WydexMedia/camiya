'use client'
import React, { useState } from "react";
import BuyNowPopup from "./form";
import productsData from "../data/products.json";
import Link from "next/link";
import ProductCard from "./ProductCard";

type Product = {
  category: string;
  image: string;
  price: number;
};

const products: Product[] = productsData as Product[];

const formatPrice = (price: number) =>
  "₹ " + price.toLocaleString("en-IN");

const NewArrivals = () => {
  const [showForm, setShowForm] = useState(false); // ✅ control modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const maxToShow = 8;
  const showProducts = products.slice(0, maxToShow);

  return (
    <section className="px-4 sm:px-6 py-12">
      <div className="mb-8 flex flex-col items-center text-center">
        <h2 className="text-3xl font-semibold text-gray-800">New Arrivals</h2>
        <p className="text-gray-500 mt-1">{products.length} New item added</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
        {showProducts.map((product: Product, idx: number) => (
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
          href={{ pathname: "/category/All", query: { sort: "new" } }}
          className="mt-4 sm:mt-0 inline-block px-6 py-4 text-teal-700 font-medium hover:text-teal-800 transition"
        >
          See All
        </Link>
      </div>

      {/* ✅ Render the modal only when needed */}
      {showForm && selectedProduct && (
        <BuyNowPopup
          product={selectedProduct}
          onClose={() => setShowForm(false)}
        />
      )}
    </section>
  );
};

export default NewArrivals;
