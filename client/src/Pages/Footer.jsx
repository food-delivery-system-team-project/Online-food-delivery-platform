import { FaInstagram } from "react-icons/fa";   
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gray-200 rounded-t-3xl">

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 md:p-10">

        {/* EMAIL */}
        <div className="flex flex-col gap-4 items-center bg-[#ff6e4a] p-5 md:p-8 rounded-2xl text-center">
          <h1 className="text-xl md:text-3xl font-bold text-[#28282B]">
            Email Support
          </h1>
          <p className="text-sm md:text-base font-semibold text-[#28282B]">
            General: support@foodexpress.com <br />
            Orders: orders@foodexpress.com <br />
            Business: partners@foodexpress.com
          </p>
        </div>

        {/* ADDRESS */}
        <div className="flex flex-col gap-4 items-center bg-[#ff6e4a] p-5 md:p-8 rounded-2xl text-center">
          <h1 className="text-xl md:text-3xl font-bold text-[#28282B]">
            Office Address
          </h1>
          <p className="text-sm md:text-base font-semibold text-[#28282B]">
            FoodExpress Pvt. Ltd.<br />
            MG Road, Indore<br />
            Madhya Pradesh – 452001
          </p>
        </div>

        {/* PHONE */}
        <div className="flex flex-col gap-4 items-center bg-[#ff6e4a] p-5 md:p-8 rounded-2xl text-center">
          <h1 className="text-xl md:text-3xl font-bold text-[#28282B]">
            Customer Support
          </h1>
          <p className="text-sm md:text-base font-semibold text-[#28282B]">
            +91 98765 43210 <br />
            +91 91234 56780
          </p>
        </div>

      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-5 md:p-10 items-center">

        {/* SOCIAL */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
          <h1 className="text-2xl md:text-4xl font-bold text-[#28282B]">
            Social Media
          </h1>

          <ul className="flex flex-col md:flex-row gap-4 text-lg md:text-xl font-semibold items-center lg:items-start">
            <li className="flex items-center gap-2">
              <FaInstagram />
              <span>@foodexpress_app</span>
            </li>
            <li className="flex items-center gap-2">
              <FaXTwitter />
              <span>@foodexpress_in</span>
            </li>
            <li className="flex items-center gap-2">
              <FaFacebook />
              <span>FoodExpress India</span>
            </li>
          </ul>
        </div>

        {/* WORKING HOURS */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-[#28282B]">
            Working Hours
          </h1>
          <p className="text-sm md:text-lg font-semibold">
            Mon - Sun: 8:00 AM - 11:00 PM
          </p>
        </div>

      </div>
    </div>
  );
};

export default Footer;