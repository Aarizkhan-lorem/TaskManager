import { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
//first create EmployeeContext = createContext()
// eslint-disable-next-line react-refresh/only-export-components
export const EmployeeContext = createContext();
//make an EmployeeContextProvider which is used by the EmployeeDashboard and wrapping 
export default function EmployeeContextProvider({children}){
    const [allEmployees,setAllEmployees] =useState([]);
    useEffect(()=>{
        async function fetchAllEmployees(){
            try {
              const response = await axios.get(`${apiUrl}/allEmployees`);
              setAllEmployees(response.data.data);
            } catch (error) {
              console.log(error.message);
            }
        }
        fetchAllEmployees();
    },[]);
    const value = {
        allEmployees,
        setAllEmployees
    }
    return (
        //this is the prrovider key of the EmployeeContext =>EmployeeContext.Provider
        <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>
    )
}