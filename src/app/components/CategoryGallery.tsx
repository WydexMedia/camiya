'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Rings',
    image: '/images/shop_on_budimg/ringbg.jpeg',
    link: '/category/ring',
    description: 'From engagement to everyday elegance',
    featured: true,
  },
  {
    name: 'Pendant Chain',
    image: '/images/shop_on_budimg/shop_cat.jpg',
    link: '/category/pendant-chain',
    description: 'Elegant chains with stunning pendants',
    featured: false,

  },
  {
    name: 'Earrings',
    image: '/images/shop_on_budimg/shop4.jpg',
    link: '/category/studs',
    description: 'Sparkle from every angle',
    featured: false,
  },
  {
    name: 'Bangles',
    image: '/images/shop_on_budimg/bangles.jpeg',
    link: '/category/bangles',
    description: 'Wrist candy that dazzles',
    featured: false,
  },
 
];

const CategoryGallery = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold mb-4">
              Shop by Category
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Your Perfect Piece
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our curated collections designed to complement every style and celebration.
            </p>
          </motion.div>
        </div>

        {/* Grid layout with featured items */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl ${
                category.featured ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1'
              }`}
            >
              <Link href={category.link}>
                <div className={`relative ${category.featured ? 'h-[450px]' : 'h-[220px]'} overflow-hidden`}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    <h3 className={`font-bold text-white mb-2 group-hover:text-teal-400 transition-colors ${
                      category.featured ? 'text-4xl md:text-5xl' : 'text-2xl'
                    }`}>
                      {category.name}
                    </h3>
                    <p className={`text-gray-200 mb-4 ${
                      category.featured ? 'text-lg' : 'text-sm'
                    }`}>
                      {category.description}
                    </p>
                    <div className="inline-flex items-center text-teal-400 font-semibold group-hover:gap-2 transition-all">
                      Explore
                      <svg
                        className="w-5 h-5 ml-1 group-hover:translate-x-2 transition-transform"
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
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGallery;

