import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const AdminProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      try {
        const res = await axios.post(
          `${apiUrl}/verify-token`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsAuthenticated(res.data.valid);
      } catch (error) {
        localStorage.removeItem("token");
        console.log(error);
        setIsAuthenticated(false);
      }
    };
    verifyToken();
  }, []);

  if (isAuthenticated === null) return <h2>Loading...</h2>;

  return isAuthenticated ? element : <Navigate to="/admin-login" />;
};

export default AdminProtectedRoute;
