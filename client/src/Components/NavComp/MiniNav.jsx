import { IoMdLogIn } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const MiniNav = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.log("Error loading user:", error);
      setUser(null);
    }
  }, []);

  return (
    <header className="w-full px-4 sm:px-6 lg:px-10 pt-4 sm:pt-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* ================= LOCATION ================= */}

        <Link
          to="/location"
          className="group flex items-center gap-2 sm:gap-3 cursor-pointer"
        >
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:shadow-md group-hover:scale-105 transition-all duration-200">
            <FaLocationDot className="text-xl sm:text-2xl text-[#ff6e4a]" />
          </div>

          <div className="leading-tight">
            <p className="text-[10px] sm:text-xs text-gray-400 font-medium">
              Deliver to
            </p>

            <h2 className="text-sm sm:text-base font-bold text-gray-800 max-w-[150px] truncate group-hover:text-[#ff6e4a] transition-colors">
              Demo Nagar
            </h2>

            <p className="text-[10px] sm:text-xs text-gray-500">
              Raipur
            </p>
          </div>
        </Link>

        {/* ================= USER ================= */}

        {user ? (
          <Link to="/profile">

            <div className="flex items-center gap-2 sm:gap-3">
              
              <div className="text-right">
                <p className="text-[10px] sm:text-xs text-gray-400">
                  Welcome back
                </p>

                <h2 className="text-sm sm:text-lg font-bold text-gray-800 max-w-[130px] sm:max-w-none truncate">
                  Hi, {user.name}
                </h2>
              </div>

              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#ff6e4a] text-white flex items-center justify-center font-bold text-lg shadow-md">
                {user.name?.charAt(0)?.toUpperCase()}
              </div>

            </div>

          </Link>
        ) : (

          <Link to="/login">

            <button className="flex items-center gap-2 bg-white text-[#ff6e4a] font-semibold px-4 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200">

              Login

              <IoMdLogIn className="text-xl" />

            </button>

          </Link>

        )}

      </div>
    </header>
  );
};

export default MiniNav;