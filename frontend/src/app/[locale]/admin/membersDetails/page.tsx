import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";

interface MemberDetailsProps {
  memberId: string;
  onClose: () => void;
}

interface Member {
  id: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
  email: string | null;
  address: string;
  dob: string;
  emergencyContact: string;
  firstRegisteredAt: string;
  startDate: string;
  totalAttendance: number;
  remainingDays: number;
  countDown: number;
  height: number | null;
  weight: number | null;
  bmi: string;
  healthConditions: string | null;
  level: string | null;
  goal: string | null;
  status: string;
  freezeDate: string | null;
  profileImageUrl: string;
  attendance: any[];
  service: {
    period: number;
    maxDays: number;
  };
  barcode: string;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ memberId, onClose }) => {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/memberManagement/${memberId}/profile`
        );
        if (response.data.success) {
          setMember(response.data.data);
        } else {
          setError("Failed to fetch member data");
        }
      } catch (error) {
        setError("An error occurred while fetching member data");
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [memberId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!member) return <div className="text-red-500">Member not found</div>;

  return (
    <div className="text-white rounded-lg mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold p-1">Gym Member</h1>
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="bg-customBlue px-6 py-2 rounded text-black"
          >
            Back to Home
          </button>
        </div>
      </div>

      <div className="flex space-x-8 pt-10">
        {/* Left section with profile image and personal details */}
        <div>
          <div className="flex items-center mb-8 space-x-4 bg-[#111111] p-4 rounded-lg">
            <div className="w-24 h-24 rounded-full bg-gray-700">
              <img
                src={member.profileImageUrl || "/path/to/default-image.jpg"}
                alt="Profile"
                className="w-full h-full rounded-full"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{member.fullName}</h2>
              <p className="text-blue-400">{member.gender}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 bg-[#111111] p-4 rounded-lg">
            <p>
              <span className="text-gray-400">Phone number:</span> {member.phoneNumber}
            </p>
            <p>
              <span className="text-gray-400">Email Address:</span> {member.email || "N/A"}
            </p>
            <p>
              <span className="text-gray-400">Address:</span> {member.address}
            </p>
            <p>
              <span className="text-gray-400">DOB:</span> {member.dob ? member.dob.substring(0, 10) : "N/A"}
            </p>
            <p>
              <span className="text-gray-400">Emergency Contact:</span> {member.emergencyContact || "N/A"}
            </p>
          </div>
        </div>

        {/* Right section with membership and health info */}
        <div className="flex-1 space-y-8">
          {/* Membership type and dates */}
          <div className="flex items-center justify-around bg-[#111111] p-5 rounded-lg">
            <div className="text-center border border-[#111111] px-4 rounded-lg bg-[#1B1B1B] p-4">
              <p className="text-customBlue text-center font-semibold px-2 py-1 rounded-md inline-block">
                {member.status || "N/A"}
              </p>
              <p className="text-white">Membership Status</p>
            </div>
            <div className="text-center border border-[#111111] px-4 rounded-lg bg-[#1B1B1B] p-2">
              <p className="text-customBlue text-center font-semibold">
                {member.countDown || "N/A"} days left
              </p>
              <p className="text-white">Due Date</p>
            </div>
            <div className="text-center border border-[#111111] px-4 rounded-lg bg-[#1B1B1B] p-4">
              <p className="text-customBlue text-center font-semibold">
                {member.startDate || "N/A"}
              </p>
              <p className="text-white">Member Since</p>
            </div>
          </div>

          {/* Attendance, weight, height, BMI */}
          <div className="grid grid-cols-5 gap-2 bg-[#111111] p-4 rounded-lg text-center">
            <div>
              <p className="text-lg font-bold">Details</p>
            </div>
            <div>
              <p className="text-3xl text-customBlue font-jost font-extrabold">
                {member.totalAttendance}
              </p>
              <p className="text-xs text-customBlue">Days</p>
              <p className="text-gray-400">Total Attendance</p>
            </div>
            <div>
              <p className="text-3xl text-customBlue font-jost font-extrabold">
                {member.weight}
              </p>
              <p className="text-xs text-customBlue">kg</p>
              <p className="text-gray-400">Weight</p>
            </div>
            <div>
              <p className="text-3xl text-customBlue font-jost font-extrabold">
                {member.height}
              </p>
              <p className="text-xs text-customBlue">cm</p>
              <p className="text-gray-400">Height</p>
            </div>
            <div>
              <p className="text-3xl text-customBlue font-jost font-extrabold">
                {member.bmi}
              </p>
              <p className="text-xs text-customBlue">Kg/m²</p>
              <p className="text-gray-400">BMI</p>
            </div>
          </div>

          {/* Health Information */}
          <div className="bg-[#111111] p-4 rounded-lg flex">
            <h3 className="text-lg font-bold mb-2">Health Info.</h3>
            <div>
              <p>
                <span className="text-gray-400">Medical conditions:</span> {member.healthConditions || "N/A"}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="bg-[#111111] p-4 rounded-lg flex">
            <h3 className="text-lg font-bold mb-2">Status</h3>
            <div>
              <p>
                <span className="text-gray-400">Level:</span> {member.level || "N/A"}
              </p>
              <p>
                <span className="text-gray-400">Goal:</span> {member.goal || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const memberId = "4"; // Replace with dynamic member ID
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="h-screen bg-dark-background">
      <AdminSidebar setActiveNav={function (nav: string): void {
        throw new Error("Function not implemented.");
      }} />
      <AdminHeader activeNav={""} />
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <MemberDetails memberId={memberId} onClose={handleClose} />
        </div>
      )}
      <button
        onClick={handleOpen}
        className="bg-customBlue px-6 py-2 rounded text-black"
      >
        Show Member Details
      </button>
    </div>
  );
};

export default Page;
