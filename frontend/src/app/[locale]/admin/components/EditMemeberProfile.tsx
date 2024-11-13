import React, { useState } from 'react';
import { Member } from '@/assets/data/membersData';

interface EditMemberProfileProps {
    member: Member;
    onClose: () => void;
}

const EditMemberProfile: React.FC<EditMemberProfileProps> = ({ member, onClose }) => {
    const [formData, setFormData] = useState<Member>(member);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic, e.g., updating the member's data
        console.log('Updated Member Data:', formData);
        // After submission, you can call onClose to go back to MemberDetails
        onClose();
    };

    return (
        <div className="text-white rounded-lg mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Edit Member Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-between">
                        <label htmlFor="name" className="text-gray-400">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-[#222222] text-white p-2 rounded"
                        />
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="gender" className="text-gray-400">Gender:</label>
                        <input
                            type="text"
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="bg-[#222222] text-white p-2 rounded"
                        />
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="phoneNumber" className="text-gray-400">Phone Number:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="bg-[#222222] text-white p-2 rounded"
                        />
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="email" className="text-gray-400">Email Address:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-[#222222] text-white p-2 rounded"
                        />
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="address" className="text-gray-400">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="bg-[#222222] text-white p-2 rounded"
                        />
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="dob" className="text-gray-400">Date of Birth:</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="bg-[#222222] text-white p-2 rounded"
                        />
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="emergencyContact" className="text-gray-400">Emergency Contact:</label>
                        <input
                            type="text"
                            id="emergencyContact"
                            name="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={handleChange}
                            className="bg-[#222222] text-white p-2 rounded"
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <button type="submit" className="bg-customBlue px-6 py-2 rounded text-black">Save Changes</button>
                    <button type="button" onClick={onClose} className="bg-customBlue px-6 py-2 rounded text-black ml-4">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditMemberProfile;
