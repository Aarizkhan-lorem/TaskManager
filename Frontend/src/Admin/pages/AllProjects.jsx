import React, { useEffect, useState } from "react";
import EmployeeProject from "../../components/modals/EmployeeProject";
import { format } from "date-fns";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const AllProjects = ({ totalProjects, setTotalProjects }) => {
  const [project, setProject] = useState(false);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [project]);

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
    <div className="flex flex-col gap-4 p-6 bg-gray-50 min-h-screen">
      <div className="w-full flex justify-end">
        <button
          onClick={() => setProject(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          + Add Project
        </button>
      </div>
      {project && (
        <EmployeeProject
          fetchTotalProjects={fetchTotalProjects}
          setProject={setProject}
          project={project}
        />
      )}
      <h3 className="text-2xl font-semibold pb-2 border-b">Pending Projects</h3>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-blue-500 text-white uppercase text-sm">
            <tr>
              <th className="p-4 text-center rounded-l-lg">Project Title</th>
              <th className="p-4 text-center">Description</th>
              <th className="p-4 text-center">Created At</th>
              <th className="p-4 text-center rounded-r-lg">Deadline</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {totalProjects.length > 0 ? (
              totalProjects.map((project) =>
                project.status === "pending" ? (
                  <tr
                    key={project._id}
                    className="odd:bg-gray-100 hover:bg-gray-200"
                  >
                    <td className="p-4 text-center break-words max-w-[18rem]">
                      {project.title}
                    </td>
                    <td className="p-4 text-center break-words max-w-[18rem]">
                      {project.description}
                    </td>
                    <td className="p-4 text-center">
                      {format(new Date(project.createdAt), "dd MMM yyyy")}
                    </td>
                    <td className="p-4 text-center">
                      {format(new Date(project.deadline), "dd MMM yyyy")}
                    </td>
                  </tr>
                ) : null
              )
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No pending projects
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <h3 className="text-2xl font-semibold pb-2 mt-6 border-b">
        Completed Projects
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-green-500 text-white uppercase text-sm">
            <tr>
              <th className="p-4 text-center rounded-l-lg">Project Title</th>
              <th className="p-4 text-center">Description</th>
              <th className="p-4 text-center">Created At</th>
              <th className="p-4 text-center rounded-r-lg">Deadline</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {totalProjects.length > 0 ? (
              totalProjects.map((project) =>
                project.status === "completed" ? (
                  <tr
                    key={project._id}
                    className="odd:bg-gray-100 hover:bg-gray-200"
                  >
                    <td className="p-4 text-center break-words max-w-[18rem]">
                      {project.title}
                    </td>
                    <td className="p-4 text-center break-words max-w-[18rem]">
                      {project.description}
                    </td>
                    <td className="p-4 text-center">
                      {format(new Date(project.createdAt), "dd MMM yyyy")}
                    </td>
                    <td className="p-4 text-center">
                      {format(new Date(project.deadline), "dd MMM yyyy")}
                    </td>
                  </tr>
                ) : null
              )
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No completed projects
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProjects;
