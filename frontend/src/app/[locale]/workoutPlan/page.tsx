import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

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
  const plans = await getWorkoutPlans();
  return (
    <>
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
            <Link key={index}  href={`workoutPlan/${plan.id}`}>
              <div className="bg-black p-4 rounded-lg shadow-lg flex flex-row  space-y-2"
              >
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-sm font-semibold">{plan.name}</h2>
                    <p className="text-xs font-extralight">{plan.workoutType}</p>
                    <p className="text-xs font-extralight">
                      <span className="font-semibold"></span> {plan.difficulty}
                    </p>
                    <p className="text-sm font-extralight">
                      <span className="font-semibold"></span> {plan.mainGoal}
                    </p>
                  </div>

                  <p className="text-xs flex items-center gap-2 font-extralight">
                    <FontAwesomeIcon icon={faClock} className="text-customBlue"/>
                    {plan.duration}
                  </p>


                </div>
                {/*<Image*/}
                {/*  src={plan.slug}*/}
                {/*  alt={plan.name}*/}
                {/*  className="w-60 justify-end  h-40 object-contain rounded-lg"*/}
                {/*/>*/}

              </div>

            </Link>

          ))}
        </main>
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

