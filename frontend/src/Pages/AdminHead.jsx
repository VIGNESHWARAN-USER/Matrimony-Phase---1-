import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { IoReorderThreeOutline, IoArrowBack } from "react-icons/io5";
import { AiOutlineHome, AiOutlineUser, AiOutlineCrown, AiOutlineUsergroupDelete, AiOutlineFileSearch, AiOutlineLogout } from "react-icons/ai";
import PropTypes from "prop-types";

const AdminHead = ({ setActiveSection }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [svg, setSvg] = useState(0);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
        setSvg(0);
      }
    };

    if (dropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    setSvg((prevSvg) => (prevSvg ? 0 : 1));
  };

  const handleBackNavigation = () => {
    navigate(-1);
  };

  return (
    <header className="bg-gray-800 text-white flex justify-between items-center h-16 px-4 md:px-6 shadow-lg fixed top-0 w-full z-50">
      <div className="flex items-center space-x-2 md:space-x-4">
        <button onClick={handleBackNavigation} className="text-2xl md:text-3xl hover:text-green-200">
          <IoArrowBack />
        </button>

        <div className="flex flex-col">
          <div className="text-lg md:text-2xl font-bold tracking-wide">ADMIN DASHBOARD</div>
          <div className="text-xs md:text-sm italic">Chennai Siddha Viddhai</div>
        </div>
      </div>
      <div ref={dropdownRef} className="relative">
        <button
          onClick={toggleDropdown}
          className="text-3xl md:text-4xl focus:outline-none transform hover:scale-110 transition-transform duration-200"
        >
          {svg === 0 ? <IoReorderThreeOutline /> : <RxCross2 />}
        </button>
        {dropdownVisible && (
          <div className="absolute right-0 mt-2 w-40 md:w-48 bg-white text-black shadow-lg rounded-lg animate-fade-in-down">
            <>
              <Link
                onClick={() => setActiveSection('AdminDashboard')}
                className="flex items-center px-4 py-2 hover:bg-gray-200 hover:text-gray-800 hover:rounded-lg transition-colors duration-200"
              >
                <AiOutlineHome className="mr-2" /> Dashboard
              </Link>
              <Link
                onClick={() => setActiveSection('RegisteredUsers')}
                className="flex items-center px-4 py-2 hover:bg-gray-200 hover:text-gray-800 hover:rounded-lg transition-colors duration-200"
              >
                <AiOutlineUser className="mr-2" /> Registered Users
              </Link>
              <Link
                onClick={() => setActiveSection('PremiumUsers')}
                className="flex items-center px-4 py-2 hover:bg-gray-200 hover:text-gray-800 hover:rounded-lg transition-colors duration-200"
              >
                <AiOutlineCrown className="mr-2" /> Premium Users
              </Link>
              <Link
                onClick={() => setActiveSection('NonPremiumUsers')}
                className="flex items-center px-4 py-2 hover:bg-gray-200 hover:text-gray-800 hover:rounded-lg transition-colors duration-200"
              >
                <AiOutlineUsergroupDelete className="mr-2" /> Non-Premium Users
              </Link>
              <Link
                onClick={() => setActiveSection('Requests')}
                className="flex items-center px-4 py-2 hover:bg-gray-200 hover:text-gray-800 hover:rounded-lg transition-colors duration-200"
              >
                <AiOutlineFileSearch className="mr-2" /> Requests
              </Link>
              <Link
                to="../login"
                className="flex items-center px-4 py-2 hover:bg-gray-200 hover:text-gray-800 hover:rounded-lg transition-colors duration-200"
              >
                <AiOutlineLogout className="mr-2" /> Logout
              </Link>
            </>
          </div>
        )}
      </div>
    </header>
  );
};

AdminHead.propTypes = {
  setActiveSection: PropTypes.func.isRequired,
};

export default AdminHead;
