'use client';

import { useState } from 'react';
import { testimonials } from '../../assets/data/testimonials'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import Profile from '../../assets/images/profile.jpg'
import Image from 'next/image';
const Testimonials = () => {
  const [isHovered, setIsHovered] = useState(false);
  const duplicateTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="relative overflow-hidden w-full h-full bg-black font-jost py-28">
      {/* Shadow effect on both sides */}
      <div className="absolute top-0 left-0 w-36 h-full z-10 pointer-events-none shadow-left-gradient"></div>
      <div className="absolute top-0 right-0 w-36 h-full z-10 pointer-events-none shadow-right-gradient"></div>

      {/* Testimonial slider */}
      <div
        className={`flex animate-scroll gap-10 ${isHovered ? 'pause-scroll' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {duplicateTestimonials.map((testimonial, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-80 bg-[#141416] p-6 text-gray-300 border-x-[0.2px] border-[#41ccff] "
          >
            {/* Border Lines */}
            <div className="absolute w-full h-[0.2px]  left-0 top-0">
              <div className="absolute w-[78%] h-full left-0 bg-[#41ccff]"></div>
              <div className="absolute w-[7%] h-full right-0 bg-[#41ccff]"></div>
            </div>
            <div className="absolute w-full h-[0.2px] left-0 bottom-0">
              <div className="absolute w-[26%] h-full left-0 bg-[#41ccff]"></div>
              <div className="absolute w-[58%] h-full right-0 bg-[#41ccff]"></div>
            </div>

            {/* Quotes on the Borders */}
            <FontAwesomeIcon
              icon={faQuoteRight}
              className="absolute top-[-12px] right-[10%] text-[#41ccff] text-3xl "
            />
            <FontAwesomeIcon
              icon={faQuoteLeft}
              className="absolute bottom-[-12px] left-[30%] text-[#41ccff] text-3xl "
            />

            {/* User info: image + name */}
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-500 overflow-hidden flex-shrink-0">
                {/* Placeholder image */}
                <Image
                  src={Profile} 
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold ml-4">{testimonial.name}</h3>
            </div>

            {/* Testimonial text */}
            <p className="text-sm">{testimonial.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
