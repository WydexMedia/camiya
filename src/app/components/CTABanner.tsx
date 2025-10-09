'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const CTABanner = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/shop_on_budimg/shop3.jpg"
          alt="Luxury Background"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-gray-900/80" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-6xl mb-6">💍</div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your Dream Jewelry
            <span className="block text-teal-300">Awaits You</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Book a complimentary consultation with our jewelry experts and let us help you find or create the perfect piece.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/contact"
              className="group px-10 py-5 bg-gradient-to-r from-teal-400 to-emerald-400 text-white font-bold rounded-full hover:from-teal-500 hover:to-emerald-500 transition-all duration-300 text-lg shadow-2xl hover:shadow-teal-500/50 transform hover:-translate-y-2"
            >
              <span className="flex items-center gap-2">
                Schedule Consultation
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            
            <Link
              href="/category/ring"
              className="px-10 py-5 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 text-lg"
            >
              Browse Collections
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400 mb-2">IGI</div>
              <div className="text-sm text-gray-300">Certified Diamonds</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400 mb-2">5+</div>
              <div className="text-sm text-gray-300">Years Legacy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400 mb-2">10K+</div>
              <div className="text-sm text-gray-300">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400 mb-2">100%</div>
              <div className="text-sm text-gray-300">Satisfaction</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;

