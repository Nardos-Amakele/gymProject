import React from "react";
import { useCart } from "./CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

interface ItemProps {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  description?: string;
}

export const Item: React.FC<ItemProps> = ({
  id,
  title,
  price,
  category,
  image,
  description,
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      name: title,
      price,
      image,
      quantity: 1,
    });
  };

  return (
    <div
      key={id}
      className="p-4 shadow-lg rounded-md hover:shadow-xl transition duration-300 flex flex-col justify-between hover:border-customBlue hover:border-2"
    >
      {/* Product Image */}
      <img
        src={image}
        alt={title}
        className="opacity-75 hover:opacity-100 w-full h-52 object-cover rounded-md mb-4 bg-white"
      />

      {/* Product Info */}
      <div className="flex flex-col justify-between h-full">
        {/* Price and Product Title */}
        <div>
          <div className="lg:flex lg:flex-row flex-col justify-between items-center mb-0 lg:mb-4">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <div className="hidden lg:block">
              <p className="text-customBlue font-bold mr-4">
                ETB {price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Product Description */}
        {description && (
          <p className="text-white text-sm mt-2">{description}</p>
        )}

        {/* Add to Cart Button (Icon in a row with price for smaller screens) */}
        <div className="flex items-center justify-between md:-mt-4 sm:-mt-12 lg:hidden">
          <p className="text-customBlue font-bold">
            ETB {price.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            className="text-customBlue p-2 rounded-full hover:bg-customBlue hover:text-black transition"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
        </div>

        {/* Add to Cart Button (Text for larger screens) */}
        <button
          onClick={handleAddToCart}
          className="hidden lg:flex items-center justify-center w-auto border border-customBlue text-customBlue py-2 px-4 rounded-full hover:bg-customBlue hover:text-black transition"
        >
          Add to Cart
        </button>
      </div>

    </div>
  );
};
