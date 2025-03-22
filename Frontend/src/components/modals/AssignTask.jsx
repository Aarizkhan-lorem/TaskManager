import React, { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "../../Context/EmployeeContext";
import ProfilePic from "../ProfilePic";
import axios from "axios";
import toast from "react-hot-toast";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const AssignTask = ({ setTaskClicked, fetchTasks }) => {
  const { allEmployees } = useContext(EmployeeContext);
  const [assignedEmployee, setAssignedEmployee] = useState("");
  const [task, setTask] = useState({
    task: "",
    priority: "Medium",
    deadline: "",
    assignedTo: "",
  });

  async function createTask(event) {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${apiUrl}/setTask`, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      toast.success("Task Assigned Successfully!!");
      setTaskClicked(false);
      fetchTasks();
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to assign Task. Try again.");
    }
  }

  useEffect(() => {
    setTask((prevTask) => ({ ...prevTask, assignedTo: assignedEmployee }));

    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [assignedEmployee]);

  const handleChange = (e) => {
    setTask((prevTask) => ({ ...prevTask, [e.target.name]: e.target.value }));
  };

  // Close modal when clicking outside
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setTaskClicked(false);
    }
  };

  return (
    <div
      className="z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-[450px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
          Assign a New Task
        </h2>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Task Title
          </label>
          <input
            type="text"
            name="task"
            value={task.task}
            onChange={handleChange}
            placeholder="Enter task title"
            className="mt-1 w-full p-2 border rounded text-base"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded text-base"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Deadline
          </label>
          <input
            type="datetime-local"
            name="deadline"
            value={task.deadline}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded text-base"
          />
        </div>

        <label className="block text-sm font-medium text-gray-700">
          Select Contributors
        </label>
        <div className="w-full h-36 sm:h-48 overflow-y-auto px-2 border rounded-md mt-2">
          {allEmployees ? (
            allEmployees.map((employee) => (
              <div
                key={employee._id}
                onClick={() => setAssignedEmployee(employee._id)}
                className={`flex w-full items-center justify-between border rounded-lg px-3 sm:px-6 py-2 sm:py-4 my-2 cursor-pointer transition ${
                  assignedEmployee === employee._id
                    ? "bg-blue-500 text-white border-blue-700 shadow-lg"
                    : "bg-white border-gray-200 hover:bg-gray-100"
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-base sm:text-lg font-semibold">
                    {employee.name}{" "}
                    <span className="text-sm sm:text-base font-light hidden xs:inline">
                      ({employee.role})
                    </span>
                  </span>
                  <span className="text-xs sm:text-sm">
                    {employee.username}
                  </span>
                </div>
                <ProfilePic name={employee.name} />
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-full">
              <div className="animate-pulse">Loading...</div>
            </div>
          )}
        </div>

        <div className="flex mt-4 justify-end space-x-2">
          <button
            onClick={() => setTaskClicked(false)}
            className="px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base bg-gray-300 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={createTask}
            className="px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            disabled={!task.task || !task.deadline || !task.assignedTo}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTask;
