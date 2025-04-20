import React, { useState } from 'react';
import axios from 'axios';
import './AddEmployee.css'; 

const AddEmployee = ({ onClose, setRefresh }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    phonenumber: '',
    position: '',
    email: '',
    department: '',
    dateOfJoining: '',
  });

  const [isChecked, setIsChecked] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
    const { fullname, phonenumber, position, email, department, dateOfJoining } = formData;

    if (!fullname || !phonenumber || !position || !email || !department || !dateOfJoining) {
      showNotification('All fields are required.', 'error');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('https://hrms-backend-muyw.onrender.com/api/employee/create', formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      showNotification('Employee Added Successfully', 'success');
      setRefresh(prev => !prev);
      setFormData({
        fullname: '',
        phonenumber: '',
        position: '',
        email: '',
        department: '',
        dateOfJoining: '',
      });
      setIsChecked(false);
      onClose(); // close after success
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to add employee.';
      showNotification(msg, 'error');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>Add New Employee</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form className="modal-form" onSubmit={handleSave}>
          <div className="form-row">
            <input
              type="text"
              placeholder="Full Name*"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Email Address*"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              placeholder="Phone Number*"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              required
            />
            <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                >
                <option value="">Select Position*</option>
                <option value="Intern">Intern</option>
                <option value="FullTime">FullTime</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Team Lead">Team Lead</option>
                </select>


          </div>

          <div className="form-row">
            <input
              type="text"
              placeholder="Department*"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              placeholder="Date of Joining*"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleChange}
              required
            />
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
              I hereby declare that the above information is true to the best of my knowledge and belief
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
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
