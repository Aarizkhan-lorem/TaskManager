import React, { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import { ArrowRight } from "lucide-react";

const Home = ({ token, adminToken }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverEmployee, setHoverEmployee] = useState(false);
  const [hoverAdmin, setHoverAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-[#3E4095] to-red-100 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#3E4095]/20 rounded-full blur-xl"></div>
      <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-red-200/20 rounded-full blur-md"></div>

      <div className="flex items-center justify-center gap-8 px-4 md:px-0">
        {/* Animated character with better positioning */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-full shadow-lg transform transition-all duration-700 ease-in-out scale-90 hover:scale-100">
            <Player
              autoplay
              loop
              src="https://assets2.lottiefiles.com/packages/lf20_xyadoh9h.json"
              style={{ height: "320px", width: "320px" }}
              className="drop-shadow-lg"
            />
          </div>
        </div>

        {/* Card with enhanced animations */}
        <div
          className={`flex flex-col gap-12 items-center bg-white/30 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-[420px] transform transition-all duration-1000 ease 
            ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
        >
          {/* Logo with subtle animation */}
          <div className="flex flex-col items-center gap-3 transform transition-all duration-500">
            <NavLink to={"/"} className="hover:scale-105 transition-transform">
              <img
                src="/logo.webp"
                alt="logo"
                width={220}
                className="drop-shadow-lg"
              />
            </NavLink>
            <p className="italic text-gray-800 text-sm text-center px-6 border-t border-gray-300/50 pt-3 mt-1">
              "A seamless platform for employees and administrators"
            </p>
          </div>

          {/* Buttons with improved hover effects */}
          <div className="flex flex-col gap-5 w-full">
            <NavLink
              to={token ? "/employee-dashboard" : "/employee-login"}
              className="group relative bg-[#3E4095] text-white px-6 py-4 rounded-xl font-medium text-center shadow-lg hover:bg-[#2c2e80] active:scale-98 transition-all duration-300 overflow-hidden"
              onMouseEnter={() => setHoverEmployee(true)}
              onMouseLeave={() => setHoverEmployee(false)}
            >
              <div className="flex items-center justify-center gap-2">
                Login As Employee
                <ArrowRight
                  size={18}
                  className={`transition-transform duration-300 ${
                    hoverEmployee ? "translate-x-1" : ""
                  }`}
                />
              </div>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </NavLink>

            <button
              onClick={() => {
                adminToken
                  ? navigate("/admin-dashboard")
                  : navigate("/admin-login");
              }}
              className="group relative bg-[#3E4095] text-white px-6 py-4 rounded-xl font-medium text-center shadow-lg hover:bg-[#2c2e80] active:scale-98 transition-all duration-300 overflow-hidden"
              onMouseEnter={() => setHoverAdmin(true)}
              onMouseLeave={() => setHoverAdmin(false)}
            >
              <div className="flex items-center justify-center gap-2">
                Login As Administrator
                <ArrowRight
                  size={18}
                  className={`transition-transform duration-300 ${
                    hoverAdmin ? "translate-x-1" : ""
                  }`}
                />
              </div>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
