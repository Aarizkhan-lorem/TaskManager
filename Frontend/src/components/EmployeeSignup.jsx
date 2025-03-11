import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PiEyeClosed } from "react-icons/pi";
import { PiEyeDuotone } from "react-icons/pi";
import {toast , Toaster} from "react-hot-toast";
import axios from "axios";
const EmployeeSignup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [employee, setEmployee] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    role:""
  });


  const changeHandler = (event) => {
    const { name, value } = event.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    console.log("Updated Employee:", employee);
  }, [employee]);


  const handleSubmit = async(event) => {
    event.preventDefault();



    // console.log("Form Submitted", formData);
    if (employee.password === employee.confirmPassword) {
      try {
        const response = await axios.post(`${apiUrl}/createEmployee`, employee);
        console.log("Employee Created:", response.data);
        toast.success("Signed Up Successfully!");
        navigate("/employee-dashboard");
      } catch (error) {
        console.error(
          "Error creating employee:",
          error.response?.data || error.message
        );

        if (error.response?.data?.errors) {
          toast.error(error.response.data.errors[0].msg); // Handle multiple validation errors
        } else {
          toast.error(error.response?.data?.message || "Something went wrong!");
        }
      }
    } else {
      setError(true);
    }
    }
    
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 200);
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleVisibility = (setter) => {
    setter((prev) => !prev);
  };
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-700">

      <div
        className={`bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-[400px] flex flex-col gap-6 items-center transform transition-all duration-700 ease-out ${
          isVisible
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        }`}
      >
        <h2 className="text-2xl font-semibold text-white drop-shadow-md">
          Employee Signup
        </h2>

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            required
            name="name"
            value={employee.name}
            onChange={changeHandler}
            className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-200 focus:ring-2 focus:ring-indigo-300 outline-none transition"
          />
          <input
            type="text"
            placeholder="Provide Your Role"
            required
            name="role"
            value={employee.role}
            onChange={changeHandler}
            className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-200 focus:ring-2 focus:ring-indigo-300 outline-none transition"
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            name="username"
            value={employee.username}
            onChange={changeHandler}
            className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-200 focus:ring-2 focus:ring-indigo-300 outline-none transition"
          />
          <div className="relative w-full flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              name="password"
              value={employee.password}
              onChange={changeHandler}
              style={error ? { border: "1px solid red" } : {}}
              className="w-full p-3 pr-10 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-200 focus:ring-2 focus:ring-indigo-300 outline-none transition"
            />
            <span
              onClick={() => toggleVisibility(setShowPassword)}
              className="absolute right-3 text-white text-xl cursor-pointer"
            >
              {showPassword ? <PiEyeDuotone /> : <PiEyeClosed />}
            </span>
          </div>

          <div className="relative w-full flex items-center mt-3">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
              name="confirmPassword"
              value={employee.confirmPassword}
              onChange={changeHandler}
              style={error ? { border: "1px solid red" } : {}}
              className="w-full p-3 pr-10 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-200 focus:ring-2 focus:ring-indigo-300 outline-none transition"
            />
            <span
              onClick={() => toggleVisibility(setShowConfirmPassword)}
              className="absolute right-3 text-xl text-white cursor-pointer"
            >
              {showConfirmPassword ? <PiEyeDuotone /> : <PiEyeClosed />}
            </span>
          </div>
          {error ? <p style={{ color: "red" }}>Password must be same</p> : null}
          <button
            type="submit"
            className="w-full bg-[#3E4095] text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-[#2c2e80] active:scale-95 transition"
          >
            Signup
          </button>
        </form>

        <p className="text-gray-200 text-sm">
          Already have an account?{" "}
          <NavLink to="/employee-login" className="text-white underline">
            Login
          </NavLink>
        </p>

        <NavLink to="/" className="text-sm text-white ">
          Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default EmployeeSignup;
