// AddMemberForm.tsx
import React, { useState } from 'react';
import { Member } from '@/assets/data/membersData';

interface AddMemberFormProps {
    onClose: () => void;
    onAddMember: (member: Member) => void;
}

const AddMemberForm: React.FC<AddMemberFormProps> = ({ onClose, onAddMember }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [due, setDue] = useState('');
    const [memberType, setMemberType] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Generate a unique ID using the current timestamp and a random number
        const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const newMember: Member = {
            name,
            phoneNumber,
            due,
            memberType,
            jobType: '',
            phone: undefined,
            startDate: undefined,
            dueDate: '',
            id: 0
        };

        onAddMember(newMember);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-[#121212] bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#121212] p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4">Add New Member</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-2 w-full p-2 rounded bg-[#1d1d1d] " required />
                    <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="mb-2 w-full p-2 rounded bg-[#1d1d1d] " required />
                    <input type="text" placeholder="Due" value={due} onChange={(e) => setDue(e.target.value)} className="mb-2 w-full p-2 rounded bg-[#1d1d1d] " required />
                    <input type="text" placeholder="Member Type" value={memberType} onChange={(e) => setMemberType(e.target.value)} className="mb-4 w-full p-2 rounded bg-[#1d1d1d] " required />
                    <div className='flex space-x-3'>
                        <button type="submit" className="mt-2 w-full bg-customBlue hover:bg-customHoverBlue text-white p-2 rounded">Add Member</button>
                        <button type="button" onClick={onClose} className="mt-2 w-full bg-red-500 hover:bg-red-600  text-white p-2 rounded">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMemberForm;
