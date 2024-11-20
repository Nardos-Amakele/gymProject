'use client'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import AddItemForm from '../components/AddItemForm';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';  // Import the ConfirmDeleteModal component

interface StockItem {
  id: string;
  itemName: string;
  category: string;
  quantity: number;
}

const Stock: React.FC = () => {
  const [stockData, setStockData] = useState<StockItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);  // State for showing delete modal
  const [itemToDelete, setItemToDelete] = useState<StockItem | null>(null);  // Store item to delete

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/stock');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setStockData(result.data);
        } else {
          console.error('Data is not in the expected format:', result);
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };
    fetchData();
  }, []);

  const handleAddItem = (newItem: StockItem) => {
    setStockData(prevStockData => [...prevStockData, newItem]);
    setShowAddForm(false);
  };

  const handleDeleteItem = async (id: string) => {
    if (itemToDelete) {
      try {
        const response = await fetch(`http://localhost:5000/api/stock/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete the item');
        }
        setStockData(prevStockData => prevStockData.filter(item => item.id !== id));
        setShowDeleteModal(false);  // Close modal after successful deletion
      } catch (error) {
        console.error('Error deleting stock item:', error);
      }
    }
  };

  const handleIncreaseQuantity = async (id: string, index: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/stock/${id}/increaseQuantity`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        throw new Error('Failed to increase quantity');
      }
      const updatedStock = [...stockData];
      updatedStock[index].quantity += 1;
      setStockData(updatedStock);
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  const handleDecreaseQuantity = async (id: string, index: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/stock/${id}/decreaseQuantity`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        throw new Error('Failed to decrease quantity');
      }
      const updatedStock = [...stockData];
      if (updatedStock[index].quantity > 0) {
        updatedStock[index].quantity -= 1;
      }
      setStockData(updatedStock);
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  const openDeleteModal = (item: StockItem) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  return (
    <div className="p-4 sm:p-6 bg-black text-white rounded-lg shadow-lg">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-lg sm:text-2xl font-bold text-black">Stock Inventory</h1>
        <button
          className="bg-customBlue text-black font-light px-4 py-2 rounded-lg hover:bg-customHoverBlue flex items-center"
          onClick={() => setShowAddForm(true)}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2 text-black" />
          <span>Add Item</span>
        </button>
      </div>

      {/* table */}
      <div className="overflow-x-auto hidden sm:block">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="bg-black border-t border-[#D9D9D93B] text-gray-300 uppercase">
            <tr>
              <th className="px-6 py-6">Items</th>
              <th className="px-6 py-6">Category</th>
              <th className="px-6 py-6">Quantity</th>
              <th className="px-6 py-6 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {stockData.length ? (
              stockData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${index % 2 === 0 ? 'bg-[#ffffff12]' : 'bg-black'}`}
                >
                  <td className="px-6 py-2">{item.itemName}</td>
                  <td className="px-6 py-2">{item.category}</td>
                  <td className="px-6 py-2">{item.quantity}</td>
                  <td className="px-6 flex justify-end space-x-4">
                    <div className="px-4 py-2 flex space-x-4">
                      <button
                        className="flex items-center text-customBlue border-customBlue border rounded-md p-2 hover:bg-opacity-80 transition-colors"
                        onClick={() => handleDecreaseQuantity(item.id, index)}
                      >
                        <FontAwesomeIcon icon={faMinus} className="text-xs" />
                      </button>
                      <button
                        className="flex items-center border border-red-500 text-red-500 rounded-md p-2 hover:text-red-600 hover:underline"
                        onClick={() => openDeleteModal(item)} // Open modal for confirmation
                      >
                        <FontAwesomeIcon icon={faTrash} className="text-xs" />
                      </button>
                      <button
                        className="flex items-center text-black bg-customBlue rounded-md p-2 hover:bg-opacity-80 transition-colors"
                        onClick={() => handleIncreaseQuantity(item.id, index)}
                      >
                        <FontAwesomeIcon icon={faPlus} className="text-xs" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 py-4">
                  No stock data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card Layout */}
      <div className="sm:hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stockData.length ? (
          stockData.map((item, index) => (
            <div
              key={item.id}
              className={`p-4 bg-[#1d1d1d] rounded-lg border ${
                index % 2 === 0 ? 'border-[#ffffff12]' : 'border-gray-700'
              }`}
            >
              <div className="mb-2">
                <h2 className="text-xl font-semibold text-customBlue">{item.itemName}</h2>
                <p className="text-sm text-gray-400">{item.category}</p>
              </div>
              <p className="text-gray-500">Quantity: {item.quantity}</p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-customBlue text-black text-xs rounded-lg px-4 py-2 hover:bg-customHoverBlue"
                  onClick={() => openDeleteModal(item)} // Open modal for confirmation
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">No stock data available</div>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => itemToDelete && handleDeleteItem(itemToDelete.id)}
        itemName={itemToDelete?.itemName || ''}
      />
    </div>
  );
};

export default Stock;
