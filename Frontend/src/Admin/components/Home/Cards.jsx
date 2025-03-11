import React, { useEffect, useState } from 'react';
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";

const Cards = ({ home, setInputDiv, tasks, deleteTask }) => {
  const initialTasks = [
    {
      title: "The Best Coding Channel",
      desc: "Create a channel for web development in Hindi.",
      status: "Incomplete",
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
  ];

  // Store tasks and update dynamically
  const [allTasks, setAllTasks] = useState([]);

  // State to track the task being edited
  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: "", desc: "", status: "" });

  useEffect(() => {
    // Merge initialTasks and tasks while ensuring uniqueness
    setAllTasks([...new Map([...initialTasks, ...tasks].map(task => [task.title, task])).values()]);
  }, [tasks]);

  // Handle deletion of a task
  const handleDelete = (index) => {
    setAllTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  // Handle edit button click
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedTask(allTasks[index]); // Load current task into input fields
  };

  // Handle input change
  const handleInputChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  // Save edited task
  const handleSave = () => {
    const updatedTasks = [...allTasks];
    updatedTasks[editIndex] = editedTask;
    setAllTasks(updatedTasks);
    setEditIndex(null); // Exit edit mode
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {allTasks.map((task, i) => (
        <div key={i} className="bg-white rounded-sm p-4 flex flex-col justify-between border-2 border-blue-800">
          {editIndex === i ? (
            // Edit mode: Show input fields
            <div>
              <input 
                type="text" 
                name="title"
                value={editedTask.title} 
                onChange={handleInputChange} 
                className="w-full p-2 border border-gray-400 rounded"
              />
              <textarea 
                name="desc"
                value={editedTask.desc} 
                onChange={handleInputChange} 
                className="w-full p-2 mt-2 border border-gray-400 rounded"
              />
            </div>
          ) : (
            // Display mode: Show task details
            <div>
              <h3 className="text-xl font-semibold">{task.title}</h3>
              <p className="text-gray-600 my-2">{task.desc}</p>
            </div>
          )}

          <div className='mt-4 w-full flex items-center'>
            <button className={`${task.status === "Incomplete" ? "bg-red-400" : "bg-green-700"} p-2 rounded px-2 py-2 w-3/6`}>
              {task.status}
            </button>
            <div className="text-black p-2 w-3/6 text-xl font-semibold flex justify-around">
              <button className="text-black-800"><CiHeart /></button>
              {editIndex === i ? (
                <button className="text-green-800" onClick={handleSave}>Save</button>
              ) : (
                <button className="text-black-800" onClick={() => handleEdit(i)}><FaEdit /></button>
              )}
              <button className="text-black-800" onClick={() => handleDelete(i)}><MdDelete /></button>
            </div>
          </div>
        </div>
      ))}
      {home === "true" && (
        <button className="flex flex-col justify-center items-center border-2 border-blue-800 rounded-sm p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300" onClick={() => setInputDiv("fixed")}> 
          <IoMdAddCircleOutline className="text-5xl" />
          <h2 className="text-2xl mt-1">Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
