import React from "react";
import Link from "next/link";


const Header = () => (
  <>
    <header className="bg-teal-900 text-white py-3 px-6 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <a href="/">
          <img className="w-24 h-12" src="/images/camiya-logo.png" alt="Logo" />
        </a>
      </div>
      <div className="hidden md:flex items-center space-x-4 flex-1 justify-end">
        <div className="relative w-full max-w-md mx-4">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search for diamond jewellery"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white placeholder-gray-500 text-black focus:outline-none text-xs"
          />
        </div>
        <Link href="/category/wishlist" className="hover:underline">Wishlist</Link>
        <button className="hover:underline">Contact Us</button>
      </div>
      <div className="flex md:hidden items-center space-x-4">
        <Link href="/category/wishlist" className="hover:underline">Wishlist</Link>
        <button className="hover:underline">Contact Us</button>
      </div>
   

     
    </header>
    {/* Mobile search bar below header */}
    <div className="block md:hidden bg-white px-2 py-2">
      <div className="relative w-full">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">🔍</span>
        <input
          type="text"
          placeholder="Search for diamond jewellery"
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 placeholder-gray-500 text-black focus:outline-none text-xs"
        />
      </div>
    </div>
   
  </>
);

export default Header;
