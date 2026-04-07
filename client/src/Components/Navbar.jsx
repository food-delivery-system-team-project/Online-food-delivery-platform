import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { BsBasket3 } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { PiClipboardText } from "react-icons/pi";

const Navbar = () => {
  return (
    <> 
    <div className='h-20 w-screen bg-amber-500/60 flex items-center justify-between px-10'>

      {/* logo */}
      <div className="">
        <img className="h-20 w-40" src="./src/Images/Logo.png" alt="Logo" srcset="" />
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
        <span className="bg-white/80 top-10 right-72  p-2 rounded-2xl text-sm font-bold absolute">Favorites</span>
        <button className='px-3 py-3 rounded-full flex items-center gap-2 bg-amber-600/60 text-white font-bold'><GoHeart className="text-2xl font-bold" /></button>
      </div>

      {/* cart code */}
      <div className="px-3 py-3 flex items-center gap-2 rounded-full bg-amber-600/60 flex items-center justify-center">
        <button className='text-white font-bold'><BsBasket3 className="text-2xl"/></button>
          <span className=" absolute top-9 ml-5 h-5 w-5 flex items-center justify-center text-black rounded-full bg-white/80 font-bold">0</span>      
      </div>  

      {/* orders  */}

      <div>
        <button className='flex items-center gap-2 bg-amber-600/60 text-white font-bold px-3 py-3 rounded-full'><PiClipboardText className="text-2xl" /></button>
      </div>
      {/* login button */}
      <div>
        <button className='flex items-center gap-2 bg-amber-600 text-white font-bold px-4 py-2 rounded-lg'><CgProfile className="text-2xl" />Login</button>
      </div>
    </div>
    </div>
            
    </>
  )
}

export default Navbar