import React from 'react'
import AdminHome from '../Admin/pages/AdminHome';
import AllProjects from '../Admin/pages/AllProjects';
import AllEmployees from '../Admin/pages/AllEmployees';
import AllGroups from '../Admin/pages/AllGroups';
import { Routes, Route } from 'react-router-dom';
import AllTasks from '../Admin/pages/AllTasks';

const AdminDashboard = () => {
  return (
    <div className="text-black overflow-hidden h-screen p-2 relative">
        <Routes>
          <Route path="/" element={<AdminHome/>}>
            <Route index element={<AllProjects/>}/>
            <Route path="/allEmployees" element={<AllEmployees/>}/>
            <Route path="/completedTasks" element={<AllTasks/>}/>
            <Route path="/allGroups" element={<AllGroups/>}/>
          </Route>
        </Routes>
    </div>
  )
}

export default AdminDashboard;