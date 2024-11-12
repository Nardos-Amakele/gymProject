import React from "react";
import Link from "next/link"; // Import Link for navigation
import Image from "next/image";
import logo from "@/assets/logos/logo.svg";
import { useRouter } from 'next/router';

// Define props type
interface AdminSidebarProps {
  locale?: string; // Prop to accept the current locale
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ locale }) => {
  return (
    <aside className="bg-black w-40 text-white flex flex-col border-r-[0.5px] border-gray-800">
      <div className="p-[0.85rem] border-b-[0.5px] border-gray-800">
        <Image src={logo} alt="logo" className="w-28 mx-auto" />
      </div>
      <nav className="flex-grow mx-auto flex flex-col gap-4 pt-10 text-sm">
        <Link href={`/en/admin`}  className="w-full text-left px-4 font-extralight py-2 hover:text-customBlue focus:text-customBlue">
          Dashboard
        </Link>
        <Link href={`/en/admin/gym-member`}  className="w-full text-left px-4 font-extralight py-2 hover:text-customBlue focus:text-customBlue">
          Gym Member
        </Link>
        <Link href={`/en/admin/employee`}  className="w-full text-left px-4 font-extralight py-2 hover:text-customBlue focus:text-customBlue">
          Employee
        </Link>
        <Link href={`/en/admin/inventory`}  className="w-full text-left px-4 font-extralight py-2 hover:text-customBlue focus:text-customBlue">
          Inventory
        </Link>
        <Link href={`/en/admin/stock`}  className="w-full text-left px-4 font-extralight py-2 hover:text-customBlue focus:text-customBlue">
          Stock
        </Link>
        <Link href={`/en/admin/orders`}  className="w-full text-left px-4 font-extralight py-2 hover:text-customBlue focus:text-customBlue">
          Orders
        </Link>
        <Link href={`/en/admin/financial-report`} className="w-full text-left px-4 font-extralight py-2 hover:text-customBlue focus:text-customBlue">
          Financial Report
        </Link>
        <Link href={`/en/admin/services`}  className="w-full text-left px-4 font-extralight py-2 hover:text-customBlue focus:text-customBlue">
          Services
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
