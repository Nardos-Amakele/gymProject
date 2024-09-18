// components/Header.tsx

import React from 'react';
import styles from '../styles/ButtonStyles.module.css'; 
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-black text-white p-6">
      <div className="flex justify-between items-center px-8 max-w-screen-xl mx-auto">
        <div className="text-lg ">ROBI LOGO</div>
        <nav>
  <ul className="flex sm:space-x-6 md:space-x-10 lg:space-x-14">
    <li className="cursor-pointer relative group">
    <Link href="/">Home</Link>
      <span className="absolute left-1/2 bottom-0 transform -translate-x-1/2 h-[2px] w-0 bg-[#2596BE] transition-all duration-300 group-hover:w-8"></span>
    </li>
    <li className="cursor-pointer relative group">
      <Link href='/about'>About Us</Link>
      <span className="absolute left-1/2 bottom-0 transform -translate-x-1/2 h-[2px] w-0 bg-[#2596BE] transition-all duration-300 group-hover:w-8"></span>
    </li>
    <li className="cursor-pointer relative group">
      Service
      <span className="absolute left-1/2 bottom-0 transform -translate-x-1/2 h-[2px] w-0 bg-[#2596BE] transition-all duration-300 group-hover:w-8"></span>
    </li>
    <li className="cursor-pointer relative group">
      Shop
      <span className="absolute left-1/2 bottom-0 transform -translate-x-1/2 h-[2px] w-0 bg-[#2596BE] transition-all duration-300 group-hover:w-8"></span>
    </li>
    <li className="cursor-pointer relative group">
      Contact
      <span className="absolute left-1/2 bottom-0 transform -translate-x-1/2 h-[2px] w-0 bg-[#2596BE] transition-all duration-300 group-hover:w-8"></span>
    </li>
  </ul>
</nav>

        <button className={styles.customButton}>
          Sign up
        </button>
      </div>
    </header>
  );
};

export default Header;