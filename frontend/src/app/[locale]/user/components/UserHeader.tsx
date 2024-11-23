import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-solid-svg-icons";

interface UserHeaderProps {
    activeNav: string;
    }

const UserHeader:React.FC<UserHeaderProps> = ({activeNav}) => {
  return (
    <header className="p-4 pt-[1.455rem] bg-black flex justify-between items-center text-white border-b-[0.5px] border-gray-800">
      <h1 className="text-lg">{activeNav}</h1>
      <Link href="/" className='flex gap-4'>
      <FontAwesomeIcon icon={faBell} className="bg-customBlue text-black font-light px-2 py-1 rounded-lg" />
      <FontAwesomeIcon icon={faUser} className="bg-customBlue text-black font-light px-2 py-1 rounded-lg" />
      <p className='font-extralight items-baseline text-sm'>abebebkebde@gmail.com</p>
      </Link>
    </header>
  );
};

export default UserHeader;
