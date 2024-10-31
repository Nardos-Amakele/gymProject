import React, { useState } from 'react';
import { members } from '../../../../../assets/data/membersData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const GymMembersList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-customBlue">Gym Members</h1>
        <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-customBlue text-xl" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 px-6 py-2 rounded-md bg-[#ffffff29] text-gray-300 focus:outline-none focus:ring-2 focus:ring-customBlue"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
      </div>
      <div className="overflow-auto mt-4">
        <table className="min-w-full text-left text-gray-200">
          <thead className=" text-gray-300">
            <tr>
              <th className="px-6 py-4  border-b border-t border-[#D9D9D93B]">Name</th>
              <th className="px-6 py-4 border border-[#D9D9D93B]">Phone no.</th>
              <th className="px-6 py-4 border border-[#D9D9D93B]">Due</th>
              <th className="px-6 py-4 border-b border-t border-[#D9D9D93B]">Member Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className={`border-b border-[#D9D9D93B]${
                    member.due === "Expired" ? "bg-red-800" : ""
                  }`}
                >
                  <td className="px-4 py-2 border-r border-b border-[#D9D9D93B] ">{member.name}</td>
                  <td className="px-4 py-2 border border-[#D9D9D93B]">{member.phoneNumber}</td>
                  <td className="px-4 py-2 border border-[#D9D9D93B]">{member.due}</td>
                  <td className="px-4 py-2 border-b border-[#D9D9D93B]">{member.memberType}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-2 text-center">
                  No members found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GymMembersList;
