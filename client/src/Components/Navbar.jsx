import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { BsBasket3 } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { PiClipboardText } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useState } from "react";
import FavouriteCard from "./NavComp/FavouriteCard";
import { useDispatch, useSelector } from "react-redux";
import { setQuery ,setFoods ,toggleSearch } from "../Features/searchSlice";
import { useEffect } from "react";
import API from "../api/fetchApi";


const Navbar = () => {
const [like, setLike] = useState(false)


const dispatch = useDispatch();
const results = useSelector((state) => state.search.results);
const searchToggle = useSelector((state)=>state.search.value)


useEffect(() => {
  const fetchFoods = async () => {
    const res = await API.get("/foods");
     console.log(res.data.foods);
    dispatch(setFoods(res.data.foods));
    
  };

  fetchFoods();
}, []);




const favourites = [
  { id: 1, name: "Pizza", image: "https://imgs.search.brave.com/h7YJUOM90Z-XtuhdIeCHriOymMFgTFjg-ufgoYniyIo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vdmFyaWFu/dHMvZExIOTZaeHBq/WmJndHdMdlhWTnl0/dnJMLzYyNGYwZGMx/ZGZmOWJkY2NhYjAz/MmY5M2MzM2U3OWRl/Nzg0ODE3NzBlNzll/MjFkM2IwNDY5ZGFm/NTFmMDI3OTc",
    prize: 10.99
   },
  { id: 2, name: "Burger", image: "https://imgs.search.brave.com/0Oo-VwzdrkX65-_BHkUdo-JJgv1-47cjuGqki12J5NE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzhkLzk4/LzNiLzhkOTgzYjBi/NDI1ZDRjYmNhNGFl/NTUwNmM3NDEwNWMw/LmpwZw",
    prize: 8.99
   },
  { id: 3, name: "Momos", image: "https://imgs.search.brave.com/PTe9K5tGF13cXbNaWGr0nf1tfDmytqjVE1V2-7X6BCY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjYv/NTk3LzgzNS9zbWFs/bC9hLWRlbGljaW91/cy1jaGlja2VuLXNv/dXAtZm9vZC13aXRo/LXZlZ2V0YWJsZXMt/aW4tYS1ib3dsLXdp/bnRlci1mb29kLWFu/ZC1oaWdoLXByb3Rl/aW4tc291cC1tZWFs/LWNvbmNlcHQtYnkt/YWktZ2VuZXJhdGVk/LWZyZWUtcGhvdG8u/anBn", prize: 6.99 }
];

const handleLike = () => {
  setLike(!like)
}


  return (
    <> 
    <div className='h-40 w-full absolute z-10 flex flex-col items-center justify-between px-10'>
{/* top div */}
      <div className="h-20 w-full border-t-5 mt-2 border-white flex items-center justify-between">
      {/* logo */}
      <div className="bg-white h-20 w-20 absolute top-0 rounded-3xl flex items-center justify-center">
        <span className="h-5 w-[100%] bg-white absolute top-0"></span>
        <img className="h-6 w-15" src="./src/Images/Logo.png" alt="Logo"/>
      </div>

      {/* links */}
      <div>
        <ul className="flex gap-15 text-xl ml-50 font-semibold text-white">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/explore">Explore</a>
          </li>
          <li>
            <a href="/help">Help!</a>
          </li>
        </ul>
      </div>
       {/* login button */}
      <div>
        <Link to={"./register"}>
        <button className='flex items-center gap-2 z-40 absolute top-10 right-10 bg-white font-bold px-4 py-2 rounded-lg'><CgProfile className="text-2xl" />Login/Register</button>
        </Link>
      </div>
      </div>

      

{/* bottom div */}
      <div className="h-20 w-1/2 mt-20 absolute left-1/14 top-25 flex items-center justify-between">

        {/* search bar */}

      <div onClick={()=>dispatch(toggleSearch())} className='h-13 w-2/3 bg-white rounded-3xl p-3 flex items-center'> 
        <CiSearch className="text-3xl" />
        <input onChange={(e) => dispatch(setQuery(e.target.value))} className="ml-2 h-full w-full outline-0" type="search" placeholder="Search for Foods..." />
        {searchToggle ?
  <div className="absolute top-20 w-100 bg-white shadow-lg rounded-lg p-2 max-h-60 overflow-y-auto">
    {results.map((item) => (
    <Link to='/explore'>
      <div
        key={item.id}
        className="p-2 hover:bg-gray-100 cursor-pointer"
      >
        {item.name}
      </div>
      </Link>
    ))}
  </div> :null
}
      </div>

      {/* buttons Container */}
      <div className="flex gap-5 items-center ">

      {/* like code */}

      <div>
        <Link to="/likes">
        <button onClick={handleLike} className='px-3 py-3 rounded-full flex items-center gap-2 bg-white/60 text-white font-bold'><GoHeart className="text-2xl font-bold" /></button>
        </Link>
      </div>

      {/* cart code */}
      <Link to="/cart">
      <div className="px-3 py-3 flex items-center gap-2 rounded-full bg-white/60 flex items-center justify-center">
        <button className='text-white font-bold'><BsBasket3 className="text-2xl"/></button>
          <span className=" absolute top-9 ml-5 h-5 w-5 flex items-center justify-center text-black rounded-full bg-white/80 font-bold">0</span>      
      </div> 
      </Link>
  

      {/* orders  */}

      <div>
       <Link to="/orders">
        <button className='flex items-center gap-2 bg-white/60 text-white font-bold px-3 py-3 rounded-full'><PiClipboardText className="text-2xl" /></button>
      </Link>
      </div>
      </div>
      </div>

      
    </div>


            
    </>
  )
}

export default Navbar