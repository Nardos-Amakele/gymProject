import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logos/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableCells, faPersonRunning, faCalendarCheck, faFlag, IconDefinition } from "@fortawesome/free-solid-svg-icons";

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

  const navItems = [
    { name: "Dashboard", icon: "faTableCells", path: "/en/user" },
    { name: "Plan", icon: "faPersonRunning", path: "/en/user/plan" },
    { name: "My plans", icon: "faCalendarCheck", path: "/en/user/my-plans" },
    { name: "Progress", icon: "faFlag", path: "/en/user/progress" },
  ];

  return (
    <aside className="bg-black w-40 text-white flex flex-col border-r-[0.5px] border-gray-800">
      <div className="p-[0.85rem] border-b-[0.5px] border-gray-800">
        <Image src={logo} alt="logo" className="w-28 mx-auto" />
      </div>
      <nav className="flex-grow mx-auto flex flex-col gap-4 pt-10 text-sm">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`w-full flex items-center px-4 font-extralight py-2 rounded-lg transition-all duration-200 ${
              activeNav === item.name
                ? "bg-customBlue text-black"
                : "hover:bg-customBlue/20 hover:text-customBlue"
            }`}
            onClick={() => {
              setActiveNav(item.name);
              setActive(item.name);
            }}
          >
            <FontAwesomeIcon
              icon={iconMapping[item.icon]}
              className={`text-2xl font-light px-2 py-1 rounded-lg ${
                activeNav === item.name ? "text-black" : "text-customBlue"
              }`}
            />
            <span className="ml-3">{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default UserSidebar;
