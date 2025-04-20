import React, { useState } from 'react';
import axios from 'axios';
import './AddCandidate.css';

const AddCandidate = ({ onClose,setRefresh }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    phonenumber: '',
    experience: '',
    email: '',
    position: '',
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

    const { fullname, phonenumber, experience, email, position, resume } = formData;

    if (!fullname || !phonenumber || !experience || !email || !position || !resume) {
      showNotification('Please fill in all fields and attach resume.', 'error');
      return;
    }

    const token = localStorage.getItem('token');
    const data = new FormData();

    data.append('fullname', fullname);
    data.append('phonenumber', phonenumber);
    data.append('experience', experience);
    data.append('email', email);
    data.append('position', position);
    data.append('resume', resume);
    console.log(data.fullname)
    try {
      const res = await axios.post('https://hrms-backend-muyw.onrender.com/api/candidate/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
        },
      });

      showNotification('Candidate Added Successfully', 'success');
      setRefresh(prev => !prev);
      // onClose();
      setFormData({
        fullname: '',
        phonenumber: '',
        experience: '',
        email: '',
        position: '',
        resume: null,
      });
      setIsChecked(false);
    } catch (err) {
      console.log(err);
      const msg = err?.response?.data?.message || 'Failed to add candidate.';
      showNotification(msg, 'error');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>Add New Candidate</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form className="modal-form" onSubmit={handleSave}>
          <div className="form-row">
            <input
              type="text"
              placeholder="Full Name*"
              name="fullname"
              required
              value={formData.fullname}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email Address*"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              placeholder="Phone Number*"
              name="phonenumber"
              required
              value={formData.phonenumber}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Position*"
              name="position"
              required
              value={formData.position}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              placeholder="Experience*"
              name="experience"
              required
              value={formData.experience}
              onChange={handleChange}
            />
            <div className="upload-box">
              <input
                type="file"
                name="resume"
                required
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
              />
              <span className="upload-icon">📎</span>
            </div>
          </div>

          <div className="checkbox-row">
            <input
              type="checkbox"
              id="confirm"
              required
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
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

export default AddCandidate;
