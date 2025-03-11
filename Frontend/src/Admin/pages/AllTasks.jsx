import React, { useState } from 'react';
import Cards from '../components/Home/Cards';
import { IoMdAddCircleOutline } from "react-icons/io";
import InputData from '../components/Home/InputData';

const AllTasks = () => {
  const [InputDiv, setInputDiv] = useState("hidden");
  const [tasks, setTasks] = useState([
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

  const addTask = (newTask) => {
    if (newTask.title.trim() && newTask.desc.trim()) {
      setTasks((prevTasks) => [...prevTasks, { ...newTask }]); // Ensure a new reference is created
      setInputDiv("hidden");
    }
  };

  const deleteTask = (taskIndex) => {
    setTasks((prevTasks) => prevTasks.filter((_, index) => index !== taskIndex));
  };

  return (
    <>
      <div>
        <div className="w-full flex justify-end">
          <button onClick={() => setInputDiv("fixed")} className="bg-blue-500 text-white p-2 rounded">Add Task</button>
        </div>
        <h3 className="text-2xl">List of Tasks</h3>
        <hr />
        {/* Ensure Cards correctly receives and renders tasks */}
        <Cards home={"true"} setInputDiv={setInputDiv} tasks={tasks} deleteTask={deleteTask} />
      </div>
      <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} addTask={addTask} />
    </>
  );
};

export default AllTasks;
