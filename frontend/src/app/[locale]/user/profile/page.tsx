'use client'
import Image from "next/image";
import React from "react";
import profile from '../../../../../assets/images/pp.png'
import { CartesianGrid, LineChart, Tooltip, Line, XAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CardContent } from "@/components/ui/card";

const bmiData = [
  { date: "2024-01-01", bmi: 22.4 }, 
  { date: "2024-02-01", bmi: 22.7 }, 
  { date: "2024-03-01", bmi: 23.1 }, 
  { date: "2024-04-01", bmi: 23.9 }, 
  { date: "2024-05-01", bmi: 24.6 }, 
  { date: "2024-06-01", bmi: 25.1 }, 
  { date: "2024-07-01", bmi: 25.4 }, 
  { date: "2024-08-01", bmi: 26.3 }, 
  { date: "2024-09-01", bmi: 27.1 }, 
  { date: "2024-10-01", bmi: 26.8 }, 
  { date: "2024-11-01", bmi: 25.9 }, 
  { date: "2024-12-01", bmi: 25.0 }, 
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig


const page = () => {
  return (
    <div className="flex bg-black gap-3 text-white h-screen">
      {/* Personal Info */}
      <div className="w-1/3 space-y-3">
        {/* Profile Card */}
        <div className="bg-[#111111] rounded-lg flex justify-between ">
          <div className="flex items-center p-6 space-x-4">
            <Image
              src={profile}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-base font-bold">Abebe <br /> Tadesse</h2>
            </div>
          </div>
          {/* Barcode */}
          <div className="mt-4 flex flex-col justify-between gap-5 p-2 pr-3 items-end">
            <div className="h-6 w-16 bg-white"></div>
            <span className="text-customBlue">M</span>
          </div>
        </div>

        {/* Address and Contact Info */}
        <div className=" bg-[#111111] p-6 rounded-lg flex flex-col h-96">
          {/* Information Section */}
          <div className="flex-grow space-y-4">
            {[
              { label: "Phone number:", value: "0987551127" },
              { label: "Email Address:", value: "abebetadese2@gmail.com" },
              { label: "Address:", value: "Dume Kebele" },
              { label: "DOB:", value: "03/07/1992" },
              { label: "Emergency Contact:", value: "0911214578" },
            ].map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-[#6a6a6a] text-sm">{item.label}</span>
                <p className="text-sm">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Edit Profile Button */}
          <button className="text-xs mt-3 bg-customBlue text-black py-1 px-4 rounded-full">
            Edit profile
          </button>
        </div>
      </div>

      {/* Health Info */}
      <div className="w-2/3 bg-[#111111] rounded-lg">
        {/* Membership Info */}
        <div className="bg-[#1b1b1b] m-5 px-3 py-2 border border-[#18282d] rounded-lg flex justify-between items-center">
          <div className="text-sm flex flex-col items-center">
            <p className="text-customBlue font-bold">NORMAL</p>
            <p className="text-white text-tiny font-extralight ">Membership Type</p>
          </div>
          <div className="text-sm flex flex-col items-center">
            <p className="text-customBlue font-bold">7 <span className="text-tiny font-extralight">Days left</span></p>
            <p className="text-white text-tiny font-extralight ">Due Date</p>
          </div>
          <div className="text-sm flex flex-col items-center">
            <p className="text-customBlue font-bold">June 20/2017</p>
            <p className="text-white text-tiny font-extralight ">Member Since</p>
          </div>
          <div className="text-sm flex flex-col items-center">
            <p className="text-customBlue font-bold ">76 <span className="font-extralight text-tiny">Days</span></p>
            <p className="text-white text-tiny font-extralight ">Total Attendance</p>
          </div>
          <div className="text-sm flex flex-col items-center">
            <p className="text-customBlue font-bold">81 <span className="font-extralight text-tiny">kg</span></p>
            <p className="text-white text-tiny font-extralight ">Weight</p>
          </div>
          <div className="text-sm flex flex-col items-center">
            <p className="text-customBlue font-bold">179 <span className="font-extralight text-tiny">cm</span></p>
            <p className="text-white text-tiny font-extralight ">Height</p>
          </div>
          <div className="text-sm flex flex-col items-center">
            <p className="text-customBlue font-bold">22.4 <span className="font-extralight text-tiny">kg/m²</span></p>
            <p className="text-white text-tiny font-extralight ">BMI</p>
          </div>
        </div>

        {/* Health Info */}
        <div className="p-8 rounded-lg flex justify-between items-center">
  <h3 className="text-3xl font-bold">Health <br /> Info.</h3>
  <div className="text-sm font-light w-full ml-20">
    {[
      { label: "Medical conditions", value: "Asthma, Blood Pressure" },
      { label: "Allergies", value: "Asthma, Blood Pressure" },
      { label: "Injuries", value: "Asthma, Blood Pressure" },
      { label: "Medications", value: "Asthma, Blood Pressure" },
    ].map((item, index) => (
      <div key={index} className="flex justify-between items-center py-1">
        <span className="text-white w-1/2">{item.label}</span>
        <p className="text-customBlue pl-4">{item.value}</p>
      </div>
    ))}
  </div>
</div>

        {/* Status */}
        <div className="mt-6 p-8 rounded-lg flex justify-between items-center">
          <h3 className="text-3xl font-bold">Status</h3>
          <div className="text-sm font-light w-full ml-20">
            <div className="flex justify-between">
              <span className="text-white">Level</span>
              <p className="text-customBlue">Intermediate</p>
            </div>
            <div className="flex justify-between">
              <span className="text-white">Goal</span>
              <p className="text-customBlue">Weight Loss</p>
            </div>
          </div>
        </div>

        {/* BMI Chart */}
        <div className="m-6 p-6 rounded-lg border border-[#18282d] bg-[#1b1b1b]">
          <h3 className="text-sm ">BMI</h3>
          <div className="mt-4">
          <CardContent>

          <ChartContainer config={chartConfig}>
          <LineChart
  width={500} 
  height={300} 
  data={bmiData}
  margin={{
    right: 10,
    left: 10,
  }}
>
  <CartesianGrid vertical={false} />
  <XAxis
    dataKey="date"
    tickLine={false}
    axisLine={false}
    tickMargin={8}
    tickFormatter={(value) => value.slice(5, 7)} 
  />
  <Line
    dataKey="bmi"
    type="linear"
    stroke="#2596BE"
    strokeWidth={2}
    dot={false}
  />
</LineChart>
        </ChartContainer>
        </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
