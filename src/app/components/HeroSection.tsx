
import React from "react";

const HeroSection = () => (
  <section className="relative bg-gradient-to-r from-blue-50 to-white py-12">
    <div className="flex justify-center flex-col">
      <picture>
        <source srcSet="/images/camires.jpg" media="(max-width: 767px)" />
        <img src="/images/CAMI.jpg" alt="Ring" className="w-full h-75% object-cover" />
      </picture>
    </div>
  </section> 
);

export default HeroSection;

