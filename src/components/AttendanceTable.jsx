import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AttendanceTable.css';

const AttendanceTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/employee', {
        headers: { authorization: `Bearer ${token}` },
      });
      setEmployees(res.data.Employees);
    } catch (err) {
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceChange = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `http://localhost:5000/api/employee/attendance/${id}`,
        { attendance: status },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        setEmployees((prev) =>
          prev.map((emp) =>
            emp._id === id ? { ...emp, attendance: status } : emp
          )
        );
      } else {
        alert('Something went wrong while updating!');
      }
    } catch (err) {
      console.error('Error updating attendance:', err);
      alert('Failed to update attendance. Please try again.');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((emp) => {
    const matchesStatus = filterStatus ? emp.attendance === filterStatus : true;
    const matchesSearch = emp.fullname.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="attendance-table">
      <div className="header">
        <h2>Attendance</h2>
        <div className="controls">
          <select
            className="status-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <p>Loading attendance...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Employee Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Task</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((e) => (
              <tr key={e._id}>
                <td>
                  <img src={e.profileUrl || '/default-profile.png'} alt="Profile" className="profile-pic" />
                </td>
                <td>{e.fullname}</td>
                <td>{e.position}</td>
                <td>{e.department}</td>
                <td>{e.task || '--'}</td>
                <td>
                  <select
                    className={`status-dropdown ${e.attendance === 'Present' ? 'present' : 'absent'}`}
                    value={e.attendance || ''}
                    onChange={(e2) => handleAttendanceChange(e._id, e2.target.value)}
                  >
                    <option value="">--</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </td>
                <td>
                  <button className="action-btn">⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceTable;
