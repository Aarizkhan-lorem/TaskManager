import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const ForgotPassword = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 200);
  }, []);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Password reset link sent to:", email);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-700">
      <div
        className={`bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-[400px] flex flex-col gap-6 items-center transform transition-all duration-700 ease-out ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <h2 className="text-2xl font-semibold text-white drop-shadow-md">
          Forgot Password
        </h2>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-200 focus:ring-2 focus:ring-indigo-300 outline-none transition"
          />
          <button
            type="submit"
            className="w-full bg-[#3E4095] text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-[#2c2e80] active:scale-95 transition"
          >
            Send Reset Link
          </button>
        </form>
        <NavLink to="/" className="text-sm text-white">
          Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default ForgotPassword;
