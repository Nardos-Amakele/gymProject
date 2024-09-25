'use client';

import { useState } from 'react';
import { testimonials } from '../../assets/data/testimonials'; 

const Testimonials = () => {
  const [isHovered, setIsHovered] = useState(false);
  const duplicateTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="relative overflow-hidden w-full h-full bg-black font-jost pb-16 ">
      {/* Shadow effect on both sides */}
      <div className="absolute top-0 left-0 w-36 h-full z-10 pointer-events-none shadow-left-gradient"></div>
      <div className="absolute top-0 right-0 w-36 h-full z-10 pointer-events-none shadow-right-gradient"></div>

      <div
        className={`flex animate-scroll gap-10  ${isHovered ? 'pause-scroll' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {duplicateTestimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-80 bg-[#141416] p-6 rounded-xl shadow-lg text-gray-300 border-[0.5px] b-gray-300 "
          >
            <h3 className="text-lg font-bold mb-2">{testimonial.name}</h3>
            <p className="text-sm mb-4">{testimonial.text}</p>
            <div className="flex justify-start items-center space-x-2">
            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
