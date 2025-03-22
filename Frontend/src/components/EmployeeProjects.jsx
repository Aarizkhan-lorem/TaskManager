import React, { useEffect, useState } from "react";
import { differenceInDays, format } from "date-fns";
import axios from "axios";
import ProfilePic from "./ProfilePic";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const EmployeeProjects = () => {
  const [selectedContributor, setSelectedContributor] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [pendingProjects, setPendingProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);

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

  const fetchCompletedProjects = async () => {
    try {
      const response = await axios.get(`${apiUrl}/fetchCompletedProject`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCompletedProjects(response.data.projects);
    } catch (error) {
      console.error("Error fetching completed projects:", error);
    }
  };

  useEffect(()=>{
    console.log(completedProjects);
  },[completedProjects]);

  // Fetch projects on mount
  useEffect(() => {
    fetchPendingProjects();
    fetchCompletedProjects();
  }, [token]);

  // Function to mark a project as completed
  const setProjectCompleted = async (id) => {
    try {
      await axios.post(`${apiUrl}/setProjectCompleted`, { id });

      // Refresh both pending and completed projects
      fetchPendingProjects();
      fetchCompletedProjects();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Project Listings</h1>

      {/* Pending Projects Table */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto mb-10">
        <h2 className="text-2xl font-semibold p-4 bg-gray-100">
          Pending Projects
        </h2>
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-center">Project Title</th>
              <th className="p-3 text-center">Description</th>
              <th className="p-3 text-center">Created At</th>
              <th className="p-3 text-center">Deadline</th>
              <th className="p-3 text-center">Team Members</th>
              <th className="p-3 text-center">Completion</th>
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
                  <td className="p-3 max-w-60 flex flex-wrap -space-x-2 justify-center items-center">
                    {project.contributors?.map((contributor) => (
                      <div
                        key={contributor._id}
                        className="hover:z-10 hover:scale-105 rounded-full border-[2px] border-white"
                        onClick={() => setSelectedContributor(contributor)}
                      >
                        <ProfilePic name={contributor.name} />
                      </div>
                    ))}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => setProjectCompleted(project._id)}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg font-semibold duration-100"
                    >
                      Set As Completed
                    </button>
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

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <h2 className="text-2xl font-semibold p-4 bg-gray-100">
          Completed Projects
        </h2>
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-center">Project Title</th>
              <th className="p-3 text-center">Description</th>
              <th className="p-3 text-center">Created At</th>
              <th className="p-3 text-center">Completed At</th>
              <th className="p-3 text-center">Completed On Time?</th>
              <th className="p-3 text-center">Team Members</th>
            </tr>
          </thead>
          <tbody>
            {completedProjects.length > 0 ? (
              completedProjects.map((project) => (
                <tr key={project._id} className="border-b">
                  <td className="p-3 text-center break-words max-w-[18rem]">
                    {project.title}
                  </td>
                  <td className="p-3 text-center break-words max-w-[18rem]">
                    {project.description}
                  </td>
                  <td className="p-3 text-center break-words max-w-[18rem]">
                    {format(new Date(project.createdAt), "dd MMM yyyy")}
                  </td>
                  <td className="p-3 text-center">
                    {format(new Date(project.completedAt), "dd MMM yyyy")}
                  </td>
                  <td className="p-3 text-center font-semibold">
                    {differenceInDays(project.createdAt, project.completedAt) >
                    0 ? (
                      <span className="text-red-600">
                        {differenceInDays(
                          project.createdAt,
                          project.completedAt
                        )}{" "}
                        days late ❌
                      </span>
                    ) : (
                      <span className="text-green-600">On Time ✅</span>
                    )}
                  </td>
                  <td className="p-3 flex flex-wrap -space-x-2 justify-center items-center">
                    {project.contributors?.map((contributor) => (
                      <div
                        key={contributor._id}
                        className="hover:z-10 hover:scale-105  rounded-full border-[2px] border-white"
                        onClick={() => setSelectedContributor(contributor)}
                      >
                        <ProfilePic name={contributor.name} />
                      </div>
                    ))}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-500">
                  No completed projects
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Contributor Modal */}
      {selectedContributor && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 text-white text-xl font-bold">
                {selectedContributor?.name[0].toUpperCase()}
              </div>
              <h2 className="mt-3 text-lg font-semibold">
                {selectedContributor?.name}
              </h2>
              <p className="text-gray-600">{selectedContributor.role}</p>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setSelectedContributor(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeProjects;
