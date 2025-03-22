import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

import { BsPinAngle } from "react-icons/bs";
import { AiOutlineThunderbolt } from "react-icons/ai";
import AssignTask from "./modals/AssignTask";

const EmployeeOverview = ({ employee, tasks, fetchTasks }) => {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  console.log(tasks);
  const formattedDate = today.toLocaleDateString("en-GB", options);
  const finalDate = formattedDate.replace(/(\w+)\s(\d+)/, "$1, $2");
  const [quote, setQuote] = useState({});

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get(`${apiUrl}/quote`);
        setQuote(response.data);
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };
    fetchQuote();
  }, []);
  const pendingTasks = tasks.filter((task) => task.status == "pending");
  const completedTasks = tasks.filter((task) => task.status == "completed");
  const priorityTasks = tasks.filter(
    (task) => task.status == "pending" && task.priority == "High"
  );

  const [taskClicked, setTaskClicked] = useState(false);
  useEffect(() => {
    if (taskClicked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [taskClicked]);

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [pendingProjects, setPendingProjects] = useState([]);

  const fetchPendingProjects = async () => {
    try {
      const response = await axios.get(`${apiUrl}/fetchEmployeeProjects`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPendingProjects(response.data.projects);
    } catch (error) {
      console.error("Error fetching pending projects:", error);
    }
  };

  useEffect(() => {
    fetchPendingProjects();
  }, []);

  return (
    <div className="mb-8 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 mb-8">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-md font-semibold text-gray-500">{finalDate}</h2>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            Welcome Back,{" "}
            <span className="text-blue-600">
              {employee ? employee.name.split(" ")[0] : ""}
            </span>
          </h2>
        </div>
        <div
          onClick={() => setTaskClicked(true)}
          className="px-4 py-2 sm:px-5 sm:py-2 hover:cursor-pointer text-base sm:text-lg text-white font-semibold bg-blue-500 rounded-xl transition hover:bg-blue-600 w-full sm:w-auto text-center"
        >
          + New Task
        </div>
      </div>

      {taskClicked && (
        <AssignTask setTaskClicked={setTaskClicked} fetchTasks={fetchTasks} />
      )}

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Left column - Stats cards */}
        <div className="row-span-1 lg:row-span-2 p-2 gap-3 flex flex-col bg-white/50 shadow-md rounded-3xl">
          <div className="bg-indigo-200/40 hover:scale-[101%] hover:shadow-xl duration-150 px-4 py-4 rounded-xl">
            <div className="flex gap-3 sm:gap-5">
              <div className="bg-white rounded-xl w-12 h-12 sm:w-16 sm:h-16 flex justify-center items-center">
                <BsPinAngle className="text-2xl sm:text-3xl" />
              </div>
              <div>
                <p className="text-gray-700 font-semibold text-sm sm:text-base">
                  Total Tasks
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {completedTasks.length}/{tasks.length}
                </p>
              </div>
            </div>
            <div className="relative w-full bg-gray-50 h-2 rounded-full mt-8 sm:mt-12">
              <div
                className="absolute top-[0.1245rem] left-0 h-1 bg-black rounded-full"
                style={{
                  width: `${(completedTasks.length / tasks.length) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-sm sm:text-base">
              {(tasks.length !== 0
                ? (completedTasks.length / tasks.length) * 100
                : 0
              ).toFixed(2)}
              % done
            </p>
          </div>

          <div className="bg-pink-200/40 hover:scale-[101%] hover:shadow-xl duration-150 px-4 py-4 rounded-xl">
            <div className="flex gap-3 sm:gap-5">
              <div className="bg-white rounded-xl w-12 h-12 sm:w-16 sm:h-16 flex justify-center items-center">
                <BsPinAngle className="text-2xl sm:text-3xl" />
              </div>
              <div>
                <p className="text-gray-700 font-semibold text-sm sm:text-base">
                  Priority Tasks
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {priorityTasks.length}/{pendingTasks.length}
                </p>
              </div>
            </div>
            <div className="relative w-full bg-gray-50 h-2 rounded-full mt-8 sm:mt-12">
              <div
                className="absolute top-[0.1245rem] left-0 h-1 bg-black rounded-full"
                style={{
                  width: `${
                    (priorityTasks.length / pendingTasks.length) * 100
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-sm sm:text-base">
              {(pendingTasks.length !== 0
                ? (priorityTasks.length / pendingTasks.length) * 100
                : 0
              ).toFixed(2)}
              % pending
            </p>
          </div>

          <div className="bg-green-200/40 hover:scale-[101%] hover:shadow-xl duration-150 px-4 py-4 rounded-xl">
            <div className="flex gap-3 sm:gap-5">
              <div className="bg-white rounded-xl w-12 h-12 sm:w-16 sm:h-16 flex justify-center items-center">
                <AiOutlineThunderbolt className="text-2xl sm:text-3xl" />
              </div>
              <div>
                <p className="text-gray-700 font-semibold text-sm sm:text-base">
                  Overdue Tasks
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {pendingTasks.length}/{tasks.length}
                </p>
              </div>
            </div>
            <div className="relative w-full bg-gray-50 h-2 rounded-full mt-8 sm:mt-12">
              <div
                className="absolute top-[0.1245rem] left-0 h-1 bg-black rounded-full"
                style={{
                  width: `${(pendingTasks.length / tasks.length) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-sm sm:text-base">
              {(tasks.length !== 0
                ? (pendingTasks.length / tasks.length) * 100
                : 0
              ).toFixed(2)}
              % pending
            </p>
          </div>

          <div className="bg-orange-200/40 h-full hover:scale-[101%] hover:shadow-xl duration-150 px-4 py-4 rounded-xl">
            <div className="flex gap-3 sm:gap-5">
              <div className="bg-white rounded-xl w-12 h-12 sm:w-16 sm:h-16 flex justify-center items-center">
                <AiOutlineThunderbolt className="text-2xl sm:text-3xl" />
              </div>
              <div>
                <p className="text-gray-700 font-semibold text-sm sm:text-base">
                  Overdue Projects
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {pendingProjects.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - top row */}
        <div className="bg-white/50 p-3 shadow-md rounded-3xl lg:w-full">
          <p className="font-bold text-center text-xl">Leaderboard (12)</p>
        </div>

        {/* Right column - second row */}
        <div className="bg-white/50 shadow-md rounded-3xl p-4 sm:p-7">
          <div className="flex flex-col gap-3">
            <h1 className="font-semibold text-xl sm:text-2xl text-blue-500">
              Quote Of The Day:
            </h1>
            {quote.length > 0 ? (
              <>
                <p className="font-serif text-lg sm:text-xl">{quote[0].q}</p>
                <p className="italic text-base sm:text-lg">- {quote[0].a}</p>
              </>
            ) : (
              <p className="text-lg">Loading...</p>
            )}
          </div>
        </div>

        {/* Bottom row - Projects table */}
        <div className="bg-white/50 shadow-md p-4 col-span-1 lg:col-span-2 rounded-3xl">
          <p className="font-bold text-center text-xl mb-2">Projects</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-blue-200 text-gray-700">
                <tr>
                  <th className="p-2 sm:p-3 text-center rounded-l-lg">
                    Project Title
                  </th>
                  <th className="p-2 sm:p-3 text-center">Description</th>
                  <th className="p-2 sm:p-3 text-center">Created At</th>
                  <th className="p-2 sm:p-3 text-center rounded-r-lg">
                    Deadline
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingProjects.length > 0 ? (
                  pendingProjects.map((project) => (
                    <tr key={project._id} className="border-b">
                      <td className="p-2 sm:p-3 text-center break-words max-w-[10rem] sm:max-w-[18rem]">
                        {project.title}
                      </td>
                      <td className="p-2 sm:p-3 text-center break-words max-w-[10rem] sm:max-w-[18rem]">
                        {project.description}
                      </td>
                      <td className="p-2 sm:p-3 text-center">
                        {format(new Date(project.createdAt), "dd MMM yyyy")}
                      </td>
                      <td className="p-2 sm:p-3 text-center">
                        {format(new Date(project.deadline), "dd MMM yyyy")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-3 text-center text-gray-500">
                      No pending projects
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeOverview;
