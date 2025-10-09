'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Gem, Sparkles, Gift, Truck, Users, RefreshCw } from 'lucide-react';

const experiences = [
  {
    icon: Gem,
    title: 'Certified Excellence',
    description: 'Every diamond is ethically sourced and comes with international certification guaranteeing authenticity and quality.',
  },
  {
    icon: Sparkles,
    title: 'Bespoke Design',
    description: 'Work with our master craftsmen to create a one-of-a-kind piece that perfectly captures your vision.',
  },
  {
    icon: Gift,
    title: 'Lifetime Warranty',
    description: 'Enjoy peace of mind with our comprehensive lifetime warranty and complimentary maintenance services.',
  },
  {
    icon: Truck,
    title: 'Secure Delivery',
    description: 'Free insured shipping and elegant packaging for all orders, with white-glove delivery for premium pieces.',
  },
  {
    icon: Users,
    title: 'Personal Consultation',
    description: 'Schedule a private appointment with our jewelry experts for personalized guidance and styling advice.',
  },
  {
    icon: RefreshCw,
    title: 'Buy Back Program',
    description: 'Upgrade or exchange your jewelry anytime with our flexible buy-back and trade-in program.',
  },
];

const LuxuryExperience = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold mb-4">
              The Camiya Experience
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              More Than Just Jewelry
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing an exceptional experience from the moment 
              you discover us to long after your purchase.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 rounded-2xl border-2 border-gray-100 hover:border-teal-400 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50"
            >
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                <experience.icon className="w-12 h-12 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {experience.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {experience.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LuxuryExperience;

