import { useState } from 'react';
import axios from 'axios';
import './LoginCard.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.type]: e.target.value,
    }));
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000);
  };

  const handleLogin = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      showNotification('Please fill all fields.', 'error');
      return;
    }

    try {
      const res = await axios.post('https://hrms-backend-muyw.onrender.com/api/auth/login', {
        email,
        password,
      });

      showNotification('Login successful!', 'success');
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/CandidateDashboard')
      setFormData({ email: '', password: '' });
    } catch (err) {
      const msg = err?.response?.data?.message || 'Login failed.';
      showNotification(msg, 'error');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-left">
          <img src="Dashboard.png" alt="Dashboard Preview" />
          <h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          </h2>
          <p>
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...
          </p>
        </div>

        <div className="auth-right">
          <h2>Welcome to Dashboard</h2>

          <label htmlFor="email">Email Address<span className="required">*</span></label>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password<span className="required">*</span></label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          {notification.message && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}

          <button onClick={handleLogin}>Login</button>

          <div className="link">
            Don't have an account? <a href="/">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
