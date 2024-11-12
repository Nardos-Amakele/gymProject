"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTshirt,
  faDumbbell,
  faBottleWater,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { HeroSection } from "./_components/Hero";
import Cart from "./_components/Cart";
import { Item } from "./_components/Item";

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  description?: string;
}

// Mocked Product Data
const productData: Product[] = [
  {
    id: "a",
    title: "Gym T-Shirt",
    price: 19.99,
    category: "clothing",
    image:
      "https://media.istockphoto.com/id/587819694/photo/wetsuit-isolated-on-white.jpg?s=1024x1024&w=is&k=20&c=kPCOWZw-nJHoV1NmFrHstg3BwA34rkJr4_mM50nf0NE=",
    description: "Comfortable and stylish gym t-shirt.",
  },
  {
    id: "b",
    title: "Running Shorts",
    price: 24.99,
    category: "clothing",
    image:
      "https://media.istockphoto.com/id/1308845005/photo/blue-sport-shorts.jpg?s=1024x1024&w=is&k=20&c=9w8CcyUi4e_ek-hE772LJ9Pfm6lU_Ep4LZFt24t-Fts=",
    description: "Breathable running shorts.",
  },
  {
    id: "c",
    title: "Dumbbells Set",
    price: 49.99,
    category: "equipment",
    image:
      "https://media.istockphoto.com/id/1325558282/vector/barbell-dumbbells-and-kettlebell-vector.jpg?s=1024x1024&w=is&k=20&c=2qpajxGe6UYOoudZubvd9rl6DLynl-vRnIWXfA9OeVo=",
    description: "A complete set of dumbbells for strength training.",
  },
  {
    id: "d",
    title: "Kettlebell",
    price: 34.99,
    category: "equipment",
    image:
      "https://media.istockphoto.com/id/147804317/photo/kettlebell.jpg?s=1024x1024&w=is&k=20&c=b11YI0moM8rrk4dJS0q3C4dC80qpyEHgA0dDYD5w1N4=",
    description: "High-quality kettlebell.",
  },
  {
    id: "e",
    title: "Cycling Gloves",
    price: 14.99,
    category: "supplement",
    image:
      "https://media.istockphoto.com/id/526706209/photo/bicycle-gloves.webp?s=1024x1024&w=is&k=20&c=sNA5BC0nedg3TLPX85SRAc2B7VYc_mN7MTNiTiH82_s=",
    description: "Durable cycling gloves to enhance your grip.",
  },
  {
    id: "f",
    title: "Sports Water Bottle",
    price: 9.99,
    category: "supplement",
    image:
      "https://images.unsplash.com/photo-1601937286283-1c4550e05f58?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };

  const filteredProducts = selectedCategory
    ? productData.filter((product) => product.category === selectedCategory)
    : productData;

  return (
    <>
      <Header />

      <HeroSection />

      <div className="w-full pl-10 pr-10 pb-10">
        {/* Filters */}
        <div
          id="next-section"
          className="flex justify-between items-center my-16"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryClick(category.value)}
                className={`hover:border-white text-sm px-4 py-2 border rounded-full ${selectedCategory === category.value
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
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Item
                    id={product.id}
                    key={product.id}
                    title={product.title}
                    category={product.category}
                    image={product.image}
                    price={product.price}
                    description={product.description}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center">No products available.</p>
            )}
          </div>
        </div>

        {/* Cart Component */}
        <Cart />
      </div>
      <Footer />
    </>
  );
};

export default ShopPage;
//NAROS AMAKELE fix this ish. duplicate items issue!
