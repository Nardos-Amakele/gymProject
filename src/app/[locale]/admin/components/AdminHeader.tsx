import React from 'react';

const AdminHeader: React.FC = () => {
  return (
    <header className="p-4 pt-5 bg-black flex justify-between items-center text-white border-b-[0.5px] border-gray-800">
      <h1 className="text-lg">Admin</h1>
      <button className="bg-customBlue text-black font-light px-5 py-1 rounded-lg">Back to Home</button>
    </header>
  );
};

export default AdminHeader;
