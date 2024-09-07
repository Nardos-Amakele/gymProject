import React from 'react';

type ServiceCardProps = {
  title: string;
  description: string;
  icon: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => {
  return (
    <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg h-96 flex flex-col justify-end transition-transform transform hover:scale-105 hover:border-2 hover:border-[#2596BE]">
      <div className="absolute inset-0 bg-black opacity-60 rounded-lg">
        <img
          src="https://via.placeholder.com/300"
          alt="Placeholder"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>


      <div className="absolute top-4 left-4 bg-[#2596BE] p-2 rounded-full">
        <div className="w-8 h-8 bg-white"></div>
      </div>

      <div className="relative z-10 text-white p-4">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-lg">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
