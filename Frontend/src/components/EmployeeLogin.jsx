import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const EmployeeLogin = ({setToken}) => {
  const [isVisible, setIsVisible] = useState(false);
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

  async function submitHandler(event){
    event.preventDefault();
    try{
      
      const response = await axios.post(`${apiUrl}/loginEmployee` , employeeFormData);
      localStorage.setItem("token",response.data.token);
      setToken(response.data.token);
      toast.success('Logged In Successfully!!')
      navigate("/employee-dashboard");

    }catch(error){
       toast.error(error.response.data.message);
    }
    




    
    
  }



  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 200);
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-700">

      <div
        className={`bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-[400px] flex flex-col gap-6 items-center transform transition-all duration-700 ease-out ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <h2 className="text-2xl font-semibold text-white drop-shadow-md">
          Employee Login
        </h2>

        <form onSubmit={submitHandler} className="w-full flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            onChange={changeHandler}
            name="username"
            required
            value={employeeFormData.username}
            className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-200 focus:ring-2 focus:ring-indigo-300 outline-none transition"
          />
          <input
            type="password"
            placeholder="Enter your password"
            onChange={changeHandler}
            name="password"
            required
            value={employeeFormData.password}
            className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-200 focus:ring-2 focus:ring-indigo-300 outline-none transition"
          />
          <div className="w-full text-right">
            <NavLink
              to="/forgot-password"
              className="text-sm text-gray-200 hover:text-white transition"
            >
              Forgot Password?
            </NavLink>
          </div>
          <button
            className="w-full bg-[#3E4095] text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-[#2c2e80] active:scale-95 transition transform"
          >
            Login
          </button>
        </form>

        <div className="text-gray-200 text-sm">
          Don't have an Account?{" "}
          <NavLink className={`text-white underline`} to={"/employee-signup"}>
            Signup
          </NavLink>
        </div>

        <NavLink to="/" className="text-sm text-white">
          Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default EmployeeLogin;
