import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faClock, faBarsProgress } from "@fortawesome/free-solid-svg-icons";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header Section */}
      <header className="text-black flex flex-wrap lg:flex-nowrap gap-3 items-center px-4 lg:px-0">
        <div className="bg-[#2596BE] p-6 sm:p-8 w-full lg:w-2/3 rounded-lg">
          <h1 className="text-lg sm:text-2xl font-extralight">
            Hello <span className="font-bold">Abebe</span>
          </h1>
          <p className="text-sm font-extralight">
            You have already achieved <br /> <span className="font-bold">43%</span> of
            your Goal. Keep pushing!
          </p>
        </div>
        <div className="bg-[#2596BE] p-6 sm:p-9 w-full lg:w-1/3 rounded-lg relative">
          <div className="absolute top-[-0.5px] right-[-0.5px] bg-green-500 rounded-bl-lg px-4 sm:px-6 py-1 sm:py-2 flex items-center justify-center">
            <span className="flex items-center text-black text-xs sm:text-sm font-semibold">
              <span className="w-[8px] sm:w-[10px] h-[8px] sm:h-[10px] bg-black rounded-full mr-2"></span>
              Active
            </span>
          </div>

          <div className="flex items-baseline gap-1">
            <h2 className="text-2xl sm:text-4xl font-bold">4</h2>
            <p className="text-xs sm:text-sm font-extralight">Working days left</p>
          </div>
          <a
            href="#"
            className="font-extralight underline text-xs sm:text-tiny mt-1 block hover:text-blue-700"
          >
            Extend your subscription
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-wrap lg:flex-nowrap gap-6 pt-3 text-white px-4 lg:px-0">
        {/* Left Sidebar: Today's Plans */}
        <section className="w-full lg:w-1/3 bg-[#1e1e1e] p-4 rounded-lg">
          <h3 className="text-sm sm:text-base font-light mb-4">Today's Plans</h3>
          <div className="flex bg-[#2a2a2a] p-1 space-x-2 rounded-full mb-4 overflow-x-auto">
            <button className="bg-[#1e1e1e] px-6 sm:px-8 py-1 rounded-full text-sm hover:bg-customHoverBlue">
              All
            </button>
            <button className="px-4 sm:px-6 bg-[#1e1e1e] py-1 rounded-full text-sm hover:bg-customHoverBlue">
              Exercise
            </button>
            <button className="px-4 sm:px-6 py-1 bg-[#1e1e1e] rounded-full text-sm hover:bg-customHoverBlue">
              Meal
            </button>
          </div>
          <ul>
            {["Pull Up", "Lat Pulldowns", "Bent-Over Rows"].map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center py-3 px-4 mb-2 bg-[#292929] rounded-full text-xs sm:text-sm font-light"
              >
                <span>{item}</span>
                <button className="text-[#2596BE]">▶</button>
              </li>
            ))}
          </ul>
        </section>

        {/* Center Section: Recommended Foods */}
        <section className="w-full lg:w-1/3">
          <div className="bg-[#1e1e1e] p-4 rounded-lg">
            <h3 className="text-sm sm:text-lg font-light mb-4">Recommended Foods</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Breakfast", item: "Avocado", kcal: 300 },
                { title: "Lunch", item: "Shiro", kcal: 200 },
                { title: "Dinner", item: "Shiro", kcal: 500 },
              ].map(({ title, item, kcal }, idx) => (
                <div key={idx}>
                  <h4 className="text-xs font-extralight px-3 py-2 text-[#6a6a6a]">
                    {title}
                  </h4>
                  <div className="bg-[#292929] flex flex-col justify-between gap-4 py-3 px-3 rounded-lg">
                    <p className="font-light">{item}</p>
                    <p className="text-xs">
                      {kcal} <span className="text-[#6a6a6a]">kcal</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#1e1e1e] mt-2 p-4 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-rows-3 gap-4">
              {[
                { label: "7 Days Streak", icon: faFire },
                { label: "43 Exercises Completed", icon: faClock },
                { label: "60% Progress", icon: faBarsProgress },
              ].map(({ label, icon }, idx) => (
                <div
                  key={idx}
                  className="bg-[#292929] flex justify-between px-4 py-3 rounded-lg items-baseline"
                >
                  <h4 className="font-light text-xs sm:text-sm">
                    <span className="text-[#06bdff] text-xl sm:text-2xl font-bold">
                      {label.split(" ")[0]}
                    </span>{" "}
                    {label.split(" ").slice(1).join(" ")}
                  </h4>
                  <FontAwesomeIcon className="text-sm" icon={icon} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Section: Metrics and Promo */}
        <section className="w-full lg:w-1/3 bg-[#1e1e1e] p-4 rounded-lg flex flex-col space-y-6">
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
              Buy Now
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
