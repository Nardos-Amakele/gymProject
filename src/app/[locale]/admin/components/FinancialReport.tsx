"use client";
import { CartesianGrid, LineChart, XAxis, YAxis, Tooltip, Line } from "recharts";
import { useState } from "react";

// Mocked Data
const chartData = [
    { month: "January", amount: 2000 },
    { month: "February", amount: 3000 },
    { month: "March", amount: 1000 },
    { month: "April", amount: 5000 },
    { month: "May", amount: 4000 },
    { month: "June", amount: 2000 },
];

const transactions = [
    { name: "Abebe salary", date: "12/5/2017", category: "Salary", amount: 2000, type: "income" },
    { name: "Abebe salary", date: "12/5/2017", category: "Others", amount: 1200, type: "expense" },
    { name: "Abebe salary", date: "12/5/2017", category: "Salary", amount: 2000, type: "income" },
    { name: "Abebe salary", date: "12/5/2017", category: "Items", amount: 1000, type: "expense" },
    { name: "Abebe salary", date: "12/5/2017", category: "Equipment", amount: 2000, type: "income" },
    { name: "Abebe salary", date: "12/5/2017", category: "Salary", amount: 500, type: "income" },
];

export function FinancialReport() {
    const [income, setIncome] = useState(20000);
    const [expense, setExpense] = useState(10000);
    const [net, setNet] = useState(income - expense);
    const [newTransaction, setNewTransaction] = useState({
        name: "",
        category: "",
        amount: "",
        type: "expense",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewTransaction((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="text-white p-6">
            {/* Line Chart */}
            <div className="p-4 bg-[#121212] rounded-lg my-4">
                <LineChart data={chartData} width={970} height={300}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Line type="monotone" dataKey="amount" stroke="#00bfff" dot={{ r: 5, fill: "#00bfff" }} />
                </LineChart>
            </div>

            {/* Summary Section */}
            <div className="flex justify-between items-center text-lg mt-4 p-4 bg-[#121212] rounded-lg">
                <div className="text-sm font-extralight">
                    Income: <span className="text-xl font-bold">{income} <span className="text-sm font-extralight">Birr</span></span>
                </div>
                <div className="text-sm font-extralight">
                    Expense: <span className="text-xl font-bold">{expense} <span className="text-sm font-extralight">Birr</span></span>
                </div>
                <div className="text-sm font-extralight">
                    Net: <span className="text-xl font-bold">{net} <span className="text-sm font-extralight">Birr</span></span>
                </div>
            </div>

            {/* Table and New Transaction Form Row */}
            <div className="flex flex-col lg:flex-row gap-6 mt-6">
                {/* Transactions Table */}
                <div className="w-full lg:flex-1 ">
                    <table className="min-w-full text-white">
                        <thead>
                            <tr className=" p-4 bg-[#121212] rounded-lg">
                                <th className="px-4 py-2 text-left text-sm  font-semibold">Name</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold">Date</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold">Category</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={index} className=" font-extralight text-sm">
                                    <td className={`px-4 py-2 ${transaction.type === "expense" ? "text-red-500" : "text-green-500"}`}>{transaction.name}</td>
                                    <td className={`px-4 py-2 ${transaction.date === "expense" ? "text-red-500" : "text-green-500"}`}>{transaction.date}</td>
                                    <td className={`px-4 py-2 ${transaction.type === "expense" ? "text-red-500" : "text-green-500"}`}>{transaction.category}</td>
                                    <td className={`px-4 py-2 ${transaction.type === "expense" ? "text-red-500" : "text-green-500"}`}>{transaction.amount} Birr</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* New Transaction Form */}
                <div className="w-full lg:flex-1 p-4 bg-[#121212] rounded-lg">
                    <div className="font-bold text-sm mb-2">New Transaction</div>
                        <div className="flex flex-col gap-2 mb-2 text-sm font-extralight">
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={newTransaction.name}
                            onChange={handleInputChange}
                            className="px-3 py-2 rounded bg-[#1c1c1c] w-full focus:outline-none focus:ring-2 focus:ring-customBlue"
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            name="category"
                            value={newTransaction.category}
                            onChange={handleInputChange}
                            className="px-3 py-2 rounded bg-[#1c1c1c] w-full focus:outline-none focus:ring-2 focus:ring-customBlue"
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            name="amount"
                            value={newTransaction.amount}
                            onChange={handleInputChange}
                            className="px-3 py-2 rounded bg-[#1c1c1c] w-full focus:outline-none focus:ring-2 focus:ring-customBlue"
                        />
                    </div>

                    <div className="flex justify-between  gap-4">
                        {/* type */}
                        <div className="flex items-center gap-4">
                        <h2 className="text-sm font-extralight">Type:</h2>
                        <label className="text-sm font-extralight flex items-center gap-2">
                            <input
                                type="checkBox"
                                name="type"
                                value="expense"
                                checked={newTransaction.type === "expense"}
                                onChange={() => setNewTransaction((prev) => ({ ...prev, type: "expense" }))}
                                className="form-checkbox w-5 h-5 border-2 border-customBlue rounded text-customBlue"
                            />
                            Expense
                        </label>
                        <label className="text-sm font-extralight flex items-center gap-2">
                            <input
                                type="checkBox"
                                name="type"
                                value="income"
                                checked={newTransaction.type === "income"}
                                onChange={() => setNewTransaction((prev) => ({ ...prev, type: "income" }))}
                                className="form-checkbox w-5 h-5 border-2 border-customBlue rounded text-customBlue"
                            />
                            Income
                        </label>

                        </div>
                            <button
                        onClick={() => console.log(newTransaction)}
                        className="px-5 py-[0.2rem] bg-customBlue text-white rounded hover:bg-zinc-800 text-sm font-extralight"
                    >
                        Add
                    </button>

                    </div>

                </div>
            </div>
        </div>
    );
}
