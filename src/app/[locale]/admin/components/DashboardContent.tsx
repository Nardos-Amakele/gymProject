import React from 'react';
import { dashboardData } from '../../../../../assets/data/dashboardData';

const DashboardContent: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(dashboardData.stats).map(([label, value]) => (
          <div key={label} className="bg-gray-700 p-4 rounded-lg text-center text-white">
            <p className="text-2xl font-bold">{value}</p>
            <p>{label.replace(/([A-Z])/g, " $1").trim()}</p>
          </div>
        ))}
      </div>

      {/* Pending Members */}
      <div className="bg-gray-800 rounded-lg p-4 text-white">
        <h2 className="text-lg font-semibold mb-2">Pending Members</h2>
        <div className="grid grid-cols-3 gap-4 text-sm">
          {dashboardData.members.map((member, index) => (
            <div key={index} className="flex justify-between p-2">
              <span>{member.name}</span>
              <span>{member.phone}</span>
              <span>{member.type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Chart - Placeholder */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-white">Attendance</h2>
        {/* Chart code goes here */}
      </div>
    </div>
  );
};

export default DashboardContent;
