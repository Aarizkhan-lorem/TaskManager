import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import EmployeeOverview from "../components/EmployeeOverview";
import { NavLink } from "react-router-dom";
import EmployeeProjects from "../components/EmployeeProjects";
import EmployeeTasks from "../components/EmployeeTasks";
import EmployeeReports from "../components/EmployeeReports";

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview"); 

  return (
    <div className="min-h-screen relative overflow-hidden work-sans bg-gradient-to-r from-blue-100 to-purple-100 backdrop-blur-3xl">
      {/* Navbar */}
      <div className="w-full mt-6 px-20 flex justify-between items-center">
        <div className="flex text-lg font-semibold items-center gap-8">
          <img src="/logo.webp" alt="Logo" width={110} className="pt-2" />

          {["Overview", "Projects", "Tasks", "Reports"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 ${
                activeTab === tab
                  ? "border-b-2 border-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex gap-3 justify-center items-center">
          <NavLink to={"/"}>
            <CiLogout className="text-4xl cursor-pointer" />
          </NavLink>
          <div className="h-12 w-12 rounded-full bg-yellow-200"></div>
        </div>
      </div>

      <div className="p-10">
        {activeTab === "Overview" && <EmployeeOverview />}
        {activeTab === "Projects" && <EmployeeProjects />}
        {activeTab === "Tasks" && <EmployeeTasks />}
        {activeTab === "Reports" && <EmployeeReports />}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
