import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import EmployeeOverview from "../components/EmployeeOverview";
import EmployeeProjects from "../components/EmployeeProjects";
import EmployeeTasks from "../components/EmployeeTasks";
import EmployeeReports from "../components/EmployeeReports";
import ProfileSettings from "../components/ProfileSettings";
import toast from "react-hot-toast";
import axios from "axios";
import ProfilePic from "../components/ProfilePic";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function logoutHandler() {
    toast((t) => (
      <span className="flex items-center flex-wrap justify-between">
        <span className="mr-1 mb-2 sm:mb-0">Do you want to quit?</span>
        <button
          onClick={() => {
            toast.dismiss(t.id);
            localStorage.removeItem("token");
            window.location.reload();
          }}
          className="py-2 px-4 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors"
        >
          Confirm Logout
        </button>
      </span>
    ));
  }

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${apiUrl}/employee-dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployee(response.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchEmployeeDetails();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/getTasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data.Tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  async function setTaskCompleted(id) {
    try {
      await axios.post(`${apiUrl}/setTaskCompleted`, { id });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      fetchTasks();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      {/* Navbar */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-3 md:py-4 flex justify-between items-center border-b border-gray-300 relative">
        <div className="flex items-center gap-2 sm:gap-6">
          <img
            src="/logo.webp"
            alt="Logo"
            className="w-20 sm:w-28 md:w-32 lg:w-[110px] pt-2"
          />

          {/* Navigation Tabs */}
          <div className="hidden md:flex gap-2 lg:gap-6">
            {["Overview", "Projects", "Tasks", "Reports"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-1 lg:py-2 px-2 lg:px-4 text-sm lg:text-base rounded-lg transition-all ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            {menuOpen ? (
              <AiOutlineClose
                className="text-2xl sm:text-3xl cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
            ) : (
              <AiOutlineMenu
                className="text-2xl sm:text-3xl cursor-pointer"
                onClick={() => setMenuOpen(true)}
              />
            )}
          </div>
        </div>

        {/* Profile & Logout */}
        <div className="flex gap-2 sm:gap-3 items-center">
          <CiLogout
            className="text-2xl sm:text-3xl cursor-pointer"
            onClick={logoutHandler}
          />
          <button
            onClick={() => setActiveTab("Profile Settings")}
            className={`p-1 rounded-full transition-all ${
              activeTab === "Profile Settings"
                ? "ring-2 md:ring-4 ring-black"
                : ""
            }`}
          >
            <ProfilePic name={employee ? employee.name : ""} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden z-50 bg-white fixed w-full h-full left-0 top-[60px] sm:top-[70px] flex flex-col py-4 animate-fadeIn">
          {["Overview", "Projects", "Tasks", "Reports", "Profile Settings"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setMenuOpen(false);
                }}
                className={`py-3 px-6 text-base sm:text-lg transition-all ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>
      )}

      {/* Page Content */}
      <div className="p-3 sm:p-4 md:p-6 lg:pb-10 lg:px-10">
        {activeTab === "Overview" && (
          <EmployeeOverview
            tasks={tasks}
            employee={employee}
            setTaskCompleted={setTaskCompleted}
            fetchTasks={fetchTasks}
          />
        )}
        {activeTab === "Projects" && <EmployeeProjects />}
        {activeTab === "Tasks" && (
          <EmployeeTasks
            tasks={tasks}
            setTasks={setTasks}
            setTaskCompleted={setTaskCompleted}
          />
        )}
        {activeTab === "Reports" && <EmployeeReports tasks={tasks} />}
        {activeTab === "Profile Settings" && (
          <ProfileSettings employee={employee} />
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
