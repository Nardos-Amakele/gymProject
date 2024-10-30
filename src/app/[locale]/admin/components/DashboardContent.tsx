import React from 'react';
import { dashboardData } from '../../../../../assets/data/dashboardData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import PieChartComponent from './PieChartComponent';
import BarChartComponent from './BarChartComponent';

const getIcon = (label: string) => {
  switch (label) {
    case 'totalMembers':
      return faUser;
    case 'totalEmployees':
      return faUserTie;
    case 'newMembers':
      return faUserPlus;
    default:
      return faUser;
  }
};

const DashboardContent: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex flex-col gap-6 lg:w-1/2">
        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {Object.entries(dashboardData.stats).map(([label, value]) => (
            <div
              key={label}
              className="bg-[#121212] border border-[#23363f] py-3 px-4 rounded-lg text-center text-white flex-1"
            >
              <FontAwesomeIcon icon={getIcon(label)} className="text-2xl mb-2 text-customBlue" />
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs font-light pt-1">
                {label.replace(/([A-Z])/g, ' $1').trim()}
              </p>
            </div>
          ))}
        </div>

        {/* Pending Members Section */}
        <div className="text-white mt-5">
          <h2 className="text-lg font-bold mb-4">Pending Member</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border-none text-sm">
              <thead>
                <tr>
                  <th className="text-left font-semibold py-2">Name</th>
                  <th className="text-left font-semibold py-2">Phone</th>
                  <th className="text-left font-semibold py-2">Type</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.members.map((member, index) => (
                  <tr key={index} className="hover:bg-[#333]">
                    <td className="text-zinc-600 font-medium py-2">{member.name}</td>
                    <td className="text-zinc-600 font-medium py-2">{member.phone}</td>
                    <td className="text-zinc-600 font-medium py-2">{member.type}</td>
                    <td className="py-2">
                      <input
                        type="checkbox"
                        className="form-checkbox w-5 h-5 border-2 border-customBlue rounded text-customBlue"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex flex-col gap-6 lg:w-1/2">
        {/* Pie Chart */}
        <div className="bg-[#121212] rounded-lg p-4">
          <PieChartComponent />
        </div>

        {/* Attendance Chart */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Attendance</h2>
          <BarChartComponent />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
