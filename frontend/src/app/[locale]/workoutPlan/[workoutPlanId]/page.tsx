"use client";
import { WorkoutPlanType } from "../page";
import React, { useEffect, useState } from "react";

interface Exercise {
  id: string;
  slug: string;
  name: string;
  description: string;
  reps: number;
  sets: number;
  duration: number;
  videoUrl: string;
  focusArea: string;
}

export default function WorkoutPlan({ params }: { params: { locale: string; workoutPlanId: string } }) {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [plan, setPlan] = useState<WorkoutPlanType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);

  console.log(params);

  const getWorkoutPlan = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:5000/api/workouts/${id}`, { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`Failed to fetch workout plan: ${res.statusText}`);
      }
      const data = await res.json();
      const plan: WorkoutPlanType = data.data.workout;
      setPlan(plan);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWorkoutPlan(params.workoutPlanId);
  }, [params.workoutPlanId]);

  if (isLoading) {
    return (
      <div className="text-white bg-zinc-900 p-10 rounded-lg m-20">
        <div className="text-4xl font-bold">Loading Workout Plan...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white bg-zinc-900 p-10 rounded-lg m-20">
        <div className="text-4xl font-bold text-red-500">Error</div>
        <div className="text-md">{error}</div>
        <div className="mt-5">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => getWorkoutPlan(params.workoutPlanId)}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="text-white bg-zinc-900 p-10 rounded-lg m-20">
        <div className="text-4xl font-bold">Workout Plan Not Found</div>
      </div>
    );
  }

  return (
    <div className="text-white bg-zinc-900 p-10 rounded-lg m-20">
      <div className="text-4xl font-bold">{plan.name}</div>
      <div className="text-md">{plan.difficulty}</div>
      <div className="text-md">{plan.mainGoal}</div>
      <div className="text-md">{plan.workoutType}</div>
      <div className="flex gap-x-5">
        <div className="text-md font mt-10">{plan.duration} weeks,</div>
        <div className="text-md font mt-10">{plan.daysPerWeek} days per week</div>
      </div>
      <div className="flex">
        <div>
          {Array.from({ length: Math.ceil(plan.duration / 4) }).map((_, monthIndex) => (
            <div className="py-5 text-lg" key={monthIndex}>
              Month {monthIndex + 1}
              {Array.from({ length: 4 }).map((_, weekIndex) => (
                <div className="px-10 py-3 text-md" key={weekIndex}>
                  Week {weekIndex + 1}
                  {Array.from({ length: plan.daysPerWeek }).map((_, dayIndex) => (
                    <div className="px-10 py-0.5 flex gap-x-5 text-sm" key={dayIndex}>
                      <div>Day {dayIndex + 1}:</div>
                      <div>
                        <button
                          onClick={() => {
                            const selectedExercise =
                              plan.exercises[
                              (monthIndex * 4 * plan.daysPerWeek + weekIndex * plan.daysPerWeek + dayIndex) %
                              plan.exercises.length
                                ];
                            setSelectedExerciseId(selectedExercise.id);
                            setExercise(selectedExercise);
                          }}
                        >
                          <div
                            className={
                              selectedExerciseId ===
                              plan.exercises[
                              (monthIndex * 4 * plan.daysPerWeek + weekIndex * plan.daysPerWeek + dayIndex) %
                              plan.exercises.length
                                ].id
                                ? "text-green-500"
                                : ""
                            }
                          >
                            {
                              plan.exercises[
                              (monthIndex * 4 * plan.daysPerWeek + weekIndex * plan.daysPerWeek + dayIndex) %
                              plan.exercises.length
                                ].name
                            }
                          </div>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div>
          <div className="text-3xl font-bold">Selected Exercise</div>
          {exercise ? (
            <>
              <div className="text-xl">{exercise.name}</div>
              <div className="text-md">{exercise.description}</div>
            </>
          ) : (
            <div className="text-md">No exercise selected</div>
          )}
        </div>
      </div>
    </div>
  );
}
