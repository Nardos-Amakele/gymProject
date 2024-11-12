"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faQuoteRight,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import after1 from "@/assets/images/after.jpg";
import before2 from "@/assets/images/before2.jpg";
import after2 from "@/assets/images/after2.jpg";
import before3 from "@/assets/images/before3.jpg";
import after3 from "@/assets/images/after3.jpg";
import before4 from "@/assets/images/before4.jpg";
import before1 from "@/assets/images/before.jpg";
import after4 from "@/assets/images/after4.jpg";
import { useTranslations } from "next-intl";

const Testimonials: React.FC = () => {
  const t = useTranslations("home_Page.testimonialSection");
  const testimonials = [
    {
      description: t("testimonials.0.quote"),
      name: t("testimonials.0.name"),
      beforeImage: before1,
      afterImage: after1,
    },
    {
      description: t("testimonials.1.quote"),
      name: t("testimonials.1.name"),
      beforeImage: before2,
      afterImage: after2,
    },
    {
      description: t("testimonials.2.quote"),
      name: t("testimonials.2.name"),
      beforeImage: before3,
      afterImage: after3,
    },
    {
      description: t("testimonials.3.quote"),
      name: t("testimonials.3.name"),
      beforeImage: before4,
      afterImage: after4,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 py-10 mb-10">
        {/* Testimonials */}
        <motion.div
          className="flex flex-col md:flex-row justify-between bg-black text-white p-5 rounded-lg transition-all duration-500 ease-in-out"
          style={{ height: "auto" }} // Change height to auto for smaller screens
          key={currentIndex}
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.95 }}
          transition={{ ease: "easeInOut" }}
        >
          {/* Before and After Images */}
          <div className="w-full md:w-1/2 flex md:h-[30rem] space-x-5">
            <div className="before-img text-center h-full w-full">
              <h3 className="text-black bg-customBlue text-sm sm:text-lg font-bold mb-2 w-[100%]">
                {t("testimonials.0.before")}
              </h3>
              <Image
                src={testimonials[currentIndex].beforeImage}
                alt="Before"
                className="rounded-lg h-[200px] sm:h-[250px] md:h-3/5 object-contain"
              />
            </div>
            <div className="after-img text-center">
              <h3 className="text-black bg-customBlue text-sm sm:text-lg font-bold mb-2 w-[100%]">
                {t("testimonials.0.after")}
              </h3>
              <Image
                src={testimonials[currentIndex].afterImage}
                alt="After"
                className="rounded-lg h-[200px] sm:h-[250px] md:h-3/5 object-contain"
              />
            </div>
          </div>

          {/* Testimonial Text */}
          <div className="w-full md:w-1/2 mt-5 md:mt-0 px-3 sm:px-5 text-center md:text-left relative">
            <FontAwesomeIcon
              icon={faQuoteLeft}
              size="lg"
              className="text-customBlue"
            />
            <p className="text-sm sm:text-lg italic">
              {testimonials[currentIndex].description}
            </p>
            <FontAwesomeIcon
              icon={faQuoteRight}
              size="lg"
              className="text-customBlue md:absolute right-5"
            />
            <p className="mt-6 sm:mt-12 font-bold text-xl sm:text-2xl">
              {testimonials[currentIndex].name}
            </p>
          </div>
        </motion.div>

        {/* Arrows for navigation */}
        <button
          className="absolute top-1/2 left-4 -translate-y-[200%] text-white bg-customBlue p-2 rounded-full z-10"
          onClick={prevTestimonial}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </button>
        <button
          className="absolute top-1/2 right-4 -translate-y-[200%] text-white bg-customBlue p-2 rounded-full z-10"
          onClick={nextTestimonial}
        >
          <FontAwesomeIcon icon={faArrowRight} size="lg" />
        </button>
      </div>
    </>
  );
};

export default Testimonials;
