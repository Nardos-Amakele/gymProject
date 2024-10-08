'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faQuoteRight, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion'; 
import before1 from '../../assets/images/before.jpg';
import after1 from '../../assets/images/after.jpg';
import before2 from '../../assets/images/before2.jpg';
import after2 from '../../assets/images/after2.jpg';
import before3 from '../../assets/images/before3.jpg';
import after3 from '../../assets/images/after3.jpg';
import before4 from '../../assets/images/before4.jpg';
import after4 from '../../assets/images/after4.jpg';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      description: `Before working with Andres, I struggled with back pain and gaining strength for powerlifting. After hiring him, I was able to drop 30 pounds, eliminate my back pain, and hit lifetime PRs at my powerlifting meet—all while celebrating the birth of my daughter. Andres is the best coach out there!`,
      name: 'Eden Gebreselassie',
      beforeImage: before1,
      afterImage: after1,
    },
    {
      description: `I had been overweight for years and struggled to stay consistent with workouts. With Andres' guidance, I lost 25 pounds, improved my overall fitness, and gained more muscle than I ever thought possible. I'm stronger and more confident now.`,
      name: 'Bereket Tesfaye',
      beforeImage: before2,
      afterImage: after2,
    },
    {
      description: `I wanted to lose weight after giving birth, but I wasn’t sure where to start. Andres helped me create a plan that fit my lifestyle, and I ended up losing 20 pounds while feeling more energetic and healthy. His coaching has made a huge impact on my life!`,
      name: 'Meheret Alemu',
      beforeImage: before3,
      afterImage: after3,
    },
    {
      description: `I wanted to lose weight after giving birth, but I wasn’t sure where to start. Andres helped me create a plan that fit my lifestyle, and I ended up losing 20 pounds while feeling more energetic and healthy. His coaching has made a huge impact on my life!`,
      name: 'Meheret Alemu',
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
    <div className="relative max-w-6xl mx-auto px-4 sm:px-8 py-10 mb-10">
      {/* Testimonials */}
      <motion.div 
        className="flex flex-col md:flex-row justify-between bg-black text-white p-5 rounded-lg transition-all duration-500 ease-in-out" 
        style={{ height: 'auto' }} // Change height to auto for smaller screens
        key={currentIndex}
        initial={{ opacity: 0, x: 50, scale: 0.95 }}  
        animate={{ opacity: 1, x: 0, scale: 1 }} 
        exit={{ opacity: 0, x: -50, scale: 0.95 }} 
        transition={{ ease: "easeInOut" }}  
      >
        {/* Before and After Images */}
        <div className="w-full md:w-1/2 flex space-x-5">
          <div className="before-img text-center h-full w-full">
            <h3 className="text-black bg-customBlue text-sm sm:text-lg font-bold mb-2 w-[100%]">BEFORE</h3> 
            <Image
              src={testimonials[currentIndex].beforeImage}
              alt="Before"
              className="rounded-lg h-[200px] sm:h-[250px] md:h-3/5 object-contain"
            />
          </div>
          <div className="after-img text-center">
            <h3 className="text-black bg-customBlue text-sm sm:text-lg font-bold mb-2 w-[100%]">AFTER</h3> 
            <Image
              src={testimonials[currentIndex].afterImage}
              alt="After"
              className="rounded-lg h-[200px] sm:h-[250px] md:h-3/5 object-contain"
            />
          </div>
        </div>

        {/* Testimonial Text */}
        <div className="w-full md:w-1/2 mt-5 md:mt-0 px-3 sm:px-5 text-center md:text-left relative">
          <FontAwesomeIcon icon={faQuoteLeft} size="lg" className="text-customBlue" />
          <p className="text-sm sm:text-lg italic">{testimonials[currentIndex].description}</p>
          <FontAwesomeIcon icon={faQuoteRight} size="lg" className="text-customBlue md:absolute right-5" />
          <p className="mt-6 sm:mt-12 font-bold text-xl sm:text-2xl">{testimonials[currentIndex].name}</p>
        </div>
      </motion.div>

      {/* Arrows for navigation */}
      <button
        className="absolute top-1/2 left-2 sm:left-0 transform -translate-y-1/2 text-white bg-customBlue p-2 rounded-full"
        onClick={prevTestimonial}
        style={{ transform: 'translateY(-50%)' }}
      >
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      <button
        className="absolute top-1/2 right-2 sm:right-0 transform -translate-y-1/2 text-white bg-customBlue p-2 rounded-full"
        onClick={nextTestimonial}
        style={{ transform: 'translateY(-50%)' }}
      >
        <FontAwesomeIcon icon={faArrowRight} size="lg" />
      </button>
    </div>
  );
};

export default Testimonials;
