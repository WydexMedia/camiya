import React from "react";
import { useWishlist } from "./WishlistContext";
import { useWishlistNotification } from "./WishlistNotificationContext";

type Product = {
  category: string;
  image: string;
  price: number;
};

interface ProductCardProps {
  product: Product;
  onBuyNow: (product: Product) => void;
}

const formatPrice = (price: number) =>
  "₹ " + price.toLocaleString("en-IN");

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuyNow }) => {
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const { notify } = useWishlistNotification();

  const isWishlisted = wishlist.some(
    (p) =>
      p.image === product.image &&
      p.category === product.category &&
      p.price === product.price
  );

  const handleWishlist = () => {
    if (!isWishlisted) {
      addToWishlist(product);
      notify("Added to wishlist");
    } else {
      removeFromWishlist(product);
      notify("Removed from wishlist");
    }
  };

  return (
    <div className="text-center bg-white rounded shadow border border-gray-200 flex flex-col p-3 sm:p-4 relative">
      <div className="bg-gray-100 p-4 sm:p-6 relative rounded">
        <img
          src={product.image}
          alt={product.category}
          className="w-full h-40 sm:h-48 object-contain mx-auto"
        />
        <span
          className={`absolute top-2 right-2 text-xl cursor-pointer transition-colors duration-300 select-none ${isWishlisted ? 'text-red-700 scale-125' : 'text-gray-400'}`}
          onClick={handleWishlist}
          style={{ transition: 'color 0.3s, transform 0.3s' }}
        >
          {isWishlisted ? '❤️' : '♡'}
        </span>
      </div>
      <p className="text-lg font-semibold mt-2">{formatPrice(product.price)}</p>
      <a href="#" className="text-sm text-teal-700 font-medium block mb-2">
        Check delivery date
      </a>
      <button
        onClick={() => onBuyNow(product)}
        className="mt-1 px-4 py-2 bg-teal-600 text-white text-sm rounded hover:bg-teal-700 transition"
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;
