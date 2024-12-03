import {WorkoutPlanType} from "../page";
import React from "react";

export async function getWorkoutPlan (id:string) {
  const res = await fetch(`http://localhost:5000/api/workouts/${id}`, {cache:"no-store"});
  const data  = await res.json();
  console.log(res)
  // console.log(data)
  const workoutPlan: WorkoutPlanType = data.data.workout;
  return workoutPlan
}


export default async function workoutPlan({ params }: { params: { locale:string, workoutPlanId: string } }) {
  console.log(params)
  const plan  = await getWorkoutPlan(params.workoutPlanId);

  if (!plan) {
    throw new Error("Couldn't find plan");
  }
  return (
    <>
      <div className="text-white">
        <div className="text-4xl">{plan.name}</div>
      <div className="text-4xl">{plan.slug}</div>
      <div className="text-4xl">{plan.difficulty}</div>
      <div className="text-4xl">{plan.mainGoal}</div>
      <div className="text-4xl">{plan.workoutType}</div>
      <div className="text-4xl">{plan.duration}</div>
      {plan.exercises.map((exercise, index) =>(
        <div key={index}>
          <div className="">{exercise.name}</div>
          <div className="">{exercise.id}</div>
          <div className="">{exercise.reps}</div>
          <div className="">{exercise.description}</div>
        </div>
      ))}
      </div>
    </>
  )
}