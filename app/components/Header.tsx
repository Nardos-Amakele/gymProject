"use client"; // Add this line to indicate a Client Component

import React, { useState } from 'react';
import styles from '../styles/ButtonStyles.module.css'; 
import Link from 'next/link';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-black text-white p-6">
      <div className="flex justify-between items-center px-8 max-w-screen-xl mx-auto">
        <div className="text-lg">ROBI LOGO</div>

        {/* Mobile Menu Icon */}
        <div className="relative md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {menuOpen ? (
              // X icon when menu is open
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon when menu is closed
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className={`md:flex ${menuOpen ? 'block' : 'hidden'} absolute md:static bg-black w-full md:w-auto top-12 right-0 md:right-auto z-10`}>
          <ul className="flex flex-col items-center md:flex-row text-base space-y-4 md:space-y-0 md:space-x-10 lg:space-x-14 p-6 md:p-0 ml-auto md:ml-0">
            <li className="cursor-pointer relative group">
            <Link href="/">Home</Link>
              <span className="absolute left-1/2 bottom-0 transform -translate-x-1/2 h-[2px] w-0 bg-[#2596BE] transition-all duration-300 group-hover:w-8"></span>
            </li>
            <li className="cursor-pointer relative group">
            <Link href="/about">About Us</Link>
              <span className="absolute left-1/2 bottom-0 transform -translate-x-1/2 h-[2px] w-0 bg-[#2596BE] transition-all duration-300 group-hover:w-8"></span>
            </li>
            <li className="cursor-pointer relative group">
            <Link href="/services">Service</Link>
              <span className="absolute left-1/2 bottom-0 transform -translate-x-1/2 h-[2px] w-0 bg-[#2596BE] transition-all duration-300 group-hover:w-8"></span>
            </li>
            <li className="cursor-pointer relative group">
            <Link href="/Shop">Shop</Link>
              <span className="absolute left-1/2 bottom-0 transform -translate-x-1/2 h-[2px] w-0 bg-[#2596BE] transition-all duration-300 group-hover:w-8"></span>
            </li>
            <li className="cursor-pointer relative group">
            <Link href="/Contact">Contact</Link>
              <span className="absolute left-1/2 bottom-0 transform -translate-x-1/2 h-[2px] w-0 bg-[#2596BE] transition-all duration-300 group-hover:w-8"></span>
            </li>
            {/* Sign-up Button in Mobile Menu */}
            <li className="mt-4 md:hidden">
              <button className={`${styles.customButton} w-full`}>
                <Link href="/Register">Sign up</Link>
              </button>
            </li>
          </ul>
        </nav>

        {/* Sign-up Button for Desktop */}
        
        <button className={`${styles.customButton} hidden md:inline-block`}>
          <Link href="/Register">Sign up</Link>
        </button>
      </div>
    </header>
  );
};

export default Header;
