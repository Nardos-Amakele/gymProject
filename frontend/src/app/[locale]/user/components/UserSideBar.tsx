import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logos/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTableCells,
  faPersonRunning,
  faCalendarCheck,
  faFlag,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

interface UserSidebarProps {
  setActiveNav: (nav: string) => void;
}

const iconMapping: { [key: string]: IconDefinition } = {
  faTableCells: faTableCells,
  faPersonRunning: faPersonRunning,
  faCalendarCheck: faCalendarCheck,
  faFlag: faFlag,
};

const UserSidebar: React.FC<UserSidebarProps> = ({ setActiveNav }) => {
  const [activeNav, setActive] = useState<string>("Dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const navItems = [
    { name: "Dashboard", icon: "faTableCells", path: "/en/user" },
    { name: "Plan", icon: "faPersonRunning", path: "/en/user/plan" },
    { name: "My plans", icon: "faCalendarCheck", path: "/en/user/my-plans" },
    { name: "Progress", icon: "faFlag", path: "/en/user/progress" },
  ];

  return (
    <>
      {/* Main Burger Icon for Small Screens */}
      {!isSidebarOpen && (
        <button
          className="fixed top-4 left-4 z-50 bg-black text-white p-2 rounded-lg lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <FontAwesomeIcon icon={faBars} className="text-xl" />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-black z-40 flex flex-col border-r-[0.5px] border-gray-800 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`}
      >
        {/* Sidebar Header */}
        <div className="p-[0.85rem] border-b-[0.5px] border-gray-800">
          <Image src={logo} alt="logo" className="w-28 mx-auto" />
        </div>

        {/* Navigation Items */}
        <nav className="flex-grow mx-auto flex flex-col gap-4 pt-10 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`text-white relative w-full flex items-center px-4 font-extralight py-2 transition-all duration-200 ${
                activeNav === item.name
                  ? "text-customBlue"
                  : "hover:text-customBlue"
              }`}
              onClick={() => {
                setActiveNav(item.name);
                setActive(item.name);
                setSidebarOpen(false); // Close sidebar on selection
              }}
            >
              {/* Right Blue Box */}
              <span
                className={`absolute right-0 top-0 h-full w-1 bg-customBlue rounded-l-md transition-all duration-200 ${
                  activeNav === item.name
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              ></span>
              {/* Icon */}
              <FontAwesomeIcon
                icon={iconMapping[item.icon]}
                className={`text-2xl font-light px-2 py-1 ${
                  activeNav === item.name ? "text-customBlue" : "text-white"
                }`}
              />
              {/* Name */}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default UserSidebar;
