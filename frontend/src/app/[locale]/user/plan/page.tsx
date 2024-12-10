'use client'
import React, { useState } from 'react'
import WorkoutPlan from './workout-plan/page'
import MealPlan from './meal-plan/page' 
import ExerciseList from './exercise-list/page' 
import MealList from './meal-list/page' 

const Page = () => {
  const [selectedTab, setSelectedTab] = useState('workout-plan'); 

  const renderContent = () => {
    switch (selectedTab) {
      case 'workout-plan':
        return <WorkoutPlan />;
      case 'meal-plan':
        return <MealPlan />;
      case 'exercise-list':
        return <ExerciseList />;
      case 'meal-list':
        return <MealList />;
      default:
        return <WorkoutPlan />;
    }
  };

  return (
    <div className="min-h-screen text-white">
      {/* Navigation */}
      <nav className="flex flex-wrap justify-center md:justify-start gap-2 p-4">
        <button
          className={`text-sm font-light  md:text-sm px-4 py-2 rounded-full transition-colors ${
            selectedTab === 'workout-plan'
              ? 'bg-customBlue text-white'
              : 'bg-[#252525] hover:bg-[#333]'
          }`}
          onClick={() => setSelectedTab('workout-plan')}
        >
          Workout Plan
        </button>
        <button
          className={`text-sm font-light md:text-sm px-4 py-2 rounded-full transition-colors ${
            selectedTab === 'meal-plan'
              ? 'bg-customBlue text-white'
              : 'bg-[#252525] hover:bg-[#333]'
          }`}
          onClick={() => setSelectedTab('meal-plan')}
        >
          Meal Plan
        </button>
        <button
          className={`text-sm font-light md:text-sm px-4 py-2 rounded-full transition-colors ${
            selectedTab === 'exercise-list'
              ? 'bg-customBlue text-white'
              : 'bg-[#252525] hover:bg-[#333]'
          }`}
          onClick={() => setSelectedTab('exercise-list')}
        >
          Exercise List
        </button>
        <button
          className={`text-sm font-light md:text-sm px-4 py-2 rounded-full transition-colors ${
            selectedTab === 'meal-list'
              ? 'bg-customBlue text-white'
              : 'bg-[#252525] hover:bg-[#333]'
          }`}
          onClick={() => setSelectedTab('meal-list')}
        >
          Meal List
        </button>
      </nav>

      {/* Content */}
      <div className="p-4 md:p-8 mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Page;
