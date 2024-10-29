"use client";

import React, { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { category: "Body Building", value: 120, fill: "#4A90E2" },  
  { category: "Group Aerobics", value: 48, fill: "#7ED321" },    
  { category: "Exercise", value: 60, fill: "#D0021B" },          
  { category: "Personal Training", value: 33, fill: "#F8E71C" }, 
];

const chartConfig = {
  bodyBuilding: { label: "Body Building", color: "#4A90E2" },
  groupAerobics: { label: "Group Aerobics", color: "#7ED321" },
  exercise: { label: "Exercise", color: "#D0021B" },
  personalTraining: { label: "Personal Training", color: "#F8E71C" },
} satisfies ChartConfig;

const PieChartComponent: React.FC = () => {
  const totalValue = useMemo(() => chartData.reduce((acc, curr) => acc + curr.value, 0), []);

  return (
    <Card className="flex flex-col bg-[#121212] text-white">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Members</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="value" nameKey="category" innerRadius={60} outerRadius={80} stroke="none">
              <Label
                content={({ viewBox }) =>
                  viewBox && "cx" in viewBox && "cy" in viewBox ? (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-white"
                    >
                      <tspan className="fill-white text-2xl font-bold">{totalValue}</tspan>
                      <tspan x={viewBox.cx} dy="1.5em" className="fill-gray-400 text-lg">Total Members</tspan>
                    </text>
                  ) : null
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="mt-4 space-y-1">
          {chartData.map((entry) => (
            <div key={entry.category} className="flex justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.fill }}></span>
                <span>{entry.category}</span>
              </div>
              <span>{entry.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChartComponent;
