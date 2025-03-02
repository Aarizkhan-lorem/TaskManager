import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const EmployeeSignup = ({ formData, setFormData, changeHandler }) => {
  const [isVisible, setIsVisible] = useState(false);

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Form Submitted", formData);
    if (formData.password === formData.confirmPassword) {
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      navigate("/employee-dashboard");
      setError(false);
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
        className={`bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-[400px] flex flex-col gap-6 items-center transform transition-all duration-700 ease-out ${isVisible
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
            value={formData.name}
            onChange={changeHandler}
            className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-200 focus:ring-2 focus:ring-indigo-300 outline-none transition"
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            name="email"
            value={formData.email}
            onChange={changeHandler}
            className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-200 focus:ring-2 focus:ring-indigo-300 outline-none transition"
          />
          <div className="relative w-full flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              name="password"
              value={formData.password}
              onChange={changeHandler}
              style={error ? { border: "1px solid red" } : {}}
              className="w-full p-3 pr-10 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-200 focus:ring-2 focus:ring-indigo-300 outline-none transition"
            />
            <span
              onClick={() => toggleVisibility(setShowPassword)}
              className="absolute right-3 text-white cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="relative w-full flex items-center mt-3">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={changeHandler}
              style={error ? { border: "1px solid red" } : {}}
              className="w-full p-3 pr-10 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-200 focus:ring-2 focus:ring-indigo-300 outline-none transition"
            />
            <span
              onClick={() => toggleVisibility(setShowConfirmPassword)}
              className="absolute right-3 text-white cursor-pointer"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {(error) ? (
            <p style={{ color: 'red' }}>password must be same</p>
          ) :
            null

          }
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
