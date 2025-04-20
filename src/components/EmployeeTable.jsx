import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddEmployee from './AddEmployee';
import './EmployeeTable.css';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  const toggleDropdown = (id) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  const filteredEmployees = employees.filter((e) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      e.fullname?.toLowerCase().includes(term) ||
      e.email?.toLowerCase().includes(term) ||
      e.phonenumber?.toLowerCase().includes(term);

    const matchesDepartment = departmentFilter
      ? e.department.toLowerCase() === departmentFilter.toLowerCase()
      : true;

    return matchesSearch && matchesDepartment;
  });

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://hrms-backend-muyw.onrender.com/api/employee/delete/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setEmployees((prev) => prev.filter((e) => e._id !== id));
      setActiveDropdown(null);
    } catch (err) {
      console.error('Failed to delete employee', err);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [refresh]);

  return (
    <div className="employees">
      <div className="header">
        <h2>Employees</h2>
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
            Add Employee
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Sr no.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Position</th>
              <th>Department</th>
              <th>Date of Joining</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((e, i) => (
              <tr key={e._id || i}>
                <td>{`0${i + 1}`}</td>
                <td>{e.fullname}</td>
                <td>{e.email}</td>
                <td>{e.phonenumber}</td>
                <td>{e.position}</td>
                <td>{e.department}</td>
                <td>{new Date(e.dateOfJoining).toLocaleDateString()}</td>
                <td>
                  <div className="action-wrapper">
                    <button className="action-btn" onClick={() => toggleDropdown(e._id)}>⋮</button>
                    {activeDropdown === e._id && (
                      <div className="dropdown">
                        <button onClick={() => handleDelete(e._id)}>Delete</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showAddModal && (
        <AddEmployee
          onClose={() => setShowAddModal(false)}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
};

export default EmployeeTable;
