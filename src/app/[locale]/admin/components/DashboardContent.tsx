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
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className='flex gap-4'>
      <div className="flex gap-4">
        {Object.entries(dashboardData.stats).map(([label, value]) => (
          <div key={label} className="bg-[#121212] border border-[#23363f] py-3 px-8  rounded-lg h-fit text-center text-white">
            <FontAwesomeIcon icon={getIcon(label)} className="text-3xl mb-2 text-customBlue" />
            <p className="text-3xl font-bold">{value}</p>
            <p className='text-small font-light pt-2'>{label.replace(/([A-Z])/g, " $1").trim()}</p>
          </div>
        ))}
      </div>
      {/* pie chart */}
      <div>
      <PieChartComponent />
      </div>

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

      {/* Attendance Chart */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-white mb-4">Attendance</h2>
        <div className="grid grid-cols-2 gap-6">
          <BarChartComponent />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
