
import React from "react";
import Image from "next/image";

const HeroSection = () => (
  <section className="relative bg-gradient-to-r from-blue-50 to-white">
    <div className="flex justify-center flex-col">
      {/* Desktop - Landscape Image */}
      <div className="hidden md:block w-full">
        <Image 
          src="/images/CAMI.jpg" 
          alt="Camiya Diamonds Jewelry" 
          width={1920} 
          height={700} 
          priority
          sizes="100vw"
          className="w-full h-auto object-cover"
        />
      </div>
      
      {/* Mobile - Portrait Image */}
      <div className="block md:hidden w-full">
        <Image 
          src="/images/CAMI.jpg" 
          alt="Camiya Diamonds Jewelry" 
          width={800} 
          height={1200} 
          priority
          sizes="100vw"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  </section> 
);

export default HeroSection;

