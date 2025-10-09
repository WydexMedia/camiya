import React from "react";
import Link from "next/link";
import Image from "next/image";

const MobileCategoryGallery = () => {
  const categories = [
    {
      name: "Rings",
      image: "/images/shop_on_budimg/ringbg.jpeg",
      bgColor: "bg-pink-100"
    },
    {
      name: "Earrings", 
      image: "/images/shop_on_budimg/shop4.jpg",
      bgColor: "bg-yellow-100"
    },
    {
      name: "Bangles",
      image: "/images/shop_on_budimg/bangles.jpeg", 
      bgColor: "bg-purple-100"
    },
    {
      name: "Bracelets",
      image: "/images/shop_on_budimg/shop2.jpg",
      bgColor: "bg-blue-100"
    },
    {
      name: "Pendants",
      image: "/images/shop_on_budimg/shop3.jpg",
      bgColor: "bg-indigo-100"
    },
    {
      name: "Pendant Chain",
      image: "/images/shop_on_budimg/shop_cat.jpg",
      bgColor: "bg-green-100"
    }
  ];

  return (
    <div className="md:hidden bg-white py-8 px-4">
      <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
        {categories.map((category, index) => (
          <Link
            key={category.name}
            href={`/category/${encodeURIComponent(category.name)}`}
            className="flex flex-col items-center space-y-2 group"
          >
            <div className={`w-20 h-20 rounded-full ${category.bgColor} flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-300`}>
              <Image
                src={category.image}
                alt={category.name}
                width={60}
                height={60}
                className="object-cover w-14 h-14 rounded-full"
              />
            </div>
            <span className="text-xs font-semibold text-gray-800 uppercase tracking-wide text-center">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileCategoryGallery;
