'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faQuoteRight, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import before1 from '../../assets/images/before.jpeg';
import after1 from '../../assets/images/after.jpeg';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      description: `Before working with Andres I struggled with back pain and gaining strength for powerlifting. After hiring him, I was able to hit lifetime PR's at my powerlifting meet, drop 30 pounds of fat, and eliminate my back pain completely while celebrating the birth of my baby daughter. I couldn't be happier with the results I've had. Andres is the absolute best coach out there!`,
      name: 'TAYLOR MOORMAN',
    },
    {
      description: `Andres helped me fix my diet and workout routine, which allowed me to lose 20 pounds and build muscle. I'm in the best shape of my life!`,
      name: 'JORDAN SMITH',
    },
    {
      description: `After training with Andres, I improved my endurance and finished my first marathon. His coaching has changed my life for the better!`,
      name: 'EMILY DAVIS',
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
    <div className="relative max-w-6xl mx-auto px-[3rem] py-10 mb-10">
      {/* Testimonials */}
      <div className="flex flex-col md:flex-row justify-between bg-black text-white p-5 rounded-lg transition-all duration-500 ease-in-out" style={{ height: '400px' }}>
        {/* Before and After Images */}
        <div className="w-full md:w-1/2  flex space-x-5">
          <div className="before-img text-center h-full">
            <h3 className=" text-black bg-customBlue text-lg font-bold mb-2">BEFORE</h3>
            <Image
              src={before1}
              alt="Before"
              className="rounded-lg h-5/6"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="after-img text-center">
            <h3 className="text-black bg-customBlue text-lg font-bold mb-2">AFTER</h3>
            <Image
              src={after1}
              alt="After"
              className="rounded-lg h-5/6"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Testimonial Text */}
        <div className="w-full md:w-1/2 mt-5 md:mt-5 px-5 text-center md:text-left relative">
          <FontAwesomeIcon icon={faQuoteLeft} size="2x" className="text-customBlue" />
          <p className="text-lg italic">{testimonials[currentIndex].description}</p>
          <FontAwesomeIcon icon={faQuoteRight} size="2x" className="text-customBlue md:absolute right-5" />
          <p className="mt-12 font-bold text-2xl">{testimonials[currentIndex].name}</p>
        </div>
      </div>

      {/* Arrows for navigation */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white bg-customBlue p-2 rounded-full"
        onClick={prevTestimonial}
        style={{ transform: 'translateY(-50%)' }}
      >
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white bg-customBlue p-2 rounded-full"
        onClick={nextTestimonial}
        style={{ transform: 'translateY(-50%)' }} 
      >
        <FontAwesomeIcon icon={faArrowRight} size="lg" />
      </button>
    </div>
  );
};

export default Testimonials;
