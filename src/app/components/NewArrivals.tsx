'use client'
import React, { useState } from "react";
import BuyNowPopup from "./form"; // ✅ This is a component
import productsData from "../data/products.json";
import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "./WishlistContext";
import { Heart } from "lucide-react";
import { toast } from "sonner";

type Product = {
  id: string;
  category: string;
  name: string;
  image: string;
  price: number;
  weight: string;
  purity: string;
  stones: string;
};

const products: Product[] = productsData as Product[];

const formatPrice = (price: number) =>
  "₹ " + price.toLocaleString("en-IN");

const NewArrivals = () => {
  const [showForm, setShowForm] = useState(false); // ✅ control modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

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
          <div className="text-center group" key={idx}>
            <div className="bg-gray-100 p-4 sm:p-6 relative rounded cursor-pointer hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <Link href={`/product/${idx}`}>
                <Image src={product.image} alt={product.category} width={400} height={300} className="w-full h-40 sm:h-48 object-contain mx-auto" loading="eager" priority />
              </Link>
              <button
                aria-label="Toggle wishlist"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const isWishlisted = wishlist.some((p) => p.image === product.image && p.category === product.category && p.price === product.price);
                  if (!isWishlisted) {
                    addToWishlist(product);
                    toast.success("Added to wishlist", {
                      duration: 3000,
                      position: "bottom-right",
                    });
                  } else {
                    removeFromWishlist(product);
                    toast.success("Removed from wishlist", {
                      duration: 3000,
                      position: "bottom-right",
                    });
                  }
                }}
                className={`absolute top-2 right-2 text-xl ${wishlist.some((p) => p.image === product.image && p.category === product.category && p.price === product.price) ? 'text-red-700' : 'text-gray-400'}`}
              >
                <Heart 
                  size={20} 
                  fill={wishlist.some((p) => p.image === product.image && p.category === product.category && p.price === product.price) ? 'currentColor' : 'none'}
                />
              </button>
            </div>
            <p className="text-lg font-semibold mt-2">{formatPrice(product.price)}</p>
            <Link href={`/product/${idx}`} className="block">
              <p className="text-sm text-gray-700 font-medium hover:text-teal-600 transition-colors cursor-pointer">
                {product.name}
              </p>
            </Link>
            <a href="#" className="text-sm text-teal-700 font-medium block mb-2">Check delivery date</a>
            <button 
              onClick={() => {
                setSelectedProduct(product);
                setShowForm(true);
              }}
              className="mt-1 px-4 py-2 bg-teal-600 text-white text-sm rounded hover:bg-teal-700 transition"
            >
              Buy Now
            </button>
          </div>
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
