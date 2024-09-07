import React from 'react';
import ServiceCard from './ServiceCard';


const services = [
  { title: "Weight Lifting", description: "Train with the best equipment.", icon: "barbell" },
  { title: "Aerobics", description: "Improve your cardio with our aerobic classes.", icon: "aerobics" },
  { title: "Personal Training", description: "Get one-on-one training sessions.", icon: "trainer" },
];

const OurServices = () => {
  return (
    <section id="services" className="py-16 bg-black text-white px-[13rem]">
      <div className="container mx-auto">
        <h2 className='text-xl font-bold text-[#2596BE] mb-4'>
          Our Services
        </h2>
        <p className="text-sm text-gray-300 mb-12 max-w-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} title={service.title} description={service.description} icon={service.icon} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
