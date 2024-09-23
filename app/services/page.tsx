'use client';

import React, { useState, useRef } from 'react';
import ServiceCard from './ServicesCards';
import servicesHero from '../../assets/images/services_hero.jpg';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Page = () => {
  const [activeTab, setActiveTab] = useState('Body Building');
  const nextSectionRef = useRef<HTMLDivElement | null>(null);

  const tabs = ['Body Building', 'Exercise', 'Group Fitness', 'Personal Training'];
  const descriptions: Record<string, string> = {
    'Body Building': 'Achieve your fitness goals with our dedicated bodybuilding packages.',
    'Exercise': 'Stay fit and energized with various exercise options for all levels.',
    'Group Fitness': 'Join our group fitness classes for a fun and dynamic workout experience.',
    'Personal Training': 'Get personalized attention with our 1-on-1 coaching and tailored plans.',
  };

  // Scroll to next section function
  const scrollToNextSection = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderCards = () => {
    switch (activeTab) {
      case 'Body Building':
        return (
          <>
          
            <ServiceCard
              title="Monthly"
              price="1,100 Birr"
              benefits={[
                'Unlimited gym access with personalized bodybuilding coaching.',
                'Includes two 1:1 coaching sessions per week.',
                'Free access to one special bodybuilding event each month.',
              ]}
            />
            <ServiceCard
              title="6 Months"
              price="6,000 Birr"
              benefits={[
                'Half-year access to gym facilities, including all bodybuilding equipment.',
                'Free nutritional tracking and monthly assessments.',
                'Discount on fitness and wellness workshops.',
              ]}
            />
            <ServiceCard
              title="3 Months"
              price="3,100 Birr"
              benefits={[
                'Access for three months with regular progress check-ins and assessments.',
                'Includes access to nutritional workshops and meal plans.',
                'Monthly performance tracking and progress reports.',
              ]}
            />
            <ServiceCard
              isPremium={true}
              title="Yearly"
              price="11,500 Birr"
              benefits={[
                'Full year of access to all bodybuilding equipment and classes.',
                'Priority booking for 1:1 coaching and diet consultations.',
                'Exclusive discounts on supplements and apparel.',
              ]}
            />
          </>
        );
      case 'Exercise':
        return (
          <>
            <ServiceCard
              title="20 Days (With Coupon)"
              price="1,000 Birr"
              benefits={[
                '20 days of gym and class access with optional fitness tracking.',
                'Eligible for a discount on future memberships.',
                'Access to one free group fitness class.',
              ]}
            />
            <ServiceCard
              title="Monthly"
              price="1,300 Birr"
              benefits={[
                'One-month access to gym and classes with weekly fitness assessments.',
                'Access to member-only fitness workshops and discounts on training packages.',
              ]}
            />
            <ServiceCard
              title="3 Months"
              price="3,600 Birr"
              benefits={[
                'Three months of access to all exercise equipment and classes.',
                'Weekly check-ins with a fitness coach and personalized workout plans.',
                'Free entry to one nutrition seminar.',
              ]}
            />
            <ServiceCard
              title="6 Months"
              price="7,200 Birr"
              benefits={[
                'Unlimited gym access with exclusive discounts on personal training services.',
                'Monthly goal assessments and free entry to selected fitness workshops.',
                'Includes optional nutritional guidance.',
              ]}
            />
            <ServiceCard
              isPremium={true}
              title="Yearly"
              price="14,000 Birr"
              benefits={[
                '12-month access to all exercise classes, equipment, and fitness consultations.',
                'Custom fitness programs and bi-weekly goal assessments.',
                'Access to members-only events and special sessions.',
              ]}
            />
          </>
        );
      case 'Group Fitness':
        return (
          <>
            <ServiceCard
              isPremium={true}
              title="Group Fitness Only"
              price="1,800 Birr"
              benefits={[
                'Access to all group fitness classes, including yoga, Zumba, and pilates.',
                'Discounts on fitness gear and supplements.',
                'Weekly fitness tracking and optional dietary consultations.',
              ]}
            />
            <ServiceCard
              title="Group Fitness + Exercise"
              price="1,200 Birr"
              benefits={[
                'Full access to group fitness classes and exercise equipment.',
                'Weekly coaching and nutrition tracking.',
                'Includes two special events per month.',
              ]}
            />
          </>
        );
      case 'Personal Training':
        return (
          <>
            <ServiceCard
              title="1-on-1 Coaching"
              price="2,000 Birr / session"
              benefits={[
                'Includes post-session progress analysis and fitness tracking.',
                'Custom workout plans and nutrition advice.',
              ]}
            />
            <ServiceCard
              isPremium={true}
              title="Monthly Personal Training Package"
              price="7,500 Birr / month"
              benefits={[
                'Customized workout and nutrition plan tailored to your goals.',
                'Access to all fitness classes and gym equipment.',
              ]}
            />
          </>
        );
      default:
        return null;
    }
  };

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
        {/* Upward Arrow */}
        <div
          onClick={scrollToNextSection}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 border border-white rounded-full p-4 cursor-pointer text-white"
        >
          <FontAwesomeIcon icon={faArrowUp} className='text-2xl' />
        </div>
      </div>

      {/* Tab Section */}
      <div ref={nextSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800 rounded-2xl w-fit flex justify-center p-2 mx-auto space-x-4 mb-16 border-solid border">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-bold ${
                activeTab === tab
                  ? 'text-[#2596BE] bg-gray-700 ' 
                  : 'text-gray-400 bg-gray-800'
              } hover:bg-gray-600`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Description */}
        <p className="text-center text-gray-400 mt-4">{descriptions[activeTab]}</p>

        {/* Cards Section */}
        <div className="flex flex-wrap gap-6 justify-center mt-8">
          {renderCards()}
        </div>
      </div>
    </div>
  );
};

export default Page;
