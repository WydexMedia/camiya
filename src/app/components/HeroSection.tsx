import React from "react";

const HeroSection = () => (
  <section className="relative bg-gradient-to-r from-blue-50 to-white py-12">
    <h1 className="text-2xl font-semibold mb-6 text-teal-800 text-center">
      ELEGANCE WITH PERFECTION<br />CRAFTED TO ENCHANT
    </h1>
    <div className="flex justify-center flex-col">
      <img src="/images/cami-head.png" alt="Ring" className="w-full h-75% object-cover" />
    </div>
  </section>
);

export default HeroSection;
