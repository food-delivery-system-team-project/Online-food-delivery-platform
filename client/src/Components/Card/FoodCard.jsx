import React, { use } from 'react'
import { FaRegClock } from "react-icons/fa6";
import { GoHeart } from "react-icons/go";
import { useSelector ,useDispatch } from 'react-redux';
import { toggleLike } from '../../Features/likeSlice';
import { GoHeartFill } from "react-icons/go";
import { FaStore } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const FoodCard = ({food}) => {
  const navigate = useNavigate();
  const LikedItems = useSelector((state) => state.Like.likedItems);
  const isLiked = LikedItems.includes(food._id);
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(toggleLike(food._id));
    console.log(isLiked)
  };
  return (
    <div onClick={()=>{
      navigate("/foodDetails")
    }} className=' cursor-pointer'>
        <div className='h-60 w-70 bg-white flex flex-col relative items-center rounded-3xl'>

          {/* top section */}
          <div className='bg-amber-300 h-1/2 w-full flex justify-center items-center overflow-hidden rounded-t-2xl' >
              <img className="h-full w-full object-cover"  src={food.image} alt="" />
          </div>

          {/* time section */}
            <div className='flex flex-col items-center justify-center gap-3 absolute left-1 top-21'>
              <div className='bg-white px-2 py-1 rounded-3xl flex items-center bottom-0 left-0 justify-center gap-1'>
                <FaRegClock />
                <h1 className='text-sm font-semibold'>{food.prepTime}</h1>
              </div>
            </div>

            {/* save section */}
            <div className='absolute right-2 top-2'>
              <button onClick={handleLike} className='bg-[#ffe5de]/80 text-white p-2 rounded-full flex items-center justify-center gap-1'>
              {isLiked ? <GoHeartFill className='text-[#ff6e47] text-2xl' /> : <GoHeart className='text-2xl text-[#ff6e47]' />}
              </button>
            </div>

            {/* bottom section */}
          <div className='h-1/3 w-full p-2'>
            <h1 className='text-xl font-bold text-[#28282B]'>{food.name}</h1>
            {/* store name and rating */}
            <div className='text-sm font-semibold text-[#28282B] flex items-center justify-between gap-2'>
              <span className='flex gap-2 items-center'>
            <FaStore  className='text-[#ff6e47]' />
                <h1>
                   {food.storeName}
                </h1>
              </span>
              <span className='flex gap-0.5 items-center'>
                <h1>{food.rating}</h1>
                <FaStar className='text-amber-400'/>
                <h1>({food.totalRatings}+)</h1>
              </span>
            </div>

            {/* delivery fee and price */}
             
            <div className='text-sm font-semibold text-[#28282B] flex items-center mt-3 justify-between gap-2'>
                <h1 className='text-[#ff6e47]'>
                   ₹0 Delivery fee over ₹299
                </h1>
              <span className='flex items-center px-6 py-1 bg-[#28282B] text-white rounded-3xl '>
                <h1>₹{food.price}</h1>
              </span>
            </div>
            </div> 

        </div>
    </div>
  )
}

export default FoodCard