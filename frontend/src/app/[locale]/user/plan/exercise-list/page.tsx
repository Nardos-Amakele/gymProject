import { useState } from "react";

const exercises = [
  { name: "Arm Circles", category: "Shoulder, Upper Back" },
  { name: "Burpees", category: "Upper Body, Core" },
  { name: "Crunches", category: "ABS" },
  { name: "Deadlifts", category: "Upper" },
  { name: "Elbow Plank", category: "Upper" },
  { name: "Frog Jumps", category: "Quad, Hamstring, Glute, Calve" },
  { name: "High Knees", category: "Lower Body" },
  { name: "Lunges", category: "Quad, Hamstring, Glute, Calve" },
];

const ExerciseList = () => {
  const [selectedMeal, setSelectedMeal] = useState("Oatmeal");
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState("Elbow Plank");
  const [filter, setFilter] = useState("All");

  const filteredExercises =
    filter === "All"
      ? exercises
      : exercises.filter((exercise) =>
          filter === "Upper Body"
            ? exercise.category.toLowerCase().includes("upper")
            : filter === "Lower Body"
            ? exercise.category.toLowerCase().includes("lower")
            : false
        );

  const handleExcerciseClick = (exerciseName: string) => {
    setSelectedExercise(exerciseName);
    setShowModal(true);
  }

  return (
    <div className="flex flex-col md:flex-row h-screen text-white rounded-3xl">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 p-4 bg-[#1e1e1e]">
        {/* Filter Buttons */}
        <nav className="bg-[#2a2a2a] p-2 rounded-full flex flex-wrap lg:flex-nowrap justify-center md:justify-start gap-2 mb-4">
          {["All", "Upper Body", "Lower Body"].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-5 py-1 text-xs rounded-full ${
                filter === category ? "bg-customBlue" : "bg-[#1e1e1e] hover:bg-[#555555]"
              }`}
            >
              {category}
            </button>
          ))}
        </nav>

        {/* Exercise List */}
        <ul className="space-y-2">
          {filteredExercises.map((exercise) => (
            <li
              key={exercise.name}
              onClick={() => handleExcerciseClick(exercise.name)}
              className={`flex items-center justify-between p-3 cursor-pointer rounded-full ${
                selectedExercise === exercise.name
                  ? "bg-customBlue"
                  : "bg-[#2a2a2a] hover:bg-[#333333]"
              }`}
            >
              <div className="flex items-baseline gap-2">
                <h3 className="text-sm">{exercise.name}</h3>
                <p className="text-xs text-gray-300 font-extralight">
                  {exercise.category}
                </p>
              </div>
              <button
                className={`${
                  selectedExercise === exercise.name
                    ? "text-white"
                    : "text-customBlue"
                }`}
              >
                ▶
              </button>
            </li>
          ))}
        </ul>
      </div>
            {/* Modal for Small Screens */}
            {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 md:hidden">
          <div className="bg-[#1e1e1e] p-4 rounded-lg text-center w-11/12 max-w-md">
            <button
              className="absolute top-2 right-4 text-gray-300 hover:text-white"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <div className="w-full md:w-2/3 h-60 md:h-2/3 bg-black rounded-lg relative">
          {/* Video Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-xl md:text-2xl font-bold">{selectedExercise}</h2>
          </div>
        </div>
          </div>
        </div>
      )}


      {/* Video Preview */}
      <div className="hidden flex-1 md:flex items-center justify-center bg-[#1e1e1e] p-1">
        <div className="w-full md:w-2/3 h-60 md:h-2/3 bg-black rounded-lg relative">
          {/* Video Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-xl md:text-2xl font-bold">{selectedExercise}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseList;
