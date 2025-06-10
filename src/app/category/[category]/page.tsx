"use client";
import React, { useState } from "react";
import Header from "../../components/Header";
import productsData from "../../data/products.json";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import ProductCard from "../../components/ProductCard";
import BuyNowPopup from "../../components/form";

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

type Product = {
  category: string;
  image: string;
  price: number;
};

const formatPrice = (price: number) => "₹ " + price.toLocaleString("en-IN");

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const selectedCategory = decodeURIComponent(params.category as string || "");
  const [sort, setSort] = useState<string>("");
  const [filter, setFilter] = useState<string[]>([selectedCategory]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  let filteredProducts = (productsData as Product[]).filter(
    (p) => filter.length === 0 || filter.includes(p.category)
  );

  if (sort === "low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  const handleCategoryFilter = (cat: string) => {
    setFilter((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      {/* Top Category Navbar */}
      <nav className="bg-white shadow text-sm font-semibold text-gray-700">
        <div className="flex justify-center md:justify-center space-x-2 md:space-x-6 py-4 uppercase overflow-x-auto scrollbar-hide px-2 md:px-0">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/category/${encodeURIComponent(cat)}`}
              className={`whitespace-nowrap px-2 md:px-0 hover:text-teal-700 ${selectedCategory === cat ? "text-teal-700 border-b-2 border-teal-700" : ""}`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </nav>
      {/* Main Content */}
      <div className="flex flex-col md:flex-row px-2 sm:px-4 md:px-6 py-4 md:py-8">
        {/* Sidebar Filters (Desktop) */}
        <aside className="w-full md:w-64 bg-white rounded shadow p-4 mb-4 md:mb-0 hidden md:block">
          <h3 className="text-lg font-semibold mb-3">Filter</h3>
          <div className="mb-4">
            <h4 className="font-medium mb-2">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              {categories.map((cat) => (
                <li key={cat}>
                  <label>
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={filter.includes(cat)}
                      onChange={() => handleCategoryFilter(cat)}
                    />
                    {cat} ({(productsData as Product[]).filter((p) => p.category === cat).length})
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Metal</h4>
            <label className="text-sm text-gray-700">
              <input type="checkbox" className="mr-2" checked readOnly />18 kt gold (223)
            </label>
          </div>
        </aside>
        {/* Mobile Filter Button */}
        <div className="flex md:hidden justify-end mb-4">
          <button
            className="bg-white border border-gray-300 rounded px-4 py-2 text-sm font-medium shadow"
            onClick={() => setShowMobileFilter(true)}
          >
            Filter
          </button>
        </div>
        {/* Mobile Filter Modal */}
        {showMobileFilter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded shadow-lg p-6 w-11/12 max-w-xs mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filter</h3>
                <button onClick={() => setShowMobileFilter(false)} className="text-gray-500 text-2xl leading-none">&times;</button>
              </div>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Categories</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <label>
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={filter.includes(cat)}
                          onChange={() => handleCategoryFilter(cat)}
                        />
                        {cat} ({(productsData as Product[]).filter((p) => p.category === cat).length})
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Metal</h4>
                <label className="text-sm text-gray-700">
                  <input type="checkbox" className="mr-2" checked readOnly />18 kt gold (223)
                </label>
              </div>
              <button
                className="mt-6 w-full bg-teal-800 text-white py-2 rounded hover:bg-teal-700"
                onClick={() => setShowMobileFilter(false)}
              >
                Apply
              </button>
            </div>
          </div>
        )}
        {/* Product Section */}
        <main className="flex-1 ml-0 md:ml-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2 sm:gap-0">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">{selectedCategory.toUpperCase()}</h2>
              <p className="text-xs sm:text-sm text-gray-600">{filteredProducts.length} products found</p>
            </div>
            <div>
              <label className="text-xs sm:text-sm text-gray-700">Sort by :</label>
              <select
                className="border border-gray-300 text-xs sm:text-sm rounded px-2 sm:px-3 py-1 ml-2"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Choose Price</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </select>
            </div>
          </div>
          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={idx}
                product={product}
                onBuyNow={(product) => {
                  setSelectedProduct(product);
                  setShowForm(true);
                }}
              />
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-8">No products found.</div>
            )}
          </div>
          {/* Modal for Buy Now */}
          {showForm && selectedProduct && (
            <BuyNowPopup
              product={selectedProduct}
              onClose={() => setShowForm(false)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
