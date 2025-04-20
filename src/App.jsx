import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/Registration'
import Login from './components/Login'
import CandidateDashboard from './components/CandidateDashboard'
import EmployeeDashboard from './components/EmployeeDashboard'
import AttendanceDashboard from './components/AttendanceDashboard'
import LeaveDashboard from './components/LeaveDashboard'

const App = () => {
  return (
    <>
     <Router>
       <Routes>
        <Route path='/' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/CandidateDashboard' element={<CandidateDashboard />} />
        <Route path='/EmployeeDashboard' element={<EmployeeDashboard />} />
        <Route path='/AttendanceDashboard' element={<AttendanceDashboard />} />
        <Route path='/LeaveDashboard' element={<LeaveDashboard />} />
       </Routes>
     </Router>
    </>
  )
}

export default App