import { useState } from 'react';
import axios from 'axios';
import './RegistrationCard.css'

const Registration = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000); 
  };

  const handleRegister = async () => {
    const { fullname, email, password, confirmPassword } = formData;

    if (!fullname || !email || !password || !confirmPassword) {
      showNotification('Please fill all required fields.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showNotification('Passwords do not match.', 'error');
      return;
    }

    try {
      const res = await axios.post('https://hrms-backend-muyw.onrender.com/api/auth/register', {
        fullname,
        email,
        password,
        confirmPassword
      });

      showNotification('Registration successful! You can now login.', 'success');
      setFormData({ fullname: '', email: '', password: '', confirmPassword: '' });

    } catch (err) {
      const msg = err?.response?.data?.message || 'Registration failed. Try again.';
      showNotification(msg, 'error');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-left">
          <img src="Dashboard.png" alt="Dashboard Preview" />
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</h2>
          <p>tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...</p>
        </div>

        <div className="auth-right">
          <h2>Welcome to Dashboard</h2>

          <label htmlFor="fullname">Full name<span className="required">*</span></label>
          <input id="fullname" type="text" placeholder="Full name" value={formData.fullname} onChange={handleChange} />

          <label htmlFor="email">Email Address<span className="required">*</span></label>
          <input id="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />

          <label htmlFor="password">Password<span className="required">*</span></label>
          <input id="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />

          <label htmlFor="confirmPassword">Confirm Password<span className="required">*</span></label>
          <input id="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />

          {notification.message && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}

          <button onClick={handleRegister}>Register</button>

          <div className="link">
            Already have an account? <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
