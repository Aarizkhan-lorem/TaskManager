import React from 'react'

const EmployeeProject = ({setProject,project}) => {
  return (
    <div className="">
      <div
        className="absolute transition-all duration-1000 inset-0 m-auto w-full h-full mt-24 z-10 backdrop-blur-sm"
        onClick={() => setProject(false)}
      ></div>
      <div
        className={`absolute left-[27%] w-[700px] p-8 bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl z-20 
  transition-all duration-1000 ease-in-out
  ${project ? "scale-100 translate-y-0" : "scale-0 translate-y-[-10px]"}`}
      >
        <h2 id="modal-title" className="text-xl font-semibold mb-4">
          Create New Project
        </h2>

        <label className="block text-sm font-medium text-gray-700">
          Project Name
        </label>
        <input
          type="text"
          className="w-full border rounded-md p-2 mt-1 mb-4"
          placeholder="Enter project name"
        />

        <label className="block text-sm font-medium text-gray-700">
          Select Contributors
        </label>

        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={() => setProject(false)}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProject