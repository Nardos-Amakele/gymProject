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
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

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
          <button className="bg-customBlue hover:bg-customHoverBlue px-5 py-2 rounded text-[10px] text-black">
            Edit Profile
          </button>
          <button
            onClick={onClose}
            className="bg-customBlue hover:bg-customHoverBlue px-5 py-2 rounded text-[10px] text-black"
          >
            Back to Home
          </button>
        </div>
      </div>

      <div className="flex space-x-8 pt-10">
        <div className="w-96 ">
          <div className="flex items-center mb-8 space-x-4 bg-white p-4 rounded-lg ">
            <div
              className="w-24 h-24 rounded-full bg-gray-700 cursor-pointer"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={`http://localhost:5000${member.profileImageUrl}`}
                alt="Profile"
                className={`w-full h-full rounded-full transition-transform ${isZoomed ? "scale-150" : "scale-100"
                  }`}
              />
            </div>

            <div>
              <h2 className="text-sm text-black font-bold">
                {member.fullName}
              </h2>
              <p className="text-customBlue text-xs">{member.gender}</p>
            </div>
            <div className="w-48 h-10">
              <img
                src={member.barcode}
                alt="barcode"
                className="h-full w-full filter contrast-125"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 bg-[#111111] p-4 rounded-lg pb-52">
            <p className="flex justify-between">
              <span className="text-gray-400 text-[10px]">Phone number:</span>
              <span className="text-[11px]">{member.phoneNumber}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400 text-[10px]">Email Address:</span>
              <span className="text-[11px]">{member.email || "N/A"}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400 text-[10px]">Address:</span>
              <span className="text-[11px]">{member.address}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400 text-[10px]">DOB:</span>
              <span className="text-[11px]">{member.dob.substring(0, 10)}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400 text-[10px]">Emergency Contact:</span>
              <span className="text-[11px]">{member.emergencyContact || "N/A"}</span>
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-8">
          <div className="flex items-center gap-4 bg-[#111111] p-5 rounded-lg">
            <div className="text-center border border-[#111111] px-6 rounded-lg bg-[#1B1B1B] p-4">
              <p className="text-customBlue text-center text-xs font-bold px-2 py-1 rounded-md inline-block">
                {member.service.name || "N/A"}
              </p>
              <p className="text-white text-[10px]">Membership Type</p>
            </div>
            <div className="text-center border border-[rgb(17,17,17)]  p-4 rounded-lg bg-[#1B1B1B] ">
              <p className="text-customBlue text-xs font-bold text-center ">
                {member.countDown}
              </p>
              <p className="text-white text-[10px]">Days Left</p>
            </div>
            <div className="text-center border border-[#111111]  px-6 rounded-lg bg-[#1B1B1B] p-4">
              <p className="text-customBlue text-center text-xs font-bold ">
                {member.firstRegisteredAt.substring(0, 10)}
              </p>
              <p className="text-white text-[10px]">Member Since</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-customBlue text-[10px] hover:bg-customHoverBlue p-2 rounded text-black px-6">
                Freeze Account
              </button>
              <button className="bg-customBlue text-[10px] hover:bg-customHoverBlue p-2 rounded text-black px-6">
                Download
              </button>
            </div>
          </div>

          <div className="bg-[#111111] pb-6">
            <div className="flex justify-between bg-[#111111] p-4 px-8 rounded-lg text-center">
              <div>
                <p className="text-sm font-bold">Details</p>
              </div>
              <div>
                <p className="text-[20px] text-customBlue font-jost font-extrabold">
                  {member.totalAttendance}
                </p>
                <p className="text-[8px] text-customBlue">Days</p>
                <p className="text-gray-400 text-[10px]">Total Attendance</p>
              </div>
              <div>
                <p className="text-[20px] text-customBlue font-jost font-extrabold">
                  {member.weight || "N/A"}
                </p>
                <p className="text-[8px] text-customBlue">kg</p>
                <p className="text-gray-400 text-[10px]">Weight</p>
              </div>
              <div>
                <p className="text-[20px] text-customBlue font-jost font-extrabold">
                  {member.height || "N/A"}
                </p>
                <p className="text-[8px] text-customBlue">cm</p>
                <p className="text-gray-400 text-[10px]">Height</p>
              </div>
              <div>
                <p className="text-[20px] text-customBlue font-jost font-extrabold">
                  N/A
                </p>
                <p className="text-[8px] text-customBlue">Kg/m²</p>
                <p className="text-gray-400 text-[10px]">BMI</p>
              </div>
            </div>

            <div className="px-6 py-6">
              <div className="bg-[#1B1B1B] p-4 rounded-lg flex space-x-20">
                <h3 className="text-xl font-bold">Health Info.</h3>
                <div className="w-full">
                  <p className="flex items-center justify-between">
                    <span className="text-gray-400 text-[10px]">Medical conditions:</span>
                    <span className="flex-grow border-dotted border-b border-gray-400 mx-2"></span>
                    <span className="text-[8px]">{member.healthConditions || "N/A"}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-gray-400 text-[10px]">Allergies:</span>
                    <span className="flex-grow border-dotted border-b border-gray-400 mx-2"></span>
                    <span className="text-[8px]">{member.goal || "N/A"}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-gray-400 text-[10px]">Injuries:</span>
                    <span className="flex-grow border-dotted border-b border-gray-400 mx-2"></span>
                    <span className="text-[8px]">{member.goal || "N/A"}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-gray-400 text-[10px]">Medications:</span>
                    <span className="flex-grow border-dotted border-b border-gray-400 mx-2"></span>
                    <span className="text-[8px]">{member.goal || "N/A"}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-6">
              <div className="bg-[#1B1B1B] p-4 rounded-lg flex space-x-20">
                <h3 className="text-xl font-bold">Health Info.</h3>
                <div className="w-full">
                  <p className="flex items-center justify-between">
                    <span className="text-gray-400 text-[10px]">Level:</span>
                    <span className="flex-grow border-dotted border-b border-gray-400 mx-2"></span>
                    <span className="text-[10px]">{member.level || "N/A"}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-gray-400 text-[10px]">Goal:</span>
                    <span className="flex-grow border-dotted border-b border-gray-400 mx-2"></span>
                    <span className="text-[10px]">{member.goal || "N/A"}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setIsZoomed(false)}
        >
          <img
            src={`http://localhost:5000${member.profileImageUrl}`}
            alt="Zoomed Profile"
            className="max-w-full max-h-screen rounded-lg"
          />
        </div>
      )}

    </div>
  );
};

export default MemberDetails;
