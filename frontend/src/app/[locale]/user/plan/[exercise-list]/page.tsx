import { useState } from "react";

const exercises = [
  { name: "Arm Circles", category: "Shoulder, Upper Back" },
  { name: "Burpees", category: "Upper Body, Core" },
  { name: "Crunches", category: "ABS" },
  { name: "Deadlifts", category: "Back, Glute, Hamstring, Biceps" },
  { name: "Elbow Plank", category: "Core" },
  { name: "Frog Jumps", category: "Quad, Hamstring, Glute, Calve" },
  { name: "High Knees", category: "Lower Body" },
  { name: "Lunges", category: "Quad, Hamstring, Glute, Calve" },
];

const ExerciseList = () => {
  const [selectedExercise, setSelectedExercise] = useState("Elbow Plank");

  return (
    <div className="flex flex-col md:flex-row h-screen  text-white rounded-3xl">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 p-4 bg-[#1e1e1e] ">
        {/* Filter Buttons */}
        <nav className="bg-[#2a2a2a] p-2 rounded-full flex flex-wrap justify-center md:justify-start gap-2 mb-4">
          <button className="px-5 py-1 text-sm rounded-full bg-customBlue">
            All
          </button>
          <button className="px-5 py-1 text-sm rounded-full bg-gray-700">
            Upper Body
          </button>
          <button className="px-5 py-1 text-sm rounded-full bg-gray-700">
            Lower Body
          </button>
        </nav>

        {/* Exercise List */}
        <ul className="space-y-2">
          {exercises.map((exercise) => (
            <li
              key={exercise.name}
              onClick={() => setSelectedExercise(exercise.name)}
              className={`flex items-center justify-between p-3 rounded cursor-pointer ${
                selectedExercise === exercise.name
                  ? "bg-blue-500"
                  : "bg-gray-700"
              }`}
            >
              <div>
                <h3 className="text-lg font-semibold">{exercise.name}</h3>
                <p className="text-sm text-gray-300">{exercise.category}</p>
              </div>
              <button className="text-white">▶</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Video Preview */}
      <div className="flex-1 flex items-center justify-center bg-gray-900 p-4">
        <div className="w-full md:w-2/3 h-60 md:h-2/3 bg-black rounded-lg relative">
          {/* Video Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-xl md:text-2xl font-bold">{selectedExercise}</h2>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-10 bg-gray-800 flex items-center justify-between px-4">
            <p className="text-sm text-gray-300">0:00</p>
            <p className="text-sm text-gray-300">2:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseList;
