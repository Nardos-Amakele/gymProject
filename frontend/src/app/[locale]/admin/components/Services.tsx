'use client'
import React, { useState } from 'react';
import { useServiceContext } from "./serviceContext";
import { Tab } from '@/assets/data/servicesData';
import ServiceCard from '../../services/ServicesCards';

const Services: React.FC = () => {
  const { services, activeTab, setActiveTab, addService } = useServiceContext();



  const tabs: Tab[] = [
    "Body Building",
    "Exercise",
    "Group Fitness",
    "Personal Training",
  ];

  return (
    <div className="flex bg-black min-h-screen text-white">
      {/* Left side form */}
      <div className="w-1/3 p-4 space-y-4">
        <h2 className="text-sm font-extralight">Name</h2>
        <input
          type="text"
          className="w-full  bg-[#121212] text-sm font-extralight text-gray-900 rounded-lg p-3 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue"
        />
        <div className='flex gap-2'>
          <div>
            <h2 className="text-sm font-extralight mb-3">Period</h2>
            <div className="flex space-x-2">
              <input
                type="text"
                className="w-full  bg-[#121212] text-sm font-extralight text-gray-900 rounded-lg p-3 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue"
              />
            </div>

          </div>
          <div>
            <h2 className="text-sm font-extralight mb-3">Days Allocated</h2>
            <div>
              <input
                type="text"
                className="w-full  bg-[#121212] text-sm font-extralight text-gray-900 rounded-lg p-3 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue"
              />
            </div>

          </div>
        </div>
        <h2 className="text-sm font-extralight">Price</h2>
        <input
          type="text"
          className="w-full  bg-[#121212] text-sm font-extralight text-gray-900 rounded-lg p-3 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue"
        />
        <h2 className="text-sm font-extralight">Category</h2>
        <select className="w-full  bg-[#121212] text-sm font-extralight text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue">
          <option>Equipment</option>
          <option>Clothing</option>
          <option>Accessories</option>
        </select>
        <h2 className="text-sm font-extralight">Details</h2>
        <input type="text" className="w-full  bg-[#121212] text-sm font-extralight text-gray-900 rounded-lg p-3 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue" />
        <input type="text" placeholder="Optional" className="w-full mb-6 bg-[#121212] text-sm font-extralight text-gray-900 rounded-lg p-3 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue" />
        <input type="text" placeholder="Optional" className="w-full mb-6 bg-[#121212] text-sm font-extralight text-gray-900 rounded-lg p-3 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue" />
        <div className="flex items-center justify-between space-x-2">
          <div className='flex items-center gap-2'>
            <input
              type="checkBox"
              name="type"
              value="income"
              className="form-checkbox w-5 h-5 border-2 border-customBlue rounded text-customBlue"
            />
            <label htmlFor="preferred" className="text-sm font-extralight">Premium</label>

          </div>
          <button
            className="px-5 py-[0.2rem] bg-customBlue text-black rounded hover:bg-zinc-800 text-sm font-extralight"
          >
            Add
          </button>

        </div>

      </div>

      {/* Right side tabs */}
      <div className="w-full lg:w-2/3 bg-[#121212] p-7 rounded-xl">
        <div className="flex justify-center space-x-4 mb-4 text-lg font-semibold">
          <ul className="flex text-base space-x-10">
            {tabs.map((tab) => (
              <li
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer ${activeTab === tab ? 'text-customBlue' : ''}`}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>

        {/* Service Cards*/}
        <div className="grid grid-cols-2 ">
          {services[activeTab]?.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              price={service.price}
              benefits={service.benefits}
              isPremium={service.isPremium}
              isPerDay={service.isPerDay}
              onClick={() => { }}
              className='scale-75'
              />
          ))}

        </div>
      </div>
    </div>
  );
};

export default Services;