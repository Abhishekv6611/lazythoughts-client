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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-[#DCD7C9] rounded-lg shadow-lg w-4/5 md:w-1/2">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-lg font-bold">Post your Thought</h2>
                  <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-black">
                    &times;
                  </button>
                </div>
                <div className="p-4 flex flex-col">
                  <label htmlFor="title" className="mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={thought.title}
                    onChange={(e) => setThought({ ...thought, title: e.target.value })}
                    className="p-2 bg-slate-200 rounded mb-3"
                  />
                  <label htmlFor="thought" className="mb-1">
                    Thought
                  </label>
                  <textarea
                    id="thought"
                    value={thought.description}
                    onChange={(e) => setThought({ ...thought, description: e.target.value })}
                    className="p-2 bg-slate-200 rounded mb-3"
                    rows="4"
                  ></textarea>
                </div>
                <div className="flex justify-end p-4 border-t">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-[#A27B5C] px-4 py-2 rounded hover:bg-[#946f50] text-[#3F4F44]"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="ml-2 bg-[#2C3930] text-white px-4 py-2 rounded hover:bg-[#1e2f24]"
                  >
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#DCD7C9] rounded-lg shadow-lg w-4/5 md:w-1/2">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold">Edit Thought</h2>
              <button onClick={() => setEditModal(false)} className="text-gray-400 hover:text-black">&times;</button>
            </div>
            <div className="p-4 flex flex-col">
              <input type="text" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} className="p-2 bg-slate-100 rounded mb-3" />
              <textarea value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} className="p-2 bg-slate-100 rounded mb-3" rows="4"></textarea>
            </div>
            <div className="flex justify-end p-4 border-t">
              <button onClick={() => setEditModal(false)} className="bg-[#A27B5C] hover:bg-[#946f50] text-[#3F4F44] px-4 py-2 rounded ">Cancel</button>
              <button onClick={handleUpdate} className="ml-2 bg-[#2C3930] text-white px-4 py-2 rounded hover:bg-[#1e2f24]">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}