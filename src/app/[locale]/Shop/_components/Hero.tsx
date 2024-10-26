import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"; // Changed to faArrowDown
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";


export const HeroSection: React.FC = () => {
  const t = useTranslations("shop_page");

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
    <div className="relative h-screen bg-black flex justify-center items-center overflow-hidden pt-2 lg:pt-8">
      <div className="absolute w-full h-full flex flex-col justify-center items-center space-y-6 z-0">
        <div className="w-full flex space-x-6 animate-slideRight">
          {[...images, ...images].map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt={`Image ${idx}`}
              className="opacity-50 w-50 h-40 object-cover rounded-xl"
              style={{ width: "200px", height: "250px" }}
            />
          ))}
        </div>

        <div className="w-[calc(100%+50rem)] flex space-x-6">
          {[...images, ...images].map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt={`Image ${idx}`}
              className="opacity-50 w-50 h-40 object-cover rounded-xl"
              style={{ width: "200px", height: "200px" }}
            />
          ))}
        </div>

        <div className="w-full flex space-x-6 animate-slideRight">
          {[...images, ...images].map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt={`Image ${idx}`}
              className="opacity-50 w-50 h-40 object-cover rounded-xl"
              style={{ width: "200px", height: "200px" }}
            />
          ))}
        </div>
      </div>
      <div className="relative text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold text-white"
        >
          {t("heading")}
        </motion.h1>

        {/* Arrow positioned directly below the Shop heading */}
        <div className="mt-4 flex justify-center">
          <motion.div
            onClick={handleScroll}
            className="flex justify-center border border-white rounded-full p-4 cursor-pointer text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={isJumping ? { y: [0, -10, 0] } : {}}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              repeat: isJumping ? 1 : 0,
            }}
          >
            <FontAwesomeIcon icon={faArrowUp} className="text-white text-xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
