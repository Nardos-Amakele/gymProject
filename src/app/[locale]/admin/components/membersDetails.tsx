// src/components/MemberDetails.tsx
import React from 'react';
import { Member } from '@/assets/data/membersData';

interface MemberDetailsProps {
    member: Member;
    onClose: () => void;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ member, onClose }) => {
    return (
        <div className="bg-gray-900 text-white rounded-lg  mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Gym Member</h1>
                <div className="flex space-x-4">
                    <button className="bg-customBlue px-4 py-2 rounded ">Edit Profile</button>
                    <button onClick={onClose} className="bg-customBlue px-4 py-2 rounded ">
                        Back to Home
                    </button>
                </div>
            </div>

            <div className="flex space-x-8">
                {/* Left section with profile image and personal details */}
                <div>
                    <div className="flex items-center mb-8 space-x-4 bg-gray-600 p-4 ">
                        <div className="w-24 h-24 rounded-full bg-gray-700">
                            {/* Uncomment if you have an image for the member */}
                            {/* <img src={member.image || '/path/to/default-image.jpg'} alt="Profile" className="w-full h-full rounded-full" /> */}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{member.name}</h2>
                            <p className="text-blue-400">{member.gender}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 bg-gray-800 p-4 rounded-lg">
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
                    <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                        <div className='text-center border bordder-white p-4'>
                            <p className=" text-customBlue text-center font-semibold  px-2 py-1 rounded-md inline-block">{member.memberType || 'N/A'}</p>
                            <p className="text-white ">Membership Type</p>
                        </div>
                        <div className='text-center border bordder-white p-4'>
                            <p className="text-customBlue text-center font-semibold ">{member.dueDate || 'N/A'} <br></br>days left</p>
                            <p className="text-white ">Due Date</p>
                        </div>
                        <div className='text-center border bordder-white p-4'>
                            <p className="text-customBlue text-center font-semibold ">{member.memberSince || 'N/A'}</p>
                            <p className="text-white ">Member Since</p>
                        </div>
                        <button className="bg-customBlue p-2 rounded ">Freez Account</button>
                        <button className="bg-customBlue p-2 rounded ">Download</button>
                    </div>

                    {/* Attendance, weight, height, BMI */}
                    <div className="grid grid-cols-4 gap-4 bg-gray-800 p-4 rounded-lg text-center">
                       <div> <p>Details</p></div>
                        <div>
                            <p className="text-xs font-bold text-blue-400">{member.attendance}<br></br>Days</p>
                            <p className="text-gray-400">Total Attendance</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-blue-400">{member.weight} <br></br>kg</p>
                            <p className="text-gray-400">Weight</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-blue-400">{member.height} <br></br>cm</p>
                            <p className="text-gray-400">Height</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-blue-400">{member.bmi}<br></br>Kg/m2</p>
                            <p className="text-gray-400">BMI</p>
                        </div>
                    </div>

                    {/* Health Information */}
                    <div className="bg-gray-800 p-4 rounded-lg flex">
                        <h3 className="text-lg font-bold mb-2">Health Info.</h3>
                        <div >
                            <div>
                                <p><span className="text-gray-400">Medical conditions:</span> {member.healthInfo?.conditions?.join(', ') || 'N/A'}</p>
                                <p><span className="text-gray-400">Allergies:</span> {member.healthInfo?.allergies?.join(', ') || 'N/A'}</p>
                                <p><span className="text-gray-400">Injuries:</span> {member.healthInfo?.injuries?.join(', ') || 'N/A'}</p>
                                <p><span className="text-gray-400">Medications:</span> {member.healthInfo?.medications?.join(', ') || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="bg-gray-800 p-4 rounded-lg flex">
                        <h3 className="text-lg font-bold mb-2">Status</h3>
                        <div>
                            <p><span className="text-gray-400">Level:</span> {member.status?.level || 'N/A'}</p>
                            <p><span className="text-gray-400">Goal:</span> {member.status?.goal || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberDetails;
