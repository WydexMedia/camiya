'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import DeliveryCheckDialog from "./DeliveryCheckDialog";
import { useWishlist } from "./WishlistContext";
import { Heart, Menu, X, Phone, Mail, Sparkles } from "lucide-react";

const Header = () => {
  const { wishlist } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'shadow-2xl' : 'shadow-md'
        }`} 
        style={{ backgroundColor: '#023039' }}
      >
        {/* Top info bar - hidden on mobile */}
        <div className="hidden lg:block border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-2">
            <div className="flex items-center justify-between text-xs text-white/80">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Phone size={12} />
                  <span>98953 31916</span>
                </div>
                <div className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Mail size={12} />
                  <span>camiya@gmail.com</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-teal-200">
                <Sparkles size={12} className="animate-pulse" />
                <span className="font-medium">Premium Diamond Jewelry</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center gap-6">
            {/* Logo - Hidden on mobile, shown on desktop */}
            <Link href="/" className="hidden lg:flex items-center group lg:flex-none">
              <div className="relative">
                <Image 
                  className="w-20 h-20 transition-transform duration-300 group-hover:scale-110" 
                  src="/images/logo/camiya_white.png" 
                  alt="Camiya Diamonds" 
                  width={80} 
                  height={80} 
                />
                <div className="absolute inset-0 bg-teal-300/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="ml-3 hidden xl:block">
                
              </div>
            </Link>

            {/* Desktop Search and Actions */}
            <div className="hidden lg:flex flex-1 max-w-2xl items-center space-x-3">
              <div className="flex-1">
                <SearchBar />
              </div>
              <DeliveryCheckDialog />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link 
                href="/category/wishlist" 
                className="flex items-center space-x-2 text-white/90 hover:text-white transition-all duration-300 relative group px-3 py-2 rounded-lg hover:bg-white/5"
              >
                <div className="relative">
                  <Heart size={22} className="group-hover:scale-110 transition-transform duration-300" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shadow-lg animate-pulse">
                      {wishlist.length}
                    </span>
                  )}
                </div>
                <span className="font-medium text-sm relative">
                  Wishlist
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-300 to-emerald-300 group-hover:w-full transition-all duration-300 ease-out"></span>
                </span>
              </Link>
              
              <Link 
                href="/contact" 
                className="relative bg-gradient-to-r from-teal-400 to-emerald-400 text-teal-900 px-6 py-2.5 rounded-full font-semibold hover:from-teal-300 hover:to-emerald-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 overflow-hidden group"
              >
                <span className="relative z-10 text-sm">Contact Us</span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center justify-between w-full">
              {/* Left side - Wishlist */}
              <Link 
                href="/category/wishlist" 
                className="flex items-center text-white hover:text-teal-300 transition-colors duration-300 relative p-2"
              >
                <div className="relative">
                  <Heart size={22} />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shadow-lg">
                      {wishlist.length}
                    </span>
                  )}
                </div>
              </Link>
              
              {/* Center - Logo */}
              <Link href="/" className="flex items-center group">
                <div className="relative">
                  <Image 
                    className="w-28 h-28 transition-transform duration-300 group-hover:scale-110" 
                    src="/images/logo/camiya_white.png" 
                    alt="Camiya Diamonds" 
                    width={112} 
                    height={112} 
                  />
                  <div className="absolute inset-0 bg-teal-300/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </Link>
              
              {/* Right side - Menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-teal-300 transition-colors duration-300 p-2 hover:bg-white/5 rounded-lg"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-gradient-to-br from-white to-gray-50 border-t border-gray-200 shadow-2xl animate-in slide-in-from-top duration-300">
            <div className="px-6 py-6 space-y-5">
              {/* Mobile Search */}
              <div className="pb-2">
                <SearchBar />
              </div>
              
              {/* Mobile Delivery Check */}
              <div className="flex justify-center pb-2">
                <DeliveryCheckDialog />
              </div>
              
              {/* Contact Info */}
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-4 space-y-3 border border-teal-100">
                <div className="flex items-center space-x-3 text-sm text-gray-700 hover:text-teal-700 transition-colors">
                  <div className="bg-teal-100 p-2 rounded-lg">
                    <Phone size={16} className="text-teal-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Call us</p>
                    <p className="font-semibold">98953 31916</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-700 hover:text-teal-700 transition-colors">
                  <div className="bg-teal-100 p-2 rounded-lg">
                    <Mail size={16} className="text-teal-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Email us</p>
                    <p className="font-semibold">camiya@gmail.com</p>
                  </div>
                </div>
              </div>
              
              {/* CTA Button */}
              <Link 
                href="/contact" 
                className="block w-full text-center bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-3.5 rounded-xl font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] relative overflow-hidden group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Contact Us</span>
                  <Sparkles size={16} className="animate-pulse" />
                </span>
                <div className="absolute inset-0 bg-white/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Mobile search bar (fallback) - Enhanced design */}
      <div className="block lg:hidden bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-3 border-b border-gray-200">
        <SearchBar />
      </div>
    </>
  );
};

export default Header;
