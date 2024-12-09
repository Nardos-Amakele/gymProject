'use client'

import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPlay } from "@fortawesome/free-solid-svg-icons";
import videoThumbnail from "../../../../../../../assets/images/video.png";
import strength from "../../../../../../../assets/images/strength.png";
import endurance from "../../../../../../../assets/images/endurance.png";
import cardio from "../../../../../../../assets/images/cardio.png";
import lower from "../../../../../../../assets/images/lower.png";
import shoulder from "../../../../../../../assets/images/shoulder.png";
import { useParams } from "next/navigation";
import LoadingPage from "../../../loading";

type Schedule = {
    [month: string]: {
      [week: string]: string[];  
    };
  };
  
  type Plan = {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    goal: string;
    duration: string;
    image: string;  
    exercises: { name: string; video: string }[];
    schedule: Schedule;  
  };
  
  
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
  

  const WorkoutPlanDetail: React.FC = () => {
    const { workoutPlanId } = useParams();
    const plan = plans.find((p) => p.id === workoutPlanId);
  
    if (!plan) return <LoadingPage />;
  
    
    return (
      <div className="flex flex-col p-3">
        {/* Header */}
        <div className="bg-[#151515] p-4 rounded-lg shadow-lg flex flex-row justify-between text-white space-y-2">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold">{plan.title}</h2>
              <p className="text-xs font-extralight pt-2">{plan.description}</p>
              <p className="text-xs font-extralight">{plan.difficulty}</p>
              <p className="text-xs font-extralight">{plan.goal}</p>
            </div>
            <div className="flex items-center space-x-2 mt-auto">
              <FontAwesomeIcon icon={faClock} className="text-customBlue" />
              <span className="text-sm font-extralight">{plan.duration}</span>
            </div>
          </div>
          <Image
            src={plan.image}
            alt={plan.title}
            className="w-60 h-40 object-contain rounded-lg"
          />
        </div>
  
        {/* Content */}
        <div className="bg-[#151515] p-4 rounded-lg shadow-lg text-white mt-4 flex flex-row space-x-4">
          {/* Sidebar */}
          <div className="bg-[#1C1C1C] p-3 rounded-lg">
            <h3 className="text-sm font-semibold mb-4">Schedule</h3>
            <ul className="text-xs space-y-2">
              {Object.entries(plan.schedule).map(([month, weeks]) => (
                <li key={month} className="cursor-pointer hover:bg-[#333333] p-2 rounded-md">
                  {month}
                  <ul className="pl-4 mt-2">
                    {Object.entries(weeks).map(([week, days]) => (
                      <li key={week} className="cursor-pointer hover:bg-[#444444] p-2 rounded-md">
                        {week}
                        <ul className="pl-4 mt-2">
                          {Array.isArray(days) &&
                            days.map((day) => (
                              <li
                                key={day}
                                className="cursor-pointer hover:bg-[#555555] p-2 rounded-md"
                              >
                                {day}
                              </li>
                            ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
  
          {/* Exercises */}
          <div className="w-1/3 flex flex-col space-y-3">
            <h3 className="text-sm font-semibold">Exercises</h3>
            {plan.exercises.map((exercise) => (
              <button
                key={exercise.name}
                className="flex justify-between items-center bg-[#1C1C1C] p-3 rounded-lg hover:bg-[#333333]"
              >
                <span className="text-sm">{exercise.name}</span>
                <FontAwesomeIcon icon={faPlay} className="text-customBlue" />
              </button>
            ))}
          </div>
  
          {/* Video Preview */}
          <div className="w-1/2 bg-[#1C1C1C] p-3 rounded-lg relative">
            <Image
              src={videoThumbnail}
              alt="Exercise Video"
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute inset-0 flex justify-center items-center">
              <FontAwesomeIcon
                icon={faPlay}
                className="text-customBlue text-2xl bg-white rounded-full p-2"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default WorkoutPlanDetail;
  