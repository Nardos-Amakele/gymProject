import React, { useState } from "react";

interface AddEmployeeModalProps {
    closeModal: () => void;
    addNewMember: (newMember: Member) => void;
}

interface Member {
    name: string;
    phone: string;
    startDate: string;
    jobType: string;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ closeModal, addNewMember }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [startDate, setStartDate] = useState("");
    const [jobType, setJobType] = useState("");

    const handleAddEmployee = () => {
        if (name && phone && startDate && jobType) {
            // Create a new member object
            const newMember: Member = { name, phone, startDate, jobType };
            addNewMember(newMember); // Add the new member to the list
        } else {
            alert("Please fill out all fields");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#121212]bg-opacity-50">
            <div className="bg-[#121212] p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-300 mb-4">Add New Employee</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full px-4 py-2 rounded-md bg-[#1d1d1d] text-gray-300 focus:outline-none focus:ring-2 focus:ring-customBlue"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        className="w-full px-4 py-2 rounded-md bg-[#1d1d1d] text-gray-300 focus:outline-none focus:ring-2 focus:ring-customBlue"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <input
                        type="date"
                        className="w-full px-4 py-2 rounded-md bg-[#1d1d1d] text-gray-300 focus:outline-none focus:ring-2 focus:ring-customBlue"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <select
                        className="w-full px-4 py-2 rounded-md bg-[#1d1d1d] text-gray-300 focus:outline-none focus:ring-2 focus:ring-customBlue"
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                    >
                        <option value="">Select Job Type</option>
                        <option value="Janitor">Janitor</option>
                        <option value="Trainer">Trainer</option>
                        <option value="Reception">Reception</option>
                    </select>
                </div>
                <div className="flex justify-end mt-4 space-x-3">

                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-customBlue text-white px-4 py-2 rounded-md hover:bg-customHoverBlue"
                        onClick={handleAddEmployee}
                    >
                        Add
                    </button>

                </div>
            </div>
        </div>
    );
};

export default AddEmployeeModal;
