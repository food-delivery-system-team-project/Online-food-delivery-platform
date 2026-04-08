import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { BsBasket3 } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { PiClipboardText } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useState } from "react";
import FavourateCard from "./NavComp/FavourateCard";

const Navbar = () => {
const [like, setLike] = useState(false)

const handleLike = () => {
  setLike(!like)
}

  return (
    <> 
    <div className='h-20 w-full absolute z-10 flex items-center justify-between px-10'>

      {/* logo */}
      <div className="bg-white h-30 w-30 rounded-3xl flex items-center justify-center">
        <span className="h-2 w-[100%] bg-white absolute top-0"></span>
        <img className="h-10 w-25" src="./src/Images/Logo.png" alt="Logo" srcset="" />
      </div>

      {/* links */}
      <div>
        <ul className=" flex gap-15 text-xl font-semibold text-white">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="http://">Menu</a>
          </li>
          <li>
            <a href="http://">About</a>
          </li>
        </ul>
      </div>

      {/* search bar */}
      <div className='h-13 w-100 bg-white rounded-3xl p-3 flex items-center'> 
        <CiSearch className="text-3xl" />
        <input className="ml-2 outline-0" type="search" placeholder="Search for restaurants..." />
      </div>

      {/* buttons Container */}
      <div className="flex gap-5 items-center ">

      {/* like code */}

      <div>
        <button onClick={handleLike} className='px-3 py-3 rounded-full flex items-center gap-2 bg-white/60 text-white font-bold'><GoHeart className="text-2xl font-bold" /></button>
      </div>
      {like? (
        <span className="bg-[#f7f7f7]/97 p-5 flex flex-col gap-2 top-20 right-25 overflow-auto rounded-2xl p-2 h-100 w-80 text-sm font-bold absolute">
        <FavourateCard/>
        <FavourateCard/>
        <FavourateCard/>
        <FavourateCard/>
        <FavourateCard/>
        <FavourateCard/>
        </span>
      ) : null}

      {/* cart code */}
      <div className="px-3 py-3 flex items-center gap-2 rounded-full bg-white/60 flex items-center justify-center">
        <button className='text-white font-bold'><BsBasket3 className="text-2xl"/></button>
          <span className=" absolute top-9 ml-5 h-5 w-5 flex items-center justify-center text-black rounded-full bg-white/80 font-bold">0</span>      
      </div>  

      {/* orders  */}

      <div>
        <button className='flex items-center gap-2 bg-white/60 text-white font-bold px-3 py-3 rounded-full'><PiClipboardText className="text-2xl" /></button>
      </div>
      {/* login button */}
      <div>
        <Link to="/orders">
        <button className='flex items-center gap-2 bg-white font-bold px-4 py-2 rounded-lg'><CgProfile className="text-2xl" />Login</button>
        </Link>
      </div>
    </div>
    </div>
            
    </>
  )
}

export default Navbar