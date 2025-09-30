
import React from "react";
import Image from "next/image";

const HeroSection = () => (
  <section className="relative bg-gradient-to-r from-blue-50 to-white py-12">
    <div className="flex justify-center flex-col">
      <div className="w-full">
        <Image 
          src="/images/CAMI.jpg" 
          alt="Ring" 
          width={1920} 
          height={700} 
          priority
          sizes="100vw"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  </section> 
);

export default HeroSection;

