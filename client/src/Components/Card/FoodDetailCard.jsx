import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const FoodDetailCard = () => {
  const { id } = useParams();

   const foods = useSelector((state) => state.search.allFoods);
   const food = foods.find((item) => item._id === id);
   if (!food) return <p>Loading...</p>;
  
  return ( 
    <div className='min-h-screen w-full flex flex-col lg:flex-row'>

      {/* IMAGE SECTION */}
      <div className='w-full lg:w-1/2 relative flex items-center justify-center p-4'>

        {/* TOP BAR */}
        <div className='absolute top-4 w-full flex justify-center'>
          <div className='w-[90%] lg:w-2/3 bg-[#ff6e4a] max-[500px]:bg-transparent rounded-xl flex items-center justify-between px-4 py-2'>

            <div className='flex items-center gap-3'>
              <div className='h-10 w-10 bg-gray-400 rounded-full'>
                <img src={food.storeImg} alt=""/>
              </div>
              <h1 className='font-semibold'>
                {food.storeName}
              </h1>
            </div>

            <button className='text-red-500 font-bold'>❤️</button>

          </div>
        </div>

        {/* IMAGE */}
        <div className='w-full h-64 sm:h-80 lg:h-[80%] rounded-2xl overflow-hidden'>
          <img
            src={food.image}
            alt="food"
            onError={(e) => {e.target.src = "./src/Images/Logo.png"; }}
            className='w-full h-full object-cover'
          />
        </div>

      </div>

      {/* DETAIL SECTION */}
      <div className='w-full lg:w-1/2 bg-white p-6 flex flex-col gap-4'>

        <h1 className='text-2xl lg:text-4xl font-bold'>
          {food.name}
        </h1>

        <p className='text-gray-500'>
          ⭐ {food.rating}
          ({food.totalRatings}+)
        </p>

        <div className='flex justify-between items-center'>
          <span className='text-xl font-bold text-[#ff6e4a]'>{food.prize}</span>
          <span className='text-sm text-gray-500'>{food.prepTime}</span>
        </div>

        <button className='bg-[#ff6e4a] text-white py-3 rounded-xl mt-4'>
          Add to Cart
        </button>

      </div>

    </div>
  )
}

export default FoodDetailCard