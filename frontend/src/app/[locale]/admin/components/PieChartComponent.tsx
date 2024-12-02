"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type ChartDataItem = {
  category: string;
  value: number;
  fill: string;
};

const colorMap: Record<string, string> = {
  "Body Building": "#4A90E2",
  "Group Fitness": "#7ED321",
  "Exercise": "#D0021B",
  "Personal Training": "#F8E71C",
  "Gym": "#F5A623",
};

const chartConfig = {
  bodyBuilding: { label: "Body Building", color: "#4A90E2" },
  groupAerobics: { label: "Group Aerobics", color: "#7ED321" },
  exercise: { label: "Exercise", color: "#D0021B" },
  personalTraining: { label: "Personal Training", color: "#F8E71C" },
} satisfies ChartConfig;


const PieChartComponent: React.FC = () => {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard/pieChartData");
        if (response.data.success) {
          const breakdown = response.data.data.breakdown;
          const formattedData = breakdown.map((item: any) => ({
            category: item.category,
            value: item.memberCount,
            fill: colorMap[item.category] || "#cccccc",
          }));
          setChartData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  const totalValue = useMemo(() => chartData.reduce((acc, curr) => acc + curr.value, 0), [chartData]);

  if (loading) {
    return <p className="text-center text-white">Loading chart data...</p>;
  }

  return (
    <Card className="border-none bg-[#121212] text-white w-full max-w-4xl mx-auto">
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
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
