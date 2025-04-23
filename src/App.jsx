import React from 'react'
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, createRoutesFromChildren, createRoutesFromElements, Outlet, RouterProvider } from 'react-router-dom';
import Registration from './components/Registration'
import Login from './components/Login'
import CandidateDashboard from './components/CandidateDashboard'
import EmployeeDashboard from './components/EmployeeDashboard'
import AttendanceDashboard from './components/AttendanceDashboard'
import LeaveDashboard from './components/LeaveDashboard'

const App = () => {
  const router=createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Parent></Parent>}>
        <Route path='/regis' element={<Registration />} />
        <Route path='/login' element={<Login />} />
    </Route>
  ))
  return (
    <>
     {/* <Router>
       <Routes>
        <Route path='/' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/CandidateDashboard' element={<CandidateDashboard />} />
        <Route path='/EmployeeDashboard' element={<EmployeeDashboard />} />
        <Route path='/AttendanceDashboard' element={<AttendanceDashboard />} />
        <Route path='/LeaveDashboard' element={<LeaveDashboard />} />
       </Routes>
       
     </Router> */}
     <RouterProvider router={router}></RouterProvider>
    </>
  )
}
const Parent=()=>{
  return(
    <>
    <h1>hi</h1>
    <Outlet></Outlet>
    </>
  )
}
export default App