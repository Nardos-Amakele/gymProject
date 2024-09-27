"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTshirt,
  faDumbbell,
  faBottleWater,
  faBoxOpen,
  faShoppingCart,
  faArrowUp
} from "@fortawesome/free-solid-svg-icons";
import Cart from "../components/Cart"; 
import Footer from "../components/Footer"
import Header from "../components/Header"


// HeroSection Component
const HeroSection: React.FC = () => {
  const images = [
    "https://via.placeholder.com/200x150",
    "https://via.placeholder.com/200x150",
    "https://via.placeholder.com/200x150",
    "https://via.placeholder.com/200x150",
    "https://via.placeholder.com/200x150",
    "https://via.placeholder.com/200x150",
  ];


  return (
    <>
   
    <div className="relative h-screen bg-black flex justify-center items-center overflow-hidden pt-8">

<div className="absolute w-full h-full flex flex-col justify-center items-center space-y-6 z-0">

  <div className="w-full flex space-x-6 animate-slideRight">
    {[...images, ...images].map((image, idx) => (
      <img
        key={idx}
        src={image}
        alt={`Image ${idx}`}
        className="w-50 h-auto rounded-xl"
      />
    ))}
  </div>

  <div className="w-[calc(100%+50rem)] flex space-x-6">
    {[...images, ...images].map((image, idx) => (
      <img
        key={idx}
        src={image}
        alt={`Image ${idx}`}
        className="w-50 h-auto rounded-xl"
      />
    ))}
  </div>

  <div className="w-full flex space-x-6 animate-slideRight">
    {[...images, ...images].map((image, idx) => (
      <img
        key={idx}
        src={image}
        alt={`Image ${idx}`}
        className="w-50 h-auto rounded-xl"
      />
    ))}
  </div>
</div>

<div className="relative z-10 text-center text-white">
  <h1 className="text-5xl font-bold mb-4">Shop</h1>
  <p className="text-lg"></p>
  
  {/* Downward Icon with Circular Background  add animation to this icon make it jumpy I guess lol*/}
  <div className="mt-6">
    <div
      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 border border-white rounded-full p-4 cursor-pointer text-white"
    >
      <FontAwesomeIcon icon={faArrowUp} className="text-2xl" />
    </div>
  </div>
</div>
</div></>
  );
};

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description?: string;
}

// Mocked Product Data
const productData: Product[] = [
  {
    id: 1,
    title: "Gym T-Shirt",
    price: 19.99,
    category: "clothing",
    image: "https://via.placeholder.com/200x200",
    description: "Comfortable and stylish gym t-shirt.",
  },
  {
    id: 2,
    title: "Running Shorts",
    price: 24.99,
    category: "clothing",
    image: "https://via.placeholder.com/200x200",
    description: "Breathable running shorts.",
  },
  {
    id: 3,
    title: "Dumbbells Set",
    price: 49.99,
    category: "equipment",
    image: "https://via.placeholder.com/200x200",
    description: "A complete set of dumbbells for strength training.",
  },
  {
    id: 4,
    title: "Kettlebell",
    price: 34.99,
    category: "equipment",
    image: "https://via.placeholder.com/200x200",
    description: "High-quality kettlebell.",
  },
  {
    id: 5,
    title: "Cycling Gloves",
    price: 14.99,
    category: "supplement",
    image: "https://via.placeholder.com/200x200",
    description: "Durable cycling gloves to enhance your grip.",
  },
  {
    id: 6,
    title: "Sports Water Bottle",
    price: 9.99,
    category: "supplement",
    image: "https://via.placeholder.com/200x200",
    description: "Stay hydrated with this lightweight sports water bottle.",
  },
];

// Categories for the Shop Page
const categories = [
  { icon: faBoxOpen, title: "All", value: "" },
  { icon: faTshirt, title: "Clothing", value: "clothing" },
  { icon: faBottleWater, title: "Supplement", value: "supplement" },
  { icon: faDumbbell, title: "Equipment", value: "equipment" },
];

const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };

  const filteredProducts = selectedCategory
    ? productData.filter((product) => product.category === selectedCategory)
    : productData;

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
       
      <HeroSection />
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-black text-white z-10">
  <h1 className="text-xl font-bold">Shop</h1>
  <button onClick={toggleCart} className="relative">
    <FontAwesomeIcon icon={faShoppingCart} size="lg" />
    {cartItems.length > 0 && (
      <span className="absolute top-0 right-0 bg-customBlue text-white rounded-full text-xs px-2 py-1">
        {cartItems.length}
      </span>
    )}
  </button>
</header>

      <div className="w-full pl-10 pr-10 pb-10">
        {/* Filters */}
        <div className="flex justify-between items-center my-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryClick(category.value)}
                className={`hover:border-white text-sm px-4 py-2 border rounded-full ${
                  selectedCategory === category.value
                    ? "bg-customBlue text-black"
                    : "border-customBlue text-white"
                }`}
              >
                <FontAwesomeIcon icon={category.icon} className="mr-2" />
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full">
          <div className="my-8">
            <h2 className="text-2xl font-bold mb-16 text-white">
              {selectedCategory
                ? `Showing ${selectedCategory} Products`
                : "All Products For You!"}
            </h2>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 shadow-lg rounded-md hover:shadow-xl transition duration-300 flex flex-col justify-between"
                    style={{ minHeight: "450px" }} // Set a minimum height
                  >
                    {/* Product Image */}
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-64 object-cover rounded-md mb-4 bg-white"
                    />

                    {/* Product Info */}
                    <div className="flex flex-col justify-between h-full">
                      {/* Price and Product Title */}
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold text-white">
                            {product.title}
                          </h3>
                          <p className="text-customBlue font-bold mr-4">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>

                        {/* Product Description */}
                        <p className="text-gray-500 line-clamp-3 mb-2">
                          {product.description}
                        </p>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => addToCart(product)}
                        className="w-auto border border-customBlue text-customBlue py-2 px-4 rounded-full hover:bg-customBlue hover:text-black transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">No products available.</p>
            )}
          </div>
        </div>

        {/* Cart Component */}
        <Cart
          cartItems={cartItems}
          isOpen={isCartOpen}
          onClose={toggleCart}
          onRemoveItem={removeFromCart} onSubmit={function (): void {
            throw new Error("Function not implemented.");
          } }        />
      </div>
      <Footer/>
    </>
  );
};

export default ShopPage;
//NAROS AMAKELE fix this ish. duplicate items issue!
