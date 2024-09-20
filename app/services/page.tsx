import React from 'react';
import servicesHero from '../../assets/images/services_hero.jpg';

const page = () => {
  return (
    <div className="bg-black text-white space-y-6">
      {/* Hero Section */}
      <div
        className="relative w-full h-[80vh] bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `url(${servicesHero.src})`,
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-white">Services</h1>
        </div>
      </div>

     <section className='px-[9rem]  '>
         {/* Body Building Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#2596BE]">Body Building</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Pricing Card 1 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white">Monthly</h3>
              <p className="text-4xl font-bold text-[#2596BE]">1,100 Birr</p>
            </div>
            {/* Pricing Card 2 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white">Yearly</h3>
              <p className="text-4xl font-bold text-[#2596BE]">11,500 Birr</p>
            </div>
            {/* Pricing Card 3 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white">6 Months</h3>
              <p className="text-4xl font-bold text-[#2596BE]">6,000 Birr</p>
            </div>
            {/* Pricing Card 4 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white">3 Months</h3>
              <p className="text-4xl font-bold text-[#2596BE]">3,100 Birr</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exercise Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#2596BE]">Exercise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Pricing Card 1 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white">Yearly</h3>
              <p className="text-4xl font-bold text-[#2596BE]">14,000 Birr</p>
            </div>
            {/* Pricing Card 2 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white">6 Months</h3>
              <p className="text-4xl font-bold text-[#2596BE]">7,200 Birr</p>
            </div>
            {/* Pricing Card 3 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white">3 Months</h3>
              <p className="text-4xl font-bold text-[#2596BE]">3,600 Birr</p>
            </div>
            {/* Pricing Card 4 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white">20 Days (With Coupon)</h3>
              <p className="text-4xl font-bold text-[#2596BE]">1,000 Birr</p>
            </div>
            {/* Pricing Card 5 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white">Monthly</h3>
              <p className="text-4xl font-bold text-[#2596BE]">1,300 Birr</p>
            </div>
          </div>
        </div>
      </section>

      {/* Group Fitness Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#2596BE]">Group Fitness</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Pricing Card 1 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white">Group Fitness Only</h3>
              <p className="text-4xl font-bold text-[#2596BE]">1,800 Birr</p>
            </div>
            {/* Pricing Card 2 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white">Group Fitness + Exercise</h3>
              <p className="text-4xl font-bold text-[#2596BE]">1,200 Birr</p>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Training Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#2596BE]">Personal (Includes Diet + 1L Water)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Pricing Card 1 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white">20 Days</h3>
              <p className="text-4xl font-bold text-[#2596BE]">30,600 Birr</p>
            </div>
            {/* Pricing Card 2 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white">Monthly</h3>
              <p className="text-4xl font-bold text-[#2596BE]">39,000 Birr</p>
            </div>
          </div>
        </div>
      </section>
     </section>
    </div>
  );
};

export default page;
