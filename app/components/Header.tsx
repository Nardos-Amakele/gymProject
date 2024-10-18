"use client"; 

import React, { useState } from 'react';
import styles from '../styles/ButtonStyles.module.css'; 
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/logos/logo.svg';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-transparent p-6 text-white flex items-center justify-between px-8 max-w-screen-xl mx-auto absolute top-0 left-0 right-0 z-10">
        <div className="w-40"><Image src={logo} alt='logo' className=''></Image></div>

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
        <nav className={`md:flex ${menuOpen ? 'block' : 'hidden'} absolute md:static bg-black md:bg-transparent w-full md:w-auto top-12 right-0 md:right-auto z-10`}>
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
                <Link href="/Register">SignUp</Link>
              </button>
              <button className={`bg-black text-customBlue w-full py-2 rounded-br-[1rem] hover:translate-y-1`}>
                <Link href="/Login">LogIn</Link>
              </button>
            </li>
          </ul>
        </nav>

        {/* Sign-up and Login Buttons for Desktop */}
        <div className="hidden md:flex ">
          <button className={`${styles.customButton}` }>
            <Link href="/Register">SignUp</Link>
          </button>
          <button className="bg-black py-[0.38rem] px-[1.8rem] rounded-br-[1rem] font-bold text-customBlue hover:shadow-[rgba(0, 0, 0, .3) 2px 8px 8px -5px] hover:translate-y-1">
            <Link href="/Login">LogIn</Link>
          </button>
        </div>
    </header>
  );
};

export default Header;