import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AttendanceTable from './AttendanceTable';

const AttendanceDashboard = () => {
  
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px'}}>
        <AttendanceTable onAddClick={() => setShowModal(true)} />
      </div>
    </div>
  );
};

export default AttendanceDashboard;
