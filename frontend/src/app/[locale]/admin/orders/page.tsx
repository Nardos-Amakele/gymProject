import React from 'react';
import { ordersData } from '../../../../../assets/data/ordersData';

const Orders: React.FC = () => {
    return (
        <div className="p-8 bg-black min-h-screen text-white flex flex-col gap-8">

            {/* Stats Section */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6 ">
                {Object.entries(ordersData.stats).map(([label, value]) => (
                    <div
                        key={label}
                        className="bg-[#121212] border border-[#23363f] hover:border hover:border-customBlue py-6 px-2 rounded-lg text-center text-white flex-1"
                    >
                        <p className="text-4xl font-bold">{value}</p>
                        <p className="text-sm font-light pt-2 capitalize text-customBlue">
                            {ordersData.statLabels[label as keyof typeof ordersData.statLabels]}
                        </p>
                        <p className="text-sm font-light pt-2 capitalize">
                            {label.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                    </div>
                ))}
            </div>

{/* Orders Section */}
<div className="bg-black p-6 rounded-lg">
    <h2 className="text-xl font-bold mb-4">Orders</h2>

    {/* Table Layout for Large Screens */}
    <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full">
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
                        className={`${index % 2 === 0 ? 'bg-[#ffffff12]' : 'bg-black'}`}
                    >
                        <td className="text-gray-400 py-2 px-2 font-extralight text-sm">{order.name}</td>
                        <td className="text-gray-400 py-2 px-2 font-extralight text-sm">{order.phone}</td>
                        <td className="text-gray-400 py-2 px-2 font-extralight text-sm">{order.item}</td>
                        <td className="text-gray-400 py-2 px-2 font-extralight text-sm">{order.quantity}</td>
                        <td className="py-2 px-2 font-extralight text-sm text-gray-400">{order.status}</td>
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

    {/* Card Layout for Small Screens */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {ordersData.orders.map((order, index) => (
            <div
                key={index}
                className={`p-4 bg-[#1d1d1d] rounded-lg border ${
                    index % 2 === 0 ? 'border-[#ffffff12]' : 'border-gray-700'
                }`}
            >
                <div className="mb-2">
                    <h3 className="text-lg font-bold text-customBlue">{order.name}</h3>
                    <p className="text-sm text-gray-400">Phone: {order.phone}</p>
                </div>
                <p className="text-gray-300 mb-2">
                    <span className="font-semibold">Item:</span> {order.item}
                </p>
                <p className="text-gray-300 mb-2">
                    <span className="font-semibold">Quantity:</span> {order.quantity}
                </p>
                <p className="text-gray-300 mb-4">
                    <span className="font-semibold">Status:</span> {order.status}
                </p>
                <div className="flex justify-start items-center">
                    <input
                        type="checkbox"
                        className="form-checkbox w-5 h-5 border-2 border-blue-500 rounded text-blue-500"
                    />
                    <label className="ml-2 text-gray-400 text-sm">Completed</label>
                </div>
            </div>
        ))}
    </div>
            </div>
        </div>
    );
};

export default Orders;
