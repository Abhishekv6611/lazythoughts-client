import { useEffect, useState } from "react";
import Section from "../components/Section";
import axios from "axios";
import { URL } from "../store/url";
import SideBar from "../components/SideBar";
import  toast  from "react-hot-toast";
import vine from '../assets/vine.png'
import Spinner from "../components/Spinner";

export default function Dashboard() {
  const [UserDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);  


  const fetchDetails = async () => {
    try {
      const token = sessionStorage.getItem("token");
   
      if (!token) {
        console.log("Token not Found");
        return;
      }

      const res = await axios.get(`${URL}/getuserDetails?token=${token}`);
      setUserDetails(res.data);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error on fetchDetails:", error);
      if (error.response) {
        console.error("Server Response:", error.response.data);
      }
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleLogout = () => {
    setTimeout(() => {
      sessionStorage.removeItem("token");
      window.location.href = "/signin";
    }, 2000);
    toast.success('Logout successfully!')
  };

  return (
    <div className="flex w-screen h-screen bg-[#2C3930] relative">
      {loading ? (
        <div className="flex w-full h-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <SideBar handleLogout={handleLogout} UserDetails={UserDetails} />
          <div className="flex-1 overflow-y-auto">
            <div className="absolute -mt-8 lg:block hidden">
              <img width="200px" className="animate__animated animate__bounceInDown" src={vine} alt="" />
            </div>
            <Section />
          </div>
        </>
      )}
    </div>
  );
}