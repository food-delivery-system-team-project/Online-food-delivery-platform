import { PiSlidersHorizontalBold } from "react-icons/pi";

const FoodList = () => {


  return (
    <div className='h-screen w-full overflow-y-scroll overflow-x-hidden'>
      <div className=' h-20 w-full flex items-center justify-between p-5 bg-gray-50'>
        <input className='px-5 w-1/2 py-2 bg-gray-200 rounded-3xl outline-0' type="search" placeholder='Search Food hear' />
        <button className="bg-[#ff6e4a] px-3 gap-2 py-1 flex items-center text-white rounded-2xl">
          <PiSlidersHorizontalBold />
          Filter
        </button>
      </div>
    </div>
  )
}

export default FoodList