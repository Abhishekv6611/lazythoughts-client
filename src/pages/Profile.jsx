import { useState, useEffect } from "react";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import Branch from '../assets/branch.png';
import 'animate.css';
import axios from 'axios';
import { URL } from "../store/url";
import { FaRegCircle } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import toast from "react-hot-toast";

const Profile = () => {
    const [onEdit, setOnEdit] = useState(false);
    const [editData, setEditData] = useState({ _id: "", userTitle: "" });

    const [userDetails, setUserDetails] = useState({
        EmailAddress: '',
        name: '',
        id: '',
        profilePic:''
    });

    const [image, setImage] = useState("");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) return 
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = async()=>{
            const base64Image=reader.result
            const result=await axios.put(`${URL}/updateprofile`,{
                profilePic:base64Image,
                id:userDetails.id
            })
            const data=result.data
            setImage(data.profilePic)
            toast.success("Successfully changed profile picture!!")
            console.log(data);
            
        }
    };

    const fetchUserdetails = async () => {
        const token = sessionStorage.getItem("token");
        try {
            if (token) {
                const response = await axios.get(`${URL}/getuserDetails?token=${token}`);
                const data = response.data;
                setUserDetails({ ...userDetails, id: data.id, name: data.fullName, EmailAddress: data.EmailAddress ,profilePic:data.profilePic});
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserdetails();
    }, [image]);

    const handleUserEdit = (details) => {
        setOnEdit(true);
        setEditData({
            userTitle: details.name,
            _id: details.id
        });
    };
 
  
  

  const handleEditname = async () => {
    const token = sessionStorage.getItem("token");
    try {
        const result = await axios.put(`${URL}/updateusername`, {
            userTitle: editData.userTitle,
            id: editData._id
        }, { params: { token } });
     const data=result.data
     setUserDetails({...userDetails, name: data.updatedUser.fullName });
     toast.success("Successfully changed name!!")
        setOnEdit(false);
    } catch (error) {
        console.log(error);
    }
};

const handleLogout=()=>{
    toast.success("Logout successfully")
    setTimeout(()=>{
        sessionStorage.removeItem("token");
      window.location.href='/signin'
    },2000)
}



    return (
        <div className="w-screen h-screen bg-[#2C3930] w-screen  h-screen">
            <div className="   flex justify-between p-4 bg-[#3F4F44] shadow-md mb-10">
                <Link to="/dashboard">
                    <button className="flex gap-2 items-center text-[#3F4F44] bg-[#A27B5C] hover:bg-[#946f50] cursor-pointer p-2 rounded">
                        <p className="font-semibold">Back to Dashboard</p>
                    </button>
                </Link>
                <button
                    onClick={handleLogout}
                    className="flex gap-2 items-center text-[#3F4F44] bg-[#A27B5C] hover:bg-[#946f50] cursor-pointer p-2 rounded"
                >
                    <p className="font-semibold">Logout</p>
                    <IoIosLogOut size={20} />
                </button>
            </div>
            <div className="absolute">
                <div className="animate__animated animate__bounceInLeft">
                    <img className="-mx-3" width={'200px'} src={Branch} alt="" />
                </div>
            </div>

            {/* profile section */}
            <div className="flex items-center justify-center relative ">
                <div className="flex flex-col bg-[#3F4F44] rounded-lg p-6 sm:p-10 justify-center items-center">
                    <div className="mb-2">
                        <input type="file"
                            className="hidden"
                            id="fileInput"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="fileInput" className="cursor-pointer">
                            <img width={'200px'} className="rounded-full" src={userDetails?.profilePic||image||"https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"} alt="post" />
                        </label>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="mb-1 text-[#DCD7C9]">username</label>
                        {
                            onEdit ? <div className="flex text-black justify-center items-center">
                                <input type="text" value={editData.userTitle} onChange={e => setEditData({ ...editData, userTitle: e.target.value })} className="p-2 rounded-sm text-center border-none" />
                                <span className="-ml-10 bg-gray-500 p-2 border border-black px-1 cursor-pointer hover:bg-gray-600" onClick={handleEditname}>
                                    Save
                                </span>
                            </div>
                                :
                                <div className="flex text-black justify-center items-center">
                                    <input type="text" value={userDetails.name} className="p-2 rounded-sm text-center border-none" />
                                    <span className="-ml-10 px-3 p-3 bg-gray-500 border border-black cursor-pointer hover:bg-gray-600" onClick={() => handleUserEdit(userDetails)}>
                                        <MdEdit />
                                    </span>
                                </div>
                        }
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 text-[#DCD7C9]">Email</label>
                        <input type="email" value={userDetails.EmailAddress} className="p-2 rounded-sm text-center" />
                    </div>
                    <span className="flex justify-center items-center mt-3 gap-2">
                        <FaRegCircle className="bg-green-500 rounded-2xl border-none" />
                        <p>Active</p>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Profile;