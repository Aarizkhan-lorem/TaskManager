import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock, User, Flag } from "lucide-react";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const statusColors = {
  completed: "bg-green-100 text-green-800 border-green-500",
  pending: "bg-red-100 text-red-800 border-red-500",
  inProgress: "bg-yellow-100 text-yellow-800 border-yellow-500",
};

const AllTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${apiUrl}/getAllTasks`);
        const data = await response.json();

        if (data.success) {
          const completed = data.allTasks;
          setCompletedTasks(completed);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      <h3 className="text-3xl font-bold text-gray-800 mb-4">All Tasks</h3>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <div
              key={task._id}
              className="p-5 border rounded-xl shadow-lg bg-white hover:shadow-2xl transition duration-300"
            >
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                {task.task}
              </h4>
              <div
                className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${
                  statusColors[task.status] || "bg-gray-100 text-gray-800"
                }`}
              >
                {task.status}
              </div>
              <div className="mt-3 text-gray-700 space-y-2">
                <p className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <strong>Assigned By:</strong> {task.assignedBy.name}
                </p>
                <p className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <strong>Assigned To:</strong> {task.assignedTo.name}
                </p>
                <p className="flex items-center gap-2">
                  <Flag className="w-5 h-5 text-gray-500" />
                  <strong>Priority:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded ${
                      task.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {task.priority}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <strong>Deadline:</strong>{" "}
                  {task.deadline
                    ? format(new Date(task.deadline), "PPP p")
                    : "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-gray-500" />
                  <strong>Completed On:</strong>{" "}
                  {task.completedOn
                    ? format(new Date(task.completedOn), "PPP p")
                    : "N/A"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg">No completed tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default AllTasks;
