import React from "react";
import Link from "next/link";

export interface WorkoutPlanType{
  id: string;
  name: string;
  slug: string;
  difficulty: string;
  mainGoal: string;
  workoutType: string;
  duration: number;
  daysPerWeek: number;
  timePerWorkout:number;
  targetGender: string;
  exercises :{
    id: string;
    slug: string;
    name: string;
    description: string;
    reps: number;
    sets: number;
    duration: number;
    videoUrl: string;
    focusArea:string;
  }[]
}

export async function getWorkoutPlans () {
  const res = await fetch("http://localhost:5000/api/workouts", {cache:"no-store"});
  const data  = await res.json();
  const workoutPlans: WorkoutPlanType[] = data.data.workouts;
  return workoutPlans
}

export default async function WorkoutPlanPage() {
  const workoutPlans = await getWorkoutPlans();
  return (
    <>
      <div className="text-white text-center">
        <div className="text-8xl"> Workout Plan Page</div>
      {workoutPlans.map((workoutPlan, index) => (
        <div key={index}>
          <Link href={`workoutPlan/${workoutPlan.id}`}>
          <div className="text-4xl">{workoutPlan.name}</div>
          </Link>
        </div>
      ))}
      </div>
    </>
  )
}

// const fetchWorkouts = async () => {
//   try{
//     const response = await axios.get("http://localhost:5000/api/workouts");
//     const workoutPlans = response.data.data;
//     workoutPlans.forEach((workoutPlan:WorkoutPlanType) => {
//       const
//     })
//   } catch (error) {
//     console.error("Error fetching workout plans:", error)
//   }
// }