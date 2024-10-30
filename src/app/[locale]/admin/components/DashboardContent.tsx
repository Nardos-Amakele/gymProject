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
    <div className=" flex gap-6">
      <div className="flex flex-col gap-6 w-1/2">
        {/* Stats Section */}
        <div className="flex gap-4">
          {Object.entries(dashboardData.stats).map(([label, value]) => (
            <div
              key={label}
              className="bg-[#121212] border border-[#23363f] py-3 px-8 rounded-lg text-center text-white flex-1"
            >
              <FontAwesomeIcon icon={getIcon(label)} className="text-3xl mb-2 text-customBlue" />
              <p className="text-3xl font-bold">{value}</p>
              <p className="text-sm font-light pt-2">
                {label.replace(/([A-Z])/g, ' $1').trim()}
              </p>
            </div>
          ))}
        </div>

        {/* Pending Members Section */}
        <div className="text-white mt-5">
          <h2 className="text-lg font-bold mb-6">Pending Member</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border-none">
              <thead>
                <tr>
                  <th className="text-left text-white font-bold text-sm py-3">Name</th>
                  <th className="text-left text-white font-bold text-sm py-3">Phone number</th>
                  <th className="text-left text-white font-bold text-sm py-3">Membership Type</th>
                  <th className="text-left text-white font-bold text-sm py-3"></th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.members.map((member, index) => (
                  <tr key={index} className="hover:bg-[#333]">
                    <td className="text-zinc-600 font-medium text-sm py-2">{member.name}</td>
                    <td className="text-zinc-600 font-medium text-sm py-2">{member.phone}</td>
                    <td className="text-zinc-600 font-medium text-sm py-2">{member.type}</td>
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
      <div className="flex flex-col">
        {/* Pie Chart */}
        <div className="bg-[#121212] rounded-lg text-white">
          <PieChartComponent />
        </div>

        {/* Attendance Chart */}
        <div className="">
          <h2 className="text-lg font-semibold mb-4">Attendance</h2>
          <BarChartComponent />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
