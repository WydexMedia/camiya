'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import DeliveryCheckDialog from "./DeliveryCheckDialog";
import { useWishlist } from "./WishlistContext";
import { Heart, Menu, X, Phone, Mail } from "lucide-react";

const Header = () => {
  const { wishlist } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Main header */}
      <header className="shadow-lg sticky top-0 z-50" style={{ backgroundColor: '#023039' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image className="w-12 h-12" src="/images/camiyatrans.png" alt="Camiya Diamonds" width={48} height={48} />
              </Link>
            </div>

            {/* Desktop Search and Delivery Check */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8 space-x-4">
              <div className="flex-1">
                <SearchBar />
              </div>
              
              {/* Delivery Check Dialog */}
              <DeliveryCheckDialog />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link 
                href="/category/wishlist" 
                className="flex items-center space-x-2 text-white hover:text-teal-300 transition-colors duration-300 relative group"
              >
                <div className="relative">
                  <Heart size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white text-teal-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {wishlist.length}
                    </span>
                  )}
                </div>
                <span className="font-medium">Wishlist</span>
              </Link>
              
              <Link 
                href="/contact" 
                className="bg-white text-teal-800 px-6 py-2.5 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center space-x-4">
              <Link 
                href="/category/wishlist" 
                className="flex items-center text-white hover:text-teal-300 transition-colors duration-300 relative"
              >
                <div className="relative">
                  <Heart size={20} />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white text-teal-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {wishlist.length}
                    </span>
                  )}
                </div>
              </Link>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-teal-300 transition-colors duration-300"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-6 py-4 space-y-4">
              <div className="pb-4">
                <SearchBar />
              </div>
              
              {/* Mobile Delivery Check */}
              <div className="flex justify-center">
                <DeliveryCheckDialog />
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 border-t pt-4">
                <div className="flex items-center space-x-2">
                  <Phone size={14} />
                  <span>1800 257 8600</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={14} />
                  <span>camiya@gmail.com</span>
                </div>
              </div>
              
              <Link 
                href="/contact" 
                className="block w-full text-center bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-3 rounded-full font-medium hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 shadow-lg mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Mobile search bar (fallback) */}
      <div className="block lg:hidden bg-gray-50 px-6 py-3">
        <SearchBar />
      </div>
    </>
  );
};

export default Header;
