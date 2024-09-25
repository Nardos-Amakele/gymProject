'use client'
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faRunning, faUser } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion'; 

type ServiceCardProps = {
  title: string;
  description: string;
  icon: string;
  imageSrc: StaticImageData;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, imageSrc }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true }); 

  const renderIcon = () => {
    switch (icon) {
      case 'dumbbell':
        return <FontAwesomeIcon icon={faDumbbell} className="text-[#2596BE] text-2xl w-12 h-12" />;
      case 'running':
        return <FontAwesomeIcon icon={faRunning} className="text-[#2596BE] text-2xl w-12 h-12" />;
      case 'user':
        return <FontAwesomeIcon icon={faUser} className="text-[#2596BE] text-xl w-12 h-12" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={ref}
      className="relative bg-gray-800 p-6 rounded-lg shadow-lg h-96 flex flex-col justify-end transition-transform hover:scale-50"
      initial={{ opacity: 0, y: 50 }} 
      animate={isInView ? { opacity: 1, y: 0 } : {}} 
      transition={{ duration: 1, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, transition: {
        duration: 0.5, 
      }, }}
    >
      <div className="absolute inset-0 bg-black opacity-90 rounded-lg">
        <Image src={imageSrc} alt={title} layout="fill" objectFit="cover" className="opacity-90 object-cover rounded-lg" />
      </div>

      <div className="absolute left-0 bg-black p-2 top-0 rounded-tl-[1px] rounded-tr-[0px] rounded-br-[33px] rounded-bl-[0px]">
        {renderIcon()}
      </div>

      <div className="relative z-10 text-white p-4">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-lg">{description}</p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
