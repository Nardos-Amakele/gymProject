import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons"; // Importing filter and search icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { members as membersData, Member } from "../../../../../assets/data/employeesData"; // Importing the data

const Employee = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility

  // Filter members by name and job type
  const filteredMembers = membersData.filter((member: Member) => {
    const matchesName = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesJobType = selectedJobType === "All" || member.jobType === selectedJobType;
    return matchesName && matchesJobType;
  });

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleJobTypeSelect = (jobType: string) => {
    setSelectedJobType(jobType);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-customBlue">Employees</h1>
        <div className="flex items-center">
          {/* Search Input */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-customBlue text-xl" 
              />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 px-4 py-2 rounded-md bg-[#ffffff29] text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-customBlue"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Icon */}
          <div className="relative ml-4">
            <div className="bg-[#ffffff29] px-4 py-2 rounded-md border border-gray-600">
            <FontAwesomeIcon
              icon={faFilter}
              className="text-customBlue  text-xl cursor-pointer"
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
                  <hr></hr>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                    onClick={() => handleJobTypeSelect("Janitor")}
                  >
                    Janitor
                  </li>
                  <hr></hr>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                    onClick={() => handleJobTypeSelect("Trainer")}
                  >
                    Trainer
                  </li>
                  <hr></hr>
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
          <thead className="bg-[#ffffff29] text-gray-300 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Phone no.</th>
              <th scope="col" className="px-6 py-3">Start Date</th>
              <th scope="col" className="px-6 py-3">Job Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member: Member, index) => (
              <tr
                key={index}
                className={`border-b border-gray-700 ${
                  index % 2 === 0 ? "bg-black" : "bg-black"
                }`}
              >
                <td className="px-6 py-4">{member.name}</td>
                <td className="px-6 py-4">{member.phone}</td>
                <td className="px-6 py-4">{member.startDate}</td>
                <td className="px-6 py-4">{member.jobType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
