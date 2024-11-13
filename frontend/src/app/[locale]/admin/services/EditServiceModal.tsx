import React, { useState } from 'react';

interface EditServiceModalProps {
    service: any;
    onClose: () => void;
    onSave: (updatedService: any) => void;
    onDelete: () => void;
}

const EditServiceModal: React.FC<EditServiceModalProps> = ({ service, onClose, onSave }) => {
    const [editedService, setEditedService] = useState(service);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedService({ ...editedService, [e.target.name]: e.target.value });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#121212] p-6 rounded-lg w-96 text-white">
            <h2 className="text-sm font-extralight mb-4">Edit Service</h2>
            <input
              type="text"
              value={editedService.name}
              className="w-full mb-4 bg-[#1d1d1d] rounded-lg p-3 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue text-sm font-extralight text-gray-300"
            />
            <textarea
              value={editedService.description}
              className="w-full mb-4 bg-[#1d1d1d] rounded-lg p-3 h-24 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue text-sm font-extralight text-gray-300"
            ></textarea>
            <div className="flex justify-end space-x-4">
              <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                Cancel
              </button>
              <button onClick={() => onSave(editedService)}  className="bg-customBlue text-white px-4 py-2 rounded-lg">
                Save
              </button>
            </div>
          </div>

        </div>
                    );
};

                    export default EditServiceModal;
