"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const [open, setOpen] = useState({
    general: false,
    quick: false,
    contact: false,
  });

  return (
    <footer className="text-white px-4 sm:px-8 py-8 sm:py-12 text-sm" style={{ backgroundColor: '#023039' }}>
      {/* Mobile Accordion */}
      <div className="block lg:hidden">
        {/* Accordion Sections */}
        <div className="border-t border-gray-700">
          <button 
            className="w-full flex justify-between items-center py-4 font-semibold text-base cursor-pointer" 
            onClick={() => setOpen(o => ({...o, general: !o.general}))}
          >
            GENERAL INFO
            <span className="text-xl">{open.general ? "−" : "+"}</span>
          </button>
          {open.general && (
            <ul className="space-y-2 text-gray-300 pb-4 pl-2">
              <li><Link href="/faq" className="cursor-pointer hover:text-white">Faq</Link></li>
              <li><Link href="/contact" className="cursor-pointer hover:text-white">Contact Us</Link></li>
              <li><Link href="#" className="cursor-pointer hover:text-white">About Us</Link></li>
              <li><Link href="/privacy" className="cursor-pointer hover:text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="cursor-pointer hover:text-white">Return Policy</Link></li>
              <li><Link href="/terms" className="cursor-pointer hover:text-white">Terms & Conditions</Link></li>
              <li><Link href="#" className="cursor-pointer hover:text-white">Outlets</Link></li>
            </ul>
          )}
        </div>

        <div className="border-t border-gray-700">
          <button 
            className="w-full flex justify-between items-center py-4 font-semibold text-base cursor-pointer" 
            onClick={() => setOpen(o => ({...o, quick: !o.quick}))}
          >
            QUICK LINKS
            <span className="text-xl">{open.quick ? "−" : "+"}</span>
          </button>
          {open.quick && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-300 pb-4 pl-2">
              <Link href="/category/Rings" className="cursor-pointer hover:text-white">Rings</Link>
              <Link href="/category/Earrings" className="cursor-pointer hover:text-white">Earrings</Link>
              <Link href="/category/Bracelets" className="cursor-pointer hover:text-white">Bracelet</Link>
              <Link href="/category/Bangles" className="cursor-pointer hover:text-white">Bangle</Link>
              <Link href="/category/Pendants" className="cursor-pointer hover:text-white">Pendant</Link>
              <Link href="/category/Chains" className="cursor-pointer hover:text-white">Chains</Link>
            </div>
          )}
        </div>
       
        <div className="border-t border-gray-700">
          <button 
            className="w-full flex justify-between items-center py-4 font-semibold text-base cursor-pointer" 
            onClick={() => setOpen(o => ({...o, contact: !o.contact}))}
          >
            CONTACT INFO
            <span className="text-xl">{open.contact ? "−" : "+"}</span>
          </button>
          {open.contact && (
            <div className="space-y-4 text-gray-300 pb-4 pl-2">
              <div>
                <p className="font-semibold text-white mb-2">INDIA CONTACT INFO</p>
                <p className="mb-1"><i className="fas fa-map-marker-alt mr-2"></i> Calicut, Kerala, India</p>
                <p className="mb-1"><i className="fas fa-phone-alt mr-2"></i> 98953 31916</p>
                <p><i className="fas fa-envelope mr-2"></i> info@camiyadiamonds.com</p>
              </div>
            </div>
          )}
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-700 pt-6 pb-4">
          <p className="font-semibold mb-3">Follow us on</p>
          <div className="flex space-x-4 text-xl text-white">
            <a href="https://www.facebook.com/camiyadiamonds/" className="cursor-pointer hover:text-teal-400"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/camiya.diamonds/?hl=en" className="cursor-pointer hover:text-teal-400"><i className="fab fa-instagram"></i></a>
            <a href="https://www.youtube.com/@camiyadiamonds" className="cursor-pointer hover:text-teal-400"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* GENERAL INFO */}
          <div>
            <h3 className="text-base font-bold mb-6 tracking-wider">GENERAL INFO</h3>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/faq" className="cursor-pointer hover:text-white transition-colors inline-block relative group"><span className="relative">Faq<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 group-hover:w-full transition-all duration-300 ease-out"></span></span></Link></li>
              <li><Link href="/contact" className="cursor-pointer hover:text-white transition-colors inline-block relative group"><span className="relative">Contact Us<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 group-hover:w-full transition-all duration-300 ease-out"></span></span></Link></li>
              <li><Link href="#" className="cursor-pointer hover:text-white transition-colors inline-block relative group"><span className="relative">About Us<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 group-hover:w-full transition-all duration-300 ease-out"></span></span></Link></li>
              <li><Link href="/privacy" className="cursor-pointer hover:text-white transition-colors inline-block relative group"><span className="relative">Privacy Policy<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 group-hover:w-full transition-all duration-300 ease-out"></span></span></Link></li>
              <li><Link href="#" className="cursor-pointer hover:text-white transition-colors inline-block relative group"><span className="relative">Return Policy<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 group-hover:w-full transition-all duration-300 ease-out"></span></span></Link></li>
              <li><Link href="/terms" className="cursor-pointer hover:text-white transition-colors inline-block relative group"><span className="relative">Terms & Conditions<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 group-hover:w-full transition-all duration-300 ease-out"></span></span></Link></li>
              <li><Link href="#" className="cursor-pointer hover:text-white transition-colors inline-block relative group"><span className="relative">Outlets<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 group-hover:w-full transition-all duration-300 ease-out"></span></span></Link></li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-base font-bold mb-6 tracking-wider">QUICK LINKS</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-gray-300">
              <Link href="/category/Rings" className="cursor-pointer hover:text-white transition-colors inline-block relative group"><span className="relative">Rings<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 group-hover:w-full transition-all duration-300 ease-out"></span></span></Link>
              <Link href="/category/Earrings" className="cursor-pointer hover:text-white transition-colors inline-block relative group"><span className="relative">Earrings<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 group-hover:w-full transition-all duration-300 ease-out"></span></span></Link>
              <Link href="/category/Bracelets" className="cursor-pointer hover:text-white transition-colors inline-block relative group"><span className="relative">Bracelet<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 group-hover:w-full transition-all duration-300 ease-out"></span></span></Link>
              <Link href="/category/Bangles" className="cursor-pointer hover:text-white transition-colors inline-block relative group"><span className="relative">Bangle<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 group-hover:w-full transition-all duration-300 ease-out"></span></span></Link>
              <Link href="/category/Pendants" className="cursor-pointer hover:text-white transition-colors inline-block relative group"><span className="relative">Pendant<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 group-hover:w-full transition-all duration-300 ease-out"></span></span></Link>
              <Link href="/category/Chains" className="cursor-pointer hover:text-white transition-colors inline-block relative group"><span className="relative">Chains<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 group-hover:w-full transition-all duration-300 ease-out"></span></span></Link>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="text-base font-bold mb-6 tracking-wider">INDIA CONTACT INFO</h3>
            <div className="text-gray-300 space-y-2 mb-8">
              <p className="flex items-start gap-2">
                <i className="fas fa-map-marker-alt mt-1"></i>
                <span>Calicut, Kerala, India</span>
              </p>
              <p className="flex items-center gap-2">
                <i className="fas fa-phone-alt"></i>
                <span>Toll Free Number : 0000000000</span>
              </p>
              <p className="flex items-center gap-2">
                <i className="fas fa-envelope"></i>
                <span>info@camiyadiamonds.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Logo and Description */}
        <div className="border-t border-gray-800 mt-12 pt-12">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <Image 
                src="/images/camiya-logo.png" 
                alt="Camiya Diamonds" 
                width={150} 
                height={60}
                className="mx-auto"
              />
            </div>
            <p 
              className="text-gray-400 text-xs leading-5 font-normal" 
              style={{ fontFamily: 'Lato, "Lato Fallback", sans-serif' }}
            >
            Camiya Diamonds was born from a leading name in the wholesale diamond jewellery market—an established business that caters to prominent retail jewellers. Many gold-focused retailers hesitate to introduce diamond jewellery into their collections due to various operational and market challenges, and Camiya Diamonds was created to bridge that gap.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800 mt-8 pt-6 text-center">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-gray-500 text-xs">
          <p>© 2025 Camiya Diamonds | All rights reserved</p>
          <span className="hidden sm:inline">|</span>
          <p>Designed & developed by <a href="https://wydexmedia.com" className="cursor-pointer hover:text-teal-400 transition-colors">Wydex</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
