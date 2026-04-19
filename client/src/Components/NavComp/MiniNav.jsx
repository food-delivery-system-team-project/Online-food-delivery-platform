import { BsBasket3 } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { PiClipboardText } from "react-icons/pi";
import BackBtn from './BackBtn'
import { Link } from 'react-router-dom'

const MiniNav = () => {
  return (
    <div className='p-4 flex items-center justify-end gap-2'>
      <BackBtn/>
        
      <div>
        <Link to="/likes">
        <button className='px-3 py-3 rounded-full flex items-center gap-2 bg-[#ff6e4a] text-white font-bold'><GoHeart className="text-2xl font-bold" /></button>
        </Link>
      </div>

      {/* cart code */}
      <Link to="/cart">
      <div className="px-3 py-3 flex items-center gap-2 rounded-full bg-[#ff6e4a] flex items-center justify-center">
        <button className='text-white font-bold'><BsBasket3 className="text-2xl"/></button>
          <span className=" absolute top-9 ml-5 h-5 w-5 flex items-center justify-center text-black rounded-full bg-white/80 font-bold">0</span>      
      </div> 
      </Link>
  

      {/* orders  */}

      <div>
       <Link to="/orders">
        <button className='flex items-center gap-2 bg-[#ff6e4a] text-white font-bold px-3 py-3 rounded-full'><PiClipboardText className="text-2xl" /></button>
      </Link>
      </div>
    </div>
  )
}

export default MiniNav