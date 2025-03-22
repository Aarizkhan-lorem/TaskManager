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
import AdminHome from './Admin/pages/AdminHome';
import AllProjects from './Admin/pages/AllProjects';
import AllEmployees from './Admin/pages/AllEmployees';
import AllGroups from './Admin/pages/AllGroups';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import ResetPassword from './Pages/ResetPassword';
import AllTasks from './Admin/pages/AllTasks';
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
          path="/admin-dashboard/*"
          element={
            adminToken ? (
              <AdminProtectedRoute
                element={
                  <EmployeeContextProvider>
                    <AdminDashboard />
                  </EmployeeContextProvider>
                }
              />
            ) : (
              <Navigate to="/admin-login" />
            )
          }
        />

        {/* Admin Panel Routes */}
        <Route
          path="/admin-home/*"
          element={adminToken ? <AdminHome /> : <Navigate to="/admin-login" />}
        >
          <Route index element={<AllProjects />} />
          <Route path="allEmployees" element={<AllEmployees />} />
          <Route path="completedTasks" element={<AllTasks />} />
          <Route path="allTasks" element={<AllProjects />} />
          <Route path="allGroups" element={<AllGroups />} />
        </Route>

        <Route path="/update-password/:token" element={<ResetPassword/>}/>
      </Routes>
    </div>
  );
}

export default App