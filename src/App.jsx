import React from 'react'
import { Routes ,Route } from 'react-router-dom';
import Home from './components/Home';
import EmployeeLogin from './components/EmployeeLogin';
import AdminLogin from './components/AdminLogin';
import EmployeeSignup from './components/EmployeeSignup';
import ForgotPassword from './components/ForgotPassword';
import EmployeeDashboard from './components/EmployeeDashboard';
import AdminDashboard from './components/AdminDashboard';
const App = () => {
  return (
    <div className="">
      <Routes>
        <Route index path={"/"} element={<Home />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/employee-signup" element={<EmployeeSignup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App