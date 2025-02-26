import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { FaHome, FaUser, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LiaCrownSolid } from "react-icons/lia";

const SideBar = ({ handleLogout, UserDetails }) => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar toggle state

  // Close sidebar on small screens when a menu item is clicked
  const handleMenuItemClick = () => {
    if (window.innerWidth < 640) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Toggle Button - Fixed for Small Screens */}
      <button
        className="fixed top-4 left-4 z-50 text-white p-2 rounded-md bg-[#A27B5C]  sm:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-screen bg-[#3F4F44] text-[#DCD7C9] transition-all duration-300 z-40 ${isOpen ? "w-64" : "w-16"
          } sm:w-60 sm:relative`} >
        <div className="flex flex-col items-center py-6 h-full">
          {/* Sidebar Header */}

          <h1
            className={`text-lg font-bold mb-6 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 sm:opacity-100"
              }`}
          >
            {
              UserDetails.premium &&
              <LiaCrownSolid color="#EFBF04"
                style={{
                  paddingTop: "10px",
                  fontSize: "2rem",
                }} />
            }
            {UserDetails?.fullName}
          </h1>

          {/* Sidebar Menu Items */}





          <nav className="mt-8 space-y-4">
            <Link
              to="/yourthoughts"
              className="flex items-center gap-3 p-3 transition rounded-md hover:bg-[#A27B5C]"
            >
              <FaHome size={18} />
              {(isOpen || window.innerWidth >= 1024) && <span className="font-semibold">Thoughts</span>}
            </Link>

            <Link
              to="/profile"
              className="flex items-center gap-3 p-3 transition rounded-md hover:bg-[#A27B5C]"
            >
              <FaUser size={18} />
              {(isOpen || window.innerWidth >= 1024) && <span className="font-semibold">Profile</span>}
            </Link>

            <Link
              to="/settings"
              className="flex items-center gap-3 p-3 transition rounded-md hover:bg-[#A27B5C]"
            >
              <FaCog size={18} />
              {(isOpen || window.innerWidth >= 1024) && <span className="font-semibold">Settings</span>}
            </Link>

          </nav>





          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-auto flex items-center gap-2 bg-[#A27B5C] p-2 rounded-md hover:bg-red-700 transition"
            aria-label="Logout"
          >
            <IoIosLogOut size={20} />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </nav>

      {/* Overlay for Small Screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SideBar;







