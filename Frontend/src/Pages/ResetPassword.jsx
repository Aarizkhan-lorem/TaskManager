import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
    const navigate = useNavigate();
    async function changePassword(event){
        event.preventDefault();
        try{
            const response = await axios.post(`${apiUrl}/resetPassword`,{password,confirmPassword,token});
            
            // console.log(response.data);
            if(response.data.success){
              toast.success(response.data.message);
              navigate("/employee-login");
            }
            else{
              toast(response.data.message);
            }
            
        }catch(error){
        const errorMessage =
          error.response?.data?.errors?.[0]?.msg ||
          error.response?.data?.message ||
          "An unexpected error occurred.";
        toast.error(errorMessage);
        }
    }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Reset Password
        </h2>
        <form onSubmit={changePassword}>
          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-2">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label className="block text-gray-300 text-sm mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
