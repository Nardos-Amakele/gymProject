'use client';
import React from 'react';
import Link from 'next/link';
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
  const isInView = useInView(ref, { once: true }); 
  return (
    <motion.section
      ref={ref}
      id="services"
      className="py-16 bg-black text-white px-4 sm:px-8 md:px-16 lg:px-[9rem] font-jost" // Adjusted padding
      initial={{ opacity: 0 }} // Initially hidden
      animate={isInView ? { opacity: 1 } : {}} // Animate when in view
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto">
        {/* Link the header to /services */}
        <Link href="/services">
          <h2 className='text-6xl font-bold text-[#2596BE] mb-4'>
            Our Services
          </h2>
        </Link>
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
                staggerChildren: 0.2, 
              },
            },
          }}
        >
          {services.map((service, index) => (
            <div className="w-full sm:w-auto p-4 sm:p-0" key={index}> {/* Ensure full width on small screens */}
              {/* Link the service images to /services */}
              <Link href="/services">
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  imageSrc={service.imageSrc}
                />
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default OurServices;
