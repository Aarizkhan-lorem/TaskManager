import React from 'react'
import AdminHome from '../Admin/pages/AdminHome';
import AllTasks from '../Admin/pages/AllTasks';
import AllEmployees from '../Admin/pages/AllEmployees';
import CompletedTasks from '../Admin/pages/CompletedTasks';
import AllGroups from '../Admin/pages/AllGroups';
import { Routes, Route } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="text-black h-screen p-2 relative">
        <Routes>
          <Route path="/" element={<AdminHome/>}>
            <Route index element={<AllTasks/>}/>
            <Route path="/allEmployees" element={<AllEmployees/>}/>
            <Route path="/completedTasks" element={<CompletedTasks/>}/>
            <Route path="/allGroups" element={<AllGroups/>}/>
          </Route>
        </Routes>
    </div>
  )
}

export default AdminDashboard;