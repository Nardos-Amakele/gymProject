import React, { useState } from 'react';
import AddItemForm from './AddItemForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

interface StockItem {
    name: string;
    category: string;
    quantity: number;
}

const initialStockData: StockItem[] = [
    { name: 'Dumbbells', category: 'Free Weights', quantity: 50 },
    { name: 'Bar', category: 'Free Weights', quantity: 15 },
    { name: 'Plate', category: 'Free Weights', quantity: 40 },
    { name: 'Treadmill', category: 'Cardio Equipment', quantity: 4 },
    { name: 'Bench', category: 'Machines', quantity: 15 },
    { name: 'Pull-Up Bar', category: 'Bodyweight', quantity: 2 },
    { name: 'Resistance Bands', category: 'Cardio Equipment', quantity: 10 },
];

const Stock: React.FC = () => {
    const [stockData, setStockData] = useState<StockItem[]>(initialStockData);
    const [showAddForm, setShowAddForm] = useState(false);

    const handleAddItem = (newItem: StockItem) => {
        setStockData([...stockData, newItem]);
        setShowAddForm(false);
    };

    const handleEditItem = (index: number) => {
        // Placeholder function for edit action
        alert(`Edit item at index: ${index}`);
    };

    const handleDeleteItem = (index: number) => {
        // Remove item from stockData
        setStockData(stockData.filter((_, i) => i !== index));
    };

    return (
        <div className="p-6 bg-black text-white rounded-lg shadow-lg">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Stock Inventory</h1>
                <button
                    className="bg-customBlue text-white px-4 py-2 rounded-md hover:bg-customHoverBlue"
                    onClick={() => setShowAddForm(true)}
                >
                    <i className="fas fa-plus mr-2"></i> Add Item
                </button>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="bg-[#ffffff29] text-gray-300 uppercase">
                        <tr>
                            <th className="px-6 py-3">Items</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Quantity</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockData.map((item, index) => (
                            <tr
                                key={index}
                                className={`border-b border-gray-700 ${index % 2 === 0 ? 'bg-black' : 'bg-black'
                                    }`}
                            >
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4">{item.category}</td>
                                <td className="px-6 py-4">{item.quantity}</td>
                                <td className="px-6 py-4 flex justify-end space-x-4">

                                    <td className="px-4 py-2 flex space-x-4">
                                        <button className="flex items-center text-gray-400  hover:text-customBlue">
                                            <FontAwesomeIcon icon={faMinus} className="mr-1" /> 
                                        </button>
                                        <button className="flex items-center text-red-500 hover:text-red-600 hover:underline">
                                            <FontAwesomeIcon icon={faTrash} className="mr-1" /> 

                                        </button>
                                        <button
                                            className="flex items-center text-gray-400 hover:text-customBlue"
                                        >
                                            <FontAwesomeIcon icon={faPlus} className="mr-1" /> 

                                        </button>
                                    </td>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showAddForm && <AddItemForm onAddItem={handleAddItem} onClose={() => setShowAddForm(false)} />}
        </div>
    );
};

export default Stock;
