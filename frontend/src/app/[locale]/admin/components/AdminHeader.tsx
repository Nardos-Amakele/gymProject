import React from 'react';
import Link from 'next/link';

interface AdminHeaderProps {
  activeNav: string;
}
const AdminHeader: React.FC<AdminHeaderProps> = ({activeNav}) => {
  return (
    <header className="p-4 pt-5 bg-black flex justify-between items-center text-white border-b-[0.5px] border-gray-800">
      <h1 className="text-lg">{activeNav}</h1>
      <Link href="/">
      <button className="bg-customBlue text-black font-light px-5 py-1 rounded-lg" >Back to Home</button>
      </Link>
    </header>
  );
};

export default AdminHeader;
