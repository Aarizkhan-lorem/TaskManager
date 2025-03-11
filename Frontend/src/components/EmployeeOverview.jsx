import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { IoChevronDown } from "react-icons/io5";
import { BsPinAngle } from "react-icons/bs";
import { AiOutlineThunderbolt } from "react-icons/ai";
import EmployeeProject from "./modals/EmployeeProject";

const EmployeeOverview = ({employee}) => {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const performanceData = [
    { name: "Day 1", value: 30 },
    { name: "Day 2", value: 50 },
    { name: "Day 3", value: 20 },
    { name: "Day 4", value: 70 },
    { name: "Day 5", value: 75 },
    { name: "Day 6", value: 40 },
  ];
  const formattedDate = today.toLocaleDateString("en-GB", options);
  const finalDate = formattedDate.replace(/(\w+)\s(\d+)/, "$1, $2");
  const progress = (21 / 35) * 100;
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

  const [project, setProject] = useState(false);
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [project]);
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
    }, [pendingProjects]);
  return (
    <div className="mb-8">
      <div className="md:px-20 flex justify-between items-start mt-6">
        <div>
          <h2 className="text-md font-semibold text-gray-500">{finalDate}</h2>
          <h2 className="text-4xl font-semibold">
            Welcome Back,{" "}
            <span className="text-blue-600">
              {employee ? employee.name.split(" ")[0] : ""}
            </span>
          </h2>
        </div>
        <div
          onClick={() => setProject(true)}
          className="px-5 py-2 hover:cursor-pointer text-lg text-white font-semibold bg-blue-500 rounded-xl"
        >
          New Project
        </div>
      </div>
      {project && <EmployeeProject setProject={setProject} project={project} />}

      <div className="mt-6 md:px-20 w-full  md:grid md:grid-cols-3 md:grid-rows-2 flex flex-col gap-5">
        <div className="row-span-2 p-2 gap-2 flex flex-col bg-white/50 shadow-md rounded-3xl">
          <div className="bg-indigo-200/40 px-5 py-5 rounded-xl">
            <div className="flex gap-5">
              <div className="bg-white rounded-xl w-16 h-16 flex justify-center items-center">
                <BsPinAngle className="text-3xl" />
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Total Tasks</p>
                <p className="text-3xl font-bold">21/35</p>
              </div>
            </div>
            <div className="relative w-full bg-gray-50 h-2 rounded-full mt-12">
              <div
                className="absolute top-[0.1245rem] left-0 h-1 bg-black rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p>{progress}% done </p>
          </div>
          <div className="bg-pink-200/40 px-4 py-5 rounded-xl">
            <div className="flex gap-3">
              <div className="bg-white rounded-xl w-16 h-16 flex justify-center items-center">
                <BsPinAngle className="text-3xl" />
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Priority Tasks</p>
                <p className="text-3xl font-bold">19/25</p>
              </div>
            </div>
            <div className="relative w-full bg-gray-50 h-2 rounded-full mt-12">
              <div
                className="absolute top-[0.1245rem] left-0 h-1 bg-black rounded-full"
                style={{ width: `72%` }}
              ></div>
            </div>
            <p>72% done </p>
          </div>
          <div className="bg-green-200/40 px-3 py-5 rounded-xl">
            <div className="flex gap-3">
              <div className="bg-white rounded-xl w-16 h-16 flex justify-center items-center">
                <AiOutlineThunderbolt className="text-3xl" />
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Overdue Tasks</p>
                <p className="text-3xl font-bold">19/25</p>
              </div>
            </div>
            <div className="relative w-full bg-gray-50 h-2 rounded-full mt-12">
              <div
                className="absolute top-[0.1245rem] left-0 h-1 bg-black rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p>{progress}% done </p>
          </div>
          <div className="bg-orange-200/40 px-3 py-5 rounded-xl">
            <div className="flex gap-3">
              <div className="bg-white rounded-xl w-16 h-16 flex justify-center items-center">
                <AiOutlineThunderbolt className="text-3xl" />
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Overdue Tasks</p>
                <p className="text-3xl font-bold">19/25</p>
              </div>
            </div>
            <div className="relative w-full bg-gray-50 h-2 rounded-full mt-12">
              <div
                className="absolute top-[0.1245rem] left-0 h-1 bg-black rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p>{progress}% done </p>
          </div>
          <div className=" flex flex-col justify-center  col-span-2">
            <div className="mx-7 flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-600 ">
                Performance
              </h2>
              <div className="flex gap-1 text-gray-600">
                <p className="text-sm  font-semibold">Weekly</p>
                <IoChevronDown className="text-sm mt-1" />
              </div>
            </div>
            <ResponsiveContainer width="90%" height={150}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="5 5" stroke="#ccc" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "black" }} />
                <YAxis
                  tickCount={3}
                  domain={[0, 100]}
                  ticks={[0, 50, 100]}
                  tick={{ fontSize: 14, fill: "black", fontWeight: "bold" }}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="black"
                  strokeWidth={2}
                  dot={{ stroke: "black", strokeWidth: 3, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white/50 p-3 shadow-md rounded-3xl md:w-[110%]">
          <p className="font-bold text-center text-xl">Leaderboard (12)</p>
          
        </div>
        <div className="bg-white/50  shadow-md rounded-3xl md:w-[90%] md:ml-11 p-7">
          <div className="flex flex-col gap-3">
            <h1 className="font-semibold text-2xl text-blue-500">
              Quote Of The Day:
            </h1>
            {quote.length > 0 ? (
              <>
                <p className="font-serif text-xl">{quote[0].q}</p>
                <p className="italic text-lg">- {quote[0].a}</p>
              </>
            ) : (
              <p className="text-lg">Loading...</p>
            )}
          </div>
        </div>

        <div className="bg-white/50 shadow-md p-4 col-span-2 rounded-3xl">
          <p className="font-bold text-center text-xl mb-2">Projects</p>
          <table className="w-full">
            <thead className="bg-blue-200 text-gray-700 ">
              <tr className="">
                <th className="p-3 text-center rounded-l-lg ">Project Title</th>
                <th className="p-3 text-center">Description</th>
                <th className="p-3 text-center">Created At</th>
                <th className="p-3 text-center rounded-r-lg">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {pendingProjects.length > 0 ? (
                pendingProjects.map((project) => (
                  <tr key={project._id} className="border-b">
                    <td className="p-3 text-center break-words max-w-[18rem]">
                      {project.title}
                    </td>
                    <td className="p-3 text-center break-words max-w-[18rem]">
                      {project.description}
                    </td>
                    <td className="p-3 text-center">
                      {format(new Date(project.createdAt), "dd MMM yyyy")}
                    </td>
                    <td className="p-3 text-center">
                      {format(new Date(project.deadline), "dd MMM yyyy")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-3 text-center text-gray-500">
                    No pending projects
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeOverview;
