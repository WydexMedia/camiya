// 'use client';
// import React from "react";

// const HeroSection = () => (
//   <section className="relative bg-gradient-to-r from-blue-50 to-white py-12">
//     <div className="flex justify-center flex-col">
//       <picture>
//         <source srcSet="/images/camires.jpg" media="(max-width: 767px)" />
//         <img src="/images/cami.jpg" alt="Ring" className="w-full h-75% object-cover" />
//       </picture>
//     </div>
//   </section>
// );

// export default HeroSection;


'use client';
import React from "react";

const HeroSection = () => (
  <section className="relative bg-gradient-to-r from-blue-50 to-white py-12">
    <div className="flex justify-center flex-col w-full">
      <picture className="w-full">
        <source srcSet="/images/camires.jpg" media="(max-width: 767px)" />
        <img
          src="/images/cami.jpg"
          alt="Ring"
          className="w-full h-auto object-cover"
        />
      </picture>
    </div>
  </section>
);

export default HeroSection;
