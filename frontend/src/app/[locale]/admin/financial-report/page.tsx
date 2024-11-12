"use client";
import AdminSidebar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";


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
      const monthName = new Date(2024, month).toLocaleString("default", { month: "long" });
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

  const addTransaction = () => {
    const { name, category, amount, type } = newTransaction;
    const transactionAmount = parseFloat(amount);
    if (isNaN(transactionAmount) || transactionAmount <= 0) return;

    axios
      .post(`${apiUrl}/transactions`, {
        name,
        category,
        amount: transactionAmount.toString(),
        type,
      })
      .then((response) => {
        const addedTransaction = response.data.data;
        setTransactions((prev) => [...prev, addedTransaction]);

        if (type === "Income") {
          setIncome((prev) => prev + transactionAmount);
          setNet((prev) => prev + transactionAmount);
        } else {
          setExpense((prev) => prev + transactionAmount);
          setNet((prev) => prev - transactionAmount);
        }

        setChartData(calculateMonthlyData([...transactions, addedTransaction]));

        setNewTransaction({ name: "", category: "", amount: "", type: "Expense" });
        setError("");
      })
      .catch((error) => {
        console.error("Error adding transaction:", error);
        setError("Failed to add transaction. Please try again.");
        });
  };

  return (
    <div className="text-white p-6 bg-black">
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="p-4 bg-[#121212] rounded-lg my-4">
        <LineChart data={chartData} width={970} height={300}>
          <CartesianGrid stroke="#333" strokeDasharray="4 4" strokeOpacity={0.3} />
          <Tooltip contentStyle={{ backgroundColor: "#121212", border: "1px solid #333", borderRadius: "8px", padding: "5px" }}
            itemStyle={{ color: "#00bfff", fontSize: "12px" }} />
          <Line type="monotone" dataKey="amount" stroke="#00bfff" dot={{ r: 5, fill: "#00bfff" }} />
        </LineChart>
      </div>

      <div className="flex justify-between items-center text-lg mt-4 p-4 bg-[#121212] rounded-lg">
        <div className="text-sm font-extralight">Income: <span className="text-xl font-bold">{income} Birr</span></div>
        <div className="text-sm font-extralight">Expense: <span className="text-xl font-bold">{expense} Birr</span></div>
        <div className="text-sm font-extralight">Net: <span className="text-xl font-bold">{net} Birr</span></div>
      </div>

      <div className="bg-black flex flex-col lg:flex-row gap-6 mt-6">
        <div className="w-full lg:flex-1">
          <table className="min-w-full text-white">
            <thead>
              <tr className="p-4 bg-[#121212] rounded-lg">
                <th className="px-4 py-2 text-left text-sm font-semibold">Name</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Date</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Category</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="font-extralight text-sm">
                  <td className={`px-4 py-2 ${transaction.type === "Expense" ? "text-red-500" : "text-green-500"}`}>{transaction.name}</td>
                  <td className={`px-4 py-2 ${transaction.type === "Expense" ? "text-red-500" : "text-green-500"}`}>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                  <td className={`px-4 py-2 ${transaction.type === "Expense" ? "text-red-500" : "text-green-500"}`}>{transaction.category}</td>
                  <td className={`px-4 py-2 ${transaction.type === "Expense" ? "text-red-500" : "text-green-500"}`}>{transaction.amount} Birr</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full lg:flex-1 p-4 bg-[#121212] rounded-lg">
          <div className="font-bold text-sm mb-2">New Transaction</div>
          <div className="flex flex-col gap-2 mb-2 text-sm font-extralight">
            <input type="text" placeholder="Name" name="name" value={newTransaction.name} onChange={handleInputChange} className="px-3 py-2 rounded bg-[#1c1c1c] w-full focus:outline-none focus:ring-[0.5px] focus:ring-customBlue" />
            <input type="text" placeholder="Category" name="category" value={newTransaction.category} onChange={handleInputChange} className="px-3 py-2 rounded bg-[#1c1c1c] w-full focus:outline-none focus:ring-[0.5px] focus:ring-customBlue" />
            <input type="number" placeholder="Amount" name="amount" value={newTransaction.amount} onChange={handleInputChange} className="px-3 py-2 rounded bg-[#1c1c1c] w-full focus:outline-none focus:ring-[0.5px] focus:ring-customBlue" />
          </div>
          <div className="flex justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-sm font-extralight">Type:</h2>
              <label className="text-sm font-extralight flex items-center gap-2">
                <input type="radio" name="type" value="Expense" checked={newTransaction.type === "Expense"} onChange={() => setNewTransaction((prev) => ({ ...prev, type: "Expense" }))} className="form-radio w-5 h-5 border-2 border-customBlue rounded text-customBlue" />
                Expense
              </label>
              <label className="text-sm font-extralight flex items-center gap-2">
                <input type="radio" name="type" value="Income" checked={newTransaction.type === "Income"} onChange={() => setNewTransaction((prev) => ({ ...prev, type: "Income" }))} className="form-radio w-5 h-5 border-2 border-customBlue rounded text-customBlue" />
                Income
              </label>
            </div>
            <button onClick={addTransaction} className="bg-customBlue hover:bg-opacity-80 px-6 py-2 rounded-md">Add Transaction</button>
          </div>
        </div>
      </div>
    </div>
  );
};


const Page = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="hidden lg:block sticky top-0">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader />

        {/* Financial Report Component */}
        <FinancialReport />
      </div>
    </div>
  );
};

export default Page;