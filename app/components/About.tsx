'use client'
import React from 'react'
// images
import aboutImage1 from '../../assets/images/aboutus_hero.jpg';
import aboutImage2 from '../../assets/images/image 2.png';
import aboutImage3 from '../../assets/images/image 3.png';
import Image from 'next/image';
import { motion } from 'framer-motion';

const About = () => {
  // Define animation variants
  const imageVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: 'easeOut' } },
  };

  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: 'easeOut' } }
  };

  return (
    <div>
      <section className="text-white mb-24 px-8">
        <div className="container mx-auto flex flex-col lg:flex-row items-stretch">

          {/* Left Image Section */}
          <motion.div
            className="lg:w-1/2 ml-16 flex items-stretch"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={imageVariant}
          >
            <div className="relative w-full rounded-tl-[164px] rounded-br-[6px] rounded-bl-[6px] bg-black rounded-xl overflow-hidden">
              <Image
                src={aboutImage1}
                alt="About Us Hero"
                className="object-cover opacity-80"
                layout="fill"
              />
            </div>
          </motion.div>

          {/* Text and Smaller Images Section */}
          <motion.div
            className="lg:w-1/2 lg:pl-12 mr-16 lg:text-start sm:text-center flex flex-col justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={textVariant}
          >
            <div>
              <h2 className="text-xl font-bold mb-5 text-customBlue">About Us</h2>
              <p className="mb-6 leading-relaxed text-sm text-gray-300 max-w-full">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
              </p>
            </div>

            <div className="flex space-x-6 h-full">
              <motion.div
                className="w-1/2 h-full flex items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={imageVariant}
              >
                <Image
                  src={aboutImage2}
                  alt="About Image 2"
                  className="rounded-[6px] w-full h-full object-cover"
                  layout="responsive"
                />
              </motion.div>
              <motion.div
                className="w-1/2 h-full flex items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={imageVariant}
              >
                <Image
                  src={aboutImage3}
                  alt="About Image 3"
                  className="rounded-[6px] w-full h-full object-cover"
                  layout="responsive"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Divider Line Animation */}
        <motion.div
          className="mt-8 lg:px-10 mx-auto container"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <hr className="border-t-8 border-customBlue" />
        </motion.div>
      </section>
    </div>
  );
};

export default About;
