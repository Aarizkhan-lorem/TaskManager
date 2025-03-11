import React, { useContext, useState, useEffect } from "react";
import { EmployeeContext } from "../../Context/EmployeeContext";
import Loading from "../Loading";
import ProfilePic from "../ProfilePic";
import axios from "axios";
import toast from "react-hot-toast";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const EmployeeProject = ({ setProject, project }) => {
  const { allEmployees } = useContext(EmployeeContext);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const [projectData, setProjectData] = useState({
    title: "",
    deadline: "",
    description: "",
    contributors: [],
  });

  function changeHandler(event) {
    const { name, value } = event.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  useEffect(() => {
    setProjectData((prev) => ({
      ...prev,
      contributors: selectedEmployees,
    }));
  }, [selectedEmployees]);

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  
  const isFormValid =
    projectData.title.trim() !== "" &&
    projectData.description.trim() !== "" &&
    projectData.deadline.trim() !== "" &&
    projectData.contributors.length > 0;

  async function createProject(event) {
    event.preventDefault(); 

    if (!isFormValid) {
      toast.error("Please fill all fields before creating a project.");
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/createProject`,
        projectData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      toast.success("Project Created Successfully!!");
      setProject(false);
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to create project. Try again.");
    }
  }

  function toggleEmployeeSelection(id) {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((empId) => empId !== id)
        : [...prevSelected, id]
    );
  }

  function closeModal(event) {
    if (event.target.id === "modal-overlay") {
      setProject(false);
    }
  }

  return (
    <form
      className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
      id="modal-overlay"
      onClick={closeModal}
    >
      <div
        className={`relative w-[700px] p-8 bg-white shadow-xl rounded-3xl transition-all duration-300 ${
          project ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-4">Create New Project</h2>
        <label className="block text-sm font-medium text-gray-700">
          Project Name
        </label>
        <input
          type="text"
          required
          onChange={changeHandler}
          name="title"
          value={projectData.title}
          className="w-full border rounded-md p-2 mt-1 mb-4 focus:outline-blue-400"
          placeholder="Enter project name"
        />
        <label className="block text-sm font-medium text-gray-700">
          Project Description
        </label>
        <input
          type="text"
          required
          onChange={changeHandler}
          name="description"
          value={projectData.description}
          className="w-full border rounded-md p-2 mt-1 mb-4 focus:outline-blue-400"
          placeholder="Enter project Description"
        />

        <label className="block text-sm font-medium text-gray-700">
          Deadline
        </label>
        <input
          required
          onChange={changeHandler}
          name="deadline"
          value={projectData.deadline}
          type="datetime-local"
          className="w-full uppercase border rounded-md p-2 mt-1 mb-4 focus:outline-blue-400"
        />
        <label className="block text-sm font-medium text-gray-700">
          Select Contributors
        </label>
        <div className="w-full h-48 overflow-y-auto px-2 border rounded-md mt-2">
          {allEmployees ? (
            allEmployees.map((employee) => {
              const isSelected = selectedEmployees.includes(employee._id);
              return (
                <div
                  key={employee._id}
                  onClick={() => toggleEmployeeSelection(employee._id)}
                  className={`flex w-full items-center justify-between border rounded-lg px-6 py-4 my-2 cursor-pointer transition ${
                    isSelected
                      ? "bg-blue-500 text-white border-blue-700 shadow-lg"
                      : "bg-white border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">
                      {employee.name}{" "}
                      <span className="text-base font-light">
                        ({employee.role})
                      </span>
                    </span>
                    <span className="text-sm">{employee.username}</span>
                  </div>
                  <ProfilePic name={employee.name} />
                </div>
              );
            })
          ) : (
            <Loading />
          )}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setProject(false)}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={createProject}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Create
          </button>
        </div>
      </div>
    </form>
  );
};

export default EmployeeProject;
