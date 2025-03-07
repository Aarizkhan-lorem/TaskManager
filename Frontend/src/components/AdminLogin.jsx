import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink,useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const AdminLogin = ({setAdminToken}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [adminFormData,setAdminFormData] = useState({
        username:"",
        password:"",
    })
    function changeHandler(event){
        const {name,value} = event.target;
        setAdminFormData((prev)=>({
            ...prev,
            [name]:value,
        }))

    }
    const navigate = useNavigate();
    async function submitHandler(event){
        event.preventDefault();
        try{
          const response = await axios.post(
            `${apiUrl}/loginAdmin`,
            adminFormData
          );
          console.log(response);
          localStorage.setItem('adminToken' , response.data.token );
          console.log(response.data.token);
          setAdminToken(response.data.token);
          toast.success(response.data.message);
          navigate('/admin-dashboard');
        }catch(error){
          toast.error(error.response.data.message);
        }
        // console.log(adminFormData);
        // navigate("/admin-dashboard");
    }
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-red-500">
      <div
        className={`bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-[400px] flex flex-col gap-6 items-center transform transition-all duration-700 ease-out ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <h2 className="text-2xl font-semibold text-white drop-shadow-md">
          Administrator Login
        </h2>

        <form onSubmit={submitHandler} className="w-full flex flex-col gap-4">
          <input
            type="email"
            name="username"
            required
            value={adminFormData.username}
            onChange={changeHandler}
            placeholder="Enter admin email"
            className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-200 focus:ring-2 focus:ring-indigo-300 outline-none transition"
          />
          <input
            type="password"
            name="password"
            required
            value={adminFormData.password}
            onChange={changeHandler}
            placeholder="Enter admin password"
            className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-200 focus:ring-2 focus:ring-indigo-300 outline-none transition"
          />
          <button className="w-full bg-[#3E4095] text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-[#2c2e80] active:scale-95 transition">
            Login as Admin
          </button>
        </form>

        <NavLink to="/" className="text-sm text-white">
          Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default AdminLogin;
