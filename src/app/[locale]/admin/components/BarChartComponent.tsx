"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { dashboardData } from '../../../../../assets/data/dashboardData';

export const description = "Weekly attendance bar chart";

// Sample data transformation
const attendanceData = dashboardData.attendance.map((value, index) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return { day: days[index], attendance: value };
});

export function BarChartComponent() {
  return (
    <div className="bg-[#121212] text-white p-6 rounded-lg shadow-lg w-[33rem] mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Attendance</h2>
        <select className="text-gray-400 bg-[#121212] border border-gray-500 px-3 py-1 rounded-full text-sm cursor-pointer">
          <option>This Week</option>
          <option>Last Week</option>
          <option>2 Weeks Ago</option>
        </select>
      </div>
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <BarChart data={attendanceData} margin={{ top: 20, right: 30, left: -30, bottom: 0 }}>
            <CartesianGrid stroke="#2C2C2C" strokeDasharray="3 3" vertical={false} />
            <XAxis
            className="text-sm"
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: "white" }}
            />
            <YAxis
            className="text-sm fill-current"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "white" }}
              domain={[0, 'dataMax + 10']}
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
