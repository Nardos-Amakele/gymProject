// src/components/MemberDetails.tsx
import React from 'react';
import { Member } from '@/assets/data/membersData';

interface MemberDetailsProps {
    member: Member;
    onClose: () => void;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ member, onClose }) => {
    return (
        <div className=" text-white rounded-lg  p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold p-1">Gym Member</h1>
                <div className="flex space-x-4">
                    <button className="bg-customBlue hover:bg-customHoverBlue px-6 py-2 rounded text-black ">Edit Profile</button>
                    <button onClick={onClose} className="bg-customBlue hover:bg-customHoverBlue px-6 py-2 rounded text-black ">
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
                            <p className="text-customBlue">{member.gender}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 bg-[#111111] p-4 rounded-lg">
                        <p className="flex justify-between">
                            <span className="text-gray-400">Phone number:</span>
                            <span>{member.phoneNumber}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-gray-400">Email Address:</span>
                            <span>{member.email}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-gray-400">Address:</span>
                            <span>{member.address}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-gray-400">DOB:</span>
                            <span>{member.dob}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-gray-400">Emergency Contact:</span>
                            <span>{member.emergencyContact || 'N/A'}</span>
                        </p>
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
                        <button className="bg-customBlue hover:bg-customHoverBlue p-2 rounded text-black px-4 ">Freeze Account</button>
                        <button className="bg-customBlue hover:bg-customHoverBlue p-2 rounded text-black px-4">Download</button>
                    </div>

                    {/* Attendance, weight, height, BMI */}
                    <div className='bg-[#111111] pb-6'>
                        <div className="flex justify-between  bg-[#111111] p-4 px-8 rounded-lg text-center">
                            <div><p className="text-[14px] font-bold">Details</p></div>
                            <div>
                                <p className="text-2xl text-customBlue font-jost font-extrabold">{member.attendance}</p>
                                <p className="text-xs text-customBlue">Days</p>
                                <p className=" text-gray-400">Total Attendance</p>
                            </div>
                            <div>
                                <p className="text-2xl text-customBlue font-jost font-extrabold">{member.weight}</p>
                                <p className="text-xs text-customBlue">kg</p>
                                <p className=" text-gray-400">Weight</p>
                            </div>
                            <div>
                                <p className="text-2xl text-customBlue font-jost font-extrabold">{member.height}</p>
                                <p className="text-xs text-customBlue">cm</p>
                                <p className=" text-gray-400">Height</p>
                            </div>
                            <div>
                                <p className="text-2xl text-customBlue font-jost font-extrabold">{member.bmi}</p>
                                <p className="text-xs text-customBlue">Kg/m²</p>
                                <p className=" text-gray-400">BMI</p>
                            </div>
                        </div>


                        {/* Health Information */}
                        <div className="px-6 py-6">
                            <div className="bg-[#1B1B1B] p-4 rounded-lg flex space-x-20">
                                <h3 className="text-[24px] font-bold">Health Info.</h3>
                                <div className="w-full">
                                    <p className="flex items-center justify-between">
                                        <span className="text-gray-400">Medical conditions:</span>
                                        <span className="flex-grow border-dotted border-b border-gray-400 mx-2"></span>
                                        <span>{member.healthInfo?.conditions?.join(', ') || 'N/A'}</span>
                                    </p>
                                    <p className="flex items-center justify-between">
                                        <span className="text-gray-400">Allergies:</span>
                                        <span className="flex-grow border-dotted border-b border-gray-400 mx-2"></span>
                                        <span>{member.healthInfo?.allergies?.join(', ') || 'N/A'}</span>
                                    </p>
                                    <p className="flex items-center justify-between">
                                        <span className="text-gray-400">Injuries:</span>
                                        <span className="flex-grow border-dotted border-b border-gray-400 mx-2"></span>
                                        <span>{member.healthInfo?.injuries?.join(', ') || 'N/A'}</span>
                                    </p>
                                    <p className="flex items-center justify-between">
                                        <span className="text-gray-400">Medications:</span>
                                        <span className="flex-grow border-dotted border-b border-gray-400 mx-2"></span>
                                        <span>{member.healthInfo?.medications?.join(', ') || 'N/A'}</span>
                                    </p>
                                </div>
                            </div>
                        </div>


                        {/* Status */}
                        <div className="px-6">
                            <div className="bg-[#1B1B1B] p-4 rounded-lg flex space-x-20">
                                <h3 className="text-[24px] font-bold mr-8">Status</h3>
                                <div className="w-full">
                                    <p className="flex items-center justify-between">
                                        <span className="text-gray-400">Level:</span>
                                        <span className="flex-grow border-dotted border-b border-gray-400 mx-2"></span>
                                        <span>{member.status?.level || 'N/A'}</span>
                                    </p>
                                    <p className="flex items-center justify-between">
                                        <span className="text-gray-400">Goal:</span>
                                        <span className="flex-grow border-dotted border-b border-gray-400 mx-2"></span>
                                        <span>{member.status?.goal || 'N/A'}</span>
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