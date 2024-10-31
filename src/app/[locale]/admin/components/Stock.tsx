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
                    <thead className=" bg-black border-t border-[#D9D9D93B] text-gray-300 uppercase">
                        <tr>
                            <th className="px-6 py-6">Items</th>
                            <th className="px-6 py-6">Category</th>
                            <th className="px-6 py-6">Quantity</th>
                            <th className="px-6 py-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockData.map((item, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 === 0 ? 'bg-[#ffffff12]' : 'bg-black'
                                    }`}
                            >
                                <td className="px-6 py-2 ">{item.name}</td>
                                <td className="px-6 py-2">{item.category}</td>
                                <td className="px-6 py-2">{item.quantity}</td>
                                <td className="px-6 flex justify-end space-x-4">
                                    <td className="px-4 py-2 flex space-x-4">
                                        <button className="flex items-center text-customBlue border-customBlue border rounded-md p-2 hover:bg-opacity-80 transition-colors">
                                            <FontAwesomeIcon icon={faMinus} className="text-xs" /> 
                                        </button>
                                        <button className="flex items-center border border-red-500 text-red-500 rounded-md p-2 hover:text-red-600 hover:underline">
                                            <FontAwesomeIcon icon={faTrash} className="text-xs" />
                                        </button>
                                        <button className="flex items-center text-black bg-customBlue rounded-md p-2 hover:bg-opacity-80 transition-colors">
                                            <FontAwesomeIcon icon={faPlus} className="text-xs" />
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
