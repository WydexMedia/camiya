import React from "react";

export default function ContactPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Address</h2>
            <p className="text-gray-700 leading-relaxed">
              Metappil tower, bypass junction, near flyover, near Q tech online exam center, Ramanattukara, Kozhikode, Kerala 673633
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Toll Free</h3>
              <a href="tel:18002578600" className="text-teal-700 hover:text-teal-800 font-medium">
                1800 257 8600
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <a href="mailto:camiya@gmail.com" className="text-teal-700 hover:text-teal-800 font-medium">
                camiya@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">We’d love to hear from you</h2>
          <p className="text-gray-600">For any inquiries or support, reach out via phone or email. We typically respond within 24 hours.</p>
        </div>
      </div>
    </div>
  );
} 