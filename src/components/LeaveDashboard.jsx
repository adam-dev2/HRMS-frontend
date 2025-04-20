import React from 'react';
import Sidebar from './Sidebar';
import LeaveTable from './LeaveTable';

const LeaveDashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <LeaveTable />
      </div>
    </div>
  );
};

export default LeaveDashboard;
