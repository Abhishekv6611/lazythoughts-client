import { Link } from "react-router-dom"
import { IoIosLogOut } from "react-icons/io";

const Settings = () => {
  return (
    <>
      <div className="w-screen h-screen bg-[#2C3930]">
           <div className="   flex justify-between p-4 bg-[#3F4F44] shadow-md mb-10">
                          <Link to="/dashboard">
                              <button className="flex gap-2 items-center text-[#3F4F44] bg-[#A27B5C] hover:bg-[#946f50] cursor-pointer p-2 rounded">
                                  <p className="font-semibold">Back to Dashboard</p>
                              </button>
                          </Link>
                          <button
                              onClick={""}
                              className="flex gap-2 items-center text-[#3F4F44] bg-[#A27B5C] hover:bg-[#946f50] cursor-pointer p-2 rounded"
                          >
                              <p className="font-semibold">Logout</p>
                              <IoIosLogOut size={20} />
                          </button>
                      </div>
                      <div className="flex justify-center items-center">

                     
                    {/* box for upgrade */}
      <div className=" w-full lg:max-w-md bg-[#3F4F44] text-[#DCD7C9]  rounded-2xl p-6 text-center shadow-2xl  max-w-[300px] ">
        <div className="flex justify-center items-center bg-yellow-100 w-16 h-16 rounded-full mx-auto mb-4 ">
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
        <h2 className="text-2xl font-bold  mb-2">Idea Limit Reached!!</h2>
        <p className="mb-4">Upgrade to premium to add more ideas and unlock extra features.</p>
        <button className="w-full border hover:bg-[#A27B5C] hover:text-[#DCD7C9] py-2 rounded-lg hover:shadow-md transition-all duration-300">
          Upgrade to Premium
        </button>
      </div>
      </div>     
      </div>
   </>
  )
}

export default Settings
