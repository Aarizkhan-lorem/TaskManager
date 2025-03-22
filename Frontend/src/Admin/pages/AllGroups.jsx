import axios from "axios";
import React, { useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
import { format } from "date-fns";

const AllGroups = ({ totalProjects, setTotalProjects }) => {
  const fetchTotalProjects = async () => {
    try {
      const response = await axios.get(`${apiUrl}/fetchAllProjects`);
      setTotalProjects(response.data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchTotalProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-10">
      <h3 className="text-3xl text-white font-bold mb-6">List of Groups</h3>
      <hr className="w-1/2 border-gray-500 mb-6" />

      <div className="flex flex-wrap gap-6 justify-center">
        {totalProjects.map((project, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-6 border border-white/20 w-80 text-white"
          >
            <h1 className="text-xl font-bold break-words overflow-hidden">
              {project.title}
            </h1>

            <h4 className="text-lg font-semibold mt-2">
              Members:
              <span className="font-normal text-gray-300">
                {" "}
                {project.contributors
                  .map((contributor) => contributor.name)
                  .join(", ")}
              </span>
            </h4>
            <p className="mt-3 text-green-400">
              Project Assigned On:{" "}
              <span className="text-gray-300">
                {format(new Date(project.createdAt), "dd/MM/yyyy")}
              </span>
            </p>
            <p className="text-red-400">
              Deadline Date:{" "}
              <span className="text-gray-300">
                {format(new Date(project.deadline), "dd/MM/yyyy")}
              </span>
            </p>
            <p className="mt-3">
              Status:{" "}
              <span
                className={`px-2 py-1 rounded-md text-sm ${
                  project.status === "completed"
                    ? "bg-green-600"
                    :  "bg-red-600"
                }`}
              >
                {project.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllGroups;
