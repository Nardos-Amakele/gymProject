"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import axios from "axios";

export function BarChartComponent() {
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/dashboard/attendanceData");
      if (response.data.success) {
        updateChartData(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      setLoading(false);
    }
  };

  const updateChartData = (data: any) => {
    if (selectedPeriod === "Weekly") {
      const weeklyData = data.weekly.map((item: any) => ({
        day: new Date(item.date).toLocaleDateString("en-US", { weekday: "short" }),
        attendance: item.count,
      }));
      setChartData(weeklyData);
    } else if (selectedPeriod === "Monthly") {
      const monthlyData = data.monthly.map((item: any) => ({
        day: new Date(item.date).getDate(), 
        attendance: item.count,
      }));
      setChartData(monthlyData);
    } else if (selectedPeriod === "Yearly") {
      const yearlyData = data.yearly.map((item: any) => ({
        day: item.month,
        attendance: item.count,
      }));
      setChartData(yearlyData);
    }
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [selectedPeriod]);

  if (loading) {
    return <p className="text-white">Loading chart data...</p>;
  }

  return (
    <div className="bg-[#121212] text-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Attendance</h2>
        <select
  value={selectedPeriod}
  onChange={handlePeriodChange}
  className="text-gray-400 bg-[#121212] border border-gray-500 px-3 py-1 rounded-full text-sm cursor-pointer] focus:ring-customBlue-500 focus:border-customBlue-500
  hover:bg-gray-800 active:bg-gray-700"
>
  <option className="bg-[#121212] text-white hover:bg-gray-800">Weekly</option>
  <option className="bg-[#121212] text-white hover:bg-gray-800">Monthly</option>
  <option className="bg-[#121212] text-white hover:bg-gray-800">Yearly</option>
</select>
      </div>
      <div style={{ width: "100%", height: 200 }} className="w-full h-[12rem]">
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: -30, bottom: 0 }}>
            <CartesianGrid stroke="#2C2C2C" strokeDasharray="3 3" vertical={false} />
            <XAxis
              className="text-tiny"
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: "white" }}
            />
            <YAxis
              className="text-tiny"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "white" }}
              domain={[0, "dataMax + 10"]}
            />
            <Tooltip
              cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
              contentStyle={{ backgroundColor: "#333", borderColor: "#333" }}
              labelStyle={{ color: "#9CA3AF" }}
              itemStyle={{ color: "#fff" }}
            />
            <Bar
              dataKey="attendance"
              fill="#2596BE"
              radius={[10, 10, 0, 0]}
              stroke="#2C2C2C"
              strokeWidth={1}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarChartComponent;
