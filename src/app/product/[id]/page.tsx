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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Separator } from '../../../components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import Header from '../../components/Header';
import NavCategories from '../../components/NavCategories';
import { Heart, Share2, Truck, ShoppingCart, Video, Home, Star, Shield, Award, Package, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

type Product = {
  id: string;
  category: string;
  name: string;
  image: string;
  price: number;
  weight: string;
  diamondWeight?: string;
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
        <div className="text-center space-y-4">
          <Package className="w-16 h-16 mx-auto text-gray-400" />
          <h1 className="text-2xl font-bold text-gray-800">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          <Button 
            onClick={() => router.back()}
            className="mt-4"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Function to get image based on selected color
  const getImageForColor = (color: string) => {
    if (product.colors && product.colors.includes(color)) {
      let imagePath = "";
      
      if (product.category === "Earrings") {
        // Check if it's a stud or earrings based on the product name
        if (product.name.toLowerCase().includes("stud")) {
          imagePath = `/images/studs/${product.id}_stud_${color}.png`;
        } else {
          imagePath = `/images/studs/${product.id}_earrings_${color}.png`;
        }
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
    <div className="min-h-screen bg-gray-50 pb-32 lg:pb-8">
      <Header />
      <NavCategories />
      <div className="py-6">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-2">
            <li className="inline-flex items-center">
              <Button 
                variant="ghost"
                size="sm"
                onClick={() => router.push('/')}
                className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-teal-600"
              >
                <Home className="w-4 h-4 mr-1" />
                Home
              </Button>
            </li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <li>
              <Button 
                variant="ghost"
                size="sm"
                onClick={() => router.push(`/category/${encodeURIComponent(product.category)}`)}
                className="text-sm font-medium text-gray-600 hover:text-teal-600"
              >
                {product.category}
              </Button>
            </li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <li>
              <span className="text-sm font-medium text-gray-900">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4 lg:space-y-6">
            {/* Main Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="aspect-[4/3] bg-white rounded-xl overflow-hidden shadow-md relative border"
            >
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
                      <Package className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm">Image not available</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <Badge className="bg-teal-500 text-white">
                  <Shield className="w-3 h-3 mr-1" />
                  Certified
                </Badge>
              </div>
              
              {/* Reviews Badge */}
              <div className="absolute bottom-4 left-4">
                <Badge variant="secondary" className="bg-white/95 backdrop-blur-sm shadow-md">
                  <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">0</span>
                  <span className="ml-1 text-gray-600">Reviews</span>
                </Badge>
              </div>
            </motion.div>
            
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

            {/* Mobile Action Buttons Placeholder - Keep space for fixed buttons */}
            <div className="block lg:hidden h-32"></div>
          </div>

          {/* Product Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Badge variant="outline">{product.category}</Badge>
                    <span className="text-gray-400">•</span>
                    <span>ID: {product.id}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
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
                          await navigator.clipboard.writeText(window.location.href);
                          toast.success("Link copied to clipboard!", {
                            duration: 3000,
                            position: "bottom-right",
                          });
                        }
                      } catch (error) {
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
                    aria-label="Share product"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
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
                    className={wishlist.some((p) => p.image === product.image && p.category === product.category && p.price === product.price) ? 'text-red-600 hover:text-red-700' : ''}
                    aria-label="Toggle wishlist"
                  >
                    <Heart 
                      className="h-5 w-5"
                      fill={wishlist.some((p) => p.image === product.image && p.category === product.category && p.price === product.price) ? 'currentColor' : 'none'}
                    />
                  </Button>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-xl p-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Inclusive of all taxes</p>
                </div>
                <Badge className="bg-green-500 text-white">
                  <Truck className="w-3 h-3 mr-1" />
                  Free Delivery
                </Badge>
              </div>
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

              {/* Desktop Action Buttons - Hidden on mobile */}
            <div className="hidden lg:block space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => setShowVideoModal(true)}
                  className="bg-teal-600 hover:bg-teal-700"
                  size="lg"
                >
                  <Video className="h-5 w-5 mr-2" />
                  Video Call
                </Button>
                <Button
                  onClick={() => setShowTrialModal(true)}
                  className="bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  <Home className="h-5 w-5 mr-2" />
                  Trial Home
                </Button>
              </div>
              
              <DeliveryCheckDialog />
              
              {/* Buy Now Button */}
              <Button 
                onClick={() => setShowForm(true)}
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Buy Now
              </Button>
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
                {product.diamondWeight && (
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">Diamond Weight</p>
                    <p className="font-semibold text-gray-900">{product.diamondWeight}</p>
                  </div>
                )}
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
          </motion.div>
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

      {/* Fixed Mobile Action Bar - Always visible at bottom on mobile */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t shadow-lg z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 space-y-2">
          {/* Top Row - Video Call and Trial Home buttons */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={() => setShowVideoModal(true)}
              className="bg-teal-600 hover:bg-teal-700 h-10"
              size="sm"
            >
              <Video className="h-4 w-4 mr-1" />
              <span className="text-xs">Video</span>
            </Button>
            <Button
              onClick={() => setShowTrialModal(true)}
              className="bg-purple-600 hover:bg-purple-700 h-10"
              size="sm"
            >
              <Home className="h-4 w-4 mr-1" />
              <span className="text-xs">Trial</span>
            </Button>
            <DeliveryCheckDialog compact={true} />
          </div>
          
          {/* Buy Now Button */}
          <Button 
            onClick={() => setShowForm(true)}
            className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
            size="lg"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Buy Now
          </Button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProductView;