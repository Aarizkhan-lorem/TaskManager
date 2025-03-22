import React from "react";
import { format } from "date-fns";
import { differenceInDays} from "date-fns";
const EmployeeTasks = ({tasks ,setTaskCompleted}) => {
  const completedTasks = tasks.filter((task) => task.status == "completed");
  console.log(completedTasks);
  const pendingTasks = tasks.filter((task) => task.status === "pending");
  console.log(pendingTasks);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Task Assignment</h1>
      <h2 className="text-2xl font-semibold mb-4">Pending Tasks</h2>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto mb-6">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-center">Task</th>
              <th className="p-3 text-center">Assigned By</th>
              <th className="p-3 text-center">Priority</th>
              <th className="p-3 text-center">Deadline</th>
              <th className="p-3 text-center">Progress</th>
              <th className="p-3 text-center">Completion</th>
            </tr>
          </thead>
          <tbody>
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task) => (
                <tr key={task.id} className="border-b">
                  <td className="p-3 text-center">{task.task}</td>
                  <td className="p-3 text-center">{task.assignedBy.name}</td>
                  <td
                    className={`p-3 text-center font-semibold ${
                      task.priority === "High"
                        ? "text-red-500"
                        : task.priority === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {task.priority}
                  </td>
                  <td className="p-3 text-center">
                    {format(new Date(task.deadline), "dd MMM yyyy")}
                  </td>
                  <td className="p-3 text-center">
                    {console.log(task._id)}
                    {task.status}
                  </td>
                  <td className="text-center p-3">
                    <button
                      onClick={()=> setTaskCompleted(task._id)}
                      className="p-2 bg-green-500 text-white font-medium hover:bg-green-600 rounded-md"
                    >
                      Set As Completed
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-500">
                  No pending tasks
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Completed Tasks</h2>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-center">Task</th>
              <th className="p-3 text-center">Assigned By</th>
              <th className="p-3 text-center">Priority</th>
              <th className="p-3 text-center">Deadline</th>
              <th className="p-3 text-center">Completed On</th>
              <th className="p-3 text-center">Progress</th>
            </tr>
          </thead>
          <tbody>
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <tr key={task._id} className="border-b">
                  <td className="p-3 text-center">{task.task}</td>
                  <td className="p-3 text-center">{task.assignedBy.name}</td>
                  <td
                    className={`p-3 text-center font-semibold ${
                      task.priority === "High"
                        ? "text-red-500"
                        : task.priority === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {task.priority}
                  </td>
                  <td className="p-3 text-center">
                    {format(new Date(task.deadline), "dd MMM yyyy")}
                  </td>
                  {console.log(
                    differenceInDays(task.deadline, task.completedOn)
                  )}
                  <td
                    className={differenceInDays(
                      task.deadline,
                      task.completedOn
                    )>0?`text-green-500 p-3 text-center font-semibold`:`text-red-500 p-3 text-center font-semibold`}
                  >
                    {task.completedOn
                      ? format(new Date(task.completedOn), "dd MMM yyyy")
                      : "-"}
                      {console.log(tasks.length)}
                  </td>
                  <td className="p-3 text-center text-green-600 font-bold">
                    Completed
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-500">
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
