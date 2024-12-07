import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faClock, faBarsProgress } from "@fortawesome/free-solid-svg-icons";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header Section */}
      <header className=" text-black  flex gap-3  items-center ">
        <div className="bg-[#2596BE] p-8 w-2/3 rounded-lg" >
          <h1 className="text-2xl font-extralight">
            Hello <span className="font-bold">Abebe</span>
          </h1>
          <p className="text-sm font-extralight">
            You have already achieved <br /> <span className="font-bold">43%</span> of
            your Goal. Keep pushing!
          </p>
        </div>
        <div className=" bg-[#2596BE] p-9 w-1/3 rounded-lg relative">
        <div className="absolute top-[-0.5px] right-[-0.5px] bg-green-500 rounded-bl-lg  px-6 py-2 flex items-center justify-center">
    <span className="flex items-center text-black text-sm font-semibold">
      <span className="w-[10px] h-[10px] bg-black rounded-full mr-2"></span>
      Active
    </span>
  </div>

          <div className="flex items-baseline gap-1">
          <h2 className="text-4xl font-bold">4 </h2>
          <p className="text-xs font-extralight"> Working days left</p>
          </div>
          <a
            href="#"
            className="font-extralight underline text-tiny mt-1 block hover:text-blue-700"
          >
            Extend your subscription
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-row gap-6 pt-3 text-white">
        {/* Left Sidebar: Today's Plans */}
        <section className="col-span-4 bg-[#1e1e1e] p-4 rounded-lg w-1/3">
          <h3 className="text-base font-light mb-4">Today's Plans</h3>
          <div className="flex bg-[#2a2a2a] p-1 space-x-2 rounded-full  mb-4">
            <button className="bg-[#1e1e1e] px-8 py-1 rounded-full text-sm hover:bg-customHoverBlue">
              All
            </button>
            <button className="px-6 bg-[#1e1e1e] py-1 rounded-full text-sm hover:bg-customHoverBlue">
              Exercise
            </button>
            <button className="px-6 py-1 bg-[#1e1e1e] rounded-full text-sm hover:bg-customHoverBlue">
              Meal
            </button>
          </div>
          <ul>
            {["Pull Up", "Lat Pulldowns", "Bent-Over Rows"].map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center py-3 px-4 mb-2 bg-[#292929] rounded-full text-sm font-light"
              >
                <span>{item}</span>
                <button className="text-[#2596BE]">▶</button>
              </li>
            ))}
          </ul>
        </section>

        {/* Center Section: Recommended Foods */}
        <section className="col-span-4 w-1/3">
        <div className="bg-[#1e1e1e] p-4 rounded-lg">
        <h3 className="text-lg font-light  mb-4">Recommended Foods</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="">
              <h4 className="text-xs font-extralight px-3 py-2 text-[#6a6a6a] ">Breakfast</h4>
              <div className="bg-[#292929] flex flex-col justify-between gap-4 py-3 px-3   rounded-lg">
              <p className="font-light">Avocado</p>
              <p className="text-xs">300 <span className="text-[#6a6a6a]">kcal</span></p>

              </div>
            </div>
            <div className="">
              <h4 className="text-xs font-extralight px-3 py-2 text-[#6a6a6a] ">Lunch</h4>
              <div className="bg-[#292929] flex flex-col justify-between gap-4 py-3 px-3  rounded-lg">
              <p className="font-light">Shiro</p>
              <p className="text-xs">200 <span className="text-[#6a6a6a]">kcal</span></p>

              </div>
            </div>
            <div className="">
            <h4 className="text-xs font-extralight px-3 py-2 text-[#6a6a6a] ">Dinner</h4>

              <div className="bg-[#292929] flex flex-col justify-between gap-4 py-3 px-3  rounded-lg">
              <p className="font-light">Shiro</p>

              <p className="text-xs">500 <span className="text-[#6a6a6a]">kcal</span></p>

              </div>
            </div>
          </div>

        </div>
        <div className="bg-[#1e1e1e] mt-2 p-4 rounded-lg">
        <div className="grid grid-rows-3 gap-4">
            <div className="bg-[#292929] flex justify-between px-4 py-3 rounded-lg  items-baseline">
              <h4 className=" font-light text-xs"><span className="text-[#06bdff] text-2xl font-bold">7 </span> Days Streak</h4>
              <div>
              <FontAwesomeIcon className="text-sm" icon={faFire} />
              </div>
            </div>
            <div className="bg-[#292929] flex justify-between px-4 py-3 rounded-lg text-center items-baseline">
              <h4 className=" font-light text-xs"><span className="text-[#06bdff] text-2xl font-bold">43 </span> Exercises Completed</h4>
              <div>
              <FontAwesomeIcon className="text-sm" icon={faClock} />
              </div>
            </div>
            <div className="bg-[#292929] flex justify-between px-4 py-3 rounded-lg text-center items-baseline">
              <h4 className=" font-light text-xs"><span className="text-[#06bdff] text-2xl font-bold">60% </span> Progress</h4>
              <div>
              <FontAwesomeIcon className="text-sm" icon={faBarsProgress} />
              </div>
            </div>
          </div>

        </div>
        </section>

        {/* Right Section: Metrics and Promo */}
        <section className="col-span-4 bg-[#1e1e1e] p-4 rounded-lg flex flex-col space-y-6 w-1/3">
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
