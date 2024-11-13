import React, { useState } from 'react';

interface AddItemFormProps {
  onAddItem: (item: { id: string; itemName: string; category: string; quantity: number }) => void;
  onClose: () => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem, onClose }) => {
  const [itemName, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);  // Add loading state for better UX

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName || !category || quantity <= 0) return;

    setLoading(true);  // Start loading

    // Prepare the item data
    const newItem = { itemName, category, quantity };

    try {
        const response = await fetch('http://localhost:5000/api/stock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        });

        if (!response.ok) {
            throw new Error('Failed to add item');
        }

        const savedItem = await response.json();

        // Ensure `savedItem.data` is used if `data` is how the backend returns the item.
        if (savedItem.success) {
            onAddItem(savedItem.data); // Pass the full item with `id` from the backend
            onClose();  // Close the form after adding the item
        } else {
            console.error('Unexpected response:', savedItem);
        }

    } catch (error) {
        console.error('Error adding item:', error);
        // Optionally, you can display an error message to the user
    } finally {
        setLoading(false);  // End loading
    }
};


  return (
    <div className="fixed inset-0 bg-[#121212] bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#121212] text-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg mb-4 font-extralight">Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white font-extralight mb-2">Item Name</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-[#1d1d1d]"
              value={itemName}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-extralight mb-2">Category</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-[#1d1d1d]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-extralight mb-2">Quantity</label>
            <input
              type="number"
              className="w-full p-2 rounded bg-[#1d1d1d]"
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
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="hover:bg-customBlue bg-customHoverBlue text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemForm;
