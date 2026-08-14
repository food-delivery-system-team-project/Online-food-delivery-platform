import { BsBasket3 } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { PiClipboardText } from "react-icons/pi";
import { FiHome, FiUser } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdLogIn } from "react-icons/io";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const location = useLocation();

  // ================= CART COUNT =================

  const cartCount = useSelector(
    (state) => state.cart?.totalQuantity || 0
  );

  // ================= USER =================

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

  // ================= ACTIVE ROUTE =================

  const isActive = (path) => {
    return location.pathname === path;
  };

  // ================= NAV ITEM =================

  const NavItem = ({ to, icon, label, badge }) => {
    const active = isActive(to);

    return (
      <Link
        to={to}
        className="flex-1 flex justify-center"
      >
        <div
          className={`
            relative
            flex
            items-center
            justify-center
            gap-2
            rounded-full
            px-3
            sm:px-5
            py-3
            transition-all
            duration-300
            ease-out

            ${
              active
                ? "bg-[#ff6e4a] text-white shadow-lg shadow-orange-200 scale-105"
                : "text-gray-500 hover:bg-orange-50 hover:text-[#ff6e4a]"
            }
          `}
        >
          {/* ICON */}

          <span
            className={`
              text-xl
              sm:text-2xl
              transition-transform
              duration-300
              ${active ? "scale-110" : ""}
            `}
          >
            {icon}
          </span>

          {/* LABEL */}

          <span className="hidden sm:block text-sm font-semibold whitespace-nowrap">
            {label}
          </span>

          {/* CART BADGE */}

          {badge !== undefined && badge > 0 && (
            <span
              className="
                absolute
                -top-1
                -right-1
                min-w-[20px]
                h-[20px]
                px-1
                flex
                items-center
                justify-center
                rounded-full
                bg-[#ff6e4a]
                text-white
                text-[10px]
                font-bold
                border-2
                border-white
              "
            >
              {badge > 99 ? "99+" : badge}
            </span>
          )}
        </div>
      </Link>
    );
  };

  return (
    <>
      {/* ==================================================
          BOTTOM NAVIGATION
      ================================================== */}

      <nav
        className="
          fixed
          bottom-4
          left-1/2
          -translate-x-1/2
          z-[9999]

          w-[calc(100%-24px)]
          sm:w-auto

          bg-white/90
          backdrop-blur-xl

          border
          border-white

          shadow-[0_10px_40px_rgba(0,0,0,0.12)]

          rounded-full

          px-2
          py-2
          sm:px-3
          sm:py-3
        "
      >

        <div className="flex items-center gap-1 sm:gap-2">

          {/* HOME */}

          <NavItem
            to="/"
            icon={<FiHome />}
            label="Home"
          />

          {/* LIKES */}

          <NavItem
            to="/likes"
            icon={<GoHeart />}
            label="Likes"
          />

          {/* CART */}

          <NavItem
            to="/cart"
            icon={<BsBasket3 />}
            label="Cart"
            badge={cartCount}
          />

          {/* ORDERS */}

          <NavItem
            to="/orders"
            icon={<PiClipboardText />}
            label="Orders"
          />

          {/* PROFILE */}

          {user && (
            <NavItem
              to="/profile"
              icon={<FiUser />}
              label="Profile"
            />
          )}

        </div>

      </nav>

      {/* Bottom spacing */}

      <div className="h-20 sm:h-24" />
    </>
  );
};

export default Navbar;