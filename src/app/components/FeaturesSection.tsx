import React from "react";

const FeaturesSection = () => (
  <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 py-12 bg-gray-50 text-center">
    <div>
      <i className="fas fa-truck text-3xl text-teal-700 mb-3"></i>
      <h4 className="font-semibold">Free shipping</h4>
      <p className="text-sm text-gray-600">Every order ships free!</p>
    </div>
    <div>
      <i className="fas fa-money-bill-wave text-3xl text-teal-700 mb-3"></i>
      <h4 className="font-semibold">100% Refund</h4>
      <p className="text-sm text-gray-600">Return within 15 days of delivery</p>
    </div>
    <div>
      <i className="fas fa-shield-halved text-3xl text-teal-700 mb-3"></i>
      <h4 className="font-semibold">100% Certified jewellery</h4>
      <p className="text-sm text-gray-600">BIS Hallmark, IGI, GIA</p>
    </div>
    <div>
      <i className="fas fa-rotate text-3xl text-teal-700 mb-3"></i>
      <h4 className="font-semibold">Lifetime Exchange & Buyback</h4>
      <p className="text-sm text-gray-600">Get 95% Exchange value and 90% cashback</p>
    </div>
  </section>
);

export default FeaturesSection;
