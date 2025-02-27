import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useEffect, useState } from "react";
import PremiumModal from "../components/PremiumModal";
import toast from "react-hot-toast";
import axios from "axios";
import { URL } from "../store/url";

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const[userDetails,setUserDetails]=useState()
 const[update,setUpdate]=useState('')
  const UpgradePlans = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const Accountdelete=()=>{
   const token=sessionStorage.getItem("token")
   const res=axios.delete(`${URL}/deleteaccount/${token}`)
    if(res){
      toast.success("Account Deleted Successfully")
    setTimeout(()=>{
        sessionStorage.removeItem("token");
      window.location.href='/signin'
    },2000)
  }
}



  useEffect(()=>{
    const fetchDetails=async()=>{
    const token=sessionStorage.getItem("token")
    if(!token){
      console.log("Token not Found");
        return;
    }
    try {
       const result= await axios.get(`${URL}/getuserDetails?token=${token}`);
       setUserDetails(result.data)
       console.log(userDetails);
    } catch (error) {
      console.log(error);
    }
  }
  fetchDetails()
  },[update])
 

useEffect(()=>{
  console.log("userDetails",userDetails);
},[userDetails])


  return (
    <>
      <div className="w-screen h-screen bg-[#2C3930]">
        {/* Header */}
        <div className="flex justify-between p-4 bg-[#3F4F44] shadow-md mb-10">
          <Link to="/dashboard">
            <button className="flex gap-2 items-center text-[#3F4F44] bg-[#A27B5C] hover:bg-[#946f50] cursor-pointer p-2 rounded">
              <p className="font-semibold">Back to Dashboard</p>
            </button>
          </Link>
          <button
          
            onClick={Accountdelete}
            className="flex gap-2 items-center text-white bg-red-600 hover:bg-red-700 cursor-pointer p-2 rounded"
          >
            <p className="font-semibold">Delete Account</p>
            <IoIosLogOut size={20} />
          </button>
        </div>

        {/* Upgrade Plans Box */}
        <div className="flex justify-center items-center">
          <div className="w-full lg:max-w-md bg-[#3F4F44] text-[#DCD7C9] rounded-2xl p-6 text-center shadow-2xl max-w-[300px] transform transition-transform">
            <div className="flex justify-center items-center bg-yellow-100 w-16 h-16 rounded-full mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="text-yellow-500 w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v3m4.95 1.05l-2.12 2.12m-5.66 0L7.05 7.05M3 12h3m4.95 4.95l2.12-2.12m5.66 0l2.12 2.12M21 12h-3m-4.95 4.95l-2.12 2.12m-5.66 0l-2.12-2.12"
                />
              </svg>
            </div>
            {
              userDetails&&userDetails.premium?
              <span>

              <h2 className="text-2xl font-bold mb-2">Premium member</h2>
              <p className="mb-4">Congratulation for premium membership</p>
              </span>
              :
              <span>
              <h2 className="text-2xl font-bold mb-2">Idea Limit Reached!!</h2>
              <p className="mb-4">Upgrade to premium to add more ideas and unlock extra features.</p>
              </span>
            }
            <button
              onClick={UpgradePlans}
              className="w-full border hover:bg-[#A27B5C] hover:text-[#DCD7C9] py-2 rounded-lg hover:shadow-md transition-all duration-300"
            >
             {
              userDetails&&userDetails.premium?<p className="font-bold">Premium Member</p>: "Upgrade to Premium"
             } 
            </button>
          </div>
        </div>


        {/* Modal */}
   
        {isOpen && (
          <PremiumModal closeModal={closeModal} userDetails={userDetails} setUpdate={setUpdate}/>
        )}
      
     
      </div>
    </>
  );
};

export default Settings;