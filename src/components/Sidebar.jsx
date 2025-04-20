import React from 'react';
import './Sidebar.css';
import { useLocation, Link } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    {
      section: 'Recruitment',
      items: [{ path: '/CandidateDashboard', label: 'Candidates', icon: '👥' }],
    },
    {
      section: 'Organization',
      items: [
        { path: '/EmployeeDashboard', label: 'Employees', icon: '🧑‍💼' },
        { path: '/AttendanceDashboard', label: 'Attendance', icon: '📊' },
        { path: '/leaves', label: 'Leaves', icon: '✨' },
      ],
    },
    {
      section: 'Others',
      items: [{ path: '/login', label: 'Logout', icon: '' }],
    },
  ];

  return (
    <div className="sidebar">
      <div className="logo-section">
        <div className="logo-box"></div>
        <h1>LOGO</h1>
      </div>

      <input type="text" className="search" placeholder="🔍 Search" />

      {links.map(({ section, items }, i) => (
        <div key={i} className="section">
          <div className="section-title">{section}</div>
          <ul>
            {items.map((item, idx) => (
              <li key={idx} className={location.pathname === item.path ? 'active' : ''}>
                <Link to={item.path}>
                  <span className="icon">{item.icon}</span>
                  <span className="label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
