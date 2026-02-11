'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ModernHero = () => {
  return (
    <section
      className="relative min-h-[140vh] overflow-hidden"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-4">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                NATURAL DIAMONDS
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-black mb-4 leading-tight">
                <span className="block font-script text-4xl md:text-6xl lg:text-7xl mb-1">
                  Realness redefined
                </span>
                <span className="block font-script text-4xl md:text-6xl lg:text-7xl">
                  like you
                </span>
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-700 mb-3 leading-relaxed max-w-lg">
                Discover our exquisite collection of handcrafted diamond jewelry,
                where every piece tells a story of luxury and authenticity.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/category/Rings"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-full hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Explore Collections
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-gray-400 text-black font-semibold rounded-full hover:border-teal-600 hover:text-teal-600 transition-all duration-300"
                >
                  Book Consultation
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Image + Video */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative flex flex-col gap-8"
            >
              

              {/* Autoplay Video */}
              <div className="relative w-full rounded-2xl overflow-hidden shadow-xl">
                <video
                  src="/images/hero/camiya_webreel.MP4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
