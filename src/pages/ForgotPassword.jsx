import { IoIosSend } from "react-icons/io";
import checkEmail from '../assets/checkemail.jpg'
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { URL } from "../store/url";
import Spinner from 'react-bootstrap/Spinner';

const ForgotPassword = () => {
    const[loading,setLoading]=useState(false)
    const [email, setEmail] = useState("");
   const[data,setData]=useState(null)
const handleForgot=async(e)=>{
    setLoading(true)
    e.preventDefault()
    if(!email){
        toast.error('Please enter your email')
        return
    }
    const res=await axios.post(`${URL}/forgotpassword`,{email})
    console.log(res.data);
    if(res.data.success){
        setData(res.data)
        toast.success("Email sent successfully")
        setEmail("")
    }
   console.log(email);
   setLoading(false)
}

  return (
    <>
    <div style={{paddingTop:'50px'}} className="w-screen h-screen bg-[#2C3930]">
       <div className="flex justify-center items-center  ">
          <div className="max-w-md bg-[#3F4F44] rounded-lg p-1 lg:p-5">
            {
                data?  
                     <div className="flex flex-col justify-center items-center">
                    <img src={checkEmail} alt="emailpic" />
                    <Link to={'/signin'} className="text-center mt-1 bg-[#2C3930] hover:bg-[#1e2720] p-2 text-[#DCD7C9] rounded-sm font-semibold">Back to signin</Link>
                        </div> :
            <div className="p-10 grid">
                <h1 className="text-center text-2xl font-semibold text-[#DCD7C9] mb-2">Forgot Your Password!!</h1>
                <label className="text-center mb-2 font-semibold text-[#DCD7C9]" htmlFor="email">Enter your Email</label>
                <div className="flex">
               <input id="email" type="text" onChange={(e)=>setEmail(e.target.value)} className="p-1 rounded" />
                <button onClick={handleForgot} className="bg-[#2C3930] hover:bg-[#1b281f] p-1 ml-2 rounded-sm font-semibold text-[#DCD7C9]">
                    {
                        loading?
                        <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>:
                    <IoIosSend size={20} />
                    }
                    
                    </button>
                </div>
            </div>
            }
    
          </div>
          
       </div>
    </div>
    </>
  )
}

export default ForgotPassword

