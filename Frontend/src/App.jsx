import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import EmployeeLogin from './components/EmployeeLogin';
import AdminLogin from './components/AdminLogin';
import EmployeeSignup from './components/EmployeeSignup';
import ForgotPassword from './components/ForgotPassword';
import EmployeeDashboard from './Pages/EmployeeDashboard';
import AdminDashboard from './Pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import EmployeeContextProvider from './Context/EmployeeContext';
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
  const [token,setToken] = useState(localStorage.getItem('token')||"");
  const [adminToken , setAdminToken] = useState(localStorage.getItem('adminToken') || "");


  return (
    <div className="work-sans">
      <Toaster />
      <Routes>
        <Route
          index
          path={"/"}
          element={<Home token={token} adminToken={adminToken} />}
        />
        <Route
          path="/employee-login"
          element={<EmployeeLogin setToken={setToken} />}
        />
        <Route
          path="/admin-login"
          element={<AdminLogin setAdminToken={setAdminToken} />}
        />
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
        <Route
          path="/employee-dashboard"
          element={
            token ? (
              <ProtectedRoute
                element={
                  <EmployeeContextProvider>
                    <EmployeeDashboard />
                  </EmployeeContextProvider>
                }
              />
            ) : (
              <Navigate to="/employee-login" />
            )
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            adminToken ? <AdminDashboard /> : <Navigate to="/admin-login" />
          }
        />
      </Routes>
    </div>
  );
}

export default App