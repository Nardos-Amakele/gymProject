"use client";

export type Member = {
  id: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
  email?: string | null;
  address: string;
  dob: string;
  emergencyContact: string;
  firstRegisteredAt: string;
  startDate: string;
  totalAttendance: number;
  remainingDays: number;
  countDown: number | null;
  height: number | null;
  weight: number | null;
  bmi: number | null;
  healthConditions: Record<string, boolean> | null;
  level: string | null;
  goal: string | null;
  status: string;
  freezeDate: string | null;
  createdAt: string;
  updatedAt: string;
  serviceId: string | null;
  profileImageUrl: string | null;
};

// Main component
import React, { useState, useEffect } from "react";
import axios from "axios";
import MemberDetails from "../components/membersDetails";
import AdminSidebar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const GymMembersList = ({
  onMemberSelected,
}: {
  onMemberSelected: (member: Member | null) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [memberList, setMemberList] = useState<Member[]>([]);
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/members");
        const users = response.data.data.users;
        setMemberList(users);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, []);

  const filteredMembers = memberList.filter((member) =>
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNameClick = (member: Member) => {
    setSelectedMember(member);
    onMemberSelected(member);
  };

  const updateUserStatus = async (
    memberId: string,
    newStatus: string,
    startDate?: string
  ) => {
    try {
      await axios.put(
        `http://localhost:5000/api/memberManagement/${memberId}/status`,
        {
          status: newStatus,
          ...(startDate && { startDate }),
        }
      );
      setMemberList((prev) =>
        prev.map((member) =>
          member.id === memberId ? { ...member, status: newStatus } : member
        )
      );
    } catch (error) {
      console.error(`Error updating status for member ${memberId}:`, error);
    }
  };

  const deleteMember = async (memberId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/members/${memberId}`);
      setMemberList((prev) => prev.filter((member) => member.id !== memberId));
    } catch (error) {
      console.error(`Error deleting member ${memberId}:`, error);
    }
  };

  const handleDropdownAction = (action: string, member: Member) => {
    const { id, status } = member;
    if (action === "Activate" && status === "freeze") {
      updateUserStatus(id, "active");
    } else if (action === "Deactivate") {
      updateUserStatus(id, "inactive");
    } else if (action === "Freeze" && status === "active") {
      updateUserStatus(id, "freeze");
    } else if (action === "Delete") {
      deleteMember(id);
    }
    setDropdownIndex(null);
  };

  const toggleDropdown = (index: number) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  return (
    <div className="text-white flex flex-col h-full">
      {selectedMember ? (
        <MemberDetails
          memberId={selectedMember.id}
          onClose={() => {
            setSelectedMember(null);
            onMemberSelected(null);
          }}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-customBlue">Gym Members</h1>

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
          <div>
            <table className="min-w-full text-left text-sm text-gray-400">
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
                    Days Left{" "}
                  </th>
                  <th className="px-6 py-4 border-b border-t border-[#D9D9D93B]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member, index) => (
                    <tr
                      key={member.id}
                      className={`border-b border-[#D9D9D93B] ${member.status === "Expired" ? "bg-red-800" : ""
                        } hover:bg-[#1d1d1d]`}
                    >
                      <td
                        className="px-4 py-3 border-r border-b border-[#D9D9D93B] hover:underline cursor-pointer"
                        onClick={() => handleNameClick(member)}
                      >
                        {member.fullName}
                      </td>
                      <td className="px-4 py-3 border border-[#D9D9D93B]">
                        {member.phoneNumber}
                      </td>
                      <td className="px-4 py-3 border border-[#D9D9D93B]">
                        {member.status}
                      </td>
                      <td className="px-4 py-3 border-b border-[#D9D9D93B]">
                        {member.countDown}
                      </td>
                      <td className="relative px-4 py-3 border-b border-[#D9D9D93B]">
                        <button
                          onClick={() => toggleDropdown(index)}
                          className="text-gray-300 hover:text-white"
                        >
                          ⋮
                        </button>
                        {dropdownIndex === index && (
                          <div className="absolute left-0 w-32 bg-gray-700 rounded-md shadow-lg z-50">
                            {member.status === "active" ? (
                              <>
                                <button
                                  onClick={() =>
                                    handleDropdownAction("Deactivate", member)
                                  }
                                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600"
                                >
                                  Deactivate
                                </button>
                                <button
                                  onClick={() =>
                                    handleDropdownAction("Freeze", member)
                                  }
                                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600"
                                >
                                  Freeze
                                </button>
                              </>
                            ) : member.status === "inactive" || "pending" ? (
                              <button
                                onClick={() =>
                                  handleDropdownAction("Activate", member)
                                }
                                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600"
                              >
                                Activate
                              </button>
                            ) : member.status === "Freeze" ? (
                              <button
                                onClick={() =>
                                  handleDropdownAction("Activate", member)
                                }
                                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600"
                              >
                                Unfreeze
                              </button>
                            ) : null}
                            {/* Delete Button */}
                            <button
                              onClick={() =>
                                handleDropdownAction("Delete", member)
                              }
                              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-red-600"
                            >
                              Delete
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
        </>
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
        <div className="fixed top-0 left-0 h-full bg-black lg:relative lg:flex lg:h-auto z-20">
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
