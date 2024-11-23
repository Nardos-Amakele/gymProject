import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logos/logo.svg";

interface UserSidebarProps {
  setActiveNav: (nav: string) => void;
}

const UserSidebar: React.FC<UserSidebarProps> = ({ setActiveNav }) => {
  const navItems = [
    { name: "Dashboard", path: "/en/user" },
    { name: "Plan", path: "/en/user/plan" },
    { name: "My plans", path: "/en/user/my-plans" },
    { name: "Progress", path: "/en/user/progress" },
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
            className="w-full text-left px-4 font-extralight py-2 hover:text-customBlue focus:text-customBlue"
            onClick={() => setActiveNav(item.name)}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default UserSidebar;
