import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";


interface Service {
  name: string;
  period: number;
  maxDays: number;
}

interface Attendance {
  date: string;
}

interface User {
  id: string;
  barcode: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
  email: string | null;
  address: string | null;
  dob: string | null;
  emergencyContact: string | null;
  firstRegisteredAt: string;
  startDate: string;
  totalAttendance: number;
  preFreezeAttendance: number;
  preFreezeDaysCount: number;
  daysLeft: number;
  height: number | null;
  weight: number | null;
  bmi: number | null;
  healthConditions: string | null;
  level: string | null;
  goal: string | null;
  role: string;
  password: string;
  status: string;
  freezeDate: string | null;
  createdAt: string;
  updatedAt: string;
  serviceId: string | null;
  profileImageUrl: string | null;
  attendance: Attendance[];
  service: Service;
}

interface MemberDetailsProps {
  memberId: string;
  onClose: () => void;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ memberId, onClose }) => {
  const [memberDetails, setMemberDetails] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false); // Define the isZoomed state

  useEffect(() => {
    const fetchMemberDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:5000/api/memberManagement/${memberId}/profile`);
        if (!response.ok) {
          throw new Error("Failed to fetch member details");
        }

        const data = await response.json();
        if (data.success) {
          setMemberDetails(data.data.user);
        } else {
          setError(data.message || "Failed to load member details");
        }
      } catch (err: any) {
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (memberId) {
      fetchMemberDetails();
    }
  }, [memberId]);

  if (loading) {
    return <div>Loading member details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!memberDetails) {
    return <div>No member details available.</div>;
  }
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(`Member Details - ${memberDetails.fullName}`, 10, 10);

    // Add member details
    doc.setFontSize(12);
    doc.text(`Phone Number: ${memberDetails.phoneNumber}`, 10, 20);
    doc.text(`Email: ${memberDetails.email || "N/A"}`, 10, 30);
    doc.text(`Address: ${memberDetails.address || "N/A"}`, 10, 40);
    doc.text(`Date of Birth: ${memberDetails.dob ? new Date(memberDetails.dob).toLocaleDateString() : "N/A"}`, 10, 50);
    doc.text(`Emergency Contact: ${memberDetails.emergencyContact || "N/A"}`, 10, 60);

    // Add health information (you can adjust this part based on your structure)
    doc.text(`Health Conditions: ${memberDetails.healthConditions || "N/A"}`, 10, 70);
    doc.text(`Goal: ${memberDetails.goal || "N/A"}`, 10, 80);

    // Add service info
    doc.text(`Service: ${memberDetails.service.name || "No Service Assigned"}`, 10, 90);
    doc.text(`Days Left: ${memberDetails.daysLeft}`, 10, 100);

    // Add attendance, weight, height, BMI info
    doc.text(`Total Attendance: ${memberDetails.totalAttendance} days`, 10, 110);
    doc.text(`Weight: ${memberDetails.weight || "N/A"} kg`, 10, 120);
    doc.text(`Height: ${memberDetails.height || "N/A"} cm`, 10, 130);
    doc.text(`BMI: ${memberDetails.bmi || "N/A"} kg/m²`, 10, 140);

    // Save the document
    doc.save(`${memberDetails.fullName}_details.pdf`);
  };
  const handleBarcodeDownload = () => {
    if (window.confirm("Do you want to download the barcode?")) {
      const link = document.createElement("a");
      link.href = memberDetails.barcode;
      link.download = `${memberDetails.fullName}_barcode.png`; // You can customize the filename
      link.click();
    }
  };



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
        <div className="w-96">
          <div className="flex items-center mb-8 space-x-4 bg-[#111111] p-4 rounded-lg">
            <div
              className="w-24 h-24 rounded-full bg-gray-700 cursor-pointer"
              onClick={() => setIsZoomed(!isZoomed)} // Toggling the zoom state
            >
              <img
                src={`http://localhost:5000${memberDetails.profileImageUrl}`}
                alt="Profile"
                className={`w-full h-full rounded-full transition-transform ${isZoomed ? "scale-150" : "scale-100"}`}
              />
            </div>

            <div>
              <h2 className="text-sm text-white font-bold">{memberDetails.fullName}</h2>
              <p className="text-customBlue text-xs">{memberDetails.gender}</p>
            </div>

            <div className="w-48 h-10">
              <img
                src={memberDetails.barcode} 
                alt="barcode"
                className="h-full w-full filter contrast-125 cursor-pointer"
                onClick={handleBarcodeDownload}
              />
            </div>

          </div>

          <div className="grid grid-cols-1 gap-4 bg-[#111111] p-4 rounded-lg pb-52">
            <p className="flex justify-between">
              <span className="text-gray-400 text-[10px]">Phone number:</span>
              <span className="text-[11px]">{memberDetails.phoneNumber}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400 text-[10px]">Email Address:</span>
              <span className="text-[11px]">{memberDetails.email || "N/A"}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400 text-[10px]">Address:</span>
              <span className="text-[11px]">{memberDetails.address || "N/A"}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400 text-[10px]">DOB:</span>
              <span className="text-[11px]">{memberDetails.dob ? new Date(memberDetails.dob).toLocaleDateString() : "N/A"}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400 text-[10px]">Emergency Contact:</span>
              <span className="text-[11px]">{memberDetails.emergencyContact || "N/A"}</span>
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-8">
          <div className="flex items-center gap-4 bg-[#111111] p-5 rounded-lg">
            <div className="text-center border border-[#111111] px-6 rounded-lg bg-[#1B1B1B] p-4">
              <p className="text-customBlue text-center text-xs font-bold px-2 py-1 rounded-md inline-block">
                {memberDetails.service.name || "No Service Assigned"}
              </p>
              <p className="text-white text-[10px]">Service</p>
            </div>
            <div className="text-center border border-[rgb(17,17,17)] p-4 rounded-lg bg-[#1B1B1B]">
              <p className="text-customBlue text-xs font-bold text-center">{memberDetails.daysLeft}</p>
              <p className="text-white text-[10px]">Days Left</p>
            </div>
            <div className="text-center border border-[#111111] px-6 rounded-lg bg-[#1B1B1B] p-4">
              <p className="text-customBlue text-center text-xs font-bold">
                {new Date(memberDetails.firstRegisteredAt).toLocaleDateString()}
              </p>
              <p className="text-white text-[10px]">Member Since</p>
            </div>
            <button className="bg-[#4BBE25] hover:bg-[#4bbe25cf] px-5 py-2 rounded text-[10px] text-black">
              {memberDetails.status}
            </button>
            <button
              onClick={generatePDF}
              className="bg-customBlue hover:bg-customHoverBlue px-5 py-2 rounded text-[10px] text-black"
            >
              Download
            </button>

          </div>

          <div className="bg-[#111111] pb-6">
            <div className="flex justify-between bg-[#111111] p-4 px-8 rounded-lg text-center">
              <div>
                <p className="text-sm font-bold">Details</p>
              </div>
              <div>
                <p className="text-[20px] text-customBlue font-jost font-extrabold">
                  {memberDetails.totalAttendance}
                </p>
                <p className="text-[8px] text-customBlue">Days</p>
                <p className="text-gray-400 text-[10px]">Total Attendance</p>
              </div>
              <div>
                <p className="text-[20px] text-customBlue font-jost font-extrabold">
                  {memberDetails.weight || "N/A"}
                </p>
                <p className="text-[8px] text-customBlue">kg</p>
                <p className="text-gray-400 text-[10px]">Weight</p>
              </div>
              <div>
                <p className="text-[20px] text-customBlue font-jost font-extrabold">
                  {memberDetails.height || "N/A"}
                </p>
                <p className="text-[8px] text-customBlue">cm</p>
                <p className="text-gray-400 text-[10px]">Height</p>
              </div>
              <div>
                <p className="text-[20px] text-customBlue font-jost font-extrabold">
                  {memberDetails.bmi || "N/A"}
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
                    <span className="text-[8px]">{memberDetails.healthConditions || "N/A"}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-gray-400 text-[10px]">Allergies:</span>
                    <span className="flex-grow border-dotted border-b border-gray-400 mx-2"></span>
                    <span className="text-[8px]">{memberDetails.goal || "N/A"}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-gray-400 text-[10px]">Injuries:</span>
                    <span className="flex-grow border-dotted border-b border-gray-400 mx-2"></span>
                    <span className="text-[8px]">{memberDetails.goal || "N/A"}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-gray-400 text-[10px]">Medications:</span>
                    <span className="flex-grow border-dotted border-b border-gray-400 mx-2"></span>
                    <span className="text-[8px]">{memberDetails.goal || "N/A"}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 py-6">
              <div className="bg-[#1B1B1B] p-4 rounded-lg flex space-x-20">
                <h3 className="text-xl font-bold">Status</h3>
                <div className="w-full">
                  <p className="flex items-center justify-between">
                    <span className="text-gray-400 text-[10px]">Level:</span>
                    <span className="flex-grow border-dotted border-b border-gray-400 mx-2"></span>
                    <span className="text-[10px]">{memberDetails.level || "N/A"}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-gray-400 text-[10px]">Goal:</span>
                    <span className="flex-grow border-dotted border-b border-gray-400 mx-2"></span>
                    <span className="text-[10px]">{memberDetails.goal || "N/A"}</span>
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
