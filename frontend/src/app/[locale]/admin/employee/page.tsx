"use client";
import { faFilter, faSearch, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useCallback } from "react";
import AddEmployeeModal from "../components/AddEmployeeForm";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import axios from "axios";


// Define the type for the Employee member
interface Member {
  id: string;
  name: string;
  phone: string;
  startDate: string;
  jobType: string;
  profileImage?: string; 
}
const Employee = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);




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
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // Function to add a new member and immediately fetch updated members
  const addNewMember = async (newMember: Member):Promise<void> => {
    try {
      const response = await axios.post("http://localhost:5000/api/employees/", newMember);
  
      if (response.data.success) {
        await fetchEmployees(); // Refresh employee list
        closeModal();
      } else {
        setModalError(response.data.message || "Failed to add employee. Please try again.");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      setModalError(errorMessage);
    }
  };
  


  const cancelDelete = () => {
    setMemberToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = (member: Member) => {
    setMemberToDelete(member);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!memberToDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${memberToDelete.id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      if (data.success) {
        fetchEmployees();
      } else {
        console.error("Error deleting employee:", data.message);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    } finally {
      setMemberToDelete(null);
      setIsDeleteModalOpen(false);
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
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
    <h1 className="text-lg sm:text-2xl font-bold text-black">Employees</h1>
    <div className="flex flex-row items-center space-x-4 ">
      {/* Search Input */}
      <div className="relative w-full sm:w-auto">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FontAwesomeIcon icon={faSearch} className="text-customBlue text-base sm:text-xl" />
        </span>
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 px-6 py-2 rounded-md bg-[#ffffff29] text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-customBlue"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filter Icon */}
      <div className="relative">
        <div className="bg-[#ffffff29] px-4 py-2 rounded-md border border-gray-600">
          <FontAwesomeIcon
            icon={faFilter}
            className="text-customBlue text-base sm:text-xl cursor-pointer"
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
    <table className="hidden sm:table w-full text-sm text-left text-gray-400">
      <thead className="bg-black text-gray-300 uppercase">
        <tr>
        <th scope="col" className="px-6 py-3 border-b border-t border-[#D9D9D93B]">Photo</th>
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
                            <td>
                  <img
                    src={typeof member.profileImage === 'string' ? member.profileImage : "/placeholder.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  /> </td>

            <td className="px-6 py-4 border-r border-[#D9D9D93B]">{member.name}</td>
            <td className="px-6 py-4 border-r border-[#D9D9D93B]">{member.phone}</td>
            <td className="px-6 py-4 border-r border-[#D9D9D93B]">{member.startDate}</td>
            <td className="px-6 py-4 border-r border-[#D9D9D93B]">{member.jobType}</td>
            <td className="text-center py-4">
              <FontAwesomeIcon
                icon={faTrash}
                className="text-red-500 cursor-pointer"
                onClick={() => confirmDelete(member)}
                />
            </td>
          </tr>
        ))}
      </tbody>
    </table>



    {/* Responsive Cards for Small Screens */}
    <div className="sm:hidden">
      {filteredMembers.map((member) => (
        <div
          key={member.id}
          className="mb-4 p-4 bg-[#1d1d1d] rounded-md border border-[#D9D9D93B]"
        >
          <div className="flex justify-between">
            <h3 className="text-lg font-bold text-white">{member.name}</h3>
            <FontAwesomeIcon
              icon={faTrash}
              className="text-red-500 cursor-pointer"
              onClick={() => confirmDelete(member)}
              />
          </div>
          <p className="text-sm text-gray-300">Phone: {member.phone}</p>
          <p className="text-sm text-gray-300">Start Date: {member.startDate}</p>
          <p className="text-sm text-gray-300">Job Type: {member.jobType}</p>
        </div>
      ))}
    </div>
  </div>

  {/* Add Employee Button */}
  <div className="flex justify-center sm:justify-end mt-4">
    <button
      className="bg-customBlue text-black font-light px-5 py-1 rounded-lg hover:bg-customHoverBlue"
      onClick={openModal}
    >
      <FontAwesomeIcon icon={faPlus} className="mr-2" />
      Add Employee
    </button>
  </div>

  {/* Add Employee Modal */}
  {isModalOpen && (
        <AddEmployeeModal
        closeModal={closeModal} 
        addNewMember={addNewMember} 
        errorModal={modalError} 
        errorMessage={modalError} 
              />
      )}
        {/* Delete Confirmation Modal */}
        <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={memberToDelete?.name}
      />

</div>

  );
};

export default Employee;
