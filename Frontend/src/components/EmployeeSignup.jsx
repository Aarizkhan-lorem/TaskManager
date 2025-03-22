import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PiEyeClosed } from "react-icons/pi";
import { PiEyeDuotone } from "react-icons/pi";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";

const EmployeeSignup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [employee, setEmployee] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "confirmPassword" || name === "password") {
      setError(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (employee.password === employee.confirmPassword) {
      setIsLoading(true);
      try {
        const response = await axios.post(`${apiUrl}/createEmployee`, employee);
        toast.success("Signed Up Successfully!");
        navigate("/employee-dashboard");
      } catch (error) {
        if (error.response?.data?.errors) {
          toast.error(error.response.data.errors[0].msg);
        } else {
          toast.error(error.response?.data?.message || "Something went wrong!");
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setError(true);
    }
  };

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
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-gray-800 to-gray-600 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-40 h-40 bg-purple-300/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-blue-400/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-indigo-300/10 rounded-full blur-md"></div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-4xl px-4">
        {/* Animated illustration */}
        <div className="hidden md:block">
          <Player
            autoplay
            loop
            src="https://assets10.lottiefiles.com/packages/lf20_kdx6cani.json"
            style={{ height: "320px", width: "320px" }}
          />
        </div>

        {/* Signup form */}
        <div
          className={`bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-5 items-center transform transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <h2 className="text-2xl font-semibold text-white drop-shadow-md">
            Create Your Account
          </h2>
          <p className="text-gray-200 text-sm -mt-3">
            Join as an employee to access the platform
          </p>

          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                placeholder="Full Name"
                required
                name="name"
                value={employee.name}
                onChange={changeHandler}
                className="w-full p-3 pl-10 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-300 outline-none transition"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-300 absolute left-3 top-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Your Role (e.g. Developer, Designer)"
                required
                name="role"
                value={employee.role}
                onChange={changeHandler}
                className="w-full p-3 pl-10 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-300 outline-none transition"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-300 absolute left-3 top-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            <div className="relative">
              <input
                type="email"
                placeholder="Email Address"
                required
                name="username"
                value={employee.username}
                onChange={changeHandler}
                className="w-full p-3 pl-10 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-300 outline-none transition"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-300 absolute left-3 top-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                name="password"
                value={employee.password}
                onChange={changeHandler}
                className={`w-full p-3 pl-10 pr-10 rounded-lg border ${
                  error ? "border-red-400" : "border-white/30"
                } bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-300 outline-none transition`}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-300 absolute left-3 top-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span
                onClick={() => toggleVisibility(setShowPassword)}
                className="absolute right-3 top-3 text-white text-xl cursor-pointer"
              >
                {showPassword ? <PiEyeDuotone /> : <PiEyeClosed />}
              </span>
            </div>

            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                name="confirmPassword"
                value={employee.confirmPassword}
                onChange={changeHandler}
                className={`w-full p-3 pl-10 pr-10 rounded-lg border ${
                  error ? "border-red-400" : "border-white/30"
                } bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-300 outline-none transition`}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-300 absolute left-3 top-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span
                onClick={() => toggleVisibility(setShowConfirmPassword)}
                className="absolute right-3 top-3 text-white text-xl cursor-pointer"
              >
                {showConfirmPassword ? <PiEyeDuotone /> : <PiEyeClosed />}
              </span>
            </div>

            {error && (
              <p className="text-red-400 text-sm flex items-center gap-1 -mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Passwords don't match
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#3E4095] text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-[#2c2e80] active:scale-95 transition relative overflow-hidden mt-2 ${
                isLoading ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              <span className={isLoading ? "opacity-0" : "opacity-100"}>
                Sign Up
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              )}
            </button>
          </form>

          <div className="w-full flex items-center gap-4 my-1">
            <div className="flex-1 h-px bg-gray-400/30"></div>
            <span className="text-gray-300 text-xs">OR</span>
            <div className="flex-1 h-px bg-gray-400/30"></div>
          </div>

          <p className="text-gray-200 text-sm">
            Already have an account?{" "}
            <NavLink
              to="/employee-login"
              className="text-white underline font-medium hover:text-indigo-200 transition"
            >
              Login
            </NavLink>
          </p>

          <NavLink
            to="/"
            className="text-sm text-gray-300 hover:text-white transition flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </NavLink>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default EmployeeSignup;
