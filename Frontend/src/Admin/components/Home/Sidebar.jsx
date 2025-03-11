import React from "react";
import { CgNotes } from "react-icons/cg";
import { IoPersonSharp } from "react-icons/io5";
import { FaCheckDouble, FaPeopleGroup } from "react-icons/fa6";

const Sidebar = ({ onSelectSection, selectedSection }) => {
  const data = [
    {
      title: "All Tasks",
      icon: <CgNotes />,
      key: "AllTasks",
      count: "21/35",
      progress: 60,
      bgColor: "bg-blue-100",
    },
    {
      title: "All Employees",
      icon: <IoPersonSharp />,
      key: "AllEmployees",
      count: "19/25",
      progress: 72,
      bgColor: "bg-pink-100",
    },
    {
      title: "Completed Tasks",
      icon: <FaCheckDouble />,
      key: "CompletedTasks",
      count: "19/25",
      progress: 60,
      bgColor: "bg-green-100",
    },
    {
      title: "All Groups",
      icon: <FaPeopleGroup />,
      key: "AllGroups",
      count: "6/25",
      progress: 24,
      bgColor: "bg-yellow-100",
    },
  ];

  const leaderboard = [
    { name: "Group A", completed: 120 },
    { name: "Group B", completed: 98 },
    { name: "Group C", completed: 85 },
  ];

  return (
    <div className="p-3 h-[100vh] bg-gray-100 text-black border rounded border-black-1000 mx-2">
      <div>
        <h2 className="text-2xl font-semibold">Zidio Developments</h2>
        <h4 className="font-semibold">Admin Dashboard</h4>
        <hr className="my-2" />
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-2 gap-2 p-4">
        {data.map((item, i) => (
          <div
            key={i}
            onClick={() => onSelectSection(item.key)}
            className={`p-4 rounded-lg shadow-md ${item.bgColor} block cursor-pointer ${
              selectedSection === item.key ? "border-2 border-black" : ""
            }`}
          >
            <div className="flex items-center space-x-2 text-black">
              <span className="text-2xl">{item.icon}</span>
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
            <p className="text-xl font-bold my-2 text-black">{item.count}</p>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div
                className="bg-black h-2 rounded-full"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
            <p className="text-sm mt-1 text-black">{item.progress}% done</p>
          </div>
        ))}
      </div>

      {/* Leaderboard Section */}
      <div className="mt-6 p-2 bg-white shadow-lg rounded-lg">
        <h3 className="text-lg font-semibold text-black">🏆 Group Leaderboard</h3>
        <table className="w-full mt-3 border-collapse">
          <thead>
            <tr className="bg-gray-100 text-black">
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
                    className={`px-3 py-1 text-white rounded-full text-xs 
                                        ${
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
      </div>

      {/* Logout Button */}
      <div className="mt-4">
        <button className="text-white bg-gray-600 rounded p-2 w-full">Log Out</button>
      </div>
    </div>
  );
};

export default Sidebar;
