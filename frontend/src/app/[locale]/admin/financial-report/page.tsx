"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CartesianGrid, LineChart, Tooltip, Line } from "recharts";
import TransactionModal from "./TransactionModal";

const FinancialReport = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [net, setNet] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [newTransaction, setNewTransaction] = useState({
    name: "",
    category: "",
    amount: "",
    type: "Expense",
  });
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const apiUrl = "http://localhost:5000/api/finance";

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data.data;
        setTransactions(data.transactions);
        setIncome(data.summary.income);
        setExpense(data.summary.expense);
        setNet(data.summary.net);

        const monthlyData = calculateMonthlyData(data.transactions);
        setChartData(monthlyData);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setError("Failed to load transactions. Please try again later.");
      });
  }, []);

  const calculateMonthlyData = (transactions: any[]) => {
    const monthlyTotals = Array.from({ length: 12 }, (_, month) => {
      const monthName = new Date(2024, month).toLocaleString("default", {
        month: "long",
      });
      const total = transactions
        .filter((t) => new Date(t.createdAt).getMonth() === month)
        .reduce((sum, t) => sum + t.amount, 0);
      return { month: monthName, amount: total };
    });
    return monthlyTotals;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleRowClick = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const addTransaction = () => {
    const { name, category, amount, type } = newTransaction;
    const transactionAmount = parseFloat(amount);
    if (isNaN(transactionAmount) || transactionAmount <= 0) return;
    if (!name || !category || !amount || !type) {
      setError("All fields are required!");
      return;
    }

    axios
      .post(apiUrl, { name, category, amount: transactionAmount, type })
      .then((response) => {
        setTransactions((prev) => [...prev, response.data.transaction]);
        setChartData(calculateMonthlyData([...transactions, response.data.transaction]));
        setNewTransaction({ name: "", category: "", amount: "", type: "Expense" });
        setError("");
      })
      .catch((error) => {
        console.error("Error adding transaction:", error);
        setError("Failed to add transaction.");
      });
  };

  return (
<div className="text-white p-4 md:p-6 bg-black">
  {error && <div className="text-red-500 mb-4">{error}</div>}
  
  {/* Chart Section */}
  <div className="p-4 bg-[#121212] rounded-lg my-4">
    <LineChart data={chartData} width={970} height={300}>
      <CartesianGrid stroke="#333" strokeDasharray="4 4" strokeOpacity={0.3} />
      <Tooltip
        contentStyle={{
          backgroundColor: "#121212",
          border: "1px solid #333",
          borderRadius: "8px",
        }}
        itemStyle={{ color: "#00bfff", fontSize: "12px" }}
      />
      <Line
        type="monotone"
        dataKey="amount"
        stroke="#00bfff"
        dot={{ r: 5, fill: "#00bfff" }}
      />
    </LineChart>
  </div>
  
  {/* Summary Section */}
  <div className="flex flex-col md:flex-row justify-between items-center text-lg mt-4 p-4 bg-[#121212] rounded-lg gap-4">
    <div className="text-sm font-extralight">
      Income: <span className="text-xl font-bold">{income} Birr</span>
    </div>
    <div className="text-sm font-extralight">
      Expense: <span className="text-xl font-bold">{expense} Birr</span>
    </div>
    <div className="text-sm font-extralight">
      Net: <span className="text-xl font-bold">{net} Birr</span>
    </div>
  </div>

  {/* Main Content */}
  <div className="flex flex-col lg:flex-row gap-6 mt-6">
    {/* Transactions Table */}
    <div className="w-full lg:flex-1">
      <div className="overflow-x-auto bg-[#121212] rounded-lg">
        <table className="min-w-full text-white">
          <thead>
            <tr className="p-4 bg-[#1c1c1c]">
              <th className="px-4 py-2 text-left text-sm font-semibold">Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Date</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Category</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={index}
                className="font-extralight text-sm cursor-pointer hover:bg-zinc-800"
                onClick={() => handleRowClick(transaction)}
              >
                <td
                  className={`px-4 py-2 ${
                    transaction.type === "Expense" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {transaction.name}
                </td>
                <td
                  className={`px-4 py-2 ${
                    transaction.type === "Expense" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </td>
                <td
                  className={`px-4 py-2 ${
                    transaction.type === "Expense" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {transaction.category}
                </td>
                <td
                  className={`px-4 py-2 ${
                    transaction.type === "Expense" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {transaction.amount} Birr
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
          className="px-3 py-2 rounded bg-[#1c1c1c] w-full focus:outline-none focus:ring-[0.5px] focus:ring-customBlue"
        />
        <input
          type="text"
          placeholder="Category"
          name="category"
          value={newTransaction.category}
          onChange={handleInputChange}
          className="px-3 py-2 rounded bg-[#1c1c1c] w-full focus:outline-none focus:ring-[0.5px] focus:ring-customBlue"
        />
        <input
          type="number"
          placeholder="Amount"
          name="amount"
          value={newTransaction.amount}
          onChange={handleInputChange}
          className="px-3 py-2 rounded bg-[#1c1c1c] w-full focus:outline-none focus:ring-[0.5px] focus:ring-customBlue"
        />
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-extralight">Type:</h2>
          <label className="text-sm font-extralight flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value="Expense"
              checked={newTransaction.type === "Expense"}
              onChange={handleInputChange}
              className="form-checkbox w-5 h-5 border-2 border-customBlue rounded text-customBlue"
            />
            Expense
          </label>
          <label className="text-sm font-extralight flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value="Income"
              checked={newTransaction.type === "Income"}
              onChange={handleInputChange}
              className="form-checkbox w-5 h-5 border-2 border-customBlue rounded text-customBlue"
            />
            Income
          </label>
        </div>
        <button
          className="px-6 py-2 rounded bg-customBlue text-sm text-black font-bold"
          onClick={addTransaction}
        >
          Add
        </button>
      </div>
    </div>
  </div>

  {isModalOpen && (
    <TransactionModal
      transaction={selectedTransaction}
      closeModal={() => setIsModalOpen(false)}
      updateTransactions={(updatedTransaction, deleted = false) => {
        console.log("Updated Transaction:", updatedTransaction);
        if (deleted) {
          const updatedList = transactions.filter((t) => t.id !== updatedTransaction.id);
          setTransactions(updatedList);
          setChartData(calculateMonthlyData(updatedList));
        } else {
          const updatedList = transactions.map((t) =>
            t.id === updatedTransaction.id ? updatedTransaction : t
          );
          setTransactions(updatedList);
          setChartData(calculateMonthlyData(updatedList));
        }
      }}
    />
  )}
</div>
  );
};

export default FinancialReport;
