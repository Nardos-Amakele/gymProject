'use client';
import React, { useState } from 'react';
import { members, Member } from '@/assets/data/membersData';
import MemberDetails from '../components/membersDetails';
import AdminSidebar from '../components/AdminSideBar';
import AdminHeader from '../components/AdminHeader';
import AddMemberForm from '../components/AddMemberForm';


const GymMembersList = ({ onMemberSelected }: { onMemberSelected: (member: Member | null) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [memberList, setMemberList] = useState(members);
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

  const filteredMembers = memberList.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNameClick = (member: Member) => {
    setSelectedMember(member);
    onMemberSelected(member);
  };

  const handleAddMember = (newMember: Member) => {
    setMemberList([...memberList, newMember]);
  };

  const toggleDropdown = (index: number) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const handleDropdownAction = (action: string, member: Member) => {
    console.log(`${action} account for ${member.name}`);
    setDropdownIndex(null); // Close dropdown automatically after click
  };

  return (
    <div className="text-white flex flex-col h-full">
      {selectedMember ? (
        <MemberDetails
          member={selectedMember}
          onClose={() => {
            setSelectedMember(null);
            onMemberSelected(null);
          }}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-customBlue">Gym Members</h1>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 px-6 py-2 rounded-md bg-[#ffffff29] text-gray-300 focus:outline-none focus:ring-2 focus:ring-customBlue"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <table className="min-w-full text-left text-gray-200">
              <thead className="text-gray-300">
                <tr>
                  <th className="px-6 py-4 border-b border-t border-[#D9D9D93B]">Name</th>
                  <th className="px-6 py-4 border border-[#D9D9D93B]">Phone no.</th>
                  <th className="px-6 py-4 border border-[#D9D9D93B]">Due</th>
                  <th className="px-6 py-4 border-b border-t border-[#D9D9D93B]">Member Type</th>
                  <th className="px-6 py-4 border-b border-t border-[#D9D9D93B]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member: Member, index) => (
                    <tr
                      key={member.id}
                      className={`border-b border-[#D9D9D93B] ${member.due === 'Expired' ? 'bg-red-800' : ''} hover:bg-[#1d1d1d]`}
                    >
                      <td
                        className="px-4 py-2 border-r border-b border-[#D9D9D93B] hover:underline cursor-pointer"
                        onClick={() => handleNameClick(member)}
                      >
                        {member.name}
                      </td>
                      <td className="px-4 py-2 border border-[#D9D9D93B]">{member.phoneNumber}</td>
                      <td className="px-4 py-2 border border-[#D9D9D93B]">{member.due}</td>
                      <td className="px-4 py-2 border-b border-[#D9D9D93B]">{member.memberType}</td>
                      <td className="relative px-4 py-2 border-b border-[#D9D9D93B]">
                        <button onClick={() => toggleDropdown(index)} className="text-gray-300 hover:text-white">
                          ⋮
                        </button>
                        {dropdownIndex === index && (
                          <div
                            className="absolute left-0 w-32 bg-gray-700 rounded-md shadow-lg z-50"
                            style={{ position: 'absolute', top: '100%', transform: 'translateY(5px)', zIndex: 50 }}
                          >
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600"
                              onClick={() => handleDropdownAction('Freeze', member)}
                            >
                              Freeze Account
                            </button>
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600"
                              onClick={() => handleDropdownAction('Activate', member)}
                            >
                              Activate
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-2 text-center">
                      No members found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setShowAddMemberForm(true)}
              className="bg-customBlue text-white px-4 py-2 rounded-md hover:bg-customHoverBlue"
            >
              Add Member
            </button>
          </div>
        </>
      )}

      {showAddMemberForm && (
        <AddMemberForm
          onClose={() => setShowAddMemberForm(false)}
          onAddMember={handleAddMember}
        />
      )}
    </div>
  );
};

const Page = () => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {!selectedMember && (
        <div className="hidden lg:block sticky top-0 h-screen bg-[#121212]">
          <AdminSidebar locale={""} />
        </div>
      )}

      <div className="flex flex-col flex-1">
        {!selectedMember && (
          <div>
            {/* Header */}
            <AdminHeader />
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-auto bg-black">
          <GymMembersList onMemberSelected={setSelectedMember} />
        </div>
      </div>
    </div>
  );
};

export default Page;
