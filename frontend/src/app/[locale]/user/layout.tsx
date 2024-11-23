'use client'
import React, { useState } from "react";
import UserHeader from "./components/UserHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import UserSidebar from "./components/UserSideBar";

export const dynamic = "force-dynamic";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeNav, setActiveNav] = useState('Dashboard');
  return (
    <div className="flex h-screen">
     {/* Burger Icon for Mobile */}
     <button
        className="lg:hidden p-4  z-10"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FontAwesomeIcon icon={faBars} className="text-white text-2xl" />
    </button>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'fixed' : 'hidden'
        } fixed top-0 left-0 h-full bg-black lg:relative lg:flex lg:h-auto z-20`}
      >
        <UserSidebar setActiveNav={setActiveNav}  />
      </div>

      {/* Overlay Background for Sidebar (when open) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <UserHeader  activeNav={activeNav}/>
        <main className="flex-1 bg-black p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
