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
import { useState } from "react";
import { dashboardData } from "../../../../../assets/data/dashboardData";

const weeklyData = dashboardData.attendance.map((value, index) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return { day: days[index], attendance: value };
});

const monthlyData = Array.from({ length: 30 }, (_, index) => ({
  day: `Day ${index + 1}`,
  attendance: Math.floor(Math.random() * 50 + 10), 
}));

const yearlyData = Array.from({ length: 12 }, (_, index) => ({
  day: new Date(2024, index).toLocaleString("default", { month: "short" }),
  attendance: Math.floor(Math.random() * 500 + 200),
}));

export function BarChartComponent() {
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");
  const [chartData, setChartData] = useState(weeklyData);

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const period = e.target.value;
    setSelectedPeriod(period);

    if (period === "Weekly") {
      setChartData(weeklyData);
    } else if (period === "Monthly") {
      setChartData(monthlyData);
    } else if (period === "Yearly") {
      setChartData(yearlyData);
    }
  };

  return (
      <div className="bg-[#121212] text-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Attendance</h2>
          <select
            value={selectedPeriod}
            onChange={handlePeriodChange}
            className="text-gray-400 bg-[#121212] border border-gray-500 px-3 py-1 rounded-full text-sm cursor-pointer"
          >
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Yearly</option>
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
