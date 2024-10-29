"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const ChartData = [
  { month: "January", attendance: 186 },
  { month: "February", attendance: 305 },
  { month: "March", attendance: 237 },
  { month: "April", attendance: 73 },
  { month: "May", attendance: 209 },
  { month: "June", attendance: 214 },
];

// Define chart configuration for attendance
const chartConfig: ChartConfig = {
  attendance: {
    label: "Attendance",
    color: "white", // Ensure --chart-1 is defined in your CSS
  },
};

const BarChartComponent: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <h2>Attendance Over Time</h2>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={ChartData} width={500} height={300}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {/* Use the color from chartConfig */}
            <Bar dataKey="attendance" fill="white" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BarChartComponent;
