"use client";
import React, { useState } from "react";

const Footer = () => {
  const [open, setOpen] = useState({
    general: false,
    quick: false,
    contact: false,
  });
  return (
    <footer className="bg-teal-800 text-white px-4 sm:px-6 py-8 sm:py-12 text-sm">
      {/* Mobile Accordion */}
      <div className="block md:hidden">
        {/* Logo & Description always visible */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-4">Camiyo Diamonds</h1>
          <p className="text-gray-200">
            Camiyo Diamonds is a trusted name in diamond jewellery, based in Calicut. We are known for our fine craftsmanship and offer premium jewellery collections for every occasion.
          </p>
        </div>
        {/* Accordion Sections */}
        <div className="border-t border-gray-600">
          <button className="w-full flex justify-between items-center py-3 font-semibold" onClick={() => setOpen(o => ({...o, general: !o.general}))}>
            General info
            <span>{open.general ? "-" : "+"}</span>
          </button>
          {open.general && (
            <ul className="space-y-1 text-gray-300 pb-3">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Privacy policy</a></li>
              <li><a href="#">Return policy</a></li>
              <li><a href="#">Terms & conditions</a></li>
              <li><a href="#">Outlets</a></li>
            </ul>
          )}
        </div>
        <div className="border-t border-gray-600">
          <button className="w-full flex justify-between items-center py-3 font-semibold" onClick={() => setOpen(o => ({...o, quick: !o.quick}))}>
            Quick links
            <span>{open.quick ? "-" : "+"}</span>
          </button>
          {open.quick && (
            <ul className="space-y-1 text-gray-300 pb-3">
              <li><a href="#">Rings</a></li>
              <li><a href="#">Earrings</a></li>
              <li><a href="#">Bangles</a></li>
              <li><a href="#">Bracelets</a></li>
              <li><a href="#">Necklaces</a></li>
              <li><a href="#">Nose pins</a></li>
              <li><a href="#">Pendants</a></li>
            </ul>
          )}
        </div>
        <div className="border-t border-gray-600">
          <button className="w-full flex justify-between items-center py-3 font-semibold" onClick={() => setOpen(o => ({...o, contact: !o.contact}))}>
            Camiyo contact info
            <span>{open.contact ? "-" : "+"}</span>
          </button>
          {open.contact && (
            <div className="mb-4 space-y-1 text-gray-300 pb-3">
              <p><i className="fas fa-map-marker-alt mr-2"></i> Calicut, Kerala</p>
              <p><i className="fas fa-phone-alt mr-2"></i> Toll Free: 1800 257 8600</p>
              <p><i className="fas fa-envelope mr-2"></i> camiyo@gmail.com</p>
              <p className="font-semibold mt-4 mb-2">Follow us on</p>
              <div className="flex space-x-4 text-xl text-white">
                <a href="https://www.instagram.com/camiya.diamonds/?hl=en"><i className="fab fa-facebook-f hover:text-gray-300"></i></a>
                <a href="https://www.instagram.com/camiya.diamonds/?hl=en"><i className="fab fa-linkedin-in hover:text-gray-300"></i></a>
                <a href="https://www.instagram.com/camiya.diamonds/?hl=en"><i className="fab fa-instagram hover:text-gray-300"></i></a>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Logo & Description */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-4">Camiyo Diamonds</h1>
          <p className="text-gray-200">
            Camiyo Diamonds is a trusted name in diamond jewellery, based in Calicut. We are known for our fine craftsmanship and offer premium jewellery collections for every occasion.
          </p>
        </div>
        {/* General Info */}
        <div>
          <h4 className="font-semibold mb-3">General info</h4>
          <ul className="space-y-1 text-gray-300">
            <li><a href="#">FAQ</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Privacy policy</a></li>
            <li><a href="#">Return policy</a></li>
            <li><a href="#">Terms & conditions</a></li>
            <li><a href="#">Outlets</a></li>
          </ul>
        </div>
        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3">Quick links</h4>
          <ul className="space-y-1 text-gray-300">
            <li><a href="#">Rings</a></li>
            <li><a href="#">Earrings</a></li>
            <li><a href="#">Bangles</a></li>
            <li><a href="#">Bracelets</a></li>
            <li><a href="#">Necklaces</a></li>
            <li><a href="#">Nose pins</a></li>
            <li><a href="#">Pendants</a></li>
          </ul>
        </div>
        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-3">Camiyo contact info</h4>
          <div className="mb-4 space-y-1 text-gray-300">
            <p><i className="fas fa-map-marker-alt mr-2"></i> Calicut, Kerala</p>
            <p><i className="fas fa-phone-alt mr-2"></i> Toll Free: 1800 257 8600</p>
            <p><i className="fas fa-envelope mr-2"></i> camiyo@gmail.com</p>
          </div>
          <div>
            <p className="font-semibold mb-2">Follow us on</p>
            <div className="flex space-x-4 text-xl text-white">
              <a href="https://www.facebook.com/camiyadiamonds/"><i className="fab fa-facebook-f hover:text-gray-300"></i></a>
              {/* <a href="https://www.instagram.com/camiya.diamonds/?hl=en"><i className="fab fa-linkedin-in hover:text-gray-300"></i></a>÷ */}
              <a href="https://www.instagram.com/camiya.diamonds/?hl=en"><i className="fab fa-instagram hover:text-gray-300"></i></a>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-600 pt-4 text-gray-400">
        <p>2024 Camiyo Diamonds | All rights reserved</p>
        <div className="flex space-x-4 my-2 md:my-0 text-xl">
          <i className="fab fa-cc-visa"></i>
          <i className="fab fa-cc-mastercard"></i>
          <i className="fab fa-cc-paypal"></i>
          <i className="fab fa-cc-apple-pay"></i>
        </div>
        <p>Designed & developed by <a href="https://wydexmedia.com">Wydex</a></p>
      </div>
    </footer>
  );
};

export default Footer;
