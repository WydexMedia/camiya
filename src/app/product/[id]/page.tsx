'use client'
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import productsData from '../../data/products.json';
import BuyNowPopup from '../../components/form';

type Product = {
  id: string;
  category: string;
  name: string;
  image: string;
  price: number;
  weight: string;
  purity: string;
  stones: string;
};

const formatPrice = (price: number) =>
  "₹ " + price.toLocaleString("en-IN");

const ProductView = () => {
  const params = useParams();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Get product ID from URL params
  const productId = parseInt(params.id as string);
  
  // Find the product (using index as ID for now)
  const product = productsData[productId] as Product;
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <button 
            onClick={() => router.back()}
            className="px-6 py-3 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Generate additional images for the product (using the same image multiple times for demo)
  const productImages = [product.image, product.image, product.image, product.image];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <button 
                onClick={() => router.push('/')}
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-teal-600"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Home
              </button>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{product.category}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
              <img 
                src={productImages[selectedImage]} 
                alt={product.category}
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-teal-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.category} ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600">{product.category} - Premium Diamond Jewelry</p>
              <p className="text-sm text-gray-500 mt-1">Product ID: {product.id}</p>
            </div>

            {/* Price */}
            <div className="border-t border-b border-gray-200 py-4">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                <span className="ml-2 text-sm text-gray-500">Inclusive of all taxes</span>
              </div>
              <p className="text-sm text-green-600 mt-1">Free delivery</p>
            </div>

            {/* Product Specifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Product Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-500">Weight</p>
                  <p className="font-medium">{product.weight}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-500">Purity</p>
                  <p className="font-medium">{product.purity}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-500">Stones</p>
                  <p className="font-medium">{product.stones}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">{product.category}</p>
                </div>
              </div>
            </div>

            {/* Product Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Product Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Authentic Diamond Certification
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Lifetime Warranty
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Free Resizing Service
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  30-Day Return Policy
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-6">
              <button 
                onClick={() => setShowForm(true)}
                className="w-full bg-teal-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-teal-700 transition-colors"
              >
                Buy Now
              </button>
              
              <button className="w-full border-2 border-teal-600 text-teal-600 py-4 px-6 rounded-lg font-semibold text-lg hover:bg-teal-50 transition-colors">
                Add to Cart
              </button>
              
              <button className="w-full border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors">
                Add to Wishlist
              </button>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Delivery Information</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Free delivery on orders above ₹50,000</p>
                <p>• Estimated delivery: 3-5 business days</p>
                <p>• Cash on delivery available</p>
                <p>• Secure packaging with insurance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-600 leading-relaxed">
              This exquisite {product.name.toLowerCase()} features the finest quality diamonds, 
              carefully selected and expertly crafted by our master artisans. Each piece is designed 
              with attention to detail, ensuring both beauty and durability. The {product.name.toLowerCase()} 
              comes with a certificate of authenticity and is backed by our lifetime warranty.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Perfect for special occasions, this piece makes an ideal gift for your loved ones or 
              a treasured addition to your personal collection. Our commitment to quality ensures 
              that every piece meets the highest standards of excellence.
            </p>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Care Instructions</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Store in a cool, dry place away from direct sunlight</li>
                <li>• Clean with a soft cloth and mild soap solution</li>
                <li>• Avoid contact with chemicals, perfumes, and lotions</li>
                <li>• Regular professional cleaning recommended</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {productsData
              .filter((p: Product) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct: Product, idx: number) => (
                <Link 
                  key={relatedProduct.id} 
                  href={`/product/${productsData.findIndex((p: Product) => p.id === relatedProduct.id)}`}
                  className="group"
                >
                  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name}
                      className="w-full h-32 object-contain mb-3 group-hover:scale-105 transition-transform"
                    />
                    <h3 className="font-medium text-gray-900 text-sm mb-1 group-hover:text-teal-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg font-bold text-gray-900">{formatPrice(relatedProduct.price)}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* Buy Now Modal */}
      {showForm && (
        <BuyNowPopup
          product={product}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default ProductView; 