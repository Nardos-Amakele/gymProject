// src/components/EditMembers.tsx
import React, { useState } from 'react';
import { Member } from '@/assets/data/membersData';

interface EditMembersProps {
    member: Member;
    onSave: (updatedMember: Member) => void;
    onCancel: () => void;
}

const EditMembers: React.FC<EditMembersProps> = ({ member, onSave, onCancel }) => {
    // Initialize state with member's current details
    const [editedMember, setEditedMember] = useState<Member>(member);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedMember({ ...editedMember, [name]: value });
    };

    // Save button handler
    const handleSave = () => {
        onSave(editedMember); // Pass the updated member details to the parent component
    };

    return (
        <div className="bg-gray-900 text-white rounded-lg mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Edit Member Profile</h1>
            <div className="space-y-4">
                {/* Table-like rows for editing details */}
                <div className="grid grid-cols-2 gap-4">
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={editedMember.name}
                            onChange={handleChange}
                            className="w-full bg-gray-800 p-2 rounded"
                        />
                    </label>
                    <label>
                        Gender:
                        <input
                            type="text"
                            name="gender"
                            value={editedMember.gender}
                            onChange={handleChange}
                            className="w-full bg-gray-800 p-2 rounded"
                        />
                    </label>
                    <label>
                        Phone Number:
                        <input
                            type="text"
                            name="phoneNumber"
                            value={editedMember.phoneNumber}
                            onChange={handleChange}
                            className="w-full bg-gray-800 p-2 rounded"
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={editedMember.email}
                            onChange={handleChange}
                            className="w-full bg-gray-800 p-2 rounded"
                        />
                    </label>
                    <label>
                        Address:
                        <input
                            type="text"
                            name="address"
                            value={editedMember.address}
                            onChange={handleChange}
                            className="w-full bg-gray-800 p-2 rounded"
                        />
                    </label>
                    <label>
                        Date of Birth:
                        <input
                            type="date"
                            name="dob"
                            value={editedMember.dob}
                            onChange={handleChange}
                            className="w-full bg-gray-800 p-2 rounded"
                        />
                    </label>
                    <label>
                        Emergency Contact:
                        <input
                            type="text"
                            name="emergencyContact"
                            value={editedMember.emergencyContact || ''}
                            onChange={handleChange}
                            className="w-full bg-gray-800 p-2 rounded"
                        />
                    </label>
                </div>
                {/* Health Information */}
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Health Information</h3>
                    <label>
                        Medical Conditions:
                        <input
                            type="text"
                            name="healthInfo.conditions"
                            value={editedMember.healthInfo?.conditions?.join(', ') || ''}
                            onChange={handleChange}
                            className="w-full bg-gray-800 p-2 rounded"
                        />
                    </label>
                    <label>
                        Allergies:
                        <input
                            type="text"
                            name="healthInfo.allergies"
                            value={editedMember.healthInfo?.allergies?.join(', ') || ''}
                            onChange={handleChange}
                            className="w-full bg-gray-800 p-2 rounded"
                        />
                    </label>
                    <label>
                        Injuries:
                        <input
                            type="text"
                            name="healthInfo.injuries"
                            value={editedMember.healthInfo?.injuries?.join(', ') || ''}
                            onChange={handleChange}
                            className="w-full bg-gray-800 p-2 rounded"
                        />
                    </label>
                    <label>
                        Medications:
                        <input
                            type="text"
                            name="healthInfo.medications"
                            value={editedMember.healthInfo?.medications?.join(', ') || ''}
                            onChange={handleChange}
                            className="w-full bg-gray-800 p-2 rounded"
                        />
                    </label>
                </div>
                {/* Status */}
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Status</h3>
                    <label>
                        Level:
                        <input
                            type="text"
                            name="status.level"
                            value={editedMember.status?.level || ''}
                            onChange={handleChange}
                            className="w-full bg-gray-800 p-2 rounded"
                        />
                    </label>
                    <label>
                        Goal:
                        <input
                            type="text"
                            name="status.goal"
                            value={editedMember.status?.goal || ''}
                            onChange={handleChange}
                            className="w-full bg-gray-800 p-2 rounded"
                        />
                    </label>
                </div>
            </div>
            {/* Action buttons */}
            <div className="mt-6 flex justify-end space-x-4">
                <button onClick={onCancel} className="bg-gray-700 px-4 py-2 rounded">
                    Cancel
                </button>
                <button onClick={handleSave} className="bg-customBlue px-4 py-2 rounded">
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditMembers;
