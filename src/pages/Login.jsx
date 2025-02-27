import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { URL } from "../store/url";
import Spinner from 'react-bootstrap/Spinner';

export default function Login() {
  const navigate=useNavigate()
  const[isLoading,setIsLoading]=useState(false)
 const[form,setForm]=useState({
  email:"",
  password:""
 })
 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    console.log(form);
    
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    const response = await axios.post(`${URL}/login`, form);

    if (response.data.success) {
      toast.success("Login Successful");
      sessionStorage.setItem("token", response.data.token);
      window.dispatchEvent(new Event("storage"));
      navigate('/dashboard');
    } else {
      toast.error("Invalid Email or Password");
    }
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 401) {
      toast.error("Invalid Email or Password");
    } else {
      toast.error("Check username and password properly");
    }
  } finally {
    setIsLoading(false);
  }
};





  return (
    <>
  <div className="text-[#DCD7C9] bg-[#3F4F44] flex min-h-screen items-center justify-center  px-6 py-12">
  <div className="w-full  bg-[#3F4F44] max-w-md space-y-8 rounded-lg  p-8 shadow-2xl sm:mx-auto sm:w-full sm:max-w-sm">
    <div>
      <h2 className="mt-6 text-center font-bebas text-2xl font-bold tracking-tight ">
        Sign In
      </h2>
    </div>

  
      <div>
        <label htmlFor="email" className="block text-sm font-medium ">
          Email address
        </label>
        <div className="mt-2">
          <input
            type="email"
            name="email"
            id="email"
            onChange={e=>setForm({...form,email:e.target.value})}
            autoComplete="email"
            required
            className="block w-full rounded-md border text-black border-gray-300 px-3 py-2  shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium ">
            Password
          </label>
          <div className="text-sm">
            <a href="/forgotpassword" className="font-medium text-[#DCD7C9] hover:text-[#d0c8b4]">
              Forgot password?
            </a>
          </div>
        </div>
        <div className="mt-2">
          <input
            type="password"
            name="password"
            onChange={e=>setForm({...form,password:e.target.value})}
            id="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <button
        onClick={handleLogin}
          type="submit"
          className="w-full rounded-md bg-[#A27B5C] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[#8d6c51] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
      {
          isLoading?
          <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
        :
          "Sign In"
        }
        </button>
      </div>

    <p className="mt-6 text-center text-sm text-[#DCD7C9]">
      Not a member?{" "}
      <Link to={"/signup"} className="font-medium text-[#ebeae6] hover:text-[#fffefc]">
        Signup
      </Link>
    </p>
  </div>
</div>



    </>
  )
}
