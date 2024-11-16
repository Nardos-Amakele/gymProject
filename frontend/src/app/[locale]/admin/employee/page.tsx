"use client";
import { faFilter, faSearch, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useCallback } from "react";
import AdminSidebar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import AddEmployeeModal from "../components/AddEmployeeForm";
import { faBars } from '@fortawesome/free-solid-svg-icons';

// Define the type for the Employee member
interface Member {
  id: string;
  name: string;
  phone: string;
  startDate: string;
  jobType: string;
}
const Employee = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);

  // Fetch employees from backend
  const fetchEmployees = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/employees/");
      const data = await response.json();

      // Ensure the data contains a valid array before setting state
      if (data.success && Array.isArray(data.data)) {
        setMembers(data.data);
      } else {
        console.error("Invalid response format:", data);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Function to open the Add Employee modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the Add Employee modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to add a new member and immediately fetch updated members
  const addNewMember = async (newMember: Member) => {
    try {
      // Send the new member to the backend and trigger re-fetch after success
      await fetchEmployees();
      closeModal();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };


  // Function to delete a member

  const deleteMember = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        // Refresh the list after successful deletion
        fetchEmployees();
      } else {
        console.error("Error deleting employee:", data.message);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };


  // Filter members by name and job type
  const filteredMembers = members.filter((member) => {
    // Ensure that member exists and has required properties
    if (!member || !member.name || !member.jobType) {
      return false; // Skip invalid members
    }

    const matchesName = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesJobType = selectedJobType === "All" || member.jobType === selectedJobType;
    return matchesName && matchesJobType;
  });

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleJobTypeSelect = (jobType: string) => {
    setSelectedJobType(jobType);
    setIsDropdownOpen(false);
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-black">Employees</h1>
        <div className="flex items-center">
          {/* Search Input */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-customBlue text-xl" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 px-6 py-2 rounded-md bg-[#ffffff29] text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-customBlue"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Icon */}
          <div className="relative ml-4">
            <div className="bg-[#ffffff29] px-4 py-2 rounded-md border border-gray-600">
              <FontAwesomeIcon
                icon={faFilter}
                className="text-customBlue text-xl cursor-pointer"
                onClick={toggleDropdown}
              />
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-zinc-900 border z-10">
                <ul className="text-gray-300">
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                    onClick={() => handleJobTypeSelect("All")}
                  >
                    All
                  </li>
                  <hr />
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                    onClick={() => handleJobTypeSelect("Janitor")}
                  >
                    Janitor
                  </li>
                  <hr />
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                    onClick={() => handleJobTypeSelect("Trainer")}
                  >
                    Trainer
                  </li>
                  <hr />
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                    onClick={() => handleJobTypeSelect("Reception")}
                  >
                    Reception
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="bg-black text-gray-300 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3 border-b border-t border-[#D9D9D93B]">Name</th>
              <th scope="col" className="px-6 py-3 border border-[#D9D9D93B]">Phone no.</th>
              <th scope="col" className="px-6 py-3 border border-[#D9D9D93B]">Start Date</th>
              <th scope="col" className="px-6 py-3 border border-[#D9D9D93B]">Job Type</th>
              <th scope="col" className="px-6 py-3 text-center border-b border-t border-[#D9D9D93B]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr
                key={member.id}
                className="border-b border-[#D9D9D93B] hover:bg-[#1d1d1d]"
              >
                <td className="px-6 py-4 border-r border-[#D9D9D93B]">{member.name}</td>
                <td className="px-6 py-4 border-r border-[#D9D9D93B]">{member.phone}</td>
                <td className="px-6 py-4 border-r border-[#D9D9D93B]">{member.startDate}</td>
                <td className="px-6 py-4 border-r border-[#D9D9D93B]">{member.jobType}</td>
                <td className="text-center py-4">
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 cursor-pointer"
                    onClick={() => deleteMember(member.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Employee Button */}
      <div className="flex justify-end mt-4">
        <button
          className="bg-customBlue text-black font-light px-5 py-1 rounded-lg hover:bg-customHoverBlue"
          onClick={openModal}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Employee
        </button>
      </div>

      {/* Add Employee Modal */}
      {isModalOpen && <AddEmployeeModal closeModal={closeModal} addNewMember={addNewMember} />}
    </div>
  );
};

export default Employee;
