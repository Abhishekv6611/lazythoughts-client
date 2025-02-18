import Dashboard from "./pages/Dashbord";
import LoginPage from "./pages/LoginPage";
import Userthoughts from "./pages/Userthoughts";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import  { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";




export default function App() {
 

  const [token,setToken]=useState(sessionStorage.getItem("token")|| null)

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(sessionStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  
  return (
    <>
    <Toaster/>


    <Routes>
    <Route path="/" element={token ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
   <Route path="/signup" element={token ? <Navigate to="/dashboard" replace /> : <Signup />} />
    <Route path="/signin" element={token ? <Navigate to="/dashboard" replace /> : <Login />} />
 

      
      
      <Route path="/dashboard"  element={token?<Dashboard/>:<Navigate to={'/signin'}/>} />
      <Route path="/yourthoughts"  element={token?<Userthoughts/>:<Navigate to={'/signin'}/>} />
      <Route path="/profile"  element={token?<Profile/>:<Navigate to={'/signin'}/>} />
      <Route path="*" element={<NotFound />} />

    </Routes>
  
    </>
  );
}
