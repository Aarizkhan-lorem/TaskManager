import React, { useContext } from "react";
import { CgNotes } from "react-icons/cg";
import { IoPersonSharp } from "react-icons/io5";
import { FaCheckDouble, FaPeopleGroup } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { EmployeeContext } from "../../../Context/EmployeeContext";

const Sidebar = ({ totalProjects, onSelectSection, selectedSection }) => {
  
  const completedProjects = totalProjects.filter(
    (project) => project.status === "completed"
  );
  const { allEmployees=[] } = useContext(EmployeeContext);
  const data = [
    {
      title: "All Projects",
      icon: <CgNotes />,
      key: "AllTasks",
      count: `${completedProjects.length}/${totalProjects.length}`,
      progress:
        parseFloat(
          ((completedProjects.length / totalProjects.length) * 100).toFixed(2)
        ) || 0,
      bgColor: "bg-blue-200",
    },
    {
      title: "Employees",
      icon: <IoPersonSharp />,
      key: "AllEmployees",
      count: allEmployees.length,
      progress: 72,
      bgColor: "bg-pink-200",
    },
    {
      title: "All Tasks",
      icon: <FaCheckDouble />,
      key: "CompletedTasks",
      count: "19/25",
      progress: 60,
      bgColor: "bg-green-200",
    },
    {
      title: "All Groups",
      icon: <FaPeopleGroup />,
      key: "AllGroups",
      count: "6/25",
      progress: 24,
      bgColor: "bg-yellow-200",
    },
  ];

  const leaderboard = [
    { name: "Group A", completed: 120 },
    { name: "Group B", completed: 98 },
    { name: "Group C", completed: 85 },
  ];

  const navigate = useNavigate();

  function logout() {
    toast((t) => (
      <span>
        Do you want to quit?
        <button
          onClick={() => {
            toast.dismiss(t.id);
            localStorage.removeItem("adminToken");
            navigate("/");
          }}
          className="ml-2 py-1 px-3 bg-red-700 text-white rounded-md"
        >
          Confirm Logout
        </button>
      </span>
    ));
  }

  return (
    <div className="p-4 h-screen w-1/3 bg-gray-100 text-black border-r border-gray-300 shadow-md flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold">Zidio Developments</h2>
        <h4 className="font-semibold text-gray-600">Admin Dashboard</h4>
        <hr className="my-3" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {data.map((item, i) => (
          <div
            key={i}
            onClick={() => onSelectSection(item.key)}
            className={`p-4 rounded-lg flex flex-col items-center justify-center shadow-md transition-transform transform hover:scale-105 cursor-pointer ${
              item.bgColor
            } ${selectedSection === item.key ? "border-2 border-black" : ""}`}
          >
            <div className="flex items-center space-x-2 text-black">
              <span className="text-2xl">{item.icon}</span>
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
            <p className="text-xl font-bold my-2 text-black ">{item.count}</p>

            {item.title !== "Employees" ? (
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div
                  className="bg-black h-2 rounded-full"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            ) : (
              ""
            )}
            {item.title !== "Employees" ? (
              <p className="text-sm mt-1 text-black">{item.progress}% done</p>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>

      {/* <div className="mt-6 p-3 bg-white shadow-lg rounded-lg">
        <h3 className="text-lg font-semibold text-black">
          🏆 Group Leaderboard
        </h3>
        <table className="w-full mt-3 border-collapse">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="py-2 px-4 text-left">Rank</th>
              <th className="py-2 px-4 text-left">Group Name</th>
              <th className="py-2 px-4 text-left">Tasks Completed</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((group, index) => (
              <tr key={index} className="border-b text-black">
                <td className="py-2 px-4">
                  <span
                    className={`px-3 py-1 text-white rounded-full text-xs ${
                      index === 0
                        ? "bg-yellow-500"
                        : index === 1
                        ? "bg-gray-400"
                        : index === 2
                        ? "bg-orange-500"
                        : "bg-gray-300"
                    }`}
                  >
                    #{index + 1}
                  </span>
                </td>
                <td className="py-2 px-4">{group.name}</td>
                <td className="py-2 px-4 font-semibold">{group.completed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      <button
        onClick={logout}
        className="mt-4 text-white bg-gray-700 rounded p-2 w-full hover:bg-gray-800"
      >
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
