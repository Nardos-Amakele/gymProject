import React, { useState } from 'react';
import axios from 'axios';
interface ServiceType {
  id: number;
  name: string;
  price: number;
  description: {
    benefits: string[];
  };
  preferred: boolean;
  category: TabName;
}
type TabName =
  | "Body Building"
  | "Exercise"
  | "Group Fitness"
  | "Personal Training";

interface EditServiceModalProps {
  service: ServiceType; 
  onClose: () => void;
  onSave: (updatedService: ServiceType) => void;
  onDelete: () => void;
}


const EditServiceModal: React.FC<EditServiceModalProps> = ({
  service,
  onClose,
  onSave,
  onDelete,
}) => {
  const [editedService, setEditedService] = useState(service);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedService({ ...editedService, [name]: value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/services/${editedService.id}`,
        editedService,
        { headers: { 'Content-Type': 'application/json' } }
      );
      onSave(response.data.data);
    } catch (error) {
      console.error('Error updating service:', error);
    } finally {
      setIsSaving(false);
      onClose();
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#121212] p-6 rounded-lg w-96 text-white">
        <h2 className="text-sm font-extralight mb-4">Edit Service</h2>
        <input
          name="name"
          value={editedService.name}
          onChange={handleChange}
          className="w-full mb-4 bg-[#1d1d1d] rounded-lg p-3 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue text-sm font-extralight text-gray-300"
        />
        <textarea
          name="description"
          value={editedService.description.benefits.join(', ')}
          onChange={(e) =>
            setEditedService({
              ...editedService,
              description: { benefits: e.target.value.split(',').map((b) => b.trim()) },
            })
          }
          className="w-full mb-4 bg-[#1d1d1d] rounded-lg p-3 h-24 focus:outline-none focus:ring-[0.5px] focus:ring-customBlue text-sm font-extralight text-gray-300 resize-none"
        ></textarea>
        <div className="flex justify-between space-x-4">
          <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg">
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
          <div>
            <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="ml-4 bg-customBlue text-white px-4 py-2 rounded-lg"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditServiceModal;
