import React, { useState } from "react";
import AllProjects from "./AllProjects";
import AllEmployees from "./AllEmployees";
import AllGroups from "./AllGroups";
import Sidebar from "../components/Home/Sidebar";
import AllTasks from "./AllTasks";

const AdminHome = () => {
  const [selectedSection, setSelectedSection] = useState("AllTasks");
  const [totalProjects, setTotalProjects] = useState([]);

  const renderSection = () => {
    switch (selectedSection) {
      case "AllTasks":
        return (
          <AllProjects
            setTotalProjects={setTotalProjects}
            totalProjects={totalProjects}
          />
        );
      case "AllEmployees":
        return <AllEmployees />;
      case "AllGroups":
        return (
          <AllGroups
            setTotalProjects={setTotalProjects}
            totalProjects={totalProjects}
          />
        );
      case "CompletedTasks":
        return <AllTasks />;
      default:
        return (
          <AllProjects
            setTotalProjects={setTotalProjects}
            totalProjects={totalProjects}
          />
        );
    }
  };

  return (
    <div className="flex h-screen overflow-y-clip  bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        onSelectSection={setSelectedSection}
        totalProjects={totalProjects}
      />

      {/* Main Content */}
      <div className="flex-1 h-screen overflow-y-scroll  p-6 bg-white shadow-md rounded-lg border border-gray-200">
        {renderSection()}
      </div>
    </div>
  );
};

export default AdminHome;
