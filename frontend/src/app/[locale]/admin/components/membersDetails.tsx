"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

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
  attendance: number;
  service: {
    name: string;
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
    <div className="text-white rounded-lg p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold p-1">Gym Member</h1>
        <div className="flex space-x-4">
          {/* <button className="bg-customBlue hover:bg-customHoverBlue px-6 py-2 rounded text-black">
            Edit Profile
          </button> */}
          <button
            onClick={onClose}
            className="bg-customBlue hover:bg-customHoverBlue px-6 py-2 rounded text-black"
          >
            Back to Home
          </button>
        </div>
      </div>

      <div className="flex space-x-8 pt-10">
        <div className="w-96 ">
          <div className="flex items-center mb-8 space-x-4 bg-white p-4 rounded-lg ">
            <div className="w-24 h-24 rounded-full bg-gray-700">
              <img
                src={`http://localhost:5000${member.profileImageUrl}`}
                alt="Profile"
                className="w-full h-full rounded-full"
              />
            </div>
            <div>
              <h2 className="text-2xl text-black font-bold">
                {member.fullName}
              </h2>
              <p className="text-customBlue">{member.gender}</p>
            </div>
            <div className="w-48 h-10">
              <img
                src={member.barcode}
                alt="barcode"
                className="h-full w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 bg-[#111111] p-4 rounded-lg">
            <p className="flex justify-between">
              <span className="text-gray-400">Phone number:</span>
              <span>{member.phoneNumber}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400">Email Address:</span>
              <span>{member.email || "N/A"}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400">Address:</span>
              <span>{member.address}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400">DOB:</span>
              <span>{member.dob.substring(0, 10)}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400">Emergency Contact:</span>
              <span>{member.emergencyContact || "N/A"}</span>
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-8">
          <div className="flex items-center justify-around bg-[#111111] p-5 rounded-lg">
            <div className="text-center border border-[#111111] px-4 rounded-lg bg-[#1B1B1B] p-4">
              <p className="text-customBlue text-center text-3xl font-bold px-2 py-1 rounded-md inline-block">
                {member.service.name || "N/A"}
              </p>
              <p className="text-white">Membership Type</p>
            </div>
            <div className="text-center border border-[rgb(17,17,17)]  p-8 rounded-lg bg-[#1B1B1B] ">
              <p className="text-customBlue text-3xl font-bold text-center ">
                {member.countDown}
              </p>
              <p className="text-white">Days Left</p>
            </div>
            <div className="text-center border border-[#111111]  px-4 rounded-lg bg-[#1B1B1B] p-4">
              <p className="text-customBlue text-center text-3xl font-bold ">
                {member.firstRegisteredAt.substring(0, 10)}
              </p>
              <p className="text-white">Member Since</p>
            </div>
            {/* <button className="bg-customBlue hover:bg-customHoverBlue p-2 rounded text-black px-4">
              Freeze Account
            </button>
            <button className="bg-customBlue hover:bg-customHoverBlue p-2 rounded text-black px-4">
              Download
            </button> */}
          </div>

          <div className="bg-[#111111] pb-6">
            <div className="flex justify-between bg-[#111111] p-4 px-8 rounded-lg text-center">
              <div>
                <p className="text-[14px] font-bold">Details</p>
              </div>
              <div>
                <p className="text-2xl text-customBlue font-jost font-extrabold">
                  {member.totalAttendance}
                </p>
                <p className="text-xs text-customBlue">Days</p>
                <p className="text-gray-400">Total Attendance</p>
              </div>
              <div>
                <p className="text-2xl text-customBlue font-jost font-extrabold">
                  {member.weight || "N/A"}
                </p>
                <p className="text-xs text-customBlue">kg</p>
                <p className="text-gray-400">Weight</p>
              </div>
              <div>
                <p className="text-2xl text-customBlue font-jost font-extrabold">
                  {member.height || "N/A"}
                </p>
                <p className="text-xs text-customBlue">cm</p>
                <p className="text-gray-400">Height</p>
              </div>
              <div>
                <p className="text-2xl text-customBlue font-jost font-extrabold">
                  N/A
                </p>
                <p className="text-xs text-customBlue">Kg/m²</p>
                <p className="text-gray-400">BMI</p>
              </div>
            </div>

            <div className="px-6 py-6">
              <div className="bg-[#1B1B1B] p-4 rounded-lg flex space-x-20">
                <h3 className="text-[24px] font-bold">Health Info.</h3>
                <div className="w-full">
                  <p className="flex items-center justify-between">
                    <span className="text-gray-400">Medical conditions:</span>
                    <span className="flex-grow border-dotted border-b border-gray-400 mx-2"></span>
                    <span>{member.healthConditions || "N/A"}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-gray-400">Allergies:</span>
                    <span className="flex-grow border-dotted border-b border-gray-400 mx-2"></span>
                    <span>{member.goal || "N/A"}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-gray-400">Injuries:</span>
                    <span className="flex-grow border-dotted border-b border-gray-400 mx-2"></span>
                    <span>{member.goal || "N/A"}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-gray-400">Medications:</span>
                    <span className="flex-grow border-dotted border-b border-gray-400 mx-2"></span>
                    <span>{member.goal || "N/A"}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-6">
              <div className="bg-[#1B1B1B] p-4 rounded-lg flex space-x-20">
                <h3 className="text-[24px] font-bold">Health Info.</h3>
                <div className="w-full">
                  <p className="flex items-center justify-between">
                    <span className="text-gray-400">Level:</span>
                    <span className="flex-grow border-dotted border-b border-gray-400 mx-2"></span>
                    <span>{member.level || "N/A"}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-gray-400">Goal:</span>
                    <span className="flex-grow border-dotted border-b border-gray-400 mx-2"></span>
                    <span>{member.goal || "N/A"}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
