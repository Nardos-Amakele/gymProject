"use client";
import React, {useEffect, useRef, useState} from "react";

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

interface WorkoutPlanType {
  id: string;
  name: string;
  difficulty: string;
  mainGoal: string;
  workoutType: string;
  duration: number;
  daysPerWeek: number;
  exercises: Exercise[];
}

export default function WorkoutPlan({params}: { params: { locale: string; workoutPlanId: string } }) {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [plan, setPlan] = useState<WorkoutPlanType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const [isYouTubeLoaderReady, setYouTubeLoaderReady] = useState(false);

//   const updateUser = async(id:string){
// return
//   }

  const getWorkoutPlan = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:5000/api/workouts/${id}`, {cache: "no-store"});
      if (!res.ok) {
        throw new Error(`Failed to fetch workout plan: ${res.statusText}`);
      }
      const data = await res.json();
      setPlan(data.data.workout);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // @ts-ignore
    if (!window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);

      (window as any).onYouTubeIframeAPIReady = () => {
        setYouTubeLoaderReady(true);
      };
    } else {
      setYouTubeLoaderReady(true);
    }
  }, []);

  useEffect(() => {
    getWorkoutPlan(params.workoutPlanId);
  }, [params.workoutPlanId]);

  const handlePlayVideo = () => {
    // @ts-ignore
    if (isYouTubeLoaderReady && window.YT && videoRef.current && exercise?.videoUrl) {
      // @ts-ignore
      new window.YT.Player(videoRef.current, {
        videoId: exercise.videoUrl.split("v=")[1],
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
          },
        },
      });
    }
  };

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
      <div className="flex justify-around">
        <div className="text-4xl font-bold">{plan.name}</div>
        <button onClick={() => {}} className="bg-blue-500 px-3 rounded-lg">select Plan</button>
      </div>
      <div className="text-md">{plan.difficulty}</div>
      <div className="text-md">{plan.mainGoal}</div>
      <div className="text-md">{plan.workoutType}</div>
      <div className="flex gap-x-5">
        <div className="text-md font mt-10">{plan.duration} weeks</div>
        <div className="text-md font mt-10">{plan.daysPerWeek} days per week</div>
      </div>
      <div className="flex">
        <div>
          {Array.from({length: Math.ceil(plan.duration / 4)}).map((_, monthIndex) => (
            <div className="py-5 text-lg" key={monthIndex}>
              Month {monthIndex + 1}
              {Array.from({length: 4}).map((_, weekIndex) => (
                <div className="px-10 py-3 text-md" key={weekIndex}>
                  Week {weekIndex + 1}
                  {Array.from({length: plan.daysPerWeek}).map((_, dayIndex) => {
                    const currentExercise =
                      plan.exercises[
                      (monthIndex * 4 * plan.daysPerWeek + weekIndex * plan.daysPerWeek + dayIndex) %
                      plan.exercises.length
                        ];
                    return (
                      <div className="px-10 py-0.5 flex gap-x-5 text-sm" key={dayIndex}>
                        <div>Day {dayIndex + 1}:</div>
                        <button
                          onClick={() => {
                            setSelectedExerciseId(currentExercise.id);
                            setExercise(currentExercise);
                          }}
                        >
                          <div className={selectedExerciseId === currentExercise.id ? "text-green-500" : ""}>
                            {currentExercise.name}
                          </div>
                        </button>
                      </div>
                    );
                  })}
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
              <button
                onClick={handlePlayVideo}
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Play Video
              </button>
              <div ref={videoRef} style={{marginTop: "20px"}}/>
            </>
          ) : (
            <div className="text-md">No exercise selected</div>
          )}
        </div>
      </div>
    </div>
  );
}
