import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";
import { URL } from "../store/url";
import Spinner from 'react-bootstrap/Spinner';

export default function Signup() {
  const navigate = useNavigate();
  const[isLoading,setIsLoading]=useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    console.log(formData);
    
    try {
      if(formData.password.length<6){
        toast.error("Password must be 6 characters");
        return
      }
      setIsLoading(true)
      const response = await axios.post(`${URL}/signup`, formData);
      if(response.data.success){
        toast.success("Signup successful!");
      }
      if(response.data.token){
        sessionStorage.setItem("token",response.data.token)
        navigate('/dashboard')
      }
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("An error occurred during signup"); // Handle unexpected errors

    }finally{
      setIsLoading(false)
    }
  };

  return (
    <>
  
      <div className="bg-[#3F4F44] flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full bg-[#3F4F44] text-[#DCD7C9] max-w-md space-y-8 rounded-lg  p-8 shadow-2xl sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <h2 className="mt-6 text-center font-bebas text-2xl font-bold tracking-tight ">
              Sign Up
            </h2>
          </div>

          {/* Add onSubmit to the form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium ">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="fullName"
                  required
                  className="block w-full rounded-md border font-bebas text-black border-gray-300 px-3 py-2  shadow-sm placeholder-gray-400 sm:text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium ">
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border font-bebas text-black border-gray-300 px-3 py-2  shadow-sm placeholder-gray-400 sm:text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium ">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 font-bebas text-black shadow-sm placeholder-gray-400 sm:text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-[#A27B5C] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[#8d6c51] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                 {
          isLoading?
          <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
        :
          "Sign Up"
        }
                
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-[#DCD7C9]">
            Already have an account?{" "}
            <Link to={"/signin"} className="font-medium text-[#ebeae6] hover:text-[#fffefc]">
              SignIn
            </Link>
          </p>
        </div>
      </div>
      
    </>
  );
}