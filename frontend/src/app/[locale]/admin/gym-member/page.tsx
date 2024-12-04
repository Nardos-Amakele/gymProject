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

import React, { useState, useEffect } from "react";
import axios from "axios";
import MemberDetails from "../components/membersDetails";
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
  const [showDateModal, setShowDateModal] = useState<boolean>(false); // Track modal visibility
  const [selectedMemberForDate, setSelectedMemberForDate] = useState<Member | null>(null); // Member selected for activation
  const [activationDate, setActivationDate] = useState<string>("");

  const [statusFilter, setStatusFilter] = useState<string>(""); // Add state for status filter
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false); // Track delete modal visibility
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null); // Track member to delete

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

  const filteredMembers = memberList.filter((member) => {
    const matchesSearchTerm = member.fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter
      ? member.status.toLowerCase() === statusFilter.toLowerCase()
      : true; // If no status filter, include all statuses
    return matchesSearchTerm && matchesStatus;
  });

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

      const response = await axios.get("http://localhost:5000/api/members");
      const users = response.data.data.users;
      setMemberList(users);
    } catch (error) {
      console.error(`Error updating status for member ${memberId}:`, error);
    }
  };

  const deleteMember = async (memberId: string) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/members/${memberId}`);
      if (response.status === 200) {
        console.log(`Member with ID ${memberId} deleted successfully.`);
        setMemberList((prev) => prev.filter((member) => member.id !== memberId));
      } else {
        console.error(`Failed to delete member with ID ${memberId}. Response: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting member ${memberId}:`, error);
    }
  };

  const handleDropdownAction = (action: string, member: Member) => {
    const { id, status } = member;
    if (action === "Activate" && (status === "freeze" || status === "inactive")) {
      setSelectedMemberForDate(member);
      setShowDateModal(true);
    } else if (action === "Deactivate") {
      updateUserStatus(id, "inactive");
    } else if (action === "Freeze" && status === "active") {
      updateUserStatus(id, "freeze");
    } else if (action === "Unfreeze" && status === "freeze") {
      updateUserStatus(id, "active");
    } else if (action === "Delete") {
      setMemberToDelete(member); // Set member to delete
      setShowDeleteModal(true); // Show delete confirmation modal
    }
    setDropdownIndex(null);
  };

  const toggleDropdown = (index: number) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const handleDateSubmit = async () => {
    if (activationDate.trim() === "") {
      alert("Please provide a start date to activate the member.");
      return;
    }

    if (selectedMemberForDate) {
      updateUserStatus(selectedMemberForDate.id, "active", activationDate);
      setShowDateModal(false);
      setActivationDate("");
    }
  };

  const handleDeleteConfirm = () => {
    if (memberToDelete) {
      deleteMember(memberToDelete.id);
      setShowDeleteModal(false);
      setMemberToDelete(null); // Reset member to delete
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false); // Close modal without deleting
    setMemberToDelete(null); // Reset member to delete
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
            <h1 className="hidden sm:block text-2xl font-bold text-black">
              Gym Members
            </h1>
            <div className="flex flex-row items-center space-x-4">
              <div className="relative w-full sm:w-auto">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faSearch} className="text-customBlue text-xl" />
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 px-6 py-2 rounded-md bg-[#ffffff29] text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-customBlue"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <div className="bg-[#ffffff29] px-4 py-2 rounded-md border border-gray-600">
                  <select
                    className="bg-transparent text-gray-300 focus:outline-none"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="freeze">Frozen</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden sm:block">
            <table className="min-w-full text-left text-sm text-gray-400">
              <thead className="text-gray-300">
                <tr>
                  <th className="px-6 py-4 border-b">Name</th>
                  <th className="px-6 py-4 border-b">Phone no.</th>
                  <th className="px-6 py-4 border-b">Status</th>
                  <th className="px-6 py-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member, index) => {
                    const statusColors: { [key: string]: string } = {
                      active: "bg-green-500/30",
                      inactive: "bg-red-500/30",
                      freeze: "bg-blue-500/30",
                      expired: "bg-gray-500/30",
                    };

                    const bgColor = statusColors[member.status.toLowerCase()] || "bg-gray-400/30";

                    return (
                      <tr
                        key={member.id}
                        className={`border-b hover:bg-[#1d1d1d] ${bgColor}`}
                      >
                        <td
                          className="px-4 py-3 hover:underline cursor-pointer"
                          onClick={() => handleNameClick(member)}
                        >
                          {member.fullName}
                        </td>
                        <td className="px-4 py-3">{member.phoneNumber}</td>
                        <td className="px-4 py-3">{member.status}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleDropdown(index)}
                            className="text-customBlue hover:text-gray-300"
                          >
                            Actions
                          </button>
                          {dropdownIndex === index && (
                            <div className="absolute bg-gray-800 shadow-lg rounded-lg mt-2 w-40 py-2 z-10">
                              <ul>
                                <li>
                                  <button
                                    onClick={() => handleDropdownAction("Activate", member)}
                                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
                                  >
                                    Activate
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() => handleDropdownAction("Deactivate", member)}
                                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
                                  >
                                    Deactivate
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() => handleDropdownAction("Freeze", member)}
                                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
                                  >
                                    Freeze
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() => handleDropdownAction("Unfreeze", member)}
                                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
                                  >
                                    Unfreeze
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() => handleDropdownAction("Delete", member)}
                                    className="block px-4 py-2 text-red-500 hover:bg-gray-700"
                                  >
                                    Delete
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-400">
                      No members found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete?</h3>
            <div className="flex justify-between">
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleDeleteCancel}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Date Modal */}
      {showDateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h3 className="text-lg font-semibold mb-4">
              Select Activation Date for {selectedMemberForDate?.fullName}
            </h3>
            <input
              type="date"
              value={activationDate}
              onChange={(e) => setActivationDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={handleDateSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Activate
              </button>
              <button
                onClick={() => setShowDateModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GymMembersList;
