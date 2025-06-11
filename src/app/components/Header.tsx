'use client';

import React from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { useWishlist } from "./WishlistContext";



const Header = () => {
  const { wishlist } = useWishlist();
  return (
    <>
      <header className="bg-teal-900 text-white py-3 px-6 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <a href="/">
            <img className="w-24 h-12" src="/images/camiya-logo.png" alt="Logo" />
          </a>
        </div>
        <div className="hidden md:flex items-center space-x-4 flex-1 justify-center">
          <SearchBar />
        </div>
        <div className="hidden md:flex items-center space-x-4 flex-none">
          <Link href="/category/wishlist" className="hover:underline flex items-center relative">
            <i className="fas fa-heart text-lg mr-1"></i>
            <span className="font-medium">Wishlist</span>
            {wishlist.length > 0 && (
              <span className="ml-1 bg-white text-teal-900 rounded-full px-2 py-0.5 text-xs font-bold">{wishlist.length}</span>
            )}
          </Link>
          <button className="hover:underline">Contact Us</button>
        </div>
        <div className="flex md:hidden items-center space-x-4">
          <Link href="/category/wishlist" className="hover:underline flex items-center relative">
            <i className="fas fa-heart text-lg mr-1"></i>
            <span className="font-medium">Wishlist</span>
            {wishlist.length > 0 && (
              <span className="ml-1 bg-teal-900 text-white rounded-full px-2 py-0.5 text-xs font-bold border border-white">{wishlist.length}</span>
            )}
          </Link>
          {/* <button className="hover:underline">Contact Us</button> */}
        </div>
      </header>
      {/* Mobile search bar below header */}
      <div className="block md:hidden bg-white roundness-md px-2 py-2 flex justify-center shadow-md">
        <SearchBar/>
      </div>
    </>
  );
};

export default Header;
