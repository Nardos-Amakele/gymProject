'use client'
import React from 'react';
import ServiceCard from './ServiceCard';
import Service1 from '../../assets/images/service_image1.png';
import Service2 from '../../assets/images/image 8.png';
import Service3 from '../../assets/images/image 7.png';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion'; // Import useInView

const services = [
  { title: "Weight Lifting", description: "Train with the best equipment.", icon: "dumbbell", imageSrc: Service1 },
  { title: "Aerobics", description: "Improve your cardio with our aerobic classes.", icon: "running", imageSrc: Service2 },
  { title: "Personal Training", description: "Get one-on-one training sessions.", icon: "user", imageSrc: Service3 },
];

const OurServices = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true }); // Track when the section comes into view

  return (
    <motion.section
      ref={ref}
      id="services"
      className="py-16 bg-black text-white px-[9rem] font-jost"
      initial={{ opacity: 0 }} // Initially hidden
      animate={isInView ? { opacity: 1 } : {}} // Animate when in view
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto">
        <h2 className='text-2xl font-bold text-[#2596BE] mb-4'>
          Our Services
        </h2>
        <p className="text-sm text-gray-300 mb-12 max-w-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
        </p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "show" : "hidden"} // Animate cards when in view
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2, // Stagger each card's appearance
              },
            },
          }}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              imageSrc={service.imageSrc}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default OurServices;
