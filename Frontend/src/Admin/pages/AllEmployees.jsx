import React, { useState } from 'react';
import { IoPerson } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import InputData from '../components/Home/EmployeeInput';

const AllEmployees = () => {
  const [employees, setEmployees] = useState([
    {
      name: "Raktim Roy",
      age: "21",
      gender: "Male",
      contact: "9832905461",
      mail: "raktimroy0910@gmail.com",
      position: "Intern",
    },
  ]);
  
  const [editEmployee, setEditEmployee] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [InputDiv, setInputDiv] = useState("hidden");

  const handleEdit = (employee) => {
    setEditEmployee(employee);
    setIsEditOpen(true);
  };

  const handleDelete = (mail) => {
    setEmployees(employees.filter(emp => emp.mail !== mail));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditEmployee({ ...editEmployee, [name]: value });
  };

  const handleSubmit = () => {
    setEmployees(employees.map(emp => emp.mail === editEmployee.mail ? editEmployee : emp));
    setIsEditOpen(false);
  };

  const addEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
    setInputDiv("hidden");
  };

  return (
    <div>
      <div className="w-full flex justify-end">
        <button onClick={() => setInputDiv("fixed")} className="bg-blue-500 text-white p-2 rounded">Add Employee</button>
      </div>
      <h3 className="text-2xl">List of all Employees</h3>
      <hr />
      {employees.map((employee, i) => (
        <div key={i} className="bg-white rounded-sm p-4 border-2 border-blue-800 my-2">
          <div className="flex justify-between">
            <div>
              <p className="text-xl font-semibold">Name: {employee.name}</p>
              <p className="text-gray-600 my-2">Age: {employee.age}</p>
              <p className="text-gray-600 my-2">Gender: {employee.gender}</p>
              <p className="text-gray-600 my-2">Contact: {employee.contact}</p>
              <p className="text-gray-600 my-2">E-mail: {employee.mail}</p>
              <p className="text-gray-600 my-2">Position: {employee.position}</p>
              <button className="bg-gray-600 rounded p-2 text-white mr-2" onClick={() => handleEdit(employee)}>Edit Details</button>
              <button className="bg-red-600 rounded p-2 text-white" onClick={() => handleDelete(employee.mail)}>Delete</button>
            </div>
            <div className="w-1/6 border-2 border-black-800">Employee Photo</div>
          </div>
        </div>
      ))}

      {isEditOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="w-1/3 bg-gray-900 p-4 rounded text-white">
            <div className="flex justify-end">
              <button className="text-xl" onClick={() => setIsEditOpen(false)}>
                <RxCross2 />
              </button>
            </div>
            <input type="text" name="name" value={editEmployee.name} onChange={handleInputChange} className="px-3 py-2 rounded w-full bg-gray-600 my-2" placeholder="Name" />
            <input type="text" name="age" value={editEmployee.age} onChange={handleInputChange} className="px-3 py-2 rounded w-full bg-gray-600 my-2" placeholder="Age" />
            <input type="text" name="gender" value={editEmployee.gender} onChange={handleInputChange} className="px-3 py-2 rounded w-full bg-gray-600 my-2" placeholder="Gender" />
            <input type="text" name="contact" value={editEmployee.contact} onChange={handleInputChange} className="px-3 py-2 rounded w-full bg-gray-600 my-2" placeholder="Contact" />
            <input type="text" name="mail" value={editEmployee.mail} onChange={handleInputChange} className="px-3 py-2 rounded w-full bg-gray-600 my-2" placeholder="E-mail" />
            <input type="text" name="position" value={editEmployee.position} onChange={handleInputChange} className="px-3 py-2 rounded w-full bg-gray-600 my-2" placeholder="Position" />
            <button className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      )}
      <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} addEmployee={addEmployee} />
    </div>
  );
};

export default AllEmployees;
