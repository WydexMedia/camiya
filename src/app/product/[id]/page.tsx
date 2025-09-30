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
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
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
      let imagePath = "";
      
      if (product.category === "Studs" || product.category === "Earrings") {
        imagePath = `/images/studs/${product.id}_stud_${color}.png`;
      } else if (product.category === "Bangles") {
        imagePath = `/images/bangles/${product.id}_bangles_${color}.png`;
      } else if (product.category === "Pendants") {
        imagePath = `/images/pendants/${product.id}_Pendants_${color}.png`;
      } else if (product.category === "Bracelets") {
        imagePath = `/images/bracelets/${product.id}_bracelet_${color}.png`;
      } else if (product.category === "Chains" || product.category === "Pendant Chain") {
        imagePath = `/images/chain/${product.id}_chain_${color}.png`;
      } else if (product.category === "Rings") {
        imagePath = `/images/ring/${product.id}_ring_${color}.png`;
      }
      
      // If we constructed a path, return it (even if the file doesn't exist, let the browser handle 404)
      if (imagePath) {
        return imagePath;
      }
    }
    
    // Fallback to original image
    return product.image;
  };

  // Set default color if product has colors
  React.useEffect(() => {
    if (product.colors && product.colors.length > 0) {
      // If no color selected yet, default to first color and sync thumbnail index
      if (!selectedColor) {
        setSelectedColor(product.colors[0]);
        setSelectedImage(0);
        return;
      }
      // Keep thumbnail selection in sync with selectedColor when colors array exists
      const colorIndex = product.colors.indexOf(selectedColor);
      if (colorIndex !== -1 && colorIndex !== selectedImage) {
        setSelectedImage(colorIndex);
      }
    }
  }, [product.colors, selectedColor, selectedImage]);

  // Get current image based on selected color
  const currentImage = selectedColor ? getImageForColor(selectedColor) : product.image;
  
  // Generate images for available colors (gold and rose if available)
  const productImages = [];
  if (product.colors && product.colors.length > 0) {
    product.colors.forEach(color => {
      productImages.push(getImageForColor(color));
    });
  } else {
    // If no colors available, just show the main image
    productImages.push(product.image);
  }

  // Preload all color variant images to prevent flickering
  React.useEffect(() => {
    if (product.colors && product.colors.length > 1) {
      const preloadPromises = product.colors.map((color) => {
        const imagePath = getImageForColor(color);
        if (imagePath) {
          return new Promise((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve(img);
            img.onerror = () => resolve(img); // Resolve even on error to not block
            img.src = imagePath;
          });
        }
        return Promise.resolve();
      });
      
      // Wait for all images to preload
      Promise.all(preloadPromises).then(() => {
        // All images are preloaded and ready for instant switching
      });
    }
  }, [product.colors, product.id, product.category, product.image]);

  // Handle color change with smooth transition
  const handleColorChange = (color: string) => {
    if (color !== selectedColor) {
      setIsTransitioning(true);
      setImageError(false);
      
      // Small delay to start transition, then change color
      setTimeout(() => {
        setSelectedColor(color);
        // Also sync the selected thumbnail to the chosen color
        if (product.colors) {
          const idx = product.colors.indexOf(color);
          if (idx !== -1) {
            setSelectedImage(idx);
          }
        }
        
        // End transition after image has time to load
        setTimeout(() => {
          setIsTransitioning(false);
        }, 150);
      }, 50);
    }
  };

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
              <div className="relative w-full h-full">
                <Image 
                  src={currentImage} 
                  alt={product.category}
                  width={800}
                  height={600}
                  className={`w-full h-full object-contain transition-opacity duration-200 ease-in-out ${
                    isTransitioning ? 'opacity-95' : 'opacity-100'
                  }`}
                  priority
                  onError={() => setImageError(true)}
                />
                
                {/* Subtle transition overlay */}
                {isTransitioning && (
                  <div className="absolute inset-0 bg-white/10 transition-opacity duration-200"></div>
                )}
                
                {/* Error overlay */}
                {imageError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-center text-gray-500">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <p className="text-sm">Image not available</p>
                    </div>
                  </div>
                )}
              </div>
              
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
            <div className="flex justify-center">
              <div className={`grid gap-3 w-fit ${productImages.length === 1 ? 'grid-cols-1' : productImages.length === 2 ? 'grid-cols-2' : 'grid-cols-4'}`}>
              {productImages.map((image, index) => {
                const color = product.colors ? product.colors[index] : null;
                const isSelected = color ? selectedColor === color : selectedImage === index;
                
                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (color) {
                        handleColorChange(color);
                      } else {
                        setSelectedImage(index);
                      }
                    }}
                    className={`aspect-[4/3] bg-white rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md relative  ${
                      isSelected ? 'border-teal-500 shadow-lg scale-105' : 'border-gray-200 hover:border-teal-300'
                    }`}
                    title={color ? `View ${color} color` : `View image ${index + 1}`}
                  >
                    <Image 
                      src={image} 
                      alt={color ? `${product.category} ${color} color` : `${product.category} ${index + 1}`}
                      width={150}
                      height={100}
                      className={`w-full h-full object-contain transition-opacity duration-200 ease-in-out ${
                        isTransitioning ? 'opacity-95' : 'opacity-100'
                      }`}
                      loading="eager"
                    />
                    {/* Color indicator overlay */}
                    {color && (
                      <div className="absolute bottom-1 right-1">
                        <div 
                          className="w-4 h-4 rounded-full border border-white shadow-sm"
                          style={{
                            background: color === 'gold' 
                              ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)'
                              : 'linear-gradient(135deg, #E8B4B8 0%, #D4A5A5 50%, #C08497 100%)'
                          }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
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
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Available Colors</h3>
                <div className="flex items-center gap-4">
                  {product.colors.map((color) => (
                    <div key={color} className="flex flex-col items-center space-y-2">
                      <button
                        onClick={() => handleColorChange(color)}
                        className={`relative w-12 h-12 rounded-full transition-all duration-500 ease-out transform focus:outline-none ${
                          selectedColor === color
                            ? 'scale-110 shadow-2xl'
                            : 'hover:scale-105 hover:shadow-lg'
                        }`}
                        style={{
                          background: color === 'gold' 
                            ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)'
                            : 'linear-gradient(135deg, #E8B4B8 0%, #D4A5A5 50%, #C08497 100%)',
                          boxShadow: selectedColor === color 
                            ? color === 'gold'
                              ? '0 8px 32px rgba(255, 215, 0, 0.4), 0 0 0 3px white, 0 0 0 5px #FFD700'
                              : '0 8px 32px rgba(232, 180, 184, 0.4), 0 0 0 3px white, 0 0 0 5px #E8B4B8'
                            : '0 4px 16px rgba(0, 0, 0, 0.1)',
                        }}
                        title={`Select ${color} color`}
                        aria-label={`Select ${color} color`}
                      >
                        {/* Glossy overlay effect */}
                        <div 
                          className="absolute inset-0 rounded-full opacity-30"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 50%, rgba(0,0,0,0.1) 100%)'
                          }}
                        />
                        
                        {/* Selected state indicator */}
                        {selectedColor === color && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-lg">
                              <svg className="w-3 h-3 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </button>
                      
                      {/* Color name label */}
                      <span className={`text-sm font-medium transition-all duration-300 capitalize ${
                        selectedColor === color 
                          ? 'text-gray-900 font-semibold' 
                          : 'text-gray-600'
                      }`}>
                        {color}
                      </span>
                    </div>
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
                  <p className="text-sm text-gray-500 mb-1">Stones</p>
                  <p className="font-semibold text-gray-900">{product.stones}</p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Diamond Type</p>
                  <p className="font-semibold text-gray-900">VVS-EF</p>
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

            {/* Certification Logo */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Certification</h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-center">
                  <Image 
                    src="/DHC_logo.png" 
                    alt="DHC Certification Logo"
                    width={200}
                    height={100}
                    className="object-contain"
                  />
                </div>
                <p className="text-center text-sm text-gray-600 mt-3">
                  Certified by Diamond High Council (DHC)
                </p>
              </div>
            </div>

            {/* Product Features */}
            {/* <div className="space-y-4">
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
            </div> */}

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