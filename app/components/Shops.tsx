'use client';

import Image from 'next/image';
import shopItem1 from '../../assets/images/shop_item2.png';
import shopItem2 from '../../assets/images/shop_item1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Shop = () => {
  const textAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const imageAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.section
      className="bg-black text-white py-16 px-[9rem] font-jost"
      id="shop"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <div className="flex space-x-16">
        {/* First column */}
        <div className="flex flex-col justify-between">
          <motion.div
            className="container mx-auto"
            variants={textAnimation}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-[#2596BE]">Shop</h2>
            <p className="mb-12 text-gray-300 max-w-sm text-sm font-thin">
              Discover our premium fitness products and accessories at unbeatable prices.
            </p>
          </motion.div>

          {/* Left and right arrows */}
          <motion.div
            className="flex space-x-8 font-bold"
            variants={textAnimation}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {/* Left arrow */}
            <button className="text-[#2596BE] hover:text-gray-400">
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            {/* Right arrow */}
            <button className="text-[#2596BE] hover:text-gray-400">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </motion.div>

          {/* Shop Item 1 */}
          <motion.div
            className="relative mt-6 transition-transform transform hover:scale-105 hover:border-2 hover:border-none"
            variants={imageAnimation}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <Image
              src={shopItem1}
              alt="Kings Gym Belt"
              className="rounded-lg w-[35rem] h-[245.59px]"
            />
            <div className="absolute bottom-4 left-4 flex justify-between items-center w-[95%]">
              <div className="flex items-baseline space-x-1">
                <p className="text-white text-lg font-bold">900</p>
                <p className="font-thin text-sm text-white">Birr</p>
              </div>
              <a
                href="#"
                className="text-sm text-[#2596BE] border border-solid border-[#2596BE] rounded-md px-3 py-1"
              >
                Explore more
              </a>
            </div>
          </motion.div>
        </div>

        {/* Second column */}
        <div className="flex flex-col justify-between">
          {/* Shop Item 2 */}
          <motion.div
            className="relative transition-transform transform hover:scale-105 hover:border-2 hover:border-none"
            variants={imageAnimation}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <Image
              src={shopItem2}
              alt="Water Bottle"
              className="rounded-tl-[6px] rounded-tr-[111px] rounded-br-[6px] rounded-bl-[6px] w-[22rem]"
            />
            <div className="absolute bottom-4 left-4 flex space-x-4">
              <p className="text-red-500 line-through text-lg font-bold">300 Birr</p>
              <p className="text-white text-lg font-bold">150 Birr</p>
            </div>
          </motion.div>

          {/* New Arrival and Discount */}
          <motion.div
            className="flex justify-between mt-4"
            variants={textAnimation}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <p className="text-2xl text-white">New Arrival</p>
            <p className="text-sm text-gray-400 font-thin">
              50% Discount for the first 10 sales
            </p>
          </motion.div>
        </div>
      </div>

      {/* Blue Line at the Bottom */}
      <motion.div
        className="mt-8 border-t-8 border-[#2596BE]"
        variants={textAnimation}
        transition={{ delay: 1.2, duration: 0.8 }}
      />
    </motion.section>
  );
};

export default Shop;
