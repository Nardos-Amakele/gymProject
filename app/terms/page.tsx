'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const TermsAndConditions = () => {
  return (
    <>
      <Header />
      <div className="bg-black py-24 px-6 sm:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto bg-[#131313] shadow-lg rounded-lg p-8">
          <motion.h1 
            className="text-3xl font-bold text-white mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Terms and Conditions
          </motion.h1>

          <motion.div 
            className="space-y-8 text-white leading-relaxed"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {[
              {
                title: "Maintaining Personal Hygiene",
                text: "It is mandatory for every individual to maintain personal cleanliness."
              },
              {
                title: "Wearing Sports Armor",
                text: "Anyone entering the sports area must wear proper sports attire."
              },
              {
                title: "Prohibited Items",
                text: "Items with strong scents, such as perfumes or deodorants, are not allowed in the sports hall."
              },
              {
                title: "Respect for Equipment",
                text: "Use gym equipment responsibly without disturbing others or causing damage."
              },
              {
                title: "Returning Equipment",
                text: "Return equipment to its proper place after use to maintain sportsmanship."
              },
              {
                title: "Clearing Space",
                text: "Release equipment after use to allow others to work."
              },
              {
                title: "Camera Awareness",
                text: "Avoid unnecessary behaviors as you are being monitored by cameras."
              },
              {
                title: "Locker Use",
                text: "Use the locker appropriately and don’t forget to return the key after use."
              },
              {
                title: "Waste Disposal",
                text: "Properly dispose of items like gum or personal care products in designated bins."
              },
              {
                title: "Shoes",
                text: "Store shoes in the provided locker; the center is not liable for lost property."
              },
              {
                title: "Gym Hours",
                text: "Respect the gym’s opening hours and behave in a sportsmanlike manner."
              },
            ].map((item, index) => (
              <motion.section
                key={index}
                variants={sectionVariants}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-semibold text-white mb-4">{item.title}</h2>
                <p>{item.text}</p>
              </motion.section>
            ))}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
