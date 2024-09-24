"use client";
import React from "react";

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
    <div className="relative h-screen bg-black flex justify-center items-center overflow-hidden pt-8">
      {/* Sliding image containers */}
      <div className="absolute w-full h-full flex flex-col justify-center items-center space-y-6 z-0">
        {/* First Row (Left to Right) */}
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

        {/* Second Row (Right to Left) */}
        <div className="w-[calc(100%+50rem)] flex space-x-6 ">
          {[...images, ...images].map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt={`Image ${idx}`}
              className="w-50 h-auto rounded-xl"
            />
          ))}
        </div>

        {/* Third Row (Left to Right) */}
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

      {/* Foreground content */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Shop</h1>
        <p className="text-lg">Discover the best products for your lifestyle.</p>
      </div>
    </div>
  );
};

export default HeroSection;