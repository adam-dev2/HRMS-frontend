import React, { useState } from 'react';
import Sidebar from './Sidebar';
import EmployeeTable from './EmployeeTable';
import AddEmployee from './AddEmployee';

const EmployeeDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px'}}>
        <EmployeeTable onAddClick={() => setShowModal(true)} />
        {showModal && <AddEmployee onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
