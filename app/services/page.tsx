'use client'

import React, { useState, useRef, useEffect } from 'react';
import ServiceCard from './ServicesCards';
import servicesHero from '../../assets/images/services_hero.jpg';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { services, Tab } from '../../assets/data/servicesData'; 

const Page = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Body Building');
  const nextSectionRef = useRef<HTMLDivElement | null>(null);

  const tabs: Tab[] = ['Body Building', 'Exercise', 'Group Fitness', 'Personal Training'];
  
  const descriptions: { [key in Tab]: string } = {
    'Body Building': 'Achieve your fitness goals with our dedicated bodybuilding packages.',
    'Exercise': 'Stay fit and energized with various exercise options for all levels.',
    'Group Fitness': 'Join our group fitness classes for a fun and dynamic workout experience.',
    'Personal Training': 'Get personalized attention with our 1-on-1 coaching and tailored plans.',
  };

  const scrollToNextSection = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [isJumping, setIsJumping] = useState(true);

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
    <>
      <Header />
      <div className="bg-black text-white space-y-6">
        <div
          className="relative w-full h-[100vh] bg-fixed bg-center bg-cover"
          style={{ backgroundImage: `url(${servicesHero.src})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl font-bold text-white"
            >
              Services
            </motion.h1>
            <div className="flex justify-center pt-4">
              <motion.div
                onClick={scrollToNextSection}
                className="bottom-4 justify-center border border-white rounded-full p-4 cursor-pointer text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={isJumping ? { y: [0, -10, 0] } : {}}
                transition={{
                  duration: 0.6,
                  ease: 'easeInOut',
                  repeat: isJumping ? 1 : 0,
                }}
              >
                <FontAwesomeIcon icon={faArrowUp} className="text-white text-xl" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div ref={nextSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800 rounded-2xl w-fit flex flex-wrap justify-center p-2 mx-auto space-x-4 mb-16 border-solid border">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-bold ${
                activeTab === tab ? 'text-[#2596BE]' : 'text-gray-400 bg-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <p className="text-center text-gray-400 mt-4">{descriptions[activeTab]}</p>

        <div className="flex flex-wrap gap-6 justify-center mt-8">
          {services[activeTab]?.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              price={service.price}
              benefits={service.benefits}
              isPremium={service.isPremium}
              isPerDay={service.isPerDay}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
