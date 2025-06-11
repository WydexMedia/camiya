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

const WishlistIconClicked = (
<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ color: "#E1306C", fontSize: "25px" }}>
  <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
</svg>
);

const WishlistIconUnclicked = (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: "rgb(177, 194, 211)", fontSize: "25px" }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.0122 5.57169L10.9252 4.48469C8.77734 2.33681 5.29493 2.33681 3.14705 4.48469C0.999162 6.63258 0.999162 10.115 3.14705 12.2629L11.9859 21.1017L11.9877 21.0999L12.014 21.1262L20.8528 12.2874C23.0007 10.1395 23.0007 6.65711 20.8528 4.50923C18.705 2.36134 15.2226 2.36134 13.0747 4.50923L12.0122 5.57169ZM11.9877 18.2715L16.9239 13.3352L18.3747 11.9342L18.3762 11.9356L19.4386 10.8732C20.8055 9.50635 20.8055 7.29028 19.4386 5.92344C18.0718 4.55661 15.8557 4.55661 14.4889 5.92344L12.0133 8.39904L12.006 8.3918L12.005 8.39287L9.51101 5.89891C8.14417 4.53207 5.92809 4.53207 4.56126 5.89891C3.19442 7.26574 3.19442 9.48182 4.56126 10.8487L7.10068 13.3881L7.10248 13.3863L11.9877 18.2715Z"
      fill="currentColor"
    ></path>
  </svg>
)

const formatPrice = (price: number) =>
  "₹ " + price.toLocaleString("en-IN")

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuyNow }) => {
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const { notify } = useWishlistNotification();

  const isWishlisted = wishlist.some(
    (p) =>
      p.image === product.image &&
      p.category === product.category &&
      p.price === product.price
  );


  const [animate, setAnimate] = React.useState(false);
  const heartRef = React.useRef<HTMLSpanElement>(null);

  const handleWishlist = () => {
    if (!isWishlisted) {
      addToWishlist(product);
      notify("Added to wishlist");
      // Reset animation if clicked rapidly
      setAnimate(false);
      void heartRef.current?.offsetWidth; // Force reflow
      setAnimate(true);
      setTimeout(() => setAnimate(false), 700); // Animation duration
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
          ref={heartRef}
          className={[
            'absolute top-2 right-2 text-xl cursor-pointer select-none',
            isWishlisted ? 'text-red-700' : 'text-gray-400',
            animate ? 'animate-like-bounce' : ''
          ].join(' ')}
          onClick={handleWishlist}
          style={{ transition: 'color 0.3s, transform 0.3s', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {isWishlisted ? WishlistIconClicked : WishlistIconUnclicked}
        </span>

      </div>
      <p className="text-lg font-semibold mt-2">{formatPrice(product.price)}</p>
      <a href="#" className="text-sm text-teal-700 font-medium block mb-2">
        Check delivery date
      </a>
      <button
        onClick={() => onBuyNow(product)}
        className="mt-1 px-4 py-2 bg-teal-600 text-white text-sm rounded hover:bg-teal-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Buy Now
      </button>
      
    </div>
  );
};

export default ProductCard;
