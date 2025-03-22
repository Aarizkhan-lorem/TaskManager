import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const AdminLogin = ({ setAdminToken }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [adminFormData, setAdminFormData] = useState({
    username: "",
    password: "",
  });

  function changeHandler(event) {
    const { name, value } = event.target;
    setAdminFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const navigate = useNavigate();

  async function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/loginAdmin`, adminFormData);

      localStorage.setItem("adminToken", response.data.token);
      setAdminToken(response.data.token);
      toast.success(response.data.message);
      navigate("/admin-dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-red-500 to-purple-600">
      <div
        className={`bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md flex flex-col gap-6 items-center transform transition-all duration-700 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
        }`}
      >
        <h2 className="text-3xl font-bold text-white drop-shadow-md">
          Admin Portal
        </h2>

        <form onSubmit={submitHandler} className="w-full flex flex-col gap-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input
              type="email"
              name="username"
              required
              value={adminFormData.username}
              onChange={changeHandler}
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-4 rounded-xl border border-white/20 bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-white/50 outline-none transition"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="password"
              name="password"
              required
              value={adminFormData.password}
              onChange={changeHandler}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-4 rounded-xl border border-white/20 bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-white/50 outline-none transition"
            />
          </div>

          <button
            className={`w-full mt-4 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-6 py-4 rounded-xl font-medium shadow-lg hover:from-indigo-700 hover:to-indigo-900 active:scale-95 transition-all duration-300 ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                Processing...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <NavLink
          to="/"
          className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-1"
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
  );
};

export default AdminLogin;
