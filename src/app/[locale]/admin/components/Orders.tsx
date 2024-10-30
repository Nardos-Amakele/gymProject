// components/Orders.tsx

import React from 'react';
import { ordersData } from '../../../../../assets/data/ordersData';

const Orders: React.FC = () => {
    return (
        <div className="p-8 bg-black min-h-screen text-white flex flex-col gap-8">

            {/* Heading */}
            <h1 className="text-2xl font-bold">Orders</h1>

            {/* Stats Section */}
            <div className="flex gap-6">
                {Object.entries(ordersData.stats).map(([label, value]) => (
                    <div
                        key={label}
                        className="bg-[#121212] border border-[#23363f] py-8 px-3 rounded-lg text-center text-white flex-1"
                    >
                        <p className="text-4xl font-bold">{value}</p>
                        <p className="text-sm font-light pt-2 capitalize">
                            {label.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                    </div>
                ))}
            </div>

            {/* Orders Table */}
            <div className="bg-black p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Orders</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full ">
                        <thead>
                            <tr>
                                <th className="px-2 text-left text-gray-200 font-bold text-sm py-3">Name</th>
                                <th className="px-2 text-left text-gray-200 font-bold text-sm py-3">Phone Number</th>
                                <th className="px-2 text-left text-gray-200 font-bold text-sm py-3">Item</th>
                                <th className="px-2 text-left text-gray-200 font-bold text-sm py-3">Quantity</th>
                                <th className="px-2 text-left text-gray-200 font-bold text-sm py-3">Status</th>
                                <th className="px-2 text-left text-gray-200 font-bold text-sm py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersData.orders.map((order, index) => (
                                <tr
                                key={index}
                                className={` ${index % 2 === 0 ? 'bg-[#ffffff12]' : 'bg-black'}`}>
                                    <td className="text-gray-400 py-4 px-2">{order.name}</td>
                                    <td className="text-gray-400 py-4 px-2">{order.phone}</td>
                                    <td className="text-gray-400 py-4 px-2">{order.item}</td>
                                    <td className="text-gray-400 py-4 px-2 ">{order.quantity}</td>
                                    <td className="py-4 px-2 text-gray-400 ">{order.status }</td>
                                    <td className="py-2">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox w-5 h-5 border-2 border-blue-500 rounded text-blue-500"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default Orders;
