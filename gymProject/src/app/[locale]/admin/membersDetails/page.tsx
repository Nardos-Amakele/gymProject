"use client"
// src/components/MemberDetails.tsx
import React from 'react';
import { Member, members } from '@/assets/data/membersData';
import AdminSidebar from '../components/AdminSideBar';
import AdminHeader from '../components/AdminHeader';

interface MemberDetailsProps {
    member?: Member; // Make member optional
    onClose: () => void;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ member, onClose }) => {
    // Guard clause for when member is not defined
    if (!member) {
        return <div className="text-red-500">Member not found</div>;
    }

    return (
        <div className=" text-white rounded-lg mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold p-1">Gym Member</h1>
                <div className="flex space-x-4">
                    <button className="bg-customBlue px-6 py-2 rounded text-black ">Edit Profile</button>
                    <button onClick={onClose} className="bg-customBlue px-6 py-2 rounded text-black ">
                        Back to Home
                    </button>
                </div>
            </div>

            <div className="flex space-x-8 pt-10">
                {/* Left section with profile image and personal details */}
                <div>
                    <div className="flex items-center mb-8 space-x-4 bg-[#111111] p-4 rounded-lg">
                        <div className="w-24 h-24 rounded-full bg-gray-700">
                            {/* Uncomment if you have an image for the member */}
                            {/* <img src={member.image || '/path/to/default-image.jpg'} alt="Profile" className="w-full h-full rounded-full" /> */}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{member.name}</h2>
                            <p className="text-blue-400">{member.gender}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 bg-[#111111] p-4 rounded-lg">
                        <p><span className="text-gray-400">Phone number:</span> {member.phoneNumber}</p>
                        <p><span className="text-gray-400">Email Address:</span> {member.email}</p>
                        <p><span className="text-gray-400">Address:</span> {member.address}</p>
                        <p><span className="text-gray-400">DOB:</span> {member.dob}</p>
                        <p><span className="text-gray-400">Emergency Contact:</span> {member.emergencyContact || 'N/A'}</p>
                    </div>
                </div>

                {/* Right section with membership and health info */}
                <div className="flex-1 space-y-8">
                    {/* Membership type and dates */}
                    <div className="flex items-center justify-around bg-[#111111] p-5 rounded-lg">
                        <div className='text-center border border-[#111111] px-4 rounded-lg bg-[#1B1B1B] p-4'>
                            <p className="text-customBlue text-center font-semibold px-2 py-1 rounded-md inline-block">{member.memberType || 'N/A'}</p>
                            <p className="text-white">Membership Type</p>
                        </div>
                        <div className='text-center border border-[#111111] px-4 rounded-lg bg-[#1B1B1B] p-2'>
                            <p className="text-customBlue text-center font-semibold">{member.dueDate || 'N/A'} <br /> days left</p>
                            <p className="text-white">Due Date</p>
                        </div>
                        <div className='text-center border border-[#111111] px-4 rounded-lg bg-[#1B1B1B] p-4'>
                            <p className="text-customBlue text-center font-semibold">{member.memberSince || 'N/A'}</p>
                            <p className="text-white">Member Since</p>
                        </div>
                        <button className="bg-customBlue p-2 rounded text-black px-4 ">Freeze Account</button>
                        <button className="bg-customBlue p-2 rounded text-black px-4">Download</button>
                    </div>

                    {/* Attendance, weight, height, BMI */}
                    <div className='bg-[#111111]'>
                        <div className="grid grid-cols-5 gap-2 bg-[#111111] p-4 rounded-lg text-center">
                            <div><p className="text-lg font-bold">Details</p></div>
                            <div>
                                <p className="text-3xl text-customBlue font-jost font-extrabold">{member.attendance}</p>
                                <p className="text-xs text-customBlue">Days</p>
                                <p className=" text-gray-400">Total Attendance</p>
                            </div>
                            <div>
                                <p className="text-3xl text-customBlue font-jost font-extrabold">{member.weight}</p>
                                <p className="text-xs text-customBlue">kg</p>
                                <p className=" text-gray-400">Weight</p>
                            </div>
                            <div>
                                <p className="text-3xl text-customBlue font-jost font-extrabold">{member.height}</p>
                                <p className="text-xs text-customBlue">cm</p>
                                <p className=" text-gray-400">Height</p>
                            </div>
                            <div>
                                <p className="text-3xl text-customBlue font-jost font-extrabold">{member.bmi}</p>
                                <p className="text-xs text-customBlue">Kg/m²</p>
                                <p className=" text-gray-400">BMI</p>
                            </div>
                        </div>


                        {/* Health Information */}
                        <div className="bg-[#111111] p-4 rounded-lg flex">
                            <h3 className="text-lg font-bold mb-2">Health Info.</h3>
                            <div>
                                <p><span className="text-gray-400">Medical conditions:</span> {member.healthInfo?.conditions?.join(', ') || 'N/A'}</p>
                                <p><span className="text-gray-400">Allergies:</span> {member.healthInfo?.allergies?.join(', ') || 'N/A'}</p>
                                <p><span className="text-gray-400">Injuries:</span> {member.healthInfo?.injuries?.join(', ') || 'N/A'}</p>
                                <p><span className="text-gray-400">Medications:</span> {member.healthInfo?.medications?.join(', ') || 'N/A'}</p>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="bg-[#111111] p-4 rounded-lg flex">
                            <h3 className="text-lg font-bold mb-2">Status</h3>
                            <div>
                                <p><span className="text-gray-400">Level:</span> {member.status?.level || 'N/A'}</p>
                                <p><span className="text-gray-400">Goal:</span> {member.status?.goal || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Page = () => {
    // Assuming you fetch or select the member data somewhere
    const member = members.find(m => m.id === 1); // Replace with actual logic to get the member

    return (
        <div className="flex h-screen">


            {/* Main Content Area */}
            <div className="flex-1 p-6 overflow-auto bg-black">
                <MemberDetails member={member} onClose={() => { /* handle close */ }} />
            </div>
        </div>
    );
};

export default Page;
