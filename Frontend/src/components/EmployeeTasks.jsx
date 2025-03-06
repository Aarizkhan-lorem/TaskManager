import React, { useState } from "react";
import { format } from "date-fns";

const tasksData = [
  {
    id: 1,
    title: "Fix UI Bugs",
    assignedBy: { name: "Alice", avatar: "https://i.pravatar.cc/40?img=1" },
    priority: "High",
    deadline: "2024-03-15",
    progress: 80,
  },
  {
    id: 2,
    title: "Develop API Endpoints",
    assignedBy: { name: "Bob", avatar: "https://i.pravatar.cc/40?img=2" },
    priority: "Medium",
    deadline: "2024-03-20",
    progress: 40,
  },
  {
    id: 3,
    title: "Write Documentation",
    assignedBy: { name: "Charlie", avatar: "https://i.pravatar.cc/40?img=3" },
    priority: "Low",
    deadline: "2024-03-25",
    progress: 0,
  },
];

const EmployeeTasks = () => {
  const [tasks, setTasks] = useState(tasksData);

  // Handle progress update
  const updateProgress = (id, newProgress) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, progress: newProgress } : task
      )
    );
  };

  const completedTasks = tasks.filter((task) => task.progress === 100);
  const pendingTasks = tasks.filter((task) => task.progress < 100);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Task Assignment</h1>

      {/* Pending Tasks */}
      <h2 className="text-2xl font-semibold mb-4">Pending Tasks</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-left">Task</th>
              <th className="p-3 text-left">Assigned By</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Deadline</th>
              <th className="p-3 text-left">Progress</th>
            </tr>
          </thead>
          <tbody>
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task) => (
                <tr key={task.id} className="border-b">
                  <td className="p-3">{task.title}</td>
                  <td className="p-3 flex items-center gap-2">
                    <img
                      src={task.assignedBy.avatar}
                      alt={task.assignedBy.name}
                      className="w-8 h-8 rounded-full"
                    />
                    {task.assignedBy.name}
                  </td>
                  <td
                    className={`p-3 font-semibold ${
                      task.priority === "High"
                        ? "text-red-500"
                        : task.priority === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {task.priority}
                  </td>
                  <td className="p-3">
                    {format(new Date(task.deadline), "dd MMM yyyy")}
                  </td>
                  <td className="p-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={task.progress}
                      onChange={(e) =>
                        updateProgress(task.id, parseInt(e.target.value))
                      }
                      className="w-32"
                    />
                    <span className="ml-2">{task.progress}%</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No pending tasks
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Completed Tasks */}
      <h2 className="text-2xl font-semibold mb-4">Completed Tasks</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-left">Task</th>
              <th className="p-3 text-left">Assigned By</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Deadline</th>
              <th className="p-3 text-left">Progress</th>
            </tr>
          </thead>
          <tbody>
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <tr key={task.id} className="border-b">
                  <td className="p-3">{task.title}</td>
                  <td className="p-3 flex items-center gap-2">
                    <img
                      src={task.assignedBy.avatar}
                      alt={task.assignedBy.name}
                      className="w-8 h-8 rounded-full"
                    />
                    {task.assignedBy.name}
                  </td>
                  <td
                    className={`p-3 font-semibold ${
                      task.priority === "High"
                        ? "text-red-500"
                        : task.priority === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {task.priority}
                  </td>
                  <td className="p-3">
                    {format(new Date(task.deadline), "dd MMM yyyy")}
                  </td>
                  <td className="p-3 text-green-600 font-bold">Completed</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No completed tasks
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTasks;
