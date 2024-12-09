import React from "react";
import Image from "next/image";
import Link from "next/link";
import strength from "../../../../../../assets/images/strength.png";
import endurance from "../../../../../../assets/images/endurance.png";
import cardio from "../../../../../../assets/images/cardio.png";
import lower from "../../../../../../assets/images/lower.png";
import shoulder from "../../../../../../assets/images/shoulder.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

  const plans = [
    {
      id: "upper-strength",
      title: "Upper Body - Strength",
      description: "Upper Body",
      difficulty: "Difficult",
      goal: "Weight Loss",
      duration: "6 Months, 5 weeks per day",
      image: strength,
      exercises: [
        { name: "Pull Up", video: "/videos/pull-up.mp4" },
        { name: "Lat Pulldowns", video: "/videos/lat-pulldowns.mp4" },
        { name: "Shoulder Press", video: "/videos/shoulder-press.mp4" },
        { name: "Bench Press", video: "/videos/bench-press.mp4" },
      ],
      schedule: {
        month1: {
          week1: ["Day 1", "Day 2"],
          week2: ["Day 3", "Day 4"],
          week3: ["Day 5", "Day 6"],
        },
      },
    },
    {
      id: "lower-strength",
      title: "Lower Body - Strength",
      description: "Lower Body",
      difficulty: "Easy",
      goal: "Muscle Gain",
      duration: "3 Months, 3 weeks per day",
      image: lower,
      exercises: [
        { name: "Squats", video: "/videos/squats.mp4" },
        { name: "Deadlifts", video: "/videos/deadlifts.mp4" },
      ],
      schedule: {
        month1: {
          week1: ["Day 1", "Day 2"],
          week2: ["Day 3", "Day 4"],
        },
      },
    },
    {
      id: "full-body-beginner",
      title: "Full Body Beginner",
      description: "Full Body",
      difficulty: "Beginner",
      goal: "Overall Fitness",
      duration: "1 Month, 3 days per week",
      image: endurance,
      exercises: [
        { name: "Push-Ups", video: "/videos/push-ups.mp4" },
        { name: "Bodyweight Squats", video: "/videos/bodyweight-squats.mp4" },
        { name: "Plank", video: "/videos/plank.mp4" },
      ],
      schedule: {
        month1: {
          week1: ["Day 1", "Day 3", "Day 5"],
          week2: ["Day 2", "Day 4", "Day 6"],
        },
      },
    },
    {
      id: "cardio-endurance",
      title: "Cardio Endurance",
      description: "Cardio-Focused",
      difficulty: "Intermediate",
      goal: "Endurance Building",
      duration: "4 Months, 5 days per week",
      image: cardio,
      exercises: [
        { name: "Running", video: "/videos/running.mp4" },
        { name: "Cycling", video: "/videos/cycling.mp4" },
        { name: "Jump Rope", video: "/videos/jump-rope.mp4" },
      ],
      schedule: {
        month1: {
          week1: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
          week2: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
        },
      },
    },
    {
      id: "yoga-flexibility",
      title: "Yoga for Flexibility",
      description: "Yoga and Mobility",
      difficulty: "All Levels",
      goal: "Flexibility and Relaxation",
      duration: "2 Months, 4 days per week",
      image: endurance,
      exercises: [
        { name: "Downward Dog", video: "/videos/downward-dog.mp4" },
        { name: "Cat-Cow Stretch", video: "/videos/cat-cow.mp4" },
        { name: "Child's Pose", video: "/videos/child-pose.mp4" },
      ],
      schedule: {
        month1: {
          week1: ["Day 1", "Day 3", "Day 5", "Day 7"],
          week2: ["Day 2", "Day 4", "Day 6", "Day 8"],
        },
      },
    },
    {
      id: "hiit-fat-loss",
      title: "HIIT for Fat Loss",
      description: "High-Intensity Interval Training",
      difficulty: "Advanced",
      goal: "Fat Loss",
      duration: "3 Months, 4 days per week",
      image: endurance,
      exercises: [
        { name: "Burpees", video: "/videos/burpees.mp4" },
        { name: "Mountain Climbers", video: "/videos/mountain-climbers.mp4" },
        { name: "Jump Squats", video: "/videos/jump-squats.mp4" },
      ],
      schedule: {
        month1: {
          week1: ["Day 1", "Day 3", "Day 5", "Day 7"],
          week2: ["Day 2", "Day 4", "Day 6", "Day 8"],
        },
      },
    },
  ];
  


const WorkoutPage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <main className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#252525] rounded-lg">
        {plans.map((plan) => (
          <Link href={`/en/user/plan/workout-plan/${plan.id}`} key={plan.id}>
            <div className="bg-black p-4 rounded-lg shadow-lg flex flex-row space-y-2">
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-sm font-semibold">{plan.title}</h2>
                  <p className="text-xs font-extralight">{plan.description}</p>
                  <p className="text-xs font-extralight">
                    <span className="font-semibold"></span> {plan.difficulty}
                  </p>
                  <p className="text-sm font-extralight">
                    <span className="font-semibold"></span> {plan.goal}
                  </p>
                </div>
                <p className="text-xs flex items-center gap-2 font-extralight">
                  <FontAwesomeIcon icon={faClock} className="text-customBlue" />
                  {plan.duration}
                </p>
              </div>
              <Image
                src={plan.image}
                alt={plan.title}
                className="w-60 h-40 object-contain rounded-lg"
              />
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default WorkoutPage;
