import React from "react";
import { useCart } from "./CartContext";
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
  const { addToCart } = useCart(); // get addToCart from context

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
      style={{ minHeight: "450px" }} // Set a minimum height
    >
      {/* Product Image */}
      <img
        src={image}
        alt={title}
        className="opacity-75 hover:opacity-100 w-full h-64 object-cover rounded-md mb-4 bg-white"
      />

      {/* Product Info */}
      <div className="flex flex-col justify-between h-full">
        {/* Price and Product Title */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-customBlue font-bold mr-4">
              ETB {price.toFixed(2)}
            </p>
          </div>

          {/* Product Description */}
          <p className="text-gray-500 line-clamp-3 mb-2">{description}</p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-auto border border-customBlue text-customBlue py-2 px-4 rounded-full hover:bg-customBlue hover:text-black transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
