import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import EmployeeOverview from "../components/EmployeeOverview";
import { useNavigate } from "react-router-dom";
import EmployeeProjects from "../components/EmployeeProjects";
import EmployeeTasks from "../components/EmployeeTasks";
import EmployeeReports from "../components/EmployeeReports";
import toast from "react-hot-toast";
import axios from "axios";
import Loading from "../components/Loading";
import ProfilePic from "../components/ProfilePic";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();
  function logoutHandler() {
    toast((t) => (
      <span>
        Do you want to quit?
        <button
          onClick={() => {
            toast.dismiss(t.id);
            localStorage.removeItem("token");
            navigate("/");
          }}
          className="ml-[10px] py-[5px] px-[10px] bg-red-700 text-white border-none cursor-pointer rounded-md"
        >
          Confirm Logout
        </button>
      </span>
    ));
  }

  if (menuOpen) {
    document.body.style.overflow = "hidden";
  }
  useEffect(()=>{
    const fetchEmployeeDetails=async() =>{
      try{
        const token = localStorage.getItem('token');
        console.log(token);
        const response = await axios.get(`${apiUrl}/employee-dashboard`,
              {headers:{authorization:`Bearer ${token}`}}
        );
        setEmployee(response.data.data);
      }catch(error){
          console.log(error.message)

      }
    }
    fetchEmployeeDetails();
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="w-full px-6 md:px-20 py-4 flex justify-between items-center border-b border-gray-300">
        <div className="flex items-center gap-6">
          <img src="/logo.webp" alt="Logo" width={110} className="pt-2" />

          <div className="hidden md:flex gap-6">
            {["Overview", "Projects", "Tasks", "Reports"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 rounded-lg text-sm md:text-lg transition-all ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="md:hidden">
            {menuOpen ? (
              <AiOutlineClose
                className="text-3xl cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
            ) : (
              <AiOutlineMenu
                className="text-3xl cursor-pointer"
                onClick={() => setMenuOpen(true)}
              />
            )}
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <CiLogout
            className="text-3xl cursor-pointer"
            onClick={logoutHandler}
          />
          <ProfilePic name={employee?employee.name:''} />

        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden z-10 bg-white absolute w-full h-full items-center justify-center left-0 top-[70px] flex flex-col py-4">
          {["Overview", "Projects", "Tasks", "Reports"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setMenuOpen(false);
              }}
              className={`py-3 px-6 text-lg ${
                activeTab === tab
                  ? "bg-black text-white rounded-lg"
                  : "hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      <div className="p-4 md:pb-10 md:px-10">
        {activeTab === "Overview" && <EmployeeOverview employee={employee} />}
        {activeTab === "Projects" && <EmployeeProjects />}
        {activeTab === "Tasks" && <EmployeeTasks />}
        {activeTab === "Reports" && <EmployeeReports />}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
