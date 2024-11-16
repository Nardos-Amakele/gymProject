"use client";

import React, { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="border-none bg-[#121212] text-white w-full max-w-4xl mx-auto">
      <CardContent className="grid grid-cols-1 md:grid-cols-2  gap-6 items-center">
        <ChartContainer config={chartConfig} className="mx-auto w-full max-w-[220px] h-[220px]">
          <PieChart width={220} height={220}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="p-1" hideLabel />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="category"
              innerRadius={60}
              outerRadius={90}
              stroke="none"
            >
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
                      <tspan dy="-1.5em" className="fill-white text-base font-medium">Total</tspan>
                      <tspan x={viewBox.cx} dy="1.5em" className="fill-white text-base font-medium">Members</tspan>
                      <tspan x={viewBox.cx} dy="2em" className="fill-white text-sm font-light">{totalValue}</tspan>
                    </text>
                  ) : null
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="space-y-2 text-small max-h-[250px] pr-5">
          {chartData.map((entry) => (
            <div key={entry.category} className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-sm" style={{ backgroundColor: entry.fill }}></span>
                <span>{entry.category}</span>
              </div>
              <span className="font-extralight">{entry.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChartComponent;
