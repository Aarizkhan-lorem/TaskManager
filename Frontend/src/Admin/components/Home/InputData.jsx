import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";

const InputData = ({ InputDiv, setInputDiv, addTask }) => {
  const [task, setTask] = useState({
    title: '',
    desc: '',
    status: 'Incomplete'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = () => {
    if (task.title.trim() && task.desc.trim()) {
      addTask(task);
      setTask({ title: '', desc: '', status: 'Incomplete' }); // Reset the form
    }
  };

  return (
    <>
      <div className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full fixed`}></div>
      <div className={`${InputDiv} top-0 left-0 flex items-center justify-center opacity-100 h-screen w-full fixed`}>
        <div className="w-2/6 bg-gray-900 p-4 rounded text-white">
          <div className="flex justify-end my-2">
            <button className="text-xl" onClick={() => setInputDiv("hidden")}>
              <RxCross2 />
            </button>
          </div>
          <input type="text" name="title" placeholder="Title" value={task.title} onChange={handleChange} className="px-3 py-2 rounded w-full bg-gray-600 my-2" />
          <textarea name="desc" placeholder="Enter the description..." value={task.desc} onChange={handleChange} className="px-3 py-2 rounded w-full my-3 bg-gray-600" rows="5"></textarea>
          <button className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold" onClick={handleSubmit}>Add Task</button>
        </div>
      </div>
    </>
  );
};

export default InputData;
