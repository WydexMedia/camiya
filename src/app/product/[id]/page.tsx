'use client'
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import productsData from '../../data/products.json';
import Image from 'next/image';
import BuyNowPopup from '../../components/form';
import DeliveryCheckDialog from '../../components/DeliveryCheckDialog';
import { useWishlist } from '../../components/WishlistContext';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '../../components/Header';
import NavCategories from '../../components/NavCategories';
import { Heart, Share2, Truck, ShoppingCart, Video, Home } from 'lucide-react';

type Product = {
  id: string;
  category: string;
  name: string;
  image: string;
  price: number;
  weight: string;
  purity: string;
  stones: string;
  colors?: string[];
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
  const [selectedColor, setSelectedColor] = useState<string>("");
  
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

  // Function to get image based on selected color
  const getImageForColor = (color: string) => {
    if (product.colors && product.colors.includes(color)) {
      if (product.category === "Studs") {
        return `/images/studs/${product.id}_stud_${color}.png`;
      } else if (product.category === "Bangles") {
        return `/images/bangles/${product.id}_bangles_${color}.png`;
      } else if (product.category === "Pendants") {
        return `/images/pendants/${product.id}_Pendants_${color}.png`;
      } else if (product.category === "Bracelets") {
        return `/images/bracelets/${product.id}_bracelet_${color}.png`;
      }
    }
    return product.image;
  };

  // Set default color if product has colors
  React.useEffect(() => {
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0]);
    }
  }, [product.colors, selectedColor]);

  // Get current image based on selected color
  const currentImage = selectedColor ? getImageForColor(selectedColor) : product.image;

  // Generate additional images for the product (using the same image multiple times for demo)
  const productImages = [currentImage, currentImage, currentImage, currentImage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
          <div className="space-y-6">
            {/* Main Image */}
            <div className="aspect-[4/3] bg-white rounded-2xl overflow-hidden shadow-2xl relative border border-gray-100">
              <Image 
                src={productImages[selectedImage]} 
                alt={product.category}
                width={800}
                height={600}
                className="w-full h-full object-contain"
                priority
              />
              
              {/* Reviews Badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-700">0</span>
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm text-gray-600">0 Reviews</span>
                </div>
              </div>
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex justify-end">
              <div className="grid grid-cols-4 gap-3 w-fit">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-[4/3] bg-white rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md ${
                    selectedImage === index ? 'border-teal-500 shadow-lg scale-105' : 'border-gray-200 hover:border-teal-300'
                  }`}
                >
                  <Image 
                    src={image} 
                    alt={`${product.category} ${index + 1}`}
                    width={200}
                    height={150}
                    className="w-full h-full object-contain"
                    loading="eager"
                  />
                </button>
              ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <div className="flex items-center gap-4">
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
                    className="text-gray-400 hover:text-teal-600 cursor-pointer transition-all duration-300 hover:scale-110"
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
                    className={`cursor-pointer transition-all duration-300 hover:scale-110 ${
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
                  <button
                    onClick={() => {
                      toast.success("Added to cart", {
                        duration: 3000,
                        position: "bottom-right",
                      });
                    }}
                    className="text-gray-400 hover:text-teal-600 cursor-pointer transition-all duration-300 hover:scale-110"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
              <p className="text-base text-gray-600">{product.category} - Premium Diamond Jewelry</p>
              <p className="text-sm text-gray-500 mt-1">Product ID: {product.id}</p>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 rounded-2xl p-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                <span className="ml-2 text-sm text-gray-500">Inclusive of all taxes</span>
              </div>
              <p className="text-sm text-green-600 mt-1">Free delivery</p>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 1 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Select Color</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 font-medium capitalize ${
                        selectedColor === color
                          ? 'border-teal-500 bg-teal-50 text-teal-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-teal-300 hover:bg-teal-50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

              {/* request at home */}
            {/* Quick Actions */}
            <div className="space-y-4 pt-4">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
                  aria-label="Request video call"
                >
                  <Video className="h-6 w-6 group-hover:animate-pulse" />
                  <span className="font-semibold text-base">Request Video Call</span>
                </button>
                <button
                  onClick={() => setShowTrialModal(true)}
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
                  aria-label="Request trial at home"
                >
                  <Home className="h-6 w-6 group-hover:animate-pulse" />
                  <span className="font-semibold text-base">Trial At Home</span>
                </button>
                <DeliveryCheckDialog />
              </div>
              
              {/* Buy Now Button */}
              <button 
                onClick={() => setShowForm(true)}
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
              >
                Buy Now
              </button>
            </div>


            {/* Product Specifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Product Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Weight</p>
                  <p className="font-semibold text-gray-900">{product.weight}</p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Purity</p>
                  <p className="font-semibold text-gray-900">{product.purity}</p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Stones</p>
                  <p className="font-semibold text-gray-900">{product.stones}</p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Category</p>
                  <p className="font-semibold text-gray-900">{product.category}</p>
                </div>
                {selectedColor && (
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">Color</p>
                    <p className="font-semibold text-gray-900 capitalize">{selectedColor}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Product Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Product Features</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center p-3 bg-green-50 rounded-lg border border-green-100">
                  <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Authentic Diamond Certification</span>
                </li>
                <li className="flex items-center p-3 bg-green-50 rounded-lg border border-green-100">
                  <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Lifetime Warranty</span>
                </li>
                <li className="flex items-center p-3 bg-green-50 rounded-lg border border-green-100">
                  <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Free Resizing Service</span>
                </li>
                <li className="flex items-center p-3 bg-green-50 rounded-lg border border-green-100">
                  <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">30-Day Return Policy</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              {/* Additional action buttons can be added here */}
            </div>

            {/* Delivery Info */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-lg text-gray-900">Delivery Information</h4>
               
              </div>
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
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Product Description</h2>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <p className="text-gray-700 leading-relaxed text-lg">
              This exquisite {product.name.toLowerCase()} features the finest quality diamonds, 
              carefully selected and expertly crafted by our master artisans. Each piece is designed 
              with attention to detail, ensuring both beauty and durability. The {product.name.toLowerCase()} 
              comes with a certificate of authenticity and is backed by our lifetime warranty.
            </p>
            <p className="text-gray-700 leading-relaxed mt-6 text-lg">
              Perfect for special occasions, this piece makes an ideal gift for your loved ones or 
              a treasured addition to your personal collection. Our commitment to quality ensures 
              that every piece meets the highest standards of excellence.
            </p>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="font-bold text-xl text-gray-900 mb-4">Care Instructions</h4>
              <ul className="text-base text-gray-600 space-y-2">
                <li>• Store in a cool, dry place away from direct sunlight</li>
                <li>• Clean with a soft cloth and mild soap solution</li>
                <li>• Avoid contact with chemicals, perfumes, and lotions</li>
                <li>• Regular professional cleaning recommended</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {productsData
              .filter((p: Product) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct: Product, idx: number) => (
                <Link 
                  key={relatedProduct.id} 
                  href={`/product/${productsData.findIndex((p: Product) => p.id === relatedProduct.id)}`}
                  className="group"
                >
                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200">
                    <Image 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name}
                      width={300}
                      height={240}
                      className="w-full h-40 object-contain mb-4 group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <h3 className="font-semibold text-gray-900 text-base mb-2 group-hover:text-teal-600 transition-colors duration-300">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-xl font-bold text-gray-900">{formatPrice(relatedProduct.price)}</p>
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