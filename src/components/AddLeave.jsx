import React, { useState } from 'react';
import axios from 'axios';
import './AddCandidate.css';

const AddLeave = ({ onClose, setRefresh, Employees }) => {
  const [formData, setFormData] = useState({
    employee: '',
    date: '',
    reason: '',
    designation: '',
    resume: null,
  });

  const [isChecked, setIsChecked] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const { employee, date, reason, designation, documents } = formData;

    if (!employee || !date || !reason || !designation || !documents) {
      showNotification('Please fill all required fields.', 'error');
      return;
    }

    const token = localStorage.getItem('token');
    const data = new FormData();
    data.append('employee', employee);
    data.append('date', date);
    data.append('reason', reason);
    data.append('designation', designation);
    data.append('resume', resume);

    try {
      await axios.post('https://hrms-backend-muyw.onrender.com/api/leave/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      showNotification('Leave request submitted successfully!', 'success');
      setRefresh((prev) => !prev);
      setFormData({
        employee: '',
        date: '',
        reason: '',
        designation: '',
        documents: null,
      });
      setIsChecked(false);
      onClose();
    } catch (err) {
      const msg = err?.response?.data?.error || 'Failed to submit leave.';
      console.error('Leave submission error:', msg);
      showNotification(msg, 'error');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>Add Leave</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form className="modal-form" onSubmit={handleSave}>
          <div className="form-row">
            <select
              name="employee"
              value={formData.employee}
              onChange={handleChange}
              required
            >
              <option value="">Select Employee*</option>
              {Employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.fullname}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Reason for Leave*"
              required
            />

            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Designation*"
              required
            />
          </div>

          <div className="form-row">
            <label className="upload-box">
              <input
                type="file"
                name="resume"
                onChange={handleChange}
                required
                accept=".pdf,.doc,.docx"
              />
              <span className="upload-icon">📎 Attach Document</span>
            </label>
          </div>

          <div className="checkbox-row">
            <input
              type="checkbox"
              id="confirm"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              required
            />
            <label htmlFor="confirm">
              I confirm the above leave details are accurate.
            </label>
          </div>

          {notification.message && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}

          <button
            type="submit"
            className={`submit-btn ${isChecked ? 'active' : ''}`}
            disabled={!isChecked}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLeave;
