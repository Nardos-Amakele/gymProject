import React, { useEffect, useState } from "react";
import axios from "axios";
import { dashboardData } from "../../../../../assets/data/dashboardData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserTie,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import PieChartComponent from "./PieChartComponent";
import BarChartComponent from "./BarChartComponent";

type Member = {
  id: string;
  fullName: string;
  phoneNumber: string;
  level: string;
  status: string;
};

const getIcon = (label: string) => {
  switch (label) {
    case "totalMembers":
      return faUser;
    case "totalEmployees":
      return faUserTie;
    case "newMembers":
      return faUserPlus;
    default:
      return faUser;
  }
};

const DashboardContent: React.FC = () => {
  const [pendingMembers, setPendingMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPendingMembers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/members");
        if (response.data.success) {
          const pending = response.data.data.users.filter(
            (user: Member) => user.status === "pending"
          );
          setPendingMembers(pending);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchPendingMembers();
  }, []);

  const handleStatusChange = async () => {
    if (!selectedMember) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/memberManagement/${selectedMember.id}/status`,
        {
          status: "active",
          startDate: new Date(),
        }
      );

      if (response.data.success) {
        setPendingMembers((prev) =>
          prev.filter((member) => member.id !== selectedMember.id)
        );
        setIsModalOpen(false);
        setSelectedMember(null);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-screen">
      <div className="flex flex-col gap-6 lg:w-1/2">
        {/* Stats Section */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Object.entries(dashboardData.stats).map(([label, value]) => (
            <div
              key={label}
              className="bg-[#121212] border border-[#23363f] py-3 px-4 rounded-lg text-center text-white flex-1"
            >
              <FontAwesomeIcon
                icon={getIcon(label)}
                className="text-2xl mb-2 text-customBlue"
              />
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs font-light pt-1">
                {label.replace(/([A-Z])/g, " $1").trim()}
              </p>
            </div>
          ))}
        </div>

        {/* Pending Members Section */}
        <div className="text-white mt-5">
          <h2 className="text-lg font-bold mb-4">Pending Members</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border-none text-sm">
              <thead>
                <tr>
                  <th className="text-left font-semibold py-2">Name</th>
                  <th className="text-left font-semibold py-2">Phone</th>
                  <th className="text-left font-semibold py-2">Type</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {pendingMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-[#333]">
                    <td className="text-zinc-600 text-tiny md:text-small font-medium py-2">
                      {member.fullName}
                    </td>
                    <td className="text-zinc-600 text-tiny md:text-small font-medium py-2">
                      {member.phoneNumber}
                    </td>
                    <td className="text-zinc-600 text-tiny md:text-small font-medium py-2">
                      {member.status}
                    </td>
                    <td className="py-2">
                      <button
                        className="w-5 h-5 flex justify-center items-center border-2 border-customBlue rounded text-customBlue hover:bg-customBlue hover:text-white transition"
                        onClick={() => {
                          setSelectedMember(member);
                          setIsModalOpen(true);
                        }}
                      >
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex flex-col lg:w-1/2">
        <div className="bg-[#121212] rounded-lg p-4">
          <PieChartComponent />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4">Attendance</h2>
          <BarChartComponent />
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#121212] p-6 rounded-lg text-white max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              Confirm Status Update
            </h2>
            <p className="text-sm mb-6">
              Are you sure you want to update the status of{" "}
              <span className="font-semibold">
                {selectedMember.fullName}
              </span>{" "}
              to active?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-customBlue text-white rounded hover:bg-customHoverBlue transition"
                onClick={handleStatusChange}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
