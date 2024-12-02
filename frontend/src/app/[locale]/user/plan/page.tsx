import React from "react";
import Image from "next/image";
import strength from "../../../../../assets/images/strength.png";
import endurance from "../../../../../assets/images/endurance.png";
import cardio from "../../../../../assets/images/cardio.png";
import lower from "../../../../../assets/images/lower.png";
import shoulder from "../../../../../assets/images/shoulder.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const plans = [
  {
    title: "Upper Body - Strength",
    description: "Upper Body",
    difficulty: "Difficult",
    goal: "Weight Loss",
    duration: "6 Months, 5 weeks per day",
    image: strength,
  },
  {
    title: "Lower Body - Strength",
    description: "Upper Body",
    difficulty: "Easy",
    goal: "Weight Loss",
    duration: "3 Months, 3 weeks per day",
    image: lower,
  },
  {
    title: "Cardio",
    description: "Upper Body",
    difficulty: "Medium",
    goal: "Weight Loss",
    duration: "1 Month, 4 weeks per day",
    image: cardio,
  },
  {
    title: "Upper Body - Endurance",
    description: "Upper Body",
    difficulty: "Easy",
    goal: "Weight Loss",
    duration: "3 Months, 3 weeks per day",
    image: endurance,
  },
  {
    title: "Shoulder and Chest",
    description: "Upper Body",
    difficulty: "Difficult",
    goal: "Weight Loss",
    duration: "3 Months, 3 weeks per day",
    image: shoulder,
  },
  {
    title: "Lower Body - Endurance",
    description: "Upper Body",
    difficulty: "Easy",
    goal: "Weight Loss",
    duration: "6 Months, 3 weeks per day",
    image: endurance,
  },
];

const Page: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navigation */}
      <nav className="flex gap-4 p-4">
        <button className="text-base text-light px-5 py-1 bg-customBlue rounded-full">Workout Plan</button>
        <button className="text-base text-light px-5 py-1 bg-[#252525] rounded-full">Meal Plan</button>
        <button className="text-base text-light px-5 py-1 bg-[#252525] rounded-full">Exercise List</button>
        <button className="text-base text-light px-5 py-1 bg-[#252525] rounded-full">Meal List</button>
      </nav>

      {/* Card */}
      <main className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#252525] rounded-lg">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-black p-4 rounded-lg shadow-lg flex flex-col  space-y-2"
          >
            <Image
              src={plan.image}
              alt={plan.title}
              className="w-60 justify-end  h-40 object-cover rounded-lg"
            />
            <h2 className="text-lg font-semibold">{plan.title}</h2>
            <p className="text-sm">{plan.description}</p>
            <p className="text-sm">
              <span className="font-semibold"></span> {plan.difficulty}
            </p>
            <p className="text-sm">
              <span className="font-semibold"></span> {plan.goal}
            </p>
            <p className="text-sm flex items-center gap-2">
              <FontAwesomeIcon icon={faClock} className="text-customBlue" />
              {plan.duration}
            </p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Page;
