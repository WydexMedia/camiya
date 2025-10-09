'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const BrandStory = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Images Grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/shop_on_budimg/shop1.jpg"
                  alt="Diamond Craftsmanship"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative h-48 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/CD18320.png"
                  alt="Elegant Ring"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="relative h-48 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/CD18331.png"
                  alt="Diamond Necklace"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/shop_on_budimg/shop2.jpg"
                  alt="Jewelry Collection"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold mb-4">
              Our Story
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Crafting Dreams Into
              <span className="block text-teal-600">Diamond Reality</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              For over three decades, Camiya Diamonds has been at the forefront of 
              luxury jewelry design. Each piece in our collection is meticulously 
              crafted by master artisans who pour their passion and expertise into 
              every diamond setting.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              We believe that jewelry is more than an accessory—it's a celebration 
              of life's most precious moments. From engagement rings that symbolize 
              eternal love to statement pieces that express individual style, we're 
              here to help you shine.
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-teal-600 mb-2">5+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-600 mb-2">10K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-600 mb-2">100%</div>
                <div className="text-sm text-gray-600">Certified Diamonds</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;

