import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { URL } from "../store/url";

export default function Userthoughts() {
  // State for managing thoughts and UI
  const [thought, setThought] = useState({ title: "", description: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [resData, setResData] = useState([]);
  const [refresh, setRefresh] = useState(false); // To trigger data re-fetch
  const [editData, setEditData] = useState({ id: "", title: "", description: "" });
  const [editModal, setEditModal] = useState(false);
 const [userImg,setUserImg]=useState('')
  // Date formatter
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  // Fetch thoughts on component mount and when `refresh` changes
  const fetchThoughts = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(`${URL}/getthoughts?token=${token}`);
      setResData(response.data.Thought || []);
  
    } catch (error) {
      console.error("Error fetching thoughts:", error);
      toast.error("Failed to fetch thoughts");
    }
  };
  const userDetails=async()=>{
    const token=sessionStorage.getItem("token")
    try {
      const result = await axios.get(`${URL}/getuserDetails?token=${token}`);
      setUserImg(result.data.profilePic);
    } catch (error) {
      console.error("Error fetching user details:", error.response?.data || error);
    }
  }



  useEffect(() => {
    fetchThoughts();
    userDetails()
  }, [refresh]);

  // Handle form submission for adding a new thought
  const handleSubmit = async () => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.post(`${URL}/uploadThoughts?token=${token}`, thought);
      toast.success("Thought added successfully!");
      setRefresh(!refresh); // Trigger re-fetch
      setIsOpen(false); // Close modal
      setThought({ title: "", description: "" }); // Reset form
    } catch (error) {
      console.error("Error adding thought:", error);
      toast.error("Failed to add thought");
    }
  };

  // Handle deletion of a thought
  const handleDelete = async (_id) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(`${URL}/postdelete`, {
        params: { token },
        data: { id: _id },
      });
      toast.success("Thought deleted successfully!");
      setRefresh(!refresh); // Trigger re-fetch
    } catch (error) {
      console.error("Error deleting thought:", error);
      toast.error("Failed to delete thought");
    }
  };

  // Handle updating a thought
  // const updatePost = async (_id, updatedData) => {
  //   try {
  //     const token = sessionStorage.getItem("token");
  //     await axios.put(`${URL}/updatepost`, { id: _id, ...updatedData }, { params: { token } });
  //     toast.success("Thought updated successfully!");
  //     setRefresh(!refresh); // Trigger re-fetch
  //   } catch (error) {
  //     console.error("Error updating thought:", error);
  //     toast.error("Failed to update thought");
  //   }
  // };

  // Handle logout
  const handleLogout = () => {
    toast.success("Logout successful!");
    setTimeout(() => {
      sessionStorage.removeItem("token");
      window.location.href = "/signin";
    }, 2000);
  };


  const openEditModal = (thought) => {
    setEditData({
      id: thought._id,
      title: thought.UserTitle,
      description: thought.UserThoughts,
    });
    setEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(`${URL}/updatepost`, {
        id: editData.id,
        UserTitle: editData.title,
        UserThoughts: editData.description,
      }, { params: { token } });
      toast.success("Thought updated successfully!");
      setRefresh((prev) => !prev);
      setEditModal(false);
    } catch (error) {
      console.error(error)
      toast.error("Failed to update thought");
    }
  };


  return (
    <div className="min-h-screen bg-[#2C3930]">
      {/* Header */}
<div className="fixed top-0 left-0 w-full z-50 flex justify-between p-4 bg-[#3F4F44] shadow-md">
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

      {/* Main Content */}
      <div className="flex justify-center mt-8  ">
        <div className="w-4/5 md:w-2/3 lg:w-1/2">
          {/* Add Thought Button */}
          <button 
            onClick={() => setIsOpen(true)}
            className="w-full bg-[#DCD7C9] hover:bg-[#c8c2b0] text-[#3F4F44] py-2 rounded font-semibold mb-8 mt-20"
          >
            Add Your Thought
          </button>

          {/* Modal for Adding Thought */}
          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md animate-fadeIn">
            <div className="bg-gradient-to-br from-[#2C3930] to-[#A27B5C] text-white rounded-xl shadow-2xl w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 relative">
              {/* Header */}
              <div className="flex justify-between items-center pb-3 border-b border-white/20">
                <h2 className="text-lg font-semibold tracking-wide">Share Your Thought</h2>
                <button onClick={() => setIsOpen(false)} className="text-white transition duration-200 text-2xl">
                  &times;
                </button>
              </div>
          
              {/* Input Fields */}
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="title" className="text-sm font-medium tracking-wide">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={thought.title}
                    onChange={(e) => setThought({ ...thought, title: e.target.value })}
                    className="mt-1 w-full p-3 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-white/50 outline-none transition"
                    placeholder="Enter Idea Title"
                  />
                </div>
          
                <div>
                  <label htmlFor="thought" className="text-sm font-medium tracking-wide">Your Thought</label>
                  <textarea
                    id="thought"
                    value={thought.description}
                    onChange={(e) => setThought({ ...thought, description: e.target.value })}
                    className="mt-1 w-full p-3 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-white/50 outline-none transition resize-none"
                    rows="4"
                    placeholder="Share to express your idea"
                  />
                </div>
              </div>
          
              {/* Footer Buttons */}
              <div className="flex justify-end mt-5">
                <button onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all">
                  Close
                </button>
                <button onClick={handleSubmit} className="ml-3 px-5 py-2 text-sm font-medium bg-white text-[#2C3930] hover:bg-gray-200 rounded-lg transition-all">
                  Post 
                </button>
              </div>
            </div>
          </div>
          
          )}

          {/* Display Thoughts */}
          {resData.length > 0 ? (
            resData.map((res, index) => (
              <div className="p-4 mb-4 bg-[#D2E0FB] rounded-lg shadow-md" key={index}>
                <div className="flex items-center space-x-4">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={userImg}
                    alt="userDp"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{res.UserTitle}</h3>
                    <p className="text-sm text-gray-500">
                      {res.createdAt ? formatter.format(Date.parse(res.createdAt)) : "Invalid date"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-black font-semibold">{res.UserThoughts}</div>
                <div className="flex justify-end items-center mt-3 space-x-2">
                  <button
                    onClick={() => handleDelete(res._id)}
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-500"
                  >
                    <AiOutlineDelete />
                  </button>
                  <button
                    onClick={() => openEditModal(res)}
                    className="bg-gray-600 text-white p-2 rounded hover:bg-gray-500"
                  >
                    <MdEdit />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-xl text-gray-500 mt-20">No thoughts yet, post some ideas!</div>
          )}
        </div>
      </div>
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md animate-fadeIn">
        <div className="bg-gradient-to-br from-[#2C3930] to-[#A27B5C] text-white rounded-xl shadow-2xl w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 relative">
          {/* Header */}
          <div className="flex justify-between items-center pb-3 border-b border-white/20">
            <h2 className="text-lg font-semibold tracking-wide">Edit Your Thought</h2>
            <button onClick={() => setEditModal(false)} className="text-white transition duration-200 text-2xl">
              &times;
            </button>
          </div>
      
          {/* Input Fields */}
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="edit-title" className="text-sm font-medium tracking-wide">Title</label>
              <input
                type="text"
                id="edit-title"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="mt-1 w-full p-3 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-white/50 outline-none transition"
                placeholder="Edit your title..."
              />
            </div>
      
            <div>
              <label htmlFor="edit-description" className="text-sm font-medium tracking-wide">Thought</label>
              <textarea
                id="edit-description"
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                className="mt-1 w-full p-3 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-white/50 outline-none transition resize-none"
                rows="4"
                placeholder="Modify your thought..."
              />
            </div>
          </div>
      
          {/* Footer Buttons */}
          <div className="flex justify-end mt-5">
            <button onClick={() => setEditModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all">
              Cancel
            </button>
            <button onClick={handleUpdate} className="ml-3 px-5 py-2 text-sm font-medium bg-white text-[#2C3930] hover:bg-gray-200 rounded-lg transition-all">
              Update 
            </button>
          </div>
        </div>
      </div>
      
      )}
    </div>
  );
}