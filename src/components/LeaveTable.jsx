import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddLeave from './AddLeave';
import './EmployeeTable.css';

const LeaveTable = () => {
  const [leaves, setLeaves] = useState([]);
  const [Employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://hrms-backend-muyw.onrender.com/api/leave', {
        headers: { authorization: `Bearer ${token}` },
      });
      setLeaves(res.data.Leaves);
    } catch (err) {
      console.error('Error fetching leaves:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://hrms-backend-muyw.onrender.com/api/employee', {
        headers: { authorization: `Bearer ${token}` },
      });
      setEmployees(res.data.Employees);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => {
    fetchLeaves();
    fetchEmployees();
  }, [refresh]);

  return (
    <div className="employees">
      <div className="header">
        <h2>Leaves</h2>
        <div className="controls">
          <select
            className="status-dropdown"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)} 
          >
            <option value="">Department</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="HR">HR</option>
          </select>
          
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <button className="add-btn" onClick={() => setShowAddModal(true)}>
            Add Leave
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading leaves...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Sr no.</th>
              <th>Name</th>
              <th>Date</th>
              <th>Designation</th>
              <th>Document</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((l, i) => (
              <tr key={l._id || i}>
                <td>{`0${i + 1}`}</td>
                <td>{}</td>
                <td>{l.date ? new Date(l.date).toLocaleDateString('en-US') : '-'}</td>
                <td>{l.designation || '-'}</td>
                <td>
                  {l.documents ? (
                    <a
                      href={`https://hrms-backend-muyw.onrender.com/${l.documents.replace(/\\/g, '/')}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  ) : (
                    <span style={{ color: 'gray', fontSize: '13px' }}>No document</span>
                  )}
                </td>
                <td>
                  <select defaultValue={l.status?.toLowerCase()}>
                    <option value='pending'>Pending</option>
                    <option value='approve'>Approve</option>
                    <option value='rejected'>Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showAddModal && (
        <AddLeave
          onClose={() => setShowAddModal(false)}
          setRefresh={setRefresh}
          Employees={Employees}
        />
      )}
    </div>
  );
};

export default LeaveTable;
