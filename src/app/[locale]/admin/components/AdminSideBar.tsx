import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logos/logo.svg";

const navItems = ["Dashboard", "Gym Member", "Employee", "Inventory"];

const AdminSidebar: React.FC<{ onNavClick: (item: string) => void }> = ({ onNavClick }) => {
  return (
    <aside className="bg-black w-60 h-full text-white flex flex-col border-r-[0.5px] border-gray-800">
      <div className="p-[0.85rem]  border-b-[0.5px] border-gray-800">
        <Image src={logo} alt="logo" className="w-28 mx-auto" />
      </div>
      <nav className="flex-grow mx-auto flex flex-col gap-4 pt-6">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => onNavClick(item)}
            className="w-full text-left px-4 font-light  py-2 hover:text-customBlue focus:text-customBlue"
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;


