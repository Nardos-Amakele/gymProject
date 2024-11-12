import React, { useState } from 'react';

interface AddItemFormProps {
  onAddItem: (item: { name: string; category: string; quantity: number }) => void;
  onClose: () => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem, onClose }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category || quantity <= 0) return;
    onAddItem({ name, category, quantity });
  };

  return (
    <div className="fixed inset-0 bg-[#121212] bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#121212]  text-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg  mb-4 font-extralight">Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white font-extralight mb-2">Item Name</label>
            <input
              type="text"
              className="w-full p-2  rounded bg-[#1d1d1d] "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-extralight mb-2">Category</label>
            <input
              type="text"
              className="w-full p-2  rounded bg-[#1d1d1d]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-extralight mb-2">Quantity</label>
            <input
              type="number"
              className="w-full p-2  rounded bg-[#1d1d1d]"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="hover:bg-customBlue bg-customHoverBlue text-white px-4 py-2 rounded">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemForm;
