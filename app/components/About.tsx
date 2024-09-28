import React from 'react';
import Link from 'next/link';
// images
import aboutImage1 from '../../assets/images/aboutus_hero.jpg';
import aboutImage2 from '../../assets/images/image 2.png';
import aboutImage3 from '../../assets/images/image 3.png';
import Image from 'next/image';
import NeonLine from './NeonLine';

const About = () => {
  return (
    <div>
      <section className="text-white mb-24 px-4 sm:px-6 lg:px-[7rem]">
        <div className="container mx-auto flex flex-col lg:flex-row items-stretch">

          {/* Left Image Section */}
          <div className="sm:w-full lg:w-1/2 flex items-stretch mb-8 lg:mb-0 transition-transform transform hover:scale-105 relative">
            <Link href="./about" className="relative w-full h-[50vh] lg:h-auto rounded-tl-[164px] rounded-br-[6px] rounded-bl-[6px] bg-black rounded-xl overflow-hidden"> {/* Adjust height here */}
              <Image
                src={aboutImage1}
                alt="About Us Hero"
                className="object-cover opacity-80"
                layout="fill"
              />
            </Link>
          </div>

          {/* Text and Smaller Images Section */}
          <div className="lg:w-1/2 lg:pl-12 mr-0 lg:text-start sm:text-start lg:mr-16 flex flex-col justify-between">
            <div>
              <Link href="./about">
                <h2 className="text-6xl font-bold py-5 text-customBlue block">About Us</h2>
              </Link>
              <p className="mb-6 leading-relaxed text-sm text-gray-300 max-w-full">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit .
              </p>
            </div>

            <div className="flex space-x-6 h-full ">
              <Link href="./about" className="w-1/2 h-full flex items-center">
                <Image
                  src={aboutImage2}
                  alt="About Image 2"
                  className="rounded-[6px] w-full h-full object-cover transition-transform transform hover:scale-105"
                  layout="responsive"
                />
              </Link>
              <Link href="./about" className="w-1/2 h-full flex items-center">
                <Image
                  src={aboutImage3}
                  alt="About Image 3"
                  className="rounded-[6px] w-full h-full object-cover transition-transform transform hover:scale-105"
                  layout="responsive"
                />
              </Link>
            </div>
          </div>
        </div>

        <NeonLine />
      </section>
    </div>
  );
};

export default About;
