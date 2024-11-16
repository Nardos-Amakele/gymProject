import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logos/logo.svg";

interface AdminSidebarProps {
  setActiveNav: (nav: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ setActiveNav }) => {
  const navItems = [
    { name: "Dashboard", path: "/en/admin" },
    { name: "Gym Member", path: "/en/admin/gym-member" },
    { name: "Employee", path: "/en/admin/employee" },
    { name: "Inventory", path: "/en/admin/inventory" },
    { name: "Stock", path: "/en/admin/stock" },
    { name: "Orders", path: "/en/admin/orders" },
    { name: "Financial Report", path: "/en/admin/financial-report" },
    { name: "Services", path: "/en/admin/services" },
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

export default AdminSidebar;
