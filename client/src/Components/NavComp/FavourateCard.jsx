import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa";

const FavourateCard = () => {
    const [togglelike, settoggleLike] = useState(false)
    const handleLike = () => {
        settoggleLike(!togglelike)
    }
  return (
    <div className='h-30 w-[100%] rounded-2xl bg-white'>
        <div className='h-full w-full flex justify-center items-center'>
            <div className='h-25 bg-amber-300 bg-cover w-1/2 overflow-hidden rounded-2xl'>
                <img className='h-full w-full' src="https://imgs.search.brave.com/EcCkiQ9qsggGX3701PutgCqmKHGp73TpsAC_rGLTp24/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9wbHVz/LnVuc3BsYXNoLmNv/bS9wcmVtaXVtX3Bo/b3RvLTE2NjkyNjE4/ODIwMDItZjhkN2Vh/MDQ5ZGFiP2ZtPWpw/ZyZxPTYwJnc9MzAw/MCZhdXRvPWZvcm1h/dCZmaXQ9Y3JvcCZp/eGxpYj1yYi00LjEu/MCZpeGlkPU0zd3hN/akEzZkRCOE1IeHpa/V0Z5WTJoOE1UTjhm/R1JsYkdsamFXOTFj/eVV5TUdadmIyUjha/VzU4TUh4OE1IeDhm/REE9" alt="" srcset="" />
                <div onClick={handleLike} className='h-10 absolute top-21 left-28 w-10 bg-gray-100/90 flex items-center justify-center shadow-lime-50 rounded-full '>
                    {togglelike? (<FaHeart  className='text-xl text-[#ff6e4a]/30 cursor-pointer' />) : (<FaHeart className=' text-xl text-[#ff6e4a] cursor-pointer' />)}
                </div>
            </div>
            <div className='h-25 w-1/2 flex justify-center items-center gap-5'>
                <h1 className='text-md ml-4 p-2'>Pizza With cheese and olives</h1>
            </div>
        </div>

    </div>
  )
}

export default FavourateCard