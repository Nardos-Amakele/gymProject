"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTshirt,
  faDumbbell,
  faBottleWater,
  faBoxOpen,
  faShoppingCart,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import Cart from "../components/Cart"; 
import Footer from "../components/Footer"
import Header from "../components/Header"
import { motion } from "framer-motion";


// HeroSection Component
const HeroSection: React.FC = () => {
  const images = [
    "https://media.istockphoto.com/id/469510058/photo/whey-protein-powder.webp?s=1024x1024&w=is&k=20&c=-8C1S9kwn1X7oBDw1LX51TfX9BESpEu2F4zt3KINoSg=",
    "https://media.istockphoto.com/id/1193707579/photo/rows-of-dumbbells-in-the-gym-with-hand.jpg?s=1024x1024&w=is&k=20&c=DM94NjhXdZoljOaOtD8T7J1p9Dy8eYhkOG4DM2r0arw=",
    "https://images.pexels.com/photos/949126/pexels-photo-949126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/28636773/pexels-photo-28636773/free-photo-of-man-holding-weight-plate-in-gym-setting.png?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/416754/pexels-photo-416754.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/4164843/pexels-photo-4164843.jpeg?auto=compress&cs=tinysrgb&w=600",

  ];
  
    const [isJumping, setIsJumping] = useState(true);
  
    const handleScroll = () => {
      const nextSection = document.getElementById("next-section");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    };
  
    useEffect(() => {
      let timeoutId: NodeJS.Timeout;
      if (isJumping) {
        timeoutId = setTimeout(() => {
          setIsJumping(false);
        }, 1200);
      } else {
        timeoutId = setTimeout(() => {
          setIsJumping(true);
        }, 3000);
      }
      return () => clearTimeout(timeoutId);
    }, [isJumping]);

  return (
    <div className="relative h-screen bg-black flex justify-center items-center overflow-hidden pt-8">
      <div className="absolute w-full h-full flex flex-col justify-center items-center space-y-6 z-0">
        <div className="w-full flex space-x-6 animate-slideRight">
          {[...images, ...images].map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt={`Image ${idx}`}
              className=" opacity-50 w-50 h-40 object-cover rounded-xl" // Set fixed width and height
              style={{ width: '200px', height: '150px' }} // Ensure 200x150 dimensions
            />
          ))}
        </div>
  
        <div className="w-[calc(100%+50rem)] flex space-x-6">
          {[...images, ...images].map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt={`Image ${idx}`}
              className="  opacity-50 w-50 h-40 object-cover rounded-xl" // Set fixed width and height
              style={{ width: '200px', height: '150px' }} // Ensure 200x150 dimensions
            />
          ))}
        </div>
  
        <div className="w-full flex space-x-6 animate-slideRight">
          {[...images, ...images].map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt={`Image ${idx}`}
              className=" opacity-50 w-50 h-40 object-cover rounded-xl" // Set fixed width and height
              style={{ width: '200px', height: '150px' }} // Ensure 200x150 dimensions
            />
          ))}
        </div>
      </div>
  
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold mb-4 text-customBlue">Shop</h1>
        <p className="text-lg">Discover the best products for your lifestyle.</p>
        <div className="mt-6">
        <div className="mt-6">
      <div className="flex justify-center">
        <motion.div
          onClick={handleScroll}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-customBlue shadow-lg cursor-pointer"
          whileHover={{ scale: 1.1 }}  // Hover effect for smoother interaction
          whileTap={{ scale: 0.9 }}    // Tap effect for feedback
          animate={isJumping ? { y: [0, -10, 0] } : {}}
          transition={{ 
            duration: 0.6, 
            ease: "easeInOut", 
            repeat: isJumping ? 1 : 0, // Jump twice
          }}  
        >
          <FontAwesomeIcon icon={faChevronDown} className="text-white text-xl" />
        </motion.div>
      </div>
    </div>
</div>
      </div>
    </div>
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
    image: "https://media.istockphoto.com/id/587819694/photo/wetsuit-isolated-on-white.jpg?s=1024x1024&w=is&k=20&c=kPCOWZw-nJHoV1NmFrHstg3BwA34rkJr4_mM50nf0NE=",
    description: "Comfortable and stylish gym t-shirt.",
  },
  {
    id: 2,
    title: "Running Shorts",
    price: 24.99,
    category: "clothing",
    image: "https://media.istockphoto.com/id/1308845005/photo/blue-sport-shorts.jpg?s=1024x1024&w=is&k=20&c=9w8CcyUi4e_ek-hE772LJ9Pfm6lU_Ep4LZFt24t-Fts=",
    description: "Breathable running shorts.",
  },
  {
    id: 3,
    title: "Dumbbells Set",
    price: 49.99,
    category: "equipment",
    image: "https://media.istockphoto.com/id/1325558282/vector/barbell-dumbbells-and-kettlebell-vector.jpg?s=1024x1024&w=is&k=20&c=2qpajxGe6UYOoudZubvd9rl6DLynl-vRnIWXfA9OeVo=",
    description: "A complete set of dumbbells for strength training.",
  },
  {
    id: 4,
    title: "Kettlebell",
    price: 34.99,
    category: "equipment",
    image: "https://media.istockphoto.com/id/147804317/photo/kettlebell.jpg?s=1024x1024&w=is&k=20&c=b11YI0moM8rrk4dJS0q3C4dC80qpyEHgA0dDYD5w1N4=",
    description: "High-quality kettlebell.",
  },
  {
    id: 5,
    title: "Cycling Gloves",
    price: 14.99,
    category: "supplement",
    image: "https://media.istockphoto.com/id/526706209/photo/bicycle-gloves.webp?s=1024x1024&w=is&k=20&c=sNA5BC0nedg3TLPX85SRAc2B7VYc_mN7MTNiTiH82_s=",
    description: "Durable cycling gloves to enhance your grip.",
  },
  {
    id: 6,
    title: "Sports Water Bottle",
    price: 9.99,
    category: "supplement",
    image: "https://images.unsplash.com/photo-1601937286283-1c4550e05f58?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      {/*how to add the header?*/}
      <HeroSection />
      <Header />
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
        <div id="next-section"  className="flex justify-between items-center my-16">
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
                    className="p-4 shadow-lg rounded-md hover:shadow-xl transition duration-300 flex flex-col justify-between hover:border-customBlue hover:border-2"
                    style={{ minHeight: "450px" }} // Set a minimum height
                  >
                    {/* Product Image */}
                    <img
                      src={product.image}
                      alt={product.title}
                      className="opacity-75 hover:opacity-100 w-full h-64 object-cover rounded-md mb-4 bg-white"
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
