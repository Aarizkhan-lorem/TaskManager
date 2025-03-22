import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Player } from "@lottiefiles/react-lottie-player";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const EmployeeLogin = ({ setToken }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [employeeFormData, setEmployeeFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  function changeHandler(event) {
    const { name, value } = event.target;
    setEmployeeFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/loginEmployee`,
        employeeFormData
      );
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      toast.success("Logged In Successfully!!");
      navigate("/employee-dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 200);
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-gray-800 to-gray-600 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-300/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-indigo-300/10 rounded-full blur-md"></div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-4xl px-4">
        {/* Animated illustration */}
        <div className="hidden md:block">
          <Player
            autoplay
            loop
            src="https://assets5.lottiefiles.com/packages/lf20_mjlh3hcy.json"
            style={{ height: "300px", width: "300px" }}
          />
        </div>

        {/* Login form */}
        <div
          className={`bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-6 items-center transform transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <h2 className="text-2xl font-semibold text-white drop-shadow-md">
            Welcome Back
          </h2>
          <p className="text-gray-200 text-sm text-center -mt-4">
            Enter your credentials to access your employee account
          </p>

          <form onSubmit={submitHandler} className="w-full flex flex-col gap-5">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                onChange={changeHandler}
                name="username"
                required
                value={employeeFormData.username}
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
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                onChange={changeHandler}
                name="password"
                required
                value={employeeFormData.password}
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div className="w-full text-right">
              <NavLink
                to="/forgot-password"
                className="text-sm text-gray-200 hover:text-white transition"
              >
                Forgot Password?
              </NavLink>
            </div>
            <button
              disabled={isLoading}
              className={`w-full bg-[#3E4095] text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-[#2c2e80] active:scale-95 transition transform relative overflow-hidden ${
                isLoading ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              <span className={isLoading ? "opacity-0" : "opacity-100"}>
                Login
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

          <div className="w-full flex items-center gap-4 my-2">
            <div className="flex-1 h-px bg-gray-400/30"></div>
            <span className="text-gray-300 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-400/30"></div>
          </div>

          <div className="text-gray-200 text-sm">
            Don't have an Account?{" "}
            <NavLink
              className="text-white underline font-medium"
              to="/employee-signup"
            >
              Sign up
            </NavLink>
          </div>

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

export default EmployeeLogin;
