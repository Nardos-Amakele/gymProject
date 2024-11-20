'use client'
import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useFetchServices } from '../../hooks/usefetchServices';
import ServiceCard from '../../services/ServicesCards';
import EditServiceModal from './EditServiceModal';

const Services: React.FC = () => {
  const { services, loading, error } = useFetchServices();
  const [activeTab, setActiveTab] = useState<keyof typeof services>("Exercise");
  const [modalService, setModalService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    period: '',
    daysAllocated: '',
    price: '',
    category: 'Exercise',
    details: '',
    isPremium: false
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddService = async () => {
    const newService = { ...formData };

    try {
      const formDataToSend = new FormData();
      Object.entries(newService).forEach(([key, value]) => {
        formDataToSend.append(key, value as string | Blob);
      });

      await axios.post('/api/services', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Service added successfully!');
    } catch (error) {
      console.error("Failed to add service:", error);
      alert('Failed to add service');
    }
  };

  const tabs = Object.keys(services);
  const handleCardClick = (service: any) => {
    setModalService(service);
  };

  const handleCloseModal = () => {
    setModalService(null);
  };

  const handleSaveService = (updatedService: any) => {
    setModalService(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div className="flex bg-black min-h-screen text-white">
      {/* Left side form */}
      <div className="w-1/3 p-4 space-y-4">
        <h2 className="text-sm font-extralight">Name</h2>
        <input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          type="text"
          className="w-full bg-[#121212] text-sm font-extralight text-white rounded-lg p-3 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue"
        />
        <div className='flex gap-2'>
          <div>
            <h2 className="text-sm font-extralight mb-3">Period</h2>
            <input
              name="period"
              value={formData.period}
              onChange={handleInputChange}
              type="text"
              className="w-full bg-[#121212] text-sm font-extralight text-white rounded-lg p-3 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue"
            />
          </div>
          <div>
            <h2 className="text-sm font-extralight mb-3">Days Allocated</h2>
            <input
              name="daysAllocated"
              value={formData.daysAllocated}
              onChange={handleInputChange}
              type="text"
              className="w-full bg-[#121212] text-sm font-extralight text-white rounded-lg p-3 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue"
            />
          </div>
        </div>
        <h2 className="text-sm font-extralight">Price</h2>
        <input
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          type="text"
          className="w-full bg-[#121212] text-sm font-extralight text-white rounded-lg p-3 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue"
        />
        <h2 className="text-sm font-extralight">Category</h2>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full bg-[#121212] text-sm font-extralight text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue"
        >
          <option>Exercise</option>
          <option>Body Building</option>
          <option>Group Fitness</option>
          <option>Personal Training</option>
          <option>Annual</option>
        </select>
        <h2 className="text-sm font-extralight">Details</h2>
        <input
          name="details"
          value={formData.details}
          onChange={handleInputChange}
          type="text"
          className="w-full bg-[#121212] text-sm font-extralight text-white rounded-lg p-3 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue"
        />
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            name="isPremium"
            checked={formData.isPremium}
            onChange={handleInputChange}
            className="form-checkbox w-5 h-5 border-2 border-customBlue rounded text-customBlue"
          />
          <label htmlFor="isPremium" className="text-sm font-extralight">Premium</label>
        </div>
        <button
          onClick={handleAddService}
          className="mt-4 px-5 py-[0.2rem] bg-customBlue text-black rounded hover:bg-zinc-800 text-sm font-extralight"
        >
          Add
        </button>
      </div>

      {/* Right side tabs */}
      <div className="w-full lg:w-2/3 bg-[#121212] p-7 rounded-xl">
        <div className="flex justify-center space-x-4 mb-4 text-lg font-semibold">
          <ul className="flex text-base space-x-10">
            {tabs.map((tab) => (
              <li
                key={tab}
                onClick={() => setActiveTab(tab as keyof typeof services)}
                className={`cursor-pointer ${activeTab === tab ? 'text-customBlue' : ''}`}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-2 ">
          {services[activeTab]?.map((service, index) => (
            <div key={index} onClick={() => handleCardClick(service)}>
              <ServiceCard
                title={service.name}
                price={`${service.price} Birr`}
                benefits={service.description}
                isPremium={service.isPremium}
                isPerDay={service.isPerDay}
                className='scale-75'
                onClick={() => {}}
              />
            </div>
          ))}
          {modalService && (
            <EditServiceModal
              service={modalService}
              onClose={handleCloseModal}
              onSave={handleSaveService}
              onDelete={() => {}}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
