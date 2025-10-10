"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import productsData from "../../data/products.json";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import ProductCard from "../../components/ProductCard";
import BuyNowPopup from "../../components/form";
import Loader from "../../components/Loader";
import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../../../components/ui/sheet";
import { Filter, X } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  "Rings",
  "Earrings",
  "Bangles",
  "Bracelets",
  "Pendants",
  "Pendant Chain",
];

type Product = {
  category: string;
  image: string;
  price: number;
};

const formatPrice = (price: number) => "₹ " + price.toLocaleString("en-IN");


export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const selectedCategory = decodeURIComponent(params.category as string || "");
  const [sort, setSort] = useState<string>("");
  const [filter, setFilter] = useState<string[]>([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);

  // Initialize filter on mount
  useEffect(() => {
    setMounted(true);
    setFilter(selectedCategory === "All" ? [] : [selectedCategory]);
    setProducts(productsData as Product[]);
  }, [selectedCategory]);

  // Apply category filter (empty means All)
  let filteredProducts = products.filter(
    (p) => filter.length === 0 || filter.includes(p.category)
  );

  // Apply price filter from query string if present
  const maxPriceParam = searchParams.get("maxPrice");
  const maxPrice = maxPriceParam ? Number(maxPriceParam) : undefined;
  if (!Number.isNaN(maxPrice) && maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter((p) => p.price <= (maxPrice as number));
  }

  if (sort === "low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  const handleCategoryFilter = (cat: string) => {
    setFilter((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Loader />
        <Header />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      {/* Top Category Navbar */}
      <nav className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-start md:justify-center space-x-4 md:space-x-8 py-4 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/category/${encodeURIComponent(cat)}`}
                className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-teal-600 pb-3 ${
                  selectedCategory === cat 
                    ? "text-teal-600 border-b-2 border-teal-600" 
                    : "text-gray-700"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters (Desktop) */}
          <aside className="w-full lg:w-72 hidden lg:block">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-sm uppercase text-gray-700">Categories</h4>
                  <div className="space-y-3">
                    {categories.map((cat) => (
                      <div key={cat} className="flex items-center space-x-3">
                        <Checkbox
                          id={cat}
                          checked={filter.includes(cat)}
                          onCheckedChange={() => handleCategoryFilter(cat)}
                        />
                        <Label 
                          htmlFor={cat} 
                          className="text-sm font-normal cursor-pointer flex-1"
                        >
                          {cat} 
                          <span className="text-gray-500 ml-1">
                            ({products.filter((p) => p.category === cat).length})
                          </span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-4 text-sm uppercase text-gray-700">Metal Type</h4>
                  <div className="flex items-center space-x-3">
                    <Checkbox id="gold" checked disabled />
                    <Label htmlFor="gold" className="text-sm font-normal">
                      18 kt Gold <span className="text-gray-500">(All)</span>
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          
          {/* Mobile Filter Sheet */}
          <Sheet open={showMobileFilter} onOpenChange={setShowMobileFilter}>
            <SheetTrigger asChild className="lg:hidden fixed bottom-6 right-6 z-50">
              <Button size="lg" className="rounded-full shadow-lg">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </SheetTitle>
                <SheetDescription>
                  Filter products by category and preferences
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-sm uppercase">Categories</h4>
                  <div className="space-y-3">
                    {categories.map((cat) => (
                      <div key={cat} className="flex items-center space-x-3">
                        <Checkbox
                          id={`mobile-${cat}`}
                          checked={filter.includes(cat)}
                          onCheckedChange={() => handleCategoryFilter(cat)}
                        />
                        <Label htmlFor={`mobile-${cat}`} className="text-sm cursor-pointer flex-1">
                          {cat}
                          <span className="text-gray-500 ml-1">
                            ({products.filter((p) => p.category === cat).length})
                          </span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-4 text-sm uppercase">Metal Type</h4>
                  <div className="flex items-center space-x-3">
                    <Checkbox id="mobile-gold" checked disabled />
                    <Label htmlFor="mobile-gold" className="text-sm">
                      18 kt Gold <span className="text-gray-500">(All)</span>
                    </Label>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Product Section */}
          <main className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                    {selectedCategory}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Label htmlFor="sort" className="text-sm font-medium whitespace-nowrap">
                    Sort by:
                  </Label>
                  <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger className="w-[180px]" id="sort">
                      <SelectValue placeholder="Select price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="low">Price: Low to High</SelectItem>
                      <SelectItem value="high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Product Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product, idx) => {
                  // Find the actual index in the original products array
                  const actualIndex = products.findIndex(p => 
                    p.image === product.image && 
                    p.category === product.category && 
                    p.price === product.price
                  );
                  
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                    >
                      <ProductCard
                        product={product}
                        productIndex={actualIndex}
                        onBuyNow={(product) => {
                          setSelectedProduct(product);
                          setShowForm(true);
                        }}
                      />
                    </motion.div>
                  );
                })}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <X className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search criteria</p>
                </div>
              )}
            </motion.div>
            
            {/* Modal for Buy Now */}
            {showForm && selectedProduct && (
              <BuyNowPopup
                product={selectedProduct}
                onClose={() => setShowForm(false)}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
