import React, { useState } from 'react';

const CompletedTasks = () => {
  const [allTasks] = useState([
    {
      title: "The Best Coding Channel",
      desc: "Create a channel for web development in Hindi.",
      status: "Complete",
    },
    {
      title: "CPP concepts",
      desc: "Learn the CPP Concepts and get a clear idea about them.",
      status: "Complete",
    },
    {
      title: "Assignment",
      desc: "Solve the assignment within the stipulated time.",
      status: "Incomplete",
    },
    {
      title: "Projects",
      desc: "Complete the Assigned Projects.",
      status: "Incomplete",
    },
  ]);

  const completedTasks = allTasks.filter(task => task.status === "Complete");

  return (
    <>
      <div>
        <h3 className="text-2xl">Completed Tasks</h3>
        <hr />
        {/* Render completed tasks */}
        <ul>
          {completedTasks.map((task, index) => (
            <li key={index} className="p-2 border rounded my-2">
              <h4 className="text-lg font-bold">{task.title}</h4>
              <p>{task.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CompletedTasks;
