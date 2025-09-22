'use client'
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import productsData from '../../data/products.json';
import Image from 'next/image';
import BuyNowPopup from '../../components/form';
import { useWishlist } from '../../components/WishlistContext';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '../../components/Header';
import NavCategories from '../../components/NavCategories';
import { Heart, Share2 } from 'lucide-react';

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
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoForm, setVideoForm] = useState({ name: "", email: "", mobile: "", language: "English" });
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [trialForm, setTrialForm] = useState({ name: "", mobile: "", location: "" });
  
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
            className="px-6 py-3 bg-teal-600 text-white rounded hover:bg-teal-700 transition cursor-pointer"
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <NavCategories />
      <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <button 
                onClick={() => router.push('/')}
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-teal-600 cursor-pointer"
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
              <Image 
                src={productImages[selectedImage]} 
                alt={product.category}
                width={800}
                height={800}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImage === index ? 'border-teal-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image 
                    src={image} 
                    alt={`${product.category} ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-contain"
                    loading="eager"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <div className="flex items-center gap-3">
                  <button
                    onClick={async () => {
                      const shareData = {
                        title: product.name,
                        text: `Check out this beautiful ${product.category} from Camiya Diamonds - ${formatPrice(product.price)}`,
                        url: window.location.href,
                      };

                      try {
                        if (navigator.share) {
                          await navigator.share(shareData);
                        } else {
                          // Fallback: copy to clipboard
                          await navigator.clipboard.writeText(window.location.href);
                          toast.success("Link copied to clipboard!", {
                            duration: 3000,
                            position: "bottom-right",
                          });
                        }
                      } catch (error) {
                        // Fallback: copy to clipboard
                        try {
                          await navigator.clipboard.writeText(window.location.href);
                          toast.success("Link copied to clipboard!", {
                            duration: 3000,
                            position: "bottom-right",
                          });
                        } catch (clipboardError) {
                          toast.error("Unable to share. Please copy the link manually.", {
                            duration: 3000,
                            position: "bottom-right",
                          });
                        }
                      }
                    }}
                    className="text-gray-400 hover:text-teal-600 cursor-pointer transition-colors"
                    aria-label="Share product"
                  >
                    <Share2 size={20} />
                  </button>
                  <button
                    onClick={() => {
                      const isWishlisted = wishlist.some((p) => p.image === product.image && p.category === product.category && p.price === product.price);
                      if (!isWishlisted) {
                        addToWishlist(product);
                        toast.success("Added to wishlist", {
                          duration: 3000,
                          position: "bottom-right",
                        });
                      } else {
                        removeFromWishlist(product);
                        toast.success("Removed from wishlist", {
                          duration: 3000,
                          position: "bottom-right",
                        });
                      }
                    }}
                    className={`cursor-pointer transition-colors ${
                      wishlist.some((p) => p.image === product.image && p.category === product.category && p.price === product.price) 
                        ? 'text-red-600' 
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                    aria-label="Toggle wishlist"
                  >
                    <Heart 
                      size={24} 
                      fill={wishlist.some((p) => p.image === product.image && p.category === product.category && p.price === product.price) ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>
              </div>
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

              {/* request at home */}
            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setShowVideoModal(true)}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
                aria-label="Request video call"
              >
                <div className="relative">
                  <svg 
                    className="h-6 w-6 group-hover:animate-pulse" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M15 10L21 6V18L15 14V10Z" 
                      fill="currentColor" 
                      className="drop-shadow-sm"
                    />
                    <path 
                      d="M3 6C3 4.89543 3.89543 4 5 4H13C14.1046 4 15 4.89543 15 6V18C15 19.1046 14.1046 20 13 20H5C3.89543 20 3 19.1046 3 18V6Z" 
                      fill="currentColor" 
                      className="drop-shadow-sm"
                    />
                    <circle 
                      cx="9" 
                      cy="12" 
                      r="2" 
                      fill="white" 
                      className="drop-shadow-sm"
                    />
                    <path 
                      d="M17 8L21 6V18L17 16V8Z" 
                      fill="currentColor" 
                      fillOpacity="0.7" 
                      className="drop-shadow-sm"
                    />
                  </svg>
                </div>
                <span className="font-semibold">Request Video Call</span>
              </button>
              <button
                onClick={() => setShowTrialModal(true)}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
                aria-label="Request trial at home"
              >
                <div className="relative">
                  <svg 
                    className="h-6 w-6 group-hover:animate-pulse" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="drop-shadow-sm"
                    />
                    <path 
                      d="M9 7V5C9 4.44772 9.44772 4 10 4H14C14.5523 4 15 4.44772 15 5V7" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="drop-shadow-sm"
                    />
                  </svg>
                </div>
                <span className="font-semibold">Trial At Home</span>
              </button>
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
                className="w-full bg-teal-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-teal-700 transition-colors cursor-pointer"
              >
                Buy Now
              </button>
              
              <button className="w-full border-2 border-teal-600 text-teal-600 py-4 px-6 rounded-lg font-semibold text-lg hover:bg-teal-50 transition-colors cursor-pointer">
                Add to Cart
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
                    <Image 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name}
                      width={300}
                      height={240}
                      className="w-full h-32 object-contain mb-3 group-hover:scale-105 transition-transform"
                      loading="lazy"
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

      {/* Video Call Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-md p-6 relative">
            <button
              aria-label="Close"
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              onClick={() => setShowVideoModal(false)}
            >
              ×
            </button>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Request a Video Call</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  value={videoForm.name}
                  onChange={(e) => setVideoForm({ ...videoForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  value={videoForm.email}
                  onChange={(e) => setVideoForm({ ...videoForm, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  placeholder="10-digit number"
                  value={videoForm.mobile}
                  onChange={(e) => setVideoForm({ ...videoForm, mobile: e.target.value.replace(/[^0-9]/g, '') })}
                  maxLength={10}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Preferred Language</label>
                <Select
                  value={videoForm.language}
                  onValueChange={(value) => setVideoForm({ ...videoForm, language: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Malayalam">Malayalam</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Tamil">Tamil</SelectItem>
                    <SelectItem value="Kannada">Kannada</SelectItem>
                    <SelectItem value="Telugu">Telugu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <button
                onClick={() => {
                  const { name, email, mobile, language } = videoForm;
                  if (!name || mobile.length !== 10) return;
                  const msg = `Video call request\nName: ${name}\n${email ? `Email: ${email}\n` : ''}Mobile: ${mobile}\nLanguage: ${language}\nProduct: ${product.name} (${product.id})`;
                  const url = `https://wa.me/7994648644?text=${encodeURIComponent(msg)}`;
                  window.location.href = url;
                }}
                // 9895331916
                className="w-full bg-teal-600 text-white py-3 rounded font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50 cursor-pointer"
                disabled={!videoForm.name || videoForm.mobile.length !== 10}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trial At Home Modal */}
      {showTrialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-md p-6 relative">
            <button
              aria-label="Close"
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              onClick={() => setShowTrialModal(false)}
            >
              ×
            </button>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Request Trial At Home</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={trialForm.name}
                  onChange={(e) => setTrialForm({ ...trialForm, name: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="10-digit number"
                  value={trialForm.mobile}
                  onChange={(e) => setTrialForm({ ...trialForm, mobile: e.target.value.replace(/[^0-9]/g, '') })}
                  maxLength={10}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Current Location *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Enter your address"
                    value={trialForm.location}
                    onChange={(e) => setTrialForm({ ...trialForm, location: e.target.value })}
                  />
                  <button
                    onClick={() => {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                          (position) => {
                            const { latitude, longitude } = position.coords;
                            // Reverse geocoding - you can use a service like Google Maps API
                            // For now, we'll use the coordinates
                            setTrialForm({ 
                              ...trialForm, 
                              location: `https://www.google.com/maps/search/?api=1&query=${latitude.toFixed(6)},${longitude.toFixed(6)}` 
                            });
                          },
                          (error) => {
                            alert('Unable to get location. Please enter manually.');
                          }
                        );
                      } else {
                        alert('Geolocation is not supported by this browser.');
                      }
                    }}
                    className="px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm cursor-pointer"
                    title="Use current location"
                  >
                                         <span className="inline-flex items-center justify-center bg-white rounded-full p-1">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <clipPath id="gmapsPin">
                            <path d="M12 2C8.686 2 6 4.686 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.314-2.686-6-6-6z" />
                          </clipPath>
                        </defs>
                        <g clipPath="url(#gmapsPin)">
                          <rect x="0" y="0" width="12" height="12" fill="#EA4335" />
                          <rect x="12" y="0" width="12" height="8" fill="#4285F4" />
                          <rect x="0" y="12" width="12" height="12" fill="#FBBC05" />
                          <rect x="12" y="8" width="12" height="16" fill="#34A853" />
                        </g>
                        <path d="M12 2C8.686 2 6 4.686 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.314-2.686-6-6-6z" stroke="none" fill="none" />
                        <circle cx="12" cy="8" r="3" fill="#FFFFFF"/>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <button
                onClick={() => {
                  const { name, mobile, location } = trialForm;
                  if (!name || mobile.length !== 10 || !location) return;
                  const msg = `Trial at home request\nName: ${name}\nMobile: ${mobile}\nLocation: ${location}\nProduct: ${product.name} (${product.id})`;
                  const url = `https://wa.me/7994648644?text=${encodeURIComponent(msg)}`;
                  window.location.href = url;
                }}
                className="w-full bg-purple-600 text-white py-3 rounded font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 cursor-pointer"
                disabled={!trialForm.name || trialForm.mobile.length !== 10 || !trialForm.location}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ProductView; 