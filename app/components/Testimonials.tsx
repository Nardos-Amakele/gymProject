'use client';

import { useState } from 'react';
import { testimonials } from '../../assets/data/testimonials'; 

const Testimonials = () => {
  const [isHovered, setIsHovered] = useState(false);
  const duplicateTestimonials = [...testimonials, ...testimonials];

  return (
<div className="relative overflow-hidden w-full h-full bg-black font-jost">
      <div
        className={`flex animate-scroll gap-10 ${isHovered ? 'pause-scroll' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {duplicateTestimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-80 bg-gray-800 p-6 rounded-xl shadow-lg text-white"
          >
            <p className="text-lg leading-relaxed mb-4">
              <span className="text-[#2596BE] text-2xl">&ldquo; </span>
              {testimonial.text}
              <span className="text-[#2596BE] text-2xl"> &rdquo;</span>
            </p>
            <p className="text-right text-[#2596BE] font-bold">- {testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
