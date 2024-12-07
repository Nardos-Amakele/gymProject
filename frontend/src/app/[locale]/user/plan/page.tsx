'use client'
import React, { useState } from 'react'
import WorkoutPlan from './[workout-plan]/page'
import MealPlan from './[meal-plan]/page' 
import ExerciseList from './[exercise-list]/page' 
import MealList from './[meal-list]/page' 

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
    <div>
      {/* Navigation */}
      <nav className="flex gap-4 p-4 text-white font-light">
        <button
          className={`text-base text-light px-5 py-1 rounded-full ${selectedTab === 'workout-plan' ? 'bg-customBlue' : 'bg-[#252525]'}`}
          onClick={() => setSelectedTab('workout-plan')}
        >
          Workout Plan
        </button>
        <button
          className={`text-base text-light px-5 py-1 rounded-full ${selectedTab === 'meal-plan' ? 'bg-customBlue' : 'bg-[#252525]'}`}
          onClick={() => setSelectedTab('meal-plan')}
        >
          Meal Plan
        </button>
        <button
          className={`text-base text-light px-5 py-1 rounded-full ${selectedTab === 'exercise-list' ? 'bg-customBlue' : 'bg-[#252525]'}`}
          onClick={() => setSelectedTab('exercise-list')}
        >
          Exercise List
        </button>
        <button
          className={`text-base text-light px-5 py-1 rounded-full ${selectedTab === 'meal-list' ? 'bg-customBlue' : 'bg-[#252525]'}`}
          onClick={() => setSelectedTab('meal-list')}
        >
          Meal List
        </button>
      </nav>

      {renderContent()}
    </div>
  );
};

export default Page;
