"use client";
import React, { useState } from "react";
import type { Product } from "../../components/WishlistContext";
import Header from "../../components/Header";
import { useWishlist } from "../../components/WishlistContext";
import ProductCard from "../../components/ProductCard";
import Footer from "@/app/components/Footer";
import BuyNowPopup from "../../components/form";
import FeaturesSection from "@/app/components/FeaturesSection";

const WishlistPage: React.FC = () => {
  const { wishlist } = useWishlist();
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-5xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6 text-center">My Wishlist</h1>
        {wishlist.length === 0 ? (
          <div className="text-center text-gray-500 py-16">No items in your wishlist yet.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((product, idx) => (
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
        )}
        {/* Buy Now Modal */}
        {showForm && selectedProduct && (
          <BuyNowPopup
            product={selectedProduct}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
        <FeaturesSection />
        {/* Footer */}
      <Footer />
    </div>
  );
};

export default WishlistPage;
