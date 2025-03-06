import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import EmployeeLogin from './components/EmployeeLogin';
import AdminLogin from './components/AdminLogin';
import EmployeeSignup from './components/EmployeeSignup';
import ForgotPassword from './components/ForgotPassword';
import EmployeeDashboard from './Pages/EmployeeDashboard';
import AdminDashboard from './Pages/AdminDashboard';
const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
 
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  return (
    <div className="work-sans">
      <Routes>
        <Route index path={"/"} element={<Home />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/employee-signup"
          element={
            <EmployeeSignup
              formData={formData}
              setFormData={setFormData}
              changeHandler={changeHandler}
            />
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App