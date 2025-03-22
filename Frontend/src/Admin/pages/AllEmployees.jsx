import React, { useContext, useState } from "react";
import { EmployeeContext } from "../../Context/EmployeeContext";

const AllEmployees = () => {
  const { allEmployees } = useContext(EmployeeContext);
  const [employeeProfile, setEmployeeProfile] =useState( allEmployees.profileImage);
  console.log(allEmployees);

  return (
    <div className="p-6  bg-white shadow-md rounded-lg">
      <h1 className="text-center text-2xl bg-pink-500 text-white py-3 rounded-lg font-semibold">
        EMPLOYEES
      </h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {allEmployees.map((employee) => (
          <div
            key={employee._id}
            className="flex items-center gap-4 p-4 bg-gray-100 shadow-sm rounded-lg hover:shadow-lg transition duration-300"
          >
            <div className="flex-1">
              <p className="text-gray-800 font-medium">ID: {employee._id}</p>
              <p className="text-gray-700">Name: {employee.name}</p>
              <p className="text-gray-600">Email: {employee.username}</p>
              <p className="text-gray-500">Role: {employee.role}</p>
            </div>
            <div className=" bg-gray-300 rounded-full flex items-center justify-center">
              {employee.profileImage ? (
                <img
                  src={employee.profileImage}
                  className=" min-w-32 min-h-32 flex rounded-full justify-center items-center"
                  alt="employee"
                />
              ) : (
                <span className="text-gray-500 min-w-32 min-h-32 flex justify-center items-center">
                  No Profile Pic
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEmployees;
