import { useState } from "react";
import macaroni from '../../../../../../assets/images/macaroni.png';
import Image from "next/image";

const meals = [
  { name: "Oatmeal", category: "Breakfast", ingredients: ["oats", "milk", "honey"], calories: 300 },
  { name: "Chicken Salad", category: "Lunch", ingredients: ["chicken", "lettuce", "tomato"], calories: 450 },
  { name: "Salmon with Quinoa", category: "Dinner", ingredients: ["salmon", "quinoa", "vegetables"], calories: 500 },
  { name: "Avocado Toast", category: "Breakfast", ingredients: ["avocado", "bread", "salt"], calories: 350 },
  { name: "Vegetable Stir-Fry", category: "Lunch", ingredients: ["vegetables", "soy sauce", "rice"], calories: 400 },
  { name: "Grilled Steak", category: "Dinner", ingredients: ["steak", "potatoes", "asparagus"], calories: 600 },
  { name: "Smoothie Bowl", category: "Breakfast", ingredients: ["banana", "berries", "yogurt"], calories: 250 },
  { name: "Greek Salad", category: "Lunch", ingredients: ["lettuce", "cucumber", "feta cheese"], calories: 350 },
];

const MealList = () => {
  const [selectedMeal, setSelectedMeal] = useState("Oatmeal");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const filteredmeals =
    filter === "All"
      ? meals
      : meals.filter((meal) =>
          filter === "Breakfast"
            ? meal.category.toLowerCase().includes("breakfast")
            : filter === "Lunch"
            ? meal.category.toLowerCase().includes("lunch")
            : filter === "Dinner"
            ? meal.category.toLowerCase().includes("dinner")
            : false
        );

  const handleMealClick = (mealName: string) => {
    setSelectedMeal(mealName);
    setShowModal(true); // Open modal on smaller screens
  };

  return (
    <div className="flex flex-col md:flex-row h-screen text-white rounded-3xl">
      {/* Sidebar */}
      <div className="w-full md:w-1/2 p-4 bg-[#1e1e1e]">
        <nav className="bg-[#2a2a2a] p-2 rounded-full flex flex-wrap lg:flex-nowrap justify-center gap-4 mb-4">
          {["All", "Breakfast", "Lunch", "Dinner"].map((category) => (
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

        {/* Meal List */}
        <ul className="space-y-2">
          {filteredmeals.map((meal) => (
            <li
              key={meal.name}
              onClick={() => handleMealClick(meal.name)}
              className={`flex items-center justify-between p-3 cursor-pointer rounded-full px-4 ${
                selectedMeal === meal.name
                  ? "bg-customBlue"
                  : "bg-[#2a2a2a] hover:bg-[#333333]"
              }`}
            >
              <div className="flex items-baseline gap-2">
                <h3 className="text-sm">{meal.name}</h3>
                <p className="text-xs text-gray-300 font-extralight">
                  {meal.ingredients.join(", ")}
                </p>
              </div>
              <button className="text-white text-lg font-bold">
                {meal.calories} <span className="text-xs font-extralight">Kcal</span>
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
            <Image src={macaroni} alt="{macaroni}" className="w-full rounded-md mb-4" />
            <h2 className="text-xl font-bold mb-2">{selectedMeal}</h2>
            <p className="text-xs text-gray-300 font-extralight">
              {meals.find((meal) => meal.name === selectedMeal)?.ingredients.join(", ")}
            </p>
          </div>
        </div>
      )}

      {/* Image Preview for Larger Screens */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-[#1e1e1e] p-1">
        <div className="w-full md:w-2/3 h-60 md:h-2/3 rounded-lg relative flex flex-col gap-2">
          <Image src={macaroni} alt="{macaroni}" className="w-full rounded-md" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl font-bold">{selectedMeal}</h2>
            <p className="text-xs text-gray-300 font-extralight">
              {meals.find((meal) => meal.name === selectedMeal)?.ingredients.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealList;
