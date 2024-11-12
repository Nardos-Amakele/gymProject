'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import AddItemForm from '../components/AddItemForm';
import AdminSidebar from '../components/AdminSideBar';
import AdminHeader from '../components/AdminHeader';

interface StockItem {
    id: string;
    itemName: string;
    category: string;
    quantity: number;
}

const Stock: React.FC = () => {
    const [stockData, setStockData] = useState<StockItem[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);

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
        try {
            const response = await fetch(`http://localhost:5000/api/stock/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete the item');
            }
            setStockData(prevStockData => prevStockData.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting stock item:', error);
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

    return (
        <div className="p-6 bg-black text-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Stock Inventory</h1>
                <button
                    className="bg-customBlue text-white px-4 py-2 rounded-md hover:bg-customHoverBlue"
                    onClick={() => setShowAddForm(true)}
                >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Item
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="bg-black border-t border-[#D9D9D93B] text-gray-300 uppercase">
                        <tr>
                            <th className="px-6 py-6">Items</th>
                            <th className="px-6 py-6">Category</th>
                            <th className="px-6 py-6">Quantity</th>
                            <th className="px-6 py-6 text-center">Actions</th>
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
                                                onClick={() => handleDeleteItem(item.id)}
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

            {showAddForm && <AddItemForm onAddItem={handleAddItem} onClose={() => setShowAddForm(false)} />}
        </div>
    );
};

const Page = () => {
    return (
        <div className="flex h-screen">
            <div className="hidden lg:block sticky top-0 h-screen bg-[#121212]">
                <AdminSidebar locale={""} />
            </div>

            <div className="flex flex-col flex-1">
                <AdminHeader />
                <div className="flex-1 p-6 overflow-auto bg-black">
                    <Stock />
                </div>
            </div>
        </div>
    );
};

export default Page;
