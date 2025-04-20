import React, { useState } from 'react';
import Sidebar from './Sidebar';
import CandidateTable from './CandidateTable';
import AddCandidate from './AddCandidate';

const CandidateDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px'}}>
        <CandidateTable onAddClick={() => setShowModal(true)} />
        {showModal && <AddCandidate onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
};

export default CandidateDashboard;
