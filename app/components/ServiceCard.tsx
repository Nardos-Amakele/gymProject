import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Service1 from '../../assets/images/image 4.png'

type ServiceCardProps = {
  title: string;
  description: string;
  icon: string;
  imageSrc: StaticImageData;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, imageSrc }) => {
  return (
    <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg h-96 flex flex-col justify-end transition-transform transform hover:scale-105 hover:border-2 hover:border-none">
      <div className="absolute inset-0 bg-black opacity-90 rounded-lg ">
        <Image  src={imageSrc} alt='title' layout='fill' objectFit='cover' className=" opacity-90 object-cover" />
      </div>


      <div className="absolute left-0 bg-black p-2 top-0 rounded-tl-[1px] rounded-tr-[0px] rounded-br-[33px] rounded-bl-[0px]">
        <div className="w-[3.1rem] h-[3.4rem] "></div>
      </div>

      <div className="relative z-10 text-white p-4">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-lg">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
