import React, { useState } from "react";
import { members, Member } from "@/assets/data/membersData";
import MemberDetails from "./membersDetails";

const GymMembersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (member: Member) => {
    setSelectedMember(member);
  };

  return (
    <div className="text-white">
      {selectedMember ? (
        <MemberDetails
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-customBlue">Gym Members</h1>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 px-6 py-2 rounded-md bg-[#ffffff29] text-gray-300 focus:outline-none focus:ring-2 focus:ring-customBlue"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="overflow-auto mt-4">
            <table className="min-w-full text-left text-gray-200">
              <thead className="text-gray-300">
                <tr>
                  <th className="px-6 py-4 border-b border-t border-[#D9D9D93B]">
                    Name
                  </th>
                  <th className="px-6 py-4 border border-[#D9D9D93B]">
                    Phone no.
                  </th>
                  <th className="px-6 py-4 border border-[#D9D9D93B]">
                    Status
                  </th>
                  <th className="px-6 py-4 border-b border-t border-[#D9D9D93B]">
                    Member Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member: Member) => (
                    <tr
                      key={member.id}
                      onClick={() => handleRowClick(member)}
                      className={`border-b border-[#D9D9D93B] cursor-pointer ${
                        member.due === "Expired" ? "bg-red-800" : ""
                      }`}
                    >
                      <td className="px-4 py-2 border-r border-b border-[#D9D9D93B]">
                        {member.name}
                      </td>
                      <td className="px-4 py-2 border border-[#D9D9D93B]">
                        {member.phoneNumber}
                      </td>
                      <td className="px-4 py-2 border border-[#D9D9D93B]">
                        {member.due}
                      </td>
                      <td className="px-4 py-2 border-b border-[#D9D9D93B]">
                        {member.memberType}
                      </td>
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
        </>
      )}
    </div>
  );
};

export default GymMembersList;
