// pages/dashboard.tsx
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header Section */}
      <header className="bg-[#2596BE] p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl">
            Hello <span className="font-bold">Abebe</span>
          </h1>
          <p className="text-sm">
            You have already achieved <span className="font-bold">43%</span> of
            your Goal. Keep pushing!
          </p>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-bold">4</h2>
          <p className="text-sm">Working days left</p>
          <a
            href="#"
            className="text-blue-900 underline text-xs mt-1 block hover:text-blue-700"
          >
            Extend your subscription
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-12 gap-6 p-6">
        {/* Left Sidebar: Today's Plans */}
        <section className="col-span-4 bg-[#1e1e1e] p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-4">Today's Plans</h3>
          <div className="flex space-x-4 mb-4">
            <button className="bg-[#2596BE] px-4 py-2 rounded-full text-sm">
              All
            </button>
            <button className="px-4 py-2 rounded-full text-sm hover:bg-[#2b2b2b]">
              Exercise
            </button>
            <button className="px-4 py-2 rounded-full text-sm hover:bg-[#2b2b2b]">
              Meal
            </button>
          </div>
          <ul>
            {["Pull Up", "Lat Pulldowns", "Bent-Over Rows"].map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center py-3 px-4 mb-2 bg-[#292929] rounded-lg"
              >
                <span>{item}</span>
                <button className="text-[#2596BE]">▶</button>
              </li>
            ))}
          </ul>
        </section>

        {/* Center Section: Recommended Foods */}
        <section className="col-span-4 bg-[#1e1e1e] p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-4">Recommended Foods</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#292929] p-4 rounded-lg">
              <h4 className="text-sm font-bold">Breakfast</h4>
              <p>Avocado</p>
              <p className="text-xs">300 kcal</p>
            </div>
            <div className="bg-[#292929] p-4 rounded-lg">
              <h4 className="text-sm font-bold">Lunch</h4>
              <p>Shiro</p>
              <p className="text-xs">200 kcal</p>
            </div>
            <div className="bg-[#292929] p-4 rounded-lg">
              <h4 className="text-sm font-bold">Dinner</h4>
              <p>500 kcal</p>
            </div>
          </div>
        </section>

        {/* Right Section: Metrics and Promo */}
        <section className="col-span-4 bg-[#1e1e1e] p-4 rounded-lg flex flex-col space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#292929] p-4 rounded-lg text-center">
              <h4 className="text-lg font-bold">7</h4>
              <p className="text-sm">Days Streak</p>
            </div>
            <div className="bg-[#292929] p-4 rounded-lg text-center">
              <h4 className="text-lg font-bold">43</h4>
              <p className="text-sm">Exercises Completed</p>
            </div>
            <div className="bg-[#292929] p-4 rounded-lg text-center">
              <h4 className="text-lg font-bold">60%</h4>
              <p className="text-sm">Progress</p>
            </div>
          </div>
          <div className="bg-[#292929] p-4 rounded-lg">
            <h4 className="font-bold mb-2">Only a few left!</h4>
            <div className="w-full h-32 bg-cover bg-center rounded-lg mb-4">
              <img
                src="/shoes.png"
                alt="Shoes"
                className="object-cover rounded-lg"
              />
            </div>
            <p className="text-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore.
            </p>
            <button className="bg-[#2596BE] mt-4 w-full py-2 rounded-lg">
              Buy Now - 15% Off
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
