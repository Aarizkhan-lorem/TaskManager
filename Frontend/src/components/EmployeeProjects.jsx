import React, { useState } from "react";
import { format } from "date-fns";
import { FaSort } from "react-icons/fa";

const projectsData = [
  {
    id: 1,
    title: "Project Alpha",
    createdAt: "2024-03-01",
    deadline: "2024-04-15",
    teamMembers: [
      {
        id: 1,
        name: "Alice",
        role: "Developer",
        avatar: "https://i.pravatar.cc/40?img=1",
      },
      {
        id: 2,
        name: "Bob",
        role: "Designer",
        avatar: "https://i.pravatar.cc/40?img=2",
      },
    ],
    completion: 75,
  },
  {
    id: 2,
    title: "Project Beta",
    createdAt: "2024-02-10",
    deadline: "2024-03-30",
    teamMembers: [
      {
        id: 3,
        name: "Charlie",
        role: "Manager",
        avatar: "https://i.pravatar.cc/40?img=3",
      },
      {
        id: 4,
        name: "David",
        role: "QA",
        avatar: "https://i.pravatar.cc/40?img=4",
      },
    ],
    completion: 40,
  },
  {
    id: 3,
    title: "Project Gamma",
    createdAt: "2024-03-05",
    deadline: "2024-05-10",
    teamMembers: [
      {
        id: 5,
        name: "Eve",
        role: "Developer",
        avatar: "https://i.pravatar.cc/40?img=5",
      },
      {
        id: 6,
        name: "Frank",
        role: "Designer",
        avatar: "https://i.pravatar.cc/40?img=6",
      },
    ],
    completion: 90,
  },
];

const EmployeeProjects = () => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedMember, setSelectedMember] = useState(null);

  const filteredProjects = projectsData.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    return sortOrder === "asc"
      ? new Date(a.deadline) - new Date(b.deadline)
      : new Date(b.deadline) - new Date(a.deadline);
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Project Listings</h1>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-md w-full md:w-1/2"
        />
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md w-full md:w-auto"
        >
          Sort by Deadline <FaSort />
        </button>
      </div>

      {/* Project Table */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-left">Project Title</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Deadline</th>
              <th className="p-3 text-left">Team Members</th>
              <th className="p-3 text-left">Completion</th>
            </tr>
          </thead>
          <tbody>
            {sortedProjects.length > 0 ? (
              sortedProjects.map((project) => (
                <tr key={project.id} className="border-b">
                  <td className="p-3">{project.title}</td>
                  <td className="p-3">
                    {format(new Date(project.createdAt), "dd MMM yyyy")}
                  </td>
                  <td className="p-3">
                    {format(new Date(project.deadline), "dd MMM yyyy")}
                  </td>
                  <td className="p-3">
                    <div className="flex -space-x-2">
                      {project.teamMembers.map((member) => (
                        <img
                          key={member.id}
                          src={member.avatar}
                          alt={member.name}
                          className="w-8 h-8 rounded-full border-2 border-white cursor-pointer hover:scale-110 transition"
                          onClick={() => setSelectedMember(member)}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="w-36 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full"
                        style={{ width: `${project.completion}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      {project.completion}%
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No projects found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Team Member Details */}
      {selectedMember && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <img
              src={selectedMember.avatar}
              alt={selectedMember.name}
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-bold">{selectedMember.name}</h2>
            <p className="text-gray-600">{selectedMember.role}</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={() => setSelectedMember(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeProjects;
