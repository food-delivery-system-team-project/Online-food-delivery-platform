import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa";

const FavouriteCard = ({ product }) => {
    const [togglelike, settoggleLike] = useState(false)
    const handleLike = () => {
        settoggleLike(!togglelike)
    }
  return (
    <div className='h-30 w-[100%] rounded-2xl bg-white'>
        <div className='h-full w-full flex justify-center items-center'>
            <div className='h-25 bg-amber-300 relative bg-cover w-1/2 overflow-hidden rounded-2xl'>
                <img className='h-full w-full' src={product.image} alt={product.name} />
                <div onClick={handleLike} className='h-10 absolute bottom-0 right-0 w-10 bg-gray-100/90 flex items-center justify-center shadow-lime-50 rounded-full '>
                    {togglelike? (<FaHeart  className='text-xl text-[#ff6e4a]/30 cursor-pointer' />) : (<FaHeart className=' text-xl text-[#ff6e4a] cursor-pointer' />)}
                </div>
            </div>
            <div className='h-25 w-1/2 flex flex-col justify-center items-center gap-5'>
                <h1 className='text-lg ml-4 p-2'>{product.name}</h1>
                <h1 className='bg-black text-white rounded-2xl text-md ml-4 pt-2 pl-4 pr-4 pb-2'>${product.prize}</h1>
            </div>
        </div>

    </div>
  )
}

export default FavouriteCard