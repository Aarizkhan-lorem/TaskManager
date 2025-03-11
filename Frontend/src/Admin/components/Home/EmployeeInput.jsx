import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";

const EmployeeInput = ({ InputDiv, setInputDiv, addEmployee }) => {
  const [employee, setEmployee] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    mail: '',
    position: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = () => {
    addEmployee(employee);
    setEmployee({ name: '', age: '', gender: '', contact: '', mail: '', position: '' });
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
          <input type="text" name="name" placeholder="Name" value={employee.name} onChange={handleChange} className="px-3 py-2 rounded w-full bg-gray-600 my-2" />
          <input type="text" name="age" placeholder="Age" value={employee.age} onChange={handleChange} className="px-3 py-2 rounded w-full bg-gray-600 my-2" />
          <input type="text" name="gender" placeholder="Gender" value={employee.gender} onChange={handleChange} className="px-3 py-2 rounded w-full bg-gray-600 my-2" />
          <input type="text" name="contact" placeholder="Contact" value={employee.contact} onChange={handleChange} className="px-3 py-2 rounded w-full bg-gray-600 my-2" />
          <input type="email" name="mail" placeholder="Email" value={employee.mail} onChange={handleChange} className="px-3 py-2 rounded w-full bg-gray-600 my-2" />
          <input type="text" name="position" placeholder="Position" value={employee.position} onChange={handleChange} className="px-3 py-2 rounded w-full bg-gray-600 my-2" />
          <button className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold" onClick={handleSubmit}>Add Employee</button>
        </div>
      </div>
    </>
  );
};

export default EmployeeInput;
