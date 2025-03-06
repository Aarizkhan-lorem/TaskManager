import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const EmployeeReports = () => {
  const taskData = [
    { name: "Completed", value: 120 },
    { name: "Pending", value: 30 },
  ];

  const teamPerformanceData = [
    { name: "Week 1", tasksCompleted: 20 },
    { name: "Week 2", tasksCompleted: 35 },
    { name: "Week 3", tasksCompleted: 50 },
    { name: "Week 4", tasksCompleted: 60 },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Progress Reporting</h1>
      <p className="mb-4 text-lg text-gray-600">
        Generate reports on task completion and team performance with analytics
        for better decision-making.
      </p>

      {/* Task Summary */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Task Summary</h2>
        <div className="flex justify-between">
          {taskData.map((task, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg w-1/2 mx-2 text-center"
            >
              <h3 className="text-lg font-medium">{task.name}</h3>
              <p className="text-3xl font-bold">{task.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Performance Chart */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Team Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={teamPerformanceData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="tasksCompleted" fill="#4F46E5" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmployeeReports;
