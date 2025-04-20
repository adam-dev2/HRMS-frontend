import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddCandidate from '../components/AddCandidate';
import './CandidateTable.css';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); 

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/candidate/edit/${id}`, {
        status: newStatus,
      }, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setCandidates(prev =>
        prev.map(c =>
          c._id === id ? { ...c, status: newStatus } : c
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const toggleDropdown = (id) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/candidate/delete/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setCandidates((prev) => prev.filter((c) => c._id !== id));
      setActiveDropdown(null);
    } catch (err) {
      console.error("Failed to delete candidate", err);
    }
  };

  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/candidate', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setCandidates(res.data.Candidates);
    } catch (err) {
      console.error("Error fetching candidates:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [refresh]);

  const filteredCandidates = candidates.filter((c) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      c.fullname?.toLowerCase().includes(term) ||
      c.email?.toLowerCase().includes(term) ||
      c.phonenumber?.toLowerCase().includes(term);

    const matchesStatus = statusFilter ? c.status.toLowerCase() === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="candidates">
      <div className="header">
        <h2>Candidates</h2>
        <div className="controls">
          <select
            className="status-dropdown"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)} 
          >
            <option value="">Status</option>
            <option value="new">New</option>
            <option value="ongoing">Ongoing</option>
            <option value="rejected">Rejected</option>
          </select>
          <select className="status-dropdown">
            <option>Position</option>
            <option value="Designer">Designer</option>
            <option value="Full Stack">Full Stack</option>
            <option value="DevOps">DevOps</option>
            <option value="Backend">Backend</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="add-btn" onClick={() => setShowAddModal(true)}>
            Add Candidate
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading candidates...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Sr no.</th>
              <th>Candidate Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Status</th>
              <th>Experience</th>
              <th>Resume</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((c, i) => (
              <tr key={c._id || i}>
                <td>{`0${i + 1}`}</td>
                <td>{c.fullname}</td>
                <td>{c.email}</td>
                <td>{c.phonenumber}</td>
                <td>{c.position}</td>
                <td>
                  <select
                    className={`status-dropdown ${c.status?.toLowerCase()}`}
                    value={c.status?.toLowerCase()}
                    onChange={(e) => handleStatusChange(c._id, e.target.value)}
                  >
                    <option value="new">New</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="selected">Selected</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td>{c.experience}</td>
                <td>
                  {c.resume ? (
                    <a href={`http://localhost:5000/${c.resume}`} target="_blank" rel="noreferrer">
                      View
                    </a>
                  ) : (
                    <span style={{ color: 'gray', fontSize: '13px' }}>No resume</span>
                  )}
                </td>
                <td>
                  <div className="action-wrapper">
                    <button className="action-btn" onClick={() => toggleDropdown(c._id)}>⋮</button>
                    {activeDropdown === c._id && (
                      <div className="dropdown">
                        {c.resume ? (
                          <a
                            href={`http://localhost:5000/${c.resume}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Download Resume
                          </a>
                        ) : (
                          <span style={{ color: 'gray', fontSize: '13px' }}></span>
                        )}
                        <button onClick={() => handleDelete(c._id)}>Delete</button>
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
        <AddCandidate
          onClose={() => setShowAddModal(false)}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
};

export default Candidates;
